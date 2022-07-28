/*  Name: SidebarDropDown
    Purpose: Contains drop-down component and view for drop-downs in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React, { useRef } from "react";
import styled from "styled-components";
import { openPanel } from "./openPanel";

const StyledSpan = styled.span<{ isNestedDropDown: boolean }>`
  display: block;
  align-items: center;
  width: auto !important;
  font-size: ${(props) =>
    props.isNestedDropDown
      ? "var(--sq-font-size-regular)"
      : "var(--sq-font-size-caption)"};
  line-height: 24px;
  position: relative !important;
  padding: var(--sq-spacing-x-small) 20% var(--sq-spacing-x-small)
    var(--sq-spacing-small) !important;
  cursor: pointer;
  &:hover {
    background-color: #e7edee;
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

let incrNumber = 1;
export function useDropDownHook(): DropDownProps {
  const parentRef = useRef(null);

  const id = "#mm-" + (90 + incrNumber++);
  const onOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openPanel(jQuery(parentRef.current));
  };
  return {
    id,
    onOpen,
    parentRef,
  };
}
