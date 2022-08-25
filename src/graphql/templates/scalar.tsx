import React from "react";
import { useRouteData } from "react-static";

import { ScalarDefinition } from "../types";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";

export default () => {
  const scalar = useRouteData<ScalarDefinition>();
  return (
    <Container>
      <TitleBlock def={scalar} />
    </Container>
  );
};
