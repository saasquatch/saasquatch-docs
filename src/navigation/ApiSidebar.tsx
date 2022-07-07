import React, { useRef } from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import * as Styles from "./NavStyles";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { MMenuContext } from "./NavigationSidebar";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";
import styled from "styled-components";

const StyledSpan = styled.span`
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

export const StyledApiLink = styled(Link as any)<{ clicked: boolean }>`
  font-size: ${(props) => (props.isSubCategory ? "16px" : "14px")};
  line-height: ${(props) => (props.isSubCategory ? "24px" : "21px")};
  font-weight: 400;
  padding: 8px 12px;
  background-color: ${(props) => props.clicked && "#003b45"};
  margin-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "-1px" : "0px"};
  border-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "2px solid #007A5B" : "0px"};
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
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
  gap: 4px;
`;

export const StyledLabelSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  width: fit-content;
  height: fit-content;
  padding: 2px 5px;
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

function MenuItem(props: { tag: string; idx: number }) {
  return <MenuItemView {...useMenuItemHook(props)} />;
}

function MenuItemView({
  states,
  callbacks,
  refs,
  data,
}: ReturnType<typeof useMenuItemHook>) {
  if (data.endpoints.length <= 0) {
    return null;
  }
  return (
    /* API menu item (drop-down) */
    <li className="mm-vertical" ref={refs.parent}>
      <StyledSpan
        className="mm-next mm-fullsubopen"
        // href={id}
        data-target={states.id}
        onClick={callbacks.doOpen}
      >
        {data.tag}
      </StyledSpan>
      <div
        className="mm-panel mm-vertical"
        id={states.id}
        style={{ marginLeft: "12px", borderLeft: "1px solid #003B45" }}
      >
        <ul className="nav-onpage mm-listview mm-vertical">
          <li>
            {" "}
            <StyledApiLink to={"/api/methods#" + states.anchor}>
              {data.tag} Overview
            </StyledApiLink>
          </li>

          {/* API menu item child */}
          {data.endpoints.map((route) => {
            return (
              <li key={route.anchor}>
                <StyledApiLink to={"/api/methods#" + route.anchor}>
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
    // REMEMBER: sub this in
    const path = "/api/methods#" + route.anchor;
    return (
      // this is one list item (e.g. Account Overview, Delete an Account)
      <li key={route.anchor}>
        <StyledApiLink to={"/api/methods#" + route.anchor}>
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
          <MenuItem tag={tag} idx={idx} key={tag} />
        ))}
    </>
  );
}
