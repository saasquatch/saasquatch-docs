import React from "react";
import { Endpoint } from "src/api/Types";
import { useApiData } from "../../containers/single/api";
import { Tooltip } from "components/Tooltip";

export function AuthTags({ method }: Partial<Endpoint>): JSX.Element {
  const { swagger } = useApiData();

  if (method.security.length < 1) {
    return (
      <Tooltip
        content="Does not require any type of authentication to make this API call."
        placement="bottom"
      >
        <span className="label" style={{ marginRight: "3px" }}>
          Unauthenticated
        </span>
      </Tooltip>
    );
  }
  return (
    <>
      {method.security.map((obj: any, idx: number) => {
        const secName = Object.keys(obj)[0];
        const sec = obj[secName];
        const desc = swagger.securityDefinitions[secName].description;
        return (
          <Tooltip content={desc} placement="bottom" key={secName}>
            <span className="label" style={{ marginRight: "3px" }}>
              {secName}
            </span>
          </Tooltip>
        );
        if (sec.length >= 1) {
          // TODO: Show "scopes". Useful for OAuth.
        }
      })}
    </>
  );
}
