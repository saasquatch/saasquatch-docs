/*
    Component: Core category list item
    Purpose: Renders the core categories that appear on main menu.
    Contains: One core category.
              The icon that is used to recognise the category (e.g. buildings blocks for Integrations)
              Title of category.
              Arrow on right-hand side (if category leads to subcategory)
    Author: Madeline Solis de Ovando
*/

import React from "react";
import { MMenuContext } from "../NavigationSidebar";
import { SubcategoryProps } from "../types/SubcategoryProps";
import { SVGProps } from "../types/SVGProps";
import {
  AllContentDiv,
  ArrowDiv,
  IconAndTextDiv,
  MainMenuLi,
  SidebarSVGIcon,
  StyledLink,
} from "./styled";
import { SubcategoryListController } from "./SubcategoryList";

interface CoreCategoryProps {
  title: string;
  path: string;
  icon: SVGProps;
  hasNextPage: boolean;
  subcategoryList?: SubcategoryProps;
}

export const CoreCategoryController: React.FC<CoreCategoryProps> = ({
  title,
  path,
  icon,
  hasNextPage,
  subcategoryList,
}) => {
  const { clearActivePages, currentPage } = MMenuContext.useContainer();

  if (hasNextPage) {
    return (
      <MainMenuLi>
        <StyledLink to={path} onClick={clearActivePages}>
          <AllContentDiv>
            <IconAndTextDiv>
              <SidebarSVGIcon
                width={icon.width}
                viewBox={icon.viewBox}
                d={icon.d}
              />
              {title}
            </IconAndTextDiv>
            <ArrowDiv>
              <SidebarSVGIcon
                width="35%"
                viewBox="0 0 8 13"
                d="M0 1.91L4.58 6.5L0 11.09L1.41 12.5L7.41 6.5L1.41 0.5L0 1.91Z"
                fill="#003B45"
              />
            </ArrowDiv>
          </AllContentDiv>
        </StyledLink>
        <SubcategoryListController {...subcategoryList} />
      </MainMenuLi>
    );
  } else {
    return (
      <MainMenuLi>
        <StyledLink
          to={path}
          clicked={currentPage === path}
          onClick={clearActivePages}
        >
          <IconAndTextDiv>
            <SidebarSVGIcon
              clicked={currentPage === path}
              width={icon.width}
              viewBox={icon.viewBox}
              d={icon.d}
            />
            {title}
          </IconAndTextDiv>
        </StyledLink>
      </MainMenuLi>
    );
  }
};
