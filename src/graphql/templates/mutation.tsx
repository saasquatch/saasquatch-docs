import React from "react";
import { Link } from "react-router-dom";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { MutationDefinition } from "../types";

export default () => {
  const mutation = useRouteData<MutationDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{mutation.name}</h1>
      <div>
        <pre>
          <Markdown source={mutation.html} />
        </pre>
      </div>
      <h2>Arguments</h2>
      {mutation.args.map((arg) => (
        <div key={arg.name}>
          <pre>
            {arg.name}:{" "}
            {arg.url ? <Link to={arg.url}>{arg.type}</Link> : arg.type}
          </pre>
          <Markdown source={arg.description} />
        </div>
      ))}
    </div>
  );
};
