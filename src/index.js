const ATTRIBUTE_PREFIX = 'data-oc';

let topColor;
let bottomColor;

let currentBgColor;
let styleTag;

let lastScrollY;
let ticking = false;

/**
 * Request animation frame polyfill
 * @param {function} callback 
 */
const requestAnimFrame = (() => {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || (callback => {
      window.setTimeout(callback, 1000 / 60);
    });
})();

/**
 * If needed, set the new new color as
 * html background
 * @param {string} color 
 */
const setBgColor = (color) => {
  if (currentBgColor !== color) {
    currentBgColor = color;
    let css = `html { background: ${currentBgColor}; }`;

    if (!styleTag) {
      styleTag = document.createElement('style');
      const head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(styleTag);
    }

    if (styleTag.styleSheet) {
      styleTag.styleSheet.cssText = css;
    } else {
      styleTag.innerHTML = css;
    }
  }
}

/**
 * Checks the scroll position and determines
 * the overflow color to set between the
 * topColor and the bottomColor
 */
const checkScroll = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimFrame(function() {
      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;
      if (scrollHeight === innerHeight) {
        setBgColor(bottomColor);
      } else {
        setBgColor(innerHeight - scrollHeight + 2 * lastScrollY < 0 ? topColor : bottomColor);
      }
      ticking = false;
    });
    ticking = true;
  }
}

/**
 * Gets the two overflow colors and init the
 * window scroll and resize event listeners
 */
const initOverflowColor = () => {
  const shortcutAttributeEl = document.querySelector(`[${ATTRIBUTE_PREFIX}]`);
  if (shortcutAttributeEl) {
    const split = shortcutAttributeEl.getAttribute(ATTRIBUTE_PREFIX).split(',');
    if (split.length > 1) {
      topColor = split[0];
      bottomColor = split[1];
    }
    else if (split.length === 1) {
      topColor = bottomColor = split[0];
    }
  }
  else {
    const topAttributeEl = document.querySelector(`[${ATTRIBUTE_PREFIX}-top]`);
    const bottomAttributeEl = document.querySelector(`[${ATTRIBUTE_PREFIX}-bottom]`);
    if (topAttributeEl) {
      topColor = topAttributeEl.getAttribute(`${ATTRIBUTE_PREFIX}-top`);
    }
    if (bottomAttributeEl) {
      bottomColor = bottomAttributeEl.getAttribute(`${ATTRIBUTE_PREFIX}-bottom`);
    }
  }

  if (topColor || bottomColor) {
    if (!topColor && bottomColor) {
      topColor = bottomColor;
    }
    else if (topColor && !bottomColor) {
      bottomColor = topColor;
    }

    const bodyComputedStyle = window.getComputedStyle(document.body, null);
    let bodyComputedBackground = bodyComputedStyle.getPropertyValue('background');
    if (bodyComputedBackground === '' || (bodyComputedStyle.getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && bodyComputedBackground.substring(21, 17) === 'none')) {
      bodyComputedBackground = 'white';
    }
    document.body.style.background = 'transparent';

    const bodyWrapperEl = document.createElement('div');
    bodyWrapperEl.setAttribute(`${ATTRIBUTE_PREFIX}-wrap`, '');
    bodyWrapperEl.style.background = bodyComputedBackground;
    for (let i = 0, l = document.body.childNodes.length; i < l; i++) {
      bodyWrapperEl.appendChild(document.body.childNodes[0]);
    }
    document.body.appendChild(bodyWrapperEl);
    document.addEventListener('touchmove', (event) => {
      console.log(event);
    }, false);

    checkScroll();
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('scroll', checkScroll, false);
      window.addEventListener('resize', checkScroll, false);
    }
    else {
      window.attachEvent('scroll', checkScroll);
      window.attachEvent('resize', checkScroll);
    }
  }
}

if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) !== -1) {
  initOverflowColor();
} else if (typeof document.addEventListener !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initOverflowColor, false);
} else {
  document.attachEvent('onreadystatechange', initOverflowColor);
}

export default checkScroll;
