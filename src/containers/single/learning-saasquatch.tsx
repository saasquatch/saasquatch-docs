import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Learning SaaSquatch cards

const adminPortal = {
  title: "SaaSquatch Admin Portal",
  description:
    "The Admin Portal is where you’ll build and run your programs, manage your participants, and view your analytics. Click here to learn how to use the Admin Portal. ",
  linkUrl: "#",
};

const growthAuto = {
  title: "Growth Automation",
  description:
    "What is growth automation, and why is it important for your business? In this section, you’ll find answers to these questions—and how details about SaaSquatch can help you on your journey. ",
  linkUrl: "#",
};

const referralPrograms = {
  title: "Referral Programs",
  description:
    "Referral programs are at the heart of what we do. Here you’ll find a crash course on all things related to referral programs, like how to optimize and market your program.",
  linkUrl: "#",
};

const fraudSecurity = {
  title: "Fraud and Security Management",
  description:
    "Your security is always at the top of our mind. Learn more about how SaaSquatch keeps your user data safe, and how our Security Management System helps detect and mitigate the risk of fraudulent referral activity.",
  linkUrl: "#",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  adminPortal,
  growthAuto,
  referralPrograms,
  fraudSecurity,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Learning SaaSquatch"
          highlights="Start your SaaSquatch learning journey here. This is where you’ll find help understanding growth automation, the SaaSquatch platform, referral programs, and how we ensure that your user data stays secure.
          <br/>
          <br/>
          Click the cards below to learn more about each topic.
          "
          category="landingPages"
        />
        <CardGrid>
          {CardsArray.map((card) => {
            return (
              <div style={{ display: "inline-block" }}>
                <Card
                  title={card.title}
                  description={card.description}
                  iconCode={card.iconCode}
                  imageSrc={card.imageSrc}
                  svgSrc={card.svgSrc}
                  linkUrl={card.linkUrl}
                />
              </div>
            );
          })}
        </CardGrid>
      </PageWrapper>
    </>
  );
}
