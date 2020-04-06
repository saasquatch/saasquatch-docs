import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";
import styled from "styled-components";
import moment from "moment";
import { PrimaryButton } from "../../components/Buttons";
import { useRouteData } from "react-static";

const Timeline = styled.div`
  border-left: 2px solid #003b45;
  margin: 20px 30px;
  margin-left: 140px;
  padding: 0 15px;
  /* padding-top: 30px; */
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

const url =
  "//ReferralSaaSquatch.us4.list-manage.com/subscribe/post?u=4ea25ef0489446654b07fd1a1&id=40edd6c3b0";
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
    "We try our best to ensure backwards compatibility of our products, but some circumstance dictate that we launch breaking changes. Our policy is to notify customers first, and post those changes here.",
  slug: "developer/breaking-changes",
  sectionType: "developerCenter",
};

export default function render() {
  const { breakingChanges } = useRouteData();

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
      const diff = momDate.diff(momToday, "days");
      return diff > 1 ? `In ${diff} Days` : `In ${diff} day`;
    };
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
              While advancing the SaaSquatch platform we do our best to ensure
              we meet the needs of current, new and future customers.
            </p>
            <ul>
              <li>
                We try to maintain backwards compatibility for customers as long
                as possible.
              </li>
              <li>
                When we remove functionality, existing customers may be
                "grandfathered" in.
              </li>
              <li>
                If a breaking change can be rolled our slowly, we start disabing
                the feature for a portion of traffic before turning it off
                completely.
              </li>
            </ul>
          </div>
          <Well>
            <SubscribeText>Subscribe to Breaking Changes</SubscribeText>
            <SubscribeP>
              We will notify you when breaking changes are made
            </SubscribeP>
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={(formData) => subscribe(formData)}
                />
              )}
            />
          </Well>
        </div>

        <h3>Upcoming Changes</h3>
        <Timeline>
          {breakingChanges?.length > 0 &&
            breakingChanges.map((c: Change, i) => {
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
        {breakingChanges.length === 0 && (
          <p>
            There are no upcoming breaking changes. Subscribe to the email
            service above to be notified if any changes are added
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
