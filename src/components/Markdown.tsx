import React, { useLayoutEffect, useRef } from "react";
// @ts-ignore no types for marked
import marked from "marked";
import styled from "styled-components";

let mermaidAPI;
if(typeof document === "undefined"){
  mermaidAPI = null;
}else{
  mermaidAPI = require("mermaid").mermaidAPI
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

function useMermaid() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref && ref.current && mermaidAPI) {
      const charts = ref.current.querySelectorAll(".mermaid");
      charts.forEach(element => {
        if(element.querySelector("svg")){
          return; // Already rendered
        }
        var insertSvg = function(svgCode:string, bindFunctions) {
          element.innerHTML = svgCode;
        };
        // Disposable temporary container for mermaid
        const tempContainer = document.createElement("div");
        try{
          var graphDefinition = element.innerText;
          mermaidAPI.render("graphDiv", graphDefinition, insertSvg, tempContainer);  
        }catch(e){
          // Ignore errors
        }
      });
    }
  });
  return [ref];
}

renderer.code = function(code?: string, language?: string) {
  if (language && language.toLowerCase() === "mermaid") {
    return '<div class="mermaid">' + code + "</div>";
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
  const [ref]= useMermaid();

  var rawMarkup = marked(source, { sanitize: false, renderer: renderer });
  const html = { __html: rawMarkup };
  return <MD dangerouslySetInnerHTML={html} ref={ref} />;
}
