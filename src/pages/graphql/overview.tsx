import React from "react";

import PageHeader from "../../components/PageHeader";

const entry = {
  title: "GraphQL API",
  highlights: `The SaaSquatch GraphQL API provides is an API for building custom
  widgets, integrations, and admin interfaces based on
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


  `,
};

export default function reference() {
  return <PageHeader {...entry} />;
}
