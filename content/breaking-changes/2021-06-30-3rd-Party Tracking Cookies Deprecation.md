---
title: 3rd-Party Tracking Cookies Deprecation
deadline: 2021-06-30
contentType: breakingChange
---

Browsers have been making gradual changes to tracking cookie permissions for years. In 2020 this has accelerated with Safari [blocking all 3rd-party cookies](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/). SaaSquatch uses cookies on `app.referralsaasquatch.com` as one of our ways of attributing referrals, and have relied on 3rd-party tracking cookies since we launched in 2013. This approach is no longer the best way to track referrals.

On June 12, 2020 we launched a new attribution method based on dropping cookies directly on your domain. These new [1st-party cookies](/developer/squatchjs/cookies) are more resilient to security changes and are similar to what Apple uses for tracking on their own website. We highly recommend that you upgrade your usage of squatch.js to rely on 1st-party cookies as soon as possible.

Even though 3rd-party cookies continue to work in other standard browsers like Firefox, Chrome, Internet Explorer and Edge, the industry is slowly moving to block 3rd-party cookies and it will be only a matter of time until 3rd-party cookies stop working in all updated browsers. To keep our referral programs working optimally for our customers, our best bet is to preemptively migrate everyone to rely on 1st-party cookies.

__You can gradually migrate from 3rd-party to 1st-party cookies. When a 1st-party cookie doesn't exist, we will automatically fall back to using the older 3rd-party cookies.__

We will continue to set 3rd-party cookies until 2021-06-30. At that point we will stop setting 3rd party cookies, but will continue reading them as a fallback for 30 days. After that, we will disable reading cookies.