import { Category } from "./category";

export interface BaseDefinition {
  name: string;
  url: string | null;
  description: string | null;
}

export interface BaseDefinitionWithHTML extends BaseDefinition {
  html: string;
}

export interface ArgOrFieldDefinition extends BaseDefinition {
  type: string;
  is_optional: boolean;
  is_list: boolean;
  args: ArgOrFieldDefinition[] | null;
  html: string;
}

export interface QueryOrMutationDefinition extends BaseDefinitionWithHTML {
  typeUrl: string | null;
  args: ArgOrFieldDefinition[];
}

export interface QueryDefinition extends QueryOrMutationDefinition {}
export interface MutationDefinition extends QueryOrMutationDefinition {}

export interface ObjectDefinition extends BaseDefinitionWithHTML {
  fields: Record<string, ArgOrFieldDefinition>;
}

export interface ScalarDefinition extends BaseDefinitionWithHTML {}

export interface EnumDefinition extends BaseDefinitionWithHTML {
  variants: BaseDefinition[];
}

export interface InterfaceDefinition extends BaseDefinitionWithHTML {
  fields: Record<string, ArgOrFieldDefinition>;
}

export interface UnionDefinition extends BaseDefinitionWithHTML {}

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
