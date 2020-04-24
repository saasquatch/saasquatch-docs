import React from "react";
import { Endpoint } from "src/api/Types";
import { useApiData } from "../../containers/single/api";
import { Tooltip } from "components/Tooltip";

export function AuthSummary({
  method,
  className,
}: Partial<Endpoint> & { className?: string }): JSX.Element {
  const { swagger } = useApiData();

  const isUnauthed = method.security.length <= 0;
  const isJwt = method.security.filter((sec) => sec["UserJWT"]).length >= 1;

  const { server, mobile, web } =
    isUnauthed || isJwt
      ? { server: true, mobile: true, web: true }
      : { server: true, mobile: false, web: false };

  return (
    <div className={className}>
      <table className="table">
        <tbody>
          <tr>
            <td colSpan={3}>Security Rules</td>
          </tr>
          <tr>
            <td style={{ lineHeight: "30px" }}>
              <i className="fa fa-fw fa-server"></i> Server
            </td>
            <td>
              {server && (
                <Yes content="Works for making Server-to-Server calls" />
              )}
              {!server && (
                <No content="Doesn't work for making Server-to-Server calls" />
              )}
            </td>
          </tr>
          <tr>
            <td style={{ lineHeight: "30px" }}>
              <i className="fa fa-fw fa-mobile"></i> Mobile
            </td>
            <td>
              {mobile && (
                <Yes content="Works for making calls directly from a mobile device" />
              )}
              {!mobile && (
                <No content="Doesn't work for making calls directly from a mobile device" />
              )}{" "}
            </td>
          </tr>
          <tr>
            <td style={{ lineHeight: "30px" }}>
              <i className="fa fa-fw fa-desktop"></i> Browser
            </td>
            <td>
              {web && (
                <Yes content="Works for making calls directly from a browser" />
              )}
              {!web && (
                <No content="Doesn't work for making calls directly from a browser" />
              )}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function No({ content }) {
  return (
    <Tooltip content={content} placement="bottom">
      <i className="fa fa-fw fa-2x fa-square"></i>
    </Tooltip>
  );
}

function Yes({ content }) {
  return (
    <Tooltip content={content} placement="bottom">
      <i className="fa fa-fw fa-2x fa-check-square"></i>
    </Tooltip>
  );
}
