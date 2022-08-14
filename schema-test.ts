import { schemaText } from "./src/graphql/schema";
import { processSchema } from "./src/graphql/processSchema";

const {
  categories,
  queries,
  mutations,
  objects,
  inputObjects,
  scalars,
  enums,
  interfaces,
  unions,
} = processSchema(schemaText);

// console.log("============ CATEGORIES");
// console.log(JSON.stringify(categories, null, 2));

// console.log("============ QUERIES");
// console.log(JSON.stringify(queries, null, 2));

// console.log("============ MUTATIONS");
// console.log(JSON.stringify(mutations, null, 2));

// console.log("============ OBJECTS");
// console.log(JSON.stringify(objects, null, 2));

// console.log("============ INPUT OBJECTS");
// console.log(JSON.stringify(inputObjects["UserInput"], null, 2));

// console.log("============ SCALARS");
// console.log(JSON.stringify(scalars, null, 2));

// console.log("============ ENUMS");
// console.log(JSON.stringify(enums, null, 2));

// console.log("============ INTERFACES");
// console.log(JSON.stringify(interfaces, null, 2));

// console.log("============ UNIONS");
// console.log(JSON.stringify(unions, null, 2));
