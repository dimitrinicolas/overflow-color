(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.overflowColor = factory());
}(this, (function () { 'use strict';

  var ATTRIBUTE_PREFIX = 'data-oc';

  var topColor = void 0;
  var bottomColor = void 0;

  var currentBgColor = void 0;
  var styleTag = void 0;

  /**
   * If needed, set the new new color as
   * html background
   * @param {string} color 
   */
  var setBgColor = function setBgColor(color) {
    if (currentBgColor !== color) {
      currentBgColor = color;
      var css = 'html { background: ' + currentBgColor + '; }';

      if (!styleTag) {
        styleTag = document.createElement('style');
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(styleTag);
      }

      if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = css;
      } else {
        styleTag.innerHTML = css;
      }
    }
  };

  /**
   * Checks the scroll position and determines
   * the overflow color to set between the
   * topColor and the bottomColor
   */
  var checkScroll = function checkScroll() {
    if (document.body.scrollHeight === window.innerHeight) {
      setBgColor(bottomColor);
    } else {
      var scrollFromMiddle = window.innerHeight - document.body.scrollHeight + 2 * Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      setBgColor(scrollFromMiddle < 0 ? topColor : bottomColor);
    }
  };

  /**
   * Gets the two overflow colors and init the
   * window scroll and resize event listeners
   */
  var initOverflowColor = function initOverflowColor() {
    var shortcutAttributeEl = document.querySelector('[' + ATTRIBUTE_PREFIX + ']');
    if (shortcutAttributeEl) {
      var split = shortcutAttributeEl.getAttribute(ATTRIBUTE_PREFIX).split(',');
      if (split.length > 1) {
        topColor = split[0];
        bottomColor = split[1];
      } else if (split.length === 1) {
        topColor = bottomColor = split[0];
      }
    } else {
      var topAttributeEl = document.querySelector('[' + ATTRIBUTE_PREFIX + '-top]');
      var bottomAttributeEl = document.querySelector('[' + ATTRIBUTE_PREFIX + '-bottom]');
      if (topAttributeEl) {
        topColor = topAttributeEl.getAttribute(ATTRIBUTE_PREFIX + '-top');
      }
      if (bottomAttributeEl) {
        bottomColor = bottomAttributeEl.getAttribute(ATTRIBUTE_PREFIX + '-bottom');
      }
    }

    if (topColor || bottomColor) {
      if (!topColor && bottomColor) {
        topColor = bottomColor;
      } else if (topColor && !bottomColor) {
        bottomColor = topColor;
      }

      var bodyComputedStyle = window.getComputedStyle(document.body, null);
      var bodyComputedBackground = bodyComputedStyle.getPropertyValue('background');
      if (bodyComputedBackground === '' || bodyComputedStyle.getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && bodyComputedBackground.substring(21, 17) === 'none') {
        bodyComputedBackground = 'white';
      }
      document.body.style.background = 'transparent';

      var bodyWrapperEl = document.createElement('div');
      bodyWrapperEl.setAttribute(ATTRIBUTE_PREFIX + '-wrap', '');
      bodyWrapperEl.style.background = bodyComputedBackground;
      for (var i = 0, l = document.body.childNodes.length; i < l; i++) {
        bodyWrapperEl.appendChild(document.body.childNodes[0]);
      }
      document.body.appendChild(bodyWrapperEl);

      checkScroll();
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('scroll', checkScroll, false);
        window.addEventListener('resize', checkScroll, false);
      } else {
        window.attachEvent('scroll', checkScroll);
        window.attachEvent('resize', checkScroll);
      }
    }
  };

  if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) !== -1) {
    initOverflowColor();
  } else if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initOverflowColor, false);
  } else {
    document.attachEvent('onreadystatechange', initOverflowColor);
  }

  return initOverflowColor;

})));
