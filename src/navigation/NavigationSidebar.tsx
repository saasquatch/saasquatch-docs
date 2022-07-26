/*  Name: NavigationSidebar
    Purpose: Renders docs navigation sidebar.
    Author: M. Solis de Ovando
*/

import { History } from "history";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import useBrowserEffect from "src/util/useBrowserEffect";
// import "mmenu-js/dist/mmenu.css"
import { createContainer } from "unstated-next";
import ApiSidebar from "./ApiSidebar";
import {
  buildingIcon,
  devIcon,
  integrationsIcon,
  learningIcon,
  newsIcon,
  runningProgramsIcon,
} from "./sidebar-components/SidebarIcons";
import { CoreCategory } from "./sidebar-components/SidebarCoreCategory";
import { DropDown } from "./sidebar-components/SidebarDropDown";
import "./mmenu-overrides.css";
import init from "./nav";
import * as Styles from "./NavStyles";
import {
  SeparatorLi,
  SeparatorSpan,
  SeparatorLine,
} from "./sidebar-components/SidebarStyledComponents";
import { ArticleLeaf } from "./sidebar-components/SidebarArticleLeaf";
import { stripTrailingSlash } from "./sidebar-components/stripTrailingSlash";

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
export const CurrentPageContext = React.createContext("/");

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

  const currentPage = stripTrailingSlash(history.location.pathname);

  return (
    <CurrentPageContext.Provider value={currentPage}>
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
              to="/learning-saasquatch"
              title="Learning SaaSquatch"
              icon={learningIcon}
              clicked={currentPage === "/learning-saasquatch"}
            >
              <DropDown title="SaaSquatch Admin Portal">
                <ArticleLeaf
                  to="/success/using-referral-saasquatch/"
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
              </DropDown>

              <DropDown title="Programs">
                <ArticleLeaf
                  to="/success/intro"
                  title="Referral Programs 101"
                />
                <ArticleLeaf
                  to="/success/referral-program-optimization"
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
              </DropDown>

              <DropDown title="Growth Automation">
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
              </DropDown>

              <DropDown title="Fraud and Security Management">
                <ArticleLeaf
                  to="/success/referral-security"
                  title="Security Management System"
                />
                <ArticleLeaf
                  to="/fraud-and-security"
                  title="Fraud, Security & Fake Referrals"
                />
              </DropDown>
            </CoreCategory>

            {/* Building Programs starts here */}
            <CoreCategory
              to="/building-programs"
              title="Building Programs"
              icon={buildingIcon}
              clicked={currentPage === "/building-programs"}
            >
              <DropDown title="Programs">
                <DropDown title="Program Library" isNestedDropDown>
                  <ArticleLeaf to="/program/library/" title="Overview" />
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
                </DropDown>
                <ArticleLeaf
                  to="/growth/quickstart"
                  title="Growth Automation Program General Quickstart"
                />

                <ArticleLeaf
                  to="/growth/ga-mechanisms"
                  title="Growth Automation Program Mechanisms"
                />

                <ArticleLeaf
                  to="/guides/referral-quickstart"
                  title="Growth Automational Referral Program - Quickstart"
                />
              </DropDown>

              <DropDown title="Program Widget">
                <ArticleLeaf
                  to="/designer/widget-editor"
                  title="Customizing Program Widgets"
                />
                <ArticleLeaf
                  to="/themes/custom"
                  title="Custom Program Themes"
                />
                <ArticleLeaf to="/mobile/widget" title="Mobile Widget" />
                <ArticleLeaf
                  to="/features/program-and-portal-statistics/"
                  title="Program and Portal Statistics"
                />
              </DropDown>

              <DropDown title="Rewards">
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
              </DropDown>

              <DropDown title="Program Emails">
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
              </DropDown>

              <DropDown title="Microsites">
                <ArticleLeaf
                  to="/building-programs/microsites/quickstart-guide/"
                  title="Microsite Quickstart Guide"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/microsite-editor/"
                  title="SaaSquatch Microsite Editor"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/customizing-microsites/"
                  title="Customizing Microsites"
                />
                <ArticleLeaf
                  to="/setting-up-a-custom-subdomain-for-your-hosted-portal/"
                  title="Setting Up a Custom Domain for a Microsite"
                />
              </DropDown>

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
              to="/running-programs"
              title="Running Programs"
              icon={runningProgramsIcon}
              clicked={currentPage === "/running-programs"}
            >
              <DropDown title="Analytics and Reporting">
                <ArticleLeaf
                  to="/success/ga-analytics"
                  title="Analytics Overview for Growth Automation Programs"
                />
                <ArticleLeaf
                  to="/success/analytics-data"
                  title="Understanding Your Program Analytics Data"
                />
                <ArticleLeaf to="/features/reports/" title="Program Reports" />
              </DropDown>

              <DropDown title="User Management">
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
              </DropDown>

              <DropDown title="Bulk Imports">
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
              </DropDown>

              <DropDown title="W-9 Compliance">
                <ArticleLeaf
                  to="/features/w-9-compliance"
                  title="W-9 Compliance"
                />
                <ArticleLeaf
                  to="/features/configuring-your-reward-catalog-for-w-9"
                  title="Configuring Your Rewards for W-9"
                />
                <ArticleLeaf
                  to="/features/managing-w-9-compliance-for-participants"
                  title="Managing W-9 Compliance"
                />
              </DropDown>
            </CoreCategory>

            {/* Integrations starts here */}
            <CoreCategory
              to="/integrations"
              title="Integrations"
              icon={integrationsIcon}
              clicked={currentPage === "/integrations"}
            >
              <DropDown title="Salesforce">
                <ArticleLeaf to="/salesforce" title="Salesforce Integration" />
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
              </DropDown>

              <DropDown title="AppsFlyer">
                <ArticleLeaf
                  to="/appsflyer-software-integration/"
                  title="AppsFlyer Integration"
                />
                <ArticleLeaf to="/mobile/appsflyer" title="Quickstart" />
                <ArticleLeaf
                  to="/mobile/appsflyer/reference"
                  title="Tech Reference"
                />
              </DropDown>

              <DropDown title="SFTP Import">
                <ArticleLeaf to="/sftp/" title="SFTP Integration" />
                <ArticleLeaf
                  to="/integrations/sftp"
                  title="Configuration Guide"
                />
              </DropDown>

              <DropDown title="Branch Metrics">
                <ArticleLeaf
                  to="/branch-metrics/"
                  title="Branch Metrics Integration"
                />
                <ArticleLeaf to="/mobile/branch-metrics" title="Quickstart" />
                <ArticleLeaf
                  to="/mobile/branch-metrics/reference"
                  title="Reference"
                />
              </DropDown>

              <DropDown title="Segment">
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
                  to="/developer/segment/"
                  title="Segment Integration Reference"
                />

                <ArticleLeaf
                  to="/developer/segment/quickstart"
                  title="Segment Web Plugin Quickstart"
                />
              </DropDown>

              <DropDown title="Stripe">
                <ArticleLeaf to="/stripe/" title="Stripe Integration" />
                <ArticleLeaf to="/developer/stripe/" title="Install Guide" />
                <ArticleLeaf
                  to="/developer/stripe-v2-install-guide"
                  title="V2 Stripe Integration Install Guide"
                />
              </DropDown>

              <DropDown title="TangoCard">
                <ArticleLeaf to="/tangocard/" title="TangoCard Integration" />
                <ArticleLeaf to="/tangocard-connection" title="Setup Guide" />
              </DropDown>

              <DropDown title="Zapier">
                <ArticleLeaf to="/zapier/" title="Zapier Integration" />
                <ArticleLeaf
                  to="/integrations/zapier"
                  title="Quickstart Guide"
                />
              </DropDown>

              <DropDown title="Recurly">
                <ArticleLeaf to="/recurly/" title="Recurly Integration" />
                <ArticleLeaf
                  to="/developer/recurly/classic"
                  title="Classic Recurly Install Guide"
                />
                <ArticleLeaf to="/developer/recurly" title="Install Guide" />
              </DropDown>

              <DropDown title="Stitch">
                <ArticleLeaf to="/stitch/" title="Stitch Integration" />
                <ArticleLeaf
                  to="/developer/stitch/quickstart"
                  title="Integration Guide"
                />
              </DropDown>
            </CoreCategory>

            {/* Developer Resources starts here */}
            <CoreCategory
              to="/developer"
              title="Developer Resources"
              icon={devIcon}
              clicked={currentPage === "/developer"}
            >
              <DropDown title="Dev Guides">
                <ArticleLeaf to="/guides/" title="Overview" />
                <ArticleLeaf to="/topics/email" title="SaaSquatch & Emails" />
                <ArticleLeaf
                  to="/customshortdomainguide"
                  title="Custom Short Domains"
                />
                <ArticleLeaf
                  to="/developer/referral-security/"
                  title="Referral Security"
                />
                <ArticleLeaf
                  to="/shared-vs-solo-accounts/"
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
              </DropDown>

              <DropDown title="Squatch.js">
                <ArticleLeaf to="/developer/squatchjs" title="About" />
                <ArticleLeaf
                  to="/developer/squatchjs/signed-requests/"
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
              </DropDown>

              <DropDown title="API">
                <Separator text="REST API" />

                <ArticleLeaf to="/api" title="API Overview" />
                <ArticleLeaf to="/api/authentication" title="Authentication" />
                <ArticleLeaf
                  to="/api/openendpoints"
                  title="API Open Endpoints"
                />
                <ArticleLeaf to="/api/errors" title="Errors" />
                <Separator text="GraphQL API" />
                <ArticleLeaf
                  to="/graphql/reference"
                  title="GraphQL Reference"
                />
                <ArticleLeaf
                  to="/graphql/custom-widget"
                  title="Custom Widget via GraphQL"
                />

                <Separator text="REST API Reference" />

                <ApiSidebar />
              </DropDown>

              <DropDown title="Webhooks">
                <ArticleLeaf to="/api/webhooks" title="Overview" />
                <ArticleLeaf
                  to="/api/webhooks/security"
                  title="Webhook Security"
                />
              </DropDown>

              <DropDown title="Mobile">
                <ArticleLeaf to="/mobile/" title="Overview" />
                <ArticleLeaf to="/mobile/android/" title="Android" />
                <ArticleLeaf to="/mobile/ios/" title="iOS" />
              </DropDown>

              <ArticleLeaf
                to="/topics/json-web-tokens"
                title="JSON Web Tokens"
                isSubCategory
              />
              <ArticleLeaf
                to="/developer/testing/"
                title="Testing Best Practices"
                isSubCategory
              />
            </CoreCategory>
          </ul>
        </nav>
      </Styles.Container>
    </CurrentPageContext.Provider>
  );
}

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
