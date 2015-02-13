jQuery(document).ready(function() {

    jQuery('.js-docs-collapse').each(function() {
        var content = jQuery(this);
        var toggler = jQuery("<a class='js-docs-collapse-toggle'>&nbsp;</a>").click(function(){
            jQuery(this).toggleClass("active");
            content.toggle();
        });
        content.before(toggler);
    });

    var tryPretty = function() {
        if (window['prettyPrint']) {
            prettyPrint();
        }
        else {
            setTimeout(tryPretty, 200);
        }
    }
    tryPretty();
});