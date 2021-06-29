---
title: Attribution Tech Guide
highlights: |
     Attribution is the process of building a referral link between two people; the person that was referred 
     and the person doing the referring. In this guide we explain how the available methods to track attribution.
slug: developer/attribution
sectionType: guide
template: hasTableOfContents.html
---


All of the methods mentioned in the [introduction to attribution](/topics/attribution) article above work with both Squatch.js and the REST API for tracking referrals. It is possible to track attribution at the same time as conversion or as
two separate events. This will depend on your business model and the type of program that you're running. For example an eCommerce site may use referral codes to capture a single
purchase event that both attributes the referral and [marks it as converted](/topics/conversion), completing the referral and unlocking rewards. SaaS companies on the other hand typically attribute referrals on trial or free accounts, and then [convert the referrals](/topics/conversion) when someone pays.


### Squatch.js

Attribution works by passing the `referralCode` used by the user when they are [identified](/topics/identification) to [Squatch.js](/developer/squatchjs/v2/reference#upsertusert). The first time that `referralCode` is set for a user, it will trigger attribution of a referral back to the person that did the referral.

Squatch.js supports tracking attribution by setting the `user.referredBy.code` parameter for classic programs or including the referral code in the `user.referredByCodes` array parameter for our GA programs. All attribution tracking from Squatch.js is done when you [identify your users](/topics/identification) using the [user upsert method](/developer/squatchjs/v2/reference#upsertuser).

```js
var initObj = {
  user: {                               
    id: 'abc_123',                      
    accountId: 'abc_123',       
    email: 'john@example.com',                
    firstName: 'John',       
    lastName: 'Doe',
    referredByCodes: [
      'JANEDOE'
    ],
    segments: [
        'sampleSegment'
    ],
  },
  engagementMedium: 'EMBED',
  widgetType: '/p/program-name/w/referrerWidget',
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJsb2NhbGUiOiJlbl9VUyIsInJlZmVycmVkQnlDb2RlcyI6WyJKQU5FRE9FIl19fQ.mlBQG0iaZuheMp4W4SmvmIMz7IiGWMpCzBQrABLLJgA'
};

squatch.widgets().upsertUser(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```

The referral code can be found either in the `rsCode` query parameter from share links redirects, using [autofil](/developer/squatchjs/v2/reference#autofill) method to look up the referral tracking cookie, or passed in manually from a "referral code" box that someone types in at signup.


### REST API
 
Using the REST API, one can trigger a referral based off the use of a referral code. The main method for this is the [User Upsert](/api/methods#open_user_upsert) method. By upserting a user with the `user.referredBy.code` parameter for classic programs or the `user.referredByCodes` array parameter for our GA programs, you are able to create a referral between two users using referral code.

```curl
curl -X PUT https://app.referralsaasquatch.com/api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}?fields=&extraFields= 
  -u :API_KEY 
  -H "Content-Type: application/json" 
  -d '{
  "id": "219065",
  "accountId": "accc9065",
  "firstName": "Bob",
  "lastName": "Testerson",
  "email": "bob@example.com",
  "locale": "en_US",
  "referredBy": {
    "code": "JONDOE1234",
    "isConverted": true
  },
  "referredByCodes": [
    "JONDOE1234",
    "JOHNDOECODE"
  ],
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

<div class="text-center">![Example share link](/assets/images/attribution/attribution-example.png)</div>

The above screenshot is an example list of referrals that highlights the difference between attribution and conversion. One of these referral has a referred user who has not yet converted and the other has a referred user who has converted, unlocking $100 of free credit. Both of these referrals have been tracked and attributed back to the referrer that made them happen, but only one of the referrals has converted.
