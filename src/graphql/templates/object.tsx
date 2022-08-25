import React from "react";
import { useRouteData } from "react-static";
import { Link } from "react-router-dom";

import Markdown from "components/Markdown";
import { ObjectDefinition } from "../types";
import Container from "./common/Container";
import TitleBlock from "./common/TitleBlock";
import FieldList from "./common/FieldList";

export default () => {
  const object = useRouteData<ObjectDefinition>();

  return (
    <Container>
      <TitleBlock def={object} />
      {object.interfaces.length > 0 ? (
        <>
          <h2>Implements</h2>
          {object.interfaces.map((_interface) => (
            <div key={_interface.name}>
              <pre>
                <Link to={_interface.url}>{_interface.name}</Link>
              </pre>
              <br />
              <Markdown source={_interface.description} />
            </div>
          ))}
        </>
      ) : null}
      <FieldList fields={object.fields} />
    </Container>
  );
};
