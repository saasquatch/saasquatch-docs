import React from "react";
import { useRouteData } from "react-static";
import Meta from "../../components/Meta";

const entry = {
  title: "Growth Automation Program Library",
  highlights:
    "A library of the available Growth Automation Programs by SaaSquatch.",
  slug: "program/library",
  sectionType: "successArticle",
  template: "pages/programLibrary.html"
};

export default function render() {
  const { programs } = useRouteData();

  return (
    <>
      <Meta {...entry} />
      <div className="grid">
        {programs
          .filter(program => program.fields.globallyInstallable === true)
          .map(program => (
            <div
              className={
                "programs-item " //+ program.tags && program.tags.join(" ")
              }
            >
              <div className="program-item-top-section">
                <h3 className="text-center no-anchor program-name-title">
                  {program.fields.name}
                </h3>
                <div className="programs-image">
                  <a
                    className="programImageLink"
                    href={program.slug}
                  >
                    <img className="image" src={program.logo.url} />
                  </a>
                </div>
              </div>
              <div className="program-item-bottom-section">
                <div className="program-item-highlights-container">
                  <p className="highlights program-icon-highlights">
                    {program.fields.summary}
                  </p>
                </div>
                <div className="moreLink">
                  <a
                    className="learnMoreLink"
                    href={program.slug}
                  >
                    Learn More.{" "}
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
