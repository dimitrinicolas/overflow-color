let ocTopColor;
let ocBottomColor;

let ocStyleTag;

let currentColor;

let bodyBackground;

let bodyWrap;

const setBgColor = function(color) {

  currentColor = color;

  if (ocStyleTag) {
    ocStyleTag.parentNode.removeChild(ocStyleTag);
  }

  let css = 'html { background: ' + color + '; }';
  let head = document.head || document.getElementsByTagName('head')[0];

  ocStyleTag = document.createElement('style');

  if (ocStyleTag.styleSheet) {
    ocStyleTag.styleSheet.cssText = css;
  }
  else {
    ocStyleTag.appendChild(document.createTextNode(css));
  }

  head.appendChild(ocStyleTag);

}

const handleScroll = function () {

  if (document.body.scrollHeight === window.innerHeight) {
    setBgColor(ocBottomColor);
  }
  else {

    let diffTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    let diffBottom = document.body.scrollHeight - (diffTop + window.innerHeight);

    if (diffTop < diffBottom && currentColor !== ocTopColor) {
      setBgColor(ocTopColor);
    }
    else if (diffTop > diffBottom && currentColor !== ocBottomColor) {
      setBgColor(ocBottomColor);
    }

  }

}

function initOverflowColor() {

  let topEl = document.querySelector('[data-oc-top]');
  let bottomEl = document.querySelector('[data-oc-bottom]');
  let shortcutEl = document.querySelector('[data-oc]');

  if (shortcutEl) {
    let split = shortcutEl.getAttribute('data-oc').split(',');
    if (split.length > 1) {
      ocTopColor = split[0];
      ocBottomColor = split[1];
    }
    else if (split.length === 1) {
      ocTopColor = ocBottomColor = split[0];
    }
  }
  else {
    if (topEl) {
      ocTopColor = topEl.getAttribute('data-oc-top');
    }
    if (bottomEl) {
      ocBottomColor = bottomEl.getAttribute('data-oc-bottom');
    }
  }

  if (ocTopColor || ocBottomColor) {

    let bodyComputedStyle = window.getComputedStyle(document.body, null);
    bodyBackground = bodyComputedStyle.getPropertyValue('background');
    if (bodyBackground === '' || (bodyComputedStyle.getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' && bodyBackground.substring(21, 17) === 'none')) {
      bodyBackground = 'white';
    }
    document.body.style.background = 'transparent';
    bodyWrap = document.createElement('div');
    bodyWrap.setAttribute('data-oc-wrap', '');
    bodyWrap.style.background = bodyBackground;
    for (let i = 0, l = document.body.childNodes.length; i < l; i++) {
      bodyWrap.appendChild(document.body.childNodes[0]);
    }
    document.body.appendChild(bodyWrap);

    if (!ocTopColor && ocBottomColor) {
      ocTopColor = ocBottomColor;
    }
    else if (ocTopColor && !ocBottomColor) {
      ocBottomColor = ocTopColor;
    }

    if (document.body.scrollHeight > window.innerHeight) {
      setBgColor(ocTopColor);
    }
    else {
      setBgColor(ocBottomColor);
    }

    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('scroll', handleScroll, false);
      window.addEventListener('resize', handleScroll, false);
    }
    else {
      window.attachEvent('scroll', handleScroll);
      window.attachEvent('resize', handleScroll);
    }

  }

}

if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) >= 0) {
  initOverflowColor();
}
else if (typeof document.addEventListener !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initOverflowColor, false);
}
else {
  document.attachEvent('onreadystatechange', initOverflowColor);
}

export default initOverflowColor;
