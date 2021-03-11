import React, { useMemo } from "react";
import styled from "styled-components";
// @ts-ignore
import GraphiQL from "graphiql";

import { getSchema } from "../iddl";

import "graphiql/graphiql.css";
import { useAsyncMemo } from "src/util/useAsyncMemo";

const Container = styled.div`
  position: relative;
  min-height: 300px;
  border: 1px solid #eee;
  -webkit-box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);
  -moz-box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);
  box-shadow: -1px 2px 20px 2px rgba(217, 217, 217, 1);

  .graphiql-container {
    min-height: 300px;
  }
  .topBarWrap {
    display: none;
  }
`;

export default function GraphQLExample({
  query,
  response,
}: {
  query: string;
  response: string;
}) {
  const schema = useAsyncMemo(() => getSchema(), []);

  return (
    <Container>
      <div className="graphiql-container">
        {schema && (
          <GraphiQL
            schema={schema}
            query={query}
            response={response}
            fetcher={async () => JSON.parse(response) as any}
            // readOnly={true}
          />
        )}
      </div>
    </Container>
  );
}
