import { DependencyList, EffectCallback, useLayoutEffect } from "react";

export default function useBrowserEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  // No effect in Node env
  if (typeof document === "undefined") return;
  useLayoutEffect(effect, deps);
}
