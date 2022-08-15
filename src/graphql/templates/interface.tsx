import React from "react";
import { useRouteData } from "react-static";

import { InterfaceDefinition } from "../types";
import FieldList from "./common/FieldList";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";

export default () => {
  const _interface = useRouteData<InterfaceDefinition>();

  return (
    <Container>
      <TitleBlock def={_interface} />
      <FieldList fields={_interface.fields} />
    </Container>
  );
};
