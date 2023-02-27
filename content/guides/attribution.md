---
title: Attribution Tech Guide
highlights: |
     Attribution is the process of building a referral link between two people; the person that was referred 
     and the person doing the referring. In this guide we explain how the available methods to track attribution.
slug: developer/attribution
sectionType: guide
template: hasTableOfContents.html
date: '2019-11-18'
---


<classic-only>

Show on classic only

</classic-only>


<new-programs-only>

Show on new programs only

</new-programs-only>

All of the methods mentioned in the [introduction to attribution](/topics/attribution) article above work with both Squatch.js and the REST API for tracking referrals. It is possible to track attribution at the same time as conversion or as
two separate events. This will depend on your business model and the type of program that you're running. For example an eCommerce site may use referral codes to capture a single
purchase event that both attributes the referral and [marks it as converted](/topics/conversion), completing the referral and unlocking rewards. SaaS companies on the other hand typically attribute referrals on trial or free accounts, and then [convert the referrals](/topics/conversion) when someone pays.


### Squatch.js

Squatch.js support tracking attribution both automatically or triggered by manually setting the `referral_code` parameter for identified users. All attribution tracking from Squatch.js is done when you [identify your users](/topics/identification) using the [init method](/squatchjs/#init).


**Automatic attribution**

Automatic attribution works by detecting the presence of a tracking cookie the first time that a new account and user are [identified](/topics/identification) to [Squatch.js](/squatchjs/#init).
If that user has not been seen before, and that account has not previously converted by having it's `account_status` marked as `PAID`, then the new user will show up as an in-progress referral.


**Triggered attribution**

Triggered attribution works by setting a value for the `referral_code` field when a user is [identified](/topics/identification) to [Squatch.js](/squatchjs/#init). The first time that `referral_code` is set for a user, it will trigger attribution of a referral back to the person that did the referral.

```js
_sqh.push(['init', {
   tenant_alias: 'test_bpinhag9yagag',
   account_id: 'abc',
   payment_provider_id: null,
   user_id: '5678',
   email: 'bob@example.com',
   first_name: 'John',
   // referral_code: 'BOBTESTERSON' // Include this field to trigger attribution. Ommit this field to let automatic attribution detect tracking cookies
}]);
```

The referral code can be found either in the `rsCode` query parameter from share links redirects, using [autofil](/squatchjs/#autofill) method to look up the referral tracking cookie, or passed in manually from a "referral code" box that someone types in at signup.


### REST API
 
Using the REST API, one can trigger a referral based off the use of a referral code. The main method for this is the [Update Account](/api/methods/#account_sync) method. By associating
a `referral.code` for an account, you are creating a new Referral object where the `referrerReward` will default to null until the account is updated.

```curl
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "id": "abc123",
    "subscription": {
        "status": "TRIAL"
    },
    "referral": {
        "code": "BOBTESTERSON"
    }
}'
```


### Payment Systems (Stripe, Recurly, Braintree, Zuora)

If you've configured your Referral SaaSquatch account to be connected using one of the payment system connectors (like Stripe), then you should follow the integration guide for 
those payment systems. Payment system integrations typically rely on Coupon code integrations to do conversion tracking.

 - [Braintree](/developer/braintree)
 - [Recurly](/developer/recurly)
 - [Stripe](/developer/stripe)


<div class="bs-callout bs-callout-default">
  Attribution can be tracked using Squatch.js, the REST API or a payment system connector
</div>


### Attribution Vs [Conversion](/topics/conversion)

When you run a referral program you often want to separate the step of creating a referral link from the process of giving people rewards. 
You want to *attribute* a referral as soon as some one signs up for your product
but you only want to give a referral reward when the referred person [converts](/topics/conversion) and makes a purchase. 
Separating attribution from [conversion](/topics/conversion) is particularly useful for combating self-referral and 
other types of fraud because it means that referrals can be tracked while they are in-progress but not yet complete. The person that made the referral can be notified of the in-progress referrals before a final conversion step is complete and before any rewards are unlocked.

<div class="text-center"><img src="/assets/images/attribution/attribution-example.png" alt="Example share link"></div>

The above screenshot is an example list of referrals that highlights the difference between attribution and conversion. One of these referral has a referred user who has not yet converted and the other has a referred user who has converted, unlocking $100 of free credit. Both of these referrals have been tracked and attributed back to the referrer that made them happen, but only one of the referrals has converted.
