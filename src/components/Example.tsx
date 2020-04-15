import React from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
`
const PopOver = styled.div`
    background: #FFF;
    border: 1px solid #EEE;
    border-radius: 5px;
    padding: 10px;
`

export const Example = () => {
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });
   
    return (
      <Container>
        <button type="button" ref={setReferenceElement}>
          Reference element
        </button>
   
        <PopOver ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          Popper element
          <div ref={setArrowElement} style={styles.arrow}>^</div>
        </PopOver>
      </Container>
    );
  };