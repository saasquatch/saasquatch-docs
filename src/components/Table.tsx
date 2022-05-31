import React from "react";
import styled from "styled-components";

export const Table = styled.table`
  background: white;
  border-radius: 8px;
  border-collapse: separate;
  border: 1px solid #eaeaea;
  width: 100%;
  height: auto;

  & thead th:first-child {
    border-top-left-radius: 8px;
  }

  & thead th:last-child {
    border-top-right-radius: 8px;
  }

  & tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  & tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }
`;

export const THead = styled.thead`
  background: #f8f8f8;
  border-bottom: 1px solid #eaeaea;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const TBody = styled.tbody``;

export const TH = styled.th`
  font-size: 13px;
  font-weight: var(--sq-font-weight-bold);
  color: var(--sq-text);
  text-align: left;

  border-bottom: 1px solid #eaeaea;

  padding: var(--sq-spacing-x-small) var(--sq-spacing-x-large);
  padding-left: 0px;
  &:first-child {
    padding-left: var(--sq-spacing-x-large);
  }
`;

export const TR = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  width: auto;
  height: auto;
`;

export const TD = styled.td`
  color: var(--sq-text);

  font-size: 13px;
  border-bottom: 1px solid #eaeaea;

  padding: var(--sq-spacing-small) var(--sq-spacing-x-large);
  padding-left: 0px;
  &:first-child {
    padding-left: var(--sq-spacing-x-large);
  }
`;
