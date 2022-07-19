import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Building Programs cards

const programs = {
  title: "Programs",
  description:
    "Learn more about all things program-related, from a quickstart guide to detailed descriptions of each of our available program types and how they work.",
  linkUrl: "/growth/quickstart",
};

const programWidgets = {
  title: "Program Widgets",
  description:
    "Most users will engage with your program through a program widget. The articles in this section will support you in creating a memorable end user experience through widget editing and customization.",
  linkUrl: "/designer/widget-editor",
};

const rewards = {
  title: "Rewards",
  description:
    "Choosing the right reward is essential for your program’s success. Learn more about our program reward options, including gift card rewards, reward exchange, and more.",
  linkUrl: "/feature/rewards",
};

const userSegmentation = {
  title: "User Segmentation",
  description:
    "Divide your users into groups based on shared characteristics to improve program personalization and ROI. Learn how to create user segments and add participants to them in this article.",
  linkUrl: "/features/user-segmentation",
};

const programEmails = {
  title: "Program Emails",
  description:
    "Program emails can be configured to send at many stages of the referral lifecycle, from the start of a referral through to conversion. Learn how to design your program emails and add personalized content with short tags.",
  linkUrl: "/designer/email-editor",
};

const w9Compliance = {
  title: "W-9 Compliance",
  description:
    "Learn how SaaSquatch helps you remain W-9 compliant when rewarding your U.S. participants. This section explains W-9 compliance for your tenant and your reward catalog.",
  linkUrl: "/features/w-9-compliance",
};

const programInternational = {
  title: "Program Internationalization",
  description:
    "Translate and adapt your SaaSquatch programs to support each of the languages and regions you operate in. Learn more about how to internationalize your programs here.",
  linkUrl: "/features/program-i18n",
};

const microsites = {
  title: "Microsites",
  description:
    "Microsites are often used by clients with affiliate or partner programs. Here, you’ll learn how to set them up and use our microsite editor to customize your end users’ experience.",
  linkUrl: "/building-programs/microsites/quickstart-guide/",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  programs,
  programWidgets,
  rewards,
  userSegmentation,
  programEmails,
  w9Compliance,
  programInternational,
  microsites,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Building Programs"
          highlights="<p style='margin-bottom: 12px;'>We’ve prepared these articles to help you design and deploy your perfect program—whether you’re building one for the first time or the fifth. This is where you’ll find more information about various program types; how to customize your end user experience through widgets, emails; how to maintain W-9 compliance; and more.</p> 
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
