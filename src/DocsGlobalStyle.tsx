/*
    Name: DocsGlobalStyle
    Purpose: Contains global CSS variables that are docs-specific and not included in visual-dev.
    Author: M. Solis de Ovando
*/

import React from "react";
import { createGlobalStyle } from "styled-components";

export const DocsCSSVariables = createGlobalStyle`
:root {

    /* Interactive */
    --docs-text-interactive: #007A5B;
    --docs-text-interactive-hovered: #00654C;
    --docs-card-border-hovered: #B5CDC7;

    /* Surface */
    --docs-surface-badge: #B5CDC7;
    --docs-surface-interactive-hovered: #E7EDEE;
}
`;
