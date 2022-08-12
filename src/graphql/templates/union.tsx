import React from "react";
import { useRouteData } from "react-static";

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
    </div>
  );
};
