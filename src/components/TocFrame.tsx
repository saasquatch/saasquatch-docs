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


const TOCStylesDiv = styled.div`
  max-height: calc(100vh - 120px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ul{
    margin: 0;
  }
  li > ul{
    margin-top: 5px;
    margin-left: 12px;
  }
  li{
    list-style-type: none;
    line-style:none;

    border-left: 1px solid var(--sq-border);
  }

  /* clear default <a> styles*/
  a, a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: inherit;
    font-weight: inherit;
  }
  a {
    display: inline-block
    padding: var(--sq-spacing-xx-small) var(--sq-spacing-small);

    font-family: 'Helvetica';
    font-style: normal;
    font-weight: var(--sq-font-weight-regular);
    font-size: var(--sq-font-size-regular);
    color: var(--sq-text);
  }
  a:hover {
    font-weight: var( --sq-font-weight-bold);
    border-left: 2px solid #007A5B;
    padding-right: 0;

    position:relative;
    left: -1px;
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
      {/* {console.log("entry",entry)} */}
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
