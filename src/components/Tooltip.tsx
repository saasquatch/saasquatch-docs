import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";

export const Tooltip = styled(Tippy)`
  background: rgba(0, 0, 0, 0.6);
  color: var(--sq-text-on-primary);
  padding: 0 var(--sq-spacing-xx-small);
  border-radius: 5px;

  /* Styling the arrow for different placements */
  &[data-placement^="top"] > .tippy-arrow::before {
    border-top-color: purple;
  }
`;
