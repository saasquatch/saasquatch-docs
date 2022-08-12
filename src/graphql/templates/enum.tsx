import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { EnumDefinition } from "../types";

export default () => {
  const _enum = useRouteData<EnumDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{_enum.name}</h1>
      <pre>
        <Markdown source={_enum.html} />
      </pre>
      <Markdown source={_enum.description} />
      <h2>Variants</h2>
      {_enum.variants.map((variant) => (
        <div key={variant.name}>
          <code>{variant.name}</code>
          <br />
          <Markdown source={variant.description} />
        </div>
      ))}
    </div>
  );
};
