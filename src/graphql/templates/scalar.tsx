import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { ScalarDefinition } from "../types";

export default () => {
  const scalar = useRouteData<ScalarDefinition>();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{scalar.name}</h1>
      <div>
        <pre>
          <Markdown source={scalar.html} />
        </pre>
      </div>
      <Markdown source={scalar.description} />
    </div>
  );
};
