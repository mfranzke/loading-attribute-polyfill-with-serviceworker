# loading="lazy" attribute polyfill with Service Worker

Fast and lightweight dependency-free vanilla JavaScript polyfill for native lazy loading / the awesome loading='lazy'-attribute, depending on Service Worker (kudos for that [great idea](https://github.com/mfranzke/loading-attribute-polyfill/issues/88#issuecomment-649723103) to [@garygreen](https://github.com/garygreen) !!!)

[![MIT license](https://img.shields.io/npm/l/loading-attribute-polyfill-with-serviceworker.svg "license badge")](https://opensource.org/licenses/mit-license.php)
[![GitHub Super-Linter](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/mfranzke/loading-attribute-polyfill-with-serviceworker/actions/workflows/linter.yml)
[![dependencies Status](https://david-dm.org/mfranzke/loading-attribute-polyfill-with-serviceworker/status.svg "Count of dependencies")](https://david-dm.org/mfranzke/loading-attribute-polyfill-with-serviceworker "loading-attribute polyfill – on david-dm")
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE-OF-CONDUCT.md)

- Released under the MIT license
- Made in Germany. And supported by so many great people from all over this planet - see "Credits" accordingly.
- Compatible [down to Microsoft Internet Explorer 17](https://caniuse.com/?search=serviceworker)

## Features

- Lightweight (see the badge above)
- Web standards: supports the standard `loading="lazy"` attribute on `img` and `iframe` elements
- Performance: it's based on highly efficient, best practice code.
- SEO & crawlers: the image and iframe contents aren't being hidden from crawlers that aren't capable of scrolling.

## Core concepts

The polyfill was designed with the following concepts kept in mind:

- dependency-free
- using JavaScript with graceful degradation

## Installation

First you'll need to integrate the JavaScript file into your code.

You may optionally load via NPM or Bower:

    $ npm install loading-attribute-polyfill-with-serviceworker
    $ bower install loading-attribute-polyfill-with-serviceworker

Include one of the provided JavaScript files depending on your setup plus the CSS file:

```html
<script
	src="dist/loading-attribute-polyfill-with-serviceworker.js"
	async
></script>
<link
	rel="stylesheet"
	href="dist/loading-attribute-polyfill-with-serviceworker.css"
/>
```

or e.g. within JS

```js
import loadingAttributePolyfill from "node_modules/loading-attribute-polyfill-with-serviceworker/dist/loading-attribute-polyfill-with-serviceworker.module.js";
```

Please keep in mind that it's important to even also include `width` and `height` attributes on `<img>` HTML tags, as the browser could determine the aspect ratio via those two attributes values being set (even if you overwrite them via CSS), compare to the great work by Jen Simmons on this topic, e.g. within these articles <https://css-tricks.com/do-this-to-improve-image-loading-on-your-website/> (with video) or <https://css-tricks.com/what-if-we-got-aspect-ratio-sized-images-by-doing-almost-nothing/>

And please "Avoid lazy-loading images that are in the first visible viewport", compare to [the article "Browser-level image lazy-loading for the web"](https://web.dev/browser-level-image-lazy-loading/#avoid-lazy-loading-images-that-are-in-the-first-visible-viewport) published on web.dev:

> You should avoid setting `loading=lazy` for any images that are in the first visible viewport. It is recommended to only add `loading=lazy` to images which are positioned below the fold, if possible.

## Demo

See the polyfill in action either by downloading / forking this repo and have a look at `demo/index.html`, or at the hosted demo: <https://mfranzke.github.io/loading-attribute-polyfill-with-serviceworker/demo/>

### Big Thanks

Cross-browser testing platform provided by [CrossBrowserTesting](https://crossbrowsertesting.com)

[![CrossBrowserTesting](https://crossbrowsertesting.com/blog/wp-content/uploads/2017/09/cbt-wp-logo.png "CrossBrowserTesting")](https://crossbrowsertesting.com)

## Things to keep in mind

- The HTML demo code is meant to be simple
- This polyfill doesn't (so far) provide any functionality for the `loading="eager"` value, as this was released even already, but still seems to be in the measure, learn and improvements phase.

## More information on the standard

- [Specification](https://github.com/whatwg/html/pull/3752)
- [LazyLoad Explainer](https://github.com/scott-little/lazyload)

## Outro

If you're trying out and using my work, feel free to contact me and give me any feedback. I'm curious about how it's gonna be used.

And if you do like this polyfill, please consider even also having a look at the other polyfill we've developed: <https://github.com/mfranzke/datalist-polyfill/>
