import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import { HomePage } from "components/homepages/HomePage";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Learning SaaSquatch cards

const adminPortal = {
  title: "SaaSquatch Admin Portal",
  description:
    "The Admin Portal is where you’ll build and run your programs, manage your participants, and view your analytics. Click here to learn how to use the Admin Portal. ",
  linkUrl: "/success/using-referral-saasquatch",
};

const growthAuto = {
  title: "Growth Automation",
  description:
    "What is Growth Automation, and why is it important for your business? In this section, you’ll find answers to these questions and details about how SaaSquatch can help you on your journey. ",
  linkUrl: "/growth/ga-101",
};

const programs = {
  title: "Programs",
  description:
    "Loyalty and referral programs are at the heart of what we do. Here you’ll find an overview of the programs we offer, as well as suggestions on how to market and optimize your program effectively.",
  linkUrl: "/success/intro",
};

const fraudSecurity = {
  title: "Fraud and Security Management",
  description:
    "Your security is always at the top of our mind. Learn more about how SaaSquatch keeps your user data safe, and how our Security Management System helps detect and mitigate the risk of fraudulent referral activity.",
  linkUrl: "/success/referral-security",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  adminPortal,
  programs,
  growthAuto,
  fraudSecurity,
];

export default function render() {
  return (
    <HomePage
      title="Learning SaaSquatch"
      highlights="<p style='margin-bottom: 16px;'>Start your SaaSquatch learning journey here. This is where you’ll find help understanding the SaaSquatch platform, Growth Automation, referral programs, and how we ensure that your user data stays secure.</p>
          Click the cards below to learn more about each topic.
          "
      cards={CardsArray}
    />
  );
}
