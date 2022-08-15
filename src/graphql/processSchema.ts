import {
  buildSchema,
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
  GraphQLUnionType,
} from "graphql";

import { Category } from "./category";
import { print } from "./printer";
import {
  ArgOrFieldDefinition,
  BaseDefinition,
  EnumDefinition,
  InterfaceDefinition,
  MutationDefinition,
  ObjectDefinition,
  ProcessedSchema,
  QueryDefinition,
  ScalarDefinition,
  UnionDefinition,
} from "./types";
import * as urls from "./urls";
import * as utils from "./utils";

const DEFAULT_DESCRIPTION =
  "Sorry, this part of the API is currently undocumented. Please let us know so we can improve our documentation!";

export function processSchema(schemaText: string): ProcessedSchema {
  const schema = buildSchema(schemaText);

  const queryType = schema.getQueryType();
  if (!queryType) throw new Error("Could not find query type on schema");

  const mutationType = schema.getMutationType();
  if (!mutationType) throw new Error("Could not find mutation type on schema");

  const categories: Record<string, Category> = {};
  const objects: Record<string, ObjectDefinition> = {};
  const inputObjects: Record<string, ObjectDefinition> = {};
  const scalars: Record<string, ScalarDefinition> = {};
  const enums: Record<string, EnumDefinition> = {};
  const interfaces: Record<string, InterfaceDefinition> = {};
  const unions: Record<string, UnionDefinition> = {};

  function getOrCreateCategory(categoryName: string) {
    if (!(categoryName in categories)) {
      categories[categoryName] = new Category(categoryName);
    }
    return categories[categoryName];
  }

  function definitionFromField(
    field: GraphQLField<any, any, any> | GraphQLInputField,
    category: Category,
    parents?: Set<string>
  ): ArgOrFieldDefinition {
    // NOTE: Have to duplicate the parents so we don't end up modifying the
    //       passed in value.
    const fieldType = processType(field.type, category, new Set(parents));

    // Fields themselves can have arguments
    const args = utils.isGraphQLField(field)
      ? processArgs(field.args, category, parents)
      : [];

    return {
      name: field.name,
      description: field.description ?? DEFAULT_DESCRIPTION,
      url: fieldType.url,
      is_optional: utils.isOptional(field.type),
      html: print(schema, field.astNode!),
      args,
      deprecationReason: field.deprecationReason,
    };
  }

  function processType(
    type: GraphQLType,
    category: Category,
    parents: Set<string> = new Set()
  ): BaseDefinition {
    const unwrappedType = utils.unwrapType(type);

    // Types can be recursive, so we have to keep track of the parents and stop
    // if we see something that we've already seen
    if (parents.has(unwrappedType.toString())) {
      // Returning a null URL here is sufficient to make sure we don't have infinitively
      // recursive links
      return {
        name: "",
        description: "",
      };
    } else {
      parents.add(unwrappedType.toString());
    }

    if (unwrappedType instanceof GraphQLScalarType) {
      const scalar =
        unwrappedType.name in scalars
          ? scalars[unwrappedType.name]
          : (scalars[unwrappedType.name] = processScalarType(unwrappedType));
      category.addScalar(scalar);
      return scalar;
    } else if (unwrappedType instanceof GraphQLEnumType) {
      const _enum =
        unwrappedType.name in enums
          ? enums[unwrappedType.name]
          : (enums[unwrappedType.name] = processEnumType(unwrappedType));
      category.addEnum(_enum);
      return _enum;
    } else if (unwrappedType instanceof GraphQLInterfaceType) {
      const _interface =
        unwrappedType.name in interfaces
          ? interfaces[unwrappedType.name]
          : (interfaces[unwrappedType.name] = processInterfaceType(
              unwrappedType,
              category,
              parents
            ));
      category.addInterface(_interface);
      return _interface;
    } else if (unwrappedType instanceof GraphQLUnionType) {
      const union =
        unwrappedType.name in unions
          ? unions[unwrappedType.name]
          : (unions[unwrappedType.name] = processUnionType(
              unwrappedType,
              category,
              parents
            ));
      category.addUnion(union);
      return union;
    } else if (unwrappedType instanceof GraphQLObjectType) {
      const object =
        unwrappedType.name in objects
          ? objects[unwrappedType.name]
          : (objects[unwrappedType.name] = processObjectType(
              unwrappedType,
              category,
              parents
            ));
      category.addObject(object);
      return object;
    } else if (unwrappedType instanceof GraphQLInputObjectType) {
      const inputObject =
        unwrappedType.name in inputObjects
          ? inputObjects[unwrappedType.name]
          : (inputObjects[unwrappedType.name] = processObjectType(
              unwrappedType,
              category,
              parents
            ));
      category.addObject(inputObject);
      return inputObject;
    } else {
      throw new Error(
        `Type not yet supported for processing: ${unwrappedType}`
      );
    }
  }

  function processUnionType(
    unionType: GraphQLUnionType,
    category: Category,
    parents?: Set<string>
  ): UnionDefinition {
    const url = urls.getUnionUrl(unionType.name);

    const types: BaseDefinition[] = unionType.getTypes().map((objectType) => {
      const type = processType(objectType, category, new Set(parents));
      return {
        name: objectType.name,
        description: objectType.description ?? DEFAULT_DESCRIPTION,
        url: type.url,
      };
    });

    return {
      name: unionType.name,
      description: unionType.description ?? DEFAULT_DESCRIPTION,
      url,
      html: print(schema, unionType.astNode!),
      types,
    };
  }

  function processInterfaceType(
    interfaceType: GraphQLInterfaceType,
    category: Category,
    parents?: Set<string>
  ): InterfaceDefinition {
    const url = urls.getInterfaceUrl(interfaceType.name);

    const fields = utils.mapFields(interfaceType.getFields(), (field) =>
      definitionFromField(field, category, parents)
    );

    return {
      name: interfaceType.name,
      description: interfaceType.description ?? DEFAULT_DESCRIPTION,
      url,
      html: print(schema, interfaceType.astNode!),
      fields,
    };
  }

  function processEnumType(enumType: GraphQLEnumType): EnumDefinition {
    const url = urls.getEnumUrl(enumType.name);

    const values = enumType.getValues().map((value) => ({
      name: value.name,
      description: value.description ?? DEFAULT_DESCRIPTION,
      deprecationReason: value.deprecationReason,
    }));

    return {
      name: enumType.name,
      description: enumType.description ?? DEFAULT_DESCRIPTION,
      url,
      html: print(schema, enumType.astNode!),
      values,
    };
  }

  function processScalarType(scalarType: GraphQLScalarType): ScalarDefinition {
    const url = urls.getScalarUrl(scalarType.name);
    return {
      name: scalarType.name,
      description: scalarType.description ?? DEFAULT_DESCRIPTION,
      url,
      html: scalarType.astNode
        ? print(schema, scalarType.astNode!)
        : `scalar ${scalarType.name}`,
    };
  }

  function processObjectType(
    objectType: GraphQLObjectType | GraphQLInputObjectType,
    category: Category,
    parents?: Set<string>
  ): ObjectDefinition {
    const fields = utils.mapFields(objectType.getFields(), (field) =>
      definitionFromField(field, category, parents)
    );

    const interfaces = utils.isGraphQLObjectType(objectType)
      ? objectType.getInterfaces().map((interfaceType) => {
          const type = processType(interfaceType, category, parents);
          return {
            name: interfaceType.name,
            description: interfaceType.description ?? DEFAULT_DESCRIPTION,
            url: type.url,
          };
        })
      : [];

    const url = urls.getObjectUrl(objectType.name);

    return {
      name: objectType.name,
      url,
      description: objectType.description ?? DEFAULT_DESCRIPTION,
      fields,
      html: print(schema, objectType.astNode!),
      interfaces,
    };
  }

  function processArgs(
    args: readonly GraphQLArgument[],
    category: Category,
    parents?: Set<string>
  ): ArgOrFieldDefinition[] {
    return args.map((arg) => {
      const argType = processType(arg.type, category, parents);
      return {
        name: arg.name,
        url: argType.url,
        description: arg.description ?? DEFAULT_DESCRIPTION,
        is_optional: !(arg.type instanceof GraphQLNonNull),
        html: print(schema, arg.astNode!),
        deprecationReason: arg.deprecationReason,
      };
    });
  }

  const queries = utils.mapFields(queryType.getFields(), (field) => {
    const categoryName = utils.getCategoryName(field);
    if (!categoryName) return;

    const category = getOrCreateCategory(categoryName);
    const type = processType(field.type, category);
    const args = processArgs(field.args, category);

    const queryDef: QueryDefinition = {
      name: field.name,
      url: urls.getQueryUrl(field.name),
      description: field.description ?? DEFAULT_DESCRIPTION,
      type: {
        name: type.name,
        url: type.url,
        description: type.description,
      },
      args,
      html: print(schema, field.astNode!),
      deprecationReason: field.deprecationReason,
    };

    category.addQuery(queryDef);

    return queryDef;
  });

  const mutations = utils.mapFields(mutationType.getFields(), (field) => {
    const categoryName = utils.getCategoryName(field);
    if (!categoryName) return;

    const category = getOrCreateCategory(categoryName);
    const type = processType(field.type, category);
    const args = processArgs(field.args, category);

    const mutationDef: MutationDefinition = {
      name: field.name,
      url: urls.getMutationUrl(field.name),
      description: field.description ?? DEFAULT_DESCRIPTION,
      type: {
        name: type.name,
        url: type.url,
        description: type.description,
      },
      args,
      html: print(schema, field.astNode!),
      deprecationReason: field.deprecationReason,
    };

    category.addMutation(mutationDef);

    return mutationDef;
  });

  return {
    categories,
    queries,
    mutations,
    objects,
    inputObjects,
    scalars,
    enums,
    interfaces,
    unions,
  };
}
