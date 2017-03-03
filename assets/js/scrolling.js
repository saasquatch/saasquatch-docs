/**
 * LV: Forked from ZenScroll.
 * 
 * Hard-coded MMenu into the Zenscroll ignore.
 * 
 */
 
import defaultScroller from "zenscroll";
import jQuery from 'jquery';

export function isNativeSmoothScrollEnabledOn(elem) {
	return ("getComputedStyle" in window) &&
		window.getComputedStyle(elem)["scroll-behavior"] === "smooth";
}

export function autoZenScroll(){
    // Create listeners for the documentElement only & exclude IE8-
	if ("addEventListener" in window && !(isNativeSmoothScrollEnabledOn(document.body))) {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual"
			window.addEventListener("popstate", function (event) {
				if (event.state && "scrollY" in event.state) {
					defaultScroller.toY(event.state.scrollY)
				}
			}, false)
		}
		var replaceUrl = function (hash, newY) {
			try {
				history.replaceState({scrollY:defaultScroller.getY()}, "") // remember the scroll position before scrolling
				history.pushState({scrollY:newY}, "", window.location.href.split("#")[0] + hash) // remember the new scroll position (which will be after scrolling)
			} catch (e) {
				// To avoid the Security exception in Chrome when the page was opened via the file protocol, e.g., file://index.html
			}
		}
		window.addEventListener("click", function (event) {
			var anchor = event.target
			while (anchor && anchor.tagName !== "A") {
				anchor = anchor.parentNode
			}
			// Only handle links that were clicked with the primary button, without modifier keys:
			if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
				return
			}
			
			var href = anchor.getAttribute("href") || ""

            // LV: NOTE -- overidden custom functionality here. Prevent smooth-scrolling for jQuery.mmenu plugin.			
			if (href.substring(0, 4) == "#mm-") {
                return
            }
            
			if (href.indexOf("#") === 0) {
				if (href === "#") {
					event.preventDefault()
					defaultScroller.toY(0)
					replaceUrl("", 0)
				} else {
					var targetId = anchor.hash.substring(1)
					var targetElem = document.getElementById(targetId)
					if (targetElem) {
						event.preventDefault()
						replaceUrl("#" + targetId, defaultScroller.to(targetElem))
					}
				}
			}
		}, false)
	}
}



// Extracts the HREF value, and smooth scrolls to that location.
export function smoothScrollTo(elem){
    var $this = jQuery(elem);
    var anchor = $this.attr('href').split("#")[1];
    var $that = document.getElementById(anchor);
    if(!$that){ throw new Error("Couldn't smooth scroll to anchor."); }
    defaultScroller.to($that);
}

export {
    defaultScroller
};

export const scrolling = {
	autoZenScroll:autoZenScroll,
	smoothScrollTo:smoothScrollTo,
	defaultScroller:defaultScroller
};

export default scrolling;