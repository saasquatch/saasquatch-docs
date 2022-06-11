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
import {
  AllContentDiv,
  ArrowDiv,
  IconAndTextDiv,
  MainMenuLi,
  StyledLink,
  SVGIcon,
  SVGProps,
} from "../NavigationSidebar";
import { DropdownParent, MenuParentProps } from "./DropdownParent";
import { SubcategoryList, SubcategoryProps } from "./SubcategoryList";

interface CoreCategoryProps {
  title: string;
  path: string;
  currentPage: string;
  icon: SVGProps;
  hasNextPage: boolean;
  subcategoryList?: SubcategoryProps;
  setActivePages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CoreCategory: React.FC<CoreCategoryProps> = ({
  title,
  path,
  currentPage,
  icon,
  hasNextPage,
  subcategoryList,
  setActivePages,
}) => {
  if (hasNextPage) {
    return (
      <MainMenuLi>
        <StyledLink to={path} onClick={() => setActivePages([])}>
          <AllContentDiv>
            <IconAndTextDiv>
              <SVGIcon width={icon.width} viewBox={icon.viewBox} d={icon.d} />
              {title}
            </IconAndTextDiv>
            <ArrowDiv>
              <SVGIcon
                width="35%"
                viewBox="0 0 8 13"
                d="M0 1.91L4.58 6.5L0 11.09L1.41 12.5L7.41 6.5L1.41 0.5L0 1.91Z"
                fill="#003B45"
              />
            </ArrowDiv>
          </AllContentDiv>
        </StyledLink>
        <SubcategoryList
          title={subcategoryList.title}
          currentPage={subcategoryList.currentPage}
          path={subcategoryList.path}
          svgIcon={subcategoryList.svgIcon}
          dropdowns={subcategoryList.dropdowns}
        />
      </MainMenuLi>
    );
  } else {
    return (
      <MainMenuLi>
        <StyledLink
          to={path}
          clicked={currentPage === path}
          onClick={() => setActivePages([])}
        >
          <IconAndTextDiv>
            <SVGIcon
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
