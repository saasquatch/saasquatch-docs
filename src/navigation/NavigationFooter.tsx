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
                  <a href="https://www.saasquatch.com/request-demo">
                    Request Demo
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/loyalty-program-2/">Customer Loyalty</a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/customer-referrals//">Customer Referral</a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/integrations/">Integrations
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
                  <a href="https://www.saasquatch.com/about">About</a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/partners">
                    Partner Program
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/careers">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/contact-us">
                    Contact Us
                  </a>
                </li>
              </FooterUL>
            </div>
            <div className="span3">
              <FooterUL>
                <li>Resources</li>
                <li>
                  <a href="https://www.saasquatch.com/blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/the-advocacy-channel-a-customer-marketing-podcast/">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/customers">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="https://www.digitalloyaltyacademy.com/">
                  Loyalty Academy
                  </a>
                </li>
              </FooterUL>
            </div>
            <div className="span3">
              <FooterUL>
                <li>Legal</li>
                <li>
                  <a href="https://www.saasquatch.com/terms-of-service">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.saasquatch.com/terms-of-use">
                    Terms of Use
                  </a>
                </li>
              </FooterUL>
            </div>
          </div>
          <div className="span12 text-center" style={{ color: "white", marginLeft:"0px" }}>
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
