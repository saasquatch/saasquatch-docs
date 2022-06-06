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

/* Styled Components */

/* Styled Link (should change style when clicked) */
/* Parameter: clicked (boolean) */
/* if: "?"" else: ":" */
const StyledLink = styled(Link)`
  background-color: ${(props) => (props.clicked ? "#003B45" : "white")};
  color: ${(props) => (props.clicked ? "white" : "#003B45")} !important;
  font-weight: ${(props) => (props.dropdownSelected ? "700" : "400")};

  &:hover {
    background-color: ${(props) => (props.clicked ? "#003B45" : "#e7edee")};
  }
`;

/* ul styles */
const BigSectionUl = styled.ul``;

const SmallSectionUl = styled.ul`
  list-style: none !important;
  border-left: 1px solid #003b45 !important;
  margin-left: 12px !important;
`;

/* Different list items in order of size */
const CoreCatSectionLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 65px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const CoreHeaderLi = styled.li`
  font-size: 16px;
  line-height: 24px;
`;

const BigSectionLi = styled.li`
  font-size: 16px;
  line-height: 24px;
`;

const SmallSectionLi = styled.li`
  font-size: 14px;
  line-height: 21px;
  color: #003b45;
  padding: 8px 10px;
`;

const DividerLi = styled.li`
  height: 6px;
  border-bottom: 1px solid #e2e2e2;
`;

/* Divs for spacing within each list item (space between SVG and text) */
const ListItemContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

// @ts-ignore
const CoreHeaderDiv = styled(ListItemContentDiv)`
  gap: 8px;
`;

const ListItemWithCaretDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
const SeperatorLi = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 11px;
  gap: 10px;
`;

const SeperatorTextP = styled.p`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  margin: 0 !important;
`;

const SeperatorLineDiv = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e2e2e2;
`;

/* Referral code list items styled components (contain buttons and different layout than other list items) */
const ReferralCodeLi = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 21px;
  padding: 8px 0;
  padding-left: 11px;
  gap: 4px;
  &:hover,
  :focus {
    background-color: #e7edee;
  }
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

/* Experimental stuff */
const TestSectionLi = styled.li`
  width: 100%;
  padding: 8px 10px;
  &:hover {
    background-color: #e7edee;
  }
`;

const TestA = styled.a`
  font-size: 14px;
  color: #003b45;
  &:hover {
    background-color: #e7edee;
  }

  &:visited {
    background-color: #003b45 !important;
  }
`;

