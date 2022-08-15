import React from "react";
import { useSiteData } from "react-static";

import {
  StyledApiLink,
  MethodDiv,
  LabelsDiv,
  StyledLabelSpan,
} from "./api/styles";
import { Category } from "src/graphql/category";
import { CategoryEntry, ProcessedSchema } from "src/graphql/types";
import CollapsibleApiMenu from "./api/CollapsibleApiMenuItem";

export default () => {
  const { graphql } = useSiteData<{
    graphql: ProcessedSchema;
  }>();

  const categories = Object.values(graphql.categories).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  function renderCategory(category: Category) {
    const queries = Object.values(category.queries).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const mutations = Object.values(category.mutations).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const objects = Object.values(category.objects).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const enums = Object.values(category.enums).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const interfaces = Object.values(category.interfaces).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const scalars = Object.values(category.scalars).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const unions = Object.values(category.unions).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    function renderItems(
      label: string,
      labelClass: string,
      items: CategoryEntry[]
    ) {
      return items.map((item) => (
        <li key={item.url}>
          <StyledApiLink
            to={item.url}
            $clicked={window.location.pathname === item.url}
          >
            <MethodDiv>
              {item.name}
              <LabelsDiv>
                <StyledLabelSpan className={`label docs-label-${labelClass}`}>
                  {label}
                </StyledLabelSpan>
              </LabelsDiv>
            </MethodDiv>
          </StyledApiLink>
        </li>
      ));
    }

    function renderList(name: string, items: CategoryEntry[]) {
      return (
        <CollapsibleApiMenu name={name}>
          {items.map((item) => (
            <li key={item.url}>
              <StyledApiLink
                to={item.url}
                $clicked={window.location.pathname === item.url}
              >
                {item.name}
              </StyledApiLink>
            </li>
          ))}
        </CollapsibleApiMenu>
      );
    }

    return (
      <CollapsibleApiMenu key={category.name} name={category.name}>
        {queries.length ? renderItems("query", "get", queries) : null}
        {mutations.length ? renderItems("mutation", "post", mutations) : null}
        {objects.length ? renderList("Objects", objects) : null}
        {scalars.length ? renderList("Scalars", scalars) : null}
        {enums.length ? renderList("Enums", enums) : null}
        {interfaces.length ? renderList("Interfaces", interfaces) : null}
        {unions.length ? renderList("Unions", unions) : null}
      </CollapsibleApiMenu>
    );
  }

  return <>{categories.map((category) => renderCategory(category))}</>;
};
