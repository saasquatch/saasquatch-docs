import React, { useRef, useState } from "react";
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

export function NavigationSidebar() {
  const history: History<any> = useHistory();
  // const container = useRef(null);
  const mmenu = MMenuContext.useContainer();

  useBrowserEffect(() => {
    mmenu.mmenuApi = init(modalRoot, history);
  }, [modalRoot]);

  return (
    <Styles.Container
    //ref={container}
    >
      <nav id="my-menu">
        <ul className="baseMenu">
          <li>
            <Link to="/product-news">
              <i
                style={{ marginRight: "1.2em" }}
                className="fa fa-fw fa-bullhorn fa-1.5x"
              ></i>
              SaaSquatch Product News
            </Link>
          </li>
          <li className="integrations">
            <Link to="/integrations/">
              <i className="fa fa-fw fa-cubes fa-1.5x"></i>
              Integrations
              <br />
            </Link>
            <ul>
              <li>
                <Link to="/integrations/">
                  <i className="fa fa-fw fa-cubes fa-1.5x"></i>
                  Integrations
                </Link>
              </li>
              <li className="Divider">Growth Automation</li>
              <li>
                <Link to="/salesforce/">Salesforce Integration</Link>
                <ul>
                  <li>
                    <Link to="/salesforce/">Salesforce Integration</Link>
                  </li>
                  <li>
                    <Link to="/salesforce/user-guide/">
                      Salesforce User Guide
                    </Link>
                  </li>
                  <li>
                    <Link to="/salesforce/faq/">Salesforce FAQ</Link>
                  </li>
                  <li>
                    <Link to="/salesforce/install-guide/">
                      Salesforce Install Guide
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/sftp/">SFTP Integration</Link>
                <ul>
                  <li>
                    <Link to="/sftp/">SFTP Integration</Link>
                  </li>
                  <li>
                    <Link to="/integrations/sftp/">
                      SFTP Configuration Guide
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/segment/">Segment Integration</Link>
                <ul>
                  <li>
                    <Link to="/segment/">Segment Integration</Link>
                  </li>
                  <li>
                    <Link to="/integrations/segment-v2/">
                      Segment Integration V2
                    </Link>
                  </li>
                  <li>
                    <Link to="/integrations/segment-v2/subscription/">
                      Segment Subscription
                    </Link>
                  </li>
                  <li>
                    <Link to="/integrations/segment-v2/stream/">
                      Segment Stream
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/tangocard/">Tangocard Integration</Link>
                <ul>
                  <li>
                    <Link to="/tangocard/">Tangocard Integration</Link>
                  </li>
                  <li>
                    <Link to="/tangocard-connection/">
                      Tangocard Setup Guide
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/recurly/">Recurly Integration</Link>
                <ul>
                  <li>
                    <Link to="/recurly/">Recurly Integration</Link>
                  </li>
                  <li>
                    <Link to="/developer/recurly/">Recurly Install Guide</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/appsflyer-software-integration/">
                  Appsflyer Integration
                </Link>
                <ul>
                  <li>
                    <Link to="/appsflyer-software-integration/">
                      Appsflyer Integration
                    </Link>
                  </li>
                  <li>
                    <Link to="/mobile/appsflyer/">Appsflyer Quickstart</Link>
                  </li>
                  <li>
                    <Link to="/mobile/appsflyer/reference/">
                      Appsflyer Tech Reference
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/branch-metrics/">Branch Integration</Link>
                <ul>
                  <li>
                    <Link to="/branch-metrics/">Branch Integration</Link>
                  </li>
                  <li>
                    <Link to="/mobile/branch-metrics/">
                      Branch Metrics Integration - Quickstart
                    </Link>
                  </li>
                  <li>
                    <Link to="/mobile/branch-metrics/reference/">
                      Branch Metrics Reference
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/stripe/">Stripe Integration</Link>
                <ul>
                  <li>
                    <Link to="/stripe/">Stripe Integration</Link>
                  </li>
                  <li>
                    <Link to="/developer/stripe-v2-install-guide/">
                      Stripe Install Guide
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/zapier/">Zapier Integration</Link>
                <ul>
                  <li>
                    <Link to="/zapier/">Zapier Integration</Link>
                  </li>
                  <li>
                    <Link to="/integrations/zapier">
                      Zapier Quickstart Guide
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/stitch/">Stitch Integration</Link>
                <ul>
                  <li>
                    <Link to="/stitch/">Stitch Integration</Link>
                  </li>
                  <li>
                    <Link to="/developer/stitch/quickstart">
                      Stitch Integration Guide
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="successCenter">
            <Link to="/success/">
              <i className="fa big fas fa-info-circle fa-2x"></i>
              Success Center
              <br />
            </Link>
            <ul>
              <li>
                <Link to="/success/">
                  Success Center Home
                  <br />
                  <small>Articles, Guides & Management Tools</small>
                </Link>
              </li>
              <li>
                <span>
                  <i className="fa big fas fa-info-circle fa-1.5x"></i>
                  Learn About SaaSquatch
                </span>
                <ul>
                  <li className="Divider">Growth Automation</li>
                  <li>
                    <Link to="/growth/ga-101">Growth Automation 101</Link>
                  </li>
                  <li>
                    <Link to="/growth/customer-lifecycle">
                      Growth Automation Customer Lifecycle
                    </Link>
                  </li>
                  <li>
                    <Link to="/growth/saasquatch-ga">
                      SaaSquatch Growth Automation Platform
                    </Link>
                  </li>
                  <li>
                    <Link to="/program/library">Program Library</Link>
                  </li>
                  <li>
                    <Link to="/feature/rewards">Program Reward Options</Link>
                  </li>
                  <li>
                    <Link to="/success/ga-analytics">
                      Analytics Overview for Growth Automation Programs
                    </Link>
                  </li>
                  <li className="Divider">Referral Programs</li>
                  <li>
                    <Link to="/success/intro">Referral Programs 101</Link>
                  </li>
                  <li>
                    <Link to="/success/core-topics">
                      The SaaSquatch Referral Program Loop
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/share-options">
                      Referral Program Sharing Options
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/referral-feed">The Referral Feed</Link>
                  </li>
                  <li>
                    <Link to="/success/referral-security">
                      Security Management System
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/analytics">Program Analytics</Link>
                  </li>

                  <li className="Divider">Program References</li>
                  <li>
                    <Link to="/success/referral-program-optimization">
                      Referral Program Optimization
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/touchpoints">
                      Referral Marketing Channels
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/referral-program-retargeting">
                      Referral Program Retargeting
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/analytics-data">
                      Understanding Your Program Analytics Data
                    </Link>
                  </li>
                  <li>
                    <Link to="/fraud-and-security">
                      Fraud, Security & Fake Referrals
                    </Link>
                  </li>
                  <li>
                    <Link to="/themes/custom">Custom Program Themes</Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>
                  <i className="fa big fas fa-edit fa-1.5x"></i>
                  Program Management
                </span>
                <ul>
                  <li>
                    <Link to="/guides/?isSuccessCenter=true">
                      <i className="fa fa-fw fa-life-ring"></i>
                      Go to SaaSquatch Guides
                    </Link>
                  </li>
                  <li className="Divider">Administration Portal</li>
                  <li>
                    <Link to="/success/using-referral-saasquatch">
                      Using the SaaSquatch Portal
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/navigating-the-portal/">
                      Navigating the SaaSquatch Portal
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides/one-time">
                      Manual User Actions: Add a Reward, Referral or Event
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides/manage-rewards">
                      Managing Existing User Rewards
                    </Link>
                  </li>
                  <li>
                    <Link to="/designer/email-editor">
                      Designing Your Program Emails
                    </Link>
                  </li>
                  <li>
                    <Link to="/designer/widget-editor">
                      Customize Program Widgets
                    </Link>
                  </li>
                  <li className="Divider">Microsites</li>
                  <li>
                    <Link to="/building-programs/microsites/quickstart-guide">
                      Microsite Quickstart Guide
                    </Link>
                  </li>
                  <li>
                    <Link to="/building-programs/microsites/microsite-editor">
                      SaaSquatch Microsite Editor
                    </Link>
                  </li>
                  <li>
                    <Link to="/building-programs/microsites/customizing-microsites">
                      Customizing Microsites
                    </Link>
                  </li>
                  <li>
                    <Link to="/setting-up-a-custom-subdomain-for-your-hosted-portal/">
                      Setting Up a Custom Domain for a Microsite
                    </Link>
                  </li>
                  <li className="Divider">Program Reference</li>
                  <li>
                    <Link to="/growth/quickstart">
                      Growth Automation Program General Quickstart
                    </Link>
                  </li>
                  <li>
                    <Link to="/growth/ga-mechanisms">
                      Growth Automation Program Mechanisms
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides/referral-quickstart">
                      Growth Automation Referral Program - Quickstart
                    </Link>
                  </li>
                  <li>
                    <Link to="/developer/purchase-object">
                      User Purchase &amp; Refund Event
                    </Link>
                  </li>
                  <li className="Divider">Program Resources</li>
                  <li>
                    <Link to="/features/user-segmentation">
                      User Segmentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/program-i18n">
                      Program Internationalization
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/program-and-portal-statistics">
                      Program and Portal Statistics
                    </Link>
                  </li>
                  <li>
                    <Link to="/success/gift-card-rewards">
                      Gift Card Rewards
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/rewards-fuel-tank">
                      Fuel Tank Rewards
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/reward-exchange">Reward Exchange</Link>
                  </li>
                  <li>
                    <Link to="/designer/short-tags">
                      Email Template Short Tags
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/reports/">Program Reports</Link>
                  </li>
                  <li className="Divider">W-9 Compliance</li>
                  <li>
                    <Link to="/features/w-9-compliance">W-9 Compliance</Link>
                  </li>
                  <li>
                    <Link to="/features/managing-w-9-compliance-for-participants">
                      Managing W-9 Compliance
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/configuring-your-reward-catalog-for-w-9">
                      Configuring your Rewards for W-9
                    </Link>
                  </li>
                  <li className="Divider">Imports</li>
                  <li>
                    <Link to="/guides/user-import/">Bulk User Import</Link>
                  </li>
                  <li>
                    <Link to="/guides/bulk-reward-redemption/">
                      Bulk Reward Redemption Import
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides/bulk-user-delete/">
                      Bulk User Delete Import
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides/event-import">Bulk Event Import</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="developerCenter">
            <Link to="/developer/">
              <i className="fa big fas fa-cog fa-2x"></i>
              Developer Center
            </Link>
            <ul>
              <li>
                <Link to="/developer/">
                  Dev Center Home
                  <br />
                  <small>Build on our SDKs, APIs and JS</small>
                </Link>
              </li>
              <li>
                <Link to="/guides/">
                  <i className="fa fa-fw small fa-code"></i>
                  Dev Guides
                </Link>
              </li>
              <li>
                <Link to="/topics/json-web-tokens">JSON Web Tokens</Link>
              </li>
              <li>
                <Link to="/developer/testing">Testing Best Practices</Link>
              </li>
              <li>
                <Link to="/developer/squatchjs">
                  <i className="fa fa-fw small fa-html5"></i>
                  Squatch.js
                </Link>
                <ul>
                  <li>
                    <Link to="/developer/squatchjs/">About squatch.js</Link>
                  </li>
                  <li>
                    <Link to="/developer/squatchjs/signed-requests">
                      Signed Requests
                    </Link>
                  </li>
                  <li>
                    <Link to="/developer/squatchjs/issue">Issue Code List</Link>
                  </li>

                  <li className="Divider">Version 2</li>

                  <li>
                    <Link to="/developer/squatchjs/v2">
                      squatch.js Quickstart
                    </Link>
                  </li>
                  <li>
                    <Link to="/developer/squatchjs/v2/advanced-use-cases">
                      squatch.js Advanced Use Cases
                    </Link>
                  </li>
                  <li>
                    <Link to="/developer/squatchjs/v2/reference">
                      squatch.js Reference
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/api/">
                  <i className="fa fa-fw fa-desktop"></i>
                  REST API
                </Link>
                <ul>
                  <li>
                    <Link to="/api/">API Overview</Link>
                  </li>
                  <li>
                    <Link to="/api/authentication">Authentication</Link>
                  </li>
                  <li>
                    <Link to="/api/openendpoints">API Open Endpoints</Link>
                  </li>
                  <li>
                    <Link to="/api/errors">Errors</Link>
                  </li>
                  <li className="Divider">Webhooks</li>
                  <li>
                    <Link to="/api/webhooks">Webhooks Overview</Link>
                  </li>
                  <li>
                    <Link to="/api/webhooks/security">Webhooks Security</Link>
                  </li>

                  <li className="Divider">API Reference</li>
                  <li>
                    <Link to="/api/methods">Full list of Methods</Link>
                  </li>

                  <ApiSidebar />
                  <li>
                    <Link to="/api/methods#hidden">Hidden Endpoints</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/graphql/reference/">
                  <Styles.GraphQLLogo className="fa fa-fw" />
                  GraphQL API
                </Link>
                <ul>
                  <li className="Divider">GraphQL Reference</li>
                  <li>
                    <Link to="/graphql/reference">Reference</Link>
                  </li>

                  <li className="Divider">GraphQL Tutorials</li>
                  <li>
                    <Link to="/graphql/custom-widget">
                      Custom Widget via GraphQL
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Styles.Container>
  );
}
