import React from "react";
import { useRouteData } from "react-static";

import TocFrame from "../../components/TocFrame";
import Markdown from "src/components/Markdown";

const shorttagmap = {
  company_name: "companyName",
  email_share_link: "shareLinks.emailShareLink",
  facebook_share_link: "shareLinks.facebookShareLink",
  twitter_share_link: "shareLinks.twitterShareLink",
  referral_code: "user.referralCode",
  referrer_percent_discount:
    "programDetails.referrerRewardDetails.discountPercent",
  referred_percent_discount:
    "programDetails.referredRewardDetails.discountPercent",
  referrer_percent_length:
    "programDetails.referrerRewardDetails.monthsDiscountValid",
  referred_percent_length:
    "programDetails.referredRewardDetails.monthsDiscountValid",
  referrer_reward_amount: "programDetails.referrerRewardDetails.credit",
  referred_reward_amount: "programDetails.referredRewardDetails.credit",
  referrer_reward_unit: "programDetails.referrerRewardDetails.unit",
  referred_reward_unit: "programDetails.referredRewardDetails.unit",
  referrer_dollar_amount:
    "math programDetails.referrerRewardDetails.credit ' / 100'",
  referred_dollar_amount:
    "math programDetails.referredRewardDetails.credit ' / 100'"
};
const shorttags = {
  title:
    "Short tags are aliases for other SaaSquatch theme variables. Short tags make writing share messages easier by reducing how much people need to type and showing less on screen,\n",
  type: "object",
  properties: {
    company_name: {
      type: "string",
      description:
        "The name of the company for the referral program as configured on your *portal settings page*.\n",
      example: "Acme Co."
    },
    email_share_link: {
      type: "string",
      description:
        "The link that should be used to *establish a referral via email*. Use this in the email share body tab of your portal share message editor.\n",
      example: "http://ssqt.co/125gasb0"
    },
    facebook_share_link: {
      type: "string",
      description:
        "The link that should be used to *establish a referral via Facebook*. Use this in the Facebook share body tab of your portal share message editor.\n",
      example: "http://ssqt.co/125gasb1"
    },
    twitter_share_link: {
      type: "string",
      description:
        "The link that should be used to *establish a referral via Twitter*. Use this in the Twitter share body tab of your portal share message editor.\n",
      example: "http://ssqt.co/125gasb2"
    },
    referral_code: {
      type: "string",
      description:
        "The code that the sharing user will use to establish referrals. If your program includes a place to enter a referral code then include this code in the body of your share messages.\n",
      example: "BOBTESTERSON"
    },
    referrer_percent_discount: {
      type: "integer",
      description:
        "The percent discount that the referring user will receive upon successfully referring a friend.\n",
      "x-program": "PCT_DISCOUNT",
      example: 10
    },
    referred_percent_discount: {
      type: "integer",
      description:
        "The percent discount that will be given to the referred user.\n",
      "x-program": "PCT_DISCOUNT",
      example: 10
    },
    referrer_percent_length: {
      type: "integer",
      description:
        'The duration in months for which the referring user\'s discount is valid. E.g. 10% off your monthly bill for "12" months.\n',
      "x-program": "PCT_DISCOUNT",
      example: 12
    },
    referred_percent_length: {
      type: "integer",
      description:
        'The duration in months for which the referred user\'s discount is valid. E.g. 10% off your monthly bill for "12" months.\n',
      "x-program": "PCT_DISCOUNT",
      example: 12
    },
    referrer_reward_unit: {
      type: "string",
      description:
        'The unit of the credit given to the referring user upon successfully referring a friend. E.g for $20 we would have `referrerrewardamount=2000` and `referrerrewardunit="cents"`.\n',
      "x-program": "CREDIT",
      example: "cents"
    },
    referred_reward_unit: {
      type: "string",
      description:
        'The unit of the credit given to the referred user. E.g for $20 we would have `referredrewardamount=2000` and `referredrewardunit="cents"`.\n',
      "x-program": "CREDIT",
      example: "cents"
    },
    referrer_dollar_amount: {
      type: "integer",
      description:
        "The dollar amount for credit given to a referring user upon successfully referring a friend. This amount is equal to the `referrerrewardamount / 100`.\n",
      "x-program": "CREDIT",
      example: 20
    },
    referred_dollar_amount: {
      type: "integer",
      description:
        "The dollar amount for credit given to a referred user. This amount is equal to the `referredrewardamount / 100`.\n",
      "x-program": "CREDIT",
      example: 20
    },
    referrer_reward_amount: {
      type: "integer",
      description:
        'The amount of credit that will be given to the referring user upon successfully referring a friend. E.g. "5" months free usage.\n',
      "x-program": "CREDIT",
      example: 5
    },
    referred_reward_amount: {
      type: "integer",
      description:
        'The amount of credit that will be given to the referred user. E.g. "5" months free usage.\n',
      "x-program": "CREDIT",
      example: 5
    },
    email_converted_header_image: {
      type: "string",
      description:
        "The url for the image pulled in the `referral converted` email header.\n",
      example:
        "https://d35vcmgdka52pk.cloudfront.net/images/referral-converted.png"
    },
    email_started_header_image: {
      type: "string",
      description:
        "The url for the image pulled in the `referral started` email header.\n",
      example:
        "https://d35vcmgdka52pk.cloudfront.net/images/referral-started.png"
    },
    email_reward_limit_header_image: {
      type: "string",
      description:
        "The url for the image pulled in the `reward limit reached` email header.\n",
      example:
        "https://d35vcmgdka52pk.cloudfront.net/images/referral-friend-name.png"
    },
    email_converted_friend_name: {
      type: "string",
      description:
        "In the `referral converted` email this will be the name of the user whose referral converted. [Click here](/topics/conversion/) for more info on conversion.\n",
      example: "John Smith"
    },
    email_started_friend_name: {
      type: "string",
      description:
        "In the `referral attributed` email this will be the name of the user whose referral was attributed. [Click here](/topics/attribution/) for more info on attribution.\n",
      example: "John Smith"
    }
  }
};

