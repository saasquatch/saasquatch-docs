import React from "react";
import styled from "styled-components";

export const BootstrapListGroup = styled.ul`
  //
  // List groups
  // --------------------------------------------------

  // Base class
  //
  // Easily usable on <ul>, <ol>, or <div>.
  // No need to set list-style: none; since .list-group-item is block level
  margin-bottom: var(--sq-spacing-large);
  padding-left: 0; // reset padding because ul and ol
`;

export const BootstrapListGroupItem = styled.li`
  // Individual list items
  //
  // Use on li or div within the .list-group parent.

  position: relative;
  display: block;
  padding: 10px 15px;
  // Place the border on the list items and negative margin up for better styling
  margin-bottom: -1px;
  background-color: #eee;
  border: 1px solid #ccc;

  // Round the first and last items
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 5px 5px;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--sq-spacing-large);
`;

export const VersionLabel = styled.span`
  height: 20px;
  padding: 5px 5px 0 5px;
  margin-bottom: 15px;
  margin-left: 15px;
  font-size: var(--sq-font-size-caption);
`;

export const HTTPMethod = styled.span`
  text-transform: uppercase;
`;
