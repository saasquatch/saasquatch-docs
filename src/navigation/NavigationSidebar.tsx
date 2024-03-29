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

  useBrowserEffect(() => {
    if (
      window.location.pathname.startsWith("/developer/squatchjs/v2/reference")
    ) {
      window.location.replace("https://saasquatch.github.io/squatch-js");
    }
  }, [typeof window !== "undefined" && window.location.pathname]);

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
                  title="SaaSquatch Admin Portal"
                />
                <ArticleLeaf
                  to="/success/referral-feed"
                  title="The Referral Feed"
                />
                <ArticleLeaf
                  to="/features/analytics"
                  title="Program Analytics"
                />
                <ArticleLeaf
                  to="/success/add-portal-member"
                  title="Managing Team Members"
                />
                <ArticleLeaf
                  to="/learning-saasquatch/admin-portal/team-member-roles"
                  title="Team Member Roles"
                />
                <ArticleLeaf
                  to="/learning-saasquatch/admin-portal/single-sign-on"
                  title="Setting Up Login Rules and Single Sign-On (SSO)"
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
                  title="Program General Quickstart"
                />

                <ArticleLeaf
                  to="/growth/ga-mechanisms"
                  title="Program Mechanisms"
                />

                <ArticleLeaf
                  to="/guides/referral-quickstart"
                  title="Referral Program - Quickstart"
                />
                <ArticleLeaf
                  to="/building-programs/programs/create-and-publish-a-program-draft"
                  title="Create and Publish a Program Draft"
                />
              </DropDown>

              <DropDown title="Participant Experiences">
                <ArticleLeaf
                  to="/features/end-user-experiences"
                  title="Participant Experiences"
                />
                <ArticleLeaf
                  to="/building-programs/participant-experiences/configuring-a-custom-domain"
                  title="Set Up a Domain"
                />
                <ArticleLeaf
                  to="/building-programs/participant-experiences/vanity-links-and-codes"
                  title="Assign Vanity Share Links or Codes"
                />
                <ArticleLeaf
                  to="/features/program-and-portal-statistics/"
                  title="Widget and Microsite Statistics"
                />
                <ArticleLeaf
                  to="/building-programs/participant-experiences/saasquatch-components/"
                  title="SaaSquatch Components"
                />
              </DropDown>

              <DropDown title="Program Widget">
                <ArticleLeaf to="/topics/widget-types" title="Widget Types" />
                <ArticleLeaf
                  to="/designer/widget-editor"
                  title="Customizing Program Widgets"
                />
                <ArticleLeaf
                  to="/building-programs/program-widget/setting-up-an-instant-access-widget/"
                  title="Set Up an Instant Access Widget"
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
                  to="/features/leaderboards/"
                  title="Leaderboards"
                />

                <DropDown title="Reward Exchange" isNestedDropDown>
                  <ArticleLeaf
                    to="/features/reward-exchange"
                    title="Reward Exchange"
                  />
                  <ArticleLeaf
                    to="/building-programs/rewards/setting-up-reward-exchange"
                    title="Setting Up a Reward Exchange Option"
                  />
                </DropDown>
              </DropDown>

              <DropDown title="Program Emails">
                <ArticleLeaf
                  to="/designer/email-editor"
                  title="Designing Your Program Emails"
                />
                <ArticleLeaf
                  to="/designer/short-tags"
                  title="Email Template Merge Tags"
                />
                <ArticleLeaf
                  to="/developer/blocked-email-domains"
                  title="Blocked Email Domains"
                />
              </DropDown>
              <DropDown title="Custom and Calculated Fields">
                <ArticleLeaf
                  to="/features/custom-user-fields/"
                  title="Custom Fields"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/calculated-fields"
                  title="Calculated Fields"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/tracking-windows"
                  title="Tracking Windows for Calculated Fields"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/setting-up-a-calculated-field"
                  title="Setting Up a Calculated Field"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/edits-to-calculated-fields"
                  title="Edits to Calculated Fields"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/deleting-a-calculated-field"
                  title="Deleting a Calculated Field"
                />
                <ArticleLeaf
                  to="/building-programs/custom-calculated-fields/recalculation"
                  title="Recalculation and Backfilling Values"
                />
              </DropDown>

              <DropDown title="Microsites">
                <ArticleLeaf
                  to="/building-programs/microsites/microsites-overview"
                  title="Microsites Overview"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/quickstart-guide"
                  title="Setting Up a Microsite"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/customizing-microsites"
                  title="Customizing Microsite Layouts and Pages"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/customizing-microsite-lifecycle-emails"
                  title="Customizing Microsite Lifecycle Emails"
                />
                <ArticleLeaf
                  to="/building-programs/microsites/microsite-editor"
                  title="SaaSquatch Microsite Editor"
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
                <ArticleLeaf
                  to="/running-programs/analytics-and-reporting/running-a-report/"
                  title="Running a Program Report"
                />
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
              </DropDown>

              <DropDown title="Stripe">
                <ArticleLeaf to="/stripe/" title="Stripe Integration" />
                <ArticleLeaf
                  to="/developer/stripe-v2-install-guide"
                  title="Install Guide"
                />
              </DropDown>

              <DropDown title="Tango Card">
                <ArticleLeaf to="/tangocard/" title="Tango Card Integration" />
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
                <ArticleLeaf to="/developer/recurly" title="Install Guide" />
              </DropDown>

              <DropDown title="Stitch">
                <ArticleLeaf to="/stitch/" title="Stitch Integration" />
                <ArticleLeaf
                  to="/developer/stitch/quickstart"
                  title="Integration Guide"
                />
              </DropDown>
              <DropDown title="PayPal">
                <ArticleLeaf to="/paypal-payouts/" title="PayPal Integration" />
                <ArticleLeaf
                  to="/integrations/paypal/cash-payouts"
                  title="Automated Cash Payouts with PayPal"
                />
                <ArticleLeaf
                  to="/integrations/paypal/setting-up-cash-payouts"
                  title="Setting Up Cash Payouts with PayPal"
                />
                <ArticleLeaf
                  to="/integrations/paypal/reward-statuses"
                  title="Cash Payouts Reward Statuses"
                />
              </DropDown>
              <DropDown title="HubSpot">
                <ArticleLeaf
                  to="/integrations/hubspot"
                  title="HubSpot Integration"
                />
                <ArticleLeaf
                  to="/integrations/hubspot/overview/"
                  title="HubSpot Integration Overview"
                />
                <ArticleLeaf
                  to="/integrations/hubspot/integrating-with-saasquatch/"
                  title="Integrating SaaSquatch with HubSpot"
                />
                <ArticleLeaf
                  to="/integrations/hubspot/sending-data-from-hubspot-forms/"
                  title="Sending Data From HubSpot Forms to SaaSquatch"
                />
                <ArticleLeaf
                  to="/integrations/hubspot/integration-behaviours/"
                  title="HubSpot Integration Behaviors"
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
                  to="/features/message-links"
                  title="Message Links"
                />
                <ArticleLeaf
                  to="/bestpractices/common-pitfalls"
                  title="Common Pitfalls"
                />
                <ArticleLeaf
                  to="/developer/widgets/writing-a-web-component-for-saasquatch"
                  title="Writing a Web Component for SaaSquatch"
                />
                <ArticleLeaf
                  to="/developer/event-idempotency"
                  title="Event Idempotency"
                />
                <ArticleLeaf to="/developer/bulk-import" title="Bulk Imports" />
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
                <ArticleLeaf
                  to="/developer/squatchjs/v2"
                  title="Key Squatch.js Scripts"
                />
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
                to="/breaking-changes"
                title="Breaking Changes"
                isSubCategory
              />
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
