import React from "react";
import { VersionContext } from "../components/useVersion";
import { VersionSwitcher } from "../components/VersionSwitcher";
import styled from "styled-components";

export const Personalisation = styled.div`
  font-weight: bold;
  color: #003b45;
  padding: 5px 30px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;

  & label {
    display: flex;
    align-items: center;
    height: 50px;

    select {
      margin-top: 15px;
      margin-left: 15px;
    }
  }
`;

export function NavigationHeader() {
  const { version, setVersion } = VersionContext.useContainer();
  const headerText =
    version === "classic-only"
      ? "work with Classic programs"
      : version === "ga-only"
      ? "work with non-Classic programs"
      : "work with all programs";
  return (
    <header id="my-header" style={{ marginTop: "60px" }}>
      <div className="navbar navbar-top">
        <div className="navbar-inner">
          <div className="container-fluid">
            <button
              className="hamburger hamburger--collapse pull-right hidden-desktop"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>

            <div className="nav-collapse collapse" id="navigation">
              <ul id="menu-primary-navigation" className="nav pull-right">
                <li>
                  <a href="https://www.referralsaasquatch.com/">
                    SaaSquatch Home
                  </a>
                </li>
                <li>
                  <a href="http://www.referralsaasquatch.com/resources/">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="http://www.referralsaasquatch.com/blog/">Blog</a>
                </li>
                <li>
                  <a href="https://app.referralsaasquatch.com/">Login</a>
                </li>
                <li>
                  <a href="http://www.referralsaasquatch.com/request-demo">
                    Schedule a Demo
                  </a>
                </li>
              </ul>
            </div>
            <Personalisation>
              <span>Docs are being personalised to {headerText}</span>
              <VersionSwitcher />
            </Personalisation>
          </div>
        </div>
      </div>

      <div className="container-fluid hidden-desktop">
        <button
          className="hamburger hamburger--arrow"
          type="button"
          id="open-sidenav"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        SaaSquatch Help Center
      </div>
    </header>
  );
}
