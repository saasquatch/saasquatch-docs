import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Running Programs cards

const placeholder = {
  title: "Learning SaaSquatch Placeholder",
  description:
    "Learn more about how to automate and grow your Customer Lifetime Value.",
  linkText: "No link",
  linkUrl: "#",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  placeholder,
  placeholder,
  placeholder,
  placeholder,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Running Programs"
          highlights="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
