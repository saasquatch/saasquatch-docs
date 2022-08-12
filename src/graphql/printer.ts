import { ASTNode, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { ASTReducer, visit } from "graphql/language/visitor";
import { printString } from "graphql/language/printString";
import { printBlockString } from "graphql/language/blockString";

import * as urls from "./urls";

export function print(schema: GraphQLSchema, ast: ASTNode): string {
  const printReducer: ASTReducer<string> = {
    Name: { leave: (node) => node.value },

    // Types

    NamedType: {
      leave: (node) => {
        const type = schema.getType(node.name);
        if (type) {
          const [name, url] = urls.getUrl(type);
          return url ? urls.generateLink(url, name) : name;
        } else {
          return node.name;
        }
      },
    },

    ListType: { leave: ({ type }) => "[" + type + "]" },
    NonNullType: {
      leave: (node) => node.type + "!",
    },

    // Values

    IntValue: { leave: ({ value }) => value },
    FloatValue: { leave: ({ value }) => value },
    StringValue: {
      leave: ({ value, block: isBlockString }) =>
        isBlockString ? printBlockString(value) : printString(value),
    },
    BooleanValue: { leave: ({ value }) => (value ? "true" : "false") },
    NullValue: { leave: () => "null" },
    EnumValue: { leave: ({ value }) => value },
    ListValue: { leave: ({ values }) => "[" + join(values, ", ") + "]" },

    // Definitions

    ScalarTypeDefinition: {
      leave: ({ name }) => join(["scalar", name], " "),
    },

    ObjectTypeDefinition: {
      leave: ({ name, interfaces, fields }) =>
        join(
          [
            "type",
            name,
            wrap("implements ", join(interfaces, " & ")),
            block(fields),
          ],
          " "
        ),
    },

    FieldDefinition: {
      leave: ({ name, arguments: args, type }) =>
        name +
        (hasMultilineItems(args)
          ? wrap("(\n", indent(join(args, "\n")), "\n)")
          : wrap("(", join(args, ", "), ")")) +
        ": " +
        type,
    },

    InputValueDefinition: {
      leave: ({ name, type, defaultValue }) =>
        join([name + ": " + type, wrap("= ", defaultValue)], " "),
    },

    InterfaceTypeDefinition: {
      leave: ({ name, interfaces, fields }) =>
        join(
          [
            "interface",
            name,
            wrap("implements ", join(interfaces, " & ")),
            block(fields),
          ],
          " "
        ),
    },

    UnionTypeDefinition: {
      leave: ({ name, types }) =>
        join(["union", name, wrap("= ", join(types, " | "))], " "),
    },

    EnumTypeDefinition: {
      leave: ({ name, values }) => join(["enum", name, block(values)], " "),
    },

    EnumValueDefinition: {
      leave: ({ name }) => name,
    },

    InputObjectTypeDefinition: {
      leave: ({ name, fields }) => join(["input", name, block(fields)], " "),
    },
  };

  return visit(ast, printReducer);
}

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(
  maybeArray: Maybe<ReadonlyArray<string | undefined>>,
  separator = ""
): string {
  return maybeArray?.filter((x) => x).join(separator) ?? "";
}

/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */
function block(array: Maybe<ReadonlyArray<string | undefined>>): string {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */
function wrap(
  start: string,
  maybeString: Maybe<string>,
  end: string = ""
): string {
  return maybeString != null && maybeString !== ""
    ? start + maybeString + end
    : "";
}

function indent(str: string): string {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}

function hasMultilineItems(maybeArray: Maybe<ReadonlyArray<string>>): boolean {
  // FIXME: https://github.com/graphql/graphql-js/issues/2203
  /* c8 ignore next */
  return maybeArray?.some((str) => str.includes("\n")) ?? false;
}
