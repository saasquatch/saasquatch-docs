import React from "react";
import { VersionContext, Version } from "./useVersion";


export function VersionSwitcher() {
  const { version, setVersion } = VersionContext.useContainer();
  
  return (
    <label htmlFor="filter">
      Change Filter:
      <select
        id="fitler"
        name="filter"
        defaultValue={version}
        onChange={(e) => {
            return setVersion(e.currentTarget.value as Version);
        }}
      >
        <option value="classic-only">Works With Classic</option>
        <option value="ga-only">No Classic</option>
        <option value="hybrid">Show Everything</option>
      </select>
    </label>
  );
}
