import { buildSchema, buildClientSchema, getIntrospectionQuery } from "graphql";
import { schema as idl } from "./saasquatch";

export const schema = buildSchema(idl);

export async function graphQLFetcher(graphQLParams) {
  // TODO: Need to enable CORS on https://app.referralsaasquatch.com/api/v1/graphql to enable this to not use a random tenant's alias
  const response = await fetch(
    "https://app.referralsaasquatch.com/api/v1/test_atzqd37hvovdf/graphql",
    {
      credentials: "omit",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }
  );

  return await response.json();
}

export async function getSchema() {
  const query = getIntrospectionQuery();

  const introspectionResults = await graphQLFetcher({ query });
  return buildClientSchema(introspectionResults.data);
}
