import React, { useRef } from "react";
import styled from "styled-components";
import { SVGProps } from "./components/icons";
import {
  CoreCategoryLink,
  DivideLineLi,
  MMenuContext,
  SVGIcon,
  TitleLink,
} from "./NavigationSidebar";

export const CoreCategoryView = (props: {
  children: React.ReactNode;
  to: string;
  title: string;
  icon: SVGProps;
  parentRef: any; //re-assign type
}) => {
  return (
    <li ref={props.parentRef}>
      {/* <a class="mm-next" href="#mm-3" goes here, sibling of CoreCategoryLink */}
      <CoreCategoryLink to={props.to}>
        <SVGIcon {...props.icon} />
        {props.title}
      </CoreCategoryLink>
      <ul>
        <li>
          <TitleLink to={props.to}>
            {" "}
            <SVGIcon {...props.icon} width="70%" />
            {props.title}
          </TitleLink>
        </li>
        <DivideLineLi />
        {props.children}
      </ul>
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

// let incrNumber = 1;
// export function useMenuItemHook(): MenuItemViewProps {
//   // const { mmenuApi } = MMenuContext.useContainer();
//   const parentRef = useRef(null);

//   const id = "#mm-" + (90 + incrNumber++);
//   const onOpen = (e: React.MouseEvent) => {
//     e.preventDefault();
//     // console.log("Opening panel", mmenuApi, jQuery(id));
//     openVerticalPanel(jQuery(parentRef.current));
//   };
//   return {
//     id,
//     onOpen,
//     parentRef,
//   };
// }
