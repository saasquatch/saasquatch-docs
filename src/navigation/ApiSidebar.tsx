import { Tooltip } from "components/Tooltip";
import { VersionContext } from "components/useVersion";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useSiteData } from "react-static";
import slug from "slug";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { MenuItemView, useMenuItemHook } from "./MenuItemView";

function useEndpoints(tag: string) {
  const { apiRoutes } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();
  const { showTags } = VersionContext.useContainer();
  const endpoints = apiRoutes
    .filter((route) => route.tags.includes(tag))
    .filter((route) => showTags(route.tags));
  return endpoints;
}

function MenuItem(props: { tag: string; idx: number }) {
  const { tag } = props;
  const endpoints = useEndpoints(tag);
  if (endpoints.length <= 0) {
    return null;
  }
  return (
    <MenuItemView {...useMenuItemHook()}>
      <ApiSidebarChildren endpoints={endpoints} tag={tag} />
    </MenuItemView>
  );
}

function ApiSidebarChildren({
  endpoints,
  tag,
}: {
  endpoints: EndpointSummary[];
  tag: string;
}) {
  const children = endpoints.map((route) => {
    return (
      <li key={route.anchor}>
        <Link to={"/api/methods#" + route.anchor}>
          <span
            className={"label docs-label-" + route.httpMethod.toLowerCase()}
            style={{
              width: "47px",
              textAlign: "center",
            }}
          >
            {route.httpMethod.toUpperCase()}
          </span>{" "}
          {route.summary}
          {route.tags.includes("Open Endpoint") && <OpenEndpointLabel />}
        </Link>
      </li>
    );
  });
  return (
    <>
      <li>
        <Link to={"/api/methods#" + slug(tag)}>{tag} Overview</Link>
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
