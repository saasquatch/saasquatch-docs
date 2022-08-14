import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import Markdown from "components/Markdown";
import { UnionDefinition } from "../types";

export default () => {
  const union = useRouteData<UnionDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{union.name}</h1>
      <div>
        <pre>
          <Markdown source={union.html} />
        </pre>
      </div>
      <Markdown source={union.description} />
      <h2>Types</h2>
      {union.types.map((type) => (
        <div key={type.name}>
          <pre>
            <Link to={type.url}>{type.name}</Link>
          </pre>
          <br />
          <Markdown source={type.description} />
        </div>
      ))}
    </div>
  );
};
