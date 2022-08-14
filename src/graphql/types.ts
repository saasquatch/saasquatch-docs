import { Category } from "./category";

type Maybe<T> = undefined | null | T;

export interface BaseDefinition {
  name: string;
  url?: Maybe<string>;
  description: string;
}

export interface BaseDefinitionWithHTML extends BaseDefinition {
  html: string;
}

export interface ArgOrFieldDefinition extends BaseDefinitionWithHTML {
  is_optional: boolean;
  args?: Maybe<ArgOrFieldDefinition[]>;
  deprecationReason: Maybe<string>;
}

export interface QueryOrMutationDefinition extends BaseDefinitionWithHTML {
  type: BaseDefinition;
  args?: ArgOrFieldDefinition[];
  deprecationReason: Maybe<string>;
}

export interface QueryDefinition extends QueryOrMutationDefinition {}
export interface MutationDefinition extends QueryOrMutationDefinition {}

export interface ObjectDefinition extends BaseDefinitionWithHTML {
  fields: Record<string, ArgOrFieldDefinition>;
  interfaces: BaseDefinition[];
}

export interface ScalarDefinition extends BaseDefinitionWithHTML {}

export interface EnumDefinition extends BaseDefinitionWithHTML {
  values: (BaseDefinition & { deprecationReason?: Maybe<string> })[];
}

export interface InterfaceDefinition extends BaseDefinitionWithHTML {
  fields: Record<string, ArgOrFieldDefinition>;
}

export interface UnionDefinition extends BaseDefinitionWithHTML {
  types: BaseDefinition[];
}

export interface CategoryEntry {
  name: string;
  url: string;
}

export interface ProcessedSchema {
  categories: Record<string, Category>;
  queries: Record<string, QueryDefinition>;
  mutations: Record<string, MutationDefinition>;
  objects: Record<string, ObjectDefinition>;
  inputObjects: Record<string, ObjectDefinition>;
  scalars: Record<string, ScalarDefinition>;
  enums: Record<string, EnumDefinition>;
  interfaces: Record<string, InterfaceDefinition>;
  unions: Record<string, UnionDefinition>;
}
