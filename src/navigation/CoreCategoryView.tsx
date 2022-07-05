import React, { useRef } from "react";
import styled from "styled-components";
import { SVGProps } from "./components/icons";
import {
  CoreCategoryLink,
  DivideLineLi,
  MMenuContext,
  SidebarSVG as SidebarSVG,
  TitleLink,
} from "./NavigationSidebar";

// Revert back: don't need TitleArrowDiv, get rid of SidebarSVG, revert squatchdocs.less, exclude conditional rendering from CoreCategoryView, paste old Product News into NavigationSidebar.tsx
const TitleArrowDiv = styled.div`
  display: flex !important;
  justify-content: space-between !important;
`;

const IconTitleDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 18px;
`;
export const CoreCategoryView = (props: {
  children?: React.ReactNode;
  to: string;
  title: string;
  icon: SVGProps;
  parentRef: any; //re-assign type
  clicked?: boolean;
  clickedArticle?: boolean;
}) => {
  return (
    <li ref={props.parentRef}>
      {/* <a class="mm-next" href="#mm-3" goes here, sibling of CoreCategoryLink */}
      <CoreCategoryLink to={props.to} clickedArticle={props.clickedArticle}>
        <IconTitleDiv>
          <SidebarSVG {...props.icon} clickedArticle={props.clickedArticle} />
          {props.title}
        </IconTitleDiv>
        {props.children && (
          <SidebarSVG
            width="35%"
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

export type MenuItemViewProps = {
  title?: string;
  onOpen: (e: React.MouseEvent) => unknown;
  id: string;
  children?: React.ReactNode;
  parentRef: React.MutableRefObject<any>;
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
  console.log({ mmenuApi });
  const parentRef = useRef(null);
  const id = "#mm-" + incrNumber++;
  console.log({ id });
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
