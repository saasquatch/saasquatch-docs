import React, { useLayoutEffect } from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { VersionContext } from "./components/useVersion";
// import { Link, Router } from "@reach/router";
import styled from "styled-components";

import "./assets/stylesheets/docs.less";

const Personalisation = styled.span`
  position: fixed;
  font-weight: bold;
  color: #003b45;
  width: calc(100% - 315px);
  top: 0;
  left: 264px;
  height: 40px;
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

let init = () => {};
if (typeof document !== "undefined") {
  init = require("./assets/js/docs").init;
}

const sidebarRaw = require("html-loader!./templates/sidebar.html");
const apiList = require("html-loader!./templates/apilist.html");

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  useLayoutEffect(() => {
    /**
     * Important!
     *
     * This site seems like it's all React, but in reality it still relies on jQuery
     *
     * The source content that comes from static files, contentful, etc. has tabs, popups,
     * and other things that need JQuery post processing.
     *
     * This could probably be moved into only the templates that accept that raw HTML,
     * but for backwards compatibility with the metalsmith build, it wasn't changed.
     *
     */
    init();

    // Decode entities in the URL
    // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
    // window.location.hash = window.decodeURIComponent(window.location.hash);
    // const scrollToAnchor = () => {
    //   const hashParts = window.location.hash.split("#");
    //   if (hashParts.length > 2) {
    //     const hash = hashParts.slice(-1)[0];
    //     document.querySelector(`#${hash}`).scrollIntoView();
    //   }
    // };

    // setTimeout(function() {
    //   // TODO: In dev, there is a "Loading.." react compnent that renders
    //   // Maybe this isn't necessary in prod
    //   scrollToAnchor();
    // }, 2000);

    // window.onhashchange = scrollToAnchor;
  }, []);

  return (
    <Root>
      <VersionContext.Provider>
        <div id="my-page">
          <NavigationHeader />
          <div id="my-content" className="container-fluid">
            <React.Suspense fallback={<em>Loading...</em>}>
              {/* <Router> */}
              {/* <Dynamic path="dynamic" /> */}
              <Routes default />
              {/* </Router> */}
            </React.Suspense>
          </div>
          <div id="my-footer">
            <NavigationFooter />
          </div>
        </div>
        <NavigationSidebar />
      </VersionContext.Provider>
    </Root>
  );
}

export default App;

function NavigationHeader() {
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
              <Personalisation>
                <span>Docs are being personalised to {headerText}</span>
                <label htmlFor="filter">
                  Change Filter:
                  <select
                    id="fitler"
                    name="filter"
                    defaultValue={version}
                    onChange={e => setVersion(e.currentTarget.value)}
                  >
                    <option value="classic-only">Works With Classic</option>
                    <option value="ga-only">No Classic</option>
                    <option value="hybrid">Show Everything</option>
                  </select>
                </label>
              </Personalisation>
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

const FooterUL = styled.ul`
  list-style-type: none;
  color: white;
  font-weight: 300;
`;

function NavigationFooter() {
  return (
    <footer id="footer" data-swiftype-index="false">
      <section className="copyright">
        <div className="container">
          <div className="row-fluid docs-footer-menu">
            <div className="span3">
              <FooterUL>
                <li>Product</li>
                <li>
                  <a href="https://app.referralsaasquatch.com/">Login</a>
                </li>
                <li>
                  <a href="https://saasquatch.com">Growth Automation</a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/request-demo">
                    Request Demo
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/api-integrations/">
                    API Integrations
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/fraud-prevention/">
                    Fraud Prevention
                  </a>
                </li>
                <li>
                  <a href="https://status.referralsaasquatch.com/">
                    Status Page
                  </a>
                </li>
              </FooterUL>
            </div>
            <div className="span3">
              <FooterUL>
                <li>Company</li>
                <li>
                  <a href="https://www.referralsaasquatch.com/about">About</a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/partners">
                    Partner Program
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/careers">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/contact-us">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/wp-content/uploads/2017/02/Saasquatch-simple-brand-standards.pdf">
                    Media (PDF)
                  </a>
                </li>
              </FooterUL>
            </div>
            <div className="span3">
              <FooterUL>
                <li>Education</li>
                <li>
                  <a href="https://www.referralsaasquatch.com/blog">
                    Marketer Blog
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/resources">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/customers">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/category/saasquatch-news/">
                    Company News
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/editorial-guidelines/">
                    Editorial Guidelines
                  </a>
                </li>
              </FooterUL>
            </div>
            <div className="span3">
              <FooterUL>
                <li>Legal</li>
                <li>
                  <a href="https://www.referralsaasquatch.com/terms-of-service">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.referralsaasquatch.com/terms-of-use">
                    Terms of Use
                  </a>
                </li>
              </FooterUL>
            </div>
          </div>
          <div
            className="span12 text-center"
            style={{ color: "white", marginLeft: "0px" }}
          >
            <p style={{ opacity: 0.7 }}>
              Copyright © {new Date().getFullYear()} Referral SaaSquatch.com.
              All rights reserved.
            </p>
            <p style={{ opacity: 0.7 }} className="hidden-phone">
              1017 Fort St, Victoria, British Columbia, V8V 3K5, Canada
            </p>
          </div>

          <img className="trees" src="/assets/images/saasquatch-trees.png" />
        </div>
      </section>
    </footer>
  );
}
function NavigationSidebar() {
  const sidebar = sidebarRaw
    .replace("<APILIST/>", apiList)
    .replace("<APILIST />", apiList);
  return <HTML source={sidebar} />;
}

function HTML({ source }) {
  const html = { __html: source };
  return <div dangerouslySetInnerHTML={html} />;
}
