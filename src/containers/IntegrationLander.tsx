import React from "react";
import { useRouteData } from "react-static";

import Markdown from "../components/Markdown";
import Meta from "../components/Meta";


export default function render() {
  const { entry } = useRouteData();
  const {
    logo,
    integrationName,
    integrationDescription,
    feature,
    info,
    moreInfo,
    contents,
    keyFeatures
  } = entry;

  return (
    <>
      <Meta {...entry} />
      <section className="integrationLander">
        <div className="page-header">
          <h1 className="integrationHeader">
            <img
              src={"/assets/images/integrations/" + logo}
              alt={integrationName}
            />
            {" + "}
            <img
              src="/assets/images/integrations/saasquatch.png"
              alt="SaaSquatch"
            />
          </h1>

          <div className="row-fluid">
            <div className="lead span8 offset2">
              <Markdown source={integrationDescription} />
            </div>
          </div>
        </div>

        <div className="row-fluid">
          <div className="span7">
            <h3>Key features</h3>

            <ul>
              {keyFeatures.map(f => (
                <li>
                  <Markdown source={f} />
                </li>
              ))}
            </ul>

            <h3>{integrationName} Software Integration Questions?</h3>

            <a
              type="button"
              className="btn"
              style={{
                  color: "#000"
              }}
              href={
                "https://www.referralsaasquatch.com/integration-inquiry/?integration=" +
                integrationName
              }
            >
              Find out more
            </a>
          </div>

          <div className="span5 well">
            <h3>{integrationName} Integration Resources</h3>
            <ul>
              {moreInfo.map(f => (
                <li>
                  <Markdown source={f} />
                </li>
              ))}
            </ul>

            <h3>Additional Help Center Articles</h3>
            <ul>
              <li>
                <a href="/success/intro/">Getting Started with SaaSquatch</a>
              </li>
              <li>
                <a href="/success/core-topics/">How Referral Programs Work</a>
              </li>
              <li>
                <a href="/success/using-referral-saasquatch/">
                  Using the SaaSquatch Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {contents && <Markdown source={contents} />}
      </section>
    </>
  );
}
