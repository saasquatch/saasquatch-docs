import React, { useMemo } from "react";
import hljs from "highlight.js";

export function JsonCode({ object }: { object: any }) {
  const highlighted = useMemo(() => {
    const highlightedCode = hljs.highlight(
      "json",
      JSON.stringify(object, null, 4)
    ).value;
    return { __html: highlightedCode };
  }, [object]);
  return (
    <pre>
      <code dangerouslySetInnerHTML={highlighted} className="lang-json" />
    </pre>
  );
}
