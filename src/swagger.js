import parser from "swagger-parser";
import resolveAllOf from "json-schema-resolve-allof";

import raw from "json-loader!yaml-loader!../content/saasquatch-api.yaml";
import * as swaggerUtils from "../metalsmith/utils/swaggerUtils";


export default async function getSwagger() {
  const data = raw;

  if (!swaggerUtils || !swaggerUtils["methodsByTag"]) {
    throw new Error("Failed to import SwaggerUtils");
  }
  console.log("swage", raw);
  const spec = await parser.dereference(data);
  const resolved = await resolveAllOf(spec);

  return {
    swagger: resolved,
    methodsByTag: swaggerUtils.methodsByTag(resolved),
    tagMap: swaggerUtils.tagMap(resolved)
  };
}
