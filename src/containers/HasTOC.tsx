import React from "react";
import { useRouteData } from "react-static";

import TocFrame from "../components/TocFrame";

export default () => {
  const { entry, tocContents }: any = useRouteData();

  return (
    <>
      <TocFrame entry={entry} tocContents={tocContents} />
    </>
  );
};
