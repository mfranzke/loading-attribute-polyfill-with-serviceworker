# loading="lazy" attribute polyfill with Service Worker

[![MIT license](https://img.shields.io/npm/l/loading-attribute-polyfill-with-serviceworker.svg "license badge")](https://opensource.org/licenses/mit-license.php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/loading-attribute-polyfill-with-serviceworker)](https://bundlephobia.com/result?p=loading-attribute-polyfill-with-serviceworker)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4f4cc692565d425c82860d18a11f17d4)](https://www.codacy.com/gh/mfranzke/loading-attribute-polyfill-with-serviceworker/dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/mfranzke/loading-attribute-polyfill-with-serviceworker/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mfranzke/loading-attribute-polyfill-with-serviceworker?targetFile=package.json)
[![CodeQL](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/actions/workflows/codeql-analysis.yml)
[![GitHub Super-Linter](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/actions/workflows/linter.yml)
[![Dependencies Status](https://requires.io/github/mfranzke/loading-attribute-polyfill-with-serviceworker/requirements.svg?branch=main)](https://requires.io/github/mfranzke/loading-attribute-polyfill-with-serviceworker/requirements/?branch=main)
[![loading-attribute-polyfill on Npmjs](https://img.shields.io/npm/v/loading-attribute-polyfill-with-serviceworker.svg?color=rgb%28237%2C%2028%2C%2036%29 "npm version")](https://npmjs.com/package/loading-attribute-polyfill-with-serviceworker 'loading="lazy"-attribute polyfill – on NPM')
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Join the chat at https://gitter.im/loading-attribute-polyfill-with-serviceworker/community](https://badges.gitter.im/loading-attribute-polyfill-with-serviceworker/community.svg)](https://gitter.im/loading-attribute-polyfill-with-serviceworker/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE-OF-CONDUCT.md)

Fast and lightweight dependency-free vanilla JavaScript polyfill for native lazy loading / the awesome loading='lazy'-attribute, depending on Service Worker (kudos for that [great idea](https://github.com/mfranzke/loading-attribute-polyfill/issues/88#issuecomment-649723103) to [@garygreen](https://github.com/garygreen) !!!)

- Released under the MIT license
- Made in Germany. And supported by so many great people from all over this planet - see "Credits" accordingly.
- Compatible [down to Microsoft Internet Explorer 17](https://caniuse.com/?search=serviceworker)

## Features

- Lightweight (see the badge above)
- Web standards: supports the standard `loading="lazy"` attribute on `img` and `iframe` elements
- Performance: it's based on highly efficient, best practice code.
- SEO & crawlers: the image and iframe contents aren't being hidden from crawlers that aren't capable of scrolling.
- JavaScript framework friendly\*

\*As some JavaScript frameworks would like to "own the DOM", it's not a good practice to try to manipulate the HTML content by our polyfill. That for this solution hooks into the network connection (by a Service Worker that you would need to register) to intercept the image and iframe contents network requests. This gives us much more flexibility on the usage contexts, but has some drawbacks, see section ["Prerequisites"](#prerequisites).

## Core concepts

The polyfill was designed with the following concepts kept in mind:

- dependency-free
- using JavaScript with graceful degradation

## Prerequisites

The main architectural decision to differentiate from other solutions like [loading-attribute-polyfill](https://github.com/mfranzke/loading-attribute-polyfill) is that we're using **Service Worker** to intercept the image and iframe contents network requests. This comes with some aspects that are important to mention, that you might want to evaluate on your requirements and technical context.

- Service Workers only run over **HTTPS**, for security reasons
- Service Worker need to get **registered on first page visit**
- Only works on **same domain** network requests

Whereas the first topic might not be a problem (anymore) on most websites – as this should be the de-facto standard nowadays – the second and third might be acceptable in your context, as this polyfill behaves as a progressive enhancement to provide the expected functionality even for non-supporting browsers both only on seconds pages request and any revisits and for same origin image and contents (iframe) requests even only.

## Installation

First you'll need to integrate the JavaScript file into your code.

You may optionally load via NPM or Bower:

    $ npm install loading-attribute-polyfill-with-serviceworker
    $ bower install loading-attribute-polyfill-with-serviceworker

## Integration

Include one of the provided JavaScript files depending on your setup plus the CSS file:

```html
<link
	rel="stylesheet"
	href="dist/loading-attribute-polyfill-with-serviceworker.css"
/>
<script
	src="dist/loading-attribute-polyfill-with-serviceworker.js"
	async
></script>
```

or e.g. within JS

```js
import loadingAttributePolyfillWithServiceWorker from "node_modules/loading-attribute-polyfill-with-serviceworker/dist/loading-attribute-polyfill-with-serviceworker.module.js";
```

### Additional information on your image and document (iframe) references

Afterwards, you need to add a query to all of your `<img>` (`?loading=lazy&image-width=250&image-height=150`) and `<iframe>` (`?loading=lazy`) HTML tags (in the case of `<picture>` use the complementary `<source>` HTML tags) that you'd like to lazy load. The included `image-width` and `image-height` values should match the `width`- and `height`-attribute values of each asset.

#### Generally set dimensions on your images

Please keep in mind that it's important to even also include `width` and `height` attributes on `<img>` HTML tags, as the browser could determine the aspect ratio via those two attributes values being set (even if you overwrite them via CSS), compare to the great work by Jen Simmons on this topic, e.g. within these articles <https://css-tricks.com/do-this-to-improve-image-loading-on-your-website/> (with video) or <https://css-tricks.com/what-if-we-got-aspect-ratio-sized-images-by-doing-almost-nothing/>

And please "Avoid lazy-loading images that are in the first visible viewport", compare to [the article "Browser-level image lazy-loading for the web"](https://web.dev/browser-level-image-lazy-loading/#avoid-lazy-loading-images-that-are-in-the-first-visible-viewport) published on web.dev:

> You should avoid setting `loading=lazy` for any images that are in the first visible viewport. It is recommended to only add `loading=lazy` to images which are positioned below the fold, if possible.

### Register a Service Worker

Furthermore you would either need to integrate the code out of [loading-attribute-polyfill-with-serviceworker.sw.js](loading-attribute-polyfill-with-serviceworker.sw.js) to your existing [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker) or register one by yourself – please keep in mind that it's very important to add the feature detection to the Service Workers URL within the `navigator.serviceWorker.register` methods parameter, as we're transfering that information on the users enviroments capabilities via this way.

```javascript
if ("serviceWorker" in navigator) {
	// Differentiate in between the Service Worker scripts for the different browser capabilities / support
	navigator.serviceWorker.register(
		"loading-attribute-polyfill-with-serviceworker.sw.js?loading-images=" +
			("loading" in HTMLImageElement.prototype) +
			"&loading-iframes=" +
			("loading" in HTMLIFrameElement.prototype)
	);
}
```

### Example code

#### Simple image

```html
<img
	src="simpleimage.jpg?loading=lazy&image-width=250&image-height=150"
	loading="lazy"
	alt=""
	width="250"
	height="150"
/>
```

#### Image wrapped in a picture tag

```html
<picture>
	<source
		media="(min-width: 40em)"
		srcset="
			simpleimage.huge.jpg?loading=lazy&image-width=250&image-height=150    1x,
			simpleimage.huge.2x.jpg?loading=lazy&image-width=250&image-height=150 2x
		"
	/>
	<source
		srcset="
			simpleimage.jpg?loading=lazy&image-width=250&image-height=150    1x,
			simpleimage.2x.jpg?loading=lazy&image-width=250&image-height=150 2x
		"
	/>
	<img
		src="simpleimage.jpg?loading=lazy&image-width=250&image-height=150"
		loading="lazy"
		alt=".."
		width="250"
		height="150"
	/>
</picture>
```

#### Image with `srcset`

```html
<img
	src="simpleimage.jpg?loading=lazy&image-width=250&image-height=150"
	srcset="
		simpleimage.1024.jpg?loading=lazy&image-width=250&image-height=150 1024w,
		simpleimage.640.jpg?loading=lazy&image-width=250&image-height=150   640w,
		simpleimage.320.jpg?loading=lazy&image-width=250&image-height=150   320w
	"
	sizes="(min-width: 36em) 33.3vw, 100vw"
	alt="A rad wolf"
	loading="lazy"
/>
```

#### Iframe

```html
<iframe
	src="iframe.html?loading=lazy"
	width="320"
	height="180"
	loading="lazy"
></iframe>
```

## API

In case that you're dynamically adding HTML elements within the browser, you could call the following method with an included [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) object, like e.g.:

```JavaScript
loadingAttributePolyfillWithServiceWorker.prepareElement(
	document.querySelector('main [loading="lazy"]')
);
```

In general we recommend to use the Web Standard of customized builtin elements extends to achieve this, by adding an `is`-attribute to the related element and registering those with JavaScript afterwards:

```html
<img
	src="simpleimage.jpg?loading=lazy&image-width=250&image-height=150"
	loading="lazy"
	alt=""
	width="250"
	height="150"
	is="loading-image"
/>
```

```javascript
import loadingAttributePolyfillWithServiceWorker from "loading-attribute-polyfill-with-serviceworker";

// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class LoadingImages extends HTMLImageElement {
	constructor() {
		super(); // Always call super() first in the constructor.
		// Call for preparing the sample image element included the latest dynamically inserted
		loadingAttributePolyfillWithServiceWorker.prepareElement(this);
	}
}

customElements.define("loading-image", LoadingImages, { extends: "img" });
```

compare to the code within [demo/loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.image.js](demo/loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.image.js) (or [demo/loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.iframe.js](demo/loading-attribute-polyfill-with-serviceworker.custom-builtin-extend.iframe.js) for iframe elements).

In case that you even also would like to support Safari / WebKit browsers, you'll need a polyfill as this engine doesn't support that part of the Custom Elements standard so far: <https://www.npmjs.com/package/@ungap/custom-elements>

## Demo

See the polyfill in action either by downloading / forking this repo and have a look at `demo/index.html`, or at the hosted demo: <https://mfranzke.github.io/loading-attribute-polyfill-with-serviceworker/demo/>

## Credits

Credits for the initial kickstarter / script to @Sora2455 for better expressing my ideas & concepts and support by @cbirdsong, @eklingen, @DaPo, @nextgenthemes, @diogoterremoto, @dracos, @Flimm, @TomS-, @vinyfc93, @JordanDysart and @denyshutsal. And especially to [@garygreen](https://github.com/garygreen) for coming up with the [great idea to use Service Worker](https://github.com/mfranzke/loading-attribute-polyfill/issues/88#issuecomment-649723103). Thank you very much for that, highly appreciated !

## Tested with

- Mac

  - Safari 14, macOS 11 (via CrossBrowserTesting)
  - Mozilla Firefox _latest_, macOS 10.14 (manually, localhost)
  <!-- - macOS 10.14, Safari 12 (via CrossBrowserTesting)
  - macOS 10.13, Safari 11 (via CrossBrowserTesting) -->

- iOS

  - Mobile Safari 12.0, iPad 6th Generation Simulator (manually)

- Windows

  - Google Chrome _latest_, Windows 10 (via CrossBrowserTesting)
  - Mozilla Firefox _latest_, Windows 10 (via CrossBrowserTesting)
  - Microsoft Edge version 18, Windows 10 (manually, localhost)
  - Microsoft Internet Explorer version 11, Windows 10 (via CrossBrowserTesting)
  - Internet Explorer 9.0.8112.16421, Windows 7 SP1 (manually, localhost)

### Big Thanks

Cross-browser testing platform provided by [CrossBrowserTesting](https://crossbrowsertesting.com)

[![CrossBrowserTesting](https://static1.smartbear.co/crossbrowsertesting/media/site/cbt-smartbear-logo.svg "CrossBrowserTesting")](https://crossbrowsertesting.com)

## Things to keep in mind

- The HTML demo code is meant to be simple
- This polyfill doesn't (so far) provide any functionality for the `loading="eager"` value, as this was released even already, but still seems to be in the measure, learn and improvements phase.

## More information on the standard

- [Specification](https://github.com/whatwg/html/pull/3752)
- [LazyLoad Explainer](https://github.com/scott-little/lazyload)

## Outro

If you're trying out and using my work, feel free to contact me and give me any feedback. I'm curious about how it's gonna be used.

And if you do like this polyfill, please consider even also having a look at the other polyfill we've developed: <https://github.com/mfranzke/datalist-polyfill/>
