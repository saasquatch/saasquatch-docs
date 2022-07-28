/*  Name: ApiSidebar
    Purpose: Renders methods for REST API Reference, displayed within docs navigation sidebar.
    Updated by M. Solis de Ovando
*/

import { History } from "history";
import React, { useRef } from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { MMenuContext } from "./NavigationSidebar";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";
import styled from "styled-components";
import { useHistory } from "react-router";
import { stripTrailingSlash } from "./sidebar-components/stripTrailingSlash";
import { ArticleLeaf } from "./sidebar-components/SidebarArticleLeaf";

const StyledApiSpan = styled.span`
  display: block;
  height: fit-content;
  align-items: center;
  width: auto !important;
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  position: relative !important;
  padding: var(--sq-spacing-x-small) 20% var(--sq-spacing-x-small)
    var(--sq-spacing-small) !important;
  cursor: pointer;
  &:hover {
    background-color: #e7edee;
  }
`;

export const StyledApiLink = styled(Link)<{ clicked: boolean }>`
  font-size: ${(props) =>
    props.isSubCategory
      ? "var(--sq-font-size-caption)"
      : "var(--sq-font-size-regular)"};
  line-height: var(--sq-line-height-regular);
  font-weight: ${(props) =>
    props.clicked
      ? "var(--sq-font-weight-bold)"
      : "var(--sq-font-weight-regular)"};
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-text-on-primary)"
      : "var(--sq-nav-text-on-secondary)"} !important;
  background-color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-surface-primary)"
      : "var(--sq-nav-surface-secondary)"};
  margin-left: ${(props) => (props.clicked ? "-1px" : "0px")};
  border-left: ${(props) =>
    props.clicked ? "2px solid var(--docs-text-interactive)" : "0px"};
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "var(--sq-nav-surface-primary)" : "#e7edee"};
    color: ${(props) =>
      props.clicked
        ? "var(--sq-nav-text-on-primary)"
        : "var(--sq-nav-text-on-secondary)"};
  }
`;

const MethodDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sq-spacing-xx-small);
`;

const LabelsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--sq-spacing-xx-small);
`;

export const StyledLabelSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-caption);
  color: var(--sq-nav-surface-secondary);
  width: fit-content;
  height: fit-content;
  padding: var(--sq-spacing-xxx-small) var(--sq-spacing-xx-small);
  border-radius: var(--sq-border-radius-normal);
  border: none;
  cursor: pointer;
`;

function openVeritcalParent($l, mmenuApi) {
  if ($l.hasClass("mm-opened")) {
    $l.removeClass("mm-opened");
  } else {
    $l.addClass("mm-opened");
  }
}

function useMenuItemHook({ tag, idx }) {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();
  const { version, versionLabel, showTags } = VersionContext.useContainer();
  const { mmenuApi } = MMenuContext.useContainer();
  const parent = useRef(null);

  const endpoints = apiRoutes
    .filter((route) => route.tags.includes(tag))
    .filter((route) => showTags(route.tags));

  const id = "#mm-" + (90 + idx);
  const doOpen = (e) => {
    e.preventDefault();
    openVeritcalParent(jQuery(parent.current), mmenuApi);
  };
  const anchor = slug(tag);

  const history: History<any> = useHistory();
  const currentHash = stripTrailingSlash(history.location.hash);

  return {
    data: {
      tag,
      endpoints,
    },
    states: {
      id,
      anchor,
    },
    callbacks: {
      doOpen,
    },
    refs: {
      parent,
    },
    currentHash,
  };
}

function ApiMenuItem(props: { tag: string; idx: number }) {
  return <ApiMenuItemView {...useMenuItemHook(props)} />;
}

function ApiMenuItemView({
  states,
  callbacks,
  refs,
  data,
  currentHash,
}: ReturnType<typeof useMenuItemHook>) {
  if (data.endpoints.length <= 0) {
    return null;
  }
  const statesPath = "/api/methods#" + states.anchor;
  return (
    /* API menu item (drop-down) */
    <>
      <li className="mm-vertical" ref={refs.parent}>
        <StyledApiSpan
          className="mm-next mm-fullsubopen"
          data-target={states.id}
          onClick={callbacks.doOpen}
        >
          {data.tag}
        </StyledApiSpan>
        <div
          className="mm-panel mm-vertical"
          id={states.id}
          style={{
            marginLeft: "12px",
            borderLeft: "1px solid #003b45",
          }}
        >
          <ul className="nav-onpage mm-listview mm-vertical">
            <li>
              {" "}
              <StyledApiLink
                to={statesPath}
                clicked={
                  currentHash === stripTrailingSlash("#" + states.anchor)
                }
              >
                {data.tag} Overview
              </StyledApiLink>
            </li>

            {/* API menu item child */}
            {data.endpoints.map((route) => {
              const routePath = "/api/methods#" + route.anchor;
              return (
                <li key={route.anchor}>
                  <StyledApiLink
                    to={routePath}
                    clicked={
                      currentHash === stripTrailingSlash("#" + route.anchor)
                    }
                  >
                    <MethodDiv>
                      {route.summary}
                      <LabelsDiv>
                        <StyledLabelSpan
                          className={
                            "label docs-label-" + route.httpMethod.toLowerCase()
                          }
                        >
                          {route.httpMethod.toUpperCase()}
                        </StyledLabelSpan>
                        {route.tags.includes("Open Endpoint") && (
                          <OpenEndpointLabel />
                        )}
                      </LabelsDiv>
                    </MethodDiv>
                  </StyledApiLink>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    </>
  );
}

function OpenEndpointLabel() {
  return (
    <Tooltip
      content={
        <span>
          Open Endpoints are optimized for Mobile or Browser, don't require a
          server-side call from an API key
        </span>
      }
      placement="right"
    >
      <span className="label pull-right">Open Endpoint</span>
    </Tooltip>
  );
}

export default function ApiSidebar() {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();

  return (
    <>
      <ArticleLeaf to="/api/methods" title="Full list of Methods" apiMethod />
      {Object.keys(apiRoutesByTag)
        .filter((tag) => tag)
        .map((tag, idx) => (
          <ApiMenuItem tag={tag} idx={idx} key={tag} />
        ))}
      <ArticleLeaf
        to="/api/methods#hidden"
        title="Hidden Endpoints"
        apiMethod
      />
    </>
  );
}
