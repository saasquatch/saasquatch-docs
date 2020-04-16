/* 
== JsHint details here ==
*/
import jQuery from "jquery";
import hljs from "highlight.js";

import scrolling from "./scrolling";

const deps = {
  scrolling,
  hljs,
  jQuery
};

export { deps };

window.jQuery = jQuery;

export function init() {
  jQuery(document).ready(function() {
    try {
      require("../lib/bootstrap.min");
      require("magnific-popup");
    } catch (e) {}
    /*
     *   Auto anchor links for article pages
     */
    // var anchors = new anchorJS();
    // anchors.options.placement = 'left';
    // //anchors.options.visible = 'always';
    // anchors.add('.article-content h2, .article-content h3, .article-content h4');
    // anchors.remove('.no-anchor h2, .no-anchor h3, .no-anchor h4');
    // anchors.remove('.no-anchor');

    /*
     *   Auto anchor links for the REST API and Squatch.js Docs
     */
    // var apiReferenceAnchors = new anchorJS();
    // apiReferenceAnchors.options = {
    //   visible: 'always',
    //   placement: 'left'
    // };
    // apiReferenceAnchors.add('.js-apidocs-methodname');

    // nav();
    // search();
    
    // Scrolling not required in React-Static.
    scrolling.init();

    jQuery(".navbar .hamburger").click(function(e) {
      jQuery(this).toggleClass("is-active");
    });

    contentInit();
  });
}

export function contentInit() {
  // LV: Waits for jQuery before loading
  var magnific = require("magnific-popup");
  jQuery(".js-docs-collapse").each(function() {
    var content = jQuery(this);
    var toggler = jQuery("<a class='js-docs-collapse-toggle'>&nbsp;</a>").click(
      function() {
        jQuery(this).toggleClass("active");
        content.toggle();
      }
    );
    content.before(toggler);
  });

  // Uses Bootstrap tooltips
  jQuery(".js-tooltip").tooltip({
    placement: "bottom"
  });

  jQuery("[data-lightbox]").magnificPopup({
    type: "image",
    mainClass: "mfp-with-zoom", // this class is for CSS animation below

    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: "ease-in-out", // CSS transition easing function

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is("img")
          ? openerElement
          : openerElement.find("img");
      }
    }
  });

  jQuery("#js-location-path").text(document.location.pathname);

  // Non-necessary highlighting. Executes asynchronously for faster page load
  setTimeout(function() {
    // TODO: LV: Move these highlighting functions server-side to improve page render time or bundle the JS?
    jQuery(".jsonview").each(function() {
      // parse -> sort -> JSONView
      var each = jQuery(this);
      var json = JSON.parse(each.text());
      Object.keys(json).sort();
      each.JSONView(json, { collapsed: true });
    });

    hljs.initHighlighting();
  }, 1);
}

// init();
