/*
    Component: Drop-down menu child 
    Purpose: Renders list item (leaf) that belongs to drop-down menu.
    Contains: Title of leaf node, entire item is a link to an article.
    Author: Madeline Solis de Ovando
*/

import React from "react";
import { MMenuContext } from "../NavigationSidebar";
import { MenuItemProps } from "../types/MenuItemProps";
import { DropdownChildLi, StyledLink } from "./styled";

export const DropdownChildController: React.FC<MenuItemProps> = ({
  path,
  title,
}) => {
  const { currentPage } = MMenuContext.useContainer();
  return (
    <DropdownChildLi clicked={currentPage === path}>
      <StyledLink to={path} clicked={currentPage === path}>
        {title}
      </StyledLink>
    </DropdownChildLi>
  );
};
