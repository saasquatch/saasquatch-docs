import React, { useRef } from "react";
import styled from "styled-components";

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  /* width: 100%; */
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
  text-align: center;
  padding: 8px 12px !important;
  &:hover {
    background-color: #e7edee;
  }
`;

export function MenuItemView(props: MenuItemViewProps) {
  return (
    <li className="mm-vertical" ref={props.parentRef}>
      {/* Getting rid of span helps, just makes arrow disappear */}
      <span
        className="mm-next mm-fullsubopen"
        // href={id}
        data-target={props.id}
        onClick={props.onOpen}
      ></span>
      <StyledLi onClick={props.onOpen}>{props.title}</StyledLi>
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
