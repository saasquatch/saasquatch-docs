/*  Name: SidebarDropDown
    Purpose: Contains drop-down component and view for drop-downs in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React, { useRef } from "react";
import styled from "styled-components";

const StyledSpan = styled.span<{ isNestedDropDown: boolean }>`
  display: block;
  align-items: center;
  width: auto !important;
  font-size: ${(props) =>
    props.isNestedDropDown
      ? "var(--sq-font-size-regular)"
      : "var(--sq-font-size-caption)"};
  line-height: 24px; // css variable?
  position: relative !important;
  padding: 8px 20% 8px 12px !important; // css variable?
  cursor: pointer;
  &:hover {
    background-color: #e7edee; // css variable?
  }
`;

export const DropDown = (props: {
  title: string;
  children?: React.ReactNode;
  to?: string;
  isNestedDropDown?: boolean;
}) => {
  return (
    <DropDownView
      {...useDropDownHook()}
      title={props.title}
      isNestedDropDown={props.isNestedDropDown}
    >
      {props.children}
    </DropDownView>
  );
};

export function DropDownView(props: DropDownProps) {
  return (
    <li className="mm-vertical" ref={props.parentRef}>
      <StyledSpan
        isNestedDropDown={props.isNestedDropDown}
        className="mm-next"
        // href={id}
        data-target={props.id}
        onClick={props.onOpen}
      >
        {props.title}
      </StyledSpan>
      <div
        className="mm-panel mm-vertical"
        id={props.id}
        style={{
          marginLeft: "var(--sq-spacing-small)",
          borderLeft: "1px solid var(--sq-nav-surface-primary)",
        }}
      >
        <ul className="nav-onpage mm-listview mm-vertical">{props.children}</ul>
      </div>
    </li>
  );
}

export type DropDownProps = {
  title?: string;
  onOpen: (e: React.MouseEvent) => unknown;
  id: string;
  children?: React.ReactNode;
  parentRef: React.MutableRefObject<any>;
  isNestedDropDown?: boolean;
};

function openVerticalPanel($l) {
  if ($l.hasClass("mm-opened")) {
    $l.removeClass("mm-opened");
  } else {
    $l.addClass("mm-opened");
  }
}

let incrNumber = 1;
export function useDropDownHook(): DropDownProps {
  // const { mmenuApi } = MMenuContext.useContainer();
  const parentRef = useRef(null);

  const id = "#mm-" + (90 + incrNumber++);
  const onOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    // console.log("Opening panel", mmenuApi, jQuery(id));
    openVerticalPanel(jQuery(parentRef.current));
  };
  return {
    id,
    onOpen,
    parentRef,
  };
}
