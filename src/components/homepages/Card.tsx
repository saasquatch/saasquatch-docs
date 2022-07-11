import * as React from "react";
import styled from "styled-components";

// Card styled components

export const CardGrid = styled.div`
  padding-top: 20px;
  -moz-column-count: 2;
  column-count: 2;
  column-gap: 36px;
  column-fill: balance;

  & > * {
    width: 100%;
    margin-bottom: 36px;
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const CardContainerDiv = styled.div`
  background-color: #ffffff;
  height: fit-content;
  padding: 28px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-self: center;
  gap: 24px;
  -webkit-column-break-inside: avoid;
  cursor: pointer;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardLinkWrapperA = styled.a`
  text-decoration: none !important;
`;

const CardImageDiv = styled.div`
  margin-top: 27px;
  max-width: 200px;
  min-width: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBodyDiv = styled.div`
  font-family: Helvetica, Sans-Serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const CardTitleH3 = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: #003b45;
  line-height: 20px;
  margin: 0 !important;
`;

const CardDescriptionP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #575757;
  margin: 0 !important;
`;

const CardLinkA = styled.a`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #06966f !important;
  text-decoration: none !important;

  &:hover,
  :focus {
    color: #00694d !important;
    text-decoration: underline !important;
  }

  &:visited {
    color: #00694d;
    text-decoration: none !important;
  }
`;

// Icon styled components

const IconCircleDiv = styled.div`
  max-width: 250px;
  min-width: 120px;
  max-height: 250px;
  min-height: 120px;
  font-size: 20px;
  border-radius: 50%;
  color: #65bd60;
  background-color: #003b45;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1025px) {
    max-width: 200px;
    min-width: 100px;
    max-height: 200px;
    min-height: 100px;
    font-size: 17px;
  }
`;

const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: auto;

  @media (max-width: 1025px) {
    width: 50px;
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
  linkText,
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
          <CardLinkA href={linkUrl}>{linkText}</CardLinkA>
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
  linkText: string;
  linkUrl: string;
}

export interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  d?: string;
}
