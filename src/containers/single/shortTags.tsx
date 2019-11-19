import React from "react";
import { useRouteData } from "react-static";

import TocFrame from "../../components/TocFrame";
import { Properties } from "../../components/Properties";

//@ts-ignore
import shorttagmap from "json-loader!../../../content/metadata/shorttagmap.json";
//@ts-ignore
import shorttags from "json-loader!../../../content/metadata/shorttags.json";
import Markdown from "src/components/Markdown";

export default () => {
  const { entry }: any = useRouteData();

  return (
    <TocFrame entry={entry}>
      <>
        <table className="table table-hover apidocs-args">
          <thead>
            <tr>
              <th>Short Tag</th>
              <th>Example</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(shorttags.properties).map(key => {
              const shorttag = shorttags.properties[key];
              return (
                <tr>
                  <th
                    className="docs-monospace"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {`{{${key}}}`}
                    <br />
                    <span className="muted">{shorttag.type}</span>
                  </th>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <small>
                      <span className="muted">
                        <b>{shorttag.example}</b>
                      </span>
                    </small>
                  </td>
                  <td>
                    <Markdown source={shorttag.description} />
                  </td>
                  {shorttag["x-program"] && (
                    <td>
                      <span className={"label " + shorttag["x-program"]}>
                        Works with {shorttag["x-program"]}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>
          Mappings <span className="label">Developer Reference</span>
        </h3>
        <p>
          Every short tag gets wrapped to a long tag that is uses one of the{" "}
          <a href="/themes/fields/">theme context fields</a> or{" "}
          <a href="/themes/helpers/">helpers</a>. Embedded template fields with
          corresponding short tag aliases will be replaced with their respective
          short tags when viewed in the portal share message editor. It is a{" "}
          <b>two-way transformation</b> so as a developer, you{" "}
          <b>will always see the longer form</b> and will never see short tags
          in variables, theme context, or anywhere except for the portal itself.
        </p>

        <table className="table table-hover">
          <thead>
            <tr>
              <td>
                Short Tag <br />
                <small>Seen in the portal</small>
              </td>
              <td></td>
              <td>
                Mapped Handlebars Tag <br />
                <small>Seen in the API and theme field context</small>
              </td>
            </tr>
          </thead>
          {Object.keys(shorttags.properties)
            .map(key => {
              const mappedTo = shorttagmap[key];
              if (mappedTo) return null;
              return (
                <tr>
                  <td>
                    <code>{`{{${key}}}`}</code>
                  </td>
                  <td>
                    <i className="fa fa-arrows-h"></i>
                  </td>
                  <td>
                    <code>{`{{${mappedTo}}}`}</code>
                  </td>
                </tr>
              );
            })
            .filter(x => x)}
        </table>
      </>
    </TocFrame>
  );
};
