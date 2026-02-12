---
title: Message Links
highlights: SaaSquatch Message Links can be used to dynamically build SaaSquatch program share buttons for each of your programs and supported share mediums.
slug: features/message-links
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-15
---


Enabling users to share their referral as widely and easily as possible is a key aspect of a successful referral program. 

Providing users with this link for each of your supported share mediums (Facebook, Twitter, LinkedIn) can often be complicated as this involves having to manage the format of the link needed to trigger a social share on each platform, while making sure the correct sharelink and pre-filled copy/image is included. 

> **SaaSquatch Message Links solve this problem on your behalf:** Using a simple URL format, SaaSquatch Message Links handle the underlying format of each social platforms share functionality, including the users SaaSquatch sharelink and your SaaSquatch program's pre-filled share message copy.
This ensures that the same SaaSquatch Message Link pulls in the correct information from SaaSquatch each time it is clicked.

### Example Uses
The format of the SaaSquatch Message Links means that you can provide your user the ability to share their referral while only needing to know the partipant's unique SaaSquatch ID, which is typically your own customer ID. 

This enables you to power share buttons in your own email campaigns and transactional emails, or within your app/web login without needing to lookup/import information from SaaSquatch using our API or exports.

### Link Format

Message links can be easily constructed as the only dynamic fields required are the SaaSquatch IDs of the participant you are providing the link for.

The following chart outlines the available configuration options for these Message Links, which enable you to choose which user and program they are for, as well as the engagement and share medium they will be sharing the referral through.

<pre><code class="lang-curl">https://app.referralsaasquatch.com/a/{tenant_alias}/message/redirect/{share_medium}?engagementMedium={engagement_medium}&accountId={accountId}&userId={userId}&programId={program_ID}&rsLandingPage={rsLandingPage}</code></pre>

<table class="table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Example</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>tenant_alias</code></td>
        <td><code>test_bpinhag9gag</code></td>
        <td>Your SaaSquatch project's test or live tenant alias.</td>
      </tr>
      <tr>
        <td><code>share_medium</code></td>
        <td><code>TWITTER</code></td>
        <td>The medium through which the Referrer will share this referral (<i>e.g.</i> Twitter share button). The supported values for this field include <code>WHATSAPP</code>, <code>TWITTER</code>, <code>FACEBOOK</code>, <code>FBMESSENGER</code>, <code>PINTEREST</code>, <code>LINKEDIN</code>, <code>LINEMESSENGER</code>, <code>SMS</code>, and <code>EMAIL</code>.</td>
      </tr>
      <tr>
        <td><code>engagement_medium</code></td>
        <td><code>EMBED</code></td>
        <td>The medium from which the this user will engage with the referral program (<i>e.g.</i> embedded widget). The supported values for this field include <code>EMBED</code>, <code>POPUP</code>, <code>EMAIL</code>, and <code>MOBILE</code>.</td>
      </tr>
      <tr>
        <td><code>accountId</code></td>
        <td><code>abc_123</code></td>
        <td>The SaaSquatch account ID for whom this Message Link is being built.</td>
      </tr>
      <tr>
        <td><code>userId</code></td>
        <td><code>abc_123</code></td>
        <td>The SaaSquatch user ID for whom this Message Link is being built.</td>
      </tr>
      <tr>
        <td><code>program_ID</code></td>
        <td><code>driver-program</code></td>
        <td>The ID of the SaaSquatch Growth Automation Program for which this user will be sharing their referral.</td>
      </tr>
      <tr>
        <td><code>rsLandingPage</code> (optional)</td>
        <td><code>https://example.com/driver-program</code></td>
        <td>Override the landing page of the program to redirect the resulting share link to a different URL. Only different paths on your program's landing page URL are supported, you cannot redirect to a different domain entirely for security reasons.</td>
      </tr>
    </tbody>
  </table>

  #### Example URL Format

  Using the above format, the following is an example of what the Message Link URL would look like for a participant with SaaSquatch user ID/account ID `messageLink` that you would provide to them in an email for them to share through a mobile link for our demo program `klip-referral-program`:
<pre><code class="lang-curl">https://app.referralsaasquatch.com/a/test_aut32av0b11uc/message/redirect/EMAIL?engagementMedium=MOBILE&accountId=messageLink&userId=messageLink&programId=klip-referral-program</code></pre>