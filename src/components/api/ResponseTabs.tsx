import React, { useState } from "react";
import { Properties } from "../Properties";
import { Operation, Response } from "swagger-schema-official";
import { JsonCode } from "./JsonCode";

export function responseId(method: Operation, responseKey: string) {
  return method.operationId + "-" + responseKey;
}

export function ResponseTabs({ method }: { method: Operation }) {
  const [active, setActive] = useState(0);
  return (
    <div className="tabbable">
      <ul className="nav nav-tabs">
        {Object.keys(method.responses)
          .filter((key) => key !== "default")
          .map((key: string, idx: number) => {
            const className = idx === active ? "active" : null;
            // We are using a de-referenced swagger schema
            const response = method.responses[key] as Response;
            const target = "." + responseId(method, key);
            return (
              <li className={className} key={idx}>
                <a className="tab" onClick={() => setActive(idx)}>
                  <span className="label">HTTP {key}</span>{" "}
                  {response.description}
                </a>
              </li>
            );
          })}
      </ul>

      <div className="tab-content">
        {Object.keys(method.responses).map((key: string, idx: number) => {
          if (key === "default") {
            return <div key={idx} />;
          }
          const display = idx === active ? "block" : "none";
          const response = method.responses[key] as Response;
          let className = "tab-pane" + responseId(method, key);
          return (
            <div className={className} style={{ display }} key={idx}>
              <Properties schema={response.schema} />
              <p>
                <b>Example Response</b>
              </p>
              <pre>HTTP {key}</pre>
              {response.examples &&
                Object.keys(response.examples)
                  .filter((mime) => mime === "application/json")
                  .map((mime: any, idx: number) => {
                    const example = response.examples[mime];
                    return <JsonCode object={example} key={idx} />;
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
