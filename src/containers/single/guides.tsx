import React from "react";

import { useRouteData } from "react-static";

import PageHeader from "../../components/PageHeader";
import { matchesSelector } from "./matchesSelector";
import useBrowserEffect from "src/util/useBrowserEffect";

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

  return (
    <PageHeader {...entry}>
     
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