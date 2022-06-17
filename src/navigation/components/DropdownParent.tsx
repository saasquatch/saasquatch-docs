/*
    Component: Drop-down menu parent (e.g. "Growth Automation" with dropdown caret)
    Purpose: Renders list item with drop-down caret in core category sub-section.
    Contains: One drop-down parent (title and icon).
              All menu items (drop-down children) within the parent.
    Author: Madeline Solis de Ovando
*/

import React from "react";
import {
  DropdownParentLi,
  DropdownParentContainer,
  StyledLink,
  DropdownMenuList,
  SVGIcon,
  SVGProps,
  MenuItemProps,
} from "../NavigationSidebar";
import { DropdownChild } from "./DropdownChild";

interface MenuParentProps {
  title: string;
  parentID: string;
  menuItems: MenuItemProps[];
  svgIcon: SVGProps;
  toggleActivePage: (pageKey: string) => void;
  isActive: (pageKey: string) => boolean;
}

export const DropdownParent: React.FC<MenuParentProps> = ({
  title,
  parentID,
  menuItems,
  svgIcon,
  toggleActivePage,
  isActive,
}) => {
  return (
    <DropdownParentLi>
      <StyledLink
        onClick={() => toggleActivePage(parentID)}
        dropdownSelected={isActive(parentID)}
      >
        <DropdownParentContainer>
          {title}
          <SVGIcon
            width={svgIcon.width}
            viewBox={svgIcon.viewBox}
            d={svgIcon.d}
          />
        </DropdownParentContainer>
      </StyledLink>
      {isActive(parentID) && (
        <DropdownMenuList>
          {menuItems.map((item) => {
            return (
              <DropdownChild
                path={item.path}
                title={item.title}
                currentPage={item.currentPage}
              />
            );
          })}
        </DropdownMenuList>
      )}
    </DropdownParentLi>
  );
};
