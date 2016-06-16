---
title: Recurly Integration
highlights: Referral SaaSquatch's Recurly integration uses Recurly’s Push Notifications and Recurly's API to automatically track subscriptions and give people discounts. This guide will walk you through how to set up this integration.
slug: recurly
template: guides.html
---

* * *

### Configure Recurly

<div class="well">**Test mode vs. live mode** - We let you test your referral program using a Recurly Sandbox account and fake credit cards before deploying to your production environment. To set up test mode, just follow this guide using 1) your Recurly Sandbox account and 2) your test mode tenant_alias (it starts with "test_")

<br>

**Note:** It is not required to setup a test environment but it will make testing easier for you.

</div>

#### Add your Recurly API Key in the SaaSquatch Portal

Note: Test mode vs. live mode - When you first create a Recurly account you will be able to test your referral program using the Recurly Sandbox account with fake credit card and invoices before deploying to your production environment. Once you are satisfied with your setup you can add a payment gateway and switch your Recurly account to production mode. Be aware that the conversion of your Recurly account from test to production is not reversible. We connect to the Recurly API using your Recurly API key. This lets us automatically apply discounts to people’s accounts.

1.  [Login to Recurly](https://app.recurly.com/login) and click on "Developer-> API Credentials". **Copy the "API key"**.
2.  [Login to Referral SaaSquatch](http://app.referralsaasquatch.com) and go to "Setup" and click "Authorize". **Paste in your Recurly API key that you just copied**, and press connect.
3.  Repeat this process for both your **test** and **live** accounts.

#### Set up Recurly to forward Webhooks to SaaSquatch

Referral SaaSquatch uses Recurly Webhook Events as triggers to know when accounts need to be updated. Recurly supports multiple Webhook Endpoints which allows you to simultaneously receive webhooks while also sending them to Referral SaaSquatch. In order to add Referral SaaSquatch as a webhook endpoint you will need to add our URL into your Recurly portal.

1.  [Login to Referral SaaSquatch](http://app.referralsaasquatch.com) and go to "Setup". **Copy the URL labelled Push Notification URL**. (it should look like https://app.referralsaasquatch.com/recurly/{tenant_alias}/webhook)
2.  [Login to Recurly](https://app.recurly.com/login) and go to Developer -> Push Notifications -> Configure. **Paste the URL you just copied** it into the field labeled Push Notification URL in Recurly. Press Update Configuration to save the URL and complete this step.
3.  Repeat this process for both your **test** and **live** accounts.

### Install squatch.js

Making use of our squatch.js library will allow you to surface a gorgeously rendered referral widget to your users either on your website or in your app. Through this widget your users will be able to seamlessly refer their friends.

To get up and running follow the squatch.js [install guide](/app-integration/) to place the widget on your page.

### Integration Flow

In order to utilize the Referral SaaSquatch integration with Recurly it is important to be mindful of the correct order of operations for successfully completing the referral flow from a trial to a paid referral.

The supported Referral SaaSquatch Recurly integration flow is:

1.  Register the user in Recurly
2.  Register the user in Referral SaaSquatch. Make sure to include:
    1.  payment_provider_id parameter from their Recurly account.
    2.  Referral code from referrer
3.  Convert the user to paid through Recurly. This conversion happens when a non-zero, non-trial subscription is applied to the user’s invoice. Including the "account_status = PAID" in your squatch.js calls will have no effect when your program is configured for a payment provider integration.
4.  Wait for the conversion to propagate from Recurly to Referral SaaSquatch (this process may be instantaneous but also may take longer depending on the load on Recurly and the frequency of them sending out webhooks).

* * *

#### More information

*   **Recurly API Keys** - We connect to the Recurly API using your Recurly API key. This lets us automatically apply discounts to people’s accounts. While this makes setting up our integration extremely powerful, easy and fast, sharing API keys is not officially supported by Recurly.

Check out our [Common Pitfalls Guide](/bestpractices/common-pitfalls)