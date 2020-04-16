import React from "react";
import styled from "styled-components";
import { HashLink } from "react-router-hash-link";

export const ItemRow = styled(HashLink)`
  display: block;
  color: #000;
  padding: 5px 0;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;

  &:hover {
    background: #eee;
  }
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  color: #000;
`;
export const ItemBody = styled.div`
  color: #333;
`;
export const ResultsSummary = styled.p`
  color: #333;
`;
export const Pagination = styled.div`
  border-top: 1px solid #ccc;
`;

export const PagerButton = styled.a``;
export const NoResults = styled.div``;

export const PopOver = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  z-index: 999;
`;

export const Inline = styled.div``;
