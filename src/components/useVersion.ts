import useCookie from "./useCookie";
import { createContainer } from "unstated-next";

const VERSIONS = ["classic-only", "hybrid", "ga-only"] as const;

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
type Version = ElementType<typeof VERSIONS>;

export function useVersion(): [Version, (next: Version) => void] {
  const [innerVersion, setInnerVersion] = useCookie("docs-version", "hybrid");

  // Adds validation
  const setVersion = (v: Version) => {
    // @ts-ignore
    if (!VERSIONS.includes(v)) throw new Error("Invalid version" + v);
    setInnerVersion(v);
  };

  // @ts-ignore
  if (!VERSIONS.includes(innerVersion)) {
    // Override default;
    setVersion("hybrid");
    return ["hybrid", setVersion];
  }

  return [innerVersion as Version, setVersion];
}

function useVersionContext() {
  let [version, setVersion] = useVersion();

  return {
    version,
    setVersion
  };
}

export const VersionContext = createContainer(useVersionContext);
