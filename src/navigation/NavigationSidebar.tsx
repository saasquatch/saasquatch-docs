import React from "react";
import parse from "html-react-parser";
import { replace } from "./replace";

const sidebarRaw = require("html-loader!../templates/sidebar.html");
const apiList = require("html-loader!../templates/apilist.html");

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

export function ApiList() {
  return parse(apiList, {
    replace,
  });
}

export function NavigationSidebar() {
  return (
    <div>
      {parse(sidebarRaw, {
        replace,
      })}
    </div>
  );
}
