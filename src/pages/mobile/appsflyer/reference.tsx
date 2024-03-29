import React from "react";
import Markdown from "../../../components/Markdown";
import PageHeader from "../../../components/PageHeader";
import { Properties } from "../../../components/Properties";

const appsflyerFields = {
  title:
    "The SaaSquatch integration with AppsFlyer includes these fields as `data` in referral AppsFlyer deep links.\n",
  type: "object",
  properties: {
    pid: {
      type: "string",
      description:
        "Media source, set as 'saasquatch_int' in AppsFlyer when configuring your custom attribution link",
    },
    c: {
      type: "string",
      description:
        "Campaign name, set as 'saasquatch' in AppsFlyer when configuring your custom attribution link",
    },
    af_web_dp: {
      type: "string",
      description:
        "The URL where desktop users will be redirected. Set as the landing page for your program in the SaaSquatch portal. Do not configure a value for this parameter when creating your custom link in AppsFlyer.",
    },
    deep_link_sub1: {
      type: "string",
      description: `The Base64URL encoded attribution cookie values. This is necessary to attribute the referral. When decoded, the schema will resemble the following:
      {"app.referralsaasquatch.com": {"tenantAlias_CODE": {"codes": {"program1": "CODE1"},"codesExp": {"CODE1": 1234567}}}}`,
    },
    deep_link_sub2: {
      type: "string",
      description:
        "[Google Analytics-compatible](https://support.google.com/analytics/answer/1033863?hl=en#parameters) traffic source identifier",
    },
    deep_link_sub3: {
      type: "string",
      description:
        "Google Analytics-compatible advertising or marketing medium",
    },
    deep_link_sub4: {
      type: "string",
      description: "Google Analytics-compatible campaign name",
    },
    deep_link_sub5: {
      type: "string",
      description: "The Referrer's referral code.",
    },
    deep_link_sub6: {
      type: "string",
      description:
        "The medium through which the Referrer shared their referral (e.g. Twitter share button) ",
    },
    deep_link_sub7: {
      type: "string",
      description:
        "The medium from which the Referrer engaged with the referral program (e.g. embedded widget)",
    },
  },
};

const appsflyerLegacyFields = {
  title:
    "The SaaSquatch integration with AppsFlyer includes these fields as `data` in referral AppsFlyer deep links.\n",
  type: "object",
  properties: {
    pid: {
      type: "string",
      description:
        "Media source, set as 'saasquatch_int' in AppsFlyer when configuring your custom attribution link",
    },
    c: {
      type: "string",
      description:
        "Campaign name, set as 'saasquatch' in AppsFlyer when configuring your custom attribution link",
    },
    af_web_dp: {
      type: "string",
      description:
        "The URL where desktop users will be redirected. Set as the landing page for your program in the SaaSquatch portal. Do not configure a value for this parameter when creating your custom link in AppsFlyer.",
    },
    utm_source: {
      type: "string",
      description:
        "[Google Analytics-compatible](https://support.google.com/analytics/answer/1033863?hl=en#parameters) traffic source identifier",
    },
    utm_medium: {
      type: "string",
      description:
        "Google Analytics-compatible advertising or marketing medium",
    },
    utm_campaign: {
      type: "string",
      description: "Google Analytics-compatible campaign name",
    },
    rsCode: {
      type: "string",
      description: "The Referrer's referral code.",
    },
    rsShareMedium: {
      type: "string",
      description:
        "The medium through which the Referrer shared their referral (e.g. Twitter share button) ",
    },
    rsEngagementMedium: {
      type: "string",
      description:
        "The medium from which the Referrer engaged with the referral program (e.g. embedded widget)",
    },
    _saasquatch: {
      type: "string",
      description: `The Base64URL encoded attribution cookie values. This is necessary to attribute the referral. When decoded, the schema will resemble the following:
      {"app.referralsaasquatch.com": {"tenantAlias_CODE": {"codes": {"program1": "CODE1"},"codesExp": {"CODE1": 1234567}}}}`,
    },
  },
};

const entry = {
  title: "AppsFlyer Reference",
  highlights: `SaaSquatch integrates with [AppsFlyer](https://www.appsflyer.com). This technical reference explains the specifics fields, features, API calls, and functionality that are used in the integration.`,
};
export default function render() {
  return (
    <PageHeader {...entry}>
      <>
        <Markdown source={start} />
        <Markdown source={howItWorks} />
        <Markdown source={deepLink} />
        <Markdown source={dataFields} />
        <ul className="nav nav-tabs" id="deep-linking-example-1">
          <li className="active">
            <a data-toggle="tab" data-target=".example-unified-1">
              Unified Deep Linking
            </a>
          </li>
          <li>
            <a data-toggle="tab" data-target=".example-legacy-1">
              Legacy Deep Linking
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane example-unified-1 active">
            <Properties schema={appsflyerFields} />
          </div>
          <div className="tab-pane example-legacy-1">
            <Properties schema={appsflyerLegacyFields} />
          </div>
        </div>
      </>
    </PageHeader>
  );
}
const start = `
> #### New to AppsFlyer?
> This page is a technical reference of the AppsFlyer integration. Just getting started for the first time? Check out this article instead: [AppsFlyer Getting Started Guide](/mobile/appsflyer)
`;

