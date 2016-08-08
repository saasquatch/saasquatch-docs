/* 
== JsHint details here ==
*/

var jQuery = require('jquery');
var smoothScroll = require('smooth-scroll');
var hljs = require('highlight.js');

// Non import friendly
var lightbox = require('lightbox2');

// LV: JSON View breaks Webpack
// var jsonview = require('jquery-jsonview');

var search = require('./search');
var nav = require('./nav');

window.jQuery = jQuery;

jQuery(document).ready(function() {
    
    initializeScolling(); // Scrolling is first, because it's a dependency of nav
    nav();
    search();
    
    if ( window.location.hash ) { 
        smoothScroll.animateScroll(window.location.hash);
    }

    jQuery('.js-docs-collapse').each(function() {
        var content = jQuery(this);
        var toggler = jQuery("<a class='js-docs-collapse-toggle'>&nbsp;</a>").click(function(){
            jQuery(this).toggleClass("active");
            content.toggle();
        });
        content.before(toggler);
    });
    
    jQuery("#js-location-path").text(document.location.pathname);

     // Activates smooth scroll links when
     jQuery("#toc-content a, .js-faq-list a").click(function(e){
         window.smoothScrollTo(jQuery(this));
         return false;
     });


    /**
     *  Typeform Javascript
     * 
     *  Finds all 
     */

    (function() {
        var js, q, d = document,
          gi = d.getElementById,
          ce = d.createElement,
          gt = d.getElementsByTagName,
          id = 'typef_orm',
          b = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/';
        if (!gi.call(d, id)) {
          js = ce.call(d, 'script');
          js.id = id;
          js.src = b + 'share.js';
          q = gt.call(d, 'script')[0];
          q.parentNode.insertBefore(js, q);
        }
        id = id + '_';
        if (!gi.call(d, id)) {
        }
    })();
    
    // Non-necessary highlighting
    setTimeout(function(){
        // TODO: LV: Move these highlighting functions server-side to improve page render time or bundle the JS
        jQuery('.jsonview').each(function() {
            // parse -> sort -> JSONView
            var each = jQuery(this);
            var json = JSON.parse(each.text());
            Object.keys(json).sort();
            each.JSONView(json, { collapsed: true });
        });
    
        hljs.initHighlighting();
    },1);
    

});

function initializeScolling(){
    // TODO: Fix artefact of Affix on chrome
    smoothScroll.init({
        speed: 1000,
        easing: 'easeInOutCubic',
        offset: 100,
        updateURL: true,
        callbackBefore: function ( toggle, anchor ) {},
        callbackAfter: function ( toggle, anchor ) {
            anchor.focus();
        }
    });
}



// Extracts the HREF value, and smooth scrolls to that location.
window.smoothScrollTo = function(elem){
    var $this = jQuery(elem);
    var anchor = "#" + $this.attr('href').split("#")[1];
    smoothScroll.animateScroll(anchor);
}