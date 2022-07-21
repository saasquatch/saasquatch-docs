import { DependencyList, EffectCallback, useLayoutEffect } from "react";

/**
 *  Source: https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */

function noOpEffect(effect: EffectCallback, deps?: DependencyList) {
  // console.debug("No effect called", effect, deps);
}

const useBrowserEffect =
  typeof window !== "undefined" ? useLayoutEffect : noOpEffect;

export default useBrowserEffect;
