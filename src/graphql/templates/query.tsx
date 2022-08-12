import React from "react";
import { Link } from "react-router-dom";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { QueryDefinition } from "../types";

export default () => {
  const query = useRouteData<QueryDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{query.name}</h1>
      <div>
        <pre>
          <Markdown source={query.html} />
        </pre>
      </div>
      <Markdown source={query.description} />
      <h2>Arguments</h2>
      {query.args.map((arg) => (
        <div key={arg.name}>
          <code>
            {arg.name}:{" "}
            {arg.url ? <Link to={arg.url}>{arg.type}</Link> : arg.type}
          </code>
          <br />
          <Markdown source={arg.description} />
        </div>
      ))}
    </div>
  );
};
