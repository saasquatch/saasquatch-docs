import React from "react";

const sidebarRaw = require("html-loader!../templates/sidebar.html");
const apiList = require("html-loader!../templates/apilist.html");

export function NavigationSidebar() {
  const sidebar = sidebarRaw
    .replace("<APILIST/>", apiList)
    .replace("<APILIST />", apiList);
  return <HTML source={sidebar} />;
}

function HTML({ source }) {
  const html = { __html: source };
  return <div dangerouslySetInnerHTML={html} />;
}
