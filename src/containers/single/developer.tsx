import { CardGrid, Card, CardProps, SVGProps } from "components/homepages/Card";
import PageHeader from "components/PageHeader";
import * as React from "react";
import styled from "styled-components";

// Page wrapper & card grid styled components

const PageWrapper = styled.div`
  padding: 0 50px;
`;

//SVG icons & Developer Center cards

const devGuidesIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 54 44`,
  d: "M34.9923 3.94858L24.201 41.4603C23.7879 42.8837 22.2957 43.7042 20.8624 43.3023C19.4292 42.8921 18.603 41.4101 19.0077 39.9867L29.799 2.47661C30.2121 1.05371 31.7043 0.22981 33.1375 0.636401C34.5708 1.04291 35.397 2.52601 34.9923 3.94858ZM43.7434 10.698L53.1858 20.0757C54.2396 21.1224 54.2396 22.8137 53.1858 23.8603L43.7434 33.238C42.6895 34.2847 40.9865 34.2847 39.9327 33.238C38.8789 32.1914 38.8789 30.5001 39.9327 29.4535L47.4613 21.968L39.9327 14.4826C38.8789 13.436 38.8789 11.7446 39.9327 10.698C40.9865 9.6514 42.6895 9.6514 43.7434 10.698ZM14.0673 14.4826L6.53445 21.968L14.0673 29.4535C15.1211 30.5001 15.1211 32.1914 14.0673 33.238C13.0134 34.2847 11.3104 34.2847 10.2566 33.238L0.811854 23.8603C-0.241647 22.8137 -0.241647 21.1224 0.811854 20.0757L10.2566 10.698C11.3104 9.6514 13.0134 9.6514 14.0673 10.698C15.1211 11.7446 15.1211 13.436 14.0673 14.4826Z",
};

const devGuides = {
  title: "Dev Guides",
  description:
    "Learn how to use our tools to create your own referral and loyalty programs.",
  svgSrc: devGuidesIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/guides",
};

const jsonWebIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 50 37`,
  d: "M10.9873 0.321411H14.991V4.32503H10.9873V14.3341C10.9873 15.3959 10.5655 16.4143 9.8147 17.1651C9.06387 17.9159 8.04553 18.3377 6.98371 18.3377C8.04553 18.3377 9.06387 18.7595 9.8147 19.5103C10.5655 20.2612 10.9873 21.2795 10.9873 22.3413V32.3504H14.991V36.354H10.9873C8.84539 35.8135 6.98371 34.5524 6.98371 32.3504V24.3431C6.98371 23.2813 6.5619 22.263 5.81107 21.5122C5.06025 20.7613 4.04191 20.3395 2.98008 20.3395H0.978271V16.3359H2.98008C4.04191 16.3359 5.06025 15.9141 5.81107 15.1633C6.5619 14.4124 6.98371 13.3941 6.98371 12.3323V4.32503C6.98371 3.26321 7.40551 2.24487 8.15634 1.49404C8.90716 0.74322 9.9255 0.321411 10.9873 0.321411ZM39.0127 0.321411C40.0745 0.321411 41.0929 0.74322 41.8437 1.49404C42.5945 2.24487 43.0163 3.26321 43.0163 4.32503V12.3323C43.0163 13.3941 43.4381 14.4124 44.1889 15.1633C44.9398 15.9141 45.9581 16.3359 47.0199 16.3359H49.0217V20.3395H47.0199C45.9581 20.3395 44.9398 20.7613 44.1889 21.5122C43.4381 22.263 43.0163 23.2813 43.0163 24.3431V32.3504C43.0163 33.4122 42.5945 34.4306 41.8437 35.1814C41.0929 35.9322 40.0745 36.354 39.0127 36.354H35.0091V32.3504H39.0127V22.3413C39.0127 21.2795 39.4345 20.2612 40.1853 19.5103C40.9361 18.7595 41.9545 18.3377 43.0163 18.3377C41.9545 18.3377 40.9361 17.9159 40.1853 17.1651C39.4345 16.4143 39.0127 15.3959 39.0127 14.3341V4.32503H35.0091V0.321411H39.0127ZM25 24.3431C25.5309 24.3431 26.0401 24.5541 26.4155 24.9295C26.7909 25.3049 27.0018 25.814 27.0018 26.345C27.0018 26.8759 26.7909 27.385 26.4155 27.7605C26.0401 28.1359 25.5309 28.3468 25 28.3468C24.4691 28.3468 23.9599 28.1359 23.5845 27.7605C23.2091 27.385 22.9982 26.8759 22.9982 26.345C22.9982 25.814 23.2091 25.3049 23.5845 24.9295C23.9599 24.5541 24.4691 24.3431 25 24.3431ZM16.9928 24.3431C17.5237 24.3431 18.0328 24.5541 18.4083 24.9295C18.7837 25.3049 18.9946 25.814 18.9946 26.345C18.9946 26.8759 18.7837 27.385 18.4083 27.7605C18.0328 28.1359 17.5237 28.3468 16.9928 28.3468C16.4619 28.3468 15.9527 28.1359 15.5773 27.7605C15.2019 27.385 14.991 26.8759 14.991 26.345C14.991 25.814 15.2019 25.3049 15.5773 24.9295C15.9527 24.5541 16.4619 24.3431 16.9928 24.3431ZM33.0073 24.3431C33.5382 24.3431 34.0473 24.5541 34.4228 24.9295C34.7982 25.3049 35.0091 25.814 35.0091 26.345C35.0091 26.8759 34.7982 27.385 34.4228 27.7605C34.0473 28.1359 33.5382 28.3468 33.0073 28.3468C32.4763 28.3468 31.9672 28.1359 31.5918 27.7605C31.2163 27.385 31.0054 26.8759 31.0054 26.345C31.0054 25.814 31.2163 25.3049 31.5918 24.9295C31.9672 24.5541 32.4763 24.3431 33.0073 24.3431Z",
};

