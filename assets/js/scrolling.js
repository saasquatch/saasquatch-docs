/**
 * LV: Forked from ZenScroll.
 * 
 * Hard-coded MMenu into the Zenscroll ignore.
 * 
 */
 
import zenscroll from "zenscroll";
import jQuery from 'jquery';

import isOnPage from './isOnPage';

export function init(){
    // Create listeners for the documentElement only & exclude IE8-
	if ("addEventListener" in window && !(isNativeSmoothScrollEnabledOn(document.body))) {
		autoscrollAnchors();
	}
}

function autoscrollAnchors(){
	window.addEventListener("click", function (event) {
		var anchor = event.target;
		while (anchor && anchor.tagName !== "A") {
			anchor = anchor.parentNode;
		}
		// Only handle links that were clicked with the primary button, without modifier keys:
		if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
			return;
		}
		
		var shortHref = anchor.getAttribute("href") || "";
		var fullUrl = jQuery(anchor).prop('href');
		
	    // LV: NOTE -- overidden custom functionality here. Prevent smooth-scrolling for jQuery.mmenu plugin.			
		if (shortHref.substring(0, 4) == "#mm-") {
	        return;
	    }
	    
		if (shortHref.indexOf("#") >= 0) {
			if (shortHref === "#") {
				event.preventDefault();
				zenscroll.toY(0);
			} else if(isOnPage(fullUrl, window.location.href)){
	            event.preventDefault();
	            smoothScrollToHref(anchor);
			}
		}
		
	}, false);
}

export function isNativeSmoothScrollEnabledOn(elem) {
	return ("getComputedStyle" in window) && window.getComputedStyle(elem)["scroll-behavior"] === "smooth";
}


// Extracts the HREF value, and smooth scrolls to that location.
export function smoothScrollToHref(elem){
    var $this = jQuery(elem);
    var anchor = $this.attr('href').split("#")[1];
    var $that = document.getElementById(anchor);
    if(!$that){ throw new Error("Couldn't smooth scroll to anchor." + anchor); }
    zenscroll.to($that);
}

export {
    zenscroll
};

export const scrolling = {
	init:init,
	smoothScrollToHref:smoothScrollToHref,
	zenscroll:zenscroll
};

export default scrolling;