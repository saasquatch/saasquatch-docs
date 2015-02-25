---
title: Testing Best Practice Guide
highlights: SaaSquatchYou can test your Referral SaaSquatch integration in test mode before touching any production systems.
slug: testing
template: guides.html
---

### What is test mode?

Every Referral SaaSquatch account comes with both a test and live "tenant". The test tenant can be configured to connect to your sandbox payment provider account. You'll notice that the
`tenant_alias` of your test tenant always begins with **"test_"**


### How do I use test mode?

When you're configuring your payment system integration, set up your payment provider's sandbox first. Then, <a href="/app-integration">install squatch.js</a> using your test <code>tenant_alias</code>. Test
mode is fully functional, so you can test the whole user experience.


### What should I test?

You should test things:

<ul>
    <li>Open the referral widget <span class="muted">(click any button with <code>class="squatchpop"</code>)</span></li>
    <li>Click a referral link <span class="muted">(you can find your referral link in the referral widget)</span></li>
    <li>Make sure <code>coupon_code</code> is autofilled <span class="muted">(go to your payment form after clicking a referral link)</span></li>
    <li>Check your first invoice <span class="muted">(sign up as a "referred" user and make sure your first invoice has a coupon applied)</span></li>
</ul>
<p></p>

### What else should I know?

We recommend that you also read about <a href="/shared-vs-solo-accounts">Shared vs Solo Accounts</a> and 
the <a href="/bestpractices/common-pitfalls">Common Pitfalls</a>. Most integration problems are listed in those guides.