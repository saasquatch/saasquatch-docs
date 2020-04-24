import React, { useMemo } from "react";
import hljs from "highlight.js";
import exampleSwaggerSchema from "../../../metalsmith/filters/exampleSwaggerSchemaFilter";


export function CodeExample({ method, httpMethod, methodPath, swagger }: any) {
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
