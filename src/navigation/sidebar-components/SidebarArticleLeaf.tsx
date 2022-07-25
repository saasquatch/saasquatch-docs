/*  Name: SidebarArticleLeaf
    Purpose: Contains component for leaves (articles) in docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import { History } from "history";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { LeafLink } from "./SidebarStyledComponents";
import { CurrentPageContext } from "../NavigationSidebar";
import { stripTrailingSlash } from "./stripTrailingSlash";

export const ArticleLeaf = (props: {
  to: string;
  title: string;
  isSubCategory?: boolean;
  apiMethod?: boolean;
}) => {
  const currentPage = useContext(CurrentPageContext);
  const history: History<any> = useHistory();
  const hash = history.location.hash;

  const checkUrlIsMethod = () => {
    console.log("currentPage-articleLeaf: ", currentPage);
    if (currentPage == "/api/methods") {
      if (hash) {
        return hash === "#hidden" &&
          stripTrailingSlash(props.to) === "/api/methods#hidden"
          ? true
          : false;
      } else {
        return currentPage === stripTrailingSlash(props.to);
      }
    } else {
      return currentPage === stripTrailingSlash(props.to);
    }
  };

  return (
    <li>
      <LeafLink
        to={stripTrailingSlash(props.to)}
        clicked={
          props.apiMethod
            ? checkUrlIsMethod()
            : currentPage === stripTrailingSlash(props.to)
        }
        isSubCategory={props.isSubCategory}
      >
        {props.title}
      </LeafLink>
    </li>
  );
};
