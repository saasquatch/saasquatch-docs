/*
    Component: Drop-down menu child 
    Purpose: Renders list item (leaf) that belongs to drop-down menu.
    Contains: Title of leaf node, entire item is a link to an article.
    Author: Madeline Solis de Ovando
*/

import React from "react";
import styled from "styled-components";
import { DropdownChildLi, StyledLink } from "../NavigationSidebar";

export interface MenuItemProps {
  path: string;
  title: string;
  currentPage: string;
}

export const DropdownChild: React.FC<MenuItemProps> = ({
  path,
  title,
  currentPage,
}) => {
  return (
    <DropdownChildLi clicked={currentPage === path}>
      <StyledLink to={path} clicked={currentPage === path}>
        {title}
      </StyledLink>
    </DropdownChildLi>
  );
};
