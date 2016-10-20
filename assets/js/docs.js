/* 
== JsHint details here ==
*/

var jQuery = require('jquery');
var smoothScroll = require('smooth-scroll');
var hljs = require('highlight.js');

var anchorJS = require('anchor-js');

// LV: JSON View breaks Webpack
// var jsonview = require('jquery-jsonview');

var search = require('./search');
var nav = require('./nav');

window.jQuery = jQuery;


jQuery(document).ready(function() {
    
    /*
    *   Auto anchor links for article pages
    */
    var anchors = new anchorJS();
    anchors.options.placement = 'left';
    anchors.add('.article-content h2, .article-content h3, .article-content h4');
    
    /*
    *   Auto anchor links for the REST API and Squatch.js Docs
    */
    var apiReferenceAnchors = new anchorJS();
    apiReferenceAnchors.options = {
      visible: 'always',
      placement: 'left'
    };
    apiReferenceAnchors.add('.js-apidocs-methodname');

    var magnific = require('magnific-popup');
    
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
    
    // Uses Bootstrap tooltips
    jQuery('.js-tooltip').tooltip({
        placement: 'bottom'
    });
    
    jQuery('[data-lightbox]').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
    
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it
    
        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
    
        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    
    });
    
    jQuery(".navbar .hamburger").click(function(e){
        jQuery(this).toggleClass("is-active");
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