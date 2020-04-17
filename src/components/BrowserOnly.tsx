import React from "react";

export default function BrowserOnly({ Component }) {
  if (typeof document === "undefined") {
    return <></>;
  }
  return <Component />;
}
