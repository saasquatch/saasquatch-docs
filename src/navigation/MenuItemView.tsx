import React, { useRef } from "react";

export function MenuItemView(props: MenuItemViewProps) {
  return (
    <li className="mm-vertical" ref={props.parentRef}>
      <span
        className="mm-next mm-fullsubopen"
        // href={id}
        data-target={props.id}
        onClick={props.onOpen}
      ></span>
      <span onClick={props.onOpen}>{props.title}</span>
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
