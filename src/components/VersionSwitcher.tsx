import React from "react";
import { VersionContext, Version } from "./useVersion";

export function VersionSwitcher({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const { version, setVersion, openModal } = VersionContext.useContainer();

  return (
    <a onClick={openModal} href="#">
      {children || "Change personalization"}
    </a>
  );
}
