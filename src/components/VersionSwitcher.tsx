import React from "react";
import { useHistory } from "react-router";
import { VersionContext, Version } from "./useVersion";

export function VersionSwitcher({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const { version, setVersion } = VersionContext.useContainer();

  useHistory();
  const onClick = ()=> window.scrollTo({
    top:0
  })
  return (
    <a onClick={onClick} href="#">
      {children || "Change personalization"}
    </a>
  );
}
