/*
    Component: Subcategory List
    Purpose: When you click a core category in the main menu, you are lead to this list.
    Contains: Core category list item (first item in list, not a drop-down).
              All drop-down menus within this core category.
    Author: Madeline Solis de Ovando
*/

import React from "react";
import { MMenuContext } from "../NavigationSidebar";
import { SubcategoryProps } from "../types/SubcategoryProps";
import { DropdownParentController } from "./DropdownParent";
import {
  LeadAndListSeperator,
  LeadIconAndTextDiv,
  SidebarSVGIcon,
  StyledLink,
  SubMenuLeadDiv,
  SubMenuLeadLi,
} from "./styled";

export const SubcategoryListController: React.FC<SubcategoryProps> = ({
  title,
  path,
  svgIcon,
  dropdowns,
}) => {
  const { currentPage } = MMenuContext.useContainer();

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
      {dropdowns.map((dropdown) => (
        <DropdownParentController {...dropdown} />
      ))}
    </ul>
  );
};
