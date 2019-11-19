import React, { useLayoutEffect } from "react";

// import Markdown from "../components/Markdown.jsx";

import Isotope from "isotope-layout";
import PageHeader from "../../components/PageHeader";
import { useRouteData } from "react-static";
import { matchesSelector } from "./matchesSelector";

const entry = {
  title: "Guides",
  highlights: `The SaaSquatch Guides show you how to use our tools to create your own world-class referral and loyalty programs.`,
  sectionType: "guide",
  hero: true
  // "slug": guides
  // "template": pages/guides.html
};
const id = "js-guides-215kjb2151";
export default function render() {
  const { guides, integrations } = useRouteData();
  useLayoutEffect(() => {
    onLoad();
  }, []);

  return (
    <PageHeader {...entry}>
      <div className="isotope-integration-button-group filters-isotope-integration-button-group">
        <button
          id="filterAll"
          className="isotope-integration-button"
          data-filter="*"
        >
          All
        </button>
        <button className="isotope-integration-button" data-filter=".library">
          Libraries
        </button>
        <button
          className="isotope-integration-button"
          data-filter=".integration"
        >
          Integrations
        </button>
        <button
          className="isotope-integration-button"
          data-filter=".payment-provider"
        >
          Payment Providers
        </button>
        <button
          id="filterFeature"
          className="isotope-integration-button"
          data-filter=".feature"
        >
          Features
        </button>
      </div>

      <div id={id}>
        {Object.keys(guides).map((key: any) => {
          const guide = guides[key];
          return (
            <div className={"guides-item " + guide.types.join(" ")}>
              {guide.icon && (
                <h3 className="text-center no-anchor">{guide.name}</h3>
              )}
              <div className="guides-image">
                <a className="imageLink" href={guide.slug}>
                  {guide.icon && (
                    <i
                      className={"icon fa fa-6 " + guide.icon}
                      aria-hidden="true"
                    ></i>
                  )}
                  {guide.image && (
                    <img
                      className="image"
                      src={"/assets/images/integrations/" + guide.image}
                    />
                  )}
                </a>
              </div>
              <p className="highlights guides-icon-highlights">
                {guide.summary}{" "}
              </p>

              <p>
                <a className="link" href={guide.slug}>
                  {guide.linkText}.{" "}
                </a>
              </p>
            </div>
          );
        })}

        {integrations
          .filter(
            integration =>
              integration.categories &&
              integration.categories.some(
                c => c == "payment-provider" || c == "tag-manager"
              )
          )
          .map(integration => {
            return (
              <div
                className={
                  "guides-item integration " +
                  (integration.categories
                    ? integration.categories.join(" ")
                    : "")
                }
              >
                <div className="guides-image">
                  <a className="imageLink" href={integration.guideLink}>
                    <img
                      className="image"
                      src={"/assets/images/integrations/" + integration.logo}
                    />
                  </a>
                </div>
                <p className="highlights guides-image-highlights">
                  {integration.highlights}
                </p>

                <a className="link" href={integration.guideLink}>
                  Read more about {integration.integrationName}
                </a>
              </div>
            );
          })}
      </div>
    </PageHeader>
  );
}

function onLoad() {
  //pickup arguements from URL
  var getQueryString = function(field: string, url?: string) {
    var href = url ? url : window.location.href;
    var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
    var string = reg.exec(href);
    return string ? string[1] : null;
  };
  //check whether the link to the guides page is from the success center
  var isSuccessCenter = getQueryString("isSuccessCenter");
  console.log(isSuccessCenter);
  let iso;
  if (isSuccessCenter == "true") {
    var temp = document.getElementById("filterFeature");
    temp.classList.add("is-checked");

    // init Isotope
    iso = new Isotope("#" + id, {
      itemSelector: ".guides-item",
      layoutMode: "fitRows",
      filter: ".feature"
    });
  } else {
    var temp = document.getElementById("filterAll");
    temp.classList.add("is-checked");
    // init Isotope
    iso = new Isotope("#" + id, {
      itemSelector: ".guides-item",
      layoutMode: "fitRows"
    });
  }
  // bind filter isotope-integration-button click
  var filtersIntegration = document.querySelector(
    ".filters-isotope-integration-button-group"
  );
  filtersIntegration.addEventListener("click", function(event) {
    // only work with isotope-integration-buttons
    // if (!matchesSelector(event.target, "button")) {
    //   return;
    // }
    // @ts-ignore
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
      // @ts-ignore
      if (!matchesSelector(event.target, "button")) {
        return;
      }
      buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
      event.target.classList.add("is-checked");
    });
  }
}


