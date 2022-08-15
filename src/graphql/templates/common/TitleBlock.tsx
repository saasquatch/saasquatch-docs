import React from "react";

import Markdown from "components/Markdown";
import { BaseDefinitionWithHTML } from "../../types";

interface TitleBlockProps {
  def: BaseDefinitionWithHTML;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ def }) => {
  return (
    <>
      <h1>{def.name}</h1>
      <div>
        <pre>
          <Markdown source={def.html} />
        </pre>
      </div>
      <Markdown source={def.description} />
    </>
  );
};

export default TitleBlock;
