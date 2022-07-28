/*  Name: SidebarCoreCategory
    Purpose: Contains component, view, and hook for docs navigation sidebar core category.
    Author: M. Solis de Ovando
*/

import React, { useRef } from "react";
import styled from "styled-components";
import { SidebarSVGProps } from "./SidebarIcons";
import { MMenuContext } from "../NavigationSidebar";
import {
  CoreCategoryLink,
  DivideLineLi,
  SidebarSVG as SidebarSVG,
  TitleLink,
} from "./SidebarStyledComponents";

const IconTitleDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: var(--sq-spacing-large);
`;

export const CoreCategory = (props: {
  children?: React.ReactNode;
  to: string;
  title: string;
  icon: SidebarSVGProps;
  clicked?: boolean;
  clickedArticle?: boolean;
}) => {
  return (
    <CoreCategoryView
      {...useCoreCategoryHook()}
      to={props.to}
      title={props.title}
      icon={props.icon}
      clicked={props.clicked}
      clickedArticle={props.clickedArticle}
    >
      {props.children}
    </CoreCategoryView>
  );
};

export const CoreCategoryView = (props: {
  children?: React.ReactNode;
  to: string;
  title: string;
  icon: SidebarSVGProps;
  parentRef: any; //re-assign type
  clicked?: boolean;
  clickedArticle?: boolean;
}) => {
  return (
    <li ref={props.parentRef}>
      <CoreCategoryLink to={props.to} clickedArticle={props.clickedArticle}>
        <IconTitleDiv>
          <SidebarSVG
            {...props.icon}
            width="20px"
            clickedArticle={props.clickedArticle}
          />
          {props.title}
        </IconTitleDiv>
        {props.children && (
          <SidebarSVG
            width="9px"
            viewBox="0 0 8 13"
            d="M0 1.91L4.58 6.5L0 11.09L1.41 12.5L7.41 6.5L1.41 0.5L0 1.91Z"
          />
        )}
      </CoreCategoryLink>
      {props.children && (
        <ul>
          <li>
            <TitleLink to={props.to} clicked={props.clicked}>
              {" "}
              <SidebarSVG {...props.icon} width="70%" clicked={props.clicked} />
              {props.title}
            </TitleLink>
          </li>
          <DivideLineLi />
          {props.children}
        </ul>
      )}
    </li>
  );
};

function openPanel($l) {
  if ($l.hasClass("mm-opened")) {
    $l.removeClass("mm-opened");
  } else {
    $l.addClass("mm-opened");
  }
}

let incrNumber = 1;
export function useCoreCategoryHook() {
  const { mmenuApi } = MMenuContext.useContainer();
  // console.log({ mmenuApi });
  const parentRef = useRef(null);
  const id = "#mm-" + incrNumber++;
  // console.log({ id });
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    mmenuApi.openPanel(jQuery(parentRef.current));
  };
  return {
    id,
    onClick,
    parentRef,
    href: id,
    "data-target": id,
  };
}
