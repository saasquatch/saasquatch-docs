/**
 * LV: Forked from ZenScroll.
 *
 * Hard-coded MMenu into the Zenscroll ignore.
 *
 */

import "./browser-required-warning";

export function init() {
  autoscrollAnchors();
}

function autoscrollAnchors() {
  window.addEventListener(
    "click",
    function (event) {
      var anchor = event.target as HTMLElement;
      while (anchor && anchor.tagName !== "A") {
        anchor = anchor.parentNode as HTMLAnchorElement;
      }
      // Only handle links that were clicked with the primary button, without modifier keys:
      if (
        !anchor ||
        event.which !== 1 ||
        event.shiftKey ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      var shortHref = anchor.getAttribute("href") || "";

      // LV: Prevents MMenu items from scrolling
      if (shortHref.substring(0, 4) == "#mm-") {
        event.preventDefault();
        return false;
      }
    },
    true
  );
}

export const scrolling = {
  init: init,
};

export default scrolling;
