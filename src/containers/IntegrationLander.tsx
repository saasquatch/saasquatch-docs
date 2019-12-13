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
    keyFeatures,
    tags
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

        {tags && tags.some(t=>t==="deprecated") && <div className="alert alert-warning">This integration has been <b>deprecated</b>. It will continue working for existing customers, but is not available to be installed by new customers.</div>}
        {tags && tags.some(t=>t==="classic-only") && <div className="alert alert-warning"><span className="label label-default">Classic Only</span> This integration only works with Classic referral programs. It is not available to be installed by <a href="https://docs.referralsaasquatch.com/growth/saasquatch-ga">Growth Automation</a> customers.</div>}
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
