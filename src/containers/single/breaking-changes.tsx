import { MarketoForm } from "components/MarketoForm";
import moment from "moment";
import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useRouteData } from "react-static";
import styled from "styled-components";

import { PrimaryButton } from "../../components/Buttons";
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

const Timeline = styled.div`
  border-left: 2px solid #003b45;
  margin: 20px 30px;
  margin-left: 140px;
  padding: 0 15px;
`;

const ChangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-left: 40px;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Deadline = styled.span`
  width: 80px;
  text-align: center;
  height: 20px;
  position: absolute;
  left: -130px;
  top: 15px;

  font-weight: bold;
  color: #003b45;

  & .deadline {
    color: #c3c3c3;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: -23px;
  top: 17px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #f5a841;
  z-index: 3;
`;

const Connector = styled.div`
  position: absolute;
  border-top: 1px solid black;
  width: 38px;
  left: -17px;
  top: 24px;
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
  text-align: left;
  font-weight: bold;
  margin-right: 20px;
`;

const Text = styled.span`
  flex: 1;
`;

const Well = styled.div`
  padding: 30px;
  background: white;
  border: 2px solid #eaeaea;
  border-radius: 5px;
  width: 350px;
`;

const SubscribeText = styled.p`
  margin: 15px auto;
  font-size: 18px;
  font-weight: bold;
  max-width: 270px;
`;

const SubscribeP = styled.p`
  margin: 15px auto;
  padding-top: 10px;
  font-size: 14px;
  color: grey;
  max-width: 270px;
`;

const FormStyle = styled.div`
  & input {
    margin: 15px;
    width: 250px;
  }

  & button {
    margin: 15px;
  }
`;

const MermaidStyles = styled.div`
  & rect.task {
    fill: #f3ffed !important;
    stroke: #6eaa49 !important;
  }

  & text.taskText {
    fill: black !important;
    font-size: 16px !important;
    text-height: 50px !important;
  }

  & text.taskTextOutsideRight {
    font-size: 16px !important;
    text-height: 50px !important;
  }

  & rect.section0 {
    fill: transparent !important;
  }

  & .tick > text {
    font-size: 16px !important;
  }
`;

type FormProps = {
  status: "sending" | "error" | "success";
  message: string;
  onValidated: (param: { EMAIL: string }) => void;
};
const CustomForm = ({ status, message, onValidated }: FormProps) => {
  let email = { value: "" };
  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
  };

  const loading = status === "sending";
  const buttonText = status === "sending" ? "Sending..." : "Subscribe";
  const successColor = status === "success" ? "#57AC59" : "";

  return (
    <FormStyle>
      <input
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your Email"
      />
      {status === "error" && (
        <div
          style={{ color: "red", marginLeft: "15px" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <PrimaryButton
        loading={loading}
        onClick={() => submit()}
        buttonColor={successColor}
        darkercolor={successColor}
      >
        {buttonText}
      </PrimaryButton>
    </FormStyle>
  );
};

const entry = {
  title: "Breaking Changes",
  highlights:
    "We try our best to ensure backwards compatibility of our products, but sometimes we have to launch breaking changes. Our policy is to notify customers first by emailing our Breaking Changes list and posting details on this page.",
  slug: "developer/breaking-changes",
  sectionType: "developerCenter",
};

export default function render() {
  const { breakingChanges = [] } = useRouteData<{
    breakingChanges: Change[];
  }>();

  // Once a deadline is more than 14 days in the past, hide it.
  const upcomingChanges = breakingChanges.filter(
    (c) => numDaysUntil(c.deadline) >= -14
  );

  return (
    <PageHeader {...entry}>
      <>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginRight: "60px",
          }}
        >
          <div style={{ paddingRight: "50px" }}>
            <h3>Breaking Change Policy</h3>
            <p>
              Our first priority is to make sure that our products don't change
              so that nobody has to spend time updating their integrations. In
              some cases, we have to make backwards incompatible changes.
            </p>
            <ul>
              <li>
                We try to maintain backwards compatibility for customers as long
                as possible.
              </li>
              <li>
                When we remove functionality, existing customers may be
                "grandfathered" in to existing behaviour and only new customers
                get the new behaviour.
              </li>
              <li>
                If a breaking change can be rolled out slowly, we start disabing
                the feature for a portion of traffic before turning it off
                completely.
              </li>
              <li>Announcements for breaking changes are sent via email.</li>
            </ul>
          </div>
          <Well>
            <SubscribeText>Subscribe to Breaking Changes</SubscribeText>
            <SubscribeP>
              We will notify you when breaking changes are announced, and send
              periodic reminders before they take effect.
            </SubscribeP>
            <MarketoForm/>
          </Well>
        </div>

        <h3>Upcoming Changes</h3>
        <Timeline>
          {upcomingChanges?.length > 0 &&
            upcomingChanges.map((c, i) => {
              const mermaidMd = c.timeline
                ? "\n```mermaid\n" + c.timeline + "\n```"
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
        {upcomingChanges.length === 0 && (
          <p>
            There are no upcoming breaking changes. Subscribe to our email
            newsletter above to be notified if any changes are announced.
          </p>
        )}
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

type ChangeProps = {
  mermaidMd: any;
  title: string;
  description: string;
  deadline: string;
};
const Change = ({ mermaidMd, title, description, deadline }: ChangeProps) => {
  return (
    <ChangeWrapper>
      <Deadline>
        <p className="days">{daysUntil(deadline)}</p>
        <p className="deadline">{deadline}</p>
      </Deadline>
      <Dot />
      <Connector />
      <Body>
        <div>
          <Text>
            <b>{title}</b>
          </Text>
        </div>
        <div>
          <Text>
            <Markdown source={description} />
          </Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Name>Timeline</Name>
          <Text>
            <MermaidStyles>
              {mermaidMd && (
                <div className="mermaid-markdown">
                  <Markdown source={mermaidMd} />
                </div>
              )}
            </MermaidStyles>
          </Text>
        </div>
      </Body>
    </ChangeWrapper>
  );
};

const numDaysUntil = (date: string) => {
  const momDate = moment(date);
  const momToday = moment();
  const diff = momDate.diff(momToday, "days");
  return diff;
};

const daysUntil = (date: string) => {
  const diff = numDaysUntil(date);
  if (diff < 0) {
    return diff === -1 ? `${-diff} Day Ago` : `${-diff} Days Ago`;
  }
  if (diff === 0) {
    return "Today";
  }
  return diff === 1 ? `In ${diff} Day` : `In ${diff} Days`;
};
