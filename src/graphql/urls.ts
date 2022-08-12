import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
  GraphQLUnionType,
} from "graphql";

export const getQueryUrl = (name: string) => `/graphql/query/${name}`;
export const getMutationUrl = (name: string) => `/graphql/mutation/${name}`;
export const getObjectUrl = (name: string) => `/graphql/object/${name}`;
export const getScalarUrl = (name: string) => `/graphql/scalar/${name}`;
export const getEnumUrl = (name: string) => `/graphql/enum/${name}`;
export const getInterfaceUrl = (name: string) => `/graphql/interface/${name}`;
export const getUnionUrl = (name: string) => `/graphql/union/${name}`;

export function getUrl(type: GraphQLType): [string, string | null] {
  if (type instanceof GraphQLScalarType) {
    if (["String", "Int", "Boolean", "Float", "ID"].includes(type.name))
      return [type.name, null];
    return [type.name, getScalarUrl(type.name)];
  } else if (
    type instanceof GraphQLObjectType ||
    type instanceof GraphQLInputObjectType
  ) {
    return [type.name, getObjectUrl(type.name)];
  } else if (type instanceof GraphQLEnumType) {
    return [type.name, getEnumUrl(type.name)];
  } else if (type instanceof GraphQLInterfaceType) {
    return [type.name, getInterfaceUrl(type.name)];
  } else if (type instanceof GraphQLUnionType) {
    return [type.name, getUnionUrl(type.name)];
  }
  throw new Error(`Unknown type ${type}`);
}

export function generateLink(url: string, name: string) {
  return `<a href="${url}">${name}</a>`;
}
