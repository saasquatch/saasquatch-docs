import React, { useState } from "react";
import styled from "styled-components";
// @ts-ignore
import { DocExplorer } from "graphiql/dist/components/DocExplorer.js";
import { schema } from "../../iddl";

// import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

import "graphiql/graphiql.css";

const Inline = styled.div`
  position: relative;
  min-height: 500px;
  border: 1px solid #eee;
  -webkit-box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);
  -moz-box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);
  box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);
`;
const FullPage = styled.div`
  position: absolute;
  z-index: 9999999999999;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const entry = {
  title: "GraphQL API Reference",
  highlights: `The SaaSquatch GraphQL API provides is an API for building custom
  widgets, intergrations, and admin interfaces based on
  [GraphQL](https://graphql.org/). Authentication for the
  GraphQL API is the same as the [SaaSquatch REST API](/api).
  `,
  contents: `

### Endpoints

There are two endpoints for working with GraphQL.
If you are integrating a referral program into your site, use the *tenant endpoint* so that you don't need to specify your [tenantAlias](/success/navigating-the-portal/#install)
throughout your GraphQL queries.
If you are launching a 3rd party integration in the SaaSquatch marketplace, use the *global endpoint* so that you can specify multiple 
tenants at the same time.

 - Global endpoint \`https://app.referralsaasquatch.com/api/v1/graphql\`
 - Tenant endpoint \`https://app.referralsaasquatch.com/api/v1/{tenant_alias}/graphql\`


  `
}
export default function reference() {
  const [open, setOpen] = useState(false);
  const onClick = ()=>{
    setOpen(!open);
  }
  const Container = open? FullPage : Inline;
  return (
    <PageHeader {...entry}>
    <>
      <h3>Reference <a onClick={onClick}>Fullscreen</a></h3>
      <Container>
        <div className="graphiql-container">
          <DocExplorer schema={schema} />
        </div>
      </Container>
    </>
    </PageHeader>
  );
}
