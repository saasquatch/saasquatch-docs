import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import { HomePage } from "components/homepages/HomePage";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Running Programs cards

const analyticsReporting = {
  title: "Analytics and Reporting",
  description:
    "Our built-in analytics dashboards provide you with vital information about your program’s growth and performance. Learn more about analytics and statistics and how to understand them here.",
  linkUrl: "/success/ga-analytics",
};

const userManagement = {
  title: "User Management",
  description:
    "Learn everything you need to know about adding and deleting user and event data, user purchase and refund events, attribution and identification, and more.",
  linkUrl: "/guides/one-time",
};

const bulkImports = {
  title: "Bulk Imports",
  description:
    "Our Admin Portal allows you to bulk import users, reward redemption information, and user or event deletions. Learn how to perform these actions here.",
  linkUrl: "/guides/user-import",
};

const managingw9 = {
  title: "Managing W-9 Compliance",
  description:
    "Learn how SaaSquatch helps you remain W-9 compliant when rewarding your U.S. participants. This section walks you through managing and assessing users’ W-9 compliance in our Admin Portal.",
  linkUrl: "/features/managing-w-9-compliance-for-participants",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  analyticsReporting,
  userManagement,
  bulkImports,
  managingw9,
];

export default function render() {
  return (
    <HomePage
      title="Running Programs"
      highlights="<p style='margin-bottom: 16px;'>You’ve built your program—what now? Here, we’ll give you all the info you need to run your program successfully, from user management, to analytics, and beyond.</p> 
          Click the cards below to learn more about each topic.
          "
      cards={CardsArray}
    />
  );
}
