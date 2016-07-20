---
title: Stripe Integration Install Guide
highlights: Referral SaaSquatch's Stripe integration uses Stripe Connect to automatically track subscriptions and give people discounts. This guide will walk you through how to set up this integration.
slug: developer/stripe
sectionType: guide
template: hasTableOfContents.html
---


* * *

### Configure Stripe

The first step is granting SaaSquatch access to your Stripe account using Stripe Connect. Note: Test mode vs. live mode - We let you test your referral program using Stripe Test Mode and fake credit cards before deploying to your production environment. It is not required to setup a test environment but it will make testing easier for you.

<div class="well ">**Test mode vs. live mode** - We let you test your referral program using [Stripe Test Mode](https://stripe.com/docs/testing) and fake credit cards before deploying to your production environment.
<br>
**Note:** It is not required to setup a test environment but it will make testing easier for you.

</div>

#### Connect with Stripe

We use Stripe Connect to connect the corresponding Live and Test accounts. To authorize your Referral SaaSquatch Live and Test tenants with the respective Live and Test Stripe accounts:

1.  Go the install tab under the Setup section in your Portal. <br>
**Note:** Make sure that you are keeping track of whether you are connecting your Live or Test tenant.

3.  Click "Authorize" and follow the prompts to login to your Stripe account. This will automatically fill in the necessary API key.
4.  Repeat the same process for both your live and test accounts.

### Install squatch.js

Making use of our squatch.js library will allow you to surface a gorgeously rendered referral widget to your users either on your website or in your app. Through this widget your users will be able to seamlessly refer their friends. To get up and running follow the squatch.js [install guide](/app-integration/) to place the widget on your page.

### Integration Flow

In order to utilize the Referral SaaSquatch integration with Stripe it is important to be mindful of the correct order of operations for successfully completing the referral flow from a trial to a paid referral. 

The supported Referral SaaSquatch Stripe integration flow is:

1.  Make sure that the Referrer is registered in Stripe with a valid credit card and plan selected
2.  Create an account for the Referred User in Stripe
3.  Add a valid credit card to the Referred User’s Account in Stripe
4.  Create a Referral SaaSquatch account for the Referred User
5.  Include their payment_provider_id from Stripe (listed as "ID" under Customer Details)
6.  Attribute referral (widget should automatically pick up referral cookie)
7.  Update Referred User in Stripe with subscription to a plan. This will convert the user from TRIAL to PAID when a non-zero, non-trial subscription is applied to the user’s invoice.<br>**Note:** Including the "account_status = PAID" in your squatch.js calls will have no effect when your program is configured for a payment provider integration.
8.  Wait for the conversion to propagate from Stripe to Referral SaaSquatch (this process may be instantaneous but also may take longer depending on the load on Stripe and the frequency of them sending out updates).

Result: Referral converted to paid, rewards fulfilled in Stripe, rewards redeemed in Referral SaaSquatch 

**Note:** Referral rewards get applied to a user’s stripe account as a line item on their next invoice. Discounts or credits being applied to a user’s stripe invoice should have an "RS_" appended at the beginning.

* * *

#### That's it!

Check out our [Common Pitfalls Guide](/bestpractices/common-pitfalls)