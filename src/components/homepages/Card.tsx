import * as React from "react";
import styled from "styled-components";

// Card styled components

const CardContainerDiv = styled.div`
  background-color: #ffffff;
  max-width: 500px;
  height: fit-content;
  padding: 0px 27px 27px 27px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-self: center;
  gap: 25px;
  -webkit-column-break-inside: avoid;
  column-break-inside: avoid;
  cursor: pointer;

  @media (max-width: 1025px) {
    max-width: 300px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 599px) {
    max-width: 100%;
  }
`;

const CardLinkWrapperA = styled.a`
  text-decoration: none !important;
`

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
  gap: 5px;
`;

const CardTitleH3 = styled.h3`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px !important;
  color: #003b45;
  line-height: 18px;
  @media (max-width: 1025px) {
    margin-top: 0px;
  }
`;

const CardDescriptionP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #575757;
`;

const CardLinkA = styled.a`
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  color: #06966F !important;
  text-decoration: none !important;
  margin-top: 5px;

  &:hover, :focus {
    color: #00694D !important;
    text-decoration: underline !important;
  }

  &:visited {
    color: #00694D;
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
    viewBox, d
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
              <path
              d={d}
              />
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
        <CardImageDiv>
          {svgSrc && <SVGIcon 
              fill={svgSrc.fill} 
              width={svgSrc.width} 
              height={svgSrc.height} 
              viewBox={svgSrc.viewBox} 
              d={svgSrc.d} 
          />}
          {imageSrc && <img src={imageSrc} />}
          {iconCode && <Icon iconCode={iconCode} />}
        </CardImageDiv>
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
