import React from "react";
import styled from "styled-components";
import { HashLink } from "react-router-hash-link";

export const ItemRow = styled(HashLink)`
  display: block;
  color: #000;
  padding: var(--sq-spacing-x-small);
  margin: 5px 0;
  border-bottom: 1px solid #ddd;

  background: ${(props) => (props.selected ? "#e0e0e0" : "white")};
  &:hover {
    background: #eee;
  }
`;
export const DefaultInput = styled.input`
  width: 75%;
`;

export const ItemTitle = styled.div`
  margin: 5px 0;
  font-weight: bold;
  color: #000;
`;
export const ItemBody = styled.div`
  font-size: 0.9em;
  color: #444;
  word-wrap: break-word;

  br {
    /* Hides google's automatic <br> additions */
    display: none;
  }
`;
export const ResultsSummary = styled.p`
  color: #333;
`;
export const Pagination = styled.div`
  border-top: 1px solid #ccc;
`;

export const PagerButton = styled.a`
  padding-right: 10px;
  cursor: pointer;
`;
export const NoResults = styled.div``;

export const PopOver = styled.div<{ sideBar: boolean }>`
  background: var(--sq-surface);
  border: 1px solid #eee;
  box-shadow: 0px 0px 28px -6px rgba(0, 0, 0, 1);
  border-radius: 5px;
  padding: 10px;
  z-index: 999;
  overflow-y: scroll;
  width: ${(props) => (props.sideBar ? "18vw" : "70vw")};
  min-width: 200px;
`;

export const Inline = styled.div``;

export const styledLink = styled.a`
  color: #357732 !important;
  &:hover {
    text-decoration: underline !important;
  }
`;

export const Container = styled.div<{ sideBar: boolean }>`
  height: ${(props) => (props.sideBar ? "75vh" : "35vh")};
`;
