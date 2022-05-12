import React from "react";
import { useRouteData } from "react-static";
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
  const { guides } = useRouteData();
  console.log(guides)
  return (
    <PageHeader {...entry}>
      <ColumnGridWrapper>
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
          );
        })}

      </ColumnGridWrapper>
    </PageHeader>
  );
}
