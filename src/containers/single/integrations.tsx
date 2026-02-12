import { CardGrid, Card, CardProps } from "components/homepages/Card";
import { HomePage } from "components/homepages/HomePage";
import PageHeader from "components/PageHeader";
import { stringify } from "gray-matter";
import * as React from "react";
import styled from "styled-components";

// Integrations cards

const salesForce = {
  title: "Salesforce",
  description:
    "Salesforce is the world's leading cloud CRM. SaaSquatch is a managed package built on Force.com that lets you track your referrals in Salesforce.",
  imageSrc: "/assets/images/integrations/salesforce-integration.png",
  linkText: "Read more about Salesforce",
  linkUrl: "/salesforce",
};

const sftpImport = {
  title: "SFTP Import",
  description:
    "SFTP is a secure standard for transferring files. The SFTP Import Integration allows you to upload import files to a SaaSquatch-managed SFTP server for bulk processing.",
  imageSrc: "/assets/images/integrations/sftp-integration.png",
  linkText: "Read more about SFTP Import",
  linkUrl: "/sftp/",
};

const segment = {
  title: "Segment",
  description:
    "Segment allows you to easily manage integrations with multiple analytics services. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code.",
  imageSrc: "/assets/images/integrations/segment-integration.png",
  linkText: "Read more about Segment",
  linkUrl: "/segment/",
};

const tangoCard = {
  title: "Tango Card",
  description:
    "Tango Card allows you to buy, send, and track digital gift card orders. SaaSquatch's Tango Card integration enables you to automatically reward your program participants with gift cards.",
  imageSrc: "/assets/images/integrations/tangocard-integration.png",
  linkText: "Read more about Tango Card",
  linkUrl: "/tangocard/",
};

const recurly = {
  title: "Recurly",
  description:
    "Recurly is a fantastic subscription management tool. SaaSquatch's Recurly integration uses Recurly to automatically track referred subscriptions and give your users discounts and credits.",
  imageSrc: "/assets/images/integrations/recurly-integration.png",
  linkText: "Read more about Recurly",
  linkUrl: "/recurly/",
};

const appsFlyer = {
  title: "AppsFlyer",
  description:
    "AppsFlyer is a SaaS mobile marketing analytics and attribution platform. SaaSquatch integrates with AppsFlyer to provide a better user experience and additional attribution, personalization and analytics by using AppsFlyer's OneLink attribution links.",
  imageSrc: "/assets/images/integrations/appsflyer-integration.png",
  linkText: "Read more about AppsFlyer",
  linkUrl: "/appsflyer-software-integration/",
};

const branchMetrics = {
  title: "Branch Metrics",
  description:
    "Branch Metrics is a free mobile attribution platform. SaaSquatch integrates with Branch Metrics to provide a better user experience, additional attribution, personalization and analytics by using Branch's deep links.",
  imageSrc: "/assets/images/integrations/branch-integration.png",
  linkText: "Read more about Branch",
  linkUrl: "/branch-metrics/",
};

const stripe = {
  title: "Stripe",
  description:
    "Stripe is a powerful payment platform built for developers. SaaSquatch's Stripe integration uses Stripe Connect to automatically create new referral codes, track referred subscriptions and give people discounts.",
  imageSrc: "/assets/images/integrations/stripe-integration.png",
  linkText: "Read more about Stripe",
  linkUrl: "/stripe/",
};

const zapier = {
  title: "Zapier",
  description:
    "Zapier is an online automation tool that connects your apps and services. You can connect two or more apps to automate repetitive tasks without coding or relying on developers to build the integration.",
  imageSrc: "/assets/images/integrations/zapier-integration.png",
  linkText: "Read more about Zapier",
  linkUrl: "/zapier/",
};

const stitch = {
  title: "Stitch",
  description:
    "Stitch is a data pipe that connects to your business data sources, like your SaaSquatch program data, to your data warehouse.",
  imageSrc: "/assets/images/integrations/stitch-integration.png",
  linkText: "Read more about Stitch",
  linkUrl: "/stitch/",
};

const paypal = {
  title: "PayPal",
  description:
    "Millions of people use PayPal everyday to send and receive money. Our PayPal integration builds on PayPal's security, efficiency and convenience to allow you to payout your rewards automatically.",
  imageSrc: "/assets/images/integrations/paypal-integration.svg",
  linkText: "Read more about PayPal",
  linkUrl: "/paypal-payouts/",
};

const hubspot = {
  title: "HubSpot",
  description:
    "Our native HubSpot integration automatically shares participant referral data between the two platforms. By connecting your SaaSquatch participants to contacts in HubSpot, you’ll be able to run powerful customer marketing programs that reward behaviors tied to your sales or marketing process.",
  imageSrc: "/assets/images/integrations/hubspot-integration.png",
  linkText: "Read more about HubSpot",
  linkUrl: "/integrations/hubspot/",
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
  paypal,
  hubspot,
];

export default function render() {
  return (
    <HomePage
      title="Integrations"
      highlights="SaaSquatch integrates with a number of platforms, from payment systems that manage automatic referral tracking and fulfillment, to tag management systems that simplify installing integrating widgets inside your product, to mobile deeplinking platforms that let you optimize and personalize the mobile referral experience."
      cards={CardsArray}
    />
  );
}
