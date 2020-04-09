import React from "react";
import styled from "styled-components";

interface PBProps {
  padding?: string | false;
  buttonColor?: string | false;
  darkercolor?: string | false;
  disabledcolor?: string | false;
  children: any[] | string;
  onClick: any;
  loading?: boolean;
  disabled?: boolean;
}

const PrimaryButtonStyled = styled.button<PBProps>`
  border-radius: 20px;
  min-width: 100px;
  padding: ${props => props.padding || `3px 19px`};
  background: ${props => props.buttonColor || `#f5a841`};
  border: 1px solid ${props => props.buttonColor || `#f5a841`};
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;

  &:hover,
  &:active,
  &:focus {
    background: ${props => props.darkercolor || `#DC8F28`};
    border: 1px solid ${props => props.buttonColor || `#DC8F28`};
    color: #fff;
    text-decoration: none;
    outline: none;
  }

  :disabled {
    background: ${props => props.disabledcolor || `#E2E2E2`};
    border: 1px solid ${props => props.disabledcolor || `#E2E2E2`};
    pointer-events: none;
  }
`;

export const PrimaryButton = ({
  children,
  onClick,
  padding,
  buttonColor,
  darkercolor,
  disabledcolor,
  loading,
  ...props
}: PBProps) => {
  return (
    <PrimaryButtonStyled
      {...props}
      padding={padding}
      buttonColor={buttonColor}
      darkercolor={darkercolor}
      disabledcolor={disabledcolor}
      onClick={onClick}
      disabled={loading || props.disabled}
    >
      {children}
      {/* {loading && <ButtonSpinner />} */}
    </PrimaryButtonStyled>
  );
};
