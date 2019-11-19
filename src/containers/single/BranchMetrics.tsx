import React from "react";
import { useRouteData } from "react-static";

import TocFrame from "../../components/TocFrame";
import { Properties } from "../../components/Properties";

//@ts-ignore
import branchFields from "json-loader!../../../content/metadata/branchFields.json";

export default () => {
  const { entry }: any = useRouteData();

  return (
    <TocFrame entry={entry}>
      <Properties schema={branchFields} />
    </TocFrame>
  );
};
