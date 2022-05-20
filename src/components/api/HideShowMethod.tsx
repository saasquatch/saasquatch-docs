import React, { useState } from "react";
import styled from "styled-components";
import { Chevron } from "components/icons";

const MethodButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  padding: var(--sq-spacing-small);
  padding-left: 0px;
  cursor: pointer;

  font-size: var(--sq-font-size-regular);
  font-weight: bold;
  color: #777;

  & > span {
    margin-left: var(--sq-spacing-medium);
    margin-top: -2px;
  }
`;

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
      <MethodButton onClick={() => setShown(!shown)}>
        View Method Details
        <Chevron direction={shown ? "up" : "down"} />
      </MethodButton>
      {shown && children}
    </div>
  );
}
