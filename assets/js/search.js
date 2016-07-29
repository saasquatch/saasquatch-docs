var getParameterByName = require('./getParameterByName');
var jQuery = require('jquery');
var Handlebars = require('handlebars/dist/handlebars');

module.exports = function(){
    /**
     * 
     *  Docs Search
     * 
     * 
     *  Uses google custom search, Handlebars, and format 
     * 
     */

    jQuery("#js-docs-search-results").each(function(){
        
        // var categoryFilter = "more:pagemap:metatags-type:jsReference";
        
        var query = getParameterByName('q');
        var cat = getParameterByName('cat');
        var startIndex = getParameterByName('startIndex');
        
        if(!query){
            jQuery('#results').html("");
            jQuery('#pretty-results').html("");
            return; // Bail out!
        }
        
        jQuery(".js-search-form .search-query").val(query);
        jQuery(".js-search-form input[name=cat]").val([cat]);
        
        Handlebars.registerHelper('pagination', function(startIndex) {
            return "/search/?q=" + encodeURIComponent(query) + "&cat=" + encodeURIComponent(cat) + "&startIndex=" + encodeURIComponent(startIndex);
        });
        var template = Handlebars.compile(jQuery("#search-template").html());

        var privateQuery;
        if(cat && cat.length > 1){
            // privateQuery = query + " more:pagemap:metatags-type:" + cat;
            privateQuery = query + " more:pagemap:metatags-docsCategory:" + cat;
        }else{
            privateQuery = query;
        }

        var dataObj = {
            q: privateQuery,
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
                jQuery('#pretty-results').html(template(response));
                window.searchResults = response;
            }
        });

    });

}