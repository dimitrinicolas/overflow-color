# overflow-color [![Build Status][travis badge]][travis link] ![0 dependency][dependency badge] ![npm bundle size (minified + gzip)][size badge]

[![Demo](fixtures/demo.gif)][demo]

Try it on your smartphone or with a trackpad on MacOS: [git.io/overflow][demo] 
([https://dimitrinicolas.github.io/overflow-color/][demo])

A simple script that automatically switches CSS `html` `background-color` 
according to scroll position.

This package is on npm

```console
npm i overflow-color
```

## Usage

You simply must add the browser minified script 
[dist/overflow-color.umd.min.js](dist/overflow-color.umd.min.js) and the two 
attributes `data-oc-top` and `data-oc-bottom` to your body tag.

```html
<body data-oc-top="red" data-oc-bottom="blue">
    <!-- ... -->
    <script src="dist/overflow-color.umd.min.js" async></script>
</body>
```

You can use the shortcut `data-oc` by separating the two values with a comma.

```html
<body data-oc="red,blue">
```

### With a module bundler

You can import this package with a simple require or import.

```javascript
require('overflow-color');
// with ES6+
import 'overflow-color';
```

You don't have anything else to do, the script is automatically launched when 
the DOM content is loaded.

#### Manually re-check scroll position

When you update body's overflow color attribute or make a huge change to the DOM 
(e.g. changing page with Angular) and that the vertical scroll position stayed
at the top, the new document height may be smaller than the previous one, and
`overflow-color` should set the overflow color to the bottom one, but it has not
be called by scroll event. In this specific case, you can use the default
exported function `updateOverflowColor`:

```javascript
import updateOverflowColor from 'overflow-color';

/** Change DOM or body's overflow color attribute */

updateOverflowColor();
```

## CSS tricks, Behind the Scenes

This library will wrap all the body content inside a `<div data-oc-wrap>`.
Then it set to the wrapper the same background as the `body`, and set `body`'s 
background to `transparent`.

Add the `data-oc-outside` attribute to any body's immediate children that you
don't want to be included into this wrap element at DOM content load.

when the document is loaded:

```html
<!doctype html>
<head>
    <!-- ... -->
    <style>
        /* your style */
        body {
            background: lightgrey;
        }
    </style>
    <style>
        /* style added by the script */
        html { background: blue; }
    </style>
</head>
<body data-oc="red,blue" style="background: transparent; /* style added by the script */ ">
    <!-- wrapper added by the script -->
    <div data-oc-wrap style="background: lightgrey;">
        <!-- ... your body's childs -->
        <script src="dist/overflow-color.umd.min.js" async></script>
    </div>
</body>
```

You can read the [Designer News discussion][dn] about the different tried 
tricks.

## Browsers compatibility

I successfully tested this library, on:  
**Mac OS Mojave**: Safari v11, Google Chrome v70 and Opera v51  
**iOS 11**: Safari, Google Chrome v68, Firefox 12 and Microsoft Edge v42

Unfortunately, Firefox on MacOS and Opera Mini on iOS doesn't show the
over-scroll color even without this library.

This library pass an E2E test through Chrome with Cypress.

## Build

Compile with Rollup:

```console
npm run build
```

Build and test with Cypress:

```console
npm test
```

## License

This project is licensed under the [MIT license](LICENSE).

[travis badge]: https://travis-ci.org/dimitrinicolas/overflow-color.svg?branch=master
[travis link]: https://travis-ci.org/dimitrinicolas/overflow-color
[dependency badge]: https://img.shields.io/badge/dependencies-0-brightgreen.svg
[size badge]: https://img.shields.io/bundlephobia/minzip/overflow-color.svg

[demo]: https://dimitrinicolas.github.io/overflow-color/
[dn]: https://www.designernews.co/stories/91663-switch-html-background-color-in-order-to-get-two-overflow-scrolling-colors-on-smartphones
