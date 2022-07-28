import * as React from "react";
import styled from "styled-components";

// Card styled components

export const CardGrid = styled.div`
  padding-top: var(--sq-spacing-large);
  -moz-column-count: 2;
  column-count: 2;
  column-gap: var(--sq-spacing-xx-large);
  column-fill: balance;

  & > * {
    width: 100%;
    margin-bottom: var(--sq-spacing-xx-large);
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const CardContainerDiv = styled.div`
  background-color: var(--sq-nav-surface-secondary);
  height: fit-content;
  padding: 24px;
  border: 1px solid var(--sq-border);
  border-radius: 4px; // css variable?
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-self: center;
  gap: var(--sq-spacing-x-large);
  -webkit-column-break-inside: avoid;
  cursor: pointer;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
  }

  :hover {
    box-shadow: 3px 3px 7px rgb(0, 122, 91, 0.1);
    border-color: #b5cdc7; // css variable?
  }
`;

const CardLinkWrapperA = styled.a`
  text-decoration: none !important;
`;

const CardImageDiv = styled.div`
  max-width: 200px;
  min-width: 155px;
  display: flex;
  align-items: center !important;
  justify-content: center;
`;

const CardBodyDiv = styled.div`
  font-family: var(--sq-font-family-sans);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--sq-spacing-small);
`;

const CardTitleH3 = styled.h3`
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  color: var(--sq-nav-text-on-secondary);
  line-height: var(--sq-line-height-header-three);
  margin: 0 !important;
`;

const CardDescriptionP = styled.p`
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-text);
  margin: 0 !important;
`;

// Card HTML

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  linkUrl,
}) => {
  return (
    <CardLinkWrapperA href={linkUrl}>
      <CardContainerDiv>
        {imageSrc && <CardImageDiv>{<img src={imageSrc} />}</CardImageDiv>}
        <CardBodyDiv>
          <CardTitleH3>{title}</CardTitleH3>
          <CardDescriptionP>{description}</CardDescriptionP>
        </CardBodyDiv>
      </CardContainerDiv>
    </CardLinkWrapperA>
  );
};

// Card & SVG Props

export interface CardProps {
  imageSrc?: string;
  title: string;
  description: string;
  linkUrl: string;
}

export interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  d?: string;
}
