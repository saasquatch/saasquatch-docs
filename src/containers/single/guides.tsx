import React from "react";

import { useRouteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";

import PageHeader from "../../components/PageHeader";
import ColumnGridItem, { ColumnGridWrapper } from "components/ColumnGridItem";

const entry = {
  title: "Guides",
  highlights: `The SaaSquatch Guides show you how to use our tools to create your own world-class referral and loyalty programs.`,
  sectionType: "guide",
  hero: true,
  // "slug": guides
  // "template": pages/guides.html
};
const id = "js-guides-215kjb2151";
export default function render() {
  const { guides, integrations } = useRouteData();
  console.log(guides)
  return (
    <PageHeader {...entry}>
      <ColumnGridWrapper id={id}>
        {Object.keys(guides).map((key: any) => {
          const guide = guides[key];
          return (
            <ColumnGridItem
              title={guide.name}
              image={undefined}
              icon={guide.icon}
              link={guide.slug}
            >
              {/* You can put more HTML in here for customization */}
              {guide.summary}
            </ColumnGridItem>
            // <div className={"guides-item " + guide.types.join(" ")}>
            //   {guide.icon && (
            //     <h3 className="text-center no-anchor">{guide.name}</h3>
            //   )}
            //   <div className="guides-image">
            //     <Link className="imageLink" to={guide.slug}>
            //       {guide.icon && (
            //         <i
            //           className={"icon fa fa-6 " + guide.icon}
            //           aria-hidden="true"
            //         ></i>
            //       )}
            //       {guide.image && (
            //         <img
            //           className="image"
            //           src={"/assets/images/integrations/" + guide.image}
            //         />
            //       )}
            //     </Link>
            //   </div>
            //   <p className="highlights guides-icon-highlights">
            //     {guide.summary}{" "}
            //   </p>

            //   <p>
            //     <Link className="link" to={guide.slug}>
            //       {guide.linkText}.{" "}
            //     </Link>
            //   </p>
            // </div>
          );
        })}

      </ColumnGridWrapper>
    </PageHeader>
  );
}
