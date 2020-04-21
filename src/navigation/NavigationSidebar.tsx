import React, { useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";
import { History } from "history";

import * as Styles from "./NavStyles";
import { replace } from "./replace";
import init from "./nav";
import { InlineSearch } from "src/pages/search";
import BrowserOnly from "components/BrowserOnly";

import "./mmenu-overrides.css";
// import "mmenu-js/dist/mmenu.css"

const sidebarRaw = require("html-loader!../templates/sidebar.html");
const apiList = require("html-loader!../templates/apilist.html");

export const whitelist = [
  "a",
  "span",
  "li",
  "ul",
  "div",
  "i",
  "br",
  "img",
  "input",
  "form",
  "nav",
  "small",
];

export function ApiList() {
  return parse(apiList, {
    replace,
  });
}

const modalRoot =
  typeof document === "undefined" ? undefined : document.createElement("div");

class PortalifiedSearch extends React.Component {
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
          <a href="/">
            <img src="/assets/images/saasquatch-logo.png" />
          </a>
        </Styles.Logo>
        <Styles.HelpCenterLogo>
          <a href="/">
            <img src="/assets/images/helpcenter.png" />
          </a>
        </Styles.HelpCenterLogo>
        <Styles.Search>
          <InlineSearch Input={Styles.SearchInput} />
        </Styles.Search>
      </>,
      this.el
    );
  }
}

export function NavigationSidebar() {
  const history: History<any> = useHistory();
  const container = useRef(null);

  useLayoutEffect(() => {
    init(modalRoot, history);
  }, [modalRoot]);

  return (
    <Styles.Container ref={container}>
      {parse(sidebarRaw, {
        replace,
      })}
      <BrowserOnly Component={PortalifiedSearch} />
    </Styles.Container>
  );
}
