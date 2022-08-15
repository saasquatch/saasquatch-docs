import React from "react";
import { History } from "history";
import { useHistory } from "react-router";
import { useSiteData } from "react-static";

import { StyledApiLink } from "./api/styles";
import { ProcessedSchema, BaseDefinition } from "src/graphql/types";
import CollapsibleApiMenu from "./api/CollapsibleApiMenuItem";

export default () => {
  const history: History<any> = useHistory();

  const { graphql } = useSiteData<{
    graphql: ProcessedSchema;
  }>();

  const queries = Object.values(graphql.queries).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const mutations = Object.values(graphql.mutations).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const objects = [
    ...Object.values(graphql.objects),
    ...Object.values(graphql.inputObjects),
  ].sort((a, b) => a.name.localeCompare(b.name));
  const enums = Object.values(graphql.enums).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const interfaces = Object.values(graphql.interfaces).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const scalars = Object.values(graphql.scalars).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const unions = Object.values(graphql.unions).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  function renderList(name: string, items: BaseDefinition[]) {
    return (
      <CollapsibleApiMenu name={name}>
        {items.map((item) => (
          <li key={item.url}>
            <StyledApiLink
              to={item.url}
              $clicked={history.location.pathname === item.url}
            >
              {item.name}
            </StyledApiLink>
          </li>
        ))}
      </CollapsibleApiMenu>
    );
  }

  return (
    <>
      {queries.length ? renderList("Queries", queries) : null}
      {mutations.length ? renderList("Mutations", mutations) : null}
      {objects.length ? renderList("Objects", objects) : null}
      {scalars.length ? renderList("Scalars", scalars) : null}
      {enums.length ? renderList("Enums", enums) : null}
      {interfaces.length ? renderList("Interfaces", interfaces) : null}
      {unions.length ? renderList("Unions", unions) : null}
    </>
  );
};
