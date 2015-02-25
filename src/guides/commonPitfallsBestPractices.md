---
title: Common Pitfalls
highlights: Many common Referral SaaSquatch integration problems can be easily avoided by reading this guide.
slug: bestpractices/common-pitfalls
template: guides.html
---

### Using the wrong account_id

If you haven't already, take a minute to read <a href="/shared-vs-solo-accounts">Shared vs Solo Accounts</a>. This will clarify most questions about account_id.


### Using the wrong payment_provider_id

<p>People often pass the wrong <code>payment_provider_id</code> to <code>_sqh.push(['init', ...])</code>. Here are the most common mistakes for payment_provider_id</p>

<ul>
    <li>The `payment_provider_id` was omitted instead of being set as null</li>
    <li>The `payment_provider_id` could not be verified using the Braintree/Stripe/Recurly/Zuora API because that account doesn't exist yet</li>
    <li>An `payment_provider_id` from a live system is being used on a test system</li>
    <li>The `payment_provider_id` was set as null, but <a href="/squatchjs/signed-requests">Signed Requests</a> aren't being used</li>
</ul>

<p>Depending on your payment system, a different payment_provider_id should be used. Here is the full reference:</p>
<table class="table">
    <tr>
        <td>Braintree</td>
        <td>The <code>id</code> of a Braintree Account object</td>
    </tr>
    <tr>
        <td>Stripe</td>
        <td>The <code>id</code> of a Stripe Customer object</td>
    </tr>
    <tr>
        <td>Recurly</td>
        <td>The <code>id</code> of a Recurly Account object</td>
    </tr>
    <tr>
        <td>Zuora</td>
        <td>The <code>id</code> of a Zuora Account object</td>
    </tr>
</table>
<p>
    See also: <a href="/squatchjs#init">'init' Javascript API reference</a>
</p>


### Testing referral links and 'autofill' on localhost or development

By default each user gets a unique referral link (e.g. ssqt.ch/21bnmb12) to share with their friends. When someone clicks on these links, Referral SaaSquatch 
sets a cookie to track the referral, and redirects them to the company homepage. Even though a user is redirected to the live website (i.e. http://livesite.com), the cookie can
still be read from their development environment (i.e. http://localhost:8080). This is possible because the cookie is tracked on our subdomain (app.referralsaasquatch.com).

See also: <a href="/squatchjs#autofill">'autofill' Javascript API reference</a>


### Forgetting to set up the coupon code during signup

<strong>For Stripe and Recurly</strong> - you must use <code>_sqh.push(['autofill', ...])</code> to grab the referral/coupon code from the cookie 
and include that in your Recurly or Stripe subscription API calls. If this is forgotten, then new users don't get their discounts.

<strong>For Braintree and Zuora</strong> - you must make a call to the Referral SaaSquatch REST API during checkout to mark the referral as complete 
and lookup rate plan information. If this is forgotten, then new users don't get their discounts.

See also: <a href="/squatchjs#autofill">'autofill' Javascript API reference</a>


### Forgetting to add a call to action button

<p>Adding squatch.js to your app is not enough. You should also add <code>class="squatchpop"</code> to a button in your app, or use <code>_sqh.push('open');</code> javascript to make sure that your customers can access your referral program.</p> 
<p>
    See also: <a href="/bestpractices/buttons">Refer-a-friend buttons Best Practice Guide</a>
</p>