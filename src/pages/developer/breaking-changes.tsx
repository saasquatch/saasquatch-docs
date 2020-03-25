import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";
import styled from "styled-components";
import moment from "moment";

const Timeline = styled.div`
  border-left: 2px solid #003b45;
  margin: 0 30px;
  padding: 0 15px;
  /* padding-top: 30px; */
`;

const ChangeWrapper = styled.div`
  display: flex;
  position: relative;
  padding-left: 70px;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Deadline = styled.span`
  width: 80px;
  background: white;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: -50px;

  font-weight: bold;
  color: #03b450;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    padding-top: 15px;
    display: flex;
  }
`;

const Name = styled.span`
  flex: 0.1;
  text-align: right;
  font-weight: bold;
  margin-right: 20px;
`;

const Text = styled.span`
  flex: 1;
`;

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
  type ChangeProps = {
    mermaidMd: any;
    title: string;
    description: string;
    deadline: string;
  };
  const Change = ({ mermaidMd, title, description, deadline }: ChangeProps) => {
    const daysUntil = (date: string) => {
      const momDate = moment(date);
      const momToday = moment();
      return momDate.diff(momToday, "days");
    };
    return (
      <ChangeWrapper>
        <Deadline>{deadline}</Deadline>
        <Body>
          <div>
            <Name>Title</Name>
            <Text>
              <b>{title}</b>
            </Text>
          </div>
          <div>
            <Name>Description</Name>
            <Text>{description}</Text>
          </div>
          <div>
            <Name>Days Until</Name>
            <Text>{daysUntil(deadline)} days</Text>
          </div>
          <div>
            <Name>Timeline</Name>
            <Text>
              {mermaidMd && (
                <div className="mermaid-markdown">
                  <Markdown source={mermaidMd} />
                </div>
              )}
            </Text>
          </div>
        </Body>
      </ChangeWrapper>
    );
  };

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
        <Timeline>
          {CHANGES.map((c, i) => {
            const mermaidMd = c.timeline
              ? "```mermaid\n" + c.timeline + "\n```"
              : undefined;
            return (
              <Change
                key={i}
                mermaidMd={mermaidMd}
                deadline={c.deadline}
                title={c.title}
                description={c.description}
              />
            );
          })}
        </Timeline>
        {/* <table className="table">
          <thead>
            <tr>
              <th>Deadline</th>
              <th>Breaking Change</th>
            </tr>
          </thead>
          <tbody>
            {CHANGES.map((c, i) => {
              console.debug(mermaidMd);
              return (
                <tr key={i}>
                  <td>{c.deadline}</td>
                  <td>
                    <b>{c.title}</b>
                    <p>{c.description}</p>
                    {mermaidMd && (
                      <div className="mermiad-markdown">
                        <Markdown source={mermaidMd} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
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
