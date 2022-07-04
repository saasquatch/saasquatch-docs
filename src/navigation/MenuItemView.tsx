import React, { useRef } from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: block;
  height: fit-content;
  align-items: center;
  width: auto !important;
  font-size: 16px;
  line-height: 24px;
  position: relative !important;
  padding: 8px 20% 8px 12px !important;
  cursor: pointer;
  &:hover {
    background-color: #e7edee;
  }
`;

//@ts-ignore
const NestedStyledSpan = styled(StyledSpan)`
  font-size: 14px;
`;

export function MenuItemView(props: MenuItemViewProps) {
  if (props.isNestedDropDown)
    return (
      <li className="mm-vertical" ref={props.parentRef}>
        <NestedStyledSpan
          className="mm-next"
          // href={id}
          data-target={props.id}
          onClick={props.onOpen}
        >
          {props.title}
        </NestedStyledSpan>
        <div className="mm-panel mm-vertical" id={props.id}>
          <ul className="nav-onpage mm-listview mm-vertical">
            {props.children}
          </ul>
        </div>
      </li>
    );
  return (
    <li className="mm-vertical" ref={props.parentRef}>
      <StyledSpan
        className="mm-next"
        // href={id}
        data-target={props.id}
        onClick={props.onOpen}
      >
        {props.title}
      </StyledSpan>
      <div className="mm-panel mm-vertical" id={props.id}>
        <ul className="nav-onpage mm-listview mm-vertical">{props.children}</ul>
      </div>
    </li>
  );
}

export type MenuItemViewProps = {
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
export function useMenuItemHook(): MenuItemViewProps {
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
