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
    articleContent,
    keyFeatures
  } = entry;

  let logoUrl;
  if(typeof logo !== "string"){
    logoUrl = logo.url;
  }else{
    logoUrl = "/assets/images/integrations/" + logo;
  }
  return (
    <>
      <Meta {...entry} />
      <section className="integrationLander">
        <div className="page-header">
          <h1 className="integrationHeader">
            <img
              src={logoUrl}
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

        {!articleContent && <div className="row-fluid">
          <div className="span7">
            <h3>Key features</h3>

            <ul>
              {keyFeatures.map(f => (
                <li>
                  <Markdown source={f} />
                </li>
              ))}
              </ul>

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

          </div>
        </div>}

        {articleContent && <Markdown source={articleContent} />}
      </section>
    </>
  );
}