/* SVG icon container and render function */
const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: auto;
`;

const SVGIcon: React.FC<SVGProps> = ({
  fill,
  width,
  height = "auto",
  viewBox,
  d,
  clicked,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height={height}
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

  /* Clicked list item changes, will be applied to StyledLink */
  /* This allows us to set the value of currentPage */
  const [currentPage, setcurrentPage] = useState<string>("/");
  // To change currentPage: setcurrentPage(true) OR setcurrentPage(false)

  const [currentDropdown, setCurrentDropdown] = useState<string>("");

  useEffect(() => {
    console.log(window.location.pathname);
    switch (window.location.pathname) {
      case "/product-news":
        setcurrentPage("/product-news");
        break;
      case "/success/":
        setcurrentPage("/success/");
        break;
      case "/developer/":
        setcurrentPage("/developer/");
        break;
      case "/integrations/":
        setcurrentPage("/integrations/");
        break;
      default:
        setcurrentPage("/");
    }
  }, [window.location.pathname]);
  // when this is updated, useEffect runs again

  return (
    <Styles.Container>
      <nav id="my-menu">
        <ul className="baseMenu">
          <CoreCatSectionLi>
            {/* When history changes (something is clicked) then useEffect will update the value of currentPage */}
            <StyledLink
              to="/product-news"
              clicked={currentPage === "/product-news"}
            >
              <ListItemContentDiv>
                <SVGIcon
                  clicked={currentPage === "/product-news"}
                  width="85%"
                  viewBox="0 0 22 22"
                  d="M20.625 7.71718C21.4242 8.09531 22 9.11367 22 10.3125C22 11.5113 21.4242 12.5297 20.625 12.9078V19.25C20.625 19.8043 20.2898 20.307 19.7742 20.5219C19.2629 20.7324 18.6699 20.6164 18.2789 20.2211L16.4012 18.309C14.3387 16.2465 11.5414 15.125 8.62383 15.125H8.25V20.625C8.25 21.3855 7.63555 22 6.875 22H4.125C3.36574 22 2.75 21.3855 2.75 20.625V15.125C1.23105 15.125 0 13.8918 0 12.375V8.25C0 6.7332 1.23105 5.5 2.75 5.5H8.62383C11.5414 5.5 14.3387 4.33984 16.4012 2.2782L18.2789 0.402741C18.6699 0.00951264 19.2629 -0.108114 19.7742 0.10471C20.2898 0.317534 20.625 0.818979 20.625 1.375V7.71718ZM8.62383 8.25H8.25V12.375H8.62383C12.0527 12.375 15.3484 13.6555 17.875 15.9543V4.6707C15.3484 6.96953 12.0527 8.25 8.62383 8.25Z"
                />
                SaaSquatch Product News
              </ListItemContentDiv>
            </StyledLink>
          </CoreCatSectionLi>

          <CoreCatSectionLi>
            <StyledLink>
              <ListItemContentDiv>
                <SVGIcon
                  width="100%"
                  viewBox="0 0 65 38"
                  d="M43.3333 8.125C41.3359 8.125 39.7222 6.50508 39.7222 4.5C39.7222 2.49492 41.3359 0.875 43.3333 0.875H61.3889C63.3863 0.875 65 2.49492 65 4.5V22.625C65 24.6301 63.3863 26.25 61.3889 26.25C59.3915 26.25 57.7778 24.6301 57.7778 22.625V13.2566L38.6615 32.4352C37.2509 33.8512 34.9714 33.8512 33.5608 32.4352L21.5651 20.5066L6.16484 36.0602C4.75425 37.4762 2.46797 37.4762 1.0576 36.0602C-0.352535 34.6441 -0.352535 32.3559 1.0576 30.9398L19.1163 12.8148C20.5269 11.3988 22.8064 11.3988 24.217 12.8148L36.1111 24.7434L52.6658 8.02305L43.3333 8.125Z"
                />
                Success Center
              </ListItemContentDiv>
            </StyledLink>
            {/* Success Center Subcategories */}
            <BigSectionUl>
              <CoreHeaderLi>
                <StyledLink to="/success/">
                  {" "}
                  <CoreHeaderDiv>
                    <SVGIcon
                      width="70%"
                      viewBox="0 0 65 38"
                      d="M43.3333 8.125C41.3359 8.125 39.7222 6.50508 39.7222 4.5C39.7222 2.49492 41.3359 0.875 43.3333 0.875H61.3889C63.3863 0.875 65 2.49492 65 4.5V22.625C65 24.6301 63.3863 26.25 61.3889 26.25C59.3915 26.25 57.7778 24.6301 57.7778 22.625V13.2566L38.6615 32.4352C37.2509 33.8512 34.9714 33.8512 33.5608 32.4352L21.5651 20.5066L6.16484 36.0602C4.75425 37.4762 2.46797 37.4762 1.0576 36.0602C-0.352535 34.6441 -0.352535 32.3559 1.0576 30.9398L19.1163 12.8148C20.5269 11.3988 22.8064 11.3988 24.217 12.8148L36.1111 24.7434L52.6658 8.02305L43.3333 8.125Z"
                    />
                    Success Center
                  </CoreHeaderDiv>
                </StyledLink>
              </CoreHeaderLi>
              <DividerLi />
              <BigSectionLi>
                <StyledLink
                  to="/growth/ga-101"
                  onClick={() =>
                    currentDropdown === "growthAuto"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("growthAuto")
                  }
                  dropdownSelected={currentDropdown === "growthAuto"}
                >
                  <ListItemWithCaretDiv>
                    Growth Automation
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "growthAuto" && (
                  <SmallSectionUl>
                    <TestA href="/growth/ga-101">
                      <TestSectionLi>Test Section</TestSectionLi>
                    </TestA>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "referralPrograms"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("referralPrograms")
                  }
                  dropdownSelected={currentDropdown === "referralPrograms"}
                >
                  <ListItemWithCaretDiv>
                    Referral Programs
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "referralPrograms" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "programReferences"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("programReferences")
                  }
                  dropdownSelected={currentDropdown === "programReferences"}
                >
                  <ListItemWithCaretDiv>
                    Program References
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "programReferences" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "adminPortal"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("adminPortal")
                  }
                  dropdownSelected={currentDropdown === "adminPortal"}
                >
                  <ListItemWithCaretDiv>
                    Administration Portal
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "adminPortal" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "programReference"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("programReference")
                  }
                  dropdownSelected={currentDropdown === "programReference"}
                >
                  <ListItemWithCaretDiv>
                    Program Reference
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "programReference" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "programResources"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("programResources")
                  }
                  dropdownSelected={currentDropdown === "programResources"}
                >
                  <ListItemWithCaretDiv>
                    Program Resources
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "programResources" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "w9Compliance"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("w9Compliance")
                  }
                  dropdownSelected={currentDropdown === "w9Compliance"}
                >
                  <ListItemWithCaretDiv>
                    W-9 Compliance
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "w9Compliance" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "imports"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("imports")
                  }
                  dropdownSelected={currentDropdown === "imports"}
                >
                  <ListItemWithCaretDiv>
                    Imports
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "imports" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>
            </BigSectionUl>
          </CoreCatSectionLi>

          <CoreCatSectionLi>
            <StyledLink to="/developer/">
              <ListItemContentDiv>
                <SVGIcon
                  width="100%"
                  viewBox="0 0 54 44"
                  d="M34.9923 3.94858L24.201 41.4603C23.7879 42.8837 22.2957 43.7042 20.8624 43.3023C19.4292 42.8921 18.603 41.4101 19.0077 39.9867L29.799 2.47661C30.2121 1.05371 31.7043 0.22981 33.1375 0.636401C34.5708 1.04291 35.397 2.52601 34.9923 3.94858ZM43.7434 10.698L53.1858 20.0757C54.2396 21.1224 54.2396 22.8137 53.1858 23.8603L43.7434 33.238C42.6895 34.2847 40.9865 34.2847 39.9327 33.238C38.8789 32.1914 38.8789 30.5001 39.9327 29.4535L47.4613 21.968L39.9327 14.4826C38.8789 13.436 38.8789 11.7446 39.9327 10.698C40.9865 9.6514 42.6895 9.6514 43.7434 10.698ZM14.0673 14.4826L6.53445 21.968L14.0673 29.4535C15.1211 30.5001 15.1211 32.1914 14.0673 33.238C13.0134 34.2847 11.3104 34.2847 10.2566 33.238L0.811854 23.8603C-0.241647 22.8137 -0.241647 21.1224 0.811854 20.0757L10.2566 10.698C11.3104 9.6514 13.0134 9.6514 14.0673 10.698C15.1211 11.7446 15.1211 13.436 14.0673 14.4826Z"
                />
                Developer Center
              </ListItemContentDiv>
            </StyledLink>
            {/* Developer Center Subcategories */}
            <BigSectionUl>
              <CoreHeaderLi>
                <StyledLink to="/developer/">
                  {" "}
                  <CoreHeaderDiv>
                    <SVGIcon
                      width="70%"
                      viewBox="0 0 54 44"
                      d="M34.9923 3.94858L24.201 41.4603C23.7879 42.8837 22.2957 43.7042 20.8624 43.3023C19.4292 42.8921 18.603 41.4101 19.0077 39.9867L29.799 2.47661C30.2121 1.05371 31.7043 0.22981 33.1375 0.636401C34.5708 1.04291 35.397 2.52601 34.9923 3.94858ZM43.7434 10.698L53.1858 20.0757C54.2396 21.1224 54.2396 22.8137 53.1858 23.8603L43.7434 33.238C42.6895 34.2847 40.9865 34.2847 39.9327 33.238C38.8789 32.1914 38.8789 30.5001 39.9327 29.4535L47.4613 21.968L39.9327 14.4826C38.8789 13.436 38.8789 11.7446 39.9327 10.698C40.9865 9.6514 42.6895 9.6514 43.7434 10.698ZM14.0673 14.4826L6.53445 21.968L14.0673 29.4535C15.1211 30.5001 15.1211 32.1914 14.0673 33.238C13.0134 34.2847 11.3104 34.2847 10.2566 33.238L0.811854 23.8603C-0.241647 22.8137 -0.241647 21.1224 0.811854 20.0757L10.2566 10.698C11.3104 9.6514 13.0134 9.6514 14.0673 10.698C15.1211 11.7446 15.1211 13.436 14.0673 14.4826Z"
                    />
                    Developer Center
                  </CoreHeaderDiv>
                </StyledLink>
              </CoreHeaderLi>
              <DividerLi />

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "devGuides"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("devGuides")
                  }
                  dropdownSelected={currentDropdown === "devGuides"}
                >
                  <ListItemWithCaretDiv>
                    Dev Guides
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "devGuides" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "jsonWeb"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("jsonWeb")
                  }
                  dropdownSelected={currentDropdown === "jsonWeb"}
                >
                  <ListItemWithCaretDiv>
                    JSON Web Tokens
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "jsonWeb" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "bestPractices"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("bestPractices")
                  }
                  dropdownSelected={currentDropdown === "bestPractices"}
                >
                  <ListItemWithCaretDiv>
                    Testing Best Practices
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "bestPractices" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>
              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "squatchJS"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("squatchJS")
                  }
                  dropdownSelected={currentDropdown === "squatchJS"}
                >
                  <ListItemWithCaretDiv>
                    Squatch.js
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "squatchJS" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>About Squatch.js</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Signed Requests</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Salesforce FAQ</StyledLink>
                    </SmallSectionLi>
                    <SeperatorLi>
                      <SeperatorTextP>Version 2</SeperatorTextP>{" "}
                      <SeperatorLineDiv />
                    </SeperatorLi>
                    <SmallSectionLi>
                      <StyledLink>Squatch.js Quickstart</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Squatch.js Advanced Use Cases</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Squatch.js Reference</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "restAPI"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("restAPI")
                  }
                  dropdownSelected={currentDropdown === "restAPI"}
                >
                  <ListItemWithCaretDiv>
                    REST API
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "restAPI" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Errors</StyledLink>
                    </SmallSectionLi>
                    <SeperatorLi>
                      <SeperatorTextP>Version 2</SeperatorTextP>{" "}
                      <SeperatorLineDiv />
                    </SeperatorLi>
                    <ReferralCodeLi>
                      <StyledLink>Lookup a referral code</StyledLink>
                      <ButtonsContainerDiv>
                        <GreenButton>Get</GreenButton>
                      </ButtonsContainerDiv>
                    </ReferralCodeLi>
                    <ReferralCodeLi>
                      <StyledLink>Lookup a referral code</StyledLink>
                      <ButtonsContainerDiv>
                        <GreenButton>Get</GreenButton>
                        <GreyButton>Open Endpoint</GreyButton>
                      </ButtonsContainerDiv>
                    </ReferralCodeLi>
                    <ReferralCodeLi>
                      <StyledLink>Apply a referral code</StyledLink>
                      <ButtonsContainerDiv>
                        <OrangeButton>Get</OrangeButton>
                        <GreyButton>Open Endpoint</GreyButton>
                      </ButtonsContainerDiv>
                    </ReferralCodeLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "restAPI"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("restAPI")
                  }
                  dropdownSelected={currentDropdown === "restAPI"}
                >
                  <ListItemWithCaretDiv>
                    GraphQL API
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "restAPI" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>
            </BigSectionUl>
          </CoreCatSectionLi>

          {/* Integrations starts here */}
          <CoreCatSectionLi>
            <StyledLink to="/integrations/">
              <ListItemContentDiv>
                <SVGIcon
                  width="100%"
                  viewBox="0 0 25 23"
                  d="M7.46962 1.73771L11.6363 0.157845C12.1918 -0.052615 12.8082 -0.052615 13.3637 0.157845L17.5304 1.73771C18.4722 2.09578 19.0972 3.00029 19.0972 4.01028V8.8792C19.1536 8.89656 19.2101 8.91392 19.2665 8.89656L23.4332 10.5155C24.375 10.8714 25 11.7785 25 12.7854V17.9591C25 18.9226 24.4314 19.795 23.546 20.1813L19.3793 22.0129C18.7587 22.2907 18.0469 22.2907 17.4262 22.0129L12.5 19.8514L7.57378 22.0129C6.95312 22.2907 6.24132 22.2907 5.62066 22.0129L1.45226 20.1813C0.569878 19.795 0 18.9226 0 17.9591V12.7854C0 11.7785 0.624566 10.8714 1.56901 10.5155L5.73351 8.89656C5.78993 8.91392 5.84635 8.89656 5.90278 8.8792V4.01028C5.90278 3.00029 6.52778 2.09578 7.46962 1.73771ZM12.6215 2.10576C12.5434 2.07581 12.4175 2.07581 12.3785 2.10576L8.97569 3.39526L12.4609 4.74725L16.0243 3.39526L12.6215 2.10576ZM17.0139 9.13528V5.24639L13.4375 6.61791V10.4894L17.0139 9.13528ZM6.71875 10.8844C6.64062 10.854 6.51476 10.854 6.47569 10.8844L3.07335 12.1735L6.59722 13.5233L10.1215 12.1735L6.71875 10.8844ZM7.53472 19.7559L11.1111 18.1848V14.0224L7.53472 15.394V19.7559ZM14.8785 12.1735L18.4028 13.5233L21.9271 12.1735L18.5243 10.8844C18.4462 10.854 18.3203 10.854 18.2812 10.8844L14.8785 12.1735ZM22.9167 17.9591V14.0224L19.3403 15.394V19.7559L22.7083 18.2759C22.8342 18.2195 22.9167 18.0979 22.9167 17.9591Z"
                />
                Integrations
              </ListItemContentDiv>
            </StyledLink>
            {/* Integrations Subcategories */}
            <BigSectionUl>
              <CoreHeaderLi>
                <StyledLink to="/integrations/">
                  {" "}
                  <CoreHeaderDiv>
                    <SVGIcon
                      width="70%"
                      viewBox="0 0 25 23"
                      d="M7.46962 1.73771L11.6363 0.157845C12.1918 -0.052615 12.8082 -0.052615 13.3637 0.157845L17.5304 1.73771C18.4722 2.09578 19.0972 3.00029 19.0972 4.01028V8.8792C19.1536 8.89656 19.2101 8.91392 19.2665 8.89656L23.4332 10.5155C24.375 10.8714 25 11.7785 25 12.7854V17.9591C25 18.9226 24.4314 19.795 23.546 20.1813L19.3793 22.0129C18.7587 22.2907 18.0469 22.2907 17.4262 22.0129L12.5 19.8514L7.57378 22.0129C6.95312 22.2907 6.24132 22.2907 5.62066 22.0129L1.45226 20.1813C0.569878 19.795 0 18.9226 0 17.9591V12.7854C0 11.7785 0.624566 10.8714 1.56901 10.5155L5.73351 8.89656C5.78993 8.91392 5.84635 8.89656 5.90278 8.8792V4.01028C5.90278 3.00029 6.52778 2.09578 7.46962 1.73771ZM12.6215 2.10576C12.5434 2.07581 12.4175 2.07581 12.3785 2.10576L8.97569 3.39526L12.4609 4.74725L16.0243 3.39526L12.6215 2.10576ZM17.0139 9.13528V5.24639L13.4375 6.61791V10.4894L17.0139 9.13528ZM6.71875 10.8844C6.64062 10.854 6.51476 10.854 6.47569 10.8844L3.07335 12.1735L6.59722 13.5233L10.1215 12.1735L6.71875 10.8844ZM7.53472 19.7559L11.1111 18.1848V14.0224L7.53472 15.394V19.7559ZM14.8785 12.1735L18.4028 13.5233L21.9271 12.1735L18.5243 10.8844C18.4462 10.854 18.3203 10.854 18.2812 10.8844L14.8785 12.1735ZM22.9167 17.9591V14.0224L19.3403 15.394V19.7559L22.7083 18.2759C22.8342 18.2195 22.9167 18.0979 22.9167 17.9591Z"
                    />
                    Integrations
                  </CoreHeaderDiv>
                </StyledLink>
              </CoreHeaderLi>
              <DividerLi />
              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "salesforce"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("salesforce")
                  }
                  dropdownSelected={currentDropdown === "salesforce"}
                >
                  <ListItemWithCaretDiv>
                    Salesforce
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "salesforce" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "sftp"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("sftp")
                  }
                  dropdownSelected={currentDropdown === "sftp"}
                >
                  <ListItemWithCaretDiv>
                    SFTP
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "sftp" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "segment"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("segment")
                  }
                  dropdownSelected={currentDropdown === "segment"}
                >
                  <ListItemWithCaretDiv>
                    Segment
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "segment" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "tangocard"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("tangocard")
                  }
                  dropdownSelected={currentDropdown === "tangocard"}
                >
                  <ListItemWithCaretDiv>
                    Tangocard
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "tangocard" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "recurly"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("recurly")
                  }
                  dropdownSelected={currentDropdown === "recurly"}
                >
                  <ListItemWithCaretDiv>
                    Recurly
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "recurly" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "appsflyer"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("appsflyer")
                  }
                  dropdownSelected={currentDropdown === "appsflyer"}
                >
                  <ListItemWithCaretDiv>
                    Appsflyer
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "appsflyer" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>
              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "branch"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("branch")
                  }
                  dropdownSelected={currentDropdown === "branch"}
                >
                  <ListItemWithCaretDiv>
                    Branch
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "branch" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "stripe"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("stripe")
                  }
                  dropdownSelected={currentDropdown === "stripe"}
                >
                  <ListItemWithCaretDiv>
                    Stripe
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "stripe" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "zapier"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("zapier")
                  }
                  dropdownSelected={currentDropdown === "zapier"}
                >
                  <ListItemWithCaretDiv>
                    Zapier
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "zapier" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>

              <BigSectionLi>
                <StyledLink
                  onClick={() =>
                    currentDropdown === "stitch"
                      ? setCurrentDropdown("")
                      : setCurrentDropdown("stitch")
                  }
                  dropdownSelected={currentDropdown === "stitch"}
                >
                  <ListItemWithCaretDiv>
                    Stitch
                    <SVGIcon
                      width="12px"
                      viewBox="0 0 12 8"
                      d="M10.59 0L6 4.58L1.41 0L0 1.41L6 7.41L12 1.41L10.59 0Z"
                    />
                  </ListItemWithCaretDiv>
                </StyledLink>

                {currentDropdown === "stitch" && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <StyledLink>Small section 1</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 2</StyledLink>
                    </SmallSectionLi>
                    <SmallSectionLi>
                      <StyledLink>Small section 3</StyledLink>
                    </SmallSectionLi>
                  </SmallSectionUl>
                )}
              </BigSectionLi>
            </BigSectionUl>
          </CoreCatSectionLi>
        </ul>
      </nav>
    </Styles.Container>
  );
}

interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  d?: string;
  clicked?: boolean;
}

/* Notes
    - Each sidebar option should have link nested around root (i.e. "Integrations") so that when clicked, children appear
    - SVG icons instead of fa icon codes
    - How to make child menu open?
    - Search bar needs to change (just slight width adjustment)
*/
