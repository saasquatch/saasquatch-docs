import React from "react";
import ReactDOM from "react-dom";
import { HashLink as Link } from "react-router-hash-link";

import * as Styles from "./NavStyles";
import { InlineSearch } from "src/pages/search";
import { modalRoot } from "./NavigationSidebar";

export function PortalifiedSearch() {
  if (typeof document === "undefined") {
    return <div />;
  }
  return <PortalifiedSearchForBrowser />;
}

class PortalifiedSearchForBrowser extends React.Component {
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
        <Styles.Search>
          <InlineSearch Input={Styles.SearchInput} />
        </Styles.Search>
      </>,
      this.el
    );
  }
}
