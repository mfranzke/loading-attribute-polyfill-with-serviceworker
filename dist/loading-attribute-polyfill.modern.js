const e="loading"in HTMLImageElement.prototype,t="loading"in HTMLIFrameElement.prototype;let o;function a(e){return e.replace(/(&|&amp;)?(loading=lazy|image-width=\d*|image-height=\d*)/gi,"")}function n(e){let t=[e];"picture"===e.parentNode.tagName.toLowerCase()&&(t=Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))),t.push(e);for(const e of t)e.hasAttribute("srcset")&&(e.srcset=a(e.srcset)),e.src=a(e.src),e.dataset.loadingLazy="loading"}function r(a){var r,i,d;if(("img"===(null==(r=a.tagName)?void 0:r.toLowerCase())||"picture"===(null==(i=a.tagName)?void 0:i.toLowerCase()))&&!e||"iframe"===(null==(d=a.tagName)?void 0:d.toLowerCase())&&!t)if(void 0===o)n(a);else{const e=a;e.dataset.loadingLazy="registered",o.observe(e)}}window,window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"IntersectionObserver"in window&&(o=new IntersectionObserver(function(e,t){for(const o of e){if(0===o.intersectionRatio)continue;const e=o.target;t.unobserve(e),n(e)}},{rootMargin:"0px 0px 256px 0px",threshold:.01}));const i=()=>{for(const e of document.querySelectorAll('img[loading="lazy"],iframe[loading="lazy"]'))r(e);void 0!==window.matchMedia&&window.matchMedia("print").addListener(e=>{if(e.matches)for(const e of document.querySelectorAll('img[loading="lazy"],iframe[loading="lazy"]'))n(e)})};/comp|inter/.test(document.readyState)?i():"addEventListener"in document?document.addEventListener("DOMContentLoaded",()=>{i()}):document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&i()});const d={prepareElement:r};export{d as default};
//# sourceMappingURL=loading-attribute-polyfill.modern.js.map
