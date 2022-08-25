import { History } from "history";
import React from "react";
import { useSiteData } from "react-static";
import slug from "slug";

import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";
import { useHistory } from "react-router";
import { stripTrailingSlash } from "./sidebar-components/stripTrailingSlash";
import { ArticleLeaf } from "./sidebar-components/SidebarArticleLeaf";
import CollapsibleApiMenu from "./api/CollapsibleApiMenuItem";
import {
  StyledApiLink,
  StyledLabelSpan,
  MethodDiv,
  LabelsDiv,
} from "./api/styles";

function useMenuItemHook({ tag, idx }) {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();
  const { showTags } = VersionContext.useContainer();
  const endpoints = apiRoutes
    .filter((route) => route.tags.includes(tag))
    .filter((route) => showTags(route.tags));
  const anchor = slug(tag);
  const history: History<any> = useHistory();
  const currentHash = stripTrailingSlash(history.location.hash);

  return {
    data: {
      tag,
      endpoints,
    },
    states: {
      anchor,
    },
    currentHash,
  };
}

function ApiMenuItem(props: { tag: string; idx: number }) {
  return <ApiMenuItemView {...useMenuItemHook(props)} />;
}

function ApiMenuItemView({
  states,
  data,
  currentHash,
}: ReturnType<typeof useMenuItemHook>) {
  if (data.endpoints.length <= 0) {
    return null;
  }
  const statesPath = "/api/methods#" + states.anchor;
  return (
    <CollapsibleApiMenu name={data.tag}>
      <li>
        <StyledApiLink
          to={statesPath}
          $clicked={currentHash === stripTrailingSlash("#" + states.anchor)}
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
              $clicked={currentHash === stripTrailingSlash("#" + route.anchor)}
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
    </CollapsibleApiMenu>
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
  const { apiRoutesByTag } = useSiteData<{
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
