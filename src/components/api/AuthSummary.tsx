import React from "react";
import styled from "styled-components";
import { Endpoint } from "src/api/Types";
import { useApiData } from "../../containers/single/api";
import { Tooltip } from "components/Tooltip";
import { AuthTags } from "./AuthTags";
import { Table, TR, TH, TD, THead, TBody } from "components/Table";
import { Tags } from "components/api/Tags";

const WorksWithWrapper = styled.li<{ works: boolean }>`
  padding: 4px 0px;
  list-style: none;

  ${({ works }) =>
    !works &&
    `
    color: #e8e8e8;
    text-decoration: line-through;
  `}

  &:first-child {
    margin-top: 16px;
  }

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > div {
    margin-left: 8px;
  }
`;

const TagTitle = styled.div`
  display: inline;
  padding-right: 12px;
  font-weight: 500;
`;

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
    <Table>
      <THead>
        <TR>
          <TH>Security Details</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD>
            <div style={{ fontWeight: 500, paddingBottom: "8px" }}>
              Works for
            </div>
            <WorksWith
              works={server}
              tooltip="Works for making Server-to-Server calls"
            >
              <i className="fa fa-fw fa-server" />
              <div>Server requests</div>
            </WorksWith>
            <WorksWith
              works={mobile}
              tooltip="Works for making calls directly from a mobile device"
            >
              <i className="fa fa-fw fa-mobile" />
              <div>Mobile requests</div>
            </WorksWith>
            <WorksWith
              works={web}
              tooltip="Works for making calls directly from a browser"
            >
              <i className="fa fa-fw fa-desktop" />
              <div>Browser requests</div>
            </WorksWith>
          </TD>
        </TR>
        <TR>
          <TD>
            <TagTitle>Auth Tags:</TagTitle>
            <AuthTags method={method} />
          </TD>
        </TR>
        <TR>
          <TD>
            <TagTitle>Tags:</TagTitle>
            <Tags method={method} />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
}

function WorksWith({ children, works, tooltip }) {
  return (
    <WorksWithWrapper works={works}>
      {works ? (
        <MoreInfo content={tooltip}>
          <div style={{ cursor: "pointer" }}>{children}</div>
        </MoreInfo>
      ) : (
        <div>{children}</div>
      )}
    </WorksWithWrapper>
  );
}

function MoreInfo({ content, children }) {
  return (
    <Tooltip content={content} placement="bottom">
      {children}
    </Tooltip>
  );
}
