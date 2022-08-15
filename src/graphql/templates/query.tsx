import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { QueryDefinition } from "../types";
import { Link } from "react-router-dom";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";

export default () => {
  const query = useRouteData<QueryDefinition>();

  return (
    <Container>
      <TitleBlock def={query} />
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
    </Container>
  );
};
