import React from "react";
import { Link } from "react-router-dom";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { ObjectDefinition } from "../types";

export default () => {
  const object = useRouteData<ObjectDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{object.name}</h1>
      <div>
        <pre>
          <Markdown source={object.html} />
        </pre>
      </div>
      <h2>Fields</h2>
      {Object.values(object.fields).map((field) => (
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
