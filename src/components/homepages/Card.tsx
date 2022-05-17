import * as React from "react";
import styled from "styled-components";
// import GraphQL from '../icons/GraphQL'

// Card Styled Componennts
const CardContainerDiv = styled.div`
  background-color: #ffffff;
  max-width: 500px;
  // width: 100%;
  // margin-right: 30px;
  height: fit-content;
  padding: 0px 27px 27px 27px;
  margin-bottom: 30px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-self: center;
  gap: 25px;
  -webkit-column-break-inside: avoid;
  column-break-inside: avoid;

  @media (max-width: 1025px) {
    max-width: 300px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 599px) {
    max-width: 100%;
    // flex-direction: column;
    // align-items: center;
  }
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
  gap: 5px;
`;

const CardTitleH3 = styled.h3`
  font-weight: 700;
  font-size: 18px;
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
  color: #333333;
`;

const CardLinkA = styled.a`
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  color: #00a176 !important;
  text-decoration: none;
  margin-top: 5px;
`;

// Icon Styled Components
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
  width: 65px;
  height: auto;
  @media (max-width: 1025px) {
      width: 60px;
  }
`;

const Icon = ({ iconCode }) => (
  <IconCircleDiv>
    <i className={`fa fa-solid ${iconCode} fa-3x`}></i>
  </IconCircleDiv>
);

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
    <CardContainerDiv>
      <CardImageDiv>
        {svgSrc && <TestIcon />}
        {imageSrc && <img src={imageSrc} />}
        {iconCode && <Icon iconCode={iconCode} />}
      </CardImageDiv>
      <CardBodyDiv>
        <CardTitleH3>{title}</CardTitleH3>
        <CardDescriptionP>{description}</CardDescriptionP>
        <CardLinkA href={linkUrl}>{linkText}</CardLinkA>
      </CardBodyDiv>
    </CardContainerDiv>
  );
};

export interface CardProps {
  imageSrc?: string;
  iconCode?: string;
  svgSrc?: boolean;

  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

/* Find better way to do this */

const TestIcon: React.FC<SVGProps> = ({
  fill = "#65bd60",
  width = "100%",
  height = "auto",
}) => {
  return (
    <IconCircleDiv>
        <IconSVGDiv>
        <svg
            width={width}
            height={height}
            viewBox={`0 0 45 51`}
            fill={fill}
            // fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            //   fill-rule="evenodd"
            //   clip-rule="evenodd"
            d="M21.1909 8.89726C22.0005 9.14204 22.8625 9.15529 23.6793 8.93551L37.122 32.6973C36.4997 33.2968 36.0623 34.0624 35.8619 34.903H9.13366C8.91859 34.0204 8.44505 33.2221 7.77366 32.6101L21.1888 8.89726H21.1909ZM19.2338 7.69663C19.272 7.73913 19.3145 7.77951 19.3549 7.81988L5.91003 31.588C5.84663 31.571 5.78287 31.5554 5.71878 31.5413V19.4564C6.33006 19.3196 6.90614 19.057 7.41031 18.6853C7.91447 18.3136 8.33567 17.8409 8.64703 17.2974C8.95713 16.7569 9.15297 16.1586 9.22242 15.5394C9.29187 14.9202 9.23345 14.2933 9.05078 13.6976L19.2338 7.69876V7.69663ZM26.82 5.92226C27.0354 5.24608 27.0891 4.52879 26.9767 3.82809C26.8644 3.12739 26.5892 2.46283 26.1732 1.88788C25.7572 1.31292 25.2121 0.843618 24.5817 0.517715C23.9513 0.191812 23.2533 0.0184073 22.5436 0.0114485C21.834 0.00448979 21.1327 0.164171 20.496 0.477649C19.8594 0.791127 19.3052 1.24965 18.878 1.81634C18.4508 2.38302 18.1626 3.04205 18.0366 3.74042C17.9105 4.43878 17.9501 5.15699 18.1522 5.83726L7.96278 11.8425C7.4738 11.341 6.87516 10.9598 6.21393 10.7288C5.5527 10.4979 4.8469 10.4234 4.15202 10.5113C3.45715 10.5993 2.79215 10.8472 2.20931 11.2356C1.62646 11.6241 1.14167 12.1424 0.793033 12.7499C0.444839 13.3581 0.241525 14.0384 0.19888 14.738C0.156235 15.4376 0.275406 16.1375 0.547138 16.7836C0.818871 17.4296 1.23585 18.0043 1.7657 18.4631C2.29555 18.9218 2.92402 19.2523 3.60228 19.4288V31.5731C2.92549 31.7514 2.29878 32.0829 1.77063 32.5421C1.24248 33.0014 0.827063 33.5759 0.556512 34.2214C0.285961 34.8668 0.167532 35.5659 0.210388 36.2645C0.253244 36.963 0.456236 37.6423 0.803658 38.2499C1.15181 38.8559 1.63557 39.3731 2.21703 39.7608C2.79849 40.1486 3.46185 40.3965 4.15513 40.485C4.8484 40.5735 5.55276 40.5003 6.213 40.271C6.87323 40.0418 7.47141 39.6627 7.96066 39.1636L18.15 45.1689C18.0282 45.5865 17.9667 46.0195 17.9673 46.4545C17.9659 47.0507 18.0821 47.6414 18.3092 48.1927C18.5363 48.7439 18.87 49.245 19.291 49.6672C19.712 50.0894 20.2121 50.4244 20.7627 50.6531C21.3134 50.8818 21.9037 50.9996 22.4999 50.9999C23.2254 50.9983 23.9399 50.823 24.5838 50.4887C25.2276 50.1543 25.7821 49.6706 26.2007 49.0781C26.6193 48.4856 26.8899 47.8014 26.9899 47.0828C27.0899 46.3643 27.0163 45.6322 26.7754 44.9479L36.8713 38.9979C37.3472 39.5357 37.9443 39.9525 38.6133 40.2137C39.2823 40.4749 40.0038 40.573 40.7182 40.4999C41.4327 40.4268 42.1194 40.1846 42.7216 39.7933C43.3238 39.402 43.8242 38.873 44.1813 38.2499C44.5393 37.6324 44.7467 36.9392 44.7869 36.2266C44.827 35.5139 44.6986 34.8018 44.4122 34.148C44.1258 33.4943 43.6893 32.9171 43.1382 32.4635C42.5871 32.0099 41.9369 31.6925 41.2403 31.537V19.467C41.9375 19.3113 42.5884 18.9941 43.1406 18.5408C43.6928 18.0876 44.1309 17.511 44.4195 16.8574C44.7081 16.2039 44.8392 15.4918 44.8023 14.7783C44.7653 14.0649 44.5614 13.3701 44.2068 12.7499C43.8539 12.1372 43.3625 11.6155 42.772 11.2266C42.1815 10.8377 41.5081 10.5923 40.8058 10.5101C40.1035 10.4279 39.3918 10.5112 38.7274 10.7533C38.063 10.9953 37.4645 11.3894 36.9797 11.9041L26.8222 5.92013L26.82 5.92226ZM25.5472 7.91338L25.7065 7.76038L35.9235 13.7805C35.757 14.3655 35.7093 14.9779 35.7834 15.5816C35.8575 16.1852 36.0518 16.7679 36.3549 17.2953C36.6519 17.8158 37.0497 18.2719 37.5252 18.6368C38.0006 19.0017 38.5441 19.268 39.1238 19.4203V31.5753C39.0682 31.5905 39.013 31.6068 38.958 31.6241L25.5472 7.91338ZM35.949 37.3616L25.8043 43.3414C25.3815 42.8889 24.8702 42.5282 24.3021 42.2818C23.734 42.0354 23.1213 41.9086 22.502 41.9091C21.2143 41.9091 20.054 42.4446 19.2295 43.3074L9.06141 37.3149C9.08691 37.232 9.11028 37.1491 9.12941 37.0641H35.8662C35.8917 37.164 35.9193 37.2639 35.9512 37.3616H35.949Z"
            // fill="#65BD60"
            fill={fill}
            />
        </svg>
        </IconSVGDiv>
    </IconCircleDiv>
  );
};

interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
}
