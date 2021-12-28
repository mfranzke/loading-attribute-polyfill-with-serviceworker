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

// Importing the two files which show how to register these elements as custom elements builtin extends
import 'loading-attribute-polyfill.custom-builtin-extend.image.js';
import 'loading-attribute-polyfill.custom-builtin-extend.iframe.js';
