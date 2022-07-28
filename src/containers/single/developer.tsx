import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import { HomePage } from "components/homepages/HomePage";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Developer Center cards

const devGuides = {
  title: "Dev Guides",
  description:
    "This section contains quickstart guides and other materials to help you understand and work with custom user fields, conversion and attribution tech, custom web components, Marketo and Instapage, and more.",
  linkUrl: "/guides/",
};

const jsonWeb = {
  title: "JSON Web Tokens",
  description:
    "Learn about how JSON Web Tokens are used to validate the data being supplied to SaaSquatch in Signed Requests made through squatch.js and Open Endpoints.",
  linkUrl: "/topics/json-web-tokens",
};

const bestPractices = {
  title: "Testing Best Practices",
  description:
    "Your SaaSquatch account has both a test and a live tenant. Learn about our best practices for testing with sample data, debugging, and more.",
  linkUrl: "/developer/testing",
};

const squatchJS = {
  title: "Squatch.js",
  description:
    "Learn about our custom JavaScript library, squatch.js. We have general information about the library available, as well as a quickstart guide, list of issue codes, advanced use cases, reference materials, and more.",
  linkUrl: "/developer/squatchjs",
};

const api = {
  title: "API",
  description:
    "Find documentation and reference materials related to GraphQL and REST API.",
  linkUrl: "/api",
};

const webhook = {
  title: "Webhook",
  description: "Learn about webhooks, webhook security, and more.",
  linkUrl: "/api/webhooks",
};

const mobile = {
  title: "Mobile",
  description:
    "Our iOS and Android SDKs integrate SaaSquatch programs natively into your apps. This section walks you through using them.",
  linkUrl: "/mobile",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  devGuides,
  squatchJS,
  api,
  webhook,
  mobile,
  jsonWeb,
  bestPractices,
];

export default function render() {
  return (
    <HomePage
      title="Developer Resources"
      highlights="<p style='margin-bottom: 16px;'>This is the one-stop shop for everything you need to know about our APIs, webhooks, mobile SDKs, and JavaScript library, squatch.js. We have dev guides, testing best practices, and more available to help you understand the tech that powers our platform.</p>  
          Click the cards below to learn more about each topic.
          "
      cards={CardsArray}
    />
  );
}