export default () => {
  const { entry }: any = useRouteData();

  return (
    <TocFrame entry={entry}>
      <>
        <table className="table table-hover apidocs-args">
          <thead>
            <tr>
              <th>Short Tag</th>
              <th>Example</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(shorttags.properties).map(key => {
              const shorttag = shorttags.properties[key];
              return (
                <tr>
                  <th
                    className="docs-monospace"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {`{{${key}}}`}
                    <br />
                    <span className="muted">{shorttag.type}</span>
                  </th>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <small>
                      <span className="muted">
                        <b>{shorttag.example}</b>
                      </span>
                    </small>
                  </td>
                  <td>
                    <Markdown source={shorttag.description} />
                  </td>
                  {shorttag["x-program"] && (
                    <td>
                      <span className={"label " + shorttag["x-program"]}>
                        Works with {shorttag["x-program"]}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>
          Mappings <span className="label">Developer Reference</span>
        </h3>
        <p>
          Every short tag gets wrapped to a long tag that is uses one of the{" "}
          <a href="/themes/fields/">theme context fields</a> or{" "}
          <a href="/themes/helpers/">helpers</a>. Embedded template fields with
          corresponding short tag aliases will be replaced with their respective
          short tags when viewed in the portal share message editor. It is a{" "}
          <b>two-way transformation</b> so as a developer, you{" "}
          <b>will always see the longer form</b> and will never see short tags
          in variables, theme context, or anywhere except for the portal itself.
        </p>

        <table className="table table-hover">
          <thead>
            <tr>
              <td>
                Short Tag <br />
                <small>Seen in the portal</small>
              </td>
              <td></td>
              <td>
                Mapped Handlebars Tag <br />
                <small>Seen in the API and theme field context</small>
              </td>
            </tr>
          </thead>
          {Object.keys(shorttags.properties)
            .map(key => {
              const mappedTo = shorttagmap[key];
              if (mappedTo) return null;
              return (
                <tr>
                  <td>
                    <code>{`{{${key}}}`}</code>
                  </td>
                  <td>
                    <i className="fa fa-arrows-h"></i>
                  </td>
                  <td>
                    <code>{`{{${mappedTo}}}`}</code>
                  </td>
                </tr>
              );
            })
            .filter(x => x)}
        </table>
      </>
    </TocFrame>
  );
};
