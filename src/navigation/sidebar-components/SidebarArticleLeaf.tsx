/*  Name: SidebarArticleLeaf
    Purpose: Contains component for leaves (articles) in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import React from "react";
import { LeafLink } from "./SidebarStyledComponents";
import { CurrentPageContext } from "../NavigationSidebar";

export const ArticleLeaf = (props: {
  to: string;
  title: string;
  isSubCategory?: boolean;
}) => {
  const currentPage = React.useContext(CurrentPageContext);
  return (
    <li>
      <LeafLink
        to={props.to}
        clicked={currentPage === props.to}
        isSubCategory={props.isSubCategory}
      >
        {props.title}
      </LeafLink>
    </li>
  );
};
