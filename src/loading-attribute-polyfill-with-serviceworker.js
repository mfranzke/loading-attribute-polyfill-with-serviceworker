/*
 * Loading attribute polyfill - https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker
 * @license Copyright(c) 2019 by Maximilian Franzke
 * Credits for the initial kickstarter / script to @Sora2455, and supported by @cbirdsong, @eklingen, @DaPo, @nextgenthemes, @diogoterremoto, @dracos, @Flimm, @TomS-, @vinyfc93, @JordanDysart and @denyshutsal - many thanks for that !
 */
/*
 * A minimal and dependency-free vanilla JavaScript loading attribute polyfill.
 * Supports standard's functionality and tests for native support upfront.
 * Elsewhere the functionality gets emulated with the support of Service Worker.
 */

import './loading-attribute-polyfill-with-serviceworker.css';

const config = {
	intersectionObserver: {
		// Start download if the item gets within 256px in the Y axis
		rootMargin: '0px 0px 256px 0px',
		threshold: 0.01,
	},
	lazyImage: 'img[loading="lazy"]',
	lazyIframe: 'iframe[loading="lazy"]',
};

// Device/browser capabilities object
const capabilities = {
	loading: {
		image: 'loading' in HTMLImageElement.prototype,
		iframe: 'loading' in HTMLIFrameElement.prototype,
	},
	scrolling: 'onscroll' in window,
};

// Nodelist foreach polyfill / source: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Define according to browsers support of the IntersectionObserver feature (missing e.g. on IE11 or Safari 11)
let intersectionObserver;

if ('IntersectionObserver' in window) {
	intersectionObserver = new IntersectionObserver(
		onIntersection,
		config.intersectionObserver
	);
}

/**
 * Remove the URL query parts for the lazy loaded item
 * @param {String} urlString The URL to remove the URL query parts from
 */
function removeLazyPolyfillURLParts(urlString) {
	return urlString.replace(
		/(&|&amp;)?(loading=lazy|image-width=\d*|image-height=\d*)/gi,
		''
	);
}

/**
 * Remove the lazy query from the URL - now that the regular elements URL is referenced within the document, it will load now
 * @param {Object} lazyItem Current item to be referenced after lazy loading.
 */
function createRegularReference(lazyItem) {
	let mediaItems = [lazyItem];

	// Just in case the img is the decendent of a picture element, check for source tags
	if (lazyItem.parentNode.tagName.toLowerCase() === 'picture') {
		mediaItems = Array.prototype.slice.call(
			lazyItem.parentNode.querySelectorAll('source')
		);
	}

	mediaItems.push(lazyItem);

	for (const item of mediaItems) {
		if (item.hasAttribute('srcset')) {
			item.srcset = removeLazyPolyfillURLParts(item.srcset);
		}

		item.src = removeLazyPolyfillURLParts(item.src);

		// Modify the data attribute on the current status
		item.dataset.loadingLazy = 'loading';
	}
}

/**
 * Handle IntersectionObservers callback
 * @param {Object} entries Target elements Intersection observed changes
 * @param {Object} observer IntersectionObserver instance reference
 */
function onIntersection(entries, observer) {
	for (const entry of entries) {
		// Mitigation for EDGE lacking support of .isIntersecting until v15, compare to e.g. https://github.com/w3c/IntersectionObserver/issues/211#issuecomment-309144669
		if (entry.intersectionRatio === 0) {
			continue;
		}

		// If the item is visible now, load it and stop watching it
		const lazyItem = entry.target;

		observer.unobserve(lazyItem);

		createRegularReference(lazyItem);
	}
}

/**
 * Handle printing the page
 */
function onPrinting() {
	if (typeof window.matchMedia === 'undefined') {
		return;
	}

	const mediaQueryList = window.matchMedia('print');

	mediaQueryList.addListener((mql) => {
		if (mql.matches) {
			for (const lazyItem of document.querySelectorAll(
				config.lazyImage + ',' + config.lazyIframe
			)) {
				createRegularReference(lazyItem);
			}
		}
	});
}

/**
 * Retrieve the image and iframe 'lazy load' elements and prepare them for display
 * @param {Object} mediaTag image or iframe HTML tag
 */
function prepareElement(mediaTag) {
	if (
		(mediaTag.tagName?.toLowerCase() === 'img' && capabilities.loading.image) ||
		(mediaTag.tagName?.toLowerCase() === 'iframe' &&
			capabilities.loading.iframe)
	) {
		return false;
	}

	if (typeof intersectionObserver === 'undefined') {
		createRegularReference(mediaTag);
	} else {
		const observedElement = mediaTag;

		// Modify the data attribute on the current status
		observedElement.dataset.loadingLazy = 'registered';

		// Observe the item so that loading could start when it gets close to the viewport
		intersectionObserver.observe(observedElement);
	}
}

/**
 * Get all the img and iframe lazy loading tags on the page, prepare each and any one of them and setup the printing
 */
const prepareElements = () => {
	for (const element of document.querySelectorAll(
		config.lazyImage + ',' + config.lazyIframe
	)) {
		prepareElement(element);
	}

	// Bind for someone printing the page
	onPrinting();
};

// If the page has loaded already, run setup - if it hasn't, run as soon as it has.
// document.readyState values: https://www.w3schools.com/jsref/prop_doc_readystate.asp
if (/comp|inter/.test(document.readyState)) {
	prepareElements();
} else if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', () => {
		prepareElements();
	});
} else {
	document.attachEvent('onreadystatechange', () => {
		if (document.readyState === 'complete') {
			prepareElements();
		}
	});
}

const loadingAttributePolyfillWithServiceWorker = {
	prepareElement,
};

export default loadingAttributePolyfillWithServiceWorker;
