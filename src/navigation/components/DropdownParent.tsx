/*
    Component: Drop-down menu parent (e.g. "Growth Automation" with dropdown caret)
    Purpose: Renders list item with drop-down caret in core category sub-section.
    Contains: One drop-down parent (title and caret).
              All menu items (drop-down children) within the parent.
    Author: Madeline Solis de Ovando
*/

import React from "react";
import { MMenuContext } from "../NavigationSidebar";
import { DropdownChildController } from "./DropdownChild";
import {
  DropdownMenuList,
  DropdownParentContainer,
  DropdownParentLi,
  SidebarSVGIcon,
  StyledLink} from "./styled";
import { MenuParentProps } from "../types/MenuParentProps";

export const DropdownParentController: React.FC<MenuParentProps> = ({
  title,
  parentID,
  menuItems,
  svgIcon,
}) => {
  const { isActive, toggleActivePage } = MMenuContext.useContainer();

  return (
    <DropdownParentLi>
      <StyledLink
        onClick={() => toggleActivePage(parentID)}
        dropdownSelected={isActive(parentID)}
      >
        <DropdownParentContainer>
          {title}
          <SidebarSVGIcon
            dropdownSelected={isActive(parentID)}
            width={svgIcon.width}
            viewBox={svgIcon.viewBox}
            d={svgIcon.d}
          />
        </DropdownParentContainer>
      </StyledLink>
      {isActive(parentID) && (
        <DropdownMenuList>
          {menuItems.map((item) => {
            return <DropdownChildController {...item} />;
          })}
        </DropdownMenuList>
      )}
    </DropdownParentLi>
  );
};
