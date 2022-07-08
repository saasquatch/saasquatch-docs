/*  Name: ApiSidebar
    Purpose: Renders methods for REST API Reference, displayed within docs navigation sidebar.
    Updated by M. Solis de Ovando
*/

import React, { useRef } from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import * as Styles from "./NavStyles";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { CurrentPageContext, MMenuContext } from "./NavigationSidebar";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";
import styled from "styled-components";

const StyledApiSpan = styled.span`
  display: block;
  height: fit-content;
  align-items: center;
  width: auto !important;
  font-size: var(--sq-font-size-regular);
  line-height: 21px;
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
  line-height: 21px;
  font-weight: ${(props) =>
    props.clicked
      ? "var(--sq-font-weight-bold)"
      : "var(--sq-font-weight-regular)"};
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-text-on-primary)"
      : "var(--sq-nav-text-on-secondary)"};
  background-color: ${(props) =>
    props.clicked
      ? "var(--sq-nav-surface-primary)"
      : "var(--sq-nav-surface-secondary)"};
  margin-left: ${(props) => (props.clicked ? "-1px" : "0px")};
  border-left: ${(props) => (props.clicked ? "2px solid #007A5B" : "0px")};
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "var(--sq-nav-surface-primary)" : "#e7edee"};
  }
`;

const MethodDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  line-height: var(--sq-line-height-button-large);
  color: var(--sq-nav-surface-secondary);
  width: fit-content;
  height: fit-content;
  padding: var(--sq-spacing-xxx-small) 5px;
  border-radius: 4px;
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
}: ReturnType<typeof useMenuItemHook>) {
  if (data.endpoints.length <= 0) {
    return null;
  }
  const statesPath = "/api/methods#" + states.anchor;
  const currentPage = React.useContext(CurrentPageContext);
  console.log(currentPage);
  return (
    /* API menu item (drop-down) */
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
          marginLeft: "var(--sq-spacing-small)",
          borderLeft: "1px solid var(--sq-nav-surface-primary)",
        }}
      >
        <ul className="nav-onpage mm-listview mm-vertical">
          <li>
            {" "}
            <StyledApiLink to={statesPath} clicked={currentPage === statesPath}>
              {data.tag} Overview
            </StyledApiLink>
          </li>

          {/* API menu item child */}
          {data.endpoints.map((route) => {
            const routePath = "/api/methods#" + route.anchor;
            const currentPage = React.useContext(CurrentPageContext);
            return (
              <li key={route.anchor}>
                <StyledApiLink
                  to={routePath}
                  clicked={currentPage === routePath}
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
    console.log({ route });
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
      {Object.keys(apiRoutesByTag)
        .filter((tag) => tag)
        .map((tag, idx) => (
          <ApiMenuItem tag={tag} idx={idx} key={tag} />
        ))}
    </>
  );
}
