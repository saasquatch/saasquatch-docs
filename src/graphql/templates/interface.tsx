import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import Markdown from "components/Markdown";
import { InterfaceDefinition } from "../types";

export default () => {
  const _interface = useRouteData<InterfaceDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{_interface.name}</h1>
      <div>
        <pre>
          <Markdown source={_interface.html} />
        </pre>
      </div>
      <Markdown source={_interface.description} />
      <h2>Fields</h2>
      {Object.values(_interface.fields).map((field) => (
        <div key={field.name}>
          <code>
            {field.name}:{" "}
            {field.url ? <Link to={field.url}>{field.type}</Link> : field.type}
          </code>
          <br />
          <Markdown source={field.description} />
        </div>
      ))}
    </div>
  );
};
