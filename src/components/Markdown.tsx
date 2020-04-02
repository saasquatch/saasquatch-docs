import React, { useLayoutEffect, useRef } from "react";
// @ts-ignore no types for marked
import marked from "marked";
import styled from "styled-components";
import uuidv4 from "uuid/v4";

// Stop mermaid for doing th
const SECRETID = "mermaid2018y125ug1";

let mermaidAPI;
if(typeof document === "undefined"){
  mermaidAPI = null;
}else{
  const mermaid = require("mermaid");
  mermaidAPI = mermaid.mermaidAPI
  // Stops the default behaviour, which registers an `onLoad` listener to scrobble the page
  mermaidAPI.initialize({ startOnLoad:false })
}
// Get reference
const renderer = new marked.Renderer();

const MD = styled.div`
  .heading-anchor {
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

  *:hover > .heading-anchor,
  .heading-anchor:focus {
    opacity: 1;
  }
  .mermaid {
    visibility: collapse; /** Hides text until the graph is rendered */
  }
  .mermaid * {
    visibility: visible;
  }
  .mermaid svg {
    margin: 0 auto;
    display: block;
  }
  .mermaid svg .label {
    text-shadow: none; /* Overrides bootstrap CSS class conflict*/
  }
`;

function useMermaid(source) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref && ref.current && mermaidAPI) {
      const charts = ref.current.querySelectorAll("." + SECRETID);
      charts.forEach(async (element:HTMLDivElement) => {
        if(element.querySelector("svg")){
          return; // Already rendered
          // TODO: For dynamic pages, might need to make this just clear content to re-render
        }
        try{
          var graphDefinition = element.dataset.graph;
          const insertSvg = (svg:string)=>{
            element.innerHTML = svg;
          }
          const tempId = "graphDiv"+uuidv4()

          await mermaidAPI.render(tempId, graphDefinition, insertSvg);  
        }catch(e){
          console.error("Failed to render mermaid", e);
          // Ignore errors
        }
      });
    }
  },[ref, source]);
  return [ref];
}

function quoteattr(s, preserveCR?:string) {
  preserveCR = preserveCR ? '&#13;' : '\n';
  return ('' + s) /* Forces the conversion to string. */
      .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
      .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      /*
      You may add other replacements here for HTML only 
      (but it's not necessary).
      Or for XML, only if the named entities are defined in its DTD.
      */ 
      .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
      .replace(/[\r\n]/g, preserveCR);
      ;
}

renderer.code = function(code?: string, language?: string) {
  if (language && language.toLowerCase() === "mermaid") {
    return `<div class="${SECRETID}" data-graph="${quoteattr(code)}"></div>`;
  } else {
    return marked.Renderer.prototype.code.apply(this, arguments);
  }
};

// TODO: add anchor- &#x1F517;
// Override function
renderer.heading = function(
  text: string,
  level: number,
  raw: string,
  slugger: any
) {
  const slug = raw.toLowerCase().replace(/[^\w]+/g, "-");
  // TODO: Upgade to newer Marked for better slug support. Newer slugger supports duplicate slugs better by adding numbers (e.g. `head`, `head1`, `head2`)
  // const slug = slugger.slug(raw);

  return `
          <h${level}>
            <a name="${slug}" class="heading-anchor" href="#${slug}">&#x1F517;</a>
            ${text}
          </h${level}>`;
};

export default function Markdown({ source }: { source: string }) {
  if (!source) return <div />;
  const [ref]= useMermaid(source);

  var rawMarkup = marked(source, { sanitize: false, renderer: renderer });
  const html = { __html: rawMarkup };
  return <MD dangerouslySetInnerHTML={html} ref={ref} />;
}
