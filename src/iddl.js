import { buildSchema } from "graphql";
import { schema as idl } from "./saasquatch";

export const schema = buildSchema(idl);
