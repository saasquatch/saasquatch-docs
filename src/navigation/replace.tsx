import React from "react";
import { domToReact } from "html-react-parser";
import { HashLink as Link } from "react-router-hash-link";

import { ApiList, whitelist } from "./NavigationSidebar";

export function replace(domNode: any) {
  if (domNode.name && domNode.name === "apilist") {
    //@ts-ignore
    return <ApiList />;
  }
  if (domNode.name && domNode.name === "a") {
    const {href, ...rest} = domNode.attribs
    return (
      <Link to={href} {...rest}>
        {domToReact(domNode.children, { replace })}
      </Link>
    );
  }
  !whitelist.includes(domNode.name) &&
    domNode.type !== "text" &&
    console.dir(domNode, { depth: null });
}
