import jQuery from 'jquery';
import mmenu from 'jquery.mmenu';
import Hammer from 'hammerjs';

window.mmenu = mmenu;
window.Hammer = Hammer;

export default function(){

    var categories = ["successCenter", "developerCenter", "designerCenter"];

    var menuDom = jQuery("#my-menu");

    /**
     * Sets the current page nav item as "Selected"
     * 
     * Source: https://css-tricks.com/snippets/jquery/highlight-all-links-to-current-page/
     */
    var foundElement = null;
    var foundDepth = -1;
    
    function found(el, depth){
        if(depth > foundDepth){
            foundElement = el;
            foundDepth = 0;
        }
    }
    jQuery("a", menuDom).each(function(){
        // TODO: Make anchor-tag pages work
        // TODO: If no exact page matches, provide a reasonable default...
        var thisUrl = jQuery(this).attr("href").replace(/\/+$/, "");
        
        var thatUrl = window.location.pathname.replace(/\/+$/, "");

        var thatUrlWithHash = window.location.pathname + window.location.hash;
        var thatUrlWithHashNoSlash = thatUrl + window.location.hash;
        if(thisUrl == thatUrlWithHash || thisUrl == thatUrlWithHashNoSlash){
            // Checks for HASH/ANCHOR based mapping first
            found(jQuery(this).parent("li"), 2);
            return;
        }
        
        // Checks for that URL minus any trailing slashes
        if(thisUrl == thatUrl){
            found(jQuery(this).parent("li"), 1);
        }
    });
    if(!foundElement){
        // If no nav selected, defaults to the category
        categories.map(function(category){
            found(jQuery("body."+category+ " li."+category), 0);
        });
    }
    if(foundElement){
        foundElement.addClass("Selected");
    }

    
    /*
    * Copies all the "categories" classes to their sub-lists.
    *    This has to be done before MMenu is initalized.
    */
    categories.map(function(category){
        menuDom.find(".baseMenu > ."+category).find('ul').addClass(category);
    });

    /**
     *  Loads the Navigation menu (uses the MMenu jQuery plugin)
     */
    menuDom.mmenu({
         // configuration
         offCanvas: {
            pageSelector: "#my-page"
         },
        //  "counters": true,
        //  "iconPanels": {
        //     "add": true,
        //     "visible": 2
        //  },
         "dragOpen": {
             
         },
         extensions: [
            "theme-squatchdocs",
            "widescreen",
            "pagedim-black",
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

        jQuery("#open-sidenav").click(function(e){
			e.preventDefault();
			if ( jQuery('html').hasClass( 'mm-opened' ) ){
				window.myMenu.close();
			}else{
				window.myMenu.open();
			}
		});
        
      });


    window.myMenu = menuDom.data( "mmenu" );
    
    window.myMenu.bind('opened', function () {
          jQuery("#open-sidenav").addClass("is-active");
      });
    window.myMenu.bind('closed', function () {
          jQuery("#open-sidenav").removeClass("is-active");
      })
};
