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
    props.clicked ? "#003B45" : "white"} !important;
  color: ${(props) => (props.clicked ? "white" : "#003B45")} !important;
  font-size: 16px;
  font-weight: ${(props) =>
    props.dropdownSelected || props.clicked ? "700" : "400"} !important;
  line-height: 24px;
  padding: 8px 12px;
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
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
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height="auto"
        viewBox={viewBox}
        fill={clicked ? "white" : "#003B45"}
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
            currentPage={currentPage}
          />
          {/* Learning SaaSquatch starts here */}
          <CoreCategory
            to="/success/"
            title="Learning SaaSquatch"
            icon={learningIcon}
            currentPage={currentPage}
          >
            <DropDownMenuItem title="SaaSquatch Admin Portal">
              <LeavesUl>
                <Leaf
                  to="/success/using-referral-saasquatch"
                  title="Using the SaaSquatch Portal"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/navigating-the-portal"
                  title="Navigating the SaaSquatch Portal"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/referral-feed"
                  title="The Referral Feed"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/analytics"
                  title="Program Analytics"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <LeavesUl>
                <Leaf
                  to="/growth/ga-101"
                  title="Growth Automation 101"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/growth/customer-lifecycle"
                  title="Growth Automation Customer Lifecycle"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/growth/saasquatch-ga"
                  title="SaaSquatch Growth Automation Platform"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <LeavesUl>
                <Leaf
                  to="/success/intro"
                  title="Referral Programs 101"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/referral-program-optimization"
                  title="Referral Program Optimization"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/core-topics"
                  title="The SaaSquatch Referral Program Loop"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/touchpoints"
                  title="Referral Marketing Channels"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/referral-program-retargeting"
                  title="Referral Program Retargeting"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/share-options"
                  title="Referral Program Sharing Options"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <LeavesUl>
                <Leaf
                  to="/success/referral-security"
                  title="Security Management System"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/fraud-and-security"
                  title="Fraud, Security & Fake Referrals"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Building Programs starts here */}
          <CoreCategory
            to="#"
            title="Building Programs "
            icon={buildingIcon}
            currentPage={currentPage}
          >
            <DropDownMenuItem title="Programs">
              <LeavesUl>
                <SmallLeafLink
                  to="/growth/quickstart"
                  title="Growth Automation Program General Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
                <DropDownMenuItem title="Program Library" isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/program/birthday-program"
                      title="Birthday & Anniversary"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/referral-program-with-objectives-prod"
                      title="Referral Program With Objectives"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/partner-program"
                      title="Partner"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/win-back-program"
                      title="Win Back"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/vip-program"
                      title="VIP"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/signup-reward"
                      title="Signup"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/regional-signup"
                      title="Regional Signup"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/profile-completion-reward"
                      title="Profile Completion"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/program/points-program"
                      title="Points Rewards"
                      size="small"
                      currentPage={currentPage}
                    />
                  </LeavesUl>
                </DropDownMenuItem>
                <Leaf
                  to="/growth/ga-mechanisms"
                  title="Growth Automation Program Mechanisms"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/guides/referral-quickstart"
                  title="Growth Automational Referral Program - Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <LeavesUl>
                <Leaf
                  to="/designer/widget-editor"
                  title="Customizing Program Widgets"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/themes/custom"
                  title="Custom Program Themes"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/widget"
                  title="Mobile Widget"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <LeavesUl>
                <Leaf
                  to="/feature/rewards"
                  title="Program Reward Options"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/gift-card-rewards"
                  title="Gift Card Rewards"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/rewards-fuel-tank"
                  title="Fuel Tank Rewards"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/reward-exchange"
                  title="Reward Exchange"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/topics/conversion"
                  title="Conversion"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/user-segmentation"
              title="User Segmentation"
              size="big"
              currentPage={currentPage}
            />

            <DropDownMenuItem title="Program Emails">
              <LeavesUl>
                <Leaf
                  to="/designer/email-editor"
                  title="Designing Your Program Emails"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/designer/short-tags"
                  title="Email Template Short Tags"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/blocked-email-domains"
                  title="Blocked Email Domains"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <LeavesUl>
                <Leaf
                  to="/features/w-9-compliance"
                  title="W-9 Compliance"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/configuring-your-reward-catalog-for-w-9"
                  title="Configuring Your Rewards for W-9"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/program-i18n"
              title="Program Internationalization"
              size="big"
              currentPage={currentPage}
            />
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="#"
            title="Running Programs"
            icon={runningProgramsIcon}
            currentPage={currentPage}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <LeavesUl>
                <Leaf
                  to="/success/ga-analytics"
                  title="Analytics Overview for Growth Automation Programs"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/program-and-portal-statistics"
                  title="Program and Portal Statistics"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/success/analytics-data"
                  title="Understanding Your Program Analytics Data"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/reports/"
                  title="Program Reports"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <LeavesUl>
                <Leaf
                  to="/guides/one-time"
                  title="Manual User Actions: Add a Reward, Referral or Event"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/manage-rewards"
                  title="Managing Existing User Rewards"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/purchase-object"
                  title="User Purchase & Refund Event"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/participant-deletion"
                  title="Participant Deletion"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/topics/attribution"
                  title="Attribution"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/topics/identification"
                  title="Identification"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <LeavesUl>
                <Leaf
                  to="/guides/user-import"
                  title="Bulk User Import"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/bulk-reward-redemption"
                  title="Bulk Reward Redemption Import"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/bulk-user-delete"
                  title="Bulk User Delete Import"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/event-import"
                  title="Bulk Event Import"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/features/managing-w-9-compliance-for-participants"
              title="Managing W-9 Compliance"
              size="big"
              currentPage={currentPage}
            />
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
            currentPage={currentPage}
          >
            <DropDownMenuItem title="Salesforce">
              <LeavesUl>
                <Leaf
                  to="/salesforce/"
                  title="Salesforce Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/salesforce/user-guide"
                  title="User Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/salesforce/faq"
                  title="FAQ"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/salesforce/install-guide"
                  title="Install Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/salesforce/immediate-object-upsertion"
                  title="Immediate Object Upsertion"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                  title="Using a Salesforce APEX Trigger to upsert a Lead"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <LeavesUl>
                <Leaf
                  to="/appsflyer-software-integration/"
                  title="AppsFlyer Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/appsflyer"
                  title="Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/appsflyer/reference"
                  title="Tech Reference"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <LeavesUl>
                <Leaf
                  to="/sftp/"
                  title="SFTP Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/integrations/sftp"
                  title="Configuration Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <LeavesUl>
                <Leaf
                  to="/branch-metrics/"
                  title="Branch Metrics Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/branch-metrics"
                  title="Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/branch-metrics/reference"
                  title="Reference"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <LeavesUl>
                <Leaf
                  to="/developer/segment"
                  title="Segment Integration"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/integrations/segment-v2/"
                  title="Segment V2"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/integrations/segment-v2/subscription"
                  title="Subscription"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/integrations/segment-v2/stream"
                  title="Stream"
                  size="small"
                  currentPage={currentPage}
                />

                <Leaf
                  to="/developer/segment/quickstart"
                  title="Segment Web Plugin Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <LeavesUl>
                <Leaf
                  to="/stripe"
                  title="Stripe Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/stripe"
                  title="Install Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/stripe-v2-install-guide"
                  title="V2 Stripe Integration Install Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <LeavesUl>
                <Leaf
                  to="/tangocard"
                  title="TangoCard Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/tangocard-connection"
                  title="Setup Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <LeavesUl>
                <Leaf
                  to="/zapier"
                  title="Zapier Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/integrations/zapier"
                  title="Quickstart Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <LeavesUl>
                <Leaf
                  to="/recurly"
                  title="Recurly Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/recurly/classic"
                  title="Classic Recurly Install Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/recurly"
                  title="Install Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <LeavesUl>
                <Leaf
                  to="/stitch"
                  title="Stitch Integration"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/stitch/quickstart"
                  title="Integration Guide"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Developer Resources starts here */}
          <CoreCategory
            to="/developer/"
            title="Developer Resources"
            icon={devIcon}
            currentPage={currentPage}
          >
            <DropDownMenuItem title="Dev Guides">
              <LeavesUl>
                <Leaf
                  to="/topics/email"
                  title="SaaSquatch & Emails"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/customshortdomainguide"
                  title="Custom Short Domains"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/referral-security"
                  title="Referral Security"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/shared-vs-solo-accounts"
                  title="Account Structure"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/marketo-form"
                  title="Marketo"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/guides/instapage-form"
                  title="Instapage"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/custom-user-fields/"
                  title="Custom User Fields"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/topics/widget-types"
                  title="User Widget Types"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/features/message-links"
                  title="Message Links"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/conversion"
                  title="Conversion Tech Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/attribution"
                  title="Attribution Tech Guide"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/breaking-changes"
                  title="Breaking Changes"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/bestpractices/common-pitfalls"
                  title="Common Pitfalls"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/widgets/writing-a-web-component-for-saasquatch"
                  title="Writing a Web Component for SaaSquatch"
                  size="small"
                  currentPage={currentPage}
                />
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <LeavesUl>
                <Leaf
                  to="/developer/squatchjs"
                  title="About"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/squatchjs/signed-requests"
                  title="Signed Requests"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/squatchjs/issue"
                  title="Issue Code List (list of 53 issue links)"
                  size="small"
                  currentPage={currentPage}
                />
                <Separator text="Version 2" />
                <Leaf
                  to="/developer/squatchjs/v2"
                  title="Quickstart"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/squatchjs/v2/advanced-use-cases"
                  title="Advanced Use Cases"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/squatchjs/v2/reference"
                  title="Reference"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/developer/squatchjs/cookies"
                  title="Tracking Cookies"
                  size="small"
                  currentPage={currentPage}
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
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/graphql/custom-widget"
                      title="Custom Widget via GraphQL"
                      size="small"
                      currentPage={currentPage}
                    />
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API " isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/api"
                      title="API Overview"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/api/authentication"
                      title="Authentication"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/api/openendpoints"
                      title="API Open Endpoints"
                      size="small"
                      currentPage={currentPage}
                    />
                    <Leaf
                      to="/api/errors"
                      title="Errors"
                      size="small"
                      currentPage={currentPage}
                    />
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API Reference" isNestedDropDown>
                  <LeavesUl>
                    <Leaf
                      to="/api/methods"
                      title="Full list of Methods"
                      size="small"
                      currentPage={currentPage}
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
                          currentPage={currentPage}
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
                          currentPage={currentPage}
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
                          currentPage={currentPage}
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
                          currentPage={currentPage}
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
                          currentPage={currentPage}
                        >
                          <GreenButton>Get</GreenButton>
                        </APILeaf>
                        <APILeaf
                          to="/api/methods#open_validate_code"
                          title="Lookup a referral code"
                          currentPage={currentPage}
                        >
                          <GreenButton>Get</GreenButton>
                          <GreyButton>Open Endpoint</GreyButton>
                        </APILeaf>
                        <APILeaf
                          to="/api/methods#open_apply_code"
                          title="Apply a referral code"
                          currentPage={currentPage}
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
                  currentPage={currentPage}
                />
                <Leaf
                  to="/api/webhooks/security"
                  title="Webhook Security"
                  size="small"
                  currentPage={currentPage}
                />
                <SmallLeafLink to="#">All methods</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <Leaf
              to="/topics/json-web-tokens"
              title="JSON Web Tokens"
              size="big"
              currentPage={currentPage}
            />
            <Leaf
              to="/developer/testing"
              title="Testing Best Practices"
              size="big"
              currentPage={currentPage}
            />

            <DropDownMenuItem title="Mobile">
              <LeavesUl>
                <Leaf
                  to="/mobile"
                  title="Overview"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/android"
                  title="Android"
                  size="small"
                  currentPage={currentPage}
                />
                <Leaf
                  to="/mobile/ios"
                  title="iOS"
                  size="small"
                  currentPage={currentPage}
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
  currentPage?: string;
}) => {
  return (
    <CoreCategoryView
      {...useCoreCategoryHook()}
      to={props.to}
      title={props.title}
      icon={props.icon}
      clicked={props.currentPage === props.to}
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
  currentPage?: string;
}) => {
  if (props.size == "small")
    return (
      <SmallLeafLink to={props.to} clicked={props.currentPage === props.to}>
        {props.title}
      </SmallLeafLink>
    );
  return (
    <BigLeafLink to={props.to} clicked={props.currentPage === props.to}>
      {props.title}
    </BigLeafLink>
  );
};

const APILeaf = (props: {
  to: string;
  title: string;
  children?: React.ReactNode;
  currentPage?: string;
}) => {
  return (
    <li>
      <SmallLeafLink to={props.to} clicked={props.currentPage === props.to}>
        <APIDiv>
          {props.title}
          <ButtonsContainerDiv>{props.children}</ButtonsContainerDiv>
        </APIDiv>
      </SmallLeafLink>
    </li>
  );
};
