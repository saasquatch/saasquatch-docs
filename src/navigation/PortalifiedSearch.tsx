import React from "react";
import ReactDOM from "react-dom";
import { HashLink as Link } from "react-router-hash-link";

import * as Styles from "./NavStyles";
import { modalRoot } from "./NavigationSidebar";
import { isBlank, Search, SearchProps, useSearch } from "@saasquatch/squatch-search";
import styled from "styled-components";

export function PortalifiedSearch() {
  const searchProps: SearchProps = {
    onIsBlank: isBlank,
    useSearch: useSearch(),
    sidebar: true
  }
  if (typeof document === "undefined") {
    return <div />;
  }
  return <PortalifiedSearchForBrowser searchProps={searchProps}/>;
}

const SearchContainer = styled.div`
  max-width: 470px;
`;

class PortalifiedSearchForBrowser extends React.Component<any, any> {
  el: HTMLDivElement;
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    const { searchProps } = this.props;
    return ReactDOM.createPortal(
      <>
        <Styles.Logo>
          <Link to="/">
            <img src="/assets/images/saasquatch-logo.png" />
          </Link>
        </Styles.Logo>
        <Styles.HelpCenterLogo>
          <Link to="/">
            <img src="/assets/images/helpcenter.png" />
          </Link>
        </Styles.HelpCenterLogo>
          <SearchContainer>
            <Search {...searchProps}/>
          </SearchContainer>
      </>,
      this.el
    );
  }
}
