import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  border: inherit;
`;

export const Logo = styled.div`
  background: #003b45;
  text-align: center;

  img {
    max-width: 160px;
    margin-top: 7px;
    margin-bottom: 0;
    margin-left: -25px;
  }
`;

export const HelpCenterLogo = styled.div`
  background: #003b45;
  text-align: center;
  border: 0;
  margin-top: -1px;

  img {
    max-width: 140px;
    margin-bottom: 15px;
    margin-left: 5px;
    margin-top: -3px;
  }
`;

export const Search = styled.div`
  padding: 5px;
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
background: url(https://api.iconify.design/simple-icons:graphql.svg)
no-repeat center center / contain;
width: 16px;
height: 16px;
`