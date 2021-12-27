import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// Test for dynamically inserted images and iframes
let addDynamicContent = (event) => {
	let divElement = document.createElement('div'),
		imageElement = document.createElement('img'),
		iframeElement = document.createElement('iframe');

	imageElement.setAttribute('is', 'loading-image');
	imageElement.setAttribute(
		'src',
		'img/lazyimg-src-loadinglazy.250x150.guetzli.jpg?loading=lazy&image-width=250&image-height=150&dynamic'
	);
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');

	iframeElement.setAttribute('is', 'loading-iframe');
	iframeElement.setAttribute('src', 'iframe.html?loading=lazy&dynamic');
	iframeElement.setAttribute('loading', 'lazy');
	iframeElement.setAttribute('title', '..');
	iframeElement.setAttribute('width', '320');
	iframeElement.setAttribute('height', '180');

	divElement.appendChild(imageElement);
	divElement.appendChild(iframeElement);

	document.querySelector('main').insertAdjacentElement('beforeend', divElement);

	event.preventDefault();
};

document
	.querySelector('button.add-dynamic-content')
	.addEventListener('click', addDynamicContent);

// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class LoadingImages extends HTMLImageElement {
	constructor() {
		super(); // Always call super() first in the constructor.
		// Call for preparing the sample image element included the latest
		console.log('preparing image', this);
		loadingAttributePolyfill.prepareElement(this);
	}
}

customElements.define('loading-image', LoadingImages, { extends: 'img' });

// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class LoadingIframes extends HTMLIFrameElement {
	constructor() {
		super(); // Always call super() first in the constructor.
		// Call for preparing the sample iframe element included the latest
		console.log('preparing iframe', this);
		loadingAttributePolyfill.prepareElement(this);
	}
}

customElements.define('loading-iframe', LoadingIframes, { extends: 'iframe' });
