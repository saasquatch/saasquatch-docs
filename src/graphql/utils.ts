import {
  DirectiveNode,
  GraphQLField,
  GraphQLList,
  GraphQLNonNull,
  GraphQLType,
  Kind,
} from "graphql";

export const isOptional = (type: GraphQLType) =>
  !(type instanceof GraphQLNonNull);
export const isList = (type: GraphQLType) =>
  type instanceof GraphQLList ||
  (type instanceof GraphQLNonNull && type.ofType instanceof GraphQLList);

export function iterateFields<
  Map extends { [key: string]: any },
  Type extends { getFields: () => Map },
  Field
>(object: Type, fn: (field: Field) => void) {
  const fields = object.getFields();
  const fieldNames = Object.keys(fields);
  fieldNames.map((fieldName) => fields[fieldName]).forEach(fn);
}

export function findDirective(
  field: GraphQLField<any, any, any>,
  directiveName: string
) {
  return field.astNode?.directives?.find(
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
  const categoryDirective = findDirective(field, "category");
  const hiddenDirective = findDirective(field, "hidden");

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
