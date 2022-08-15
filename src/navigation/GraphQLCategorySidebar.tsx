import React, { useMemo, useRef } from "react";
import { useSiteData } from "react-static";
import styled from "styled-components";

import {
  StyledApiLink,
  MethodDiv,
  LabelsDiv,
  StyledLabelSpan,
} from "./ApiSidebar";
import { Category } from "src/graphql/category";
import { CategoryEntry, ProcessedSchema } from "src/graphql/types";

interface CollapsibleApiMenuProps {
  name: string;
}

const CollapsibleApiMenuHeading = styled.div`
  display: block;
  height: fit-content;
  align-items: center;
  width: auto !important;
  font-size: 14px;
  line-height: 21px;
  position: relative !important;
  padding: 8px 20% 8px 12px !important;
  cursor: pointer;
  &:hover {
    background-color: #e7edee;
  }
`;

let collapsibleMenuIdx = 0;

// TODO: Factor out
const CollapsibleApiMenu: React.FC<CollapsibleApiMenuProps> = (props) => {
  const parent = useRef(null);
  const id = useMemo(() => `#mm-collapsible-menu-${collapsibleMenuIdx++}`, []);

  function open(e: React.MouseEvent) {
    e.preventDefault();
    jQuery(parent.current).toggleClass("mm-opened");
  }

  return (
    <li className="mm-vertical" ref={parent}>
      <CollapsibleApiMenuHeading
        className="mm-next mm-fullsubopen"
        data-target={id}
        onClick={open}
      >
        {props.name}
      </CollapsibleApiMenuHeading>
      <div
        className="mm-panel mm-vertical"
        style={{
          marginLeft: "12px",
          borderLeft: "1px solid #003b45",
        }}
        id={id}
      >
        <ul className="nav-onpage mm-listview mm-vertical">{props.children}</ul>
      </div>
    </li>
  );
};

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
            clicked={window.location.pathname === item.url}
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
                clicked={window.location.pathname === item.url}
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