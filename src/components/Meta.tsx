import React from "react";
import marked from "marked";

import { Entry } from "./TocFrame";
import { Head } from "react-static";

/**
 * Sets the Global HTML / HEAD / body properties.
 *
 * Use `Head` from react-static, which is actually just `react-helmet`
 */
export default function render(
  props: Entry
) {
  function striptags(s: string) {
    return s.replace(/(<([^>]+)>)/gi, '');
  }

  function markdown(s: string) {
    if (!s) return "";
    return marked(s);
  }

  let title:string;
  if(props.title){
    title = props.title + " | SaaSquatch " + (props.categoryName || "Zachummentation");
  }else{
    title = "SaaSquatch Zachumentation";
  }
    
  const plainHighlights = striptags(markdown(props.highlights));
  return (
    <Head>
      <title>{title}</title>
      <body
        className={
          "docs sectionType-" + props.sectionType + " " + props.category
        }
      />
      <meta property="og:title" content={title} />
      <meta
        className="swiftype"
        name="title"
        data-type="string"
        content={props.title}
      />
      <meta
        className="swiftype"
        name="body"
        data-type="text"
        content={props.fields?.seoDescription || props.highlights}
      />
      <meta name="description" content={plainHighlights} />
      <meta property="og:description" content={plainHighlights} />

      <meta
        className="swiftype"
        name="type"
        data-type="enum"
        content={props.sectionType}
      />

      <meta
        name="docsSectionType"
        data-type="string"
        content={props.sectionType}
      />
      <meta name="docsCategory" data-type="string" content={props.category} />
    </Head>
  );
}
