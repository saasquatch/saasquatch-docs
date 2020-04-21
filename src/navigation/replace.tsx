import React from "react";
import { domToReact } from "html-react-parser";
import { HashLink as Link } from "react-router-hash-link";

import { ApiList } from "./NavigationSidebar";
import { InlineSearch } from "../pages/search";

export function replace(domNode: any) {
  if (domNode.name && domNode.name === "apilist") {
    //@ts-ignore
    return <ApiList />;
  }
  if (domNode.name && domNode.name === "a") {
    const { href, ...rest } = domNode.attribs;
    const classNames = rest["class"];
    delete rest["class"];

    return (
      <Link to={href} className={classNames} {...rest}>
        {domToReact(domNode.children, { replace })}
      </Link>
    );
  }

  if (domNode.name && domNode.name === "sidebar-header") {
    const { href, ...rest } = domNode.attribs;
    const classNames = rest["class"];
    delete rest["class"];

    return (
      <>
        {/* {(!domNode.attribs.noback) && (
          <li>
            <a className="back-link" href="#mm-5">
              <i className="fa fa-chevron-left"></i>
              Go Back
            </a>
          </li>
        )} */}
      </>
    );
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