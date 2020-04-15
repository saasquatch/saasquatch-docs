import React from "react";
import Tippy from "@tippyjs/react/headless";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
const PopOver = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
`;
const Arrow = styled.div`
  top: 0px;
`;

export const Example = () => (
  <Tippy
    visible={true}
    render={(attrs) => (
      <PopOver tabIndex={-1} {...attrs}>
        My tippy box
      </PopOver>
    )}
  >
    <button>My button</button>
  </Tippy>
);
