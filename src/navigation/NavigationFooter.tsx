import React from "react";
import styled from "styled-components";

export const FooterUL = styled.ul`
  list-style-type: none;
  color: white;
  font-weight: 300;
`;

export function NavigationFooter() {
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
