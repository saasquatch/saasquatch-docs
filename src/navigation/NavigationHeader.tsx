import React from "react";
import { VersionContext } from "../components/useVersion";
import { VersionSwitcher } from "../components/VersionSwitcher";
import styled from "styled-components";
import { PersonalisationSelect } from "./PersonalisationSelect";

export const Personalisation = styled.div`
  display: inline-flex;
  width: auto;
  height: 36px;

  margin-top: 12px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 23px;
`;

const NavTop = styled.header`
  
`



export function NavigationHeader() {
  return (
    <header id="my-header">
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
            <PersonalisationSelect />
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
