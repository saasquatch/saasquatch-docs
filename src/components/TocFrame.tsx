import React from "react";
//@ts-ignore
import { StickyContainer, Sticky } from "react-sticky";
import styled from "styled-components";

import PageHeader from "./PageHeader";
import TOC from "./TOC";


/**
 * A document / markdown / contenful entry
 *
 * Entry most
 */
export type Entry = {
  title: string;
  contents?: string;
  highlights?: string;
  hero?: boolean;
  tags?: string[];
  coverImage?: any;
  category?: string;
  categoryName?: string;
  sectionType?: string;
  fields?: { seoDescription?: string };
};


// get from gobal color somewhere
const TOCStylesDiv = styled.div`
  ul{
    margin: 0;
  }
  li > ul{
    margin-top: 5px
    margin-left: 12px
  }
  li{
    list-style-type: none;
    line-style:none;

    border-left: 1px solid #E2E2E2;
  }

  /* clear default <a> styles*/
  a, a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: inherit;
    font-weight: inherit;
  }
  a {
    display: inline-block
    padding: 8px 12px;

    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #575757;
  }
  a:hover {
    font-weight: 700;
    border-left: 2px solid #007A5B;
    padding-right: 0;
  }
`


export default function render({
  entry,
  children,
  tocContents
}: {
  entry: Entry;
  tocContents?: string;
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <StickyContainer>
      {console.log("entry",entry)}
      <div className="row-fluid">
        <div className="span9">
          <PageHeader {...entry} children={children}/>
        </div>
        <div className="span3">
          <Sticky>
            {({ style }: any) => {
              return (
                <div style={style}>
                  <div className="hidden-phone">
                    <div className="toc-title">In this Article:</div>

                    <TOCStylesDiv>
                      <ul>
                        <li>
                          <a href="#top">Introduction</a>
                        </li>
                      </ul>
                      
                      {entry.contents && <TOC source={entry.contents} />}

                    </TOCStylesDiv>

                  </div>
                </div>
              );
            }}
          </Sticky>
        </div>
      </div>
    </StickyContainer>
  );
}
