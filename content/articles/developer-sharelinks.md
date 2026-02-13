---
title: Understanding Sharelinks
highlights: "Learn about the different types of sharelinks that are available for each of your referral program's participants, and how they can be utilized to drive extremely detailed and accurate analytics data."
slug: /developer/sharelinks
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-22
---

By default, each user in your SaaSquatch referral programs have a series of links assigned to them designed to: 

1. Direct Referred Users who click on the link to your referral program Landing Page for a specific program.
2. Let the SaaSquatch system add the correct [cookie](/developer/squatchjs/cookies/) to the Referred User's browser to help attribute the referral back to the correct Referrer for that program.
3. Track the Engagement and [Share mediums](/success/share-options#social-media-share-messages) used by the Referrer. 

> - The Engagement medium is the method you use to show a user's share information to them.
>  - The Share medium is the method used by the Referrer to distribute their share information to their Referred Users.

## The sharelink object
> Sharelinks are contained in an object that groups the links by Engagement medium.

Making the correct sharelink available in the right place in your referral program will mean that your program's analytics are able to provide a more detailed breakdown of where Referrers and Referred Users are interacting with your referral program. 

This information can be used to help understand and [optimize your programs](/success/referral-program-optimization).

### Retrieving the sharelink object
A few methods can be used to retrieve a user's sharelinks:

- Via the SaaSquatch administrative portal, on the participant's *Codes and Links* tab (see image below).
- Via the REST API, by using either the [Lookup a user](/api/methods#open_get_user) or [Lookup a user's share URLs](/api/methods#open_get_shareurls) calls.
- Via the [GraphQL API](/graphql/reference), using the `user.shareLinks` query.

![Screenshot 2023-11-20 at 3.12.23 PM](/assets/images/contentful/Screenshot_2023-11-20_at_3.12.23_PM_2NjBAndeJyzbegE1Kv2dlu.png)

### Sharelink object example
> You can see that the example below groups the sharelinks by Engagement medium and provides a full array of share medium links for each engagement type.

<table class="table table-hover">
  <tr>
    <th>Engagement Medium</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>POPUP</td>
    <td>Shown to users <a href="https://saasquatch.github.io/squatch-js/classes/PopupWidget.html">via a <code>PopupWidget</code></a>.</td>
  </tr>
    <tr>
    <td>EMBED</td>
    <td>Shown to users <a href="https://saasquatch.github.io/squatch-js/classes/EmbedWidget.html">via an <code>EmbedWidget</code></a>.</td>
  </tr>
    <tr>
    <td>HOSTED</td>
    <td>Shown to users <a href="https://saasquatch.github.io/squatch-js/classes/WidgetApi.html#render">via a "Hosted" Widget</a>.</td>
  </tr>
    <tr>
    <td>cleanShareLink</td>
    <td>Shown on the <a href="/success/using-referral-saasquatch#participants">user's participant profile in the SaaSquatch adminstrative portal</a>.</td>
  </tr>
    <tr>
    <td>UNKNOWN</td>
    <td>Set of sharelinks retrieved for a user <a href="/features/reports#user-details-report">via a User Details Report</a>.</td>
  </tr>
    <tr>
    <td>EMAIL</td>
    <td>Shown to users <a href="/designer/email-editor">via program notification emails</a>.</td>
  </tr>
    <tr>
    <td>MOBILE</td>
    <td>Shown to users <a href="/mobile">via the mobile SDKs.</td>
  </tr>
</table>

```
{
  "POPUP": {
    "FACEBOOK": "http://ssqt.co/m9xLQfw",
    "TWITTER": "http://ssqt.co/mMxLQfw",
    "EMAIL": "http://ssqt.co/moxLQfw",
    "DIRECT": "http://ssqt.co/m5xLQfw",
    "LINKEDIN": "http://ssqt.co/m7xLQfw",
    "SMS": "http://ssqt.co/maxLQfw",
    "FBMESSENGER": "http://ssqt.co/mhxLQfw",
    "WHATSAPP": "http://ssqt.co/mFxLQfw",
    "LINEMESSENGER": "http://ssqt.co/mDxLQfw",
    "PINTEREST": "http://ssqt.co/RzxLQfw",
    "UNKNOWN": "http://ssqt.co/mBxLQfw"
  },
  "EMBED": {
    "FACEBOOK": "http://ssqt.co/mwxLQfw",
    "TWITTER": "http://ssqt.co/mcxLQfw",
    "EMAIL": "http://ssqt.co/mJxLQfw",
    "DIRECT": "http://ssqt.co/mQxLQfw",
    "LINKEDIN": "http://ssqt.co/mHxLQfw",
    "SMS": "http://ssqt.co/m2xLQfw",
    "FBMESSENGER": "http://ssqt.co/mgxLQfw",
    "WHATSAPP": "http://ssqt.co/mZxLQfw",
    "LINEMESSENGER": "http://ssqt.co/mxxLQfw",
    "PINTEREST": "http://ssqt.co/mfxLQfw",
    "UNKNOWN": "http://ssqt.co/mXxLQfw"
  },
  "HOSTED": {
    "FACEBOOK": "http://ssqt.co/muxLQfw",
    "TWITTER": "http://ssqt.co/mSxLQfw",
    "EMAIL": "http://ssqt.co/mlxLQfw",
    "DIRECT": "http://ssqt.co/mtxLQfw",
    "LINKEDIN": "http://ssqt.co/mYxLQfw",
    "SMS": "http://ssqt.co/mqxLQfw",
    "FBMESSENGER": "http://ssqt.co/mKxLQfw",
    "WHATSAPP": "http://ssqt.co/mrxLQfw",
    "LINEMESSENGER": "http://ssqt.co/mWxLQfw",
    "PINTEREST": "http://ssqt.co/RmxLQfw",
    "UNKNOWN": "http://ssqt.co/mAxLQfw"
  },
  "cleanShareLink": "http://ssqt.co/mzxLQfw",
  "UNKNOWN": {
    "FACEBOOK": "http://ssqt.co/mmxLQfw",
    "TWITTER": "http://ssqt.co/mRxLQfw",
    "EMAIL": "http://ssqt.co/mLxLQfw",
    "DIRECT": "http://ssqt.co/mvxLQfw",
    "LINKEDIN": "http://ssqt.co/m6xLQfw",
    "SMS": "http://ssqt.co/mkxLQfw",
    "FBMESSENGER": "http://ssqt.co/m0xLQfw",
    "WHATSAPP": "http://ssqt.co/mIxLQfw",
    "LINEMESSENGER": "http://ssqt.co/m8xLQfw",
    "PINTEREST": "http://ssqt.co/mpxLQfw",
    "UNKNOWN": "http://ssqt.co/mzxLQfw"
  },
  "EMAIL": {
    "FACEBOOK": "http://ssqt.co/mTxLQfw",
    "TWITTER": "http://ssqt.co/mGxLQfw",
    "EMAIL": "http://ssqt.co/mbxLQfw",
    "DIRECT": "http://ssqt.co/mPxLQfw",
    "LINKEDIN": "http://ssqt.co/m1xLQfw",
    "SMS": "http://ssqt.co/mOxLQfw",
    "FBMESSENGER": "http://ssqt.co/m4xLQfw",
    "WHATSAPP": "http://ssqt.co/mixLQfw",
    "LINEMESSENGER": "http://ssqt.co/myxLQfw",
    "PINTEREST": "http://ssqt.co/RLxLQfw",
    "UNKNOWN": "http://ssqt.co/mVxLQfw"
  },
  "MOBILE": {
    "FACEBOOK": "http://ssqt.co/mnxLQfw",
    "TWITTER": "http://ssqt.co/mCxLQfw",
    "EMAIL": "http://ssqt.co/mExLQfw",
    "DIRECT": "http://ssqt.co/mexLQfw",
    "LINKEDIN": "http://ssqt.co/m3xLQfw",
    "SMS": "http://ssqt.co/mNxLQfw",
    "FBMESSENGER": "http://ssqt.co/mUxLQfw",
    "WHATSAPP": "http://ssqt.co/msxLQfw",
    "LINEMESSENGER": "http://ssqt.co/mdxLQfw",
    "PINTEREST": "http://ssqt.co/RRxLQfw",
    "UNKNOWN": "http://ssqt.co/mjxLQfw"
  }
```
