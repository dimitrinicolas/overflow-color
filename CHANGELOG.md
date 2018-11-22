# Change Log
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.3.0 - 2018-11-22
### Added
- A `data-oc-outside` attribute to exclude a body's immediate children to be put inside `data-oc-wrap` element

## 2.2.0 - 2018-11-22
### Added
- The default exported function is now `update` and check for attribute and scroll change

## 2.1.5 - 2018-10-25
### Changed
- Improved performance by passively listening to scroll event

## 2.1.4 - 2018-08-03
### Changed
- Improved performance by throttling the scroll event listener through requestAnimationFrame.
- Now default exporting a force `checkScroll` function

## 2.1.3 - 2018-05-14
### Changed
- Background color switch process for better performances.

## 2.1.2 - 2018-05-11
### Changed
- Now bundling the library with Rollup and exporting 3 versions: `main`, `module` and `browser` respectively as follows: `overflow-color.cjs.js`, `overflow-color.esm.js` and `overflow-color.umd.js` (plus `overflow-color.umd.min.js`).

## 2.1.1 - 2018-05-10
### Changed
- The test for page loaded or now, so the script can now be loaded `async`.

## 2.1.0 - 2018-03-10
### Added
- A shortcut `data-oc` for `data-oc-top` and `data-oc-bottom` combined.

## 2.0.1 - 2018-02-21
### Fixed
- A bug on Firefox.

## 2.0.0 - 2018-02-06
- Complete rework.

## 1.0.0 - 2017-03-02
- Initial release.