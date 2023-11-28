import { LoadedStrapi } from '@strapi/types';
import localProvider from '@strapi/provider-audit-logs-local';
import { scheduleJob } from 'node-schedule';

const DEFAULT_RETENTION_DAYS = 90;

const defaultEvents = [
  'entry.create',
  'entry.update',
  'entry.delete',
  'entry.publish',
  'entry.unpublish',
  'media.create',
  'media.update',
  'media.delete',
  'media-folder.create',
  'media-folder.update',
  'media-folder.delete',
  'user.create',
  'user.update',
  'user.delete',
  'admin.auth.success',
  'admin.logout',
  'content-type.create',
  'content-type.update',
  'content-type.delete',
  'component.create',
  'component.update',
  'component.delete',
  'role.create',
  'role.update',
  'role.delete',
  'permission.create',
  'permission.update',
  'permission.delete',
];

const getSanitizedUser = (user: any) => {
  let displayName = user.email;

  if (user.username) {
    displayName = user.username;
  } else if (user.firstname && user.lastname) {
    displayName = `${user.firstname} ${user.lastname}`;
  }

  return {
    id: user.id,
    email: user.email,
    displayName,
  };
};

const getEventMap = (defaultEvents: any) => {
  const getDefaultPayload = (...args: any) => args[0];

  // Use the default payload for all default events
  return defaultEvents.reduce((acc: any, event: any) => {
    acc[event] = getDefaultPayload;
    return acc;
  }, {} as any);
};

const getRetentionDays = (strapi: LoadedStrapi) => {
  const licenseRetentionDays = strapi.ee.features.get('audit-logs')?.options.retentionDays;
  const userRetentionDays = strapi.config.get('admin.auditLogs.retentionDays');

  // For enterprise plans, use 90 days by default, but allow users to override it
  if (licenseRetentionDays == null) {
    return userRetentionDays ?? DEFAULT_RETENTION_DAYS;
  }

  // Allow users to override the license retention days, but not to increase it
  if (userRetentionDays && userRetentionDays < licenseRetentionDays) {
    return userRetentionDays;
  }

  // User didn't provide a retention days value, use the license one
  return licenseRetentionDays;
};

const createAuditLogsService = (strapi: LoadedStrapi) => {
  // Manage internal service state privately
  const state = {} as any;

  // NOTE: providers should be able to replace getEventMap to add or remove events
  const eventMap = getEventMap(defaultEvents);

  const processEvent = (name: string, ...args: any) => {
    const requestState = strapi.requestContext.get()?.state;

    // Ignore events with auth strategies different from admin
    const isUsingAdminAuth = requestState?.auth?.strategy.name === 'admin';
    const user = requestState?.user;

    if (!isUsingAdminAuth || !user) {
      return null;
    }

    const getPayload = eventMap[name];

    // Ignore the event if it's not in the map
    if (!getPayload) {
      return null;
    }

    // Ignore some events based on payload
    const ignoredUids = ['plugin::upload.file', 'plugin::upload.folder'];
    if (ignoredUids.includes(args[0]?.uid)) {
      return null;
    }

    return {
      action: name,
      date: new Date().toISOString(),
      payload: getPayload(...args) || {},
      userId: user.id,
    };
  };

  async function handleEvent(name: string, ...args: any) {
    const processedEvent = processEvent(name, ...args);

    if (processedEvent) {
      // This stores the event when after the transaction is committed,
      // so it's not stored if the transaction is rolled back
      await strapi.db.transaction(({ onCommit }) => {
        onCommit(() => state.provider.saveEvent(processedEvent));
      });
    }
  }

  return {
    async register() {
      // Handle license being enabled
      if (!state.eeEnableUnsubscribe) {
        // @ts-expect-error- update event hub to receive callback argument
        state.eeEnableUnsubscribe = strapi.get('eventHub').on('ee.enable', () => {
          // Recreate the service to use the new license info
          this.destroy();
          this.register();
        });
      }

      // Handle license being updated
      if (!state.eeUpdateUnsubscribe) {
        // @ts-expect-error- update event hub to receive callback argument
        state.eeUpdateUnsubscribe = strapi.get('eventHub').on('ee.update', () => {
          // Recreate the service to use the new license info
          this.destroy();
          this.register();
        });
      }

      // Handle license being disabled
      // @ts-expect-error- update event hub to receive callback argument
      state.eeDisableUnsubscribe = strapi.get('eventHub').on('ee.disable', () => {
        // Turn off service when the license gets disabled
        // Only ee.enable and ee.update listeners remain active to recreate the service
        this.destroy();
      });

      // Register the provider now because collections can't be added later at runtime
      state.provider = await localProvider.register({ strapi });

      // Check current state of license
      if (!strapi.ee.features.isEnabled('audit-logs')) {
        return this;
      }

      // Start saving events
      state.eventHubUnsubscribe = strapi.get('eventHub').subscribe(handleEvent.bind(this));

      // Manage audit logs auto deletion
      const retentionDays = getRetentionDays(strapi);
      state.deleteExpiredJob = scheduleJob('0 0 * * *', () => {
        const expirationDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
        state.provider.deleteExpiredEvents(expirationDate);
      });

      return this;
    },

    async findMany(query: unknown) {
      const { results, pagination } = await state.provider.findMany(query);

      const sanitizedResults = results.map((result: any) => {
        const { user, ...rest } = result;
        return {
          ...rest,
          user: user ? getSanitizedUser(user) : null,
        };
      });

      return {
        results: sanitizedResults,
        pagination,
      };
    },

    async findOne(id: unknown) {
      const result = await state.provider.findOne(id);

      if (!result) {
        return null;
      }

      const { user, ...rest } = result;
      return {
        ...rest,
        user: user ? getSanitizedUser(user) : null,
      };
    },

    unsubscribe() {
      if (state.eeDisableUnsubscribe) {
        state.eeDisableUnsubscribe();
      }

      if (state.eventHubUnsubscribe) {
        state.eventHubUnsubscribe();
      }

      if (state.deleteExpiredJob) {
        state.deleteExpiredJob.cancel();
      }

      return this;
    },

    destroy() {
      return this.unsubscribe();
    },
  };
};

export default createAuditLogsService;
