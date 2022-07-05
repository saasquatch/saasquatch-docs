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
  font-weight: 400;
  line-height: 24px;
  padding: 8px 12px;
  &:hover {
    background-color: #e7edee;
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
          >
            <DropDownMenuItem title="SaaSquatch Admin Portal">
              <LeavesUl>
                <SmallLeafLink to="/success/using-referral-saasquatch">
                  Using the SaaSquatch Portal
                </SmallLeafLink>
                <SmallLeafLink to="/success/navigating-the-portal">
                  Navigating the SaaSquatch Portal
                </SmallLeafLink>
                <SmallLeafLink to="/success/referral-feed">
                  The Referral Feed
                </SmallLeafLink>
                <SmallLeafLink to="/features/analytics">
                  Program Analytics
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <LeavesUl>
                <SmallLeafLink to="/growth/ga-101">
                  Growth Automation 101
                </SmallLeafLink>
                <SmallLeafLink to="/growth/customer-lifecycle">
                  Growth Automation Customer Lifecycle
                </SmallLeafLink>
                <SmallLeafLink to="/growth/saasquatch-ga">
                  SaaSquatch Growth Automation Platform
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <LeavesUl>
                <SmallLeafLink to="/success/intro">
                  Referral Programs 101
                </SmallLeafLink>
                <SmallLeafLink to="/referral-program-optimization">
                  Referral Program Optimization
                </SmallLeafLink>
                <SmallLeafLink to="/success/core-topics">
                  The SaaSquatch Referral Program Loop
                </SmallLeafLink>
                <SmallLeafLink to="/success/touchpoints">
                  Referral Marketing Channels
                </SmallLeafLink>
                <SmallLeafLink to="/success/referral-program-retargeting">
                  Referral Program Retargeting
                </SmallLeafLink>
                <SmallLeafLink to="/success/share-options">
                  Referral Program Sharing Options
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <LeavesUl>
                <SmallLeafLink to="/success/referral-security">
                  Security Management System
                </SmallLeafLink>
                <SmallLeafLink to="/fraud-and-security">
                  Fraud, Security & Fake Referrals
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Building Programs starts here */}
          <CoreCategory
            to="/success/"
            title="Building Programs "
            icon={buildingIcon}
          >
            <DropDownMenuItem title="Programs">
              <LeavesUl>
                <SmallLeafLink to="/growth/quickstart">
                  Growth Automation Program General Quickstart
                </SmallLeafLink>
                <DropDownMenuItem title="Program Library" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="/program/birthday-program">
                      Birthday & Anniversary
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/referral-program-with-objectives-prod">
                      Referral Program With Objectives
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/partner-program">
                      Partner
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/win-back-program">
                      Win Back
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/vip-program">VIP</SmallLeafLink>
                    <SmallLeafLink to="/program/signup-reward">
                      Signup
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/regional-signup">
                      Regional Signup
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/profile-completion-reward">
                      Profile Completion
                    </SmallLeafLink>
                    <SmallLeafLink to="/program/points-program">
                      Points Rewards
                    </SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>
                <SmallLeafLink to="/growth/ga-mechanisms">
                  Growth Automation Program Mechanisms
                </SmallLeafLink>
                <SmallLeafLink to="/guides/referral-quickstart">
                  Growth Automational Referral Program - Quickstart
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <LeavesUl>
                <SmallLeafLink to="/designer/widget-editor">
                  Customizing Program Widgets
                </SmallLeafLink>
                <SmallLeafLink to="/themes/custom">
                  Custom Program Themes
                </SmallLeafLink>
                <SmallLeafLink to="/mobile/widget">Mobile Widget</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <LeavesUl>
                <SmallLeafLink to="/feature/rewards">
                  Program Reward Options
                </SmallLeafLink>
                <SmallLeafLink to="/success/gift-card-rewards">
                  Gift Card Rewards
                </SmallLeafLink>
                <SmallLeafLink to="/features/rewards-fuel-tank">
                  Fuel Tank Rewards
                </SmallLeafLink>
                <SmallLeafLink to="/features/reward-exchange">
                  Reward Exchange
                </SmallLeafLink>
                <SmallLeafLink to="/topics/conversion">
                  Conversion
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="/features/user-segmentation">
              User Segmentation
            </BigLeafLink>

            <DropDownMenuItem title="Program Emails">
              <LeavesUl>
                <SmallLeafLink to="/designer/email-editor">
                  Designing Your Program Emails
                </SmallLeafLink>
                <SmallLeafLink to="/designer/short-tags">
                  Email Template Short Tags
                </SmallLeafLink>
                <SmallLeafLink to="/developer/blocked-email-domains">
                  Blocked Email Domains
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <LeavesUl>
                <SmallLeafLink to="/features/w-9-compliance">
                  W-9 Compliance
                </SmallLeafLink>
                <SmallLeafLink to="/features/configuring-your-reward-catalog-for-w-9">
                  Configuring Your Rewards for W-9
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="/features/program-i18n">
              Program Internationalization
            </BigLeafLink>
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="/success/"
            title="Running Programs"
            icon={runningProgramsIcon}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <LeavesUl>
                <SmallLeafLink to="/success/ga-analytics">
                  Analytics Overview for Growth Automation Programs
                </SmallLeafLink>
                <SmallLeafLink to="/features/program-and-portal-statistics">
                  Program and Portal Statistics
                </SmallLeafLink>
                <SmallLeafLink to="/success/analytics-data">
                  Understanding Your Program Analytics Data
                </SmallLeafLink>
                <SmallLeafLink to="/features/reports/">
                  Program Reports
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <LeavesUl>
                <SmallLeafLink to="/guides/one-time">
                  Manual User Actions: Add a Reward, Referral or Event
                </SmallLeafLink>
                <SmallLeafLink to="/guides/manage-rewards">
                  Managing Existing User Rewards
                </SmallLeafLink>
                <SmallLeafLink to="/developer/purchase-object">
                  User Purchase & Refund Event
                </SmallLeafLink>
                <SmallLeafLink to="/features/participant-deletion">
                  Participant Deletion
                </SmallLeafLink>
                <SmallLeafLink to="/topics/attribution">
                  Attribution
                </SmallLeafLink>
                <SmallLeafLink to="/topics/identification">
                  Identification
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <LeavesUl>
                <SmallLeafLink to="/guides/user-import">
                  Bulk User Import
                </SmallLeafLink>
                <SmallLeafLink to="/guides/bulk-reward-redemption">
                  Bulk Reward Redemption Import
                </SmallLeafLink>
                <SmallLeafLink to="/guides/bulk-user-delete">
                  Bulk User Delete Import
                </SmallLeafLink>
                <SmallLeafLink to="/guides/event-import">
                  Bulk Event Import
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="/features/managing-w-9-compliance-for-participants">
              Managing W-9 Compliance
            </BigLeafLink>
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
          >
            <DropDownMenuItem title="Salesforce">
              <LeavesUl>
                <SmallLeafLink to="/salesforce/">
                  Salesforce Integration
                </SmallLeafLink>
                <SmallLeafLink to="/salesforce/user-guide">
                  User Guide
                </SmallLeafLink>
                <SmallLeafLink to="/salesforce/faq">FAQ</SmallLeafLink>
                <SmallLeafLink to="/salesforce/install-guide">
                  Install Guide
                </SmallLeafLink>
                <SmallLeafLink to="/salesforce/immediate-object-upsertion">
                  Immediate Object Upsertion
                </SmallLeafLink>
                <SmallLeafLink to="/salesforce/using-salesforce-apex-trigger-to-upsert-lead">
                  Using a Salesforce APEX Trigger to upsert a Lead
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <LeavesUl>
                <SmallLeafLink to="/appsflyer-software-integration/">
                  AppsFlyer Integration
                </SmallLeafLink>
                <SmallLeafLink to="/mobile/appsflyer">Quickstart</SmallLeafLink>
                <SmallLeafLink to="/mobile/appsflyer/reference">
                  Tech Reference
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <LeavesUl>
                <SmallLeafLink to="/sftp/">SFTP Integration</SmallLeafLink>
                <SmallLeafLink to="/integrations/sftp">
                  Configuration Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <LeavesUl>
                <SmallLeafLink to="/branch-metrics/">
                  Branch Metrics Integration
                </SmallLeafLink>
                <SmallLeafLink to="/mobile/branch-metrics">
                  Quickstart
                </SmallLeafLink>
                <SmallLeafLink to="/mobile/branch-metrics/reference">
                  Reference
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <LeavesUl>
                <SmallLeafLink to="/developer/segment">
                  Segment Integration
                </SmallLeafLink>
                <SmallLeafLink to="/integrations/segment-v2/">
                  Segment V2
                </SmallLeafLink>
                <SmallLeafLink to="/integrations/segment-v2/subscription">
                  Subscription
                </SmallLeafLink>
                <SmallLeafLink to="/integrations/segment-v2/stream">
                  Stream
                </SmallLeafLink>
                <SmallLeafLink to="/developer/segment/quickstart">
                  Segment Web Plugin Quickstart
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <LeavesUl>
                <SmallLeafLink to="/stripe">Stripe Integration</SmallLeafLink>
                <SmallLeafLink to="/developer/stripe">
                  Install Guide
                </SmallLeafLink>
                <SmallLeafLink to="/developer/stripe-v2-install-guide">
                  V2 Stripe Integration Install Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <LeavesUl>
                <SmallLeafLink to="/tangocard">
                  TangoCard Integration
                </SmallLeafLink>
                <SmallLeafLink to="/tangocard-connection">
                  Setup Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <LeavesUl>
                <SmallLeafLink to="/zapier">Zapier Integration</SmallLeafLink>
                <SmallLeafLink to="/integrations/zapier">
                  Quickstart Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <LeavesUl>
                <SmallLeafLink to="/recurly">Recurly Integration</SmallLeafLink>
                <SmallLeafLink to="/developer/recurly/classic">
                  Classic Recurly Install Guide
                </SmallLeafLink>
                <SmallLeafLink to="/developer/recurly">
                  Install Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <LeavesUl>
                <SmallLeafLink to="/stitch">Stitch Integration</SmallLeafLink>
                <SmallLeafLink to="/developer/stitch/quickstart">
                  Integration Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Developer Resources starts here */}
          <CoreCategory
            to="/developer/"
            title="Developer Resources"
            icon={devIcon}
          >
            <DropDownMenuItem title="Dev Guides">
              <LeavesUl>
                <SmallLeafLink to="/topics/email">
                  SaaSquatch & Emails
                </SmallLeafLink>
                <SmallLeafLink to="/customshortdomainguide">
                  Custom Short Domains
                </SmallLeafLink>
                <SmallLeafLink to="/developer/referral-security">
                  Referral Security
                </SmallLeafLink>
                <SmallLeafLink to="/shared-vs-solo-accounts">
                  Account Structure
                </SmallLeafLink>
                <SmallLeafLink to="/guides/marketo-form">Marketo</SmallLeafLink>
                <SmallLeafLink to="/guides/instapage-form">
                  Instapage
                </SmallLeafLink>
                <SmallLeafLink to="/features/custom-user-fields/">
                  Custom User Fields
                </SmallLeafLink>
                <SmallLeafLink to="/topics/widget-types">
                  User Widget Types
                </SmallLeafLink>
                <SmallLeafLink to="/features/message-links">
                  Message Links
                </SmallLeafLink>
                <SmallLeafLink to="/developer/conversion">
                  Conversion Tech Guide
                </SmallLeafLink>
                <SmallLeafLink to="/developer/attribution">
                  Attribution Tech Guide
                </SmallLeafLink>
                <SmallLeafLink to="/breaking-changes">
                  Breaking Changes
                </SmallLeafLink>
                <SmallLeafLink to="/bestpractices/common-pitfalls">
                  Common Pitfalls
                </SmallLeafLink>
                <SmallLeafLink to="/developer/widgets/writing-a-web-component-for-saasquatch">
                  Writing a Web Component for SaaSquatch
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <LeavesUl>
                <SmallLeafLink to="/developer/squatchjs">About</SmallLeafLink>
                <SmallLeafLink to="/squatchjs/signed-requests">
                  Signed Requests
                </SmallLeafLink>
                <SmallLeafLink to="/developer/squatchjs/issue">
                  Issue Code List (list of 53 issue links)
                </SmallLeafLink>
                <Separator text="Version 2" />
                <SmallLeafLink to="/developer/squatchjs/v2">
                  Quickstart
                </SmallLeafLink>
                <SmallLeafLink to="/developer/squatchjs/v2/advanced-use-cases">
                  Advanced Use Cases
                </SmallLeafLink>
                <SmallLeafLink to="/developer/squatchjs/v2/reference">
                  Reference
                </SmallLeafLink>
                <SmallLeafLink to="/developer/squatchjs/cookies">
                  Tracking Cookies
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="API">
              <LeavesUl>
                <DropDownMenuItem title="GraphQL API" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="/graphql/reference">
                      GraphQL Reference
                    </SmallLeafLink>
                    <SmallLeafLink to="/graphql/custom-widget">
                      Custom Widget via GraphQL
                    </SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API " isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="/api">API Overview</SmallLeafLink>
                    <SmallLeafLink to="/api/authentication">
                      Authentication
                    </SmallLeafLink>
                    <SmallLeafLink to="/api/openendpoints">
                      API Open Endpoints
                    </SmallLeafLink>
                    <SmallLeafLink to="/api/errors">Errors</SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API Reference" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="/api/methods">
                      Full list of Methods
                    </SmallLeafLink>
                    <DropDownMenuItem
                      title="Account (Account Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">Delete an account</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="User (User Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="User Event (User Event Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Share Links (Share Links Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <SmallLeafLink to="#">All methods</SmallLeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <DropDownMenuItem
                      title="Referral Code (Referral Code Overview)"
                      isNestedDropDown
                    >
                      <LeavesUl>
                        <APILeaf to="#" title="Lookup a referral code">
                          <GreenButton>Get</GreenButton>
                        </APILeaf>
                        <APILeaf to="#" title="Lookup a referral code">
                          <GreenButton>Get</GreenButton>
                          <GreyButton>Open Endpoint</GreyButton>
                        </APILeaf>
                        <APILeaf to="#" title="Apply a referral code">
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
                <SmallLeafLink to="/api/webhooks">Overview</SmallLeafLink>
                <SmallLeafLink to="/api/webhooks/security">
                  Webhook Security
                </SmallLeafLink>
                <SmallLeafLink to="#">All methods</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="/topics/json-web-tokens">
              JSON Web Tokens
            </BigLeafLink>
            <BigLeafLink to="/developer/testing">
              Testing Best Practices
            </BigLeafLink>

            <DropDownMenuItem title="Mobile">
              <LeavesUl>
                <SmallLeafLink to="/mobile">Overview</SmallLeafLink>
                <SmallLeafLink to="/mobile/android">Android</SmallLeafLink>
                <SmallLeafLink to="/mobile/ios">iOS </SmallLeafLink>
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

const APILeaf = (props: {
  to: string;
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <li>
      <SmallLeafLink to={props.to}>
        <APIDiv>
          {props.title}
          <ButtonsContainerDiv>{props.children}</ButtonsContainerDiv>
        </APIDiv>
      </SmallLeafLink>
    </li>
  );
};
