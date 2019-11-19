import React from "react";
import { useRouteData } from "react-static";

import Markdown from "../components/Markdown";

export default () => {
  const { entry }: any = useRouteData();
  return (
    <div className="row-fluid">
      <section className="article-content">
        {/* {{% if hero %}}<div class="hero-unit article {{category}}">{% endif %} */}

        <div className="page-header">
          <h1 id="top">{entry.title}</h1>

          {entry.tags && entry.tags.some((tag: string) => tag == "Beta") && (
            <span className="label docs-label-beta">Beta</span>
          )}
        </div>

        {entry.coverImage && (
          <img
            src={entry.coverImage.url}
            alt={entry.coverImage.name}
            id="coverImage"
          />
        )}

        {entry.highlights && (
          <div className="lead">
            <Markdown source={entry.highlights} />
          </div>
        )}

        {/* {% if hero %}</div><!-- end hero block -->{% endif %} */}

        {entry.tags && entry.tags.some((tag: string) => tag == "Beta") && (
          <blockquote>
            <p>
              This feature is currently in Beta. Please contact our{" "}
              <a href="mailto:support@referralsaasquatch.com">support team</a>{" "}
              to learn more about how to enroll.
            </p>
          </blockquote>
        )}

        <Markdown source={entry.contents} />
      </section>
    </div>
  );
};
