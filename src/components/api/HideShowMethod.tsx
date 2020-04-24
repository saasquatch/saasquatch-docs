import React, { useState } from "react";

export function HideShowMethod({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [shown, setShown] = useState(false);
  const label = shown ? "Hide Method Details" : "Show Method Details";
  // Note: This is also a performance optimization. By not rendering children we are drastically speeding up the page.
  return (
    <div>
      <button onClick={() => setShown(!shown)}>View Method Details</button>
      {shown && children}
    </div>
  );
}
