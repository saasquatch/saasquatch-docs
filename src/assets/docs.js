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
        
        var keys = Object.keys(json),
        i, len = keys.length;
    
        keys.sort();
        
        each.JSONView(json, { collapsed: true });
        
    });


    hljs.initHighlighting();
    
    jQuery("#js-location-path").text(document.location.pathname);

    if(Handlebars){
        (function(){
            var template = Handlebars.compile(jQuery("#search-template").html());
            
            function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
            
            var query = getParameterByName('q');
            
            jQuery.ajax({
                url: "https://www.googleapis.com/customsearch/v1",
                
                // The name of the callback parameter, as specified by the YQL service
                jsonp: "callback",
             
                // Tell jQuery we're expecting JSONP
                dataType: "jsonp",
             
                // Tell YQL what we want and that we want JSON
                data: {
                    q: query,
                    cx: "014638356218796023717:gvlcaiusvsk",
                    key: "AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU",
                    format: "json"
                },
             
                // Work with the response
                success: function( response ) {
                    jQuery('#results').html(JSON.stringify(response, " ", "\t"));
                    var html = template(response);
                    jQuery('#pretty-results').html(html);
        
                }
            });
        })();
    }

});