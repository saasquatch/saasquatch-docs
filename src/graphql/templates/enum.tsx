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
      <h2>Values</h2>
      {_enum.values.map((value) => (
        <div key={value.name}>
          <pre>{value.name}</pre>
          <br />
          {value.deprecationReason ? (
            <b>DEPRECATED: {value.deprecationReason}</b>
          ) : null}
          <Markdown source={value.description} />
        </div>
      ))}
    </div>
  );
};
