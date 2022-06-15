/*
    Component: Subcategory List
    Purpose: When you click a core category in the main menu, you are lead to this list.
    Contains: Core category list item (first item in list, not a drop-down).
              All drop-down menus within this core category.
    Author: Madeline Solis de Ovando
*/

import React from "react";

import { DropdownParent, MenuParentProps } from "./DropdownParent";
import {
  SubMenuLeadLi,
  StyledLink,
  SubMenuLeadDiv,
  LeadIconAndTextDiv,
  LeadAndListSeperator,
  SVGProps,
  SidebarSVGIcon,
} from "./styled";

export interface SubcategoryProps {
  title: string;
  path: string;
  currentPage: string;
  svgIcon: SVGProps;
  dropdowns: MenuParentProps[];
}

export const SubcategoryList: React.FC<SubcategoryProps> = ({
  title,
  path,
  currentPage,
  svgIcon,
  dropdowns,
}) => {
  return (
    <ul>
      <SubMenuLeadLi>
        <StyledLink to={path} clicked={currentPage === path}>
          {" "}
          <SubMenuLeadDiv>
            <LeadIconAndTextDiv>
              <SidebarSVGIcon
                clicked={currentPage === path}
                width={svgIcon.width}
                viewBox={svgIcon.viewBox}
                d={svgIcon.d}
              />
              {title}
            </LeadIconAndTextDiv>
          </SubMenuLeadDiv>
        </StyledLink>
      </SubMenuLeadLi>
      <LeadAndListSeperator />
      {dropdowns.map((dropdown) => {
        return (
          <DropdownParent
            title={dropdown.title}
            parentID={dropdown.parentID}
            menuItems={dropdown.menuItems}
            svgIcon={dropdown.svgIcon}
            toggleActivePage={dropdown.toggleActivePage}
            isActive={dropdown.isActive}
          />
        );
      })}
    </ul>
  );
};
