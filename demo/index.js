import loadingAttributePolyfill from '../dist/loading-attribute-polyfill.module.js';

// Test for dynamically inserted images and iframes
let addDynamicContent = (event) => {
	let divElement = document.createElement('div'),
		imageElement = document.createElement('img'),
		iframeElement = document.createElement('iframe');

	imageElement.setAttribute(
		'src',
		'img/lazyimg-src-loadinglazy.250x150.guetzli.jpg?loading=lazy&asset-width=250&asset-height=150'
	);
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');

	iframeElement.setAttribute(
		'src',
		'iframe.html?loading=lazy&asset-width=250&asset-height=150'
	);
	iframeElement.setAttribute('loading', 'lazy');
	iframeElement.setAttribute('title', '..');
	iframeElement.setAttribute('width', '320');
	iframeElement.setAttribute('height', '180');

	divElement.appendChild(imageElement);
	divElement.appendChild(iframeElement);

	document.querySelector('main').insertAdjacentElement('beforeend', divElement);

	// Call for preparing the sample image element included the latest
	loadingAttributePolyfill.prepareElement(divElement.querySelector('img'));
	loadingAttributePolyfill.prepareElement(divElement.querySelector('iframe'));

	event.preventDefault();
};

document
	.querySelector('button.add-dynamic-content')
	.addEventListener('click', addDynamicContent);
