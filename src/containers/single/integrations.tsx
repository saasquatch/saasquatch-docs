// @ts-nocheck
import React from "react";

// @ts-ignore
import Isotope from "isotope-layout";
import { useRouteData } from "react-static";

import PageHeader from "../../components/PageHeader"
import { matchesSelector } from "./matchesSelector";

/**
 * 
 * 
    {% import "../macros/swaggerMacros.html" as swaggerMacros %}

    {% extends '../article.html' %}
    {% block articleContent %}
    
      {{ contents | safe }}
      
   
      ---
slug: integrations
category: landingPage
template: pages/integrations.html
---


 */
const entry = {
  title: "Integrations",
  highlights: `SaaSquatch integrates with a number of platforms from payment systems that manage automatic referral tracking and fulfillment, to tag management systems that simplify installing integrating
widgets inside your product, to mobile deeplinking platforms that let you optimize and personalize the mobile referral experience.`,
  category: "landingPage"
};

const id = "js-integrations-lit-1hv215152";

export default function render() {
  const { integrations } = useRouteData();

  return (
    <PageHeader {...entry}>
      {/* <div className="isotope-integration-button-group filters-isotope-integration-button-group">
        <button
          className="isotope-integration-button is-checked"
          data-filter="*"
        >
          All
        </button>
        <button className="isotope-integration-button" data-filter=".featured">
          Featured
        </button>
        <button
          className="isotope-integration-button"
          data-filter=".tag-manager"
        >
          Tag Managers
        </button>
        <button className="isotope-integration-button" data-filter=".crm">
          CRMs
        </button>
        <button
          className="isotope-integration-button"
          data-filter=".payment-provider"
        >
          Payment Providers
        </button>
      </div> */}

      <div id={id}>
        {integrations.map(integration => {
          return (
            <div
              className={
                "integration-item " +
                (integration.categories ? integration.categories.join(" ") : "")
              }
            >
              <div className="integration-image">
                <a className="imageLink" href={"/" + integration.slug}>
                  <img
                    className="image"
                    src={integration.logo.url}
                  />
                </a>
              </div>
              <p className="highlights">{integration.integrationDescription}</p>

              <a className="link" href={"/" + integration.slug}>
                Read more about {integration.integrationName}
              </a>
            </div>
          );
        })}
      </div>
      {/* <pre>{JSON.stringify(integrations, null, 2)}</pre> */}
    </PageHeader>
  );
}

function onLoad() {
  // init Isotope
  var iso = new Isotope("#" + id, {
    itemSelector: ".integration-item",
    layoutMode: "fitRows"
    //filter: '.featured'
  });
  // bind filter isotope-button click
  var filtersIntegration = document.querySelector(
    ".filters-isotope-integration-button-group"
  );
  filtersIntegration.addEventListener("click", function(event) {
    // only work with isotope-buttons
    if (!matchesSelector(event.target, "button")) {
      return;
    }
    //@ts-ignore
    var filterValue = event.target.getAttribute("data-filter");
    // use matching filter function
    //filterValue = filterFns[ filterValue ] || filterValue;
    iso.arrange({ filter: filterValue });
  });
  // change is-checked class on isotope-buttons
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
