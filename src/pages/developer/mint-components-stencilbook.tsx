import React from "react";
import styled from "styled-components";
import Meta from "../../components/Meta";

const entry = {
  title: "Mint Components Reference",
  highlights:
    "We try our best to ensure backwards compatibility of our products, but sometimes we have to launch breaking changes. Our policy is to notify customers first by emailing our Breaking Changes list and posting details on this page.",
  slug: "developer/mint-components-stencilbook",
  sectionType: "developerCenter",
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sqm-stencilbook": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export const StencilbookDiv = styled.div`
  max-width: 100%;
  width: 100%;
  height: 90vh;
  position: relative;
`;

export default () => (
  <>
    <Meta title={"Mint Components"} />
    <section>
      <StencilbookDiv>
        <sqm-stencilbook></sqm-stencilbook>
      </StencilbookDiv>
    </section>
  </>
);
