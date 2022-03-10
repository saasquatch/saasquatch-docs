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
    title = props.title + " | SaaSquatch " + (props.categoryName || "Docs");
  }else{
    title = "SaaSquatch Docs";
  }
  
  let ogImageURL:string;
  if(props?.fields?.ogFeaturedImage != null && Object.keys(props?.fields?.ogFeaturedImage).length >0){
    ogImageURL = props?.fields?.ogFeaturedImage[0]?.fields?.file?.url;
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
      {/* SEO content */}
      <meta name="description" content={props.fields?.seoDescription || props.highlights}/>
        
      <meta property="og:image" content={ogImageURL} />
      <meta name="twitter:image" content={ogImageURL} />
      
      <meta name="robots" content={props.fields?.robotsTag} />
      <link rel="canonical" href={props.fields?.canonicalUrl}/>
      
      

      <meta property="og:title" content={title} />
      
      <meta property="og:description" content={plainHighlights} />
      <meta
        name="docsSectionType"
        data-type="string"
        content={props.sectionType}
      />
      <meta name="docsCategory" data-type="string" content={props.category} />
    </Head>
  );
}
