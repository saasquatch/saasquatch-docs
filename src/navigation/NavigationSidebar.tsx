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

/* Growth Automation menu items */

const dropdownCaret: SVGProps = {
  width: "12px",
  viewBox: "0 0 12 8",
  d: "M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z",
};

const graphGrowthIcon: SVGProps = {
  width: "70%",
  viewBox: "0 0 65 38",
  d: "M43.3333 8.125C41.3359 8.125 39.7222 6.50508 39.7222 4.5C39.7222 2.49492 41.3359 0.875 43.3333 0.875H61.3889C63.3863 0.875 65 2.49492 65 4.5V22.625C65 24.6301 63.3863 26.25 61.3889 26.25C59.3915 26.25 57.7778 24.6301 57.7778 22.625V13.2566L38.6615 32.4352C37.2509 33.8512 34.9714 33.8512 33.5608 32.4352L21.5651 20.5066L6.16484 36.0602C4.75425 37.4762 2.46797 37.4762 1.0576 36.0602C-0.352535 34.6441 -0.352535 32.3559 1.0576 30.9398L19.1163 12.8148C20.5269 11.3988 22.8064 11.3988 24.217 12.8148L36.1111 24.7434L52.6658 8.02305L43.3333 8.125Z",
};

const graphGrowthIconBig: SVGProps = {
  ...graphGrowthIcon,
  width: "100%",
};

const bullHornIcon: SVGProps = {
  width: "85%",
  viewBox: "0 0 22 22",
  d: "M20.625 7.71718C21.4242 8.09531 22 9.11367 22 10.3125C22 11.5113 21.4242 12.5297 20.625 12.9078V19.25C20.625 19.8043 20.2898 20.307 19.7742 20.5219C19.2629 20.7324 18.6699 20.6164 18.2789 20.2211L16.4012 18.309C14.3387 16.2465 11.5414 15.125 8.62383 15.125H8.25V20.625C8.25 21.3855 7.63555 22 6.875 22H4.125C3.36574 22 2.75 21.3855 2.75 20.625V15.125C1.23105 15.125 0 13.8918 0 12.375V8.25C0 6.7332 1.23105 5.5 2.75 5.5H8.62383C11.5414 5.5 14.3387 4.33984 16.4012 2.2782L18.2789 0.402741C18.6699 0.00951264 19.2629 -0.108114 19.7742 0.10471C20.2898 0.317534 20.625 0.818979 20.625 1.375V7.71718ZM8.62383 8.25H8.25V12.375H8.62383C12.0527 12.375 15.3484 13.6555 17.875 15.9543V4.6707C15.3484 6.96953 12.0527 8.25 8.62383 8.25Z",
};

/* Styled Components */

/* Styled Link (should change style when clicked) */
/* Parameter: clicked (boolean) */
/* if: "?"" else: ":" */
export const StyledLink = styled(Link)`
  display: flex !important;
  align-items: center !important;
  height: fit-content !important;
  /* Product News clicking behaviour */
  background-color: ${(props) =>
    props.clicked ? "#003B45" : "white"} !important;
  color: ${(props) => (props.clicked ? "white" : "#003B45")} !important;
  /* Drop-down menu clicking style change */
  font-weight: ${(props) =>
    props.dropdownSelected || props.clicked ? "700" : "400"};

  &:hover {
    /* Clicked hovering behaviour */
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
  }
`;

/* ul styles */
const SubMenuList = styled.ul``;

export const DropdownMenuList = styled.ul`
  list-style: none !important;
  /* border-left: 1px solid #003b45 !important; */
  margin-left: 12px !important;
`;

const NestedList = styled.ul`
  list-style: none !important;
  border-left: 1px solid #003b45 !important;
  margin-left: 12px !important;
  ${StyledLink} {
    padding: 0px 0px !important;
    width: 100%;
  }
`;

/* Different list items in order of size */
export const MainMenuLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  & > a.mm-next {
    display: none;
  }
`;

export const SubMenuLeadLi = styled.li`
  font-size: 16px;
  line-height: 24px;
  background-color: "#003B45" !important;
  color: white !important;
`;

export const DropdownParentLi = styled.li`
  font-size: 16px;
  line-height: 24px;
`;

export const DropdownChildLi = styled.li<{ clicked: boolean }>`
  font-family: "Helvetica" !important;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  color: #003b45;

  border-left: ${(props) =>
    props.clicked ? "2px solid #06966F" : "1px solid #003b45"} !important;

  ${StyledLink} {
    padding: 8px 10px;
  }
`;

export const LeadAndListSeperator = styled.li`
  height: 6px;
  border-bottom: 1px solid #e2e2e2;
`;

/* Divs for spacing within each list item (space between SVG and text) */
export const IconAndTextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const LeadIconAndTextDiv = styled.div`
  display: flex;
  gap: 8px;
`;
export const AllContentDiv = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;
`;

// @ts-ignore
export const SubMenuLeadDiv = styled(AllContentDiv)`
  gap: 8px;
`;

export const DropdownParentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
const SeperatorSpacing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 11px;
  gap: 10px;
`;

const SeperatorText = styled.p`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  margin: 0 !important;
`;

const SeperatorLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e2e2e2;
`;

export const ArrowDiv = styled.div`
  display: flex !important;
  justify-self: end !important;
`;

/* Referral code list items styled components (contain buttons and different layout than other list items) */
const ReferralCodeLi = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 21px;
  padding: 8px 0;
  padding-left: 11px;
  gap: 4px;
`;

const ButtonsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const GreenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  background-color: #06966f;
  padding: 2px 5px;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

// @ts-ignore
const OrangeButton = styled(GreenButton)`
  background-color: #e79533;
`;

const GreyButton = styled(GreenButton)`
  background-color: #999999;
  text-transform: capitalize;
`;

/* SVG icon container and render function */
const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: auto;
`;

export const SVGIcon: React.FC<SVGProps> = ({
  fill,
  width,
  height = "auto",
  viewBox,
  d,
  clicked,
  dropdownSelected,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill={clicked ? "white" : "#003B45"}
        transform={dropdownSelected ? "rotate(180)" : "rotate(0)"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} />
      </svg>
    </IconSVGDiv>
  );
};

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
