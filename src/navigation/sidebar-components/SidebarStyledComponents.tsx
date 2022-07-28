/*  Name: SidebarStyledComponents
    Purpose: Contains styled components that are used in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
import { SidebarSVGProps } from "./SidebarIcons";

export const CoreCategoryLink = styled(Link)`
  font-family: var(--sq-font-family-sans);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  background-color: ${(props) =>
    props.clicked || props.clickedArticle
      ? "var(--sq-nav-surface-primary)"
      : "var(--sq-nav-surface-secondary)"};
  color: ${(props) =>
    props.clicked || props.clickedArticle
      ? "var(--sq-nav-text-on-primary)"
      : "var(--sq-nav-text-on-secondary)"} !important;
  font-size: var(--sq-font-size-header-three);
  font-weight: ${(props) =>
    props.clicked || props.clickedArticle
      ? "var(--sq-font-weight-bold)"
      : "var(--sq-font-weight-regular)"} !important;
  line-height: 24px;
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  &:hover {
    background-color: ${(props) =>
      props.clicked || props.clickedArticle
        ? "var(--sq-nav-surface-primary)"
        : "#e7edee"};
    color: ${(props) =>
      props.clicked || props.clickedArticle
        ? "var(--sq-nav-text-on-primary)"
        : "var(--sq-nav-text-on-secondary)"} !important;
  }
`;

export const TitleLink = styled(CoreCategoryLink as any)`
  justify-content: start;
  gap: var(--sq-spacing-small);
`;

export const LeafLink = styled(CoreCategoryLink as any)<{ clicked: boolean }>`
  font-size: ${(props) =>
    props.isSubCategory
      ? "var(--sq-font-size-caption)"
      : "var(--sq-font-size-regular)"};
  line-height: var(--sq-line-height-regular);
  margin-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "-1px" : "0px"};
  border-left: ${(props) =>
    props.clicked && !props.isSubCategory
      ? "2px solid #007A5B"
      : "0px"}; // css variable?
`;

/* Line in between core category title (e.g. "Developer Resources") and its subcategories */
export const DivideLineLi = styled.li`
  height: 8px;
  border-bottom: 1px solid var(--sq-border);
  margin-bottom: var(--sq-spacing-x-small) !important;
`;
/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
export const SeparatorLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--sq-spacing-xx-small) 0px var(--sq-spacing-xx-small)
    var(--sq-spacing-small);
  gap: var(--sq-spacing-x-small);
`;
export const SeparatorSpan = styled.span`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: var(--sq-nav-text-on-primary-subdued);
  font-size: var(--sq-font-size-small);
  line-height: 18px;
  margin: 0 !important;
`;
export const SeparatorLine = styled.div`
  height: 1px !important;
  width: 100% !important;
  background-color: var(--sq-border) !important;
`;
/* SVG icon container and render function */
const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: auto;
`;

export const SidebarSVG: React.FC<SidebarSVGProps> = ({
  width,
  viewBox,
  path,
  clicked,
  clickedArticle,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height="100%"
        viewBox={viewBox}
        fill={
          clicked || clickedArticle
            ? "var(--sq-nav-surface-secondary)"
            : "var(--sq-nav-surface-primary)"
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    </IconSVGDiv>
  );
};
