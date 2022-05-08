// @ts-nocheck
import React from "react";

import { useRouteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";

import PageHeader from "../../components/PageHeader";

const entry = {
  title: "Integrations",
  highlights: `SaaSquatch integrates with a number of platforms from payment systems that manage automatic referral tracking and fulfillment, to tag management systems that simplify installing integrating
widgets inside your product, to mobile deeplinking platforms that let you optimize and personalize the mobile referral experience.`,
  category: "landingPage",
};

const id = "js-integrations-lit-1hv215152";

export default function render() {
  const { integrations } = useRouteData();

  return (
    <PageHeader {...entry}>
      <div id={id}>
        {integrations.map((integration) => {
          return (
            <div
              className={
                "integration-item " +
                (integration.categories ? integration.categories.join(" ") : "")
              }
            >
              <div className="integration-image">
                <Link className="imageLink" to={"/" + integration.slug}>
                  <img className="image" src={integration.logo.url} />
                </Link>
              </div>
              <p className="highlights">{integration.integrationDescription}</p>

              <Link className="link" to={"/" + integration.slug}>
                <div className="btnContainer">
                  <button>Read more {/* about {integration.integrationName} */}</button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </PageHeader>
  );
}
