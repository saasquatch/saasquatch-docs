import { History } from "history";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import useBrowserEffect from "src/util/useBrowserEffect";
// import "mmenu-js/dist/mmenu.css"
import styled from "styled-components";
import { createContainer } from "unstated-next";
import {
  integrationsIcon,
  runningProgramsIcon,
  SVGProps,
} from "./components/icons";
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

const Title = styled(DropDownStyledLink as any)`
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

const CoreCategoryLink = styled(DropDownStyledLink as any)`
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
  border-left: 1px solid #003b45 !important;
  padding: 8px 10px;
`;

/* ul styles */

export const LeavesUl = styled.ul`
  list-style: none !important;
  margin-left: 12px !important;
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

const DivideLine = styled.li`
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
          {/* Running Programs starts here */}
          <CoreCategory
            to="#"
            title="Running Programs"
            icon={runningProgramsIcon}
          >
            <DropDownLi title="Analytics and Reporting">
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
            </DropDownLi>

            <DropDownLi title="User Management">
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
            </DropDownLi>

            <DropDownLi title="Bulk Imports">
              <LeavesUl>
                <LeafLink to="#">Bulk User Import</LeafLink>
                <LeafLink to="#">Bulk Reward Redemption Import</LeafLink>
                <LeafLink to="#">Bulk User Delete Import</LeafLink>
                <LeafLink to="#">Bulk Event Delete Import</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Managing W-9 Compliance" to="#"></DropDownLi>
          </CoreCategory>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Integrations"
            icon={integrationsIcon}
          >
            <DropDownLi title="Salesforce">
              <LeavesUl>
                <LeafLink to="#">User Guide</LeafLink>
                <LeafLink to="#">FAQ</LeafLink>
                <LeafLink to="#">Install Guide</LeafLink>
                <LeafLink to="#">Immediate Object Upsertion</LeafLink>
                <LeafLink to="#">
                  Using a Salesforce APEX Trigger to upsert a Lead
                </LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="AppsFlyer">
              <LeavesUl>
                <LeafLink to="#">Quickstart</LeafLink>
                <LeafLink to="#">Tech Reference</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="SFTP Import">
              <LeavesUl>
                <LeafLink to="#">Configuration Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Branch Metrics">
              <LeavesUl>
                <LeafLink to="#">Quickstart</LeafLink>
                <LeafLink to="#">Reference</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Segment">
              <LeavesUl>
                <LeafLink to="#">Integration</LeafLink>
                <LeafLink to="#">Integration 2</LeafLink>
                <LeafLink to="#">Subscription</LeafLink>
                <LeafLink to="#">Stream</LeafLink>
                <LeafLink to="#">Segment Web Plugin Quickstart</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Stripe">
              <LeavesUl>
                <LeafLink to="#">Install Guide</LeafLink>
                <LeafLink to="#">V2 Stripe Integration Install Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="TangoCard">
              <LeavesUl>
                <LeafLink to="#">Setup Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Zapier">
              <LeavesUl>
                <LeafLink to="#">Quickstart Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Recurly">
              <LeavesUl>
                <LeafLink to="#">Classic Recurly Install Guide</LeafLink>
                <LeafLink to="#">Install Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>

            <DropDownLi title="Stitch">
              <LeavesUl>
                <LeafLink to="#">Integration Guide</LeafLink>
              </LeavesUl>
            </DropDownLi>
          </CoreCategory>

          <li>
            <CoreCategoryLink to="/product-news">
              <SVGIcon
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
    <li className="right-arrow">
      <CoreCategoryLink to={props.to}>
        <SVGIcon {...props.icon} />
        {props.title}
      </CoreCategoryLink>
      <ul>
        <li>
          <Title to={props.to}>
            {" "}
            <SVGIcon {...props.icon} width="70%" />
            {props.title}
          </Title>
        </li>
        <DivideLine />
        {props.children}
      </ul>
    </li>
  );
};

const DropDownLi = (props: {
  title: string;
  children?: React.ReactNode;
  to?: string;
}) => {
  return (
    <MenuItemView {...useMenuItemHook()} title={props.title}>
      {props.children}
    </MenuItemView>
  );
};
