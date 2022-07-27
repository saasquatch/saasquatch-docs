/*  Name: SidebarStyledComponents
    Purpose: Contains styled components that are used in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
import { SidebarSVGProps } from "./SidebarIcons";

export const CoreCategoryLink = styled(Link)`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  background-color: ${(props) =>
    props.clicked || props.clickedArticle ? "#003b45" : "#ffffff"};
  color: ${(props) =>
    props.clicked || props.clickedArticle ? "#ffffff" : "#003b45"} !important;
  font-size: 16px;
  font-weight: ${(props) =>
    props.clicked || props.clickedArticle ? "700" : "400"} !important;
  line-height: 24px;
  padding: 8px 12px;
  &:hover {
    background-color: ${(props) =>
      props.clicked || props.clickedArticle ? "#003b45" : "#e7edee"};
    color: ${(props) =>
      props.clicked || props.clickedArticle ? "#ffffff" : "#003b45"} !important;
  }
`;

export const TitleLink = styled(CoreCategoryLink as any)`
  justify-content: start;
  gap: 12px;
`;

export const LeafLink = styled(CoreCategoryLink as any)<{ clicked: boolean }>`
  font-size: ${(props) => (props.isSubCategory ? "16px" : "14px")};
  line-height: 21px;
  margin-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "-1px" : "0px"};
  border-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "2px solid #007A5B" : "0px"};
`;

/* Line in between core category title (e.g. "Developer Resources") and its subcategories */
export const DivideLineLi = styled.li`
  height: 8px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 8px !important;
`;
/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
export const SeparatorLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 11px;
  gap: 10px;
`;
export const SeparatorSpan = styled.span`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  margin: 0 !important;
`;
export const SeparatorLine = styled.div`
  height: 1px !important;
  width: 100% !important;
  background-color: #e2e2e2 !important;
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
  d,
  clicked,
  clickedArticle,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height="100%"
        viewBox={viewBox}
        fill={clicked || clickedArticle ? "#ffffff" : "#003b45"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} />
      </svg>
    </IconSVGDiv>
  );
};
