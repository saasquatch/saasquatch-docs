import { History } from "history";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import useBrowserEffect from "src/util/useBrowserEffect";
// import "mmenu-js/dist/mmenu.css"
import styled from "styled-components";
import { createContainer } from "unstated-next";
import ApiSidebar from "./ApiSidebar";
import {
  buildingIcon,
  devIcon,
  integrationsIcon,
  learningIcon,
  newsIcon,
  runningProgramsIcon,
  SVGProps,
} from "./components/IconsSidebar";
import { CoreCategoryView, useCoreCategoryHook } from "./CoreCategoryView";
import { MenuItemView, useMenuItemHook } from "./DropDownView";
import "./mmenu-overrides.css";
import init from "./nav";
import * as Styles from "./NavStyles";

export const CoreCategoryLink = styled(Link)`
  font-family: "Helvetica";
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  background-color: ${(props) =>
    props.clicked || props.clickedArticle
      ? "var(--sq-nav-surface-primary)"
      : "white"} !important;
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

export const TitleLink = styled(CoreCategoryLink as any)`
  justify-content: start;
  gap: 8px;
`;

export const LeafLink = styled(CoreCategoryLink as any)<{ clicked: boolean }>`
  font-size: ${(props) => (props.isSubCategory ? "16px" : "14px")};
  line-height: ${(props) => (props.isSubCategory ? "24px" : "21px")};
  font-weight: 400;
  padding: 8px 12px;
  background-color: ${(props) => props.clicked && "#003b45"};
  margin-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "-1px" : "0px"};
  border-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "2px solid #007A5B" : "0px"};
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
  }
`;

/* ul styles */

export const LeavesUl = styled.ul`
  /* list-style: none !important; */
  margin-left: 12px !important;
  border-left: 1px solid #003b45 !important;
`;

/* Different list items in order of size */

export const DivideLineLi = styled.li`
  height: 8px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 8px !important;
`;

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

/* Referral code list items styled components (contain buttons and different layout than other list items) */
const MethodDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ButtonsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const GreenButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background-color: #007a5b;
  width: fit-content;
  height: fit-content;
  padding: 2px 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

// @ts-ignore
export const OrangeButton = styled(GreenButton)`
  background-color: #e79533;
`;

//@ts-ignore
export const GreyButton = styled(GreenButton)`
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
  clickedArticle,
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

