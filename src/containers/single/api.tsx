import React, { useMemo, useState } from "react";
import { useRouteData } from "react-static";
import styled from "styled-components";
import hljs from "highlight.js";

import PageHeader from "../../components/PageHeader";
import Markdown from "../../components/Markdown";
import exampleSwaggerSchema from "../../../metalsmith/filters/exampleSwaggerSchemaFilter";
import { Properties } from "../../components/Properties";

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
  // @ts-ignore
  const { tagMap } = useRouteData();

  // TODO: Include tag descriptions
  return method.tags.map((tag: string) => <span className="label">{tag}</span>);
}

function AuthTags({ method }: any) {
  //@ts-ignore
  const { swagger, tagMap, methodsByTag } = useRouteData();

  return method.security.length < 1 ? (
    <span
      className="label"
      title="Does not require any type of authentication to make this API call."
    >
      Unauthenticated
    </span>
  ) : (
    method.security.map((obj: any) => {
      const secName = Object.keys(obj)[0];
      const sec = obj[secName];

      const desc = swagger.securityDefinitions[secName].description;

      return (
        <span className="label" title={desc}>
          {secName}
        </span>
      );
      if (sec.length >= 1) {
        // TODO: Show "scopes". Useful for OAuth.
      }
    })
  );
}

export default function render(){
  const { swagger, tagMap, methodsByTag } = useRouteData();
  // Performance optimization. See: https://github.com/facebook/react/issues/15156
  // Don't remove this line!
  return <Page swagger={swagger} tagMap={tagMap} methodsByTag={methodsByTag} />
}

function Page({ swagger, tagMap, methodsByTag }){

  const entry = {
    title: "Rest API Reference",
    highlights: swagger.info.description,
    sectionType: "developerCenter"
  }
  
  return (

    <PageHeader {...entry}>
      <>
      <h3>Tag Summary</h3>

      <p>
        API methods are organized by <b>tags</b> of similar functionality. If
        you're in a hurry to understand how the SaaSquatch REST API works, then
        understanding the tags is a great place to start.
      </p>

      <dl className="dl-horizontal">
        {Object.keys(tagMap).map((k: any) => {
          const tag = tagMap[k];
          return (
            <>
              <dt>
                <span className="label">{tag.name}</span>
              </dt>
              <dd><Markdown source={tag.description}/></dd>
            </>
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
            <>
              <dt>
                <span className="label">{key}</span>
              </dt>
              <dd><Markdown source={secDef.description}/></dd>
            </>
          );
        })}
        <dt>
          <span className="label">Unauthenticated</span>
        </dt>
        <dd>
          Does not require any type of authentication to make this API call.
        </dd>
      </dl>

      <h3>Methods Summary</h3>

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
          {Object.keys(swagger.paths).map((path: string) => {
            const methodPath = path;
            const methods = swagger.paths[path];

            return Object.keys(methods).map((httpMethod: string) => {
              const method = methods[httpMethod];

              const anchor = "#" + method["x-docs-anchor"];

              return (
                <tr>
                  <td>
                    <HTTPMethod>{httpMethod}</HTTPMethod>
                  </td>
                  <td className="docs-monospace">
                    {swagger.basePath}
                    {methodPath}
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
            });
          })}
        </tbody>
      </table>

      {Object.keys(swagger.paths).map((path: string) => {
        const methodPath = path;
        const methods = swagger.paths[path];

        return Object.keys(methods).map((httpMethod: string) => {
          const method = methods[httpMethod];

          return (
            <div id={method["x-docs-anchor"]} className="apidocs-section">
              <div className="js-apidocs-method-title">
                <h2 className="js-apidocs-methodname {%if method['deprecated'] %}js-apidocs-method-deprecated{% endif %}">
                  {method.summary}
                </h2>

                <HTTPMethod className="label js-apidocs-method-type docs-label-{{httpMethod | lower}}">
                  {httpMethod}
                </HTTPMethod>
                <code className="js-apidocs-method-code">
                  {swagger.basePath}
                  {methodPath}
                </code>
              </div>

              {method["deprecated"] && (
                <div className="deprecated-label-box">
                  <span className="label deprecated-label">Deprecated</span>
                </div>
              )}

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
                      {method.parameters.map((param: any) => {
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
                          <tr>
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
                    </table>

                    <p>
                      <b>Example Curl Request</b>
                    </p>
                    <CodeExample
                      method={method}
                      httpMethod={httpMethod}
                      methodPath={methodPath}
                      swagger={swagger}
                    />
                  </div>
                  <h4 style={{ marginTop: "40px" }}>Returns</h4>
                    
                  <ResponseTabs method={method} />                  
                </div>
              </details>
            </div>
          );
        });
      })}
      </>
    </PageHeader>
  );
};

function JsonCode({ object }: any) {
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

function responseId(method: any, responseKey: string) {
  return method.operationId + "-" + responseKey;
}


function ResponseTabs({method}){

  const [active, setActive] = useState(0);

  return <div className="tabbable">
  <ul className="nav nav-tabs">
    {Object.keys(method.responses).map(
      (key: string, idx: number) => {
        const className = idx === active ? "active" : null;
        if (key === "default") {
          return <></>;
        }
        const response = method.responses[key];
        const target = "." + responseId(method, key);
        return (
          <li className={className}>
            <a
              className="tab"
              onClick={()=> setActive(idx)}
            >
              <span className="label">HTTP {key}</span>{" "}
              {response.description}
            </a>
          </li>
        );
      }
    )}
  </ul>

  <div className="tab-content">
    {Object.keys(method.responses).map(
      (key: string, idx: number) => {
        if (key === "default") {
          return <></>;
        }
        const display = idx === active ? "block" : "none";
        const response = method.responses[key];
        let className = "tab-pane" + responseId(method, key);
        return (
          <div className={className} style={{display}}>
            <Properties schema={response.schema} />
            <p>
              <b>Example Response</b>
            </p>
            <pre>HTTP {key}</pre>
            {response.examples &&
              Object.keys(response.examples)
                .filter(mime => mime === "application/json")
                .map((mime: any) => {
                  const example = response.examples[mime];
                  return <JsonCode object={example} />;
                })}
          </div>
        );
      }
    )}
  </div>
</div>
}