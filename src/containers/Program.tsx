import React from "react";
import { useRouteData } from "react-static";
import styled from "styled-components";
import Markdown from "../components/Markdown";
import Meta from "../components/Meta";

const ProgramItem = styled.div`
  .program-header-icon {
    background-color: #013b46;
    border-radius: 5px;
    margin: 20px;
    padding: 15px;
  }
  .program-header-icon img {
    max-height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
  .program-header-content-block {
    //position:relative;
    padding-top: 10px;
  }

  .program-header-content {
    color: #fff;
  }
  .program-header-item {
  }

  @media screen and (max-width: 767px) {
    #background-image {
      display: none;
    }
    .program-header-content {
      padding-left: 15px;
    }
  }

  @media screen and (min-width: 1330px) {
    .program-header-content-block {
      padding-top: 70px;
    }
  }

  .product-content {
    padding: 30px 0;
  }

  .screenshot-section {
    padding: 15px;
    margin: 30px 30px 0px 0px;
    background-color: #d2e4e6;
    border-radius: 5px;
  }
  #screenshot {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 250px;
    height: auto;
    border: 2px solid #999999;
    border-radius: 5px;
  }

  #screenshot:focus {
    outline: 0px;
  }
`;
const ProgramHeader = styled.div`
  background-color: #54909b;
  //position: relative;
`;

export default function render() {
  const { entry } = useRouteData();
  const { logo, title, highlights, screenshot, tags, contents } = entry;

  return (
    <>
      <Meta {...entry} />
      <section className="article-content">
        <ProgramItem>
          <ProgramHeader className="row-fluid">
            <div className="span2">
              <div className="program-header-icon">
                {logo && <img src={logo.url} alt={logo.name} id="logo" />}
              </div>
            </div>
            <div className="span7 program-header-content-block">
              <div className="program-header-content">
                <h1
                  style={{ display: "inline-block" }}
                  className="program-header-item"
                >
                  {title}
                </h1>

                {tags && tags.some(tag => tag == "Beta") && (
                  <span
                    style={{ display: "inline-block" }}
                    className="label docs-label-beta"
                  >
                    Beta
                  </span>
                )}
                <div className="program-header-item">
                  <Markdown source={highlights} />
                </div>
              </div>
            </div>
            <div className="span3">
              {screenshot && (
                <img
                  src={screenshot.url}
                  alt={screenshot.name}
                  id="background-image"
                />
              )}
            </div>
          </ProgramHeader>

          <div className="product-content no-anchor">
            {tags && tags.some(tag => tag == "Beta") && (
              <blockquote>
                <p>
                  This feature is currently in Beta. Please contact our{" "}
                  <a href="mailto:support@referralsaasquatch.com">
                    support team
                  </a>{" "}
                  to learn more about how to enroll.
                </p>
              </blockquote>
            )}

            <Markdown source={contents} />
          </div>

        </ProgramItem>
      </section>
    </>
  );
}
