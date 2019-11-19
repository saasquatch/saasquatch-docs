import React from "react";
import { useRouteData } from "react-static";

import Meta from "../components/Meta";
import Markdown from "../components/Markdown";

export default () => {
  const { entry }: any = useRouteData();

  return (
    <>
      <Meta {...entry} />
      <Markdown source={entry.contents} />
    </>
  );
};
