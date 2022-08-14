import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { MutationDefinition } from "../types";
import { Link } from "react-router-dom";

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
      <h2>Returns</h2>
      <pre>
        <Link to={mutation.type.url}>{mutation.type.name}</Link>
      </pre>
      <br />
      <Markdown source={mutation.type.description} />
      <h2>Arguments</h2>
      {mutation.args.map((arg) => (
        <div key={arg.name}>
          <pre>
            <Markdown source={arg.html} />
          </pre>
          <Markdown source={arg.description} />
        </div>
      ))}
    </div>
  );
};
