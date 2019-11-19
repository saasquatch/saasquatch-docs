import React from "react";
import { useRouteData } from "react-static";
import Markdown from "../components/Markdown";
import Meta from "../components/Meta";

export default function render() {
  const { entry } = useRouteData();
  const { logo, title, highlights, screenshot, tags, contents } = entry;

  return (
    <>
      <Meta {...entry} />
      <section className="article-content">
        <div className="program-item">
          <div className="row-fluid program-header">
            <div className="span2">
              <div className="program-header-icon">
                {logo && <img src={logo.url} alt={logo.name} id="logo" />}
              </div>
            </div>
            <div className="span7 program-header-content-block">
              <div className="program-header-content">
                <h1
                  style={{ display: "inline-block" }}
                  className="program-header-item"
                >
                  {title}
                </h1>

                {tags && tags.some(tag => tag == "Beta") && (
                  <span
                    style={{ display: "inline-block" }}
                    className="label docs-label-beta"
                  >
                    Beta
                  </span>
                )}
                <div className="program-header-item">
                  <Markdown source={highlights} />
                </div>
              </div>
            </div>
            <div className="span3">
              {screenshot && (
                <img
                  src={screenshot.url}
                  alt={screenshot.name}
                  id="background-image"
                />
              )}
            </div>
          </div>

          <div className="row-fluid">
            <div className="span12">
              <div className="product-content no-anchor">
                {tags && tags.some(tag => tag == "Beta") && (
                  <blockquote>
                    <p>
                      This feature is currently in Beta. Please contact our{" "}
                      <a href="mailto:support@referralsaasquatch.com">
                        support team
                      </a>{" "}
                      to learn more about how to enroll.
                    </p>
                  </blockquote>
                )}

                <Markdown source={contents} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
