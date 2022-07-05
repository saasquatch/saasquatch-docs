import { History } from "history";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import useBrowserEffect from "src/util/useBrowserEffect";
// import "mmenu-js/dist/mmenu.css"
import styled from "styled-components";
import { createContainer } from "unstated-next";
import {
  buildingIcon,
  devIcon,
  integrationsIcon,
  learningIcon,
  newsIcon,
  runningProgramsIcon,
  SVGProps,
} from "./components/icons";
import { CoreCategoryView, useCoreCategoryHook } from "./CoreCategoryView";
import { MenuItemView, useMenuItemHook } from "./MenuItemView";
import "./mmenu-overrides.css";
import init from "./nav";
import * as Styles from "./NavStyles";

export interface MenuItemProps {
  path: string;
  title: string;
  currentPage: string;
}

export const StyledLink = styled(Link)`
  display: flex !important;
  align-items: center !important;
  height: fit-content !important;
  background-color: "white";
  color: #003b45;
  font-weight: 400;
  &:hover {
    background-color: #e7edee;
  }
`;

const DropDownStyledLink = styled(Link)`
  font-family: "Helvetica";
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  background-color: ${(props) =>
    props.clicked || props.clickedArticle ? "#003B45" : "white"} !important;
  color: ${(props) =>
    props.clicked || props.clickedArticle ? "white" : "#003B45"} !important;
  font-size: 16px;
  font-weight: ${(props) =>
    props.clicked || props.clickedArticle ? "700" : "400"} !important;
  line-height: 24px;
  padding: 8px 12px;
  &:hover {
    background-color: ${(props) =>
      props.clicked || props.clickedArticle ? "#003B45" : "#e7edee"} !important;
  }
`;

export const TitleLink = styled(DropDownStyledLink as any)`
  flex-direction: row;
  justify-content: start;
  line-height: 24px;
  gap: 8px;
  padding: 8px 12px;
`;

const MainMenuLi = styled.li`
  & > a.mm-next {
    display: none;
  }
`;

const IconAndTextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const CoreCategoryLink = styled(DropDownStyledLink as any)`
  /* justify-content: start; */
  /* gap: 18px; */
  padding: 8px 12px;
  width: auto;
`;

/* Styled component to make main menu arrow point rightwards */
const CoreLi = styled.li`
  & > a.mm-next {
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    top: -5px;
  }
`;

const SmallLeafLink = styled(DropDownStyledLink as any)`
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  padding: 8px 12px;
`;

//@ts-ignore
const BigLeafLink = styled(SmallLeafLink)`
  font-size: 16px;
  line-height: 24px;
`;

/* ul styles */

export const LeavesUl = styled.ul`
  /* list-style: none !important; */
  margin-left: 12px !important;
  border-left: 1px solid #003b45 !important;
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

const APIDropdownParentLi = styled.li`
  font-family: "Helvetica" !important;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  color: #003b45;
  border-left: 1px solid #003b45;
  ${StyledLink} {
    padding: 8px 10px;
  }
`;

export const DivideLineLi = styled.li`
  height: 8px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 8px !important;
`;

/* Divs for spacing within each list item (space between SVG and text) */

const AllContentDiv = styled.div``;

/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
const SeparatorLi = styled.li``;

const SeparatorDiv = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 11px !important;
  gap: 10px;
`;

const SeparatorSpan = styled.span`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  margin: 0 !important;
`;

const SeparatorLine = styled.div`
  height: 1px !important;
  width: 100% !important;
  background-color: #e2e2e2 !important;
`;

const ArrowDiv = styled.div`
  display: flex !important;
  justify-self: end !important;
`;

