import React from "react";
//@ts-ignore
import { StickyContainer, Sticky } from "react-sticky";

import PageHeader from "./PageHeader";
import TOC from "./TOC";

/**
 * A document / markdown / contenful entry
 *
 * Entry most
 */
export type Entry = {
  title: string;
  robots?: string;
  contents?: string;
  highlights?: string;
  hero?: boolean;
  tags?: string[];
  coverImage?: any;
  category?: string;
  categoryName?: string;
  sectionType?: string;
  fields?: { 
    seoDescription?: string,
    ogFeaturedImage?: {
      fields?:{
        file?:{
          url?: string;
        }
      }
    }  
    robotsTag?: string,
    canonicalUrl?: string;
    
    
  };
};

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

                    {entry.contents && <TOC source={entry.contents} />}
                    <ul>
                      <li>
                        <a href="#top">Introduction</a>
                      </li>
                    </ul>
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
