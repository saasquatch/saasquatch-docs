import React from "react";
import { Endpoint } from "src/api/Types";
import { useApiData } from "../../containers/single/api";

export function AuthTags({ method }: Partial<Endpoint>): JSX.Element {
  const { swagger } = useApiData();
  if (method.security.length < 1) {
    return (
      <span
        className="label"
        title="Does not require any type of authentication to make this API call."
      >
        Unauthenticated
      </span>
    );
  }
  return (
    <>
      {method.security.map((obj: any, idx: number) => {
        const secName = Object.keys(obj)[0];
        const sec = obj[secName];
        const desc = swagger.securityDefinitions[secName].description;
        return (
          <span className="label" title={desc} key={idx}>
            {secName}
          </span>
        );
        if (sec.length >= 1) {
          // TODO: Show "scopes". Useful for OAuth.
        }
      })}
    </>
  );
}
