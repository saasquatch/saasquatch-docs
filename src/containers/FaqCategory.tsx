import React from "react";
import slug from "slug";
import { useRouteData } from "react-static";

import PageHeader from "../components/PageHeader";
import Markdown from "../components/Markdown";

export default function render() {
  const { entry } = useRouteData();
  const { fields } = entry;

  return (
    <PageHeader {...entry}>
      <>
        <ul className="js-faq-list">
          {fields.answers.map(faq => (
            <li>
              <a href={"#" + slug(faq.fields.question)}>
                {faq.fields.question}
              </a>
            </li>
          ))}
        </ul>

        <hr />

        {fields.answers.map(faq => (
          <div className="docs-faq-question" id={slug(faq.fields.question)}>
            <h3>{faq.fields.question}</h3>
            <p>
              <Markdown source={faq.fields.answer} />
            </p>
          </div>
        ))}
      </>
    </PageHeader>
  );
}
