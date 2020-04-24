import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";

export const Tooltip = styled(Tippy)`
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0 4px;
  border-radius: 5px;

  /* Styling the arrow for different placements */
  &[data-placement^="top"] > .tippy-arrow::before {
    border-top-color: purple;
  }
`;
