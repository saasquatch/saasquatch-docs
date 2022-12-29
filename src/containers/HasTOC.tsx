import React from "react";
import { useRouteData } from "react-static";
import { Redirect } from 'react-router-dom';
import TocFrame from "../components/TocFrame";
import MetaTags from 'react-meta-tags';


export default () => {
  const { entry, tocContents }: any = useRouteData();
  if(entry.slug == "squatchjs/issue/RS017" || entry.slug == "squatchjs/issue/RS027"){
    return <Redirect to='/squatchjs/issue/rs020' />
  }
  return (
    <>
      <TocFrame entry={entry} tocContents={tocContents} />
    </>
  );
};
