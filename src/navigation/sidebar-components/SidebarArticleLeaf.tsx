/*  Name: SidebarArticleLeaf
    Purpose: Contains component for leaves (articles) in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React, { useContext } from "react";
import { LeafLink } from "./SidebarStyledComponents";
import { CurrentPageContext } from "../NavigationSidebar";
import { stripTrailingSlash } from "./stripTrailingSlash";

export const ArticleLeaf = (props: {
  to: string;
  title: string;
  isSubCategory?: boolean;
}) => {
  const currentPage = useContext(CurrentPageContext);
  return (
    <li>
      <LeafLink
        to={stripTrailingSlash(props.to)}
        clicked={currentPage === stripTrailingSlash(props.to)}
        isSubCategory={props.isSubCategory}
      >
        {props.title}
      </LeafLink>
    </li>
  );
};
