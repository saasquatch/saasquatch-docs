import { Endpoint, HTTP_METHODS, SuperTag } from "./Types";
import { Spec } from "swagger-schema-official";

export type TagMap = { [key: string]: SuperTag };
export type EndpointByTag = { [key: string]: Endpoint[] };

export function getEndpoints(swagger: Spec): Endpoint[] {
  return Object.keys(swagger.paths).reduce((acc: Endpoint[], path: string) => {
    const methods = swagger.paths[path];
    const subEndpoints = Object.keys(methods)
      .filter((httpMethod) =>
        // ignore other parts of Path like `parameters`
        HTTP_METHODS.includes(httpMethod as any)
      )
      .map((httpMethod: string) => {
        const method = methods[httpMethod];
        return {
          httpMethod,
          path,
          method,
        };
      });

    return [...acc, ...subEndpoints];
  }, []);
}

/**
 * Groups Swagger methods by Tag. If a method has multiple tags, it will be listed in each one.
 *
 */
export function tagsMapper(swagger: Spec): TagMap {
  // console.log(swagger.tags);
  return swagger.tags.reduce<TagMap>((result, val) => {
    result[val.name] = val as SuperTag;
    return result;
  }, {});
}

export function endpointsByTag(swagger: Spec): EndpointByTag {
  return getEndpoints(swagger).reduce<EndpointByTag>((result, endpoint) => {
    endpoint.method.tags.forEach((tag) => {
      (result[tag] || (result[tag] = [])).push(endpoint);
    });
    return result;
  }, {});
}
