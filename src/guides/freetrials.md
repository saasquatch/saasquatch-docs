---
title: Free Trials
highlights: Referral SaaSquatch supports free trials. By default referral credit is given once a new user has completed their trial and paid their first invoice.
slug: free-trials
template: guides.html
---

<h3>How do referrals work with free trials?</h3>
<p>
    Our default referral program behaviour is to not consider a referral complete until a referred customer has completed a trial and paid their first invoice. Referrers can
    see which of their friends have signed up for a trial or paid, so that it is clear when their referral credit will be earned.
</p>

<h3>How does Referral SaaSquatch track trials?</h3>
<p>
    Most subscription billing systems support free trials as a first-order concept. Since our payment system connectors work directly with your payment system API, we can use those APIs to detect
    when a user is on a trial and when they have paid.
</p>

<h3>What if my trial users aren't in Stripe or Recurly etc.?</h3>
<p>
    We support you! If your trial users or free users don't exist in your payment system, just remember to set <code>payment_provider: null</code> when you identify your users in <a href="/squatchjs#init">squatch.js 'init'</a>.
    We recommend that you also read about <a href="/shared-vs-solo-accounts">Shared vs Solo Accounts</a>.
</p>

