import React, { useRef, useMemo } from "react";
// @ts-ignore no types for marked
import marked from "marked";
import styled from "styled-components";
import uuidv4 from "uuid/v4";

import parse from "html-react-parser";
import DOMPurify from "../util/IsomoprhicDomPurify";
import { replace } from "../navigation/replace";
import useBrowserEffect from "src/util/useBrowserEffect";

// Stop mermaid for doing th
const SECRETID = "mermaid2018y125ug1";

let mermaidAPI;
if (typeof document === "undefined") {
  mermaidAPI = null;
} else {
  const mermaid = require("mermaid");

  mermaidAPI = mermaid.mermaidAPI;

  // Stops the default behaviour, which registers an `onLoad` listener to scrobble the page
  mermaidAPI.initialize({
    startOnLoad: false,
    gantt: {
      titleTopMargin: 25,
      barHeight: 40,
      barGap: 4,
      topPadding: 75,
      sidePadding: 75,
    },
  });
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
  .sq-mrmaid {
    visibility: collapse; /** Hides text until the graph is rendered */
  }
  .sq-mrmaid * {
    visibility: visible;
  }
  .sq-mrmaid svg {
    margin: 0 auto;
    display: block;
    width: 100%;
  }
  .sq-mrmaid svg .label {
    text-shadow: none; /* Overrides bootstrap CSS class conflict*/
  }
`;

function useMermaid(source) {
  const ref = useRef(null);
  useBrowserEffect(() => {
    if (ref && ref.current && mermaidAPI) {
      const charts = ref.current.querySelectorAll("." + SECRETID);
      charts.forEach(async (element: HTMLDivElement) => {
        if (element.querySelector("svg")) {
          return; // Already rendered
          // TODO: For dynamic pages, might need to make this just clear content to re-render
        }
        try {
          var graphDefinition = element.dataset.graph;
          const insertSvg = (svg: string) => {
            element.innerHTML = svg;
          };
          const tempId = "graphDiv" + uuidv4();

          await mermaidAPI.render(tempId, graphDefinition, insertSvg);
        } catch (e) {
          console.error("Failed to render mermaid", e);
          // Ignore errors
        }
      });
    }
  }, [ref, source]);
  return [ref];
}

function quoteattr(s, preserveCR?: string) {
  preserveCR = preserveCR ? "&#13;" : "\n";
  return (
    ("" + s) /* Forces the conversion to string. */
      .replace(/&/g, "&amp;") /* This MUST be the 1st replacement. */
      .replace(/'/g, "&apos;") /* The 4 other predefined entities, required. */
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      /*
      You may add other replacements here for HTML only 
      (but it's not necessary).
      Or for XML, only if the named entities are defined in its DTD.
      */

      .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
      .replace(/[\r\n]/g, preserveCR)
  );
}

renderer.code = function (code?: string, language?: string) {
  if (language && language.toLowerCase() === "mermaid") {
    return `<div class="${SECRETID} sq-mrmaid" data-graph="${quoteattr(
      code
    )}"></div>`;
  } else {
    return marked.Renderer.prototype.code.apply(this, arguments);
  }
};

// TODO: add anchor- &#x1F517;
// Override function
renderer.heading = function (
  text: string,
  level: number,
  raw: string,
  slugger: any
) {
  const slug = raw.toLowerCase().replace(/[^\w]+/g, "-");
  // TODO: Upgade to newer Marked for better slug support. Newer slugger supports duplicate slugs better by adding numbers (e.g. `head`, `head1`, `head2`)
  // const slug = slugger.slug(raw);

  return `
          <h${level} id="${slug}">
            <a class="heading-anchor" href="#${slug}">&#x1F517;</a>
            ${text}
          </h${level}>`;
};

export default function Markdown({ source }: { source: string }) {
  if (!source) return <div />;
  const [ref] = useMermaid(source);

  const comp = useMemo(() => {
    try {
      const rawMarkup = marked(source, { sanitize: false, renderer: renderer });
      // const betterHtml = DOMPurify.sanitize(rawMarkup);
      const component = parse(rawMarkup, { replace });
      return component;
    } catch (e) {
      console.error("SaaSquatch markdown parsing error", e, source);
      return (
        <div style={{ color: "red" }}>
          <h2>Error Loading This Page</h2>
          <pre>{source}</pre>
        </div>
      );
    }
  }, [source, renderer]);

  useBrowserEffect(() => {
    const contentInit = require("../assets/js/docs").contentInit;
    contentInit();
  }, [comp]);

  return <MD ref={ref}>{comp}</MD>;
}
