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
import { VersionContext, Version } from "components/useVersion";

export interface IArticleLeafProps {
  to: string;
  title: string;
  isSubCategory?: boolean;
  apiMethod?: boolean;
  personalization?: Exclude<Version, "everything"> | "unset";
}

export interface IArticleLeafViewProps extends IArticleLeafProps {
  currentPage: string;
  checkUrlIsMethod: () => boolean;
  version: Version;
}

export const useArticleLeaf = (props: IArticleLeafProps) => {
  const currentPage = useContext(CurrentPageContext);
  const history: History<any> = useHistory();
  const hash = history.location.hash;

  const checkUrlIsMethod = () => {
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

  const { version } = VersionContext.useContainer();

  return {
    ...props,
    version,
    currentPage,
    checkUrlIsMethod,
  };
};

export const ArticleLeafView = (props: IArticleLeafViewProps) => {
  const { personalization = "unset", version } = props;

  return (
    (personalization === version ||
      personalization === "unset" ||
      version === "everything") && (
      <li>
        <LeafLink
          to={stripTrailingSlash(props.to)}
          clicked={
            props.apiMethod
              ? props.checkUrlIsMethod()
              : props.currentPage === stripTrailingSlash(props.to)
          }
          isSubCategory={props.isSubCategory}
        >
          {props.title}
        </LeafLink>
      </li>
    )
  );
};

export const ArticleLeaf = (props: IArticleLeafProps) => {
  return <ArticleLeafView {...useArticleLeaf(props)} />;
};
