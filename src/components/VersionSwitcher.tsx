import React from "react";
import { VersionContext, Version } from "./useVersion";

export function VersionSwitcher() {
  const { version, setVersion, openModal } = VersionContext.useContainer();

  return <a onClick={openModal} href="#">Change personalization</a>;
}
