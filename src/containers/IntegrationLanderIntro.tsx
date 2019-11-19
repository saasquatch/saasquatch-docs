import React from "react";
import { useRouteData } from "react-static";

import Markdown from "../components/Markdown";
import Meta from "../components/Meta";


export default function render() {
  const { entry } = useRouteData();
  const {
    logo,
    integrationName,
    highlights,
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
              <Markdown source={highlights} />
            </div>
          </div>
        </div>

        {contents && <Markdown source={contents} />}
      </section>
    </>
  );
}
