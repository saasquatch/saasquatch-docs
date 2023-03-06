import React from "react";
import { Version, VersionContext } from "components/useVersion";
import { createGlobalStyle, css } from "styled-components";

const ConditionalStyles = createGlobalStyle<{
  version: Version;
}>`

${({ version }) =>
  version === "classic-only"
    ? css`
        new-programs-only {
          display: none;
        }
      `
    : version === "ga-only"
    ? css`
        classic-only {
          display: none;
        }
      `
    : null}
`;

export const PersonlizationStyles = () => {
  const { version } = VersionContext.useContainer();

  return <ConditionalStyles version={version} />;
};
