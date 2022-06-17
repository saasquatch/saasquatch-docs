/*
    Component: Drop-down menu child
    Purpose: Renders list item that goes inside drop-down menu
    Author: Madeline Solis de Ovando
*/

import React from "react";
import styled from "styled-components";
import { DropdownChildLi, StyledLink } from "../NavigationSidebar";

interface Props {
  path: string;
  title: string;
  currentPage: string;
}

export const DropdownChild: React.FC<Props> = ({
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
