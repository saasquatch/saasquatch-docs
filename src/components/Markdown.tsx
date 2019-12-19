import React from "react";
// @ts-ignore no types for marked
import marked from "marked";
import styled from "styled-components"
import { mermaidAPI } from "mermaid";
import uuid from "uuid";

// Get reference
const renderer = new marked.Renderer();

const MD = styled.div`
.heading-anchor{
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 0.75em;
  line-height: inherit;
  font-family: anchorjs-icons;
  position: absolute;
  margin-left: -1.5em;
  padding-right: 0.5em;
  opacity: 0;
  -webkit-font-smoothing: antialiased;
  text-decoration: none;
}

*:hover > .heading-anchor, .heading-anchor:focus {
  opacity: 1;
}
.mermaid-center svg{
  margin: 0 auto;
  display: block;
}
`
renderer.code = function (code, language) {
  if(language.toLowerCase() === "mermaid"){
      const svg = mermaidAPI.render(uuid(), code);
      return '<div class="mermaid-center">'+svg+'</div>';
  } else {
      return '<pre><code class="lang-' + language + '">'+code+'</code></pre>';
  }
};

// TODO: add anchor- &#x1F517;
// Override function
renderer.heading = function (text:string, level:number, raw:string, slugger:any)
{
  const slug = raw.toLowerCase().replace(/[^\w]+/g, '-');
  // TODO: Upgade to newer Marked for better slug support
  // const slug = slugger.slug(raw);

  return `
          <h${level}>
            <a name="${slug}" class="heading-anchor" href="#${slug}">&#x1F517;</a>
            ${text}
          </h${level}>`;
};

export default function Markdown({source}:{source:string}){
    if(!source) return <div/>
    
    var rawMarkup = marked(source, {sanitize: false, renderer: renderer});
    const html =  { __html: rawMarkup };
    return <MD dangerouslySetInnerHTML={html} />
}