import { Operation, Tag } from "swagger-schema-official";

export type Endpoint = {
  httpMethod: string;
  path: string;
  method: Operation;
};

export type EndpointSummary = {
  httpMethod: string;
  path: string;
  summary: string;
  anchor: string;
  tags: string[];
};

export type EndpointSummarySet = { [key: string]: string[] };

// Extensions to the Swagger tag schema
export type SuperTag = Tag & {
  // Indicates if a tag is meta-only
  "x-meta": boolean;

  // Indicates is a tag is deprecated
  "x-deprecated": boolean;
};

export const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
] as const;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
type HttpMethod = ElementType<typeof HTTP_METHODS>;
