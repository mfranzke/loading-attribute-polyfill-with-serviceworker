!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).loadingAttributePolyfillWithServiceworker=t()}(this,function(){const e='img[loading="lazy"]',t='iframe[loading="lazy"]',o="loading"in HTMLImageElement.prototype,n="loading"in HTMLIFrameElement.prototype;let r;function a(e){let t=[e];"picture"===e.parentNode.tagName.toLowerCase()&&(t=Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))),t.push(e),t.forEach(e=>{e.hasAttribute("src")&&(e.src=function(e){let t=new URL(e),o=t.searchParams;return o.delete("loading"),o.delete("asset-width"),o.delete("asset-height"),t.href}(e.src)),e.dataset.loadingLazy="loading"})}function i(e){var t,i,d;if(("img"===(null==(t=e.tagName)?void 0:t.toLowerCase())||"picture"===(null==(i=e.tagName)?void 0:i.toLowerCase()))&&!o||"iframe"===(null==(d=e.tagName)?void 0:d.toLowerCase())&&!n)if(void 0!==r){const t=e;t.dataset.loadingLazy="registered",r.observe(t)}else a(e)}window,window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"IntersectionObserver"in window&&(r=new IntersectionObserver(function(e,t){e.forEach(e=>{if(0===e.intersectionRatio)return;const o=e.target;t.unobserve(o),a(o)})},{rootMargin:"0px 0px 256px 0px",threshold:.01}));const d=()=>{document.querySelectorAll(e+","+t).forEach(e=>i(e)),void 0!==window.matchMedia&&window.matchMedia("print").addListener(o=>{o.matches&&document.querySelectorAll(e+","+t).forEach(e=>{a(e)})})};return/comp|inter/.test(document.readyState)?d():"addEventListener"in document?document.addEventListener("DOMContentLoaded",()=>{d()}):document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&d()}),{prepareElement:i}});
//# sourceMappingURL=loading-attribute-polyfill.umd.js.map
