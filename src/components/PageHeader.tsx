import React from "react";
import Markdown from "./Markdown";
import { Entry } from "./TocFrame";
import Meta from "./Meta";

/**
 *  Common block at the top of most pages.
 *
 *  Title, highlights, cover image, etc.
 *
 */
export default function render(props: Entry & { children?: React.ReactNode }) {
  //   const Wrapper = props.hero? ({children}:any) => <div className={"hero-unit article " + props.category}>{children}</div> :

  return (
    <>
      <Meta {...props} />
      <section className="article-content">
        <div className="page-header">
          <h1 id="top">{props.title}</h1>

          {props.tags && props.tags.some((tag: string) => tag == "Beta") && (
            <span className="label docs-label-beta">Beta</span>
          )}
        </div>

        {props.coverImage && (
          <img
            src={props.coverImage.url}
            alt={props.coverImage.name}
            id="coverImage"
          />
        )}

        {props.highlights && (
          <div className="lead" id="highlightMarkdown">
            <Markdown source={props.highlights} />
          </div>
        )}

        {props.tags && props.tags.some((tag: string) => tag == "Beta") && (
          <blockquote>
            <p>
              This feature is currently in Beta. Please contact our{" "}
              <a href="mailto:support@saasquatch.com">support team</a> to learn
              more about how to enroll.
            </p>
          </blockquote>
        )}
        {props.contents && <Markdown source={props.contents} />}
        {props.children && props.children}
      </section>
    </>
  );
}
