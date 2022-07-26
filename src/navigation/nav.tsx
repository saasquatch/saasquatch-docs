import React from "react";
import { History } from "history";
import { MMenuContext } from "./NavigationSidebar";
import { double_chevron_left } from "@saasquatch/visual-dev/dist/components/Icon/SVGs";

let jQuery;
if (typeof document !== "undefined") {
  let mmenu = require("jquery.mmenu");
  let Hammer = require("hammerjs");
  // For server-side render
  jQuery = require("jquery");
  //@ts-ignore
  window.mmenu = mmenu;
  //@ts-ignore - LV: I think this is for making mmenu mobile touch friendly
  window.Hammer = Hammer;
}
var categories = ["successCenter", "developerCenter", "designerCenter"];

function findElementForCurrentUrl(location: any) {
  /**
   * Sets the current page nav item as "Selected"
   *
   * Source: https://css-tricks.com/snippets/jquery/highlight-all-links-to-current-page/
   */
  var foundElement = null;
  var foundDepth = -1;

  function found(el, depth) {
    if (depth > foundDepth) {
      foundElement = el;
      foundDepth = 0;
    }
  }
  jQuery("a", jQuery("#my-menu")).each(function () {
    // TODO: Make anchor-tag pages work
    // TODO: If no exact page matches, provide a reasonable default...
    var thisUrl = jQuery(this).attr("href")?.replace(/\/+$/, "");
    if (!thisUrl) {
      // Not a real link element;
      return;
    }

    var thatUrl = location.pathname.replace(/\/+$/, "");

    var thatUrlWithHash = location.pathname + location.hash;
    var thatUrlWithHashNoSlash = thatUrl + location.hash;
    if (thisUrl == thatUrlWithHash || thisUrl == thatUrlWithHashNoSlash) {
      // Checks for HASH/ANCHOR based mapping first
      found(jQuery(this).parent("li"), 2);
      return;
    }

    // Checks for that URL minus any trailing slashes
    if (thisUrl == thatUrl) {
      found(jQuery(this).parent("li"), 1);
    }
  });
  if (!foundElement) {
    // If no nav selected, defaults to the category
    categories.map(function (category) {
      found(jQuery("body." + category + " li." + category), 0);
    });
  }
  return foundElement;
}

export const MMenuID = "my-menu";
export default function init(search: HTMLElement, history: History<any>) {
  var menuDom = jQuery(`#${MMenuID}`);

  const foundElement = findElementForCurrentUrl(window.location);

  if (foundElement) {
    foundElement.addClass("Selected");
  }

  /*
   * Copies all the "categories" classes to their sub-lists.
   *    This has to be done before MMenu is initalized.
   */
  categories.map(function (category) {
    menuDom
      .find(".baseMenu > ." + category)
      .find("ul")
      .addClass(category);
  });

  /**
   *  Loads the Navigation menu (uses the MMenu jQuery plugin)
   */
  menuDom
    // @ts-ignore
    .mmenu({
      // configuration
      offCanvas: {
        pageSelector: "#my-page",
      },
      //  "counters": true,
      //  "iconPanels": {
      //     "add": true,
      //     "visible": 2
      //  },
      dragOpen: {},
      extensions: [
        "theme-squatchdocs",
        "widescreen",
        "pagedim-black",
        "multiline",
      ],
      navbars: [
        {
          position: "top",
          content: [search],
        },
        {
          position: "top",
          content: "<p>&nbsp;</p>",
        },
        {
          position: "top",
          content: "<p>&nbsp;</p>",
        },
        {
          position: "top",
          content: ["breadcrumbs"],
        },
      ],
      //  offCanvas: {
      //     pageSelector: "#my-page",
      //     pageNodetype: "category"
      //  }
    })
    .init(function ($panels) {
      /**
       * Copies the "category" styling onto their parent `.mm-panel` containers
       *
       */
      // categories.map(function(category) {
      //   jQuery(".mm-panel > ul." + category, menuDom)
      //     .parent(".mm-panel")
      //     .addClass(category);
      // });

      jQuery("#open-sidenav").click(function (e) {
        e.preventDefault();
        if (jQuery("html").hasClass("mm-opened")) {
          myMenu.close();
        } else {
          myMenu.open();
        }
      });
    });

  const myMenu = menuDom.data("mmenu");

  updateSidebarForCurrentURL(myMenu, window.location);
  connectMobileToggle(myMenu);
  connectHistoryListener(history, myMenu);

  return myMenu;
}

/**
 * Connects the mobile-only button that hides and shows the sidebar
 */
function connectMobileToggle(myMenu: any) {
  myMenu.bind("opened", () => jQuery("#open-sidenav").addClass("is-active"));
  myMenu.bind("closed", () => jQuery("#open-sidenav").removeClass("is-active"));
}

/**
 * Connect MMenu to React history for Back / Forward button support
 *
 * Source: https://github.com/ReactTraining/react-router/issues/3554
 */
function connectHistoryListener(history: History<any>, myMenu: any) {
  history.listen((location) => {
    //Do your stuff here
    updateSidebarForCurrentURL(myMenu, location);
  });
}

/**
 * Uses the mmenu API to open the correct page for the current URL
 *
 * @param myMenu
 */
function updateSidebarForCurrentURL(myMenu: any, location: any) {
  const foundElement = findElementForCurrentUrl(location);
  if (foundElement) {
    if (location.pathname === "/") {
      const mainA = document.getElementById("mm-1");
      if (mainA) {
        myMenu.openPanel(jQuery(mainA));
      }
    }
    if (foundElement.hasClass("mm-vertical")) {
      // myMenu.
    } else {
      //close menu when you change page
      myMenu.close();
      // Open the right panel
      myMenu.setSelected(foundElement);
    }

    const highest = foundElement.closest(".mm-highest");
    if (highest && highest.length) {
      myMenu.openPanel(highest);
    }

    const hidden = foundElement.closest(".mm-hidden");
    if (hidden && hidden.length) {
      myMenu.openPanel(hidden);
    }
    // Open closest top-level panel
    const parent = foundElement.closest(".mm-panel");
    if (parent && parent.length) {
      myMenu.openPanel(parent);
    }

    const dropdown = foundElement.parents(".mm-vertical");
    if (dropdown && dropdown.length) {
      myMenu.openPanel(dropdown);
    }
  } else {
    myMenu.setSelected(null);
  }
}
