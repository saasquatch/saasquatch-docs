import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding-top: 20px;
  max-height: 800px;
  background: #003B45;
  font-family: 'Helvetica';
  font-style: normal;
  padding-bottom: 30px;
  @media(max-width: 768px) {
    display: inline-block;
  }
`;

const ListsWrapper = styled.div`
  width: calc(100%-165px);
  padding: 0 95px 0 70px;
  @media(max-width: 768px) {
    width: calc(100%-30px);
    padding: 0 15px;
  }
`;

const ListDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  text-align: left;
  @media(max-width: 768px) {
    display: inline-block;
    -moz-column-count: 2;
    column-count: 2;
    grid-template-columns: 1fr 1fr;
  }
`;

export const FooterUL = styled.ul`
  list-style-type: none;
  color: white;
  font-weight: 300;
  padding: 0 30px;
  @media(max-width: 768px) {
    padding: 0 15px;
    margin: 0 0 30px 0 !important;
    -webkit-column-break-inside: avoid;
    column-break-inside: avoid;
  }

`;


const TitleLi = styled.li`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #FFFFFF;
  border-bottom: none !important;
  margin-bottom: 12px !important;
`;

const InnerLi = styled.li`
  a {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF !important;
    opacity: 0.8 !important;
  }
  :not(:last-child) {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    padding: 10px 0;
  }
  :last-child {
    padding-top: 10px;
  }
  a:hover {
    text-decoration: none;
    opacity: 1 !important;
  }
`;

const BottomContainer = styled.div`
  padding-top: 40px;
`;

const FooterParagraph = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.8;

`;


export function NavigationFooter() {
  return (
    // <footer id="footer" data-swiftype-index="false">
    <FooterContainer id="footer" data-swiftype-index="false">
      <section className="copyright">
        <ListsWrapper>
          {/* <div className="row-fluid docs-footer-menu"> */}
          <ListDiv>
            <div >
              <FooterUL>
                <TitleLi>Product</TitleLi>
                <InnerLi>
                  <a href="https://app.referralsaasquatch.com/">Login</a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/request-demo">
                    Request Demo
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/loyalty-program-2/">
                    Customer Loyalty
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/customer-referrals/">
                    Customer Referral
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/api-integrations/">
                    Intergrations
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://status.referralsaasquatch.com/">
                    Status Page
                  </a>
                </InnerLi>
              </FooterUL>
            </div>
            <div>
              <FooterUL>
                <TitleLi>Company</TitleLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/about">About</a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/partners">
                    Partner Program
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/careers">
                    Careers
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/contact-us">
                    Contact Us
                  </a>
                </InnerLi>
              </FooterUL>
            </div>
            <div>
              <FooterUL>
                <TitleLi>Resources</TitleLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/blog">
                    Blog
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/the-advocacy-channel-a-customer-marketing-podcast/">
                    Podcast
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/customers">
                    Case Studies
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.digitalloyaltyacademy.com/">
                    Loyalty Academy
                  </a>
                </InnerLi>
              </FooterUL>
            </div>
            <div>
              <FooterUL>
                <TitleLi>Legal</TitleLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/terms-of-service">
                    Terms of Service
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/privacy-policy">
                    Privacy Policy
                  </a>
                </InnerLi>
                <InnerLi>
                  <a href="https://www.saasquatch.com/terms-of-use">
                    Terms of Use
                  </a>
                </InnerLi>
              </FooterUL>
            </div>
          </ListDiv>
          <BottomContainer>
            <FooterParagraph>
              Copyright © {new Date().getFullYear()} Referral SaaSquatch.com.
              All rights reserved.
            </FooterParagraph>
            <FooterParagraph>
              1017 Fort St, Victoria, British Columbia, V8V 3K5, Canada
            </FooterParagraph>
          </BottomContainer>
          <img className="trees" src="/assets/images/saasquatch-trees.png" />
        </ListsWrapper>
      </section>
    </FooterContainer>
  );
}
