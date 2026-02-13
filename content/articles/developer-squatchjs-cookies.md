---
title: Tracking Cookies
highlights: As of June 2020, SaaSquatch has enabled the usage of 1st Party Cookies to accommodate a wider industry shift towards the increased protection of end user privacy. 
slug: developer/squatchjs/cookies
sectionType: guide
template: hasTableOfContents.html
date: 2023-08-23
---

SaaSquatch uses first-party cookies for referral attribution—the process of connecting a referred participant to the person who made the referral. The cookies are based on UTM parameters passed through the URL. By placing [squatch.js](/developer/squatchjs/v2) on your landing page, it is able to read the UTM parameters and create a valid first-party cookie that’s in compliance with all browsers. 

## Set up first-party cookies
We recommend that all implementations that make use of our referral cookie adhere to the following instructions to enable usage of first-party cookies:
Make sure your landing page and your signup page exist on the same domain
Add squatch.js to your landing page. This sets the first-party cookie.
Place squatch.js on the signup page where your users are upserted. This reads the first-party cookie. 

Here’s how it works:
1. Squatch.js reads `_saasquatch` from the URL and stores a first-party cookie on the specified landing page's domain.
2. It automatically sets the cookies field on users during an upsert.
3. It reads the first-party cookie during use of [autofill](https://saasquatch.github.io/squatch-js/pull/58/functions/autofill.html).

### Attribution Preference Hierarchy
As there are several ways to attribute a referred participant to a referrer, the connection will always be linked following the below scheme:

1. Explicit inclusion of a `referredByCodes` either via squatch.js or the REST API will always override any identified cookie.
2. If a referral code is not included directly with a user upsert, then squatch.js will look for the first-party cookie and make the attribution.
3. If no first-party cookie exists and a third-party cookie is available through a compatible browser, the 3rd-party cookie will be detected and applied.