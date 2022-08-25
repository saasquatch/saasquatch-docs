import React from "react";
import styled from "styled-components";
import Markdown from "./Markdown";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  box-shadow: rgb(217 217 217) -1px 2px 20px 2px;
  margin-top: 24px;
  * {
    flex: 1;
  }
`;

const Block = styled.div<{ $bgColor: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.$bgColor};

  * pre {
    box-sizing: border-box;
    height: 100%;
    background-color: ${(props) => props.$bgColor};
    margin: 0;
    padding: 12px;
  }
`;

const Title = styled.div`
  flex: 0;
  text-transform: uppercase;
  background-color: #edeaea;
  font-size: 10px;
  padding: 4px 8px;
  height: fit-content;
`;

const GraphQLExample: React.FC<{ query: string; response: string }> = ({
  query,
  response,
}) => {
  return (
    <Container>
      <Block $bgColor="#fff">
        <Title>Query</Title>
        <Markdown source={`\`\`\`graphql\n${query}\n\`\`\``} />
      </Block>
      <Block $bgColor="#f8f8f8">
        <Title>Response</Title>
        <Markdown source={`\`\`\`json\n${response}\n\`\`\``} />
      </Block>
    </Container>
  );
};

export default GraphQLExample;
