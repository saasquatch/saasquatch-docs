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
    // TODO: to support hash links, switch to react router? https://github.com/rafrex/react-router-hash-link
    return (
      <Link to={domNode.attribs.href}>
        {domToReact(domNode.children, { replace })}
      </Link>
    );
  }
  !whitelist.includes(domNode.name) &&
    domNode.type !== "text" &&
    console.dir(domNode, { depth: null });
}
