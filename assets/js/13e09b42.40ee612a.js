"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8024],{924:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=n(3117),a=(n(7294),n(3905));const s={title:"Release details page",tags:["content-releases","tech design"]},i=void 0,o={unversionedId:"docs/core/content-releases/frontend/release-details-page",id:"docs/core/content-releases/frontend/release-details-page",title:"Release details page",description:"Overview:",source:"@site/docs/docs/01-core/content-releases/02-frontend/02-release-details-page.mdx",sourceDirName:"docs/01-core/content-releases/02-frontend",slug:"/docs/core/content-releases/frontend/release-details-page",permalink:"/docs/core/content-releases/frontend/release-details-page",draft:!1,editUrl:"https://github.com/strapi/strapi/tree/main/docs/docs/docs/01-core/content-releases/02-frontend/02-release-details-page.mdx",tags:[{label:"content-releases",permalink:"/tags/content-releases"},{label:"tech design",permalink:"/tags/tech-design"}],version:"current",sidebarPosition:2,frontMatter:{title:"Release details page",tags:["content-releases","tech design"]},sidebar:"docs",previous:{title:"Releases page",permalink:"/docs/core/content-releases/frontend/releases-page"},next:{title:"Introduction",permalink:"/docs/core/content-type-builder/intro"}},l={},c=[{value:"Overview:",id:"overview",level:3},{value:"Group entries:",id:"group-entries",level:4},{value:"Edit a release:",id:"edit-a-release",level:4},{value:"Delete a release:",id:"delete-a-release",level:4},{value:"View Entry Status",id:"view-entry-status",level:4},{value:"Publish a release:",id:"publish-a-release",level:4}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"overview"},"Overview:"),(0,a.kt)("p",null,"The release details page allows users with appropriate permissions to do the following:"),(0,a.kt)("h4",{id:"group-entries"},"Group entries:"),(0,a.kt)("p",null,"Entries in a release can be be grouped by the following options:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Content-Types: Group all entries with the same content type together"),(0,a.kt)("li",{parentName:"ul"},"Locales: Group all entries with the same locale together."),(0,a.kt)("li",{parentName:"ul"},"Actions: Group all entries with the same action (publish/unpublish) together.")),(0,a.kt)("h4",{id:"edit-a-release"},"Edit a release:"),(0,a.kt)("p",null,"If the user has the ",(0,a.kt)("inlineCode",{parentName:"p"},"plugin::content-releases.update"),' permissions, a "three dot" button will appear in the header giving access to a menu with an "Edit" option.\nThe Edit button opens a modal, enabling users to modify the release name. To save the changes, the new name must be unique (only for pending releases), non-empty, and distinctly modified.'),(0,a.kt)("h4",{id:"delete-a-release"},"Delete a release:"),(0,a.kt)("p",null,"If the user has the ",(0,a.kt)("inlineCode",{parentName:"p"},"plugin::content-releases.delete"),' permissions, a "three dot" button will appear in the header giving access to a menu with a "Delete" option. Selecting this option triggers a confirmation modal.'),(0,a.kt)("h4",{id:"view-entry-status"},"View Entry Status"),(0,a.kt)("p",null,'Each entry within a release is assigned a status, indicating its readiness for actions such as Publish/Unpublish or any validation errors present. If the entry has validation errors, a user can use the entry\'s "three dots" menu to access the "Edit entry" link which navigates directly to the entry in the content manager.'),(0,a.kt)("p",null,'Within the CM edit view, users can resolve any identified errors. Upon completion, clicking the "Refresh" button on the release details page updates the status of each entry to reflect any changes made.'),(0,a.kt)("h4",{id:"publish-a-release"},"Publish a release:"),(0,a.kt)("p",null,'To execute the release of a content release, users can simply click on the "Publish" button (shown if you have the "plugin::content-releases.publish" permission). If any of the entries exhibit validation errors, the "Publish" action triggers a notification to alert users of the errors.'))}u.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(n),h=a,f=d["".concat(l,".").concat(h)]||d[h]||u[h]||s;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var c=2;c<s;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);