const e="loading"in HTMLImageElement.prototype,t="loading"in HTMLIFrameElement.prototype;let o;function a(e){let t=[e];"picture"===e.parentNode.tagName.toLowerCase()&&(t=Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))),t.push(e),t.forEach(e=>{e.hasAttribute("src")&&(e.src=function(e){let t=new URL(e),o=t.searchParams;return o.delete("loading"),o.delete("image-width"),o.delete("image-height"),t.href}(e.src)),e.dataset.loadingLazy="loading"})}function r(r){var n,i,d;if(("img"===(null==(n=r.tagName)?void 0:n.toLowerCase())||"picture"===(null==(i=r.tagName)?void 0:i.toLowerCase()))&&!e||"iframe"===(null==(d=r.tagName)?void 0:d.toLowerCase())&&!t)if(void 0!==o){const e=r;e.dataset.loadingLazy="registered",o.observe(e)}else a(r)}window,window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"IntersectionObserver"in window&&(o=new IntersectionObserver(function(e,t){e.forEach(e=>{if(0===e.intersectionRatio)return;const o=e.target;t.unobserve(o),a(o)})},{rootMargin:"0px 0px 256px 0px",threshold:.01}));const n=()=>{document.querySelectorAll('img[loading="lazy"],iframe[loading="lazy"]').forEach(e=>r(e)),void 0!==window.matchMedia&&window.matchMedia("print").addListener(e=>{e.matches&&document.querySelectorAll('img[loading="lazy"],iframe[loading="lazy"]').forEach(e=>{a(e)})})};/comp|inter/.test(document.readyState)?n():"addEventListener"in document?document.addEventListener("DOMContentLoaded",()=>{n()}):document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&n()});const i={prepareElement:r};export default i;
//# sourceMappingURL=loading-attribute-polyfill.module.js.map
