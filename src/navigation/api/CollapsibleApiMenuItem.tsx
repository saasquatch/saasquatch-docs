import React, { useMemo, useRef } from "react";
import styled from "styled-components";

interface CollapsibleApiMenuProps {
  name: string;
}

const CollapsibleApiMenuHeading = styled.div`
  display: block;
  height: fit-content;
  align-items: center;
  width: auto !important;
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  position: relative !important;
  padding: var(--sq-spacing-x-small) 20% var(--sq-spacing-x-small)
    var(--sq-spacing-small) !important;
  cursor: pointer;
  &:hover {
    background-color: #e7edee;
  }
`;

let collapsibleMenuIdx = 0;

const CollapsibleApiMenuItem: React.FC<CollapsibleApiMenuProps> = (props) => {
  const parent = useRef(null);
  const id = useMemo(() => `#mm-collapsible-menu-${collapsibleMenuIdx++}`, []);

  function open(e: React.MouseEvent) {
    e.preventDefault();
    jQuery(parent.current).toggleClass("mm-opened");
  }

  return (
    <li className="mm-vertical" ref={parent}>
      <CollapsibleApiMenuHeading
        className="mm-next mm-fullsubopen"
        data-target={id}
        onClick={open}
      >
        {props.name}
      </CollapsibleApiMenuHeading>
      <div
        className="mm-panel mm-vertical"
        style={{
          marginLeft: "12px",
          borderLeft: "1px solid #003b45",
        }}
        id={id}
      >
        <ul className="nav-onpage mm-listview mm-vertical">{props.children}</ul>
      </div>
    </li>
  );
};

export default CollapsibleApiMenuItem;
