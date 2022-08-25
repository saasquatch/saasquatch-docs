import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";

export const StyledApiLink = styled(Link)`
  font-size: ${(props) =>
    props.$isSubCategory
      ? "var(--sq-font-size-caption)"
      : "var(--sq-font-size-regular)"};
  line-height: var(--sq-line-height-regular);
  font-weight: ${(props) =>
    props.$clicked
      ? "var(--sq-font-weight-bold)"
      : "var(--sq-font-weight-regular)"};
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  color: ${(props) =>
    props.$clicked
      ? "var(--sq-nav-text-on-primary)"
      : "var(--sq-nav-text-on-secondary)"} !important;
  background-color: ${(props) =>
    props.$clicked
      ? "var(--sq-nav-surface-primary)"
      : "var(--sq-nav-surface-secondary)"};
  margin-left: ${(props) => (props.$clicked ? "-1px" : "0px")};
  border-left: ${(props) =>
    props.$clicked ? "2px solid var(--docs-text-interactive)" : "0px"};
  &:hover {
    background-color: ${(props) =>
      props.$clicked ? "var(--sq-nav-surface-primary)" : "#e7edee"};
    color: ${(props) =>
      props.$clicked
        ? "var(--sq-nav-text-on-primary)"
        : "var(--sq-nav-text-on-secondary)"};
  }
`;

export const MethodDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--sq-spacing-xx-small);
`;

export const LabelsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--sq-spacing-xx-small);
`;

export const StyledLabelSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-caption);
  color: var(--sq-nav-surface-secondary);
  width: fit-content;
  height: fit-content;
  padding: var(--sq-spacing-xxx-small) var(--sq-spacing-xx-small);
  border-radius: var(--sq-border-radius-normal);
  border: none;
  cursor: pointer;
`;
