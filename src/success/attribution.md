---
title: Attribution
highlights: |
     Attribution is the process of building a referral link between two people; the person that was referred 
     and the person doing the referring. When you run a referral program you often want to separate the linking of referrals from
     the process of giving people rewards. For example you want to *attribute* a referral as soon as some one signs in to your website,
     but you only want to give a referral reward when the referred person [converts](/topics/conversion) and pays their first bill.
slug: topics/attribution
sectionType: successArticle
template: hasTableOfContents.html
---


<div class="bs-callout bs-callout-default">
  <h4>Definition</h4>
  Attribution is the process of tracking a referral link between two people.
</div>


### Share Links

One of the most popular ways letting people share with their friends is using share links like `http://ssqt.co/hR6O`. Share links are unique links generated for each user that can be used for making referrals.
Share links rely on [Tracking Cookies](/topics/tracking-cookies) to track when someone has been referred, redirecting referred friends to a website or landing page to get started as a new customers. Share links are
often used along with [Squatch.js](/squatchjs) to track when someone has made a successful referral.

**Benefits of Share Links**:

 - Work across email, facebook, twitter and other social channels
 - Easy to set up
 - Can have domain white-labeled

**Disadvantages of Share Links**:
 
 - Relies on Cookies
   - Can be blocked by some browsers or cleared regularly
   - Does not work well with native mobile apps
 - Does not support real world face-to-face referrals

<div class="text-center">![Example share link](/assets/images/attribution/sharelink-attribution.png)</div>


### Referral Codes

Referral codes are a more modern way of sharing that rely on a human-readable code like `BOBTESTERSON`. Referral codes are unique codes that people can use when they sign up for a product
or check out at a store. Since there is a unique referral code for everyone who shares, referral codes can be used as the sole way of doing attribution. 

<b>Benefits of Share Links</b>:

 - Can be used with on-the-phone and in-person sign up processes link Banks, Call Centers and Retail Stores
 - Works well with printed materials
 - Supports mobile-first referrals for native mobile apps

<b>Disadvantages of Share Links</b>:
 
 - Some companies have policies against allowing any sort of promo codes

<div class="text-center">![Example share link](/assets/images/attribution/referralcode-attribution.png)</div>


### Hybrid (recommended)

It is possible to get the best of both worlds by using both human-readable codes and share links. This is the recommended approach for attribution because it provides all of the benefits
of both of the methods of share links and codes. In most cases, if it's possible to refer friends using a referral code, then it is preferable to go for a hybrid approach and take
advantage of the additional analytics provided by links.

<b>Benefits of Share Links</b>:

 - All of the benefits listed above
 - Best in class success rates

<b>Disadvantages of Share Links</b>:
 
 - Some companies have policies against allowing any sort of promo codes

<div class="text-center">![Example share link](/assets/images/attribution/hybrid-attribution.png)</div>


### Choosing an attribution method

Referral SaaSquatch has flexible attribution methods for controlling how referrals can be made and tracked. Each attribution method has certain strengths and limitations. Unique share links, for example, are a simple way to power your referral program but they don't work well offline, with cookie blockers or on mobile. Referral codes work well on mobile, but aren't as 
convenient for online sharing.

<table class="table">
<tr>
    <td></td>
    <td>Desktop</td>
    <td>Mobile</td>
    <td>Offline</td>
<tr>
<tr>
    <th>Share Links</th>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x" style="color: #CCC"></i></td>
    <td></td>
</tr>
<tr>
    <th>Referral Codes</th>
    <td><i class="fa fa-check-circle fa-3x" style="color: #CCC"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
</tr>
<tr>
    <th>Hybrid (Recommended)</th>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
</tr>
</table>



<div class="bs-callout bs-callout-default">
  Attribution can use share links, referral codes or both (hybrid)
</div>


### Tracking Attribution

All of the attribution methods above work with both Squatch.js and the REST API for tracking referrals. It is possible to track attribution at the same time as conversion or as
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

 - [Braintree](/braintree)
 - [Recurly](/recurly)
 - [Stripe](/stripe)


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
