"use strict";(self.webpackChunkringcentral_embeddable=self.webpackChunkringcentral_embeddable||[]).push([[96],{353694:function(r,e,a){function t(r,e){return Object.keys(e).reduce((function(a,t){t.startsWith(r)&&(a[t.substr(r.length)]=e[t]);return a}),{})}a.r(e),a.d(e,{queryString:function(){return n}});var s=a(667475),i=a(555469);function n(r,e){var a=document.createElement("a");a.href=e;var n=a.search.slice(1).split("&").reduce((function(r,e){var a=e.split("="),t=a[0],i=a[1];return r[t]=(0,s.a)(i),r}),{}),u=[],d=n.ajs_uid,c=n.ajs_event,_=n.ajs_aid,o=(0,i.PO)(r.options.useQueryString)?r.options.useQueryString:{},j=o.aid,f=void 0===j?/.+/:j,v=o.uid,l=void 0===v?/.+/:v;if(_){var y=Array.isArray(n.ajs_aid)?n.ajs_aid[0]:n.ajs_aid;f.test(y)&&r.setAnonymousId(y)}if(d){var p=Array.isArray(n.ajs_uid)?n.ajs_uid[0]:n.ajs_uid;if(l.test(p)){var h=t("ajs_trait_",n);u.push(r.identify(p,h))}}if(c){var b=Array.isArray(n.ajs_event)?n.ajs_event[0]:n.ajs_event,A=t("ajs_prop_",n);u.push(r.track(b,A))}return Promise.all(u)}}}]);
//# sourceMappingURL=queryString.js.map