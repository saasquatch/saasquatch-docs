import React, { useRef } from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import * as Styles from "./NavStyles";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { MMenuContext } from "./NavigationSidebar";
import { VersionContext } from "components/useVersion";
import { Tooltip } from "components/Tooltip";

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
    <li className="mm-vertical" ref={refs.parent}>
      <span
        className="mm-next mm-fullsubopen"
        // href={id}
        data-target={states.id}
        onClick={callbacks.doOpen}
      ></span>
      <span onClick={callbacks.doOpen}>{data.tag}</span>
      <div className="mm-panel mm-vertical developerCenter" id={states.id}>
        <ul className="nav-onpage mm-listview mm-vertical developerCenter">
          <li>
            {" "}
            <Link to={"/api/methods#" + states.anchor}>
              {data.tag} Overview
            </Link>
          </li>
          {data.endpoints.map((route) => {
            return (
              <li key={route.anchor}>
                <Link to={"/api/methods#" + route.anchor}>
                  <span
                    className={
                      "label docs-label-" + route.httpMethod.toLowerCase()
                    }
                    style={{
                      width: "47px",
                      textAlign: "center",
                    }}
                  >
                    {route.httpMethod.toUpperCase()}
                  </span>{" "}
                  {route.summary}
                  {route.tags.includes("Open Endpoint") && (
                    <OpenEndpointLabel />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
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
