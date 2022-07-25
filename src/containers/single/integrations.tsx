import { CardGrid, Card, CardProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import { stringify } from "gray-matter";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;
//SVG icons & Integrations cards

const salesForce = {
  title: "Salesforce",
  description:
    "Salesforce is the world's leading cloud CRM. SaaSquatch is a managed package built on Force.com that lets you track your referrals in Salesforce.",
  imageSrc:
    "https://images.ctfassets.net/s68ib1kj8k5n/6lanuIP3dr7CaMAXnjFit6/ec0d742b72e09235769d1d84dc8e8668/salesforce-integration.png",
  linkText: "Read more about Salesforce",
  linkUrl: "/salesforce",
};

const sftpImport = {
  title: "SFTP Import",
  description:
    "SFTP is a secure standard for transferring files. The SFTP Import Integration allows you to upload import files to a SaaSquatch-managed SFTP server for bulk processing.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/4xcpmocHGJyM8qFVSsmFhP/da4f20bca7d2a811abbebb07299f5f72/Group_20.png",
  linkText: "Read more about SFTP Import",
  linkUrl: "/sftp/",
};

const segment = {
  title: "Segment",
  description:
    "Segment allows you to easily manage integrations with multiple analytics services. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/4WAnPRXEeTebAvBx5XSS7w/2a673fbfa3f2e63a5b632f120923a3f8/segment-integration.png",
  linkText: "Read more about Segment",
  linkUrl: "/segment/",
};

const tangoCard = {
  title: "TangoCard",
  description:
    "TangoCard allows you to buy, send, and track digital gift card orders. SaaSquatch's TangoCard integration enables you to automatically reward your program participants with gift cards.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/3iNXzSopraTDMW21LCOLlG/652eacfbfbd2258ea2971573d19cbd2a/tangocard-integration.png",
  linkText: "Read more about TangoCard",
  linkUrl: "/tangocard/",
};

const recurly = {
  title: "Recurly",
  description:
    "Recurly is a fantastic subscription management tool. SaaSquatch's Recurly integration uses Recurly to automatically track referred subscriptions and give your users discounts and credits.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/4yf7wHTinCyqAm8SCRDTE6/83e7d3a3c6062ac4258ac46bf36c75a9/recurly-integration.png",
  linkText: "Read more about Recurly",
  linkUrl: "/recurly/",
};

const appsFlyer = {
  title: "AppsFlyer",
  description:
    "AppsFlyer is a SaaS mobile marketing analytics and attribution platform. SaaSquatch integrates with AppsFlyer to provide a better user experience and additional attribution, personalization and analytics by using AppsFlyer's OneLink attribution links.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/WXPaAQBgDz0zu2fWw0ntu/335adb7f439dac9221e0a3e67e9cc702/appsflyerLogo.png",
  linkText: "Read more about AppsFlyer",
  linkUrl: "/appsflyer-software-integration/",
};

const branchMetrics = {
  title: "Branch Metrics",
  description:
    "Branch Metrics is a free mobile attribution platform. SaaSquatch integrates with Branch Metrics to provide a better user experience, additional attribution, personalization and analytics by using Branch's deep links.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/2JQ76joxW94dJ7rPZ4EVIf/483ea68bf61bf803b4984e0075f597cb/branch-integration.png",
  linkText: "Read more about Branch",
  linkUrl: "/branch-metrics/",
};

const stripe = {
  title: "Stripe",
  description:
    "Stripe is a powerful payment platform built for developers. SaaSquatch's Stripe integration uses Stripe Connect to automatically create new referral codes, track referred subscriptions and give people discounts.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/euVWUVNzVHyrUl54ip3tW/b21b817658b996e2882028b2ffb3cd7f/stripe-integration.png",
  linkText: "Read more about Stripe",
  linkUrl: "/stripe/",
};

const zapier = {
  title: "Zapier",
  description:
    "Zapier is an online automation tool that connects your apps and services. You can connect two or more apps to automate repetitive tasks without coding or relying on developers to build the integration.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/5bB95sRsNbh2BL1D5eqGLk/d94c7c939b6caeaccc17ee3acd08ba73/zapier-integration.png",
  linkText: "Read more about Zapier",
  linkUrl: "/zapier/",
};

const stitch = {
  title: "Stitch",
  description:
    "Stitch is a data pipe that connects to your business data sources, like your SaaSquatch program data, to your data warehouse.",
  imageSrc:
    "//images.ctfassets.net/s68ib1kj8k5n/g5rQMil3Rx4J4kXxR70VZ/21ce1d0e8f19d8094c5ec071e0d3a65f/stitch-integration.png",
  linkText: "Read more about Stitch",
  linkUrl: "/stitch/",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  salesForce,
  appsFlyer,
  sftpImport,
  branchMetrics,
  segment,
  stripe,
  tangoCard,
  zapier,
  recurly,
  stitch,
];

export default function render() {
  return (
    <PageWrapper>
      <PageHeader
        title="Integrations"
        highlights="SaaSquatch integrates with a number of platforms, from payment systems that manage automatic referral tracking and fulfillment, to tag management systems that simplify installing integrating widgets inside your product, to mobile deeplinking platforms that let you optimize and personalize the mobile referral experience."
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
                linkUrl={card.linkUrl}
              />
            </div>
          );
        })}
      </CardGrid>
    </PageWrapper>
  );
}
