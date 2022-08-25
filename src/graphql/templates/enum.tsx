import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { EnumDefinition } from "../types";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";

export default () => {
  const _enum = useRouteData<EnumDefinition>();

  return (
    <Container>
      <TitleBlock def={_enum} />
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
    </Container>
  );
};
