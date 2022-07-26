import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Learning SaaSquatch cards

const saasquatchEmails = {
  title: "SaaSquatch & Emails",
  description:
    "The SaaSquatch platform enables you to configure when emails are sent to participants throughout the customer life cycle.",
  linkUrl: "/topics/email",
};

const customShortDomains = {
  title: "Custom Short Domains",
  description:
    "The SaaSquatch system supports the use of Custom Short Domains which allow you to change the format of the referral links shared by your users.",
  linkUrl: "/customshortdomainguide",
};

const referralSecurity = {
  title: "Referral Security",
  description:
    "SaaSquatch's Security Management System protects your program from unwanted referral activity.",
  linkUrl: "/developer/referral-security/",
};

const accountStructure = {
  title: "Account Structure",
  description:
    "The SaaSquatch system provides flexible options for structuring how participants are grouped in your project.",
  linkUrl: "/shared-vs-solo-accounts/",
};

const marketo = {
  title: "Marketo",
  description:
    "Leveraging your existing Marketo Forms to automatically add Referred Sigunps into your referral program.",
  linkUrl: "/guides/marketo-form",
};

const instapages = {
  title: "Instapages",
  description:
    "Leveraging your existing Instapage Forms to automatically add Referred Signups into your referral program.",
  linkUrl: "/guides/instapage-form",
};

const customUserFields = {
  title: "Custom User Fields",
  description:
    "Include custom information about users in your SaaSquatch project.",
  linkUrl: "/features/custom-user-fields/",
};

const userWidgetTypes = {
  title: "User Widget Types",
  description:
    "Display different types of widgets to users in your SaaSquatch Program.",
  linkUrl: "/topics/widget-types",
};

const messageLinks = {
  title: "Message Links",
  description:
    "The SaaSquatch system offers dynamic capability to build share buttons for each of your programs and share mediums.",
  linkUrl: "/features/message-links",
};

const conversionTechGuide = {
  title: "Conversion Tech Guide",
  description:
    "Conversion is the process of converting in-progress referrals and unlocking rewards. In this guide, we explain how to track conversions.",
  linkUrl: "/developer/conversion",
};

const attributionTechGuide = {
  title: "Attribution Tech Guide",
  description:
    "Attribution is the process of building a referral link between two people: the referrer and the referred user. In this guide we explain how to track attribution.",
  linkUrl: "/developer/attribution",
};

const commonPitfalls = {
  title: "Common Pitfalls",
  description:
    "Mistakes happen—and that's okay! We're here to help you solve them. Learn about some of the common errors you might encounter when you're getting up and running with SaaSquatch (like forgetting to add a call to action button in your app).",
  linkUrl: "/bestpractices/common-pitfalls",
};

const writingWebComponent = {
  title: "Writing a Web Component for SaaSquatch",
  description:
    "You can build your own components to work inside of our widgets and microsites. This article will walk you through the process from start to finish.",
  linkUrl: "/developer/widgets/writing-a-web-component-for-saasquatch",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  saasquatchEmails,
  customShortDomains,
  referralSecurity,
  accountStructure,
  marketo,
  instapages,
  customUserFields,
  userWidgetTypes,
  messageLinks,
  conversionTechGuide,
  attributionTechGuide,
  commonPitfalls,
  writingWebComponent,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Dev Guides"
          highlights="<p style='margin-bottom: 16px;'>The SaaSquatch Guides show you how to use our tools to create your own world-class referral and loyalty programs.</p>
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
