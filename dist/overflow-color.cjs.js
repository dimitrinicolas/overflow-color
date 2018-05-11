'use strict';

var ocTopColor = void 0;
var ocBottomColor = void 0;

var ocStyleTag = void 0;

var currentColor = void 0;

var bodyBackground = void 0;

var bodyWrap = void 0;

var setBgColor = function setBgColor(color) {

  currentColor = color;

  if (ocStyleTag) {
    ocStyleTag.parentNode.removeChild(ocStyleTag);
  }

  var css = 'html { background: ' + color + '; }';
  var head = document.head || document.getElementsByTagName('head')[0];

  ocStyleTag = document.createElement('style');

  if (ocStyleTag.styleSheet) {
    ocStyleTag.styleSheet.cssText = css;
  } else {
    ocStyleTag.appendChild(document.createTextNode(css));
  }

  head.appendChild(ocStyleTag);
};

var handleScroll = function handleScroll() {

  if (document.body.scrollHeight === window.innerHeight) {
    setBgColor(ocBottomColor);
  } else {

    var diffTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var diffBottom = document.body.scrollHeight - (diffTop + window.innerHeight);

    if (diffTop < diffBottom && currentColor !== ocTopColor) {
      setBgColor(ocTopColor);
    } else if (diffTop > diffBottom && currentColor !== ocBottomColor) {
      setBgColor(ocBottomColor);
    }
  }
};

function initOverflowColor() {

  var topEl = document.querySelector('[data-oc-top]');
  var bottomEl = document.querySelector('[data-oc-bottom]');
  var shortcutEl = document.querySelector('[data-oc]');

  if (shortcutEl) {
    var split = shortcutEl.getAttribute('data-oc').split(',');
    if (split.length > 1) {
      ocTopColor = split[0];
      ocBottomColor = split[1];
    } else if (split.length === 1) {
      ocTopColor = ocBottomColor = split[0];
    }
  } else {
    if (topEl) {
      ocTopColor = topEl.getAttribute('data-oc-top');
    }
    if (bottomEl) {
      ocBottomColor = bottomEl.getAttribute('data-oc-bottom');
    }
  }

  if (ocTopColor || ocBottomColor) {

    var bodyComputedStyle = window.getComputedStyle(document.body, null);
    bodyBackground = bodyComputedStyle.getPropertyValue('background');
    if (bodyBackground === '' || bodyComputedStyle.getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && bodyBackground.substring(21, 17) === 'none') {
      bodyBackground = 'white';
    }
    document.body.style.background = 'transparent';
    bodyWrap = document.createElement('div');
    bodyWrap.setAttribute('data-oc-wrap', '');
    bodyWrap.style.background = bodyBackground;
    for (var i = 0, l = document.body.childNodes.length; i < l; i++) {
      bodyWrap.appendChild(document.body.childNodes[0]);
    }
    document.body.appendChild(bodyWrap);

    if (!ocTopColor && ocBottomColor) {
      ocTopColor = ocBottomColor;
    } else if (ocTopColor && !ocBottomColor) {
      ocBottomColor = ocTopColor;
    }

    if (document.body.scrollHeight > window.innerHeight) {
      setBgColor(ocTopColor);
    } else {
      setBgColor(ocBottomColor);
    }

    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('scroll', handleScroll, false);
      window.addEventListener('resize', handleScroll, false);
    } else {
      window.attachEvent('scroll', handleScroll);
      window.attachEvent('resize', handleScroll);
    }
  }
}

if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) >= 0) {
  initOverflowColor();
} else if (typeof document.addEventListener !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initOverflowColor, false);
} else {
  document.attachEvent('onreadystatechange', initOverflowColor);
}

module.exports = initOverflowColor;
