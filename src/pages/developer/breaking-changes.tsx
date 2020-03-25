import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

const url = "//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn";

// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url} />;

const entry = {
  title: "Breaking Changes",
  highlights:
    "We try our best to ensure backwards compatibility of our products, but some circumstance dictate that we launch breaking changes. Our policy is to notify customers first, and post those changes here.",
  slug: "developer/breaking-changes",
  sectionType: "developerCenter"
};

export default function render() {
  return (
    <PageHeader {...entry}>
      <>
        <div className="well">
          <p>Subscribe to Breaking Changes</p>
          <SimpleForm />
        </div>

        <h3>Breaking Change Policy</h3>
        <p>
          While advancing the SaaSquatch platform we do our best to ensure we
          meet the needs of current, new and future customers.
        </p>
        <ul>
          <li>
            We try to maintain backwards compatibility for customers as long as
            possible.
          </li>
          <li>
            When we remove functionality, existing customers may be
            "grandfathered" in.
          </li>
          <li>
            If a breaking change can be rolled our slowly, we start disabing the
            feature for a portion of traffic before turning it off completely.
          </li>
        </ul>

        <h3>Upcoming Changes</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Deadline</th>
              <th>Breaking Change</th>
            </tr>
          </thead>
          <tbody>
            {CHANGES.map((c, i) => {
              const mermaidMd = c.timeline
                ? "**Timeline**\n\n```mermaid\n" + c.timeline + "\n```"
                : undefined;
              return (
                <tr key={i}>
                  <td>{c.deadline}</td>
                  <td>
                    <b>
                    {c.title}
                    </b>
                    <p>{c.description}</p>
                    {mermaidMd && (
                      <div>
                        <Markdown source={mermaidMd} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </PageHeader>
  );
}

type Change = {
  // ISO string
  deadline: string;
  title: string;
  description: string;
  timeline?: string;
};
const CHANGES: Change[] = [
  {
    deadline: "2020-05-25",
    title: "Short domain IP address migration",
    description:
      "We are moving the service that powers custom domains for share links (ssqt.co). As part of this migration customers will be required to update their DNS settings to remove the deprecated static IP.",
    timeline: `gantt
	title A Gantt Diagram
	dateFormat  YYYY-MM-DD
	section Section
	A task           :a1, 2014-01-01, 30d
	Another task     :after a1  , 20d
	section Another
	Task in sec      :2014-01-12  , 12d
	another task      : 24d
                        `
  },
  {
    deadline: "2020-11-25",
    title: "Short domain IP address migration",
    description:
      "We are moving the service that powers custom domains for share links (ssqt.co). As part of this migration customers will be required to update their DNS settings to remove the deprecated static IP.",
    timeline: `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`
  }
];
