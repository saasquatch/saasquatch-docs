import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";
import { Card, CardGrid, CardProps } from "./Card";

interface HomePageProps {
  title: string;
  highlights: string;
  cards: CardProps[];
}

const PageWrapper = styled.div`
  padding: 0 var(--sq-spacing-xxx-large);
`;

export const HomePage: React.FC<HomePageProps> = ({
  title,
  highlights,
  cards,
}) => {
  return (
    <PageWrapper>
      <PageHeader
        title={title}
        highlights={highlights}
        category="landingPages"
      />
      <CardGrid>
        {cards.map((card) => {
          return (
            <div style={{ display: "inline-block" }}>
              <Card
                title={card.title}
                description={card.description}
                imageSrc={card.imageSrc}
                linkUrl={card.linkUrl}
              />
            </div>
          );
        })}
      </CardGrid>
    </PageWrapper>
  );
};
