import React from "react";
import { domToReact } from "html-react-parser";
import attributesToProps from "html-react-parser/lib/attributes-to-props";
import { HashLink as Link } from "react-router-hash-link";

export function replace(domNode: any) {
  if (domNode.name && domNode.name === "a") {
    const { href, ...rest } = domNode.attribs;
    const props = attributesToProps(rest);
    if(href && !href.startsWith("http:") && !href.startsWith("https:") && !href.startsWith("mailto:")){
      // Local (relative) links pimped with react router navigation
      return (
        <Link to={href} {...props}>
          {domToReact(domNode.children, { replace })}
        </Link>
      );  
    }else{
      // Default behaviour for links to fully qualified URLs
    }
  }

  // !whitelist.includes(domNode.name) &&
  //   domNode.type !== "text" &&
  //   console.dir(domNode, { depth: null });
}

export const whitelist = [
  "a",
  "span",
  "li",
  "ul",
  "div",
  "i",
  "br",
  "img",
  "input",
  "form",
  "nav",
  "small",
];
