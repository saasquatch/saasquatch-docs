import { History } from "history";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useBrowserEffect from "src/util/useBrowserEffect";
import { createContainer } from "unstated-next";
import { CoreCategoryController } from "./components/CoreCategory";
import { bullHornIcon, graphGrowthIconBig } from "./components/icons";
import "./mmenu-overrides.css";
import init, { MMenuID } from "./nav";
import * as Styles from "./NavStyles";
import { learningSaasquatchSubCategories } from "./portalNavItems";

/* Growth Automation menu items */

/* Styled Components */

/* MMenu Stuff */
function useMMenu() {
  const history: History<any> = useHistory();

  const [mmenuApi, setMMenuApi] = useState(null);
  const [activePages, setActivePages] = useState<string[]>([]);

  /* Clicked list item changes, will be applied to StyledLink */
  const path = history.location.pathname;
  const hash = history.location.hash;
  const pathAndHash = path + hash;
  const currentPage = pathAndHash;
  const isActive = (pageKey: string) => activePages.includes(pageKey);
  const clearActivePages = () => setActivePages([]);

  const toggleActivePage = (pageKey: string) => {
    setActivePages((prev) =>
      prev.includes(pageKey)
        ? removePageKey(prev, pageKey)
        : addPageKey(prev, pageKey)
    );
  };

  const removePageKey = (keys: string[], pageKey: string) =>
    keys.filter((key) => key !== pageKey);

  const addPageKey = (keys: string[], pageKey: string) => [...keys, pageKey];

  useEffect(() => {
    const arrows = document.getElementsByClassName("mm-next");

    Array.from(arrows).forEach((arrow) => {
      arrow.addEventListener("click", clearActivePages);
    });

    return () => {
      const arrows = document.getElementsByClassName("mm-next");

      Array.from(arrows).forEach((arrow) => {
        arrow.removeEventListener("click", clearActivePages);
      });
    };
  }, []);

  return {
    get mmenuApi() {
      return mmenuApi;
    },
    set mmenuApi(next) {
      setMMenuApi(next);
    },
    currentPage,
    activePages,
    isActive,
    toggleActivePage,
    clearActivePages,
  };
}

export const MMenuContext = createContainer(useMMenu);

export const modalRoot =
  typeof document === "undefined" ? undefined : document.createElement("div");

/* Rendering Function */
export function NavigationSidebar() {
  const history: History<any> = useHistory();
  // const container = useRef(null);
  const mmenu = MMenuContext.useContainer();

  useBrowserEffect(() => {
    mmenu.mmenuApi = init(modalRoot, history);
  }, [modalRoot]);

  return (
    <Styles.Container>
      <nav id={MMenuID}>
        <ul className="baseMenu">
          <CoreCategoryController
            title="Product Updates"
            path="/product-news"
            icon={bullHornIcon}
            hasNextPage={false}
          />

          <CoreCategoryController
            title="Learning SaaSquatch"
            path="/success/"
            icon={graphGrowthIconBig}
            hasNextPage={true}
            subcategoryList={learningSaasquatchSubCategories}
          />
        </ul>
      </nav>
    </Styles.Container>
  );
}
