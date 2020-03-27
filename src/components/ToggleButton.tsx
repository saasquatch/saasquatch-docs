import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ enabled: boolean }>`
  width: 250px;
  height: 30px;

  ${({ enabled }) =>
    enabled
      ? `
    background: red;
  `
      : `
    background: blue;
  `}
`;

interface ToggleButtonProps {
  initialState: boolean;
  enabledText: string;
  disabledText: string;
  style?: any;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  initialState,
  enabledText,
  disabledText,
  style = {}
}) => {
  const [enabled, setEnabled] = useState<boolean>(initialState);

  return (
    <StyledButton
      style={style}
      enabled={enabled}
      onClick={() => setEnabled(e => !e)}
    >
      {enabled ? enabledText : disabledText}
    </StyledButton>
  );
};