/* Referral code list items styled components (contain buttons and different layout than other list items) */
const APIDiv = styled.div`
  display: flex;
  flex-direction: column;
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

export const SidebarSVG: React.FC<SVGProps> = ({
  width,
  viewBox,
  d,
  clicked,
  clickedArticle: clickedArticle,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height="auto"
        viewBox={viewBox}
        fill={clicked || clickedArticle ? "white" : "#003B45"}
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

  const [currentPage, setcurrentPage] = useState<string>("/");
  useEffect(() => {
    const path = history.location.pathname;
    const hash = history.location.hash;
    const pathAndHash = path + hash;
    setcurrentPage(pathAndHash);
  }, [history.location.pathname, history.location.hash]);

  return (
    <Styles.Container>
      <nav id="my-menu">
        <ul className="baseMenu">
          {/* SaaSquatch Product News starts here */}
          <CoreCategory
            to="/product-news"
            title="SaaSquatch Product News"
            icon={newsIcon}
            clickedArticle={currentPage === "/product-news"}
          />
          {/* Learning SaaSquatch starts here */}
          <CoreCategory
            to="/success/"
            title="Learning SaaSquatch"
            icon={learningIcon}
            clicked={currentPage === "/success/"}
          >
            <DropDownMenuItem title="SaaSquatch Admin Portal">
              <LeavesUl>
                <Leaf
                  to="/success/using-referral-saasquatch"
                  title="Using the SaaSquatch Portal"
                  size="small"
                  clicked={currentPage === "/success/using-referral-saasquatch"}
                />
                <Leaf
                  to="/success/navigating-the-portal"
                  title="Navigating the SaaSquatch Portal"
                  size="small"
                  clicked={currentPage === "/success/navigating-the-portal"}
                />
                <Leaf
                  to="/success/referral-feed"
                  title="The Referral Feed"
                  size="small"
                  clicked={currentPage === "/success/referral-feed"}
                />
                <Leaf
                  to="/features/analytics"
                  title="Program Analytics"
                  size="small"
                  clicked={currentPage === "/features/analytics"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <LeavesUl>
                <Leaf
                  to="/growth/ga-101"
                  title="Growth Automation 101"
                  size="small"
                  clicked={currentPage === "/growth/ga-101"}
                />
                <Leaf
                  to="/growth/customer-lifecycle"
                  title="Growth Automation Customer Lifecycle"
                  size="small"
                  clicked={currentPage === "/growth/customer-lifecycle"}
                />

                <Leaf
                  to="/growth/saasquatch-ga"
                  title="SaaSquatch Growth Automation Platform"
                  size="small"
                  clicked={currentPage === "/growth/saasquatch-ga"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <LeavesUl>
                <Leaf
                  to="/success/intro"
                  title="Referral Programs 101"
                  size="small"
                  clicked={currentPage === "/success/intro"}
                />
                <Leaf
                  to="/referral-program-optimization"
                  title="Referral Program Optimization"
                  size="small"
                  clicked={currentPage === "/referral-program-optimization"}
                />
                <Leaf
                  to="/success/core-topics"
                  title="The SaaSquatch Referral Program Loop"
                  size="small"
                  clicked={currentPage === "/success/core-topics"}
                />
                <Leaf
                  to="/success/touchpoints"
                  title="Referral Marketing Channels"
                  size="small"
                  clicked={currentPage === "/success/touchpoints"}
                />
                <Leaf
                  to="/success/referral-program-retargeting"
                  title="Referral Program Retargeting"
                  size="small"
                  clicked={
                    currentPage === "/success/referral-program-retargeting"
                  }
                />
                <Leaf
                  to="/success/share-options"
                  title="Referral Program Sharing Options"
                  size="small"
                  clicked={currentPage === "/success/share-options"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <LeavesUl>
                <Leaf
                  to="/success/referral-security"
                  title="Security Management System"
                  size="small"
                  clicked={currentPage === "/success/referral-security"}
                />
                <Leaf
                  to="/fraud-and-security"
                  title="Fraud, Security & Fake Referrals"
                  size="small"
                  clicked={currentPage === "/fraud-and-security"}
                />
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Building Programs starts here */}
          <CoreCategory
            to="#"
            title="Building Programs "
            icon={buildingIcon}
            clicked={currentPage === "#"}
          >
            <DropDownMenuItem title="Programs">
              <LeavesUl>
                <SmallLeafLink
                  to="/growth/quickstart"
                  title="Growth Automation Program General Quickstart"
                  size="small"
                  clicked={currentPage === "/growth/quickstart"}
                />
                <DropDownMenuItem title="Program Library" isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/program/birthday-program"
                      title="Birthday & Anniversary"
                      size="small"
                      clicked={currentPage === "/program/birthday-program"}
                    />
                    <Leaf
                      to="/program/referral-program-with-objectives-prod"
                      title="Referral Program With Objectives"
                      size="small"
                      clicked={
                        currentPage ===
                        "/program/referral-program-with-objectives-prod"
                      }
                    />
                    <Leaf
                      to="/program/partner-program"
                      title="Partner"
                      size="small"
                      clicked={currentPage === "/program/partner-program"}
                    />
                    <Leaf
                      to="/program/win-back-program"
                      title="Win Back"
                      size="small"
                      clicked={currentPage === "/program/win-back-program"}
                    />
                    <Leaf
                      to="/program/vip-program"
                      title="VIP"
                      size="small"
                      clicked={currentPage === "/program/vip-program"}
                    />
                    <Leaf
                      to="/program/signup-reward"
                      title="Signup"
                      size="small"
                      clicked={currentPage === "/program/signup-reward"}
                    />
                    <Leaf
                      to="/program/regional-signup"
                      title="Regional Signup"
                      size="small"
                      clicked={currentPage === "/program/regional-signup"}
                    />
                    <Leaf
                      to="/program/profile-completion-reward"
                      title="Profile Completion"
                      size="small"
                      clicked={
                        currentPage === "/program/profile-completion-reward"
                      }
                    />
                    <Leaf
                      to="/program/points-program"
                      title="Points Rewards"
                      size="small"
                      clicked={currentPage === "/program/points-program"}
                    />
                  </LeavesUl>
                </DropDownMenuItem>
                <Leaf
                  to="/growth/ga-mechanisms"
                  title="Growth Automation Program Mechanisms"
                  size="small"
                  clicked={currentPage === "/growth/ga-mechanisms"}
                />

                <Leaf
                  to="/guides/referral-quickstart"
                  title="Growth Automational Referral Program - Quickstart"
                  size="small"
                  clicked={currentPage === "/guides/referral-quickstart"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <LeavesUl>
                <Leaf
                  to="/designer/widget-editor"
                  title="Customizing Program Widgets"
                  size="small"
                  clicked={currentPage === "/designer/widget-editor"}
                />
                <Leaf
                  to="/themes/custom"
                  title="Custom Program Themes"
                  size="small"
                  clicked={currentPage === "/themes/custom"}
                />
                <Leaf
                  to="/mobile/widget"
                  title="Mobile Widget"
                  size="small"
                  clicked={currentPage === "/mobile/widget"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <LeavesUl>
                <Leaf
                  to="/feature/rewards"
                  title="Program Reward Options"
                  size="small"
                  clicked={currentPage === "/feature/rewards"}
                />
                <Leaf
                  to="/success/gift-card-rewards"
                  title="Gift Card Rewards"
                  size="small"
                  clicked={currentPage === "/success/gift-card-rewards"}
                />
                <Leaf
                  to="/features/rewards-fuel-tank"
                  title="Fuel Tank Rewards"
                  size="small"
                  clicked={currentPage === "/features/rewards-fuel-tank"}
                />
                <Leaf
                  to="/features/reward-exchange"
                  title="Reward Exchange"
                  size="small"
                  clicked={currentPage === "/features/reward-exchange"}
                />
                <Leaf
                  to="/topics/conversion"
                  title="Conversion"
                  size="small"
                  clicked={currentPage === "/topics/conversion"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/user-segmentation"
              title="User Segmentation"
              size="big"
              clicked={currentPage === "/features/user-segmentation"}
            />

            <DropDownMenuItem title="Program Emails">
              <LeavesUl>
                <Leaf
                  to="/designer/email-editor"
                  title="Designing Your Program Emails"
                  size="small"
                  clicked={currentPage === "/designer/email-editor"}
                />
                <Leaf
                  to="/designer/short-tags"
                  title="Email Template Short Tags"
                  size="small"
                  clicked={currentPage === "/designer/short-tags"}
                />
                <Leaf
                  to="/developer/blocked-email-domains"
                  title="Blocked Email Domains"
                  size="small"
                  clicked={currentPage === "/developer/blocked-email-domains"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <LeavesUl>
                <Leaf
                  to="/features/w-9-compliance"
                  title="W-9 Compliance"
                  size="small"
                  clicked={currentPage === "/features/w-9-compliance"}
                />
                <Leaf
                  to="/features/configuring-your-reward-catalog-for-w-9"
                  title="Configuring Your Rewards for W-9"
                  size="small"
                  clicked={
                    currentPage ===
                    "/features/configuring-your-reward-catalog-for-w-9"
                  }
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/program-i18n"
              title="Program Internationalization"
              size="big"
              clicked={currentPage === "/features/program-i18n"}
            />
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="#"
            title="Running Programs"
            icon={runningProgramsIcon}
            clicked={currentPage === "#"}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <LeavesUl>
                <Leaf
                  to="/success/ga-analytics"
                  title="Analytics Overview for Growth Automation Programs"
                  size="small"
                  clicked={currentPage === "/success/ga-analytics"}
                />
                <Leaf
                  to="/features/program-and-portal-statistics"
                  title="Program and Portal Statistics"
                  size="small"
                  clicked={
                    currentPage === "/features/program-and-portal-statistics"
                  }
                />
                <Leaf
                  to="/success/analytics-data"
                  title="Understanding Your Program Analytics Data"
                  size="small"
                  clicked={currentPage === "/success/analytics-data"}
                />
                <Leaf
                  to="/features/reports/"
                  title="Program Reports"
                  size="small"
                  clicked={currentPage === "/features/reports/"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <LeavesUl>
                <Leaf
                  to="/guides/one-time"
                  title="Manual User Actions: Add a Reward, Referral or Event"
                  size="small"
                  clicked={currentPage === "/guides/one-time"}
                />
                <Leaf
                  to="/guides/manage-rewards"
                  title="Managing Existing User Rewards"
                  size="small"
                  clicked={currentPage === "/guides/manage-rewards"}
                />
                <Leaf
                  to="/developer/purchase-object"
                  title="User Purchase & Refund Event"
                  size="small"
                  clicked={currentPage === "/developer/purchase-object"}
                />
                <Leaf
                  to="/features/participant-deletion"
                  title="Participant Deletion"
                  size="small"
                  clicked={currentPage === "/features/participant-deletion"}
                />
                <Leaf
                  to="/topics/attribution"
                  title="Attribution"
                  size="small"
                  clicked={currentPage === "/topics/attribution"}
                />
                <Leaf
                  to="/topics/identification"
                  title="Identification"
                  size="small"
                  clicked={currentPage === "/topics/identification"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <LeavesUl>
                <Leaf
                  to="/guides/user-import"
                  title="Bulk User Import"
                  size="small"
                  clicked={currentPage === "/guides/user-import"}
                />
                <Leaf
                  to="/guides/bulk-reward-redemption"
                  title="Bulk Reward Redemption Import"
                  size="small"
                  clicked={currentPage === "/guides/bulk-reward-redemption"}
                />
                <Leaf
                  to="/guides/bulk-user-delete"
                  title="Bulk User Delete Import"
                  size="small"
                  clicked={currentPage === "/guides/bulk-user-delete"}
                />
                <Leaf
                  to="/guides/event-import"
                  title="Bulk Event Import"
                  size="small"
                  clicked={currentPage === "/guides/event-import"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/managing-w-9-compliance-for-participants"
              title="Managing W-9 Compliance"
              size="big"
              clicked={
                currentPage ===
                "/features/managing-w-9-compliance-for-participants"
              }
            />
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
            clicked={currentPage === "/integrations/"}
          >
            <DropDownMenuItem title="Salesforce">
              <LeavesUl>
                <Leaf
                  to="/salesforce/"
                  title="Salesforce Integration"
                  size="small"
                  clicked={currentPage === "/salesforce/"}
                />
                <Leaf
                  to="/salesforce/user-guide"
                  title="User Guide"
                  size="small"
                  clicked={currentPage === "/salesforce/user-guide"}
                />
                <Leaf
                  to="/salesforce/faq"
                  title="FAQ"
                  size="small"
                  clicked={currentPage === "/salesforce/faq"}
                />
                <Leaf
                  to="/salesforce/install-guide"
                  title="Install Guide"
                  size="small"
                  clicked={currentPage === "/salesforce/install-guide"}
                />
                <Leaf
                  to="/salesforce/immediate-object-upsertion"
                  title="Immediate Object Upsertion"
                  size="small"
                  clicked={
                    currentPage === "/salesforce/immediate-object-upsertion"
                  }
                />
                <Leaf
                  to="/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                  title="Using a Salesforce APEX Trigger to upsert a Lead"
                  size="small"
                  clicked={
                    currentPage ===
                    "/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                  }
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <LeavesUl>
                <Leaf
                  to="/appsflyer-software-integration/"
                  title="AppsFlyer Integration"
                  size="small"
                  clicked={currentPage === "/appsflyer-software-integration/"}
                />
                <Leaf
                  to="/mobile/appsflyer"
                  title="Quickstart"
                  size="small"
                  clicked={currentPage === "/mobile/appsflyer"}
                />
                <Leaf
                  to="/mobile/appsflyer/reference"
                  title="Tech Reference"
                  size="small"
                  clicked={currentPage === "/mobile/appsflyer/reference"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <LeavesUl>
                <Leaf
                  to="/sftp/"
                  title="SFTP Integration"
                  size="small"
                  clicked={currentPage === "/sftp/"}
                />
                <Leaf
                  to="/integrations/sftp"
                  title="Configuration Guide"
                  size="small"
                  clicked={currentPage === "/integrations/sftp"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <LeavesUl>
                <Leaf
                  to="/branch-metrics/"
                  title="Branch Metrics Integration"
                  size="small"
                  clicked={currentPage === "/branch-metrics/"}
                />
                <Leaf
                  to="/mobile/branch-metrics"
                  title="Quickstart"
                  size="small"
                  clicked={currentPage === "/mobile/branch-metrics"}
                />
                <Leaf
                  to="/mobile/branch-metrics/reference"
                  title="Reference"
                  size="small"
                  clicked={currentPage === "/mobile/branch-metrics/reference"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <LeavesUl>
                <Leaf
                  to="/developer/segment"
                  title="Segment Integration"
                  size="small"
                  clicked={currentPage === "/developer/segment"}
                />

                <Leaf
                  to="/integrations/segment-v2/"
                  title="Segment V2"
                  size="small"
                  clicked={currentPage === "/integrations/segment-v2/"}
                />

                <Leaf
                  to="/integrations/segment-v2/subscription"
                  title="Subscription"
                  size="small"
                  clicked={
                    currentPage === "/integrations/segment-v2/subscription"
                  }
                />

                <Leaf
                  to="/integrations/segment-v2/stream"
                  title="Stream"
                  size="small"
                  clicked={currentPage === "/integrations/segment-v2/stream"}
                />

                <Leaf
                  to="/developer/segment/quickstart"
                  title="Segment Web Plugin Quickstart"
                  size="small"
                  clicked={currentPage === "/developer/segment/quickstart"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <LeavesUl>
                <Leaf
                  to="/stripe"
                  title="Stripe Integration"
                  size="small"
                  clicked={currentPage === "/stripe"}
                />
                <Leaf
                  to="/developer/stripe"
                  title="Install Guide"
                  size="small"
                  clicked={currentPage === "/developer/stripe"}
                />
                <Leaf
                  to="/developer/stripe-v2-install-guide"
                  title="V2 Stripe Integration Install Guide"
                  size="small"
                  clicked={currentPage === "/developer/stripe-v2-install-guide"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <LeavesUl>
                <Leaf
                  to="/tangocard"
                  title="TangoCard Integration"
                  size="small"
                  clicked={currentPage === "/tangocard"}
                />
                <Leaf
                  to="/tangocard-connection"
                  title="Setup Guide"
                  size="small"
                  clicked={currentPage === "/tangocard-connection"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <LeavesUl>
                <Leaf
                  to="/zapier"
                  title="Zapier Integration"
                  size="small"
                  clicked={currentPage === "/zapier"}
                />
                <Leaf
                  to="/integrations/zapier"
                  title="Quickstart Guide"
                  size="small"
                  clicked={currentPage === "/integrations/zapier"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <LeavesUl>
                <Leaf
                  to="/recurly"
                  title="Recurly Integration"
                  size="small"
                  clicked={currentPage === "/recurly"}
                />
                <Leaf
                  to="/developer/recurly/classic"
                  title="Classic Recurly Install Guide"
                  size="small"
                  clicked={currentPage === "/developer/recurly/classic"}
                />
                <Leaf
                  to="/developer/recurly"
                  title="Install Guide"
                  size="small"
                  clicked={currentPage === "/developer/recurly"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <LeavesUl>
                <Leaf
                  to="/stitch"
                  title="Stitch Integration"
                  size="small"
                  clicked={currentPage === "/stitch"}
                />
                <Leaf
                  to="/developer/stitch/quickstart"
                  title="Integration Guide"
                  size="small"
                  clicked={currentPage === "/developer/stitch/quickstart"}
                />
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Developer Resources starts here */}
          <CoreCategory
            to="/developer/"
            title="Developer Resources"
            icon={devIcon}
            clicked={currentPage === "/developer/"}
          >
            <DropDownMenuItem title="Dev Guides">
              <LeavesUl>
                <Leaf
                  to="/topics/email"
                  title="SaaSquatch & Emails"
                  size="small"
                  clicked={currentPage === "/topics/email"}
                />
                <Leaf
                  to="/customshortdomainguide"
                  title="Custom Short Domains"
                  size="small"
                  clicked={currentPage === "/customshortdomainguide"}
                />
                <Leaf
                  to="/developer/referral-security"
                  title="Referral Security"
                  size="small"
                  clicked={currentPage === "/developer/referral-security"}
                />
                <Leaf
                  to="/shared-vs-solo-accounts"
                  title="Account Structure"
                  size="small"
                  clicked={currentPage === "/shared-vs-solo-accounts"}
                />
                <Leaf
                  to="/guides/marketo-form"
                  title="Marketo"
                  size="small"
                  clicked={currentPage === "/guides/marketo-form"}
                />
                <Leaf
                  to="/guides/instapage-form"
                  title="Instapage"
                  size="small"
                  clicked={currentPage === "/guides/instapage-form"}
                />
                <Leaf
                  to="/features/custom-user-fields/"
                  title="Custom User Fields"
                  size="small"
                  clicked={currentPage === "/features/custom-user-fields/"}
                />
                <Leaf
                  to="/topics/widget-types"
                  title="User Widget Types"
                  size="small"
                  clicked={currentPage === "/topics/widget-types"}
                />
                <Leaf
                  to="/features/message-links"
                  title="Message Links"
                  size="small"
                  clicked={currentPage === "/features/message-links"}
                />
                <Leaf
                  to="/developer/conversion"
                  title="Conversion Tech Guide"
                  size="small"
                  clicked={currentPage === "/developer/conversion"}
                />
                <Leaf
                  to="/developer/attribution"
                  title="Attribution Tech Guide"
                  size="small"
                  clicked={currentPage === "/developer/attribution"}
                />
                <Leaf
                  to="/breaking-changes"
                  title="Breaking Changes"
                  size="small"
                  clicked={currentPage === "/breaking-changes"}
                />
                <Leaf
                  to="/bestpractices/common-pitfalls"
                  title="Common Pitfalls"
                  size="small"
                  clicked={currentPage === "/bestpractices/common-pitfalls"}
                />
                <Leaf
                  to="/developer/widgets/writing-a-web-component-for-saasquatch"
                  title="Writing a Web Component for SaaSquatch"
                  size="small"
                  clicked={
                    currentPage ===
                    "/developer/widgets/writing-a-web-component-for-saasquatch"
                  }
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <LeavesUl>
                <Leaf
                  to="/developer/squatchjs"
                  title="About"
                  size="small"
                  clicked={currentPage === "/developer/squatchjs"}
                />
                <Leaf
                  to="/squatchjs/signed-requests"
                  title="Signed Requests"
                  size="small"
                  clicked={currentPage === "/squatchjs/signed-requests"}
                />
                <Leaf
                  to="/developer/squatchjs/issue"
                  title="Issue Code List (list of 53 issue links)"
                  size="small"
                  clicked={currentPage === "/developer/squatchjs/issue"}
                />
                <Separator text="Version 2" />
                <Leaf
                  to="/developer/squatchjs/v2"
                  title="Quickstart"
                  size="small"
                  clicked={currentPage === "/developer/squatchjs/v2"}
                />
                <Leaf
                  to="/developer/squatchjs/v2/advanced-use-cases"
                  title="Advanced Use Cases"
                  size="small"
                  clicked={
                    currentPage === "/developer/squatchjs/v2/advanced-use-cases"
                  }
                />
                <Leaf
                  to="/developer/squatchjs/v2/reference"
                  title="Reference"
                  size="small"
                  clicked={currentPage === "/developer/squatchjs/v2/reference"}
                />
                <Leaf
                  to="/developer/squatchjs/cookies"
                  title="Tracking Cookies"
                  size="small"
                  clicked={currentPage === "/developer/squatchjs/cookies"}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="API">
              <LeavesUl>
                <DropDownMenuItem title="GraphQL API" isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/graphql/reference"
                      title="GraphQL Reference"
                      size="small"
                      clicked={currentPage === "/graphql/reference"}
                    />
                    <Leaf
                      to="/graphql/custom-widget"
                      title="Custom Widget via GraphQL"
                      size="small"
                      clicked={currentPage === "/graphql/custom-widget"}
                    />
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API " isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/api"
                      title="API Overview"
                      size="small"
                      clicked={currentPage === "/api"}
                    />
                    <Leaf
                      to="/api/authentication"
                      title="Authentication"
                      size="small"
                      clicked={currentPage === "/api/authentication"}
                    />
                    <Leaf
                      to="/api/openendpoints"
                      title="API Open Endpoints"
                      size="small"
                      clicked={currentPage === "/api/openendpoints"}
                    />
                    <Leaf
                      to="/api/errors"
                      title="Errors"
                      size="small"
                      clicked={currentPage === "/api/errors"}
                    />
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API Reference" isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/api/methods"
                      title="Full list of Methods"
                      size="small"
                      clicked={currentPage === "/api/methods"}
                    />

                    <DropDownMenuItem
                      title="Account (Account Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <Leaf
                          to="#"
                          title="Delete an account"
                          size="small"
                          clicked={currentPage === "#"}
                        />
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="User (User Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <Leaf
                          to="#"
                          title="All methods"
                          size="small"
                          clicked={currentPage === "#"}
                        />
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="User Event (User Event Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <Leaf
                          to="#"
                          title="All methods"
                          size="small"
                          clicked={currentPage === "#"}
                        />
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Share Links (Share Links Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <Leaf
                          to="#"
                          title="All methods"
                          size="small"
                          clicked={currentPage === "#"}
                        />
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Referral Code (Referral Code Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <APILeaf
                          to="/api/methods#get_code"
                          title="Lookup a referral code"
                          clicked={currentPage === "/api/methods#get_code"}
                        >
                          <GreenButton>Get</GreenButton>
                        </APILeaf>
                        <APILeaf
                          to="/api/methods#open_validate_code"
                          title="Lookup a referral code"
                          clicked={
                            currentPage === "/api/methods#open_validate_code"
                          }
                        >
                          <GreenButton>Get</GreenButton>
                          <GreyButton>Open Endpoint</GreyButton>
                        </APILeaf>
                        <APILeaf
                          to="/api/methods#open_apply_code"
                          title="Apply a referral code"
                          clicked={
                            currentPage === "/api/methods#open_apply_code"
                          }
                        >
                          <OrangeButton>Post</OrangeButton>
                          <GreyButton>Open Endpoint</GreyButton>
                        </APILeaf>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Referral (Referral Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Reward Balance (RB Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Reward (Reward Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Export (Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <SmallLeafLink to="#">Hidden Endpoints</SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Webhook">
              <LeavesUl>
                <Leaf
                  to="/api/webhooks"
                  title="Overview"
                  size="small"
                  clicked={currentPage === "/api/webhooks"}
                />
                <Leaf
                  to="/api/webhooks/security"
                  title="Webhook Security"
                  size="small"
                  clicked={currentPage === "/api/webhooks/security"}
                />
                <SmallLeafLink to="#">All methods</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/topics/json-web-tokens"
              title="JSON Web Tokens"
              size="big"
              clicked={currentPage === "/topics/json-web-tokens"}
            />
            <Leaf
              to="/developer/testing"
              title="Testing Best Practices"
              size="big"
              clicked={currentPage === "/developer/testing"}
            />

            <DropDownMenuItem title="Mobile">
              <LeavesUl>
                <Leaf
                  to="/mobile"
                  title="Overview"
                  size="small"
                  clicked={currentPage === "/mobile"}
                />
                <Leaf
                  to="/mobile/android"
                  title="Android"
                  size="small"
                  clicked={currentPage === "/mobile/android"}
                />
                <Leaf
                  to="/mobile/ios"
                  title="iOS"
                  size="small"
                  clicked={currentPage === "/mobile/ios"}
                />
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>
        </ul>
      </nav>
    </Styles.Container>
  );
}

const CoreCategory = (props: {
  children?: React.ReactNode;
  to: string;
  title: string;
  icon: SVGProps;
  clicked?: boolean;
  clickedArticle?: boolean;
}) => {
  return (
    <CoreCategoryView
      {...useCoreCategoryHook()}
      to={props.to}
      title={props.title}
      icon={props.icon}
      clicked={props.clicked}
      clickedArticle={props.clickedArticle}
    >
      {props.children}
    </CoreCategoryView>
  );
};

const DropDownMenuItem = (props: {
  title: string;
  children?: React.ReactNode;
  to?: string;
  isNestedDropDown?: boolean;
}) => {
  return (
    <MenuItemView
      {...useMenuItemHook()}
      title={props.title}
      isNestedDropDown={props.isNestedDropDown}
    >
      {props.children}
    </MenuItemView>
  );
};

/* Line won't show up; div doesn't work */
const Separator = (props: { text: string }) => {
  return (
    <li>
      <SeparatorDiv>
        <SeparatorSpan>{props.text}</SeparatorSpan>
        <SeparatorLine />
      </SeparatorDiv>
    </li>
  );
};

const Leaf = (props: {
  to: string;
  title: string;
  size: string;
  clicked?: boolean;
}) => {
  if (props.size == "small")
    return (
      <SmallLeafLink to={props.to} clicked={props.clicked}>
        {props.title}
      </SmallLeafLink>
    );
  return (
    <BigLeafLink to={props.to} clicked={props.clicked}>
      {props.title}
    </BigLeafLink>
  );
};

const APILeaf = (props: {
  to: string;
  title: string;
  children?: React.ReactNode;
  clicked?: boolean;
}) => {
  return (
    <li>
      <SmallLeafLink to={props.to} clicked={props.clicked}>
        <APIDiv>
          {props.title}
          <ButtonsContainerDiv>{props.children}</ButtonsContainerDiv>
        </APIDiv>
      </SmallLeafLink>
    </li>
  );
};
