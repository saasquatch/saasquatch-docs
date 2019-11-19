import React, { useLayoutEffect } from "react";
import { useRouteData } from "react-static";
import Isotope from "isotope-layout";

import PageHeader from "../../components/PageHeader";
//@ts-ignore
import themeGallery from "json-loader!../../../content/metadata/themeGallery.json";
import { matchesSelector } from "./matchesSelector";

const id = "themegallery-ljbv11g121h";

export default function render() {
  const { entry } = useRouteData();

  useLayoutEffect(()=>{
    if(typeof document === "undefined") return;
    isotope();
  })

  return (
    <PageHeader {...entry}>
      <>
        <div className="isotope-integration-button-group filters-isotope-integration-button-group">
          <button
            className="isotope-integration-button is-checked"
            data-filter="*"
          >
            All
          </button>
          <button className="isotope-integration-button" data-filter=".popup">
            Popup Widget
          </button>
          <button
            className="isotope-integration-button"
            data-filter=".embedded"
          >
            Embedded Widget
          </button>
          <button className="isotope-integration-button" data-filter=".mobile">
            Mobile Widget
          </button>
          <button className="isotope-integration-button" data-filter=".email">
            Emails
          </button>
        </div>

        <div className="grid" id={id}>
          {Object.keys(themeGallery).map(key => {
            const galleryItem = themeGallery[key];
            if (!galleryItem.isLive) return <div />;

            return (
              <div className="gallery-item {% for type in galleryItem.types %}{{ type }} {% endfor %}">
                <a
                  className="docs-lightbox"
                  href={"/assets/images/theme-gallery/" + galleryItem.image }
                  data-lightbox="example-set"
                >
                  <img
                    className="docs-lightbox"
                    src={"/assets/images/theme-gallery/" + galleryItem.image }
                    alt={ galleryItem.name }
                  />
                  <div>
                    <i className="fa fa-eye"></i> Preview
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </>
    </PageHeader>
  );
}

function isotope() {
  // init Isotope
  var iso = new Isotope("#"+id, {
    itemSelector: ".gallery-item",
    layoutMode: "fitRows"
    //filter: '.business-model'
  });
  // bind filter isotope-integration-button click
  var filtersIntegration = document.querySelector(
    ".filters-isotope-integration-button-group"
  );
  filtersIntegration.addEventListener("click", function(event) {
    // only work with isotope-integration-buttons
    if (!matchesSelector(event.target, "button")) {
      return;
    }
    var filterValue = event.target.getAttribute("data-filter");
    // use matching filter function
    //filterValue = filterFns[ filterValue ] || filterValue;
    iso.arrange({ filter: filterValue });
  });
  // change is-checked class on isotope-integration-buttons
  var buttonGroups = document.querySelectorAll(
    ".isotope-integration-button-group"
  );
  for (var i = 0, len = buttonGroups.length; i < len; i++) {
    var buttonGroup = buttonGroups[i];
    radioButtonGroup(buttonGroup);
  }
  function radioButtonGroup(buttonGroup) {
    buttonGroup.addEventListener("click", function(event) {
      // only work with buttons
    if (!matchesSelector(event.target, "button")) {
        return;
      }
      buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
      event.target.classList.add("is-checked");
    });
  }
}
