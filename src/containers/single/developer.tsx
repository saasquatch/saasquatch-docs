import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Developer Center cards

const devGuides = {
  title: "Dev Guides",
  description:
    "Learn how to use our tools to create your own referral and loyalty programs.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/guides",
};

<<<<<<< HEAD
=======
const jsonWeb = {
  title: "JSON Web Tokens",
  description:
    "Used to validate the data being supplied to Referral SaaSquatch.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/topics/json-web-tokens",
};

const bestPractices = {
  title: "Testing Best Practices",
  description:
    "Recommended program development process with SaaSquatch to minimize technical errors and installation deficiencies.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/developer/testing",
};

>>>>>>> 52b0b2243cdb7d7a1e3981861a2a6153ec5f66a6
const squatchJS = {
  title: "Squatch.js",
  description:
    "One-stop shop to integrate a SaaSquatch program into your website or web app.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/developer/squatchjs",
};

const restAPI = {
  title: "REST API",
  description: "Build your own custom logic on top of your referral program.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/api",
};

const webhook = {
  title: "Webhook",
  description: "This is the content for Webhooks subcategory.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/api/webhooks/",
const graphQLAPI = {
  title: "GraphQL API",
  description:
    "API for building custom widgets, integrations, and admin interfaces based on GraphQL.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/graphql/reference/",
};

const mobile = {
  title: "Mobile",
  description: "Learn how to grow with a referral program on a mobile app.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/mobile",
};

const jsonWeb = {
  title: "JSON Web Tokens",
  description:
    "Used to validate the data being supplied to Referral SaaSquatch.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/topics/json-web-tokens",
};

const bestPractices = {
  title: "Testing Best Practices",
  description:
    "Recommended program development process with SaaSquatch to minimize technical errors and installation deficiencies.",
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/developer/testing",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  devGuides,
  squatchJS,
  restAPI,
  webhook,
  mobile,
  jsonWeb,
  bestPractices,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Developer Center"
          highlights="SaaSquatch is a full platform for running growth automation programs across web, mobile and all your digital properties."
          category="landingPages" // right??
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
                  linkText={card.linkText}
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
