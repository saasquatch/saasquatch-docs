import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { QueryDefinition } from "../types";
import { Link } from "react-router-dom";

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
      <h2>Returns</h2>
      <pre>
        <Link to={query.type.url}>{query.type.name}</Link>
      </pre>
      <br />
      <Markdown source={query.type.description} />
      <h2>Arguments</h2>
      {query.args.map((arg) => (
        <div key={arg.name}>
          <pre>
            <Markdown source={arg.html} />
          </pre>
          <br />
          <Markdown source={arg.description} />
        </div>
      ))}
    </div>
  );
};
