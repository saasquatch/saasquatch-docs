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

import styled from "styled-components";

/* Styled Components */
const PageTitleH3 = styled.h3`
  color: var(--sq-text);
`;

const ListItemWrapperLi = styled.li`
  height: 40px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: pink;
  }
`;

const LinkWrapperA = styled.a`
  display: flex;
  flex-direction: row;
`;

/* Actual styled components */
const CoreCatSectionLi = styled.li`
  height: 65px;
  background-color: #ffffff;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  &:hover,
  :focus {
    background-color: #e7edee;
  }

  /* &:active ${Link}, :visited ${Link} {
    color: #ffffff !important;
    background-color: #003b45 !important;
  } */
`;

const BigSectionLi = styled.li`
  cursor: pointer;
`;

const CoreHeaderLi = styled.li`
  cursor: pointer;
  border-bottom: 1px solid red !important;
`;

const SmallSectionLi = styled.li`
  font-size: 14px;
  color: #003b45;
  background-color: red !important;
  padding: 10px;
  &:hover,
  :focus {
    background-color: #e7edee;
  }

  /* &:active ${Link}, :visited ${Link} {
    color: #ffffff;
    background-color: #003b45;
  } */
`;

const DividerHr = styled.hr`
  margin: -20px 0 !important;
  border: 0 !important;
  border-top: 1px solid #eee !important;
  border-bottom: 0px solid #fff !important;
`;

const DropdownButton = styled.button``;

const DropdownContainerDiv = styled.div``;

const BigSectionUl = styled.ul``;

const SmallSectionUl = styled.ul`
  list-style: none !important;
  border-left: 1px solid #003b45 !important;
`;

const StyledLink = styled(Link)`
  &:active {
    color: #ffffff !important;
    background-color: #003b45 !important;
  }
  &:visited {
    color: #ffffff !important;
    background-color: #003b45 !important;
  }
`;

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
  /* Initialise unclicked list items to false (for dropdown) */
  const [growthAuto, setGrowthAuto] = useState<boolean>(false);
  const [referralPrograms, setReferralPrograms] = useState<boolean>(false);
  const [programReferences, setProgramReferences] = useState<boolean>(false);
  const [adminPortal, setAdminPortal] = useState<boolean>(false);
  const [programReference, setProgramReference] = useState<boolean>(false);
  const [programResources, setProgramResources] = useState<boolean>(false);
  const [w9Compliance, setW9Compliance] = useState<boolean>(false);
  const [imports, setImports] = useState<boolean>(false);

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
          <CoreCatSectionLi>
            <StyledLink>SaaSquatch Product News</StyledLink>
          </CoreCatSectionLi>

          <CoreCatSectionLi>
            <StyledLink to="/success/">Success Center</StyledLink>
            {/* Success Center Subcategories */}
            <BigSectionUl>
              <CoreHeaderLi>
                <StyledLink to="/success/">Success Center</StyledLink>
              </CoreHeaderLi>
              <BigSectionLi>
                <span onClick={() => setGrowthAuto(!growthAuto)}>
                  Growth Automation
                </span>

                {growthAuto && (
                  <SmallSectionUl>
                    <SmallSectionLi>
                      <Link>Small section 1</Link>
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
                <span onClick={() => setReferralPrograms(!referralPrograms)}>
                  Referral Programs
                </span>

                {referralPrograms && (
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
                <span onClick={() => setProgramReferences(!programReferences)}>
                  Program References
                </span>

                {programReferences && (
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
                <span onClick={() => setAdminPortal(!adminPortal)}>
                  Administration Portal
                </span>

                {adminPortal && (
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
                <span onClick={() => setProgramReference(!programReference)}>
                  Program Reference
                </span>

                {programReference && (
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
                <span onClick={() => setProgramResources(!programResources)}>
                  Program Resources
                </span>

                {programResources && (
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
                <span onClick={() => setW9Compliance(!w9Compliance)}>
                  W-9 Compliance
                </span>

                {w9Compliance && (
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
                <span onClick={() => setImports(!imports)}>Imports</span>

                {imports && (
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
            <Link>Developer Center</Link>
            {/* Developer Center Subcategories */}
            <ul>
              <BigSectionLi>
                <StyledLink>Dev Center Home</StyledLink>
              </BigSectionLi>
              <BigSectionLi>
                <StyledLink>Dev Guides</StyledLink>
              </BigSectionLi>
              <BigSectionLi>
                <StyledLink>JSON Web Tokens</StyledLink>
              </BigSectionLi>
              <BigSectionLi>
                <StyledLink>Testing Best Practices</StyledLink>
              </BigSectionLi>
              <BigSectionLi>
                <span>Squatch.js</span>
                <ul>
                  <SmallSectionLi>
                    <StyledLink>#1</StyledLink>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <StyledLink>#2</StyledLink>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <StyledLink>#3</StyledLink>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Rest API</span>
                <ul>
                  <SmallSectionLi>
                    <StyledLink>#1</StyledLink>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <StyledLink>#2</StyledLink>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <StyledLink>#3</StyledLink>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>GraphQL API</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>
            </ul>
          </CoreCatSectionLi>

          <CoreCatSectionLi>
            <Link>Integrations</Link>
            {/* Integrations Subcategories */}
            <ul>
              <BigSectionLi>
                <span>Salesforce</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Rest API</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>SFTP</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>SFTP</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Segment</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Tangocard</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Recurly</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Appsflyer</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Branch</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Stripe</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Zapier</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>

              <BigSectionLi>
                <span>Stitch</span>
                <ul>
                  <SmallSectionLi>
                    <Link>#1</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#2</Link>
                  </SmallSectionLi>
                  <SmallSectionLi>
                    <Link>#3</Link>
                  </SmallSectionLi>
                </ul>
              </BigSectionLi>
            </ul>
          </CoreCatSectionLi>
        </ul>
      </nav>
    </Styles.Container>
  );
}

/* Notes
    - Each sidebar option should have link nested around root (i.e. "Integrations") so that when clicked, children appear
    - SVG icons instead of fa icon codes
    - How to make child menu open?
    - Search bar needs to change (just slight width adjustment)
*/
