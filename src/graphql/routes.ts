import { Route } from "react-static";

import { BaseDefinition, ProcessedSchema } from "./types";

function routesFrom(defs: Record<string, BaseDefinition>, template: string) {
  return Object.values(defs).map((def) => ({
    path: def.url!,
    getData: () => defs[def.name],
    template: `src/graphql/templates/${template}`,
  }));
}

export function createGraphQLRoutes(graphql: ProcessedSchema): Route[] {
  return [
    ...routesFrom(graphql.queries, "query"),
    ...routesFrom(graphql.mutations, "mutation"),
    ...routesFrom(graphql.objects, "object"),
    ...routesFrom(graphql.interfaces, "interface"),
    ...routesFrom(graphql.enums, "enum"),
    ...routesFrom(graphql.unions, "union"),
    ...routesFrom(graphql.scalars, "scalar"),
  ];
}
