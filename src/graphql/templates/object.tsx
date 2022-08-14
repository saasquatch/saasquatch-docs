import React from "react";
import { useRouteData } from "react-static";

import Markdown from "components/Markdown";
import { ObjectDefinition } from "../types";
import { Link } from "react-router-dom";

export default () => {
  const object = useRouteData<ObjectDefinition>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>{object.name}</h1>
      <div>
        <pre>
          <Markdown source={object.html} />
        </pre>
      </div>
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
      <h2>Fields</h2>
      {Object.values(object.fields).map((field) => (
        <div key={field.name}>
          <pre>
            <Markdown source={field.html} />
          </pre>
          <br />
          {field.deprecationReason ? (
            <b>DEPRECATED: {field.deprecationReason}</b>
          ) : null}
          <Markdown source={field.description} />
          {field.args?.length > 0 ? (
            <div style={{ marginLeft: "12px" }}>
              <b>Arguments</b>
              {field.args.map((arg) => (
                <div key={arg.name}>
                  <pre>
                    <Markdown source={arg.html} />
                  </pre>
                  {arg.deprecationReason ? (
                    <b>DEPRECATED: {arg.deprecationReason}</b>
                  ) : null}
                  <Markdown source={arg.description} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
