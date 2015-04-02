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

});