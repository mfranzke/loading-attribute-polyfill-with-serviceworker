import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class LoadingImages extends HTMLImageElement {
	constructor() {
		super(); // Always call super() first in the constructor.
		// Call for preparing the sample image element included the latest dynamically inserted
		loadingAttributePolyfill.prepareElement(this);
	}
}

customElements.define('loading-image', LoadingImages, { extends: 'img' });
