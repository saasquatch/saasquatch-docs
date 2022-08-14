import {
  CategoryEntry,
  EnumDefinition,
  InterfaceDefinition,
  MutationDefinition,
  ObjectDefinition,
  QueryDefinition,
  ScalarDefinition,
  UnionDefinition,
} from "./types";

export class Category {
  readonly queries: Record<string, CategoryEntry> = {};
  readonly mutations: Record<string, CategoryEntry> = {};
  readonly objects: Record<string, CategoryEntry> = {};
  readonly enums: Record<string, CategoryEntry> = {};
  readonly interfaces: Record<string, CategoryEntry> = {};
  readonly scalars: Record<string, CategoryEntry> = {};
  readonly unions: Record<string, CategoryEntry> = {};

  constructor(public name: string) {}

  addQuery(queryDef: QueryDefinition) {
    if (queryDef.url) {
      this.queries[queryDef.name] = {
        name: queryDef.name,
        url: queryDef.url,
      };
    }
  }

  addMutation(mutationDef: MutationDefinition) {
    if (mutationDef.url) {
      this.mutations[mutationDef.name] = {
        name: mutationDef.name,
        url: mutationDef.url,
      };
    }
  }

  addObject(objectDef: ObjectDefinition) {
    if (objectDef.url) {
      this.objects[objectDef.name] = {
        name: objectDef.name,
        url: objectDef.url,
      };
    }
  }

  addScalar(scalarDef: ScalarDefinition) {
    if (scalarDef.url) {
      this.scalars[scalarDef.name] = {
        name: scalarDef.name,
        url: scalarDef.url,
      };
    }
  }

  addUnion(unionDef: UnionDefinition) {
    if (unionDef.url) {
      this.unions[unionDef.name] = {
        name: unionDef.name,
        url: unionDef.url,
      };
    }
  }

  addEnum(enumDef: EnumDefinition) {
    if (enumDef.url) {
      this.enums[enumDef.name] = {
        name: enumDef.name,
        url: enumDef.url,
      };
    }
  }

  addInterface(interfaceDef: InterfaceDefinition) {
    if (interfaceDef.url) {
      this.interfaces[interfaceDef.name] = {
        name: interfaceDef.name,
        url: interfaceDef.url,
      };
    }
  }
}
