import React from "react";

import Markdown from "components/Markdown";
import { ArgOrFieldDefinition } from "../../types";

interface FieldListProps {
  title?: string;
  fields: Record<string, ArgOrFieldDefinition>;
}

const FieldList: React.FC<FieldListProps> = ({ fields, title = "Fields" }) => {
  return (
    <>
      <h2>Fields</h2>
      {Object.values(fields).map((field) => (
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
    </>
  );
};

export default FieldList;
