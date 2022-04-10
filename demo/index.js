// Test for dynamically inserted images and iframes
const addDynamicContent = (event) => {
	const divElement = document.createElement('div');
	const imageElement = document.createElement('img');
	const iframeElement = document.createElement('iframe');

	imageElement.setAttribute('is', 'loading-image');
	// We're using a differing string at the end of the query than the regular one embedded directly into the page
	imageElement.setAttribute(
		'src',
		'img/lazyimg-src-loadinglazy.250x150.guetzli.jpg?loading=lazy&image-width=250&image-height=150&dynamic-example-query'
	);
	imageElement.setAttribute('loading', 'lazy');
	imageElement.setAttribute('alt', '..');
	imageElement.setAttribute('width', '250');
	imageElement.setAttribute('height', '150');

	iframeElement.setAttribute('is', 'loading-iframe');
	// We're using a differing string at the end of the query than the regular one embedded directly into the page
	iframeElement.setAttribute(
		'src',
		'iframe.html?loading=lazy&dynamic-example-query'
	);
	iframeElement.setAttribute('loading', 'lazy');
	iframeElement.setAttribute('title', '..');
	iframeElement.setAttribute('width', '320');
	iframeElement.setAttribute('height', '180');

	/* eslint-disable unicorn/prefer-dom-node-append */
	divElement.appendChild(imageElement);
	divElement.appendChild(iframeElement);
	/* eslint-enable unicorn/prefer-dom-node-append */

	document.querySelector('main').insertAdjacentElement('beforeend', divElement);

	event.preventDefault();
};

document
	.querySelector('button.add-dynamic-content')
	.addEventListener('click', addDynamicContent);

// Importing the two files which show how to register these elements as custom elements builtin extends
/* eslint-disable import/no-unassigned-import, import/first */
import './loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.image.js';
import './loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.iframe.js';
/* eslint-enable import/no-unassigned-import, import/first */
