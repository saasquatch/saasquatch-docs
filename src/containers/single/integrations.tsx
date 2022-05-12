// @ts-nocheck
import React from "react";
import { useRouteData } from "react-static";
import PageHeader from "../../components/PageHeader";
import ColumnGridItem, { ColumnGridWrapper } from "components/ColumnGridItem";

const entry = {
  title: "Integrations",
  highlights: `SaaSquatch integrates with a number of platforms from payment systems that manage automatic referral tracking and fulfillment, to tag management systems that simplify installing integrating
widgets inside your product, to mobile deeplinking platforms that let you optimize and personalize the mobile referral experience.`,
  category: "landingPage",
};

export default function render() {
  const { integrations } = useRouteData();
  return (
    <PageHeader {...entry}>
      <ColumnGridWrapper>
        {integrations.map((integration) => {
          return (
            <ColumnGridItem
              image={integration.logo.url}
              link={"/" + integration.slug}
              key={integration.slug}
            >
              {/* You can put more HTML in here for customization */}
              {integration.integrationDescription}
            </ColumnGridItem>
          );
        })}
      </ColumnGridWrapper>
    </PageHeader>
  );
}