const howItWorks = `
### How it Works

\`\`\`mermaid
%%{init: {"themeCSS": ".label foreignObject { overflow: visible; }"} }%%
graph TD
  A[Share Link <br> Ex: https://ssqt.co/mzz27S ] -->|Share Link Clicked | C{{AppsFlyer Integration}}
  C -->|No| E(Redirected to Program Landing Page <br>Ex: http://www.example.com/referrals?utm_source=...)
  C -->|Yes| F[Redirected to Enriched AppsFlyer OneLink <br>Ex: https://saasquatch.onelink.me/test/referral?utm_source=...]
  F -->|Mobile User: App Installed| G(Redirected to Mobile App)
  F -->|Mobile User: App Not Installed| I(Redirected to App Store)
  F -->|Desktop User| H(Redirected to Program Landing Page <br> Ex: http://www.example.com/referrals?utm_source=...)
\`\`\`


The SaaSquatch integration with AppsFlyer works as follows:

* SaaSquatch sharelinks will start redirecting to AppsFlyer links

* SaaSquatch will create AppsFlyer links dynamically by passing custom attribution parameters to the link provided in your AppsFlyer configuration.
  * Using Appsflyer's unified deep linking, data is passed using the \`deep_link_sub1\` through \`deep_link_sub7\` url parameters.
  * Using Appsflyer's legacy deep linking data is passed using the following url parameters \`af_web_dp\`, \`utm_source\`, \`utm_medium\`, \`utm_campaign\`, \`rsCode\`, \`rsShareMedium\`, \`rsEngagementMedium\` and \`_saasquatch\`
  * You can use \`deep_link_sub1\` or \`_saasquatch\` depending on your deep linking to attribute referrals and the other parameters to customize the mobile landing experience.

SaaSquatch will redirect all link clicks through AppsFlyer. Mobile users will be directed by AppsFlyer according to your OneLink configuration and desktop users will be directed to the landing page URL you configured for your SaaSquatch program. SaaSquatch passes this URL through the \`af_web_dp\` parameter. If you set the value for \`af_web_dp\` in AppsFlyer it will overwrite the value configured for your SaaSquatch program.

__IMPORTANT:__ If you have both Branch Metrics and AppsFlyer integrations enabled, share links will still be redirected to AppsFlyer links, however the Branch deep link will be passed to the AppsFlyer integration instead of your landing page link (in effect, both integrations are applied, Branch first, then AppsFlyer).

---
`;

const deepLink = `
### Example Deep Link

When SaaSquatch creates AppsFlyer links dynamically the resulting link and it’s custom attribution parameters produce a deep link similar to the following example:

<ul class="nav nav-tabs" id="deep-linking-example-2">
<li class="active">
  <a data-toggle="tab" data-target=".example-unified-2">
    Unified Deep Linking
  </a>
</li>
<li>
  <a data-toggle="tab" data-target=".example-legacy-2">
    Legacy Deep Linking
  </a>
</li>
</ul>
<div class="tab-content">
  <div class="tab-pane example-unified-2 active">
    <pre><code>{
  "pid": "saasquatch_int",
  "c": "saasquatch",
  "af_web_dp": "http://myReferralLandingPage.com",
  "utm_source": "invite",
  "utm_medium": "link",
  "utm_campaign": "saasquatch",
  "rsCode": "REFERRALCODE",
  "rsShareMedium": "UNKNOWN",
  "rsEngagementMedium": "UNKNOWN",
  "_saasquatch": "eyJhcHAucmVmZXJyYWxzYWFzcXVhdGNoLmNvbSI6eyJ0ZXN0XzEyMzQ1NjdfQ09ERSI6eyJjb2RlcyI6eyJyZWZlcnJhbCI6IlJFRkVSUkFMQ09ERSJ9LCJjb2Rlc0V4cCI6eyJSRUZFUlJBTENPREUiOjE2Mjk1ODIxOTl9LCJsaW5rcyI6eyJyZWZlcnJhbCI6Imh0dHBzOi8vc3NxdC5jby9temFBMjIifSwibGlua3NFeHAiOnsiaHR0cHM6Ly9zc3F0LmNvL216YUEyMiI6MTYyOTU4MjE5OX19fX0="
}</code></pre>
  </div>
  <div class="tab-pane example-legacy-2">
    <pre><code>{
  "pid": "saasquatch_int",
  "c": "saasquatch",
  "af_web_dp": "http://myReferralLandingPage.com",
  "deep_link_sub1": "eyJhcHAucmVmZXJyYWxzYWFzcXVhdGNoLmNvbSI6eyJ0ZXN0XzEyMzQ1NjdfQ09ERSI6eyJjb2RlcyI6eyJyZWZlcnJhbCI6IlJFRkVSUkFMQ09ERSJ9LCJjb2Rlc0V4cCI6eyJSRUZFUlJBTENPREUiOjE2Mjk1ODIxOTl9LCJsaW5rcyI6eyJyZWZlcnJhbCI6Imh0dHBzOi8vc3NxdC5jby9temFBMjIifSwibGlua3NFeHAiOnsiaHR0cHM6Ly9zc3F0LmNvL216YUEyMiI6MTYyOTU4MjE5OX19fX0=",
  "deep_link_sub2": "invite",
  "deep_link_sub3": "link",
  "deep_link_sub4": "saasquatch",
  "deep_link_sub5": "REFERRALCODE",
  "deep_link_sub6": "UNKNOWN",
  "deep_link_sub7": "UNKNOWN"
}</code></pre>
  </div>
</div>


There may be other parameters added by AppsFlyer depending on how your OneLink is configured. 

---

`;

const dataFields = `
### Data Fields

When SaaSquatch creates AppsFlyer links dynamically, it includes a number of custom attribution parameters. These includes fields from AppsFlyer, as well as the standard set of parameters usually passed in the query string to your program landing page by SaaSquatch. The fields are detailed below.
`;
