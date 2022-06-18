import React, { useEffect, useRef, useState } from "react";
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

import styled from "styled-components";
import { integrationsIcon, SVGProps } from "./components/icons";

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

const DropDownParent = styled(Link)`
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
// @ts-ignore
const Title = styled(DropDownParent)`
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

const CoreCategoryStyle = styled(DropDownParent)`
  justify-content: start;
  gap: 18px;
  padding: 8px 12px;
`;

const LeafStyle = styled(DropDownParent)`
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  border-left: 1px solid #003b45 !important;
  padding: 8px 10px;
`;

/* ul styles */

export const DropdownMenuList = styled.ul`
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
  height: 6px;
  border-bottom: 1px solid #e2e2e2;
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
          <li>
            <CoreCategoryStyle to="/product-news">
              <SVGIcon
                width="85%"
                viewBox="0 0 22 22"
                d="M20.625 7.71718C21.4242 8.09531 22 9.11367 22 10.3125C22 11.5113 21.4242 12.5297 20.625 12.9078V19.25C20.625 19.8043 20.2898 20.307 19.7742 20.5219C19.2629 20.7324 18.6699 20.6164 18.2789 20.2211L16.4012 18.309C14.3387 16.2465 11.5414 15.125 8.62383 15.125H8.25V20.625C8.25 21.3855 7.63555 22 6.875 22H4.125C3.36574 22 2.75 21.3855 2.75 20.625V15.125C1.23105 15.125 0 13.8918 0 12.375V8.25C0 6.7332 1.23105 5.5 2.75 5.5H8.62383C11.5414 5.5 14.3387 4.33984 16.4012 2.2782L18.2789 0.402741C18.6699 0.00951264 19.2629 -0.108114 19.7742 0.10471C20.2898 0.317534 20.625 0.818979 20.625 1.375V7.71718ZM8.62383 8.25H8.25V12.375H8.62383C12.0527 12.375 15.3484 13.6555 17.875 15.9543V4.6707C15.3484 6.96953 12.0527 8.25 8.62383 8.25Z"
              />
              SaaSquatch Product News
            </CoreCategoryStyle>
          </li>

          {/* Integrations starts here */}
          <CoreCategory
            to="/integrations/"
            title="Tester Integrations"
            icon={integrationsIcon}
          >
            <li>
              <Title to="/integrations/">
                {" "}
                <SVGIcon
                  width="70%"
                  viewBox="0 0 25 23"
                  d="M7.46962 1.73771L11.6363 0.157845C12.1918 -0.052615 12.8082 -0.052615 13.3637 0.157845L17.5304 1.73771C18.4722 2.09578 19.0972 3.00029 19.0972 4.01028V8.8792C19.1536 8.89656 19.2101 8.91392 19.2665 8.89656L23.4332 10.5155C24.375 10.8714 25 11.7785 25 12.7854V17.9591C25 18.9226 24.4314 19.795 23.546 20.1813L19.3793 22.0129C18.7587 22.2907 18.0469 22.2907 17.4262 22.0129L12.5 19.8514L7.57378 22.0129C6.95312 22.2907 6.24132 22.2907 5.62066 22.0129L1.45226 20.1813C0.569878 19.795 0 18.9226 0 17.9591V12.7854C0 11.7785 0.624566 10.8714 1.56901 10.5155L5.73351 8.89656C5.78993 8.91392 5.84635 8.89656 5.90278 8.8792V4.01028C5.90278 3.00029 6.52778 2.09578 7.46962 1.73771ZM12.6215 2.10576C12.5434 2.07581 12.4175 2.07581 12.3785 2.10576L8.97569 3.39526L12.4609 4.74725L16.0243 3.39526L12.6215 2.10576ZM17.0139 9.13528V5.24639L13.4375 6.61791V10.4894L17.0139 9.13528ZM6.71875 10.8844C6.64062 10.854 6.51476 10.854 6.47569 10.8844L3.07335 12.1735L6.59722 13.5233L10.1215 12.1735L6.71875 10.8844ZM7.53472 19.7559L11.1111 18.1848V14.0224L7.53472 15.394V19.7559ZM14.8785 12.1735L18.4028 13.5233L21.9271 12.1735L18.5243 10.8844C18.4462 10.854 18.3203 10.854 18.2812 10.8844L14.8785 12.1735ZM22.9167 17.9591V14.0224L19.3403 15.394V19.7559L22.7083 18.2759C22.8342 18.2195 22.9167 18.0979 22.9167 17.9591Z"
                />
                Integrations
              </Title>
            </li>
            <DivideLine />
            <li>
              <DropDownParent>
                Salesforce
                <SVGIcon
                  width="12px"
                  viewBox="0 0 12 8"
                  d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                />
              </DropDownParent>
            </li>
            <DropdownMenuList>
              <Leaf to="/salesforce/">Salesforce Integration</Leaf>
              <Leaf to="/salesforce/user-guide/">Salesforce User Guide</Leaf>
              <Leaf to="/salesforce/faq/">Salesforce FAQ</Leaf>
              <Leaf to="/salesforce/install-guide/">
                Salesforce Install Guide
              </Leaf>
            </DropdownMenuList>
          </CoreCategory>
          <li>
            <CoreCategoryStyle to="/integrations/">
              <SVGIcon
                width="100%"
                viewBox="0 0 25 23"
                d="M7.46962 1.73771L11.6363 0.157845C12.1918 -0.052615 12.8082 -0.052615 13.3637 0.157845L17.5304 1.73771C18.4722 2.09578 19.0972 3.00029 19.0972 4.01028V8.8792C19.1536 8.89656 19.2101 8.91392 19.2665 8.89656L23.4332 10.5155C24.375 10.8714 25 11.7785 25 12.7854V17.9591C25 18.9226 24.4314 19.795 23.546 20.1813L19.3793 22.0129C18.7587 22.2907 18.0469 22.2907 17.4262 22.0129L12.5 19.8514L7.57378 22.0129C6.95312 22.2907 6.24132 22.2907 5.62066 22.0129L1.45226 20.1813C0.569878 19.795 0 18.9226 0 17.9591V12.7854C0 11.7785 0.624566 10.8714 1.56901 10.5155L5.73351 8.89656C5.78993 8.91392 5.84635 8.89656 5.90278 8.8792V4.01028C5.90278 3.00029 6.52778 2.09578 7.46962 1.73771ZM12.6215 2.10576C12.5434 2.07581 12.4175 2.07581 12.3785 2.10576L8.97569 3.39526L12.4609 4.74725L16.0243 3.39526L12.6215 2.10576ZM17.0139 9.13528V5.24639L13.4375 6.61791V10.4894L17.0139 9.13528ZM6.71875 10.8844C6.64062 10.854 6.51476 10.854 6.47569 10.8844L3.07335 12.1735L6.59722 13.5233L10.1215 12.1735L6.71875 10.8844ZM7.53472 19.7559L11.1111 18.1848V14.0224L7.53472 15.394V19.7559ZM14.8785 12.1735L18.4028 13.5233L21.9271 12.1735L18.5243 10.8844C18.4462 10.854 18.3203 10.854 18.2812 10.8844L14.8785 12.1735ZM22.9167 17.9591V14.0224L19.3403 15.394V19.7559L22.7083 18.2759C22.8342 18.2195 22.9167 18.0979 22.9167 17.9591Z"
              />
              Integrations
            </CoreCategoryStyle>
            {/* Integrations Subcategories */}
            <ul>
              <li>
                <Title to="/integrations/">
                  {" "}
                  <SVGIcon
                    width="70%"
                    viewBox="0 0 25 23"
                    d="M7.46962 1.73771L11.6363 0.157845C12.1918 -0.052615 12.8082 -0.052615 13.3637 0.157845L17.5304 1.73771C18.4722 2.09578 19.0972 3.00029 19.0972 4.01028V8.8792C19.1536 8.89656 19.2101 8.91392 19.2665 8.89656L23.4332 10.5155C24.375 10.8714 25 11.7785 25 12.7854V17.9591C25 18.9226 24.4314 19.795 23.546 20.1813L19.3793 22.0129C18.7587 22.2907 18.0469 22.2907 17.4262 22.0129L12.5 19.8514L7.57378 22.0129C6.95312 22.2907 6.24132 22.2907 5.62066 22.0129L1.45226 20.1813C0.569878 19.795 0 18.9226 0 17.9591V12.7854C0 11.7785 0.624566 10.8714 1.56901 10.5155L5.73351 8.89656C5.78993 8.91392 5.84635 8.89656 5.90278 8.8792V4.01028C5.90278 3.00029 6.52778 2.09578 7.46962 1.73771ZM12.6215 2.10576C12.5434 2.07581 12.4175 2.07581 12.3785 2.10576L8.97569 3.39526L12.4609 4.74725L16.0243 3.39526L12.6215 2.10576ZM17.0139 9.13528V5.24639L13.4375 6.61791V10.4894L17.0139 9.13528ZM6.71875 10.8844C6.64062 10.854 6.51476 10.854 6.47569 10.8844L3.07335 12.1735L6.59722 13.5233L10.1215 12.1735L6.71875 10.8844ZM7.53472 19.7559L11.1111 18.1848V14.0224L7.53472 15.394V19.7559ZM14.8785 12.1735L18.4028 13.5233L21.9271 12.1735L18.5243 10.8844C18.4462 10.854 18.3203 10.854 18.2812 10.8844L14.8785 12.1735ZM22.9167 17.9591V14.0224L19.3403 15.394V19.7559L22.7083 18.2759C22.8342 18.2195 22.9167 18.0979 22.9167 17.9591Z"
                  />
                  Integrations
                </Title>
              </li>
              <DivideLine />
              <li>
                <DropDownParent>
                  Salesforce
                  <SVGIcon
                    width="12px"
                    viewBox="0 0 12 8"
                    d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                  />
                </DropDownParent>
              </li>
              <DropdownMenuList>
                <Leaf to="/salesforce/">Salesforce Integration</Leaf>
                <Leaf to="/salesforce/user-guide/">Salesforce User Guide</Leaf>
                <Leaf to="/salesforce/faq/">Salesforce FAQ</Leaf>
                <Leaf to="/salesforce/install-guide/">
                  Salesforce Install Guide
                </Leaf>
              </DropdownMenuList>
            </ul>
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
    <li>
      <CoreCategoryStyle to={props.to}>
        <SVGIcon {...props.icon} />
        {props.title}
        <ul>{props.children}</ul>
      </CoreCategoryStyle>
    </li>
  );
};

const Leaf = (props: { to: string; children: React.ReactNode }) => {
  return <LeafStyle to={props.to}>{props.children}</LeafStyle>;
};
