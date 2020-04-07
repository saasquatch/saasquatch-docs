import React, { useMemo, useState } from "react";
import { useRouteData } from "react-static";
import styled from "styled-components";
import hljs from "highlight.js";

import PageHeader from "../../components/PageHeader";
import Markdown from "../../components/Markdown";
import exampleSwaggerSchema from "../../../metalsmith/filters/exampleSwaggerSchemaFilter";
import { Properties } from "../../components/Properties";
import { VersionContext } from "../../components/useVersion";

import { Operation, Spec, Response } from "swagger-schema-official";
import { VersionSwitcher } from "components/VersionSwitcher";

import _ from "lodash";

/**
 * Groups Swagger methods by Tag. If a method has multiple tags, it will be listed in each one.
 *
 */
export function methodsByTag(swagger: Spec) {
  return _.transform(
    swagger.paths,
    (result, methodsAtPath, path) => {
      _.forEach(methodsAtPath, (method, httpType) => {
        _.forEach(method.tags, (tag) => {
          let out = {};
          out[path] = {};
          out[path][httpType] = method;
          (result[tag] || (result[tag] = [])).push(out);
        });
      });
    },
    {}
  );
}

export function tagMap(swagger: Spec) {
  // console.log(swagger.tags);
  return _.reduce(
    swagger.tags,
    (result, val) => {
      result[val.name] = val;
      return result;
    },
    {}
  );
}

function useApiData(): APIData {
  const { swagger } = useRouteData<RouteData>();

  return {
    swagger,
    tagMap: tagMap(swagger),
    methodsByTag: methodsByTag(swagger),
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

function Tags({ method }: any) {
  // // @ts-ignore
  // const { tagMap } = useApiData();

  // TODO: Include tag descriptions
  return method.tags.map((tag: string) => (
    <span className="label" key={tag}>
      {tag}
    </span>
  ));
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

// Provided in static.config.js
type RouteData = {
  swagger: Spec;
};

type APIData = {
  swagger: Spec;
  tagMap: any;
  methodsByTag: any;
};

type Endpoint = {
  httpMethod: string;
  path: string;
  method: Operation;
};

export default function render() {
  const { swagger, tagMap, methodsByTag } = useApiData();
  // Performance optimization. See: https://github.com/facebook/react/issues/15156
  // Don't remove this line!
  return <Page swagger={swagger} tagMap={tagMap} methodsByTag={methodsByTag} />;
}

function Page({ swagger, tagMap, methodsByTag }: APIData) {
  const { version, versionLabel } = VersionContext.useContainer();
  console.log("version", version);

  const entry = {
    title: "Rest API Reference",
    highlights: swagger.info.description,
    sectionType: "developerCenter",
  };
  const endpoints = Object.keys(swagger.paths).reduce(
    (acc: Endpoint[], path: string) => {
      const methods = swagger.paths[path];
      const subEndpoints = Object.keys(methods).map((httpMethod: string) => {
        const method = methods[httpMethod];
        return {
          httpMethod,
          path,
          method,
        };
      });

      return [...acc, ...subEndpoints];
    },
    []
  );

  const showMethod = (method: Operation) =>
    (version === "classic-only" && method.tags.includes("Classic Only")) ||
    (version === "ga-only" && !method.tags.includes("Classic Only")) ||
    (version === "hybrid" && true);

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
          {Object.keys(tagMap).map((k: any, idx: number) => {
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

        {endpoints.map((endpoint: Endpoint) => {
          const { method, httpMethod, path } = endpoint;

          const header = (
            <>
              <div className="js-apidocs-method-title">
                <a href="#" style={{ float: "right" }}>
                  Back to List
                </a>
                <h2 className="js-apidocs-methodname {%if method['deprecated'] %}js-apidocs-method-deprecated{% endif %}">
                  {method.summary}
                </h2>

                <HTTPMethod className="label js-apidocs-method-type docs-label-{{httpMethod | lower}}">
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

              <details>
                <summary>View Method Details</summary>
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
              </details>
            </div>
          );
        })}
      </>
    </PageHeader>
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
