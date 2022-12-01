import React from "react";
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

export default () => (
  <>
    <script src="https://fast.ssqt.io/npm/@saasquatch/mint-components@latest/dist/mint-components/mint-components.js"></script>
    <Meta title={null} />
    <section className="page">
      <div className="text-center">
        <sqm-stencilbook></sqm-stencilbook>
      </div>
    </section>
  </>
);
