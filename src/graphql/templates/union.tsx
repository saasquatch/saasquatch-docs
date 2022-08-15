import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import Markdown from "components/Markdown";
import { UnionDefinition } from "../types";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";

export default () => {
  const union = useRouteData<UnionDefinition>();

  return (
    <Container>
      <TitleBlock def={union} />
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
    </Container>
  );
};
