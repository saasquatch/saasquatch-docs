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

const SeparatorLi = styled.li`
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
            to="#"
            title="Learning SaaSquatch"
            icon={learningIcon}
            clicked={currentPage === "#"}
          >
            <DropDownMenuItem title="SaaSquatch Admin Portal">
              <ArticleLeaf
                to="/success/using-referral-saasquatch"
                title="Using the SaaSquatch Portal"
                size="small"
                clicked={currentPage === "/success/using-referral-saasquatch"}
              />
              <ArticleLeaf
                to="/success/navigating-the-portal"
                title="Navigating the SaaSquatch Portal"
                size="small"
                clicked={currentPage === "/success/navigating-the-portal"}
              />
              <ArticleLeaf
                to="/success/referral-feed"
                title="The Referral Feed"
                size="small"
                clicked={currentPage === "/success/referral-feed"}
              />
              <ArticleLeaf
                to="/features/analytics"
                title="Program Analytics"
                size="small"
                clicked={currentPage === "/features/analytics"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <ArticleLeaf
                to="/growth/ga-101"
                title="Growth Automation 101"
                size="small"
                clicked={currentPage === "/growth/ga-101"}
              />
              <ArticleLeaf
                to="/growth/customer-lifecycle"
                title="Growth Automation Customer Lifecycle"
                size="small"
                clicked={currentPage === "/growth/customer-lifecycle"}
              />

              <ArticleLeaf
                to="/growth/saasquatch-ga"
                title="SaaSquatch Growth Automation Platform"
                size="small"
                clicked={currentPage === "/growth/saasquatch-ga"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <ArticleLeaf
                to="/success/intro"
                title="Referral Programs 101"
                size="small"
                clicked={currentPage === "/success/intro"}
              />
              <ArticleLeaf
                to="/referral-program-optimization"
                title="Referral Program Optimization"
                size="small"
                clicked={currentPage === "/referral-program-optimization"}
              />
              <ArticleLeaf
                to="/success/core-topics"
                title="The SaaSquatch Referral Program Loop"
                size="small"
                clicked={currentPage === "/success/core-topics"}
              />
              <ArticleLeaf
                to="/success/touchpoints"
                title="Referral Marketing Channels"
                size="small"
                clicked={currentPage === "/success/touchpoints"}
              />
              <ArticleLeaf
                to="/success/referral-program-retargeting"
                title="Referral Program Retargeting"
                size="small"
                clicked={
                  currentPage === "/success/referral-program-retargeting"
                }
              />
              <ArticleLeaf
                to="/success/share-options"
                title="Referral Program Sharing Options"
                size="small"
                clicked={currentPage === "/success/share-options"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <ArticleLeaf
                to="/success/referral-security"
                title="Security Management System"
                size="small"
                clicked={currentPage === "/success/referral-security"}
              />
              <ArticleLeaf
                to="/fraud-and-security"
                title="Fraud, Security & Fake Referrals"
                size="small"
                clicked={currentPage === "/fraud-and-security"}
              />
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
              <SmallLeafLink
                to="/growth/quickstart"
                title="Growth Automation Program General Quickstart"
                size="small"
                clicked={currentPage === "/growth/quickstart"}
              />
              <DropDownMenuItem title="Program Library" isNestedDropDown>
                <ArticleLeaf
                  to="/program/birthday-program"
                  title="Birthday & Anniversary"
                  size="small"
                  clicked={currentPage === "/program/birthday-program"}
                />
                <ArticleLeaf
                  to="/program/referral-program-with-objectives-prod"
                  title="Referral Program With Objectives"
                  size="small"
                  clicked={
                    currentPage ===
                    "/program/referral-program-with-objectives-prod"
                  }
                />
                <ArticleLeaf
                  to="/program/partner-program"
                  title="Partner"
                  size="small"
                  clicked={currentPage === "/program/partner-program"}
                />
                <ArticleLeaf
                  to="/program/win-back-program"
                  title="Win Back"
                  size="small"
                  clicked={currentPage === "/program/win-back-program"}
                />
                <ArticleLeaf
                  to="/program/vip-program"
                  title="VIP"
                  size="small"
                  clicked={currentPage === "/program/vip-program"}
                />
                <ArticleLeaf
                  to="/program/signup-reward"
                  title="Signup"
                  size="small"
                  clicked={currentPage === "/program/signup-reward"}
                />
                <ArticleLeaf
                  to="/program/regional-signup"
                  title="Regional Signup"
                  size="small"
                  clicked={currentPage === "/program/regional-signup"}
                />
                <ArticleLeaf
                  to="/program/profile-completion-reward"
                  title="Profile Completion"
                  size="small"
                  clicked={currentPage === "/program/profile-completion-reward"}
                />
                <ArticleLeaf
                  to="/program/points-program"
                  title="Points Rewards"
                  size="small"
                  clicked={currentPage === "/program/points-program"}
                />
              </DropDownMenuItem>
              <ArticleLeaf
                to="/growth/ga-mechanisms"
                title="Growth Automation Program Mechanisms"
                size="small"
                clicked={currentPage === "/growth/ga-mechanisms"}
              />

              <ArticleLeaf
                to="/guides/referral-quickstart"
                title="Growth Automational Referral Program - Quickstart"
                size="small"
                clicked={currentPage === "/guides/referral-quickstart"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <ArticleLeaf
                to="/designer/widget-editor"
                title="Customizing Program Widgets"
                size="small"
                clicked={currentPage === "/designer/widget-editor"}
              />
              <ArticleLeaf
                to="/themes/custom"
                title="Custom Program Themes"
                size="small"
                clicked={currentPage === "/themes/custom"}
              />
              <ArticleLeaf
                to="/mobile/widget"
                title="Mobile Widget"
                size="small"
                clicked={currentPage === "/mobile/widget"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <ArticleLeaf
                to="/feature/rewards"
                title="Program Reward Options"
                size="small"
                clicked={currentPage === "/feature/rewards"}
              />
              <ArticleLeaf
                to="/success/gift-card-rewards"
                title="Gift Card Rewards"
                size="small"
                clicked={currentPage === "/success/gift-card-rewards"}
              />
              <ArticleLeaf
                to="/features/rewards-fuel-tank"
                title="Fuel Tank Rewards"
                size="small"
                clicked={currentPage === "/features/rewards-fuel-tank"}
              />
              <ArticleLeaf
                to="/features/reward-exchange"
                title="Reward Exchange"
                size="small"
                clicked={currentPage === "/features/reward-exchange"}
              />
              <ArticleLeaf
                to="/topics/conversion"
                title="Conversion"
                size="small"
                clicked={currentPage === "/topics/conversion"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Emails">
              <ArticleLeaf
                to="/designer/email-editor"
                title="Designing Your Program Emails"
                size="small"
                clicked={currentPage === "/designer/email-editor"}
              />
              <ArticleLeaf
                to="/designer/short-tags"
                title="Email Template Short Tags"
                size="small"
                clicked={currentPage === "/designer/short-tags"}
              />
              <ArticleLeaf
                to="/developer/blocked-email-domains"
                title="Blocked Email Domains"
                size="small"
                clicked={currentPage === "/developer/blocked-email-domains"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <ArticleLeaf
                to="/features/w-9-compliance"
                title="W-9 Compliance"
                size="small"
                clicked={currentPage === "/features/w-9-compliance"}
              />
              <ArticleLeaf
                to="/features/configuring-your-reward-catalog-for-w-9"
                title="Configuring Your Rewards for W-9"
                size="small"
                clicked={
                  currentPage ===
                  "/features/configuring-your-reward-catalog-for-w-9"
                }
              />
            </DropDownMenuItem>

            <ArticleLeaf
              to="/features/user-segmentation"
              title="User Segmentation"
              size="big"
              clicked={currentPage === "/features/user-segmentation"}
            />

            <ArticleLeaf
              to="/features/program-i18n"
              title="Program Internationalization"
              size="big"
              clicked={currentPage === "/features/program-i18n"}
            />
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="/success/"
            title="Running Programs"
            icon={runningProgramsIcon}
            clicked={currentPage === "/success/"}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <ArticleLeaf
                to="/success/ga-analytics"
                title="Analytics Overview for Growth Automation Programs"
                size="small"
                clicked={currentPage === "/success/ga-analytics"}
              />
              <ArticleLeaf
                to="/features/program-and-portal-statistics"
                title="Program and Portal Statistics"
                size="small"
                clicked={
                  currentPage === "/features/program-and-portal-statistics"
                }
              />
              <ArticleLeaf
                to="/success/analytics-data"
                title="Understanding Your Program Analytics Data"
                size="small"
                clicked={currentPage === "/success/analytics-data"}
              />
              <ArticleLeaf
                to="/features/reports/"
                title="Program Reports"
                size="small"
                clicked={currentPage === "/features/reports/"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <ArticleLeaf
                to="/guides/one-time"
                title="Manual User Actions: Add a Reward, Referral or Event"
                size="small"
                clicked={currentPage === "/guides/one-time"}
              />
              <ArticleLeaf
                to="/guides/manage-rewards"
                title="Managing Existing User Rewards"
                size="small"
                clicked={currentPage === "/guides/manage-rewards"}
              />
              <ArticleLeaf
                to="/developer/purchase-object"
                title="User Purchase & Refund Event"
                size="small"
                clicked={currentPage === "/developer/purchase-object"}
              />
              <ArticleLeaf
                to="/features/participant-deletion"
                title="Participant Deletion"
                size="small"
                clicked={currentPage === "/features/participant-deletion"}
              />
              <ArticleLeaf
                to="/topics/attribution"
                title="Attribution"
                size="small"
                clicked={currentPage === "/topics/attribution"}
              />
              <ArticleLeaf
                to="/topics/identification"
                title="Identification"
                size="small"
                clicked={currentPage === "/topics/identification"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <ArticleLeaf
                to="/guides/user-import"
                title="Bulk User Import"
                size="small"
                clicked={currentPage === "/guides/user-import"}
              />
              <ArticleLeaf
                to="/guides/bulk-reward-redemption"
                title="Bulk Reward Redemption Import"
                size="small"
                clicked={currentPage === "/guides/bulk-reward-redemption"}
              />
              <ArticleLeaf
                to="/guides/bulk-user-delete"
                title="Bulk User Delete Import"
                size="small"
                clicked={currentPage === "/guides/bulk-user-delete"}
              />
              <ArticleLeaf
                to="/guides/event-import"
                title="Bulk Event Import"
                size="small"
                clicked={currentPage === "/guides/event-import"}
              />
            </DropDownMenuItem>

            <ArticleLeaf
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
              <ArticleLeaf
                to="/salesforce/"
                title="Salesforce Integration"
                size="small"
                clicked={currentPage === "/salesforce/"}
              />
              <ArticleLeaf
                to="/salesforce/user-guide"
                title="User Guide"
                size="small"
                clicked={currentPage === "/salesforce/user-guide"}
              />
              <ArticleLeaf
                to="/salesforce/faq"
                title="FAQ"
                size="small"
                clicked={currentPage === "/salesforce/faq"}
              />
              <ArticleLeaf
                to="/salesforce/install-guide"
                title="Install Guide"
                size="small"
                clicked={currentPage === "/salesforce/install-guide"}
              />
              <ArticleLeaf
                to="/salesforce/immediate-object-upsertion"
                title="Immediate Object Upsertion"
                size="small"
                clicked={
                  currentPage === "/salesforce/immediate-object-upsertion"
                }
              />
              <ArticleLeaf
                to="/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                title="Using a Salesforce APEX Trigger to upsert a Lead"
                size="small"
                clicked={
                  currentPage ===
                  "/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                }
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <ArticleLeaf
                to="/appsflyer-software-integration/"
                title="AppsFlyer Integration"
                size="small"
                clicked={currentPage === "/appsflyer-software-integration/"}
              />
              <ArticleLeaf
                to="/mobile/appsflyer"
                title="Quickstart"
                size="small"
                clicked={currentPage === "/mobile/appsflyer"}
              />
              <ArticleLeaf
                to="/mobile/appsflyer/reference"
                title="Tech Reference"
                size="small"
                clicked={currentPage === "/mobile/appsflyer/reference"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <ArticleLeaf
                to="/sftp/"
                title="SFTP Integration"
                size="small"
                clicked={currentPage === "/sftp/"}
              />
              <ArticleLeaf
                to="/integrations/sftp"
                title="Configuration Guide"
                size="small"
                clicked={currentPage === "/integrations/sftp"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <ArticleLeaf
                to="/branch-metrics/"
                title="Branch Metrics Integration"
                size="small"
                clicked={currentPage === "/branch-metrics/"}
              />
              <ArticleLeaf
                to="/mobile/branch-metrics"
                title="Quickstart"
                size="small"
                clicked={currentPage === "/mobile/branch-metrics"}
              />
              <ArticleLeaf
                to="/mobile/branch-metrics/reference"
                title="Reference"
                size="small"
                clicked={currentPage === "/mobile/branch-metrics/reference"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <ArticleLeaf
                to="/segment/"
                title="Segment Integration"
                size="small"
                clicked={currentPage === "/segment/"}
              />

              <ArticleLeaf
                to="/integrations/segment-v2/"
                title="Segment V2"
                size="small"
                clicked={currentPage === "/integrations/segment-v2/"}
              />

              <ArticleLeaf
                to="/integrations/segment-v2/subscription"
                title="Subscription"
                size="small"
                clicked={
                  currentPage === "/integrations/segment-v2/subscription"
                }
              />

              <ArticleLeaf
                to="/integrations/segment-v2/stream"
                title="Stream"
                size="small"
                clicked={currentPage === "/integrations/segment-v2/stream"}
              />

              <ArticleLeaf
                to="/developer/segment"
                title="Segment Integration Reference"
                size="small"
                clicked={currentPage === "/developer/segment"}
              />

              <ArticleLeaf
                to="/developer/segment/quickstart"
                title="Segment Web Plugin Quickstart"
                size="small"
                clicked={currentPage === "/developer/segment/quickstart"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <ArticleLeaf
                to="/stripe"
                title="Stripe Integration"
                size="small"
                clicked={currentPage === "/stripe"}
              />
              <ArticleLeaf
                to="/developer/stripe"
                title="Install Guide"
                size="small"
                clicked={currentPage === "/developer/stripe"}
              />
              <ArticleLeaf
                to="/developer/stripe-v2-install-guide"
                title="V2 Stripe Integration Install Guide"
                size="small"
                clicked={currentPage === "/developer/stripe-v2-install-guide"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <ArticleLeaf
                to="/tangocard"
                title="TangoCard Integration"
                size="small"
                clicked={currentPage === "/tangocard"}
              />
              <ArticleLeaf
                to="/tangocard-connection"
                title="Setup Guide"
                size="small"
                clicked={currentPage === "/tangocard-connection"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <ArticleLeaf
                to="/zapier"
                title="Zapier Integration"
                size="small"
                clicked={currentPage === "/zapier"}
              />
              <ArticleLeaf
                to="/integrations/zapier"
                title="Quickstart Guide"
                size="small"
                clicked={currentPage === "/integrations/zapier"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <ArticleLeaf
                to="/recurly"
                title="Recurly Integration"
                size="small"
                clicked={currentPage === "/recurly"}
              />
              <ArticleLeaf
                to="/developer/recurly/classic"
                title="Classic Recurly Install Guide"
                size="small"
                clicked={currentPage === "/developer/recurly/classic"}
              />
              <ArticleLeaf
                to="/developer/recurly"
                title="Install Guide"
                size="small"
                clicked={currentPage === "/developer/recurly"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <ArticleLeaf
                to="/stitch"
                title="Stitch Integration"
                size="small"
                clicked={currentPage === "/stitch"}
              />
              <ArticleLeaf
                to="/developer/stitch/quickstart"
                title="Integration Guide"
                size="small"
                clicked={currentPage === "/developer/stitch/quickstart"}
              />
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
              <ArticleLeaf
                to="/topics/email"
                title="SaaSquatch & Emails"
                size="small"
                clicked={currentPage === "/topics/email"}
              />
              <ArticleLeaf
                to="/customshortdomainguide"
                title="Custom Short Domains"
                size="small"
                clicked={currentPage === "/customshortdomainguide"}
              />
              <ArticleLeaf
                to="/developer/referral-security"
                title="Referral Security"
                size="small"
                clicked={currentPage === "/developer/referral-security"}
              />
              <ArticleLeaf
                to="/shared-vs-solo-accounts"
                title="Account Structure"
                size="small"
                clicked={currentPage === "/shared-vs-solo-accounts"}
              />
              <ArticleLeaf
                to="/guides/marketo-form"
                title="Marketo"
                size="small"
                clicked={currentPage === "/guides/marketo-form"}
              />
              <ArticleLeaf
                to="/guides/instapage-form"
                title="Instapage"
                size="small"
                clicked={currentPage === "/guides/instapage-form"}
              />
              <ArticleLeaf
                to="/features/custom-user-fields/"
                title="Custom User Fields"
                size="small"
                clicked={currentPage === "/features/custom-user-fields/"}
              />
              <ArticleLeaf
                to="/topics/widget-types"
                title="User Widget Types"
                size="small"
                clicked={currentPage === "/topics/widget-types"}
              />
              <ArticleLeaf
                to="/features/message-links"
                title="Message Links"
                size="small"
                clicked={currentPage === "/features/message-links"}
              />
              <ArticleLeaf
                to="/developer/conversion"
                title="Conversion Tech Guide"
                size="small"
                clicked={currentPage === "/developer/conversion"}
              />
              <ArticleLeaf
                to="/developer/attribution"
                title="Attribution Tech Guide"
                size="small"
                clicked={currentPage === "/developer/attribution"}
              />
              <ArticleLeaf
                to="/breaking-changes"
                title="Breaking Changes"
                size="small"
                clicked={currentPage === "/breaking-changes"}
              />
              <ArticleLeaf
                to="/bestpractices/common-pitfalls"
                title="Common Pitfalls"
                size="small"
                clicked={currentPage === "/bestpractices/common-pitfalls"}
              />
              <ArticleLeaf
                to="/developer/widgets/writing-a-web-component-for-saasquatch"
                title="Writing a Web Component for SaaSquatch"
                size="small"
                clicked={
                  currentPage ===
                  "/developer/widgets/writing-a-web-component-for-saasquatch"
                }
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <ArticleLeaf
                to="/developer/squatchjs"
                title="About"
                size="small"
                clicked={currentPage === "/developer/squatchjs"}
              />
              <ArticleLeaf
                to="/squatchjs/signed-requests"
                title="Signed Requests"
                size="small"
                clicked={currentPage === "/squatchjs/signed-requests"}
              />
              <ArticleLeaf
                to="/developer/squatchjs/issue"
                title="Issue Code List (list of 53 issue links)"
                size="small"
                clicked={currentPage === "/developer/squatchjs/issue"}
              />
              <Separator text="Version 2" />
              <ArticleLeaf
                to="/developer/squatchjs/v2"
                title="Quickstart"
                size="small"
                clicked={currentPage === "/developer/squatchjs/v2"}
              />
              <ArticleLeaf
                to="/developer/squatchjs/v2/advanced-use-cases"
                title="Advanced Use Cases"
                size="small"
                clicked={
                  currentPage === "/developer/squatchjs/v2/advanced-use-cases"
                }
              />
              <ArticleLeaf
                to="/developer/squatchjs/v2/reference"
                title="Reference"
                size="small"
                clicked={currentPage === "/developer/squatchjs/v2/reference"}
              />
              <ArticleLeaf
                to="/developer/squatchjs/cookies"
                title="Tracking Cookies"
                size="small"
                clicked={currentPage === "/developer/squatchjs/cookies"}
              />
            </DropDownMenuItem>

            <DropDownMenuItem title="API">
              <Separator text="GraphQL API" />
              <ArticleLeaf
                to="/graphql/reference"
                title="GraphQL Reference"
                size="small"
                clicked={currentPage === "/graphql/reference"}
              />
              <ArticleLeaf
                to="/graphql/custom-widget"
                title="Custom Widget via GraphQL"
                size="small"
                clicked={currentPage === "/graphql/custom-widget"}
              />

              <Separator text="REST API" />
              <ArticleLeaf
                to="/api"
                title="API Overview"
                size="small"
                clicked={currentPage === "/api"}
              />
              <ArticleLeaf
                to="/api/authentication"
                title="Authentication"
                size="small"
                clicked={currentPage === "/api/authentication"}
              />
              <ArticleLeaf
                to="/api/openendpoints"
                title="API Open Endpoints"
                size="small"
                clicked={currentPage === "/api/openendpoints"}
              />
              <ArticleLeaf
                to="/api/errors"
                title="Errors"
                size="small"
                clicked={currentPage === "/api/errors"}
              />

              <Separator text="REST API Reference" />

              <ArticleLeaf
                to="/api/methods"
                title="Full list of Methods"
                size="small"
                clicked={currentPage === "/api/methods"}
              />

              <DropDownMenuItem title="Account" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Account"
                  title="Account Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Account"}
                />
                <MethodLeaf
                  to="/api/methods#open_delete_account"
                  title="Delete an account"
                  clicked={currentPage === "/api/methods#open_delete_account"}
                >
                  <GreyButton>DELETE</GreyButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="User" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#User"
                  title="User Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#User"}
                />
                <MethodLeaf
                  to="/api/methods#get_user_pii"
                  title="Lookup a user PII"
                  clicked={currentPage === "/api/methods#get_user_pii"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#block_user"
                  title="Block user"
                  clicked={currentPage === "/api/methods#block_user"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#unblock_user"
                  title="Unblock user"
                  clicked={currentPage === "/api/methods#unblock_user"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#list_users"
                  title="List users"
                  clicked={currentPage === "/api/methods#list_users"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_user_upsert"
                  title="User Upsert"
                  clicked={currentPage === "/api/methods#open_user_upsert"}
                >
                  <OrangeButton>put</OrangeButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_create_user"
                  title="Create a user and account"
                  clicked={currentPage === "/api/methods#open_create_user"}
                >
                  <OrangeButton>post</OrangeButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_get_user"
                  title="Lookup a user"
                  clicked={currentPage === "/api/methods#open_get_user"}
                >
                  <GreenButton>get</GreenButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_delete_user"
                  title="Delete a user"
                  clicked={currentPage === "/api/methods#open_delete_user"}
                >
                  <GreyButton>DELETE</GreyButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#create_cookie_user"
                  title="Create Cookie User"
                  clicked={currentPage === "/api/methods#create_cookie_user"}
                >
                  <OrangeButton>put</OrangeButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_get_user_by_code"
                  title="Get a user by a referral code"
                  clicked={currentPage === "/api/methods#open_get_user_by_code"}
                >
                  <GreenButton>get</GreenButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="User Event" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#User-Event"
                  title="User Event Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#User-Event"}
                />
                <MethodLeaf
                  to="/api/methods#trackEvent"
                  title="Track User Event"
                  clicked={currentPage === "/api/methods#trackEvent"}
                >
                  <OrangeButton>post</OrangeButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Share Links" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Share-Links"
                  title="Share Links Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Share-Links"}
                />
                <MethodLeaf
                  to="/api/methods#get_shareurls"
                  title="Lookup a user's share URLs"
                  clicked={currentPage === "/api/methods#get_shareurls"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_get_shareurls"
                  title="Lookup a user's share URLs"
                  clicked={currentPage === "/api/methods#open_get_shareurls"}
                >
                  <GreenButton>get</GreenButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Referral Code" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Referral-Code"
                  title="Referral Code Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Referral-Code"}
                />
                <MethodLeaf
                  to="/api/methods#get_code"
                  title="Lookup a referral code"
                  clicked={currentPage === "/api/methods#get_code"}
                >
                  <GreenButton>Get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_validate_code"
                  title="Lookup a referral code"
                  clicked={currentPage === "/api/methods#open_validate_code"}
                >
                  <GreenButton>Get</GreenButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_apply_code"
                  title="Apply a referral code"
                  clicked={currentPage === "/api/methods#open_apply_code"}
                >
                  <OrangeButton>Post</OrangeButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Referral" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Referral"
                  title="Referral Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Referral"}
                />
                <MethodLeaf
                  to="/api/methods#list_referrals"
                  title="List referrals"
                  clicked={currentPage === "/api/methods#list_referrals"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#get_referral"
                  title="Lookup a Referral"
                  clicked={currentPage === "/api/methods#get_referral"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#open_list_referrals"
                  title="List referrals"
                  clicked={currentPage === "/api/methods#open_list_referrals"}
                >
                  <GreenButton>get</GreenButton>
                  <GreyButton>Open Endpoint</GreyButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Reward Balance" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Reward-Balance"
                  title="Reward Balance Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Reward-Balance"}
                />
                <MethodLeaf
                  to="/api/methods#list_balances"
                  title="List reward balances"
                  clicked={currentPage === "/api/methods#list_balances"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#debit_balance"
                  title="Debit a reward balance"
                  clicked={currentPage === "/api/methods#debit_balance"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Reward" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Reward"
                  title="Reward Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Reward"}
                />
                <MethodLeaf
                  to="/api/methods#list_rewards"
                  title="List an account's rewards"
                  clicked={currentPage === "/api/methods#list_rewards"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#lookup_reward"
                  title="Lookup a single reward"
                  clicked={currentPage === "/api/methods#lookup_reward"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#debit_reward"
                  title="Redeem a single reward"
                  clicked={currentPage === "/api/methods#debit_reward"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#cancel_reward"
                  title="Cancel a single reward"
                  clicked={currentPage === "/api/methods#cancel_reward"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#create_reward"
                  title="Create a single reward"
                  clicked={currentPage === "/api/methods#create_reward"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Export" isNestedDropDown>
                <ArticleLeaf
                  to="/api/methods#Export"
                  title="Export Overview"
                  size="small"
                  clicked={currentPage === "/api/methods#Export"}
                />
                <MethodLeaf
                  to="/api/methods#create_export"
                  title="Create an Export"
                  clicked={currentPage === "/api/methods#create_export"}
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#get_export"
                  title="Lookup an Export"
                  clicked={currentPage === "/api/methods#get_export"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#download_export"
                  title="Download an Export"
                  clicked={currentPage === "/api/methods#download_export"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#list_exports"
                  title="List Exports"
                  clicked={currentPage === "/api/methods#list_exports"}
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <SmallLeafLink to="#">Hidden Endpoints</SmallLeafLink>
            </DropDownMenuItem>

            <DropDownMenuItem title="Webhook">
              <ArticleLeaf
                to="/api/webhooks"
                title="Overview"
                size="small"
                clicked={currentPage === "/api/webhooks"}
              />
              <ArticleLeaf
                to="/api/webhooks/security"
                title="Webhook Security"
                size="small"
                clicked={currentPage === "/api/webhooks/security"}
              />
              <MethodLeaf
                to="/api/methods#create_webhook"
                title="Create a webhook subscription"
                clicked={currentPage === "/api/methods#create_webhook"}
              >
                <OrangeButton>post</OrangeButton>
              </MethodLeaf>
              <MethodLeaf
                to="/api/methods#list_webhooks"
                title="List webhook subscriptions"
                clicked={currentPage === "/api/methods#list_webhooks"}
              >
                <GreenButton>get</GreenButton>
              </MethodLeaf>
              <MethodLeaf
                to="/api/methods#delete_webhook"
                title="Delete a webhook subscription"
                clicked={currentPage === "/api/methods#delete_webhook"}
              >
                <GreyButton>DELETE</GreyButton>
              </MethodLeaf>
              <MethodLeaf
                to="/api/methods#test_webhook"
                title="Test a webhook subscription"
                clicked={currentPage === "/api/methods#test_webhook"}
              >
                <OrangeButton>post</OrangeButton>
              </MethodLeaf>
            </DropDownMenuItem>

            <DropDownMenuItem title="Mobile">
              <ArticleLeaf
                to="/mobile"
                title="Overview"
                size="small"
                clicked={currentPage === "/mobile"}
              />
              <ArticleLeaf
                to="/mobile/android"
                title="Android"
                size="small"
                clicked={currentPage === "/mobile/android"}
              />
              <ArticleLeaf
                to="/mobile/ios"
                title="iOS"
                size="small"
                clicked={currentPage === "/mobile/ios"}
              />
            </DropDownMenuItem>

            <ArticleLeaf
              to="/topics/json-web-tokens"
              title="JSON Web Tokens"
              size="big"
              clicked={currentPage === "/topics/json-web-tokens"}
            />
            <ArticleLeaf
              to="/developer/testing"
              title="Testing Best Practices"
              size="big"
              clicked={currentPage === "/developer/testing"}
            />
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
    // nested li makes line appear, otherwise there is no line :(
    <li>
      <SeparatorLi>
        <SeparatorSpan>{props.text}</SeparatorSpan>
        <SeparatorLine />
      </SeparatorLi>
    </li>
  );
};

const ArticleLeaf = (props: {
  to: string;
  title: string;
  size: string;
  clicked?: boolean;
}) => {
  if (props.size == "small")
    return (
      <li>
        <SmallLeafLink to={props.to} clicked={props.clicked}>
          {props.title}
        </SmallLeafLink>
      </li>
    );
  return (
    <BigLeafLink to={props.to} clicked={props.clicked}>
      {props.title}
    </BigLeafLink>
  );
};

const MethodLeaf = (props: {
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