// So leaf components (ArticleLeaf and MethodLeaf) have access to currentPage (defined in NavigationSidebar())
// Props drilling used in CoreCategoryView
export const CurrentPageContext = React.createContext("/");

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
    <CurrentPageContext.Provider value={currentPage}>
      <Styles.Container>
        <nav id="my-menu">
          <ul className="baseMenu">
            {/* Learning SaaSquatch starts here */}
            <CoreCategory
              to="/success/"
              title="Learning SaaSquatch"
              icon={learningIcon}
              clicked={currentPage === "/success/"}
            >
              <DropDownMenuItem title="SaaSquatch Admin Portal">
                <ArticleLeaf
                  to="/success/using-referral-saasquatch"
                  title="Using the SaaSquatch Portal"
                />
                <ArticleLeaf
                  to="/success/navigating-the-portal"
                  title="Navigating the SaaSquatch Portal"
                />
                <ArticleLeaf
                  to="/success/referral-feed"
                  title="The Referral Feed"
                />
                <ArticleLeaf
                  to="/features/analytics"
                  title="Program Analytics"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Growth Automation">
                <ArticleLeaf
                  to="/growth/ga-101"
                  title="Growth Automation 101"
                />
                <ArticleLeaf
                  to="/growth/customer-lifecycle"
                  title="Growth Automation Customer Lifecycle"
                />

                <ArticleLeaf
                  to="/growth/saasquatch-ga"
                  title="SaaSquatch Growth Automation Platform"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Referral Programs">
                <ArticleLeaf
                  to="/success/intro"
                  title="Referral Programs 101"
                />
                <ArticleLeaf
                  to="/referral-program-optimization"
                  title="Referral Program Optimization"
                />
                <ArticleLeaf
                  to="/success/core-topics"
                  title="The SaaSquatch Referral Program Loop"
                />
                <ArticleLeaf
                  to="/success/touchpoints"
                  title="Referral Marketing Channels"
                />
                <ArticleLeaf
                  to="/success/referral-program-retargeting"
                  title="Referral Program Retargeting"
                />
                <ArticleLeaf
                  to="/success/share-options"
                  title="Referral Program Sharing Options"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Fraud and Security Management">
                <ArticleLeaf
                  to="/success/referral-security"
                  title="Security Management System"
                />
                <ArticleLeaf
                  to="/fraud-and-security"
                  title="Fraud, Security & Fake Referrals"
                />
              </DropDownMenuItem>
            </CoreCategory>

            {/* Building Programs starts here */}
            <CoreCategory
              to="#"
              title="NULL Building Programs"
              icon={buildingIcon}
              clicked={currentPage === "#"}
            >
              <DropDownMenuItem title="Programs">
                <ArticleLeaf
                  to="/growth/quickstart"
                  title="Growth Automation Program General Quickstart"
                />
                <DropDownMenuItem title="Program Library" isNestedDropDown>
                  <ArticleLeaf
                    to="/program/birthday-program"
                    title="Birthday & Anniversary"
                  />
                  <ArticleLeaf
                    to="/program/referral-program-with-objectives-prod"
                    title="Referral Program With Objectives"
                  />
                  <ArticleLeaf to="/program/partner-program" title="Partner" />
                  <ArticleLeaf
                    to="/program/win-back-program"
                    title="Win Back"
                  />
                  <ArticleLeaf to="/program/vip-program" title="VIP" />
                  <ArticleLeaf to="/program/signup-reward" title="Signup" />
                  <ArticleLeaf
                    to="/program/regional-signup"
                    title="Regional Signup"
                  />
                  <ArticleLeaf
                    to="/program/profile-completion-reward"
                    title="Profile Completion"
                  />
                  <ArticleLeaf
                    to="/program/points-program"
                    title="Points Rewards"
                  />
                </DropDownMenuItem>
                <ArticleLeaf
                  to="/growth/ga-mechanisms"
                  title="Growth Automation Program Mechanisms"
                />

                <ArticleLeaf
                  to="/guides/referral-quickstart"
                  title="Growth Automational Referral Program - Quickstart"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Program Widget">
                <ArticleLeaf
                  to="/designer/widget-editor"
                  title="Customizing Program Widgets"
                />
                <ArticleLeaf
                  to="/themes/custom"
                  title="Custom Program Themes"
                />
                <ArticleLeaf to="/mobile/widget" title="Mobile Widget" />
              </DropDownMenuItem>

              <DropDownMenuItem title="Rewards">
                <ArticleLeaf
                  to="/feature/rewards"
                  title="Program Reward Options"
                />
                <ArticleLeaf
                  to="/success/gift-card-rewards"
                  title="Gift Card Rewards"
                />
                <ArticleLeaf
                  to="/features/rewards-fuel-tank"
                  title="Fuel Tank Rewards"
                />
                <ArticleLeaf
                  to="/features/reward-exchange"
                  title="Reward Exchange"
                />
                <ArticleLeaf to="/topics/conversion" title="Conversion" />
              </DropDownMenuItem>

              <DropDownMenuItem title="Program Emails">
                <ArticleLeaf
                  to="/designer/email-editor"
                  title="Designing Your Program Emails"
                />
                <ArticleLeaf
                  to="/designer/short-tags"
                  title="Email Template Short Tags"
                />
                <ArticleLeaf
                  to="/developer/blocked-email-domains"
                  title="Blocked Email Domains"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="W9 Compliance">
                <ArticleLeaf
                  to="/features/w-9-compliance"
                  title="W-9 Compliance"
                />
                <ArticleLeaf
                  to="/features/configuring-your-reward-catalog-for-w-9"
                  title="Configuring Your Rewards for W-9"
                />
              </DropDownMenuItem>

              <ArticleLeaf
                to="/features/user-segmentation"
                title="User Segmentation"
                isSubCategory
              />

              <ArticleLeaf
                to="/features/program-i18n"
                title="Program Internationalization"
                isSubCategory
              />
            </CoreCategory>

            {/* Running Programs starts here */}
            <CoreCategory
              to="/features/rewards-fuel-tank/"
              title="Running Programs"
              icon={runningProgramsIcon}
              clicked={currentPage === "/features/rewards-fuel-tank/"}
            >
              <DropDownMenuItem title="Analytics and Reporting">
                <ArticleLeaf
                  to="/success/ga-analytics"
                  title="Analytics Overview for Growth Automation Programs"
                />
                <ArticleLeaf
                  to="/features/program-and-portal-statistics"
                  title="Program and Portal Statistics"
                />
                <ArticleLeaf
                  to="/success/analytics-data"
                  title="Understanding Your Program Analytics Data"
                />
                <ArticleLeaf to="/features/reports/" title="Program Reports" />
              </DropDownMenuItem>

              <DropDownMenuItem title="User Management">
                <ArticleLeaf
                  to="/guides/one-time"
                  title="Manual User Actions: Add a Reward, Referral or Event"
                />
                <ArticleLeaf
                  to="/guides/manage-rewards"
                  title="Managing Existing User Rewards"
                />
                <ArticleLeaf
                  to="/developer/purchase-object"
                  title="User Purchase & Refund Event"
                />
                <ArticleLeaf
                  to="/features/participant-deletion"
                  title="Participant Deletion"
                />
                <ArticleLeaf to="/topics/attribution" title="Attribution" />
                <ArticleLeaf
                  to="/topics/identification"
                  title="Identification"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Bulk Imports">
                <ArticleLeaf
                  to="/guides/user-import"
                  title="Bulk User Import"
                />
                <ArticleLeaf
                  to="/guides/bulk-reward-redemption"
                  title="Bulk Reward Redemption Import"
                />
                <ArticleLeaf
                  to="/guides/bulk-user-delete"
                  title="Bulk User Delete Import"
                />
                <ArticleLeaf
                  to="/guides/event-import"
                  title="Bulk Event Import"
                />
              </DropDownMenuItem>

              <ArticleLeaf
                to="/features/managing-w-9-compliance-for-participants"
                title="Managing W-9 Compliance"
                isSubCategory
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
                <ArticleLeaf to="/salesforce/" title="Salesforce Integration" />
                <ArticleLeaf to="/salesforce/user-guide" title="User Guide" />
                <ArticleLeaf to="/salesforce/faq" title="FAQ" />
                <ArticleLeaf
                  to="/salesforce/install-guide"
                  title="Install Guide"
                />
                <ArticleLeaf
                  to="/salesforce/immediate-object-upsertion"
                  title="Immediate Object Upsertion"
                />
                <ArticleLeaf
                  to="/salesforce/using-salesforce-apex-trigger-to-upsert-lead"
                  title="Using a Salesforce APEX Trigger to upsert a Lead"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="AppsFlyer">
                <ArticleLeaf
                  to="/appsflyer-software-integration/"
                  title="AppsFlyer Integration"
                />
                <ArticleLeaf to="/mobile/appsflyer" title="Quickstart" />
                <ArticleLeaf
                  to="/mobile/appsflyer/reference"
                  title="Tech Reference"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="SFTP Import">
                <ArticleLeaf to="/sftp/" title="SFTP Integration" />
                <ArticleLeaf
                  to="/integrations/sftp"
                  title="Configuration Guide"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Branch Metrics">
                <ArticleLeaf
                  to="/branch-metrics/"
                  title="Branch Metrics Integration"
                />
                <ArticleLeaf to="/mobile/branch-metrics" title="Quickstart" />
                <ArticleLeaf
                  to="/mobile/branch-metrics/reference"
                  title="Reference"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Segment">
                <ArticleLeaf to="/segment/" title="Segment Integration" />

                <ArticleLeaf
                  to="/integrations/segment-v2/"
                  title="Segment V2"
                />

                <ArticleLeaf
                  to="/integrations/segment-v2/subscription"
                  title="Subscription"
                />

                <ArticleLeaf
                  to="/integrations/segment-v2/stream"
                  title="Stream"
                />

                <ArticleLeaf
                  to="/developer/segment"
                  title="Segment Integration Reference"
                />

                <ArticleLeaf
                  to="/developer/segment/quickstart"
                  title="Segment Web Plugin Quickstart"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Stripe">
                <ArticleLeaf to="/stripe" title="Stripe Integration" />
                <ArticleLeaf to="/developer/stripe" title="Install Guide" />
                <ArticleLeaf
                  to="/developer/stripe-v2-install-guide"
                  title="V2 Stripe Integration Install Guide"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="TangoCard">
                <ArticleLeaf to="/tangocard" title="TangoCard Integration" />
                <ArticleLeaf to="/tangocard-connection" title="Setup Guide" />
              </DropDownMenuItem>

              <DropDownMenuItem title="Zapier">
                <ArticleLeaf to="/zapier" title="Zapier Integration" />
                <ArticleLeaf
                  to="/integrations/zapier"
                  title="Quickstart Guide"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Recurly">
                <ArticleLeaf to="/recurly" title="Recurly Integration" />
                <ArticleLeaf
                  to="/developer/recurly/classic"
                  title="Classic Recurly Install Guide"
                />
                <ArticleLeaf to="/developer/recurly" title="Install Guide" />
              </DropDownMenuItem>

              <DropDownMenuItem title="Stitch">
                <ArticleLeaf to="/stitch" title="Stitch Integration" />
                <ArticleLeaf
                  to="/developer/stitch/quickstart"
                  title="Integration Guide"
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
                <ArticleLeaf to="/topics/email" title="SaaSquatch & Emails" />
                <ArticleLeaf
                  to="/customshortdomainguide"
                  title="Custom Short Domains"
                />
                <ArticleLeaf
                  to="/developer/referral-security"
                  title="Referral Security"
                />
                <ArticleLeaf
                  to="/shared-vs-solo-accounts"
                  title="Account Structure"
                />
                <ArticleLeaf to="/guides/marketo-form" title="Marketo" />
                <ArticleLeaf to="/guides/instapage-form" title="Instapage" />
                <ArticleLeaf
                  to="/features/custom-user-fields/"
                  title="Custom User Fields"
                />
                <ArticleLeaf
                  to="/topics/widget-types"
                  title="User Widget Types"
                />
                <ArticleLeaf
                  to="/features/message-links"
                  title="Message Links"
                />
                <ArticleLeaf
                  to="/developer/conversion"
                  title="Conversion Tech Guide"
                />
                <ArticleLeaf
                  to="/developer/attribution"
                  title="Attribution Tech Guide"
                />
                <ArticleLeaf to="/breaking-changes" title="Breaking Changes" />
                <ArticleLeaf
                  to="/bestpractices/common-pitfalls"
                  title="Common Pitfalls"
                />
                <ArticleLeaf
                  to="/developer/widgets/writing-a-web-component-for-saasquatch"
                  title="Writing a Web Component for SaaSquatch"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="Squatch.js">
                <ArticleLeaf to="/developer/squatchjs" title="About" />
                <ArticleLeaf
                  to="/squatchjs/signed-requests"
                  title="Signed Requests"
                />
                <ArticleLeaf
                  to="/developer/squatchjs/issue"
                  title="Issue Code List"
                />
                <Separator text="Version 2" />
                <ArticleLeaf to="/developer/squatchjs/v2" title="Quickstart" />
                <ArticleLeaf
                  to="/developer/squatchjs/v2/advanced-use-cases"
                  title="Advanced Use Cases"
                />
                <ArticleLeaf
                  to="/developer/squatchjs/v2/reference"
                  title="Reference"
                />
                <ArticleLeaf
                  to="/developer/squatchjs/cookies"
                  title="Tracking Cookies"
                />
              </DropDownMenuItem>

              <DropDownMenuItem title="API">
                <Separator text="GraphQL API" />
                <ArticleLeaf
                  to="/graphql/reference"
                  title="GraphQL Reference"
                />
                <ArticleLeaf
                  to="/graphql/custom-widget"
                  title="Custom Widget via GraphQL"
                />

                <Separator text="REST API" />
                <ArticleLeaf to="/api" title="API Overview" />
                <ArticleLeaf to="/api/authentication" title="Authentication" />
                <ArticleLeaf
                  to="/api/openendpoints"
                  title="API Open Endpoints"
                />
                <ArticleLeaf to="/api/errors" title="Errors" />

                <Separator text="REST API Reference" />
                <ArticleLeaf to="/api/methods" title="Full list of Methods" />
                {/* To hard-code API sidebar: paste everything inside commented out ApiSidebar() */}
                <ApiSidebar />
              </DropDownMenuItem>

              <DropDownMenuItem title="Webhook">
                <ArticleLeaf to="/api/webhooks" title="Overview" />
                <ArticleLeaf
                  to="/api/webhooks/security"
                  title="Webhook Security"
                />
                <MethodLeaf
                  to="/api/methods#create_webhook"
                  title="Create a webhook subscription"
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#list_webhooks"
                  title="List webhook subscriptions"
                >
                  <GreenButton>get</GreenButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#delete_webhook"
                  title="Delete a webhook subscription"
                >
                  <GreyButton>DELETE</GreyButton>
                </MethodLeaf>
                <MethodLeaf
                  to="/api/methods#test_webhook"
                  title="Test a webhook subscription"
                >
                  <OrangeButton>post</OrangeButton>
                </MethodLeaf>
              </DropDownMenuItem>

              <DropDownMenuItem title="Mobile">
                <ArticleLeaf to="/mobile" title="Overview" />
                <ArticleLeaf to="/mobile/android" title="Android" />
                <ArticleLeaf to="/mobile/ios" title="iOS" />
              </DropDownMenuItem>

              <ArticleLeaf
                to="/topics/json-web-tokens"
                title="JSON Web Tokens"
                isSubCategory
              />
              <ArticleLeaf
                to="/developer/testing"
                title="Testing Best Practices"
                isSubCategory
              />
            </CoreCategory>
            {/* SaaSquatch Product News starts here */}
            <CoreCategory
              to="/product-news"
              title="SaaSquatch Product News"
              icon={newsIcon}
              clickedArticle={currentPage === "/product-news"}
            />
          </ul>
        </nav>
      </Styles.Container>
    </CurrentPageContext.Provider>
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

export const DropDownMenuItem = (props: {
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

export const MethodLeaf = (props: {
  to: string;
  title: string;
  children?: React.ReactNode;
}) => {
  const currentPage = React.useContext(CurrentPageContext);
  return (
    <li>
      <LeafLink to={props.to} clicked={currentPage === props.to}>
        <MethodDiv>
          {props.title}
          <ButtonsContainerDiv>{props.children}</ButtonsContainerDiv>
        </MethodDiv>
      </LeafLink>
    </li>
  );
};