const jsonWeb = {
  title: "JSON Web Tokens",
  description:
    "Used to validate the data being supplied to Referral SaaSquatch.",
  svgSrc: jsonWebIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/topics/json-web-tokens",
};

const bestPracticesIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 43 34`,
  d: "M1.60829 4.74286C0.710324 3.8406 0.710324 2.37822 1.60829 1.47596C2.50639 0.57442 3.96227 0.57442 4.86052 1.47596L18.6555 15.3368C19.5537 16.2391 19.5537 17.6971 18.6555 18.5994L4.86052 32.4581C3.96227 33.3603 2.50639 33.3603 1.60829 32.4581C0.710324 31.5558 0.710324 30.0978 1.60829 29.1955L13.7762 16.9681L1.60829 4.74286ZM40.0266 28.517C41.2985 28.517 42.3261 29.5492 42.3261 30.8268C42.3261 32.1044 41.2985 33.1366 40.0266 33.1366H19.3309C18.059 33.1366 17.0314 32.1044 17.0314 30.8268C17.0314 29.5492 18.059 28.517 19.3309 28.517H40.0266Z",
};

const bestPractices = {
  title: "Testing Best Practices",
  description:
    "Recommended program development process with SaaSquatch to minimize technical errors and installation deficiencies.",
  svgSrc: bestPracticesIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/developer/testing",
};

const squatchJSIcon: SVGProps = {
  fill: "#65bd60",
  width: "90%",
  height: "auto",
  viewBox: `0 0 54 62`,
  d: "M26.9419 61.709L5.02743 55.4702L0.131348 0.291016H53.8721L48.9897 55.4702L26.9419 61.709ZM12.2776 35.4314L13.1147 46.1017L26.9966 49.8088L40.7589 46.1188L42.6688 25.2327H18.1235L17.5324 18.2866H43.2702L43.8647 11.5865H10.1422L11.9257 32.0865H35.282L34.4518 40.8537L27.0068 42.9037L19.4355 40.8298L18.9538 35.4314H12.2776Z",
};

const squatchJS = {
  title: "Squatch.js",
  description:
    "One-stop shop to integrate a SaaSquatch program into your website or web app.",
  svgSrc: squatchJSIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/developer/squatchjs",
};

const restAPIIcon: SVGProps = {
  fill: "#65bd60",
  width: "90%",
  height: "auto",
  viewBox: `0 0 53 47`,
  d: "M48.1885 0.272461H5.07258C2.69222 0.272461 0.760986 2.1968 0.760986 4.56866V33.21C0.760986 35.5818 2.69222 37.5062 5.07258 37.5062H22.319L20.8818 41.8024H14.4144C13.2287 41.8024 12.2586 42.769 12.2586 43.9505C12.2586 45.1319 13.2287 46.0985 14.4144 46.0985H38.8467C40.0369 46.0985 41.0025 45.1364 41.0025 43.9505C41.0025 42.7645 40.0369 41.8024 38.8467 41.8024H32.3793L30.9421 37.5062H48.1885C50.5689 37.5062 52.5001 35.5818 52.5001 33.21V4.56866C52.5001 2.1968 50.5689 0.272461 48.1885 0.272461ZM46.7513 31.7779H6.50978V6.00072H46.7513V31.7779Z",
};

const restAPI = {
  title: "REST API",
  description: "Build your own custom logic on top of your referral program.",
  svgSrc: restAPIIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/api",
};

const graphQLIcon: SVGProps = {
  fill: "#65bd60",
  width: "100%",
  height: "auto",
  viewBox: `0 0 45 51`,
  d: "M21.1909 8.89726C22.0005 9.14204 22.8625 9.15529 23.6793 8.93551L37.122 32.6973C36.4997 33.2968 36.0623 34.0624 35.8619 34.903H9.13366C8.91859 34.0204 8.44505 33.2221 7.77366 32.6101L21.1888 8.89726H21.1909ZM19.2338 7.69663C19.272 7.73913 19.3145 7.77951 19.3549 7.81988L5.91003 31.588C5.84663 31.571 5.78287 31.5554 5.71878 31.5413V19.4564C6.33006 19.3196 6.90614 19.057 7.41031 18.6853C7.91447 18.3136 8.33567 17.8409 8.64703 17.2974C8.95713 16.7569 9.15297 16.1586 9.22242 15.5394C9.29187 14.9202 9.23345 14.2933 9.05078 13.6976L19.2338 7.69876V7.69663ZM26.82 5.92226C27.0354 5.24608 27.0891 4.52879 26.9767 3.82809C26.8644 3.12739 26.5892 2.46283 26.1732 1.88788C25.7572 1.31292 25.2121 0.843618 24.5817 0.517715C23.9513 0.191812 23.2533 0.0184073 22.5436 0.0114485C21.834 0.00448979 21.1327 0.164171 20.496 0.477649C19.8594 0.791127 19.3052 1.24965 18.878 1.81634C18.4508 2.38302 18.1626 3.04205 18.0366 3.74042C17.9105 4.43878 17.9501 5.15699 18.1522 5.83726L7.96278 11.8425C7.4738 11.341 6.87516 10.9598 6.21393 10.7288C5.5527 10.4979 4.8469 10.4234 4.15202 10.5113C3.45715 10.5993 2.79215 10.8472 2.20931 11.2356C1.62646 11.6241 1.14167 12.1424 0.793033 12.7499C0.444839 13.3581 0.241525 14.0384 0.19888 14.738C0.156235 15.4376 0.275406 16.1375 0.547138 16.7836C0.818871 17.4296 1.23585 18.0043 1.7657 18.4631C2.29555 18.9218 2.92402 19.2523 3.60228 19.4288V31.5731C2.92549 31.7514 2.29878 32.0829 1.77063 32.5421C1.24248 33.0014 0.827063 33.5759 0.556512 34.2214C0.285961 34.8668 0.167532 35.5659 0.210388 36.2645C0.253244 36.963 0.456236 37.6423 0.803658 38.2499C1.15181 38.8559 1.63557 39.3731 2.21703 39.7608C2.79849 40.1486 3.46185 40.3965 4.15513 40.485C4.8484 40.5735 5.55276 40.5003 6.213 40.271C6.87323 40.0418 7.47141 39.6627 7.96066 39.1636L18.15 45.1689C18.0282 45.5865 17.9667 46.0195 17.9673 46.4545C17.9659 47.0507 18.0821 47.6414 18.3092 48.1927C18.5363 48.7439 18.87 49.245 19.291 49.6672C19.712 50.0894 20.2121 50.4244 20.7627 50.6531C21.3134 50.8818 21.9037 50.9996 22.4999 50.9999C23.2254 50.9983 23.9399 50.823 24.5838 50.4887C25.2276 50.1543 25.7821 49.6706 26.2007 49.0781C26.6193 48.4856 26.8899 47.8014 26.9899 47.0828C27.0899 46.3643 27.0163 45.6322 26.7754 44.9479L36.8713 38.9979C37.3472 39.5357 37.9443 39.9525 38.6133 40.2137C39.2823 40.4749 40.0038 40.573 40.7182 40.4999C41.4327 40.4268 42.1194 40.1846 42.7216 39.7933C43.3238 39.402 43.8242 38.873 44.1813 38.2499C44.5393 37.6324 44.7467 36.9392 44.7869 36.2266C44.827 35.5139 44.6986 34.8018 44.4122 34.148C44.1258 33.4943 43.6893 32.9171 43.1382 32.4635C42.5871 32.0099 41.9369 31.6925 41.2403 31.537V19.467C41.9375 19.3113 42.5884 18.9941 43.1406 18.5408C43.6928 18.0876 44.1309 17.511 44.4195 16.8574C44.7081 16.2039 44.8392 15.4918 44.8023 14.7783C44.7653 14.0649 44.5614 13.3701 44.2068 12.7499C43.8539 12.1372 43.3625 11.6155 42.772 11.2266C42.1815 10.8377 41.5081 10.5923 40.8058 10.5101C40.1035 10.4279 39.3918 10.5112 38.7274 10.7533C38.063 10.9953 37.4645 11.3894 36.9797 11.9041L26.8222 5.92013L26.82 5.92226ZM25.5472 7.91338L25.7065 7.76038L35.9235 13.7805C35.757 14.3655 35.7093 14.9779 35.7834 15.5816C35.8575 16.1852 36.0518 16.7679 36.3549 17.2953C36.6519 17.8158 37.0497 18.2719 37.5252 18.6368C38.0006 19.0017 38.5441 19.268 39.1238 19.4203V31.5753C39.0682 31.5905 39.013 31.6068 38.958 31.6241L25.5472 7.91338ZM35.949 37.3616L25.8043 43.3414C25.3815 42.8889 24.8702 42.5282 24.3021 42.2818C23.734 42.0354 23.1213 41.9086 22.502 41.9091C21.2143 41.9091 20.054 42.4446 19.2295 43.3074L9.06141 37.3149C9.08691 37.232 9.11028 37.1491 9.12941 37.0641H35.8662C35.8917 37.164 35.9193 37.2639 35.9512 37.3616H35.949Z",
};

const graphQLAPI = {
  title: "GraphQL API",
  description:
    "API for building custom widgets, integrations, and admin interfaces based on GraphQL.",
  svgSrc: graphQLIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/graphql/reference/",
};

const mobileIcon: SVGProps = {
  fill: "#65bd60",
  width: "85%",
  height: "auto",
  viewBox: `0 0 36 52`,
  d: "M28.8407 0.0986328H6.42045C2.88224 0.0986328 0.0146484 2.9938 0.0146484 6.56602V45.3704C0.0146484 48.9426 2.88224 51.8378 6.42045 51.8378H28.8407C32.3789 51.8378 35.2465 48.9426 35.2465 45.3704V6.56602C35.2465 2.9938 32.3739 0.0986328 28.8407 0.0986328ZM17.6306 48.6041C15.854 48.6041 14.4277 47.1641 14.4277 45.3704C14.4277 43.5767 15.854 42.1367 17.6306 42.1367C19.4072 42.1367 20.8335 43.5767 20.8335 45.3704C20.8335 47.1641 19.4122 48.6041 17.6306 48.6041ZM28.8407 6.56602V38.903H6.42045V6.56602H28.8407Z",
};

const mobile = {
  title: "Mobile",
  description: "Learn how to grow with a referral program on a mobile app.",
  svgSrc: mobileIcon,
  linkText: "Learn more",
  linkUrl: "https://docs.saasquatch.com/mobile",
};

// Cards to be rendered array & render function

const CardsArray: Array<CardProps> = [
  devGuides,
  jsonWeb,
  bestPractices,
  squatchJS,
  restAPI,
  graphQLAPI,
  mobile,
];

export default function render() {
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Developer Center"
          highlights="SaaSquatch is a full platform for running growth automation programs across web, mobile and all your digital properties."
          category="landingPages" // right??
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
