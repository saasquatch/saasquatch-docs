/* 
== JsHint details here ==
*/
/* global jQuery */
/* global hljs */
/* global Handlebars */
/* global smoothScroll */

jQuery(document).ready(function() {

    var menuDom = jQuery("#my-menu");

    /**
     * Sets the current page nav item as "Selected"
     * 
     * Source: https://css-tricks.com/snippets/jquery/highlight-all-links-to-current-page/
     */
    var selectedOne = false;
    jQuery("a", menuDom).filter(function(){
        // TODO: Make anchor-tag pages work
        // TODO: If no exact page matches, provide a reasonable default...
        var thisUrl = window.location.pathname.replace(/\/+$/, "");
        var thatUrl = jQuery(this).attr("href").replace(/\/+$/, "");
        return thisUrl == thatUrl;
    })
    .first()
    .each(function() {
        selectedOne = true;
        jQuery(this).parent("li").addClass("Selected");
    });
    
    var categories = ["successCenter", "developerCenter", "designerCenter"];

    if(!selectedOne){
        // If no nav selected, defaults to the category
        categories.map(function(category){
            jQuery("body."+category+ " li."+category).addClass("Selected");
        });
    }

    
    /*
    * Copies all the "categories" classes to their sub-lists.
    *    This has to be done before MMenu is initalized.
    */
    categories.map(function(category){
        jQuery("li."+category+" ul", menuDom).addClass(category);
    });

    /**
     *  Loads the Navigation menu (uses the MMenu jQuery plugin)
     */
    menuDom.mmenu({
         // configuration
         "offCanvas": false,
        //  "counters": true,
         "iconPanels": {
            "add": true,
            "visible": 2
         },
         extensions: [
            "theme-squatchdocs",
            "multiline"
         ]
         
        //  offCanvas: {
        //     pageSelector: "#my-page",
        //     pageNodetype: "category"
        //  }
      }).init(function($panels){
        /**
         * Copies the "category" styling onto their parent `.mm-panel` containers
         * 
         */
        categories.map(function(category){
            jQuery(".mm-panel > ul." + category, menuDom).parent(".mm-panel").addClass(category);
        });
      });


    window.myMenu = menuDom.data( "mmenu" );
      
    jQuery('.js-docs-collapse').each(function() {
        var content = jQuery(this);
        var toggler = jQuery("<a class='js-docs-collapse-toggle'>&nbsp;</a>").click(function(){
            jQuery(this).toggleClass("active");
            content.toggle();
        });
        content.before(toggler);
    });
    
    jQuery('.jsonview').each(function() {
        var each = jQuery(this);
        var json = JSON.parse(each.text());
        Object.keys(json).sort();
        each.JSONView(json, { collapsed: true });
    });


    hljs.initHighlighting();
    
    jQuery("#js-location-path").text(document.location.pathname);


    // TODO: Implement smooth scroll: https://github.com/cferdinandi/smooth-scroll
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
    if ( window.location.hash ) { 
     smoothScroll.animateScroll( null, window.location.hash);
    }
    
     // Activates smooth scroll links when
     jQuery("#accordion-scroller .accordion-inner a",
            "#toc-content a",
            ".js-faq-list a").click(function(e){
         var $this = jQuery(this);
         var anchor = "#" + $this.attr('href').split("#")[1];
         smoothScroll.animateScroll( null, anchor);
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
    
    
    /**
     * 
     *  Docs Search
     * 
     * 
     *  Uses google custom search, Handlebars, and format 
     * 
     */
    
    jQuery(".js-search-form").submit(function(){
        var searchTerm = jQuery(this).find(".search-query").val();
        window.location.href = "/search/?q=" + encodeURIComponent(searchTerm);
        return false; // prevent default
    });

    jQuery("#js-docs-search-results").each(function(){
        
        // var categoryFilter = "more:pagemap:metatags-type:jsReference";
        
        var query = getParameterByName('q');
        var startIndex = getParameterByName('startIndex');
        
        if(!query){
            jQuery('#results').html("");
            jQuery('#pretty-results').html("");
            return; // Bail out!
        }
        
        jQuery(".js-search-form .search-query").val(query);
        
        var template = Handlebars.compile(jQuery("#search-template").html());
       
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        var dataObj = {
            q: query,
            cx: window.env.GCSE_CX,
            key: window.env.GCSE_KEY,
            format: "json"
        };
        
        if(startIndex){
            dataObj.start = startIndex;
        }

        jQuery.ajax({
            url: "https://www.googleapis.com/customsearch/v1",
            dataType: "jsonp",
            jsonp: "callback",
            data: dataObj,
        
            // Work with the response
            success: function( response ) {
                jQuery('#results').html(JSON.stringify(response, " ", "\t"));
                var html = template(response);
                jQuery('#pretty-results').html(html);
                
                rebind();
            }
        });
                
        var rebind = function(){
            jQuery(".js-search-pager").click(function(e){
                var start = jQuery(this).data('start');
                var q = jQuery(this).data('q');
                
                window.location.href = "/search/?q=" + encodeURIComponent(q) + "&startIndex=" + start;
                return false;
            });
        };

    });
    
});