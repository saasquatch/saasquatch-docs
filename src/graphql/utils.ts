import { AsyncResource } from "async_hooks";
import {
  ConstDirectiveNode,
  DirectiveNode,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputField,
  GraphQLInputFieldMap,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLType,
  Kind,
} from "graphql";

export const isOptional = (type: GraphQLType) =>
  !(type instanceof GraphQLNonNull);

export function isGraphQLField(
  field: GraphQLField<any, any, any> | GraphQLInputField
): field is GraphQLField<any, any, any> {
  return (field as any).hasOwnProperty("args");
}

export function isGraphQLObjectType(
  object: GraphQLObjectType | GraphQLInputObjectType
): object is GraphQLObjectType {
  return (object as any).hasOwnProperty("getInterfaces");
}

export function isHidden<
  AstNode extends { directives?: ReadonlyArray<ConstDirectiveNode> }
>(astNode: AstNode) {
  const hiddenDirective = findDirective(astNode, "hidden");
  return hiddenDirective !== undefined;
}

export function findDirective<
  AstNode extends { directives?: ReadonlyArray<ConstDirectiveNode> }
>(astNode: AstNode, directiveName: string) {
  return astNode.directives?.find(
    (directive) => directive.name.value === directiveName
  );
}

export function getDirectiveArgValue(
  directive: DirectiveNode,
  argName: string
) {
  const arg = directive.arguments?.find(
    (argument) => argument.name.value === argName
  );
  if (!arg) return null;

  switch (arg.value.kind) {
    case Kind.STRING:
      return arg.value.value;
    default:
      throw new Error(`Directive arg kind ${arg.value.kind} not yet supported`);
  }
}

export function getCategoryName(field: GraphQLField<any, any, any>) {
  const categoryDirective = findDirective(field.astNode!, "category");
  const hiddenDirective = findDirective(field.astNode!, "hidden");

  if (!categoryDirective || hiddenDirective) {
    return null;
  }

  return getDirectiveArgValue(categoryDirective, "category");
}

export function unwrapType(type: GraphQLType): GraphQLType {
  const isNonNull = type instanceof GraphQLNonNull;
  const isList = type instanceof GraphQLList;
  if (!isNonNull && !isList) {
    return type;
  } else {
    return unwrapType(type.ofType);
  }
}

type FieldOf<Fields> = Fields extends GraphQLFieldMap<any, any>
  ? GraphQLField<any, any>
  : Fields extends GraphQLInputFieldMap
  ? GraphQLInputField
  : never;

export function mapFields<Fields, MappedField>(
  fields: Fields,
  fn: (field: FieldOf<Fields>) => MappedField | undefined
): Record<string, MappedField> {
  const result: Record<string, MappedField> = {};
  Object.values(fields).forEach((field) => {
    // Ignore fields marked @hidden
    if (isHidden(field.astNode!)) return;

    const output = fn(field);
    if (output) {
      result[field.name] = output;
    }
  });
  return result;
}
