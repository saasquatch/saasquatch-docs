/*  Name: ApiSidebar
    Purpose: Renders methods for REST API Reference, displayed within docs navigation sidebar.
    Updated by M. Solis de Ovando
*/

import { History } from "history";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import * as Styles from "./NavStyles";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { CurrentPageContext, MMenuContext } from "./NavigationSidebar";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
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
  padding: 8px 20% 8px 12px !important; // css variable?
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
  line-height: 21px; // css variable?
  font-weight: ${(props) =>
    props.clicked
      ? "var(--sq-font-weight-bold)"
      : "var(--sq-font-weight-regular)"};
  padding: 8px 12px; // css variable?
  color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-text-on-primary)"
      : "var(--sq-nav-text-on-secondary)"} !important;
  background-color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-surface-primary)"
      : "var(--sq-nav-surface-secondary)"};
  margin-left: ${(props) => (props.clicked ? "-1px" : "0px")}; // css variable?
  border-left: ${(props) =>
    props.clicked ? "2px solid #007A5B" : "0px"}; // css variable?
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
  padding: 2px 5px; // css variable?
  border-radius: 4px; // css variable?
  border: none;
  cursor: pointer;
`;

function openVeritcalParent($l, mmenuApi) {
  // var $l = $panel.parent();

  if ($l.hasClass("mm-opened")) {
    $l.removeClass("mm-opened");
  } else {
    $l.addClass("mm-opened");
  }

  // var $sub = $l.parents(".mm-subopened");
  // if ($sub.length) {
  //   console.log("Opening submenu", $l);
  //   mmenuApi.openPanel($sub.first());
  //   return;
  // }

  // mmenuApi.trigger( 'openPanel' 	, $panel );
  // mmenuApi.trigger( 'openingPanel', $panel );
  // mmenuApi.trigger( 'openedPanel'	, $panel );
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
    // console.log("Opening panel", mmenuApi, jQuery(id));
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
  const currentPage = React.useContext(CurrentPageContext);
  return (
    /* API menu item (drop-down) */
    <>
      <li className="mm-vertical" ref={refs.parent}>
        <StyledApiSpan
          className="mm-next mm-fullsubopen"
          // href={id}
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
              // const currentPage = React.useContext(CurrentPageContext);
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

function ApiMenuItemChildren({
  endpoints,
  tag,
}: {
  endpoints: EndpointSummary[];
  tag: string;
}) {
  const children = endpoints.map((route) => {
    const path = "/api/methods#" + route.anchor;
    // const currentPage = React.useContext(CurrentPageContext);
    return (
      // this is one list item (e.g. Account Overview, Delete an Account)
      <li key={route.anchor}>
        <StyledApiLink to={path}>
          <MethodDiv>
            {route.summary}
            <LabelsDiv>
              <StyledLabelSpan
                className={"label docs-label-" + route.httpMethod.toLowerCase()}
              >
                {route.httpMethod.toUpperCase()}
              </StyledLabelSpan>
              {route.tags.includes("Open Endpoint") && <OpenEndpointLabel />}
            </LabelsDiv>
          </MethodDiv>
        </StyledApiLink>
      </li>
    );
  });
  return (
    <>
      <li>
        <StyledApiLink to={"/api/methods#" + slug(tag)}>
          {tag} Overview
        </StyledApiLink>
      </li>
      {children}
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
