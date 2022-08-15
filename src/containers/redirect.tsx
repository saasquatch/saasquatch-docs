import React from "react";
import { Redirect } from "react-router";
import { useRouteData } from "react-static";

export default () => {
  const { to } = useRouteData();
  return <Redirect to={to} />;
};
