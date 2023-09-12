import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  border: inherit;
`;

export const Logo = styled.div`
  background: #003b45;
  text-align: center;

  img {
    max-width: 200px;
    margin-top: 7px;
    margin-bottom: 10px;
  }
`;

export const HelpCenterLogo = styled.div`
  background: #003b45;
  text-align: center;
  border: 0;
  margin-top: -1px;

  img {
    max-width: 160px;
    margin: 0 -36px;
  }
`;

export const Search = styled.div`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  margin: none;
  // Override default from mmenu
  text-align: left;
`;

export const SearchInput = styled.input`
  // For Specificity issues
  input& {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
  }
`;

export const GraphQLLogo = styled.i`
  background: url(https://api.iconify.design/simple-icons:graphql.svg) no-repeat
    center center / contain;
  width: 16px;
  height: 16px;
`;

export const ContainerDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: #003b45;
  align-items: center;
  padding: 16px 0;
  column-gap: 24px;

  @media (max-width: 1600px) {
    flex-direction: column;
    align-items: flex-end;
    align-content: center;
    flex-wrap: wrap;
  }
`;
