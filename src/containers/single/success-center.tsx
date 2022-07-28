import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Success Center cards

const saasGrowthAutoIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 65 38`,
  d: "M43.3333 8.125C41.3359 8.125 39.7222 6.50508 39.7222 4.5C39.7222 2.49492 41.3359 0.875 43.3333 0.875H61.3889C63.3863 0.875 65 2.49492 65 4.5V22.625C65 24.6301 63.3863 26.25 61.3889 26.25C59.3915 26.25 57.7778 24.6301 57.7778 22.625V13.2566L38.6615 32.4352C37.2509 33.8512 34.9714 33.8512 33.5608 32.4352L21.5651 20.5066L6.16484 36.0602C4.75425 37.4762 2.46797 37.4762 1.0576 36.0602C-0.352535 34.6441 -0.352535 32.3559 1.0576 30.9398L19.1163 12.8148C20.5269 11.3988 22.8064 11.3988 24.217 12.8148L36.1111 24.7434L52.6658 8.02305L43.3333 8.125Z",
};

const saasGrowthAuto = {
  title: "SaaSquatch Growth Automation",
  description:
    "Learn more about how to automate and grow your Customer Lifetime Value.",
  svgSrc: saasGrowthAutoIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/growth/saasquatch-ga/",
};

const programLibraryIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 55 62`,
  d: "M55 40.6875V5.8125C55 2.6023 52.3605 0 49.1071 0H11.7857C5.27656 0 0 5.20461 0 11.625V50.375C0 56.7954 5.27656 62 11.7857 62H51.0714C53.2407 62 55 60.2647 55 58.234C55 56.8148 54.1889 55.628 53.0357 54.9523V45.1002C54.2388 43.9328 55 42.407 55 40.6875ZM17.5681 15.5H41.1395C42.3304 15.5 43.2143 16.3719 43.2143 17.4375C43.2143 18.5031 42.3304 19.375 41.25 19.375H17.5681C16.5982 19.375 15.7143 18.5031 15.7143 17.4375C15.7143 16.3719 16.5982 15.5 17.5681 15.5ZM17.5681 23.25H41.1395C42.3304 23.25 43.2143 24.1219 43.2143 25.1875C43.2143 26.2531 42.3304 27.125 41.25 27.125H17.5681C16.5982 27.125 15.7143 26.2531 15.7143 25.1875C15.7143 24.1219 16.5982 23.25 17.5681 23.25ZM47.1429 54.25H11.7857C9.61641 54.25 7.85714 52.5147 7.85714 50.375C7.85714 48.2353 9.61641 46.5 11.7857 46.5H47.1429V54.25Z",
};

const programLibrary = {
  title: "Program Library",
  description:
    "A library of the available Growth Automation Programs by SaaSquatch.",
  svgSrc: programLibraryIcon,
  linkText: "Explore library",
  linkUrl: "https://docs.saasquatch.com/program/library/",
};

const programSetupIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 56 50`,
  d: "M2.02661 3.12939C2.02661 1.67908 3.29973 0.504395 4.65161 0.504395H8.15161C9.70473 0.504395 10.7766 1.67908 10.7766 3.12939V16.25H12.5266C14.0797 16.25 15.1516 17.4313 15.1516 18.875C15.1516 20.3297 14.0797 21.5 12.5266 21.5H3.77661C2.42473 21.5 1.15161 20.3297 1.15161 18.875C1.15161 17.4313 2.42473 16.25 3.77661 16.25H5.52661V5.75439H4.65161C3.29973 5.75439 2.02661 4.57861 2.02661 3.12939ZM8.98286 34.3188C8.26098 33.5094 6.9813 33.5641 6.35239 34.45L5.13614 36.1453C4.29395 37.3266 2.65442 37.6 1.47426 36.7578C0.294108 35.9156 0.021765 34.275 0.863953 33.1047L2.0802 31.3985C4.67676 27.7563 9.98911 27.4938 12.9313 30.8625C15.261 33.4328 15.2063 37.5234 12.811 40.1266L8.9938 44.25H12.625C14.0797 44.25 15.25 45.4203 15.25 46.875C15.25 48.3297 14.0797 49.5 12.625 49.5H3.00005C1.9577 49.5 1.0138 48.8875 0.595984 47.925C0.177077 46.9734 0.364109 45.8578 1.07067 45.0922L8.95005 36.561C9.52973 35.9266 9.54067 34.9641 8.98286 34.3188ZM52 4.00002C53.936 4.00002 55.5 5.56736 55.5 7.50002C55.5 9.43596 53.936 11 52 11H24C22.0641 11 20.5 9.43596 20.5 7.50002C20.5 5.56736 22.0641 4.00002 24 4.00002H52ZM52 21.5C53.936 21.5 55.5 23.0641 55.5 25C55.5 26.936 53.936 28.5 52 28.5H24C22.0641 28.5 20.5 26.936 20.5 25C20.5 23.0641 22.0641 21.5 24 21.5H52ZM52 39C53.936 39 55.5 40.5641 55.5 42.5C55.5 44.436 53.936 46 52 46H24C22.0641 46 20.5 44.436 20.5 42.5C20.5 40.5641 22.0641 39 24 39H52Z",
};

const programSetupQuickstart = {
  title: "Program Setup Quickstart",
  description:
    "Learn how to select, configure, and publish a new SaaSquatch Growth Automation Program in minutes.",
  svgSrc: programSetupIcon,
  linkText: "Get started",
  linkUrl: "https://docs.saasquatch.com/growth/quickstart/",
};

const referralProgramIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 57 46`,
  d: "M19.95 23C26.2467 23 31.35 17.8511 31.35 11.5C31.35 5.14894 26.2467 0 19.95 0C13.6533 0 8.55 5.14894 8.55 11.5C8.55 17.8511 13.6533 23 19.95 23ZM24.4655 27.3125H15.4345C6.91214 27.3125 0 34.2844 0 42.8824C0 44.6074 1.38225 46 3.08691 46H36.8149C38.5195 46 39.9 44.6074 39.9 42.8824C39.9 34.2844 32.9888 27.3125 24.4655 27.3125ZM54.8625 17.9688H50.5875V13.6562C50.5875 12.4703 49.6345 11.5 48.45 11.5C47.2655 11.5 46.3125 12.4658 46.3125 13.6562V17.9688H42.0375C40.8619 17.9688 39.9 18.9391 39.9 20.125C39.9 21.3109 40.8574 22.2812 42.0375 22.2812H46.3125V26.5938C46.3125 27.7887 47.2744 28.75 48.45 28.75C49.6256 28.75 50.5875 27.7842 50.5875 26.5938V22.2812H54.8625C56.047 22.2812 57 21.3199 57 20.125C57 18.9301 56.047 17.9688 54.8625 17.9688Z",
};

const referralProgramQuickstart = {
  title: "Referral Program Quickstart",
  description:
    "End to end guide for setting up a Growth Automation referral program.",
  svgSrc: referralProgramIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/guides/referral-quickstart/",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  saasGrowthAuto,
  programLibrary,
  programSetupQuickstart,
  referralProgramQuickstart,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Success Center"
          highlights="The SaaSquatch Growth Automation platform helps marketers and success teams better drive customer usage and purchase behaviour inside the products they support."
          category="landingPages"
        />
        <CardGrid>
          {CardsArray.map((card) => {
            return (
              <div style={{ display: "inline-block" }}>
                <Card
                  title={card.title}
                  description={card.description}
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
