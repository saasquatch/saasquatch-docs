import React from "react";
import Markdown from "./Markdown";

/**
 * Shows the properties for an object
 *
 */
export function Properties({
  schema,
  collapse = false,
}: {
  schema: any;
  collapse?: boolean;
}) {
  const className = ""; //collapse ? "js-docs-collapse js-docs-collapse-hidden" : "";
  if (!schema) {
    return <div />;
  }
  const props = schema.properties; // | default(schema.items.properties)
  if (!props) {
    return <div />;
  }
  const content = (
    <div className={className}>
      <table className="table table-hover apidocs-args">
        <tbody>
          {Object.keys(props).map((key: string, idx: number) => {
            const prop = props[key];
            return (
              <tr key={idx}>
                <td>
                  {prop?.tags?.map((tag: string) => {
                    return (
                      <>
                        <span className="label">{tag}</span>
                        <br />
                      </>
                    );
                  })}
                </td>
                <th className="docs-monospace">
                  {key}
                  <br />
                  <span className="muted">{prop.type || "object"}</span>
                  <br />
                  {prop.readOnly && <span className="muted">readonly</span>}
                </th>
                <td>
                  <div>
                    <Markdown source={prop.description} />

                    {prop.properties && (
                      <Properties schema={prop} collapse={true} />
                    )}

                    {prop.items && (
                      <Properties schema={prop.items} collapse={true} />
                    )}

                    {prop.enum && (
                      <p>
                        Possible values:
                        {prop.enum.map((enumVal: string, idx: number) => {
                          return (
                            <React.Fragment key={idx}>
                              {idx === prop.enum.length - 1 && "or "}
                              <code>{enumVal}</code>
                              {idx !== prop.enum.length - 1 && ", "}
                            </React.Fragment>
                          );
                        })}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  if (collapse) {
    return (
      <details>
        <summary>Expand Details</summary>
        {content}
      </details>
    );
  }
  return content;
}
