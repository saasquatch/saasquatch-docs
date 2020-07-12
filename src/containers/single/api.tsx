import React, { useMemo } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useRouteData } from "react-static";
import slug from "slug";
import {
  EndpointByTag,
  endpointsByTag,
  getEndpoints,
  TagMap,
  tagsMapper,
} from "src/api/apiTransform";
import { Endpoint } from "src/api/Types";
import * as Styles from "src/components/api/ApiStyles";
import { AuthTags } from "src/components/api/AuthTags";
import { CodeExample } from "src/components/api/CodeExample";
import { HideShowMethod } from "src/components/api/HideShowMethod";
import { ResponseTabs } from "src/components/api/ResponseTabs";
import { Tags } from "src/components/api/Tags";
import Markdown from "src/components/Markdown";
import PageHeader from "src/components/PageHeader";
import { Properties } from "src/components/Properties";
import { VersionContext } from "src/components/useVersion";
import { VersionSwitcher } from "src/components/VersionSwitcher";
import { Operation, Spec } from "swagger-schema-official";
import { AuthSummary } from "components/api/AuthSummary";

// Provided in static.config.js
type RouteData = {
  swagger: Spec;
};

type APIData = {
  swagger: Spec;
  tagMap: TagMap;
  endpointByTag: EndpointByTag;
  showMethod: (op: Operation) => boolean;
  versionLabel: string;
};

export function useApiData(): APIData {
  const { swagger } = useRouteData<RouteData>();
  const { version, versionLabel, showMethod } = VersionContext.useContainer();

  const endpointByTag = useMemo(() => endpointsByTag(swagger), [swagger]);
  const tagMap = useMemo(() => tagsMapper(swagger), [swagger]);

  return {
    swagger,
    tagMap,
    endpointByTag,
    showMethod,
    versionLabel,
  };
}

function HiddenMethods() {
  const {
    swagger,
    showMethod,
    versionLabel,
    tagMap,
    endpointByTag,
  } = useApiData();

  const hiddenMethods = getEndpoints(swagger).filter(
    (e) => !showMethod(e.method)
  );

  return (
    <div id="hidden">
      <h3>Hidden Methods</h3>
      <p>
        These methods have been hidden from your search, sidebar and navigation
        because they are either deprecated or don't apply to your personalized
        view of the docs.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Endpoint</th>
            <th>Reason</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {hiddenMethods.map((m) => {
            const { method, httpMethod, path } = m;

            const highlighted =
              window.location.hash === method["x-docs-anchor"];
            const style = highlighted ? { background: "yellow" } : {};
            return (
              <tr id={method["x-docs-anchor"]} key={method["x-docs-anchor"]}>
                <td>
                  {method.tags
                    .map((t) => tagMap[t])
                    .filter((t) => !t["x-meta"])
                    .map((t) => (
                      <span className={"label"}>{t.name}</span>
                    ))}
                </td>
                <td style={style}>
                  <Link to={"#" + method["x-docs-anchor"]}>
                    {method.summary}
                  </Link>
                </td>
                <td style={style}>
                  {method["deprecated"] && (
                    <span className="label">Deprecated</span>
                  )}
                  {method.tags
                    .map((t) => tagMap[t])
                    .filter((t) => t["x-meta"])
                    .map((t) => (
                      <span className={"label"}>{t.name}</span>
                    ))}
                </td>
                <td style={style}>
                  <Styles.HTTPMethod
                    className={
                      "label js-apidocs-method-type docs-label-" +
                      httpMethod.toLowerCase()
                    }
                  >
                    {httpMethod}
                  </Styles.HTTPMethod>
                  <code className="js-apidocs-method-code">
                    {swagger.basePath}
                    {path}
                  </code>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function render() {
  const apiData = useApiData();
  // Performance optimization. See: https://github.com/facebook/react/issues/15156
  // Don't remove this line!
  return <Page {...apiData} />;
}

function Page({ swagger, tagMap, endpointByTag, showMethod }: APIData) {
  const { version, versionLabel } = VersionContext.useContainer();
  console.log("version", version);

  const entry = {
    title: "Rest API Reference",
    highlights: swagger.info.description,
    sectionType: "developerCenter",
  };
  const endpoints = getEndpoints(swagger);

  const numHiddenMethods =
    endpoints.filter(({ method }) => !showMethod(method))?.length || 0;
  return (
    <PageHeader {...entry}>
      <>
        {/* <h3>Tag Summary</h3>

        <p>
          API methods are organized by <b>tags</b> of similar functionality. If
          you're in a hurry to understand how the SaaSquatch REST API works,
          then understanding the tags is a great place to start.
        </p>

        <dl className="dl-horizontal">
          {Object.keys(tagMap).map((k: string, idx: number) => {
            const tag = tagMap[k];
            return (
              <React.Fragment key={idx}>
                <dt>
                  <span className="label">{tag.name}</span>
                </dt>
                <dd>
                  <Markdown source={tag.description} />
                </dd>
              </React.Fragment>
            );
          })}
        </dl> */}

        <h3>Authentication Summary</h3>

        <p>
          API methods may be used with one or several authentication schemes as
          defined in this table:
        </p>

        <dl className="dl-horizontal">
          {Object.keys(swagger.securityDefinitions).map((key: string) => {
            const secDef = swagger.securityDefinitions[key];
            return (
              <React.Fragment key={key}>
                <dt>
                  <span className="label">{key}</span>
                </dt>
                <dd>
                  <Markdown source={secDef.description} />
                </dd>
              </React.Fragment>
            );
          })}
          <dt>
            <span className="label">Unauthenticated</span>
          </dt>
          <dd>
            Does not require any type of authentication to make this API call.
          </dd>
        </dl>

        <Styles.FilterHeader>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <h3>Methods Summary</h3>
            <Styles.VersionLabel className="label">
              {versionLabel}
            </Styles.VersionLabel>
          </div>
        </Styles.FilterHeader>

        <table className="table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Route</th>
              <th>Description</th>
              <th>Auth</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint: Endpoint) => {
              const { method, httpMethod, path } = endpoint;

              const anchor = "#" + method["x-docs-anchor"];

              // TODO One way to do it
              if (!showMethod(method)) {
                return <tr key={anchor} />;
              }

              return (
                <tr key={anchor}>
                  <td>
                    <Styles.HTTPMethod>{httpMethod}</Styles.HTTPMethod>
                  </td>
                  <td className="docs-monospace">
                    {swagger.basePath}
                    {path}
                  </td>
                  <td>
                    <a href={anchor} className="nav-onpage">
                      {method.summary}
                    </a>
                  </td>
                  <td>
                    <AuthTags method={method} />
                  </td>
                  <td>
                    <Tags method={method} />
                  </td>
                </tr>
              );
            })}

            {numHiddenMethods > 0 && (
              <tr>
                <td colSpan={90}>
                  <Link to="#hidden">{numHiddenMethods} hidden methods</Link>{" "}
                  not for <b>{versionLabel}</b>. <VersionSwitcher />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <Endpoints endpoints={endpoints} /> */}
        {swagger.tags
          .filter((t) => !t["x-meta"])
          .map((t) => (
            <TagSummary tag={t.name} key={t.name} />
          ))}

        <HiddenMethods />
      </>
    </PageHeader>
  );
}

function TagSummary({ tag }: { tag: string }): JSX.Element {
  const {
    swagger,
    showMethod,
    versionLabel,
    tagMap,
    endpointByTag,
  } = useApiData();

  const subEndpoints = useMemo(() => {
    const endPoints = endpointByTag[tag] || [];
    return endPoints.filter((e) => showMethod(e.method));
  }, [endpointByTag, tag, showMethod]);

  const tagDetails = tagMap[tag];

  const numHiddenMethods = (endpointByTag[tag] || []).filter(
    (e) => !showMethod(e.method)
  ).length;

  return (
    <div id={slug(tag)}>
      <div className="row-fluid">
        <div className="span6">
          <h2>{tagDetails.name}</h2>
          <div className="lead">
            <Markdown source={tagDetails.description}></Markdown>
          </div>
        </div>
        <div className="span6">
          <Styles.BootstrapListGroup as="div">
            <Styles.BootstrapListGroupItem as="div">
              <b>Endpoints</b>
            </Styles.BootstrapListGroupItem>

            {subEndpoints.map((e) => (
              <Styles.BootstrapListGroupItem
                as="a"
                key={e.method["x-docs-anchor"]}
                className="list-group-item"
                href={"#" + e.method["x-docs-anchor"]}
              >
                {e.method.summary}
              </Styles.BootstrapListGroupItem>
            ))}
            {numHiddenMethods > 0 && (
              <Styles.BootstrapListGroupItem as="div">
                <Link to="#hidden">
                  <i className="fa fa-compress"></i> {numHiddenMethods}{" "}
                  endpoints hidden
                </Link>{" "}
                for{" "}
                <VersionSwitcher>
                  <b>{versionLabel}</b>
                </VersionSwitcher>
              </Styles.BootstrapListGroupItem>
            )}
          </Styles.BootstrapListGroup>
        </div>
      </div>
      <Endpoints endpoints={subEndpoints} />
    </div>
  );
}

function Endpoints({ endpoints }: { endpoints: Endpoint[] }): JSX.Element {
  const apiData = useApiData();
  return <EndpointsInner endpoints={endpoints} {...apiData} />;
}

function EndpointsInner({
  endpoints,
  swagger,
  showMethod,
  versionLabel,
}: { endpoints: Endpoint[] } & APIData): JSX.Element {
  return (
    <>
      {endpoints.map((endpoint: Endpoint) => {
        const { method, httpMethod, path } = endpoint;
        const header = (
          <>
            <div className="js-apidocs-method-title">
              <a href="#" style={{ float: "right" }}>
                Back to List
              </a>
              <h3 className="js-apidocs-methodname {%if method['deprecated'] %}js-apidocs-method-deprecated{% endif %}">
                {method.summary}
              </h3>

              <Styles.HTTPMethod
                className={
                  "label js-apidocs-method-type docs-label-" +
                  httpMethod.toLowerCase()
                }
              >
                {httpMethod}
              </Styles.HTTPMethod>
              <code className="js-apidocs-method-code">
                {swagger.basePath}
                {path}
              </code>
            </div>
            {method["deprecated"] && (
              <div className="deprecated-label-box">
                <span className="label deprecated-label">Deprecated</span>
              </div>
            )}
          </>
        );
        if (!showMethod(method)) {
          return (
            <div
              id={method["x-docs-anchor"]}
              className="apidocs-section"
              key={method["x-docs-anchor"]}
            >
              {header}
              This endpoint is not compatible with <b>{versionLabel}</b>.{" "}
              <VersionSwitcher />
            </div>
          );
        }
        return (
          <div
            id={method["x-docs-anchor"]}
            className="apidocs-section"
            key={method["x-docs-anchor"]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="pull-right"
                style={{
                  order: 1,
                  minWidth: "250px",
                  marginLeft: "20px",
                  marginRight: "16px",
                }}
              >
                <AuthSummary method={method} />
              </div>
              <div>
                {header}

                <div className="lead">
                  <Markdown source={method.description} />
                </div>
              </div>
            </div>

            <HideShowMethod>
              <div>
                <h4 style={{ marginTop: "40px" }}>Arguments</h4>
                <div>
                  <table className="table table-hover apidocs-args">
                    <tbody>
                      {method.parameters.map((param: any, idx: number) => {
                        const signature =
                          param.in == "body" ? (
                            <>
                              {" "}
                              {param.name}
                              <br />
                              <span className="muted">JSON&nbsp;Body</span>
                            </>
                          ) : (
                            <>
                              {param.name}
                              <br />
                              <span className="muted">
                                {param.type || "object"}
                              </span>
                            </>
                          );
                        return (
                          <tr key={idx}>
                            <td>
                              {(param.required || param.in == "body") && (
                                <span className="label">Required</span>
                              )}
                            </td>
                            <th className="docs-monospace">{signature}</th>
                            <td>
                              <Markdown source={param.description} />

                              <Properties schema={param.schema} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <p>
                    <b>Example Curl Request</b>
                  </p>
                  <CodeExample
                    method={method}
                    httpMethod={httpMethod}
                    methodPath={path}
                    swagger={swagger}
                  />
                </div>
                <h4 style={{ marginTop: "40px" }}>Returns</h4>

                <ResponseTabs method={method} />
              </div>
            </HideShowMethod>
          </div>
        );
      })}
    </>
  );
}
