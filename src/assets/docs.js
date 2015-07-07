/* 
== JsHint details here ==
*/
/* global hljs */
/* global Handlebars */
/* global smoothScroll */

jQuery(document).ready(function() {

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
        callbackAfter: function ( toggle, anchor ) {}
    });
    if ( window.location.hash ) { 
     smoothScroll.animateScroll( null, window.location.hash);
    }
    if( location.pathname == "/api/methods/"){
     // Activates smooth scroll links when
     jQuery("#accordion-scroller .accordion-inner a").click(function(e){
         var $this = jQuery(this);
         var anchor = "#" + $this.attr('href').split("#")[1];
         smoothScroll.animateScroll( null, anchor);
         return false;
     });
    }    
    
    jQuery(".js-search-form").submit(function(){
        var searchTerm = jQuery(this).find(".search-query").val();
        window.location.href = "/search/?q=" + encodeURIComponent(searchTerm);
        
        return false; // prevent default
    });

    // TODO: Use JQuery to selectively load
    
    jQuery("#js-docs-search-results").each(function(){
        
        
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
            cx: "014638356218796023717:gvlcaiusvsk",
            key: "AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU",
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