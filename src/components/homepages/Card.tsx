import * as React from "react";
import styled from "styled-components";

// Card styled components

export const CardGrid = styled.div`
  padding-top: var(--sq-spacing-large);
  -moz-column-count: 2;
  column-count: 2;
  column-gap: 36px; // css variable?
  column-fill: balance;

  & > * {
    width: 100%;
    margin-bottom: 36px; // css variable?
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const CardContainerDiv = styled.div`
  background-color: var(--sq-nav-surface-secondary);
  height: fit-content;
  padding: 28px; // css variable?
  border: 1px solid var(--sq-border);
  border-radius: 4px; // css variable?
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08); // css variable?
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
    box-shadow: 3px 3px 7px rgb(0, 122, 91, 0.1); // css variable?
    border-color: #b5cdc7; // css variable?
  }
`;

const CardLinkWrapperA = styled.a`
  text-decoration: none !important;
`;

const CardImageDiv = styled.div`
  margin-top: 27px; // css variable?
  max-width: 200px; // css variable?
  min-width: 155px; // css variable?
  display: flex;
  align-items: center;
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

// Icon styled components

const IconCircleDiv = styled.div`
  max-width: 250px; // css variable?
  min-width: 120px; // css variable?
  max-height: 250px; // css variable?
  min-height: 120px; // css variable?
  font-size: 20px; // css variable?
  border-radius: 50%; // css variable?
  color: #65bd60; // css variable?
  background-color: var(--sq-nav-surface-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1025px) {
    max-width: 200px; // css variable?
    min-width: 100px; // css variable?
    max-height: 200px; // css variable?
    min-height: 100px; // css variable?
    font-size: 17px; // css variable?
  }
`;

const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px; // css variable?
  height: auto;

  @media (max-width: 1025px) {
    width: 50px; // css variable?
  }
`;

// Icon rendering functions

const Icon = ({ iconCode }) => (
  <IconCircleDiv>
    <i className={`fa fa-solid ${iconCode} fa-3x`}></i>
  </IconCircleDiv>
);

const SVGIcon: React.FC<SVGProps> = ({
  fill = "#65bd60",
  width = "100%",
  height = "auto",
  viewBox,
  d,
}) => {
  return (
    <IconCircleDiv>
      <IconSVGDiv>
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={d} />
        </svg>
      </IconSVGDiv>
    </IconCircleDiv>
  );
};

// Card HTML

export const Card: React.FC<CardProps> = ({
  title,
  description,
  svgSrc,
  imageSrc,
  iconCode,
  linkUrl,
}) => {
  return (
    <CardLinkWrapperA href={linkUrl}>
      <CardContainerDiv>
        {(svgSrc || imageSrc || iconCode) && (
          <CardImageDiv>
            {svgSrc && (
              <SVGIcon
                fill={svgSrc.fill}
                width={svgSrc.width}
                height={svgSrc.height}
                viewBox={svgSrc.viewBox}
                d={svgSrc.d}
              />
            )}
            {imageSrc && <img src={imageSrc} />}
            {iconCode && <Icon iconCode={iconCode} />}
          </CardImageDiv>
        )}
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
  iconCode?: string;
  svgSrc?: SVGProps;
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
