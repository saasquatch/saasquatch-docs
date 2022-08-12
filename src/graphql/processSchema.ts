import {
  buildSchema,
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputField,
  GraphQLInputFieldMap,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
  GraphQLUnionType,
} from "graphql";

import { print } from "./printer";
import * as utils from "./utils";
import * as urls from "./urls";
import { Category } from "./category";
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

export function processSchema(schemaText: string): ProcessedSchema {
  const categories: Record<string, Category> = {};
  const queries: Record<string, QueryDefinition> = {};
  const mutations: Record<string, MutationDefinition> = {};
  const objects: Record<string, ObjectDefinition> = {};
  const inputObjects: Record<string, ObjectDefinition> = {};
  const scalars: Record<string, ScalarDefinition> = {};
  const enums: Record<string, EnumDefinition> = {};
  const interfaces: Record<string, InterfaceDefinition> = {};
  const unions: Record<string, UnionDefinition> = {};
  const schema = buildSchema(schemaText);

  const queryType = schema.getQueryType();
  if (!queryType) throw new Error("Could not find query type on schema");

  const mutationType = schema.getMutationType();
  if (!mutationType) throw new Error("Could not find mutation type on schema");

  function getOrCreateCategory(categoryName: string) {
    if (!(categoryName in categories)) {
      categories[categoryName] = new Category(categoryName);
    }
    return categories[categoryName];
  }

  function isGraphQLField(
    field: GraphQLField<any, any, any> | GraphQLInputField
  ): field is GraphQLField<any, any, any> {
    return (field as any).hasOwnProperty("args");
  }

  function fieldDefinitionFromField(
    field: GraphQLField<any, any, any> | GraphQLInputField,
    category: Category,
    parents?: Set<string>
  ): ArgOrFieldDefinition {
    // NOTE: Have to duplicate the passed in parents so we don't end up modifying the
    //       passed in value.
    const fieldType = processType(field.type, category, new Set(parents));

    const args = isGraphQLField(field)
      ? processArgs(field.args, category, parents)
      : [];

    return {
      name: field.name,
      type: field.type.toString(),
      description: field.description || null,
      url: fieldType.url,
      is_optional: utils.isOptional(field.type),
      is_list: utils.isList(field.type),
      args,
      html: print(schema, field.astNode!),
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
        url: null,
        description: null,
      };
    } else {
      parents.add(unwrappedType.toString());
    }

    if (unwrappedType instanceof GraphQLScalarType) {
      if (unwrappedType.astNode === undefined) {
        if (
          ["String", "Int", "Boolean", "Float", "ID"].includes(
            unwrappedType.name
          )
        ) {
          return {
            name: unwrappedType.name,
            url: null,
            description: unwrappedType.description || null,
          };
        } else {
          throw new Error(
            `Built-in scalar not yet supported for processing: ${unwrappedType.name}`
          );
        }
      } else {
        const scalar =
          unwrappedType.name in scalars
            ? scalars[unwrappedType.name]
            : (scalars[unwrappedType.name] = processScalarType(unwrappedType));
        category.addScalar(scalar);
        return scalar;
      }
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
          : (unions[unwrappedType.name] = processUnionType(unwrappedType));
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
          : (inputObjects[unwrappedType.name] = processInputObjectType(
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

  function processUnionType(unionType: GraphQLUnionType) {
    const url = urls.getUnionUrl(unionType.name);
    const newUnion: UnionDefinition = {
      name: unionType.name,
      description: unionType.description || null,
      url,
      html: print(schema, unionType.astNode!),
    };
    return newUnion;
  }

  function processInterfaceType(
    interfaceType: GraphQLInterfaceType,
    category: Category,
    parents?: Set<string>
  ) {
    const url = urls.getInterfaceUrl(interfaceType.name);

    const fields: Record<string, ArgOrFieldDefinition> = {};

    utils.iterateFields<
      GraphQLFieldMap<any, any>,
      GraphQLInterfaceType,
      GraphQLField<any, any, any>
    >(interfaceType, (field) => {
      fields[field.name] = fieldDefinitionFromField(field, category, parents);
    });

    const newInterface: InterfaceDefinition = {
      name: interfaceType.name,
      description: interfaceType.description || null,
      url,
      html: print(schema, interfaceType.astNode!),
      fields,
    };
    return newInterface;
  }

  function processEnumType(enumType: GraphQLEnumType) {
    const url = urls.getEnumUrl(enumType.name);

    const variants: BaseDefinition[] = enumType.getValues().map((value) => ({
      name: value.name,
      description: value.description || null,
      url: null,
    }));

    const newEnum: EnumDefinition = {
      name: enumType.name,
      description: enumType.description || null,
      url,
      html: print(schema, enumType.astNode!),
      variants,
    };
    return newEnum;
  }

  function processScalarType(scalarType: GraphQLScalarType) {
    const url = urls.getScalarUrl(scalarType.name);
    const newScalar: ScalarDefinition = {
      name: scalarType.name,
      description: scalarType.description || null,
      url,
      html: print(schema, scalarType.astNode!),
    };
    return newScalar;
  }

  function processObjectType(
    objectType: GraphQLObjectType,
    category: Category,
    parents?: Set<string>
  ) {
    const fields: Record<string, ArgOrFieldDefinition> = {};

    utils.iterateFields<
      GraphQLFieldMap<any, any>,
      GraphQLObjectType,
      GraphQLField<any, any, any>
    >(objectType, (field) => {
      fields[field.name] = fieldDefinitionFromField(field, category, parents);
    });

    const url = urls.getObjectUrl(objectType.name);
    const newObject: ObjectDefinition = {
      name: objectType.name,
      url,
      description: objectType.description || null,
      fields,
      html: print(schema, objectType.astNode!),
    };

    return newObject;
  }

  function processInputObjectType(
    inputObjectType: GraphQLInputObjectType,
    category: Category,
    parents?: Set<string>
  ) {
    const fields: Record<string, ArgOrFieldDefinition> = {};

    utils.iterateFields<
      GraphQLInputFieldMap,
      GraphQLInputObjectType,
      GraphQLInputField
    >(inputObjectType, (field) => {
      fields[field.name] = fieldDefinitionFromField(field, category, parents);
    });

    const url = urls.getObjectUrl(inputObjectType.name);
    const newInputObject: ObjectDefinition = {
      name: inputObjectType.name,
      url,
      description: inputObjectType.description || null,
      fields,
      html: print(schema, inputObjectType.astNode!),
    };

    return newInputObject;
  }

  function processArgs(
    args: readonly GraphQLArgument[] | undefined,
    category: Category,
    parents?: Set<string>
  ) {
    if (!args) return [];

    const argDefs: ArgOrFieldDefinition[] = [];

    for (let arg of args) {
      const argType = processType(arg.type, category, parents);
      argDefs.push({
        name: arg.name,
        url: argType.url,
        type: arg.type.toString(),
        description: arg.description || null,
        is_optional: !(arg.type instanceof GraphQLNonNull),
        is_list: arg.type instanceof GraphQLList,
        args: null,
        html: print(schema, arg.astNode!),
      });
    }

    return argDefs;
  }

  utils.iterateFields<
    GraphQLFieldMap<any, any>,
    GraphQLObjectType,
    GraphQLField<any, any, any>
  >(queryType, (field) => {
    const categoryName = utils.getCategoryName(field);
    if (!categoryName) return;
    const category = getOrCreateCategory(categoryName);
    const type = processType(field.type, category);
    const args = processArgs(field.args, category);

    queries[field.name] = {
      name: field.name,
      url: urls.getQueryUrl(field.name),
      description: field.description || null,
      typeUrl: type?.url || null,
      args,
      html: print(schema, field.astNode!),
    };

    category.queries[field.name] = {
      name: field.name,
      url: urls.getQueryUrl(field.name),
    };
  });

  utils.iterateFields<
    GraphQLFieldMap<any, any>,
    GraphQLObjectType,
    GraphQLField<any, any, any>
  >(mutationType, (field) => {
    const categoryName = utils.getCategoryName(field);
    if (!categoryName) return;
    const category = getOrCreateCategory(categoryName);
    const type = processType(field.type, category);
    const args = processArgs(field.args, category);

    mutations[field.name] = {
      name: field.name,
      url: urls.getMutationUrl(field.name),
      description: field.description || null,
      typeUrl: type?.url || null,
      args,
      html: print(schema, field.astNode!),
    };

    category.mutations[field.name] = {
      name: field.name,
      url: urls.getMutationUrl(field.name),
    };
  });

  // TODO: Sort all the stuff in categories

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
