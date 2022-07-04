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
  justify-content: start;
  gap: 18px;
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

export const SidebarSVG: React.FC<SVGProps> = ({ width, viewBox, d }) => {
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
                <SmallLeafLink to="#">
                  Using the SaaSquatch Portal
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Navigating the SaaSquatch Portal
                </SmallLeafLink>
                <SmallLeafLink to="#">The Referral Feed</SmallLeafLink>
                <SmallLeafLink to="#">Program Analytics</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Growth Automation">
              <LeavesUl>
                <SmallLeafLink to="#">Growth Automation 101</SmallLeafLink>
                <SmallLeafLink to="#">
                  Growth Automation Customer Lifecycle
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  SaaSquatch Growth Automation Platform
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Referral Programs">
              <LeavesUl>
                <SmallLeafLink to="#">Referral Programs 101</SmallLeafLink>
                <SmallLeafLink to="#">
                  Referral Program Optimization
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  The SaaSquatch Referral Program Loop
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Referral Marketing Channels
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Referral Program Retargeting
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Referral Program Sharing Options
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Fraud and Security Management">
              <LeavesUl>
                <SmallLeafLink to="#">Security Management System</SmallLeafLink>
                <SmallLeafLink to="#">
                  Fraud, Security & Fake Referrals
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          {/* Building Programs starts here */}
          <CoreCategory to="#" title="Building Programs " icon={buildingIcon}>
            <DropDownMenuItem title="Programs">
              <LeavesUl>
                <SmallLeafLink to="#">
                  Growth Automation Program General Quickstart
                </SmallLeafLink>
                <DropDownMenuItem title="Program Library" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="#">Birthday & Anniversary</SmallLeafLink>
                    <SmallLeafLink to="#">
                      Referral Program With Objectives
                    </SmallLeafLink>
                    <SmallLeafLink to="#">Partner</SmallLeafLink>
                    <SmallLeafLink to="#">Win Back</SmallLeafLink>
                    <SmallLeafLink to="#">VIP</SmallLeafLink>
                    <SmallLeafLink to="#">Signup</SmallLeafLink>
                    <SmallLeafLink to="#">Regional Signup</SmallLeafLink>
                    <SmallLeafLink to="#">Profile Completion</SmallLeafLink>
                    <SmallLeafLink to="#">Points Rewards</SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>
                <SmallLeafLink to="#">
                  Growth Automation Program Mechanisms
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Growth Automational Referral Program - Quickstart
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Program Widget">
              <LeavesUl>
                <SmallLeafLink to="#">Customize Program Widgets</SmallLeafLink>
                <SmallLeafLink to="#">Custom Program Themes</SmallLeafLink>
                <SmallLeafLink to="#">Mobile Widget</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Rewards">
              <LeavesUl>
                <SmallLeafLink to="#">Program Reward Options</SmallLeafLink>
                <SmallLeafLink to="#">Gift Card Rewards</SmallLeafLink>
                <SmallLeafLink to="#">Fuel Tank Rewards</SmallLeafLink>
                <SmallLeafLink to="#">Reward Exchange</SmallLeafLink>
                <SmallLeafLink to="#">Conversion</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="#">User Segmentation</BigLeafLink>

            <DropDownMenuItem title="Program Emails">
              <LeavesUl>
                <SmallLeafLink to="#">
                  Designing Your Program Emails
                </SmallLeafLink>
                <SmallLeafLink to="#">Email Template Short Tags</SmallLeafLink>
                <SmallLeafLink to="#">Blocked Email Domains</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="W9 Compliance">
              <LeavesUl>
                <SmallLeafLink to="#">W-9 Compliance</SmallLeafLink>
                <SmallLeafLink to="#">
                  Configuring Your Rewards for W-9
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="#">Program Internationalization</BigLeafLink>
          </CoreCategory>

          {/* Running Programs starts here */}
          <CoreCategory
            to="#"
            title="Running Programs"
            icon={runningProgramsIcon}
          >
            <DropDownMenuItem title="Analytics and Reporting">
              <LeavesUl>
                <SmallLeafLink to="#">
                  Analytics Overview for Growth Automation Programs
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Program and Portal Statistics
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Understanding Your Program Analytics Data
                </SmallLeafLink>
                <SmallLeafLink to="#">Program Reports</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="User Management">
              <LeavesUl>
                <SmallLeafLink to="#">
                  Manual User Actions: Add a Reward, Referral or Event
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  Managing Existing User Rewards
                </SmallLeafLink>
                <SmallLeafLink to="#">
                  User Purchase & Refund Event
                </SmallLeafLink>
                <SmallLeafLink to="#">Participant Deletion</SmallLeafLink>
                <SmallLeafLink to="#">Attribution</SmallLeafLink>
                <SmallLeafLink to="#">Identification</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Bulk Imports">
              <LeavesUl>
                <SmallLeafLink to="#">Bulk User Import</SmallLeafLink>
                <SmallLeafLink to="#">
                  Bulk Reward Redemption Import
                </SmallLeafLink>
                <SmallLeafLink to="#">Bulk User Delete Import</SmallLeafLink>
                <SmallLeafLink to="#">Bulk Event Delete Import</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="#">Managing W-9 Compliance</BigLeafLink>
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
          >
            <DropDownMenuItem title="Salesforce">
              <LeavesUl>
                <SmallLeafLink to="#">User Guide</SmallLeafLink>
                <SmallLeafLink to="#">FAQ</SmallLeafLink>
                <SmallLeafLink to="#">Install Guide</SmallLeafLink>
                <SmallLeafLink to="#">Immediate Object Upsertion</SmallLeafLink>
                <SmallLeafLink to="#">
                  Using a Salesforce APEX Trigger to upsert a Lead
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="AppsFlyer">
              <LeavesUl>
                <SmallLeafLink to="#">Quickstart</SmallLeafLink>
                <SmallLeafLink to="#">Tech Reference</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="SFTP Import">
              <LeavesUl>
                <SmallLeafLink to="#">Configuration Guide</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Branch Metrics">
              <LeavesUl>
                <SmallLeafLink to="#">Quickstart</SmallLeafLink>
                <SmallLeafLink to="#">Reference</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Segment">
              <LeavesUl>
                <SmallLeafLink to="#">Integration</SmallLeafLink>
                <SmallLeafLink to="#">Integration 2</SmallLeafLink>
                <SmallLeafLink to="#">Subscription</SmallLeafLink>
                <SmallLeafLink to="#">Stream</SmallLeafLink>
                <SmallLeafLink to="#">
                  Segment Web Plugin Quickstart
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stripe">
              <LeavesUl>
                <SmallLeafLink to="#">Install Guide</SmallLeafLink>
                <SmallLeafLink to="#">
                  V2 Stripe Integration Install Guide
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="TangoCard">
              <LeavesUl>
                <SmallLeafLink to="#">Setup Guide</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Zapier">
              <LeavesUl>
                <SmallLeafLink to="#">Quickstart Guide</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Recurly">
              <LeavesUl>
                <SmallLeafLink to="#">
                  Classic Recurly Install Guide
                </SmallLeafLink>
                <SmallLeafLink to="#">Install Guide</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Stitch">
              <LeavesUl>
                <SmallLeafLink to="#">Integration Guide</SmallLeafLink>
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
                <SmallLeafLink to="#">SaaSquatch & Emails</SmallLeafLink>
                <SmallLeafLink to="#">Custom Short Domains</SmallLeafLink>
                <SmallLeafLink to="#">Referral Security</SmallLeafLink>
                <SmallLeafLink to="#">Account Structure</SmallLeafLink>
                <SmallLeafLink to="#">Marketo</SmallLeafLink>
                <SmallLeafLink to="#">Instapage</SmallLeafLink>
                <SmallLeafLink to="#">Custom User Fields</SmallLeafLink>
                <SmallLeafLink to="#">User Widget Types</SmallLeafLink>
                <SmallLeafLink to="#">Message Links</SmallLeafLink>
                <SmallLeafLink to="#">Conversion Tech Guide</SmallLeafLink>
                <SmallLeafLink to="#">Attribution Tech Guide</SmallLeafLink>
                <SmallLeafLink to="#">Breaking Changes</SmallLeafLink>
                <SmallLeafLink to="#">Common Pitfalls</SmallLeafLink>
                <SmallLeafLink to="#">
                  Writing a Web Component for SaaSquatch
                </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <DropDownMenuItem title="Squatch.js">
              <LeavesUl>
                <SmallLeafLink to="#">About</SmallLeafLink>
                <SmallLeafLink to="#">Signed Requests</SmallLeafLink>
                <SmallLeafLink to="#">
                  Issue Code List (list of 53 issue links)
                </SmallLeafLink>
                <Separator text="Version 2" />
                <SmallLeafLink to="#">Quickstart</SmallLeafLink>
                <SmallLeafLink to="#">Advanced Use Cases</SmallLeafLink>
                <SmallLeafLink to="#">Reference</SmallLeafLink>
                <SmallLeafLink to="#">Tracking Cookies</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>
            <DropDownMenuItem title="API">
              <LeavesUl>
                <DropDownMenuItem title="GraphQL API" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="#">GraphQL Reference</SmallLeafLink>
                    <SmallLeafLink to="#">
                      Custom Widget via GraphQL
                    </SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API " isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="#">API Overview</SmallLeafLink>
                    <SmallLeafLink to="#">Authentication</SmallLeafLink>
                    <SmallLeafLink to="#">API Open Endpoints</SmallLeafLink>
                    <SmallLeafLink to="#">Errors</SmallLeafLink>
                  </LeavesUl>
                </DropDownMenuItem>

                <DropDownMenuItem title="REST API Reference" isNestedDropDown>
                  <LeavesUl>
                    <SmallLeafLink to="#">Full list of Methods</SmallLeafLink>
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
                <SmallLeafLink to="#">Overview</SmallLeafLink>
                <SmallLeafLink to="#">Webhook Security</SmallLeafLink>
                <SmallLeafLink to="#">All methods</SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>

            <BigLeafLink to="#">JSON Web Tokens</BigLeafLink>
            <BigLeafLink to="#">Testing Best Practices</BigLeafLink>

            <DropDownMenuItem title="Mobile">
              <LeavesUl>
                <SmallLeafLink to="#">Android</SmallLeafLink>
                <SmallLeafLink to="#">iOS </SmallLeafLink>
              </LeavesUl>
            </DropDownMenuItem>
          </CoreCategory>

          <li>
            <CoreCategoryLink to="/product-news">
              <SidebarSVG
                width="85%"
                viewBox="0 0 22 22"
                d="M20.625 7.71718C21.4242 8.09531 22 9.11367 22 10.3125C22 11.5113 21.4242 12.5297 20.625 12.9078V19.25C20.625 19.8043 20.2898 20.307 19.7742 20.5219C19.2629 20.7324 18.6699 20.6164 18.2789 20.2211L16.4012 18.309C14.3387 16.2465 11.5414 15.125 8.62383 15.125H8.25V20.625C8.25 21.3855 7.63555 22 6.875 22H4.125C3.36574 22 2.75 21.3855 2.75 20.625V15.125C1.23105 15.125 0 13.8918 0 12.375V8.25C0 6.7332 1.23105 5.5 2.75 5.5H8.62383C11.5414 5.5 14.3387 4.33984 16.4012 2.2782L18.2789 0.402741C18.6699 0.00951264 19.2629 -0.108114 19.7742 0.10471C20.2898 0.317534 20.625 0.818979 20.625 1.375V7.71718ZM8.62383 8.25H8.25V12.375H8.62383C12.0527 12.375 15.3484 13.6555 17.875 15.9543V4.6707C15.3484 6.96953 12.0527 8.25 8.62383 8.25Z"
              />
              SaaSquatch Product News
            </CoreCategoryLink>
          </li>
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
