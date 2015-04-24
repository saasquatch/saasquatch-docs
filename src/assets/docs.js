/* 
== JsHint details here ==
*/
/* global hljs */
/* global Handlebars */

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