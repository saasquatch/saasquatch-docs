import React, { useMemo, useState } from "react";
import { useRouteData } from "react-static";
import styled from "styled-components";
import hljs from "highlight.js";
import slug from "slug";

import PageHeader from "../../components/PageHeader";
import Markdown from "../../components/Markdown";
import exampleSwaggerSchema from "../../../metalsmith/filters/exampleSwaggerSchemaFilter";
import { Properties } from "../../components/Properties";
import { VersionContext } from "../../components/useVersion";

import { Operation, Spec, Response, Path, Tag } from "swagger-schema-official";
import { VersionSwitcher } from "components/VersionSwitcher";

// Provided in static.config.js
type RouteData = {
  swagger: Spec;
};

type Endpoint = {
  httpMethod: string;
  path: string;
  method: Operation;
};

// Extensions to the Swagger tag schema
type SuperTag = Tag & {
  // Indicates if a tag is meta-only
  "x-meta": boolean;

  // Indicates is a tag is deprecated
  "x-deprecated": boolean;
};

const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
] as const;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
type HttpMethod = ElementType<typeof HTTP_METHODS>;

function getEndpoints(swagger: Spec): Endpoint[] {
  return Object.keys(swagger.paths).reduce((acc: Endpoint[], path: string) => {
    const methods = swagger.paths[path];
    const subEndpoints = Object.keys(methods)
      .filter((httpMethod) =>
        // @ts-ignore -- ignore other parts of Path like `parameters`
        HTTP_METHODS.includes(httpMethod)
      )
      .map((httpMethod: string) => {
        const method = methods[httpMethod];
        return {
          httpMethod,
          path,
          method,
        };
      });

    return [...acc, ...subEndpoints];
  }, []);
}
/**
 * Groups Swagger methods by Tag. If a method has multiple tags, it will be listed in each one.
 *
 */

type TagMap = { [key: string]: SuperTag };
export function tagsMapper(swagger: Spec): TagMap {
  // console.log(swagger.tags);
  return swagger.tags.reduce<TagMap>((result, val) => {
    result[val.name] = val as SuperTag;
    return result;
  }, {});
}

type EndpointByTag = { [key: string]: Endpoint[] };
export function endpointsByTag(swagger: Spec): EndpointByTag {
  return getEndpoints(swagger).reduce<EndpointByTag>((result, endpoint) => {
    endpoint.method.tags.forEach((tag) => {
      (result[tag] || (result[tag] = [])).push(endpoint);
    });
    return result;
  }, {});
}

