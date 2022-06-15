import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { HashLink as Link } from "react-router-hash-link";
import { createContainer } from "unstated-next";

import * as Styles from "./NavStyles";
import init from "./nav";

import "./mmenu-overrides.css";
import ApiSidebar from "./ApiSidebar";
import useBrowserEffect from "src/util/useBrowserEffect";
// import "mmenu-js/dist/mmenu.css"

import styled from "styled-components";
import { DropdownChild, MenuItemProps } from "./components/DropdownChild";
import { DropdownParent, MenuParentProps } from "./components/DropdownParent";
import {
  SubcategoryList,
  SubcategoryProps,
} from "./components/SubcategoryList";
import { CoreCategory } from "./components/CoreCategory";
import { IconSVGDiv } from "./components/styled";
import {
  bullHornIcon,
  dropdownCaret,
  graphGrowthIcon,
  graphGrowthIconBig,
} from "./components/icons";

/* Growth Automation menu items */

/* Styled Components */

/* MMenu Stuff */
function useMMenu() {
  const [mmenuApi, setMMenuApi] = useState(null);
  return {
    get mmenuApi() {
      return mmenuApi;
    },
    set mmenuApi(next) {
      setMMenuApi(next);
    },
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

  /* Clicked list item changes, will be applied to StyledLink */
  const [currentPage, setcurrentPage] = useState<string>("/");
  const [activePages, setActivePages] = useState<string[]>([]);
  const isActive = (pageKey: string) => activePages.includes(pageKey);

  const toggleActivePage = (pageKey: string) => {
    setActivePages((prev) =>
      prev.includes(pageKey)
        ? removePageKey(prev, pageKey)
        : addPageKey(prev, pageKey)
    );
  };
  function clearActivePages() {
    setActivePages([]);
  }

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

  useEffect(() => {
    const path = history.location.pathname;
    const hash = history.location.hash;
    const pathAndHash = path + hash;
    setcurrentPage(pathAndHash);
  }, [history.location.pathname, history.location.hash]);

  const adminPortalItems: MenuItemProps[] = [
    {
      path: "/success/using-referral-saasquatch/",
      title: "Using the SaaSquatch Portal",
      currentPage,
    },
    {
      path: "/success/navigating-the-portal/",
      title: "Navigating the SaaSquatch Portal",
      currentPage,
    },
    {
      path: "/success/referral-feed/",
      title: "The Referral Feed",
      currentPage,
    },
    {
      path: "/features/analytics/",
      title: "Program Analytics",
      currentPage,
    },
  ];

  const growthAutoItems: MenuItemProps[] = [
    {
      path: "/growth/ga-101",
      title: "Growth Automation 101",
      currentPage,
    },
    {
      path: "/growth/customer-lifecycle",
      title: "Growth Automation Customer Lifecycle",
      currentPage,
    },
    {
      path: "/growth/saasquatch-ga",
      title: "SaaSquatch Growth Automation Platform",
      currentPage,
    },
  ];

  const referralProgramsItems: MenuItemProps[] = [
    {
      path: "/success/intro/",
      title: "Referral Programs 101",
      currentPage,
    },
    {
      path: "/success/referral-program-optimization/",
      title: "Referral Program Optimization",
      currentPage,
    },
    {
      path: "/success/core-topics/",
      title: "The SaaSquatch Referral Program Loop",
      currentPage,
    },
    {
      path: "/success/touchpoints/",
      title: "Referral Marketing Channels",
      currentPage,
    },
    {
      path: "/success/referral-program-retargeting/",
      title: "Referral Program Retargeting",
      currentPage,
    },
    {
      path: "/success/share-options/",
      title: "Referral Program Sharing Options",
      currentPage,
    },
  ];

  const fraudSecurityManageItems: MenuItemProps[] = [
    {
      path: "/success/referral-security/",
      title: "Security Management System",
      currentPage,
    },
    {
      path: "/fraud-and-security/",
      title: "Fraud, Security & Fake Referrals",
      currentPage,
    },
  ];

  const learningSaasquatchDropdowns: MenuParentProps[] = [
    {
      title: "SaaSquatch Admin Portal",
      parentID: "adminPortal",
      menuItems: adminPortalItems,
      svgIcon: dropdownCaret,
      toggleActivePage,
      isActive,
    },
    {
      title: "Growth Automation",
      parentID: "growthAuto",
      menuItems: growthAutoItems,
      svgIcon: dropdownCaret,
      toggleActivePage,
      isActive,
    },
    {
      title: "Referral Programs",
      parentID: "referralPrograms",
      menuItems: referralProgramsItems,
      svgIcon: dropdownCaret,
      toggleActivePage,
      isActive,
    },
    {
      title: "Fraud and Security Management",
      parentID: "fraudSecurityManage",
      menuItems: fraudSecurityManageItems,
      svgIcon: dropdownCaret,
      toggleActivePage,
      isActive,
    },
  ];

  const learningSaasquatchSubCategories: SubcategoryProps = {
    title: "Learning SaaSquatch",
    path: "/success/",
    currentPage,
    svgIcon: graphGrowthIcon,
    dropdowns: learningSaasquatchDropdowns,
  };

  return (
    <Styles.Container>
      <nav id="my-menu">
        <ul className="baseMenu">
          <CoreCategory
            title="Product Updates"
            path="/product-news"
            currentPage={currentPage}
            icon={bullHornIcon}
            hasNextPage={false}
            setActivePages={setActivePages}
          />

          <CoreCategory
            title="Learning SaaSquatch"
            path="/success/"
            currentPage={currentPage}
            icon={graphGrowthIconBig}
            hasNextPage={true}
            subcategoryList={learningSaasquatchSubCategories}
            setActivePages={setActivePages}
          />
        </ul>
      </nav>
    </Styles.Container>
  );
}

export interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  d?: string;
  clicked?: boolean;
  dropdownSelected?: boolean;
}
