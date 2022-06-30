import { History } from "history";
import React, { useState } from "react";
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
  background-color: "white";
  color: #003b45;
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
  gap: 8px;
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
  justify-content: start;
  gap: 18px;
  padding: 8px 12px;
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

const LeafLink = styled(DropDownStyledLink as any)`
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  padding: 8px 10px;
`;

/* ul styles */

export const LeavesUl = styled.ul`
  list-style: none !important;
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

export const DivideLine = styled.li`
  height: 8px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 8px !important;
`;

/* Divs for spacing within each list item (space between SVG and text) */

const AllContentDiv = styled.div``;

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

export const SVGIcon: React.FC<SVGProps> = ({ width, viewBox, d }) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height="auto"
        viewBox={viewBox}
        fill="#003B45"
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

  return (
    <Styles.Container>
      <nav id="my-menu">
        <ul className="baseMenu">
          {/* Learning SaaSquatch starts here */}
          <CoreCategory to="#" title="Learning SaaSquatch" icon={learningIcon}>
            <DropDownMenuItem title="SaaSquatch Admin Portal">
              <LeavesUl>
                <LeafLink to="#">Using the SaaSquatch Portal</LeafLink>
                <LeafLink to="#">Navigating the SaaSquatch Portal</LeafLink>
                <LeafLink to="#">The Referral Feed</LeafLink>
                <LeafLink to="#">Program Analytics</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <LeavesUl>
                <LeafLink to="#">Growth Automation 101</LeafLink>
                <LeafLink to="#">Growth Automation Customer Lifecycle</LeafLink>
                <LeafLink to="#">
                  SaaSquatch Growth Automation Platform
                </LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <LeavesUl>
                <LeafLink to="#">Referral Programs 101</LeafLink>
                <LeafLink to="#">Referral Program Optimization</LeafLink>
                <LeafLink to="#">The SaaSquatch Referral Program Loop</LeafLink>
                <LeafLink to="#">Referral Marketing Channels</LeafLink>
                <LeafLink to="#">Referral Program Retargeting</LeafLink>
                <LeafLink to="#">Referral Program Sharing Options</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <LeavesUl>
                <LeafLink to="#">Security Management System</LeafLink>
                <LeafLink to="#">Fraud, Security & Fake Referrals</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Building Programs starts here */}
          <CoreCategory to="#" title="Building Programs " icon={buildingIcon}>
            <DropDownMenuItem title="Programs">
              <LeavesUl>
                <LeafLink to="#">
                  Growth Automation Program General Quickstart
                </LeafLink>
                <DropDownMenuItem title="Program Library" nestedDropDown>
                  <LeavesUl>
                    <LeafLink to="#">Birthday & Anniversary</LeafLink>
                    <LeafLink to="#">Referral Program With Objectives</LeafLink>
                    <LeafLink to="#">Partner</LeafLink>
                    <LeafLink to="#">Win Back</LeafLink>
                    <LeafLink to="#">VIP</LeafLink>
                    <LeafLink to="#">Signup</LeafLink>
                    <LeafLink to="#">Regional Signup</LeafLink>
                    <LeafLink to="#">Profile Completion</LeafLink>
                    <LeafLink to="#">Points Rewards</LeafLink>
                  </LeavesUl>
                </DropDownMenuItem>
                <LeafLink to="#">Growth Automation Program Mechanisms</LeafLink>
                <LeafLink to="#">
                  Growth Automational Referral Program - Quickstart
                </LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <LeavesUl>
                <LeafLink to="#">Customize Program Widgets</LeafLink>
                <LeafLink to="#">Custom Program Themes</LeafLink>
                <LeafLink to="#">Mobile Widget</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <LeavesUl>
                <LeafLink to="#">Program Reward Options</LeafLink>
                <LeafLink to="#">Gift Card Rewards</LeafLink>
                <LeafLink to="#">Fuel Tank Rewards</LeafLink>
                <LeafLink to="#">Reward Exchange</LeafLink>
                <LeafLink to="#">Conversion</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem
              title="User Segmentation"
              to="#"
            ></DropDownMenuItem>

            <DropDownMenuItem title="Program Emails">
              <LeavesUl>
                <LeafLink to="#">Designing Your Program Emails</LeafLink>
                <LeafLink to="#">Email Template Short Tags</LeafLink>
                <LeafLink to="#">Blocked Email Domains</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <LeavesUl>
                <LeafLink to="#">W-9 Compliance</LeafLink>
                <LeafLink to="#">Configuring Your Rewards for W-9</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem
              title="Program Internationalization"
              to="#"
            ></DropDownMenuItem>
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="#"
            title="Running Programs"
            icon={runningProgramsIcon}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <LeavesUl>
                <LeafLink to="#">
                  Analytics Overview for Growth Automation Programs
                </LeafLink>
                <LeafLink to="#">Program and Portal Statistics</LeafLink>
                <LeafLink to="#">
                  Understanding Your Program Analytics Data
                </LeafLink>
                <LeafLink to="#">Program Reports</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <LeavesUl>
                <LeafLink to="#">
                  Manual User Actions: Add a Reward, Referral or Event
                </LeafLink>
                <LeafLink to="#">Managing Existing User Rewards</LeafLink>
                <LeafLink to="#">User Purchase & Refund Event</LeafLink>
                <LeafLink to="#">Participant Deletion</LeafLink>
                <LeafLink to="#">Attribution</LeafLink>
                <LeafLink to="#">Identification</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <LeavesUl>
                <LeafLink to="#">Bulk User Import</LeafLink>
                <LeafLink to="#">Bulk Reward Redemption Import</LeafLink>
                <LeafLink to="#">Bulk User Delete Import</LeafLink>
                <LeafLink to="#">Bulk Event Delete Import</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem
              title="Managing W-9 Compliance"
              to="#"
            ></DropDownMenuItem>
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
          >
            <DropDownMenuItem title="Salesforce">
              <LeavesUl>
                <LeafLink to="#">User Guide</LeafLink>
                <LeafLink to="#">FAQ</LeafLink>
                <LeafLink to="#">Install Guide</LeafLink>
                <LeafLink to="#">Immediate Object Upsertion</LeafLink>
                <LeafLink to="#">
                  Using a Salesforce APEX Trigger to upsert a Lead
                </LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <LeavesUl>
                <LeafLink to="#">Quickstart</LeafLink>
                <LeafLink to="#">Tech Reference</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <LeavesUl>
                <LeafLink to="#">Configuration Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <LeavesUl>
                <LeafLink to="#">Quickstart</LeafLink>
                <LeafLink to="#">Reference</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <LeavesUl>
                <LeafLink to="#">Integration</LeafLink>
                <LeafLink to="#">Integration 2</LeafLink>
                <LeafLink to="#">Subscription</LeafLink>
                <LeafLink to="#">Stream</LeafLink>
                <LeafLink to="#">Segment Web Plugin Quickstart</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <LeavesUl>
                <LeafLink to="#">Install Guide</LeafLink>
                <LeafLink to="#">V2 Stripe Integration Install Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <LeavesUl>
                <LeafLink to="#">Setup Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <LeavesUl>
                <LeafLink to="#">Quickstart Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <LeavesUl>
                <LeafLink to="#">Classic Recurly Install Guide</LeafLink>
                <LeafLink to="#">Install Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <LeavesUl>
                <LeafLink to="#">Integration Guide</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Developer Resources starts here */}
          <CoreCategory to="#" title="Developer Resources" icon={devIcon}>
            <DropDownMenuItem title="Dev Guides">
              <LeavesUl>
                <LeafLink to="#">SaaSquatch & Emails</LeafLink>
                <LeafLink to="#">Custom Short Domains</LeafLink>
                <LeafLink to="#">Referral Security</LeafLink>
                <LeafLink to="#">Account Structure</LeafLink>
                <LeafLink to="#">Marketo</LeafLink>
                <LeafLink to="#">Instapage</LeafLink>
                <LeafLink to="#">Custom User Fields</LeafLink>
                <LeafLink to="#">User Widget Types</LeafLink>
                <LeafLink to="#">Message Links</LeafLink>
                <LeafLink to="#">Conversion Tech Guide</LeafLink>
                <LeafLink to="#">Attribution Tech Guide</LeafLink>
                <LeafLink to="#">Breaking Changes</LeafLink>
                <LeafLink to="#">Common Pitfalls</LeafLink>
                <LeafLink to="#">
                  Writing a Web Component for SaaSquatch
                </LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <LeavesUl>
                <LeafLink to="#">About</LeafLink>
                <LeafLink to="#">Signed Requests</LeafLink>
                <LeafLink to="#">
                  Issue Code List (list of 53 issue links)
                </LeafLink>
                <LeafLink to="#">Quickstart</LeafLink>
                <LeafLink to="#">Advanced Use Cases</LeafLink>
                <LeafLink to="#">Reference</LeafLink>
                <LeafLink to="#">Tracking Cookies</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>
            <DropDownMenuItem title="API">
              <LeavesUl>
                <DropDownMenuItem title="GraphQL API" nestedDropDown>
                  <LeavesUl>
                    <LeafLink to="#">GraphQL Reference</LeafLink>
                    <LeafLink to="#">Custom Widget via GraphQL</LeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API " nestedDropDown>
                  <LeavesUl>
                    <LeafLink to="#">API Overview</LeafLink>
                    <LeafLink to="#">Authentication</LeafLink>
                    <LeafLink to="#">API Open Endpoints</LeafLink>
                    <LeafLink to="#">Errors</LeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API Reference" nestedDropDown>
                  <LeavesUl>
                    <LeafLink to="#">Full list of Methods</LeafLink>
                    <DropDownMenuItem
                      title="Account (Account Overview)"
                      nestedDropDown
                    >
                      <LeavesUl>
                        <LeafLink to="#">Delete an account</LeafLink>
                      </LeavesUl>
                    </DropDownMenuItem>

                    <LeafLink to="#">User (User Overview)</LeafLink>
                    <LeafLink to="#">User Event (User Event Overview)</LeafLink>
                    <LeafLink to="#">
                      Share Links (Share Links Overview)
                    </LeafLink>
                    <LeafLink to="#">
                      Referral Code (Referral Code Overview)
                    </LeafLink>
                    <LeafLink to="#">Referral (Referral Overview)</LeafLink>
                    <LeafLink to="#">Reward Balance (RB Overview)</LeafLink>
                    <LeafLink to="#">Reward (Reward Overview)</LeafLink>
                    <LeafLink to="#">Export (Overview)</LeafLink>
                    <LeafLink to="#">Hidden Endpoints</LeafLink>
                  </LeavesUl>
                </DropDownMenuItem>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Webhook">
              <LeavesUl>
                <LeafLink to="#">Overview</LeafLink>
                <LeafLink to="#">Webhook Security</LeafLink>
                <LeafLink to="#">All methods</LeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="JSON Web Tokens" to="#"></DropDownMenuItem>
            <DropDownMenuItem
              title="Testing Best Practices"
              to="#"
            ></DropDownMenuItem>

            <DropDownMenuItem title="Mobile">
              <LeavesUl>
                <LeafLink to="#">Android</LeafLink>
                <LeafLink to="#">iOS </LeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* <li>
            <CoreCategoryLink to="/product-news">
              <SVGIcon
                width="85%"
                viewBox="0 0 22 22"
                d="M20.625 7.71718C21.4242 8.09531 22 9.11367 22 10.3125C22 11.5113 21.4242 12.5297 20.625 12.9078V19.25C20.625 19.8043 20.2898 20.307 19.7742 20.5219C19.2629 20.7324 18.6699 20.6164 18.2789 20.2211L16.4012 18.309C14.3387 16.2465 11.5414 15.125 8.62383 15.125H8.25V20.625C8.25 21.3855 7.63555 22 6.875 22H4.125C3.36574 22 2.75 21.3855 2.75 20.625V15.125C1.23105 15.125 0 13.8918 0 12.375V8.25C0 6.7332 1.23105 5.5 2.75 5.5H8.62383C11.5414 5.5 14.3387 4.33984 16.4012 2.2782L18.2789 0.402741C18.6699 0.00951264 19.2629 -0.108114 19.7742 0.10471C20.2898 0.317534 20.625 0.818979 20.625 1.375V7.71718ZM8.62383 8.25H8.25V12.375H8.62383C12.0527 12.375 15.3484 13.6555 17.875 15.9543V4.6707C15.3484 6.96953 12.0527 8.25 8.62383 8.25Z"
              />
              SaaSquatch Product News
            </CoreCategoryLink>
          </li> */}
        </ul>
      </nav>
    </Styles.Container>
  );
}

const CoreCategory = (props: {
  children: React.ReactNode;
  to: string;
  title: string;
  icon: SVGProps;
}) => {
  return (
    <CoreCategoryView {...useCoreCategoryHook()} {...props}>
      {props.children}
    </CoreCategoryView>
  );
};

const DropDownMenuItem = (props: {
  title: string;
  children?: React.ReactNode;
  to?: string;
  nestedDropDown?: boolean;
}) => {
  return (
    <MenuItemView
      {...useMenuItemHook()}
      title={props.title}
      nestedDropDown={props.nestedDropDown}
    >
      {props.children}
    </MenuItemView>
  );
};
