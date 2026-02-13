import React from "react";
import slug from "slug";
import { useRouteData } from "react-static";

import PageHeader from "../components/PageHeader";
import Markdown from "../components/Markdown";

export default function render() {
  const { entry } = useRouteData();
  // Support both old Contentful format (entry.fields.answers) and new local format (entry.answers)
  const answers = entry.fields?.answers || entry.answers || [];

  return (
    <PageHeader {...entry}>
      <>
        <ul className="js-faq-list">
          {answers.map((faq: any, index: number) => {
            const question = faq.fields?.question || faq.question;
            return (
              <li key={index}>
                <a href={"#" + slug(question)}>{question}</a>
              </li>
            );
          })}
        </ul>

        <hr />

        {answers.map((faq: any, index: number) => {
          const question = faq.fields?.question || faq.question;
          const answer = faq.fields?.answer || faq.answer;
          return (
            <div className="docs-faq-question" id={slug(question)} key={index}>
              <h3>{question}</h3>
              <p>
                <Markdown source={answer} />
              </p>
            </div>
          );
        })}
      </>
    </PageHeader>
  );
}