type APIData = {
  swagger: Spec;
  tagMap: TagMap;
  endpointByTag: EndpointByTag;
  showMethod: (op: Operation) => boolean;
  versionLabel: string;
};
function useApiData(): APIData {
  const { swagger } = useRouteData<RouteData>();
  const { version, versionLabel } = VersionContext.useContainer();

  const showMethod = useMemo(() => {
    return (method: Operation) =>
      (version === "ga-only" && !method.tags.includes("Classic Only")) ||
      (version === "classic-only" && !method.tags.includes("Modern Only")) ||
      (version === "hybrid" && true);
  }, [version]);

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

const FilterHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const VersionLabel = styled.span`
  height: 20px;
  padding: 5px 5px 0 5px;
  margin-bottom: 15px;
  margin-left: 15px;
  font-size: 16px;
`;

const HTTPMethod = styled.span`
  text-transform: uppercase;
`;

function CodeExample({ method, httpMethod, methodPath, swagger }: any) {
  const query =
    method.parameters &&
    method.parameters
      .filter((param: any) => param.in === "query")
      .map((param: any) => param.name + "=" + (param["x-example"] || ""))
      .join("&");
  const url =
    swagger.schemes[0] +
    "://" +
    swagger.host +
    swagger.basePath +
    methodPath +
    (query ? "?" + query : "");

  const firstBodyParam = method.parameters.find(
    (param: any) => param.in == "body"
  );
  const payload = firstBodyParam
    ? JSON.stringify(exampleSwaggerSchema(firstBodyParam.schema), null, 2)
    : null;

  const body =
    httpMethod == "post" || httpMethod == "put" || httpMethod == "patch"
      ? `-H "Content-Type: application/json" \

  -d '${payload}'
  `
      : "";

  const code = `curl -X ${httpMethod.toUpperCase()} ${url} \

  -u :API_KEY \

  ${body}
  `;

  const highlighted = useMemo(() => {
    const highlightedCode = hljs.highlight("bash", code).value;
    return { __html: highlightedCode };
  }, [code]);

  return (
    <pre>
      <code dangerouslySetInnerHTML={highlighted} />
    </pre>
  );
}

function Tags({ method }: { method: Operation }) {
  const { tagMap } = useApiData();

  return (
    <>
      {method.tags.map((tag: string) => (
        <span className="label" key={tag}>
          {tag}
        </span>
      ))}
    </>
  );
}

function AuthTags({ method }: Partial<Endpoint>): JSX.Element {
  const { swagger } = useApiData();

  if (method.security.length < 1) {
    return (
      <span
        className="label"
        title="Does not require any type of authentication to make this API call."
      >
        Unauthenticated
      </span>
    );
  }

  return (
    <>
      {method.security.map((obj: any, idx: number) => {
        const secName = Object.keys(obj)[0];
        const sec = obj[secName];

        const desc = swagger.securityDefinitions[secName].description;

        return (
          <span className="label" title={desc} key={idx}>
            {secName}
          </span>
        );
        if (sec.length >= 1) {
          // TODO: Show "scopes". Useful for OAuth.
        }
      })}
    </>
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
        <h3>Tag Summary</h3>

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
        </dl>

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

        <FilterHeader>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <h3>Methods Summary</h3>
            <VersionLabel className="label">{versionLabel}</VersionLabel>
          </div>
        </FilterHeader>

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
                    <HTTPMethod>{httpMethod}</HTTPMethod>
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
                  {numHiddenMethods} hidden methods not for{" "}
                  <b>{versionLabel}</b>. <VersionSwitcher />
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
      </>
    </PageHeader>
  );
}

const BootstrapListGroup = styled.ul`
  //
  // List groups
  // --------------------------------------------------

  // Base class
  //
  // Easily usable on <ul>, <ol>, or <div>.
  // No need to set list-style: none; since .list-group-item is block level
  margin-bottom: 20px;
  padding-left: 0; // reset padding because ul and ol
`;

const BootstrapListGroupItem = styled.li`
  // Individual list items
  //
  // Use on li or div within the .list-group parent.

  position: relative;
  display: block;
  padding: 10px 15px;
  // Place the border on the list items and negative margin up for better styling
  margin-bottom: -1px;
  background-color: #eee;
  border: 1px solid #ccc;

  // Round the first and last items
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 5px 5px;
  }
`;

// Interactive list items
//
// Use anchor or button elements instead of `li`s or `div`s to create interactive items.
// Includes an extra `.active` modifier class for showing selected items.
const BootstrapActiveItem = styled(BootstrapListGroupItem)<{
  disabled: boolean;
}>`
  color: @list-group-link-color;

  .list-group-item-heading {
    color: @list-group-link-heading-color;
  }

  // Hover state
  &:hover,
  &:focus {
    text-decoration: none;
    color: @list-group-link-hover-color;
    background-color: @list-group-hover-bg;
  }

  button.& {
    width: 100%;
    text-align: left;
  }
    // Disabled state

    ${({ disabled }) =>
      disabled &&
      `
      &,
      &:hover,
      &:focus {
        background-color: @list-group-disabled-bg;
        color: @list-group-disabled-color;
        cursor: @cursor-disabled;
  
        // Force color to inherit for custom content
        .list-group-item-heading {
          color: inherit;
        }
        .list-group-item-text {
          color: @list-group-disabled-text-color;
        }
      }
      `}


    // Active class on item itself, not parent
    &.active,
    &.active:hover,
    &.active:focus {
      z-index: 2; // Place active items above their siblings for proper border styling
      color: @list-group-active-color;
      background-color: @list-group-active-bg;
      border-color: @list-group-active-border;

      // Force color to inherit for custom content
      .list-group-item-heading,
      .list-group-item-heading > small,
      .list-group-item-heading > .small {
        color: inherit;
      }
      .list-group-item-text {
        color: @list-group-active-text-color;
      }
    }
  }

  // Contextual variants
  //
  // Add modifier classes to change text and background color on individual items.
  // Organizationally, this must come after the :hover states.

  // .list-group-item-variant(success; @state-success-bg; @state-success-text);
  // .list-group-item-variant(info; @state-info-bg; @state-info-text);
  // .list-group-item-variant(warning; @state-warning-bg; @state-warning-text);
  // .list-group-item-variant(danger; @state-danger-bg; @state-danger-text);
`;

// Custom content options
//
// Extra classes for creating well-formatted content within .list-group-item s.
const ListGroupItemHeading = styled.div<{ disabled: boolean }>`
  margin-top: 0;
  margin-bottom: 5px;
  ${({ disabled }) => disabled && `color: inherit;`}
`;

const ListGroupItemText = styled.div<{ disabled: boolean }>`
  margin-bottom: 0;
  line-height: 1.3;
  ${({ disabled }) => disabled && `color: @list-group-disabled-text-color;`}
`;

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
          <p className="lead">{tagDetails.description}</p>
        </div>
        <div className="span6">
          <BootstrapListGroup as="div">
            <BootstrapListGroupItem as="div">
              <b>Endpoints</b>
            </BootstrapListGroupItem>

            {subEndpoints.map((e) => (
              <BootstrapListGroupItem
                as="a"
                key={e.method["x-docs-anchor"]}
                className="list-group-item"
                href={"#" + e.method["x-docs-anchor"]}
              >
                {e.method.summary}
              </BootstrapListGroupItem>
            ))}
            {numHiddenMethods > 0 && (
              <BootstrapListGroupItem as="div">
                <i className="fa fa-compress"></i> {numHiddenMethods} endpoints
                hidden for{" "}
                <VersionSwitcher>
                  <b>{versionLabel}</b>
                </VersionSwitcher>
              </BootstrapListGroupItem>
            )}
          </BootstrapListGroup>
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

              <HTTPMethod
                className={
                  "label js-apidocs-method-type docs-label-" +
                  httpMethod.toLowerCase()
                }
              >
                {httpMethod}
              </HTTPMethod>
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
            {header}

            <div className="lead">
              <Markdown source={method.description} />
            </div>

            <p>
              <b>Tags</b>:
              <Tags method={method} /> <b>Authentication</b>:
              <AuthTags method={method} />
            </p>

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

function HideShowMethod({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [shown, setShown] = useState(false);
  const label = shown ? "Hide Method Details" : "Show Method Details";

  // Note: This is also a performance optimization. By not rendering children we are drastically speeding up the page.
  return (
    <div>
      <button onClick={() => setShown(!shown)}>View Method Details</button>
      {shown && children}
    </div>
  );
}

function JsonCode({ object }: { object: any }) {
  const highlighted = useMemo(() => {
    const highlightedCode = hljs.highlight(
      "json",
      JSON.stringify(object, null, 4)
    ).value;
    return { __html: highlightedCode };
  }, [object]);

  return (
    <pre>
      <code dangerouslySetInnerHTML={highlighted} className="lang-json" />
    </pre>
  );
}

function responseId(method: Operation, responseKey: string) {
  return method.operationId + "-" + responseKey;
}

function ResponseTabs({ method }: { method: Operation }) {
  const [active, setActive] = useState(0);

  return (
    <div className="tabbable">
      <ul className="nav nav-tabs">
        {Object.keys(method.responses)
          .filter((key) => key !== "default")
          .map((key: string, idx: number) => {
            const className = idx === active ? "active" : null;
            // We are using a de-referenced swagger schema
            const response = method.responses[key] as Response;
            const target = "." + responseId(method, key);
            return (
              <li className={className} key={idx}>
                <a className="tab" onClick={() => setActive(idx)}>
                  <span className="label">HTTP {key}</span>{" "}
                  {response.description}
                </a>
              </li>
            );
          })}
      </ul>

      <div className="tab-content">
        {Object.keys(method.responses).map((key: string, idx: number) => {
          if (key === "default") {
            return <div key={idx} />;
          }
          const display = idx === active ? "block" : "none";
          const response = method.responses[key] as Response;
          let className = "tab-pane" + responseId(method, key);
          return (
            <div className={className} style={{ display }} key={idx}>
              <Properties schema={response.schema} />
              <p>
                <b>Example Response</b>
              </p>
              <pre>HTTP {key}</pre>
              {response.examples &&
                Object.keys(response.examples)
                  .filter((mime) => mime === "application/json")
                  .map((mime: any, idx: number) => {
                    const example = response.examples[mime];
                    return <JsonCode object={example} key={idx} />;
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
