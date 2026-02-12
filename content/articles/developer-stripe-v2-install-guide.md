---
title: Stripe Integration Install Guide
highlights: "SaaSquatch's Stripe integration uses [Stripe Connect](https://stripe.com/en-ca/connect) to automatically fulfill credit rewards as [balance adjustments](https://stripe.com/docs/billing/invoices/credit-notes) on a customer's account in Stripe."
slug: developer/stripe-v2-install-guide
sectionType: guide
template: hasTableOfContents.html
date: 2023-02-21
---

This guide will walk you through how to set up the Stripe integration.

### Overview
What you'll need to do to setup your Stripe Integration:
1. [Connect Stripe](#connect-stripe)
2. [Configure the Stripe Integration](#configure-stripe)
3. [Configure your reward program in SaaSquatch](#configure-your-saasquatch-programs)
4. [Connect SaaSquatch Users with their matching Stripe Customer IDs](#Connect-SaaSquatch-Users)

### Connect Stripe
The first step is to grant your SaaSquatch Account access to your Stripe Account's Live and Test modes by using Stripe Connect. 

>**Test Mode vs. Live Mode**: Your SaaSquatch program provides both a [live and test tenant](/success/navigating-the-portal/#install). The test mode can be used in conjunction with Stripe's [Test Mode](https://stripe.com/docs/testing) to test reward fulfillment before deploying to your production environments on SaaSquatch and Stripe.

To authorize your SaaSquatch Live and Test Tenants with the respective Stripe Account Live and Test modes:
1. In the SaaSquatch Admin Portal, go to __Settings > Integrations. 
   - **Note**: We recommend setting up the integration in your test tenant first.  Make sure that you are linking your SaaSquatch **Test Tenant** with **Test Mode** in Stripe and your SaaSquatch **Live Tenant** with **Live Mode** in Stripe. 
2. Expand the Stripe integration card and click **Enable Stripe**.
3. Click the **Connect to Stripe** button, which will open a pop-up window prompting you to login with your Stripe credentials. This will [authorize](https://support.stripe.com/questions/platform-security-permissions-and-access-levels) SaaSquatch to add credit to your customer accounts in Stripe.
4. Repeat the same process in both your Test and Live Tenants on SaaSquatch.

### Configure Stripe
After you've connected your Stripe Integration, you'll need to configure the currencies you wish to fulfill via Stripe. **If no configuration is set, rewards will not be sent to Stripe**. You can have the integration fulfill any currency by selecting "All Currencies" or pick one or more specific currencies to fulfill. We recommend picking the currency of your customer's subscriptions. 

Any currencies you choose will be associated with the program **reward unit** `CREDIT/{CURRENCY_CODE}`. 

<div class="row-fluid">
  <div class="span9">
    <div class="bs-callout bs-callout-default">
    <h4>A Few Examples:</h4><p>
    These are all based on the assumption that the recipient of the reward is linked with a valid Stripe Customer ID. <p>
      <ol>
<li>If you selected <i>USD</i> as your currency, then any program configured to reward <code>CREDIT/USD</code> will be automatically fulfilled by Stripe.</li> 
<li>If you selected <i>CAD</i> for Stripe, then a program configured to reward <code>CREDIT/CAD</code> will be automatically fulfilled by Stripe, but NOT a program configured to reward <code>CREDIT/USD</code>.</li>
<li>If you selected BOTH <i>CAD</i> and <i>USD</i> then programs configured to reward <code>CREDIT/CAD</code> and <code>CREDIT/USD</code> will both be fulfilled by Stripe. A Program configured to reward <code>CREDIT/JPY</code> would not.</li>
<li>If you have selected <i>All Currencies</i> in your Stripe integration, then all <code>CREDIT/CURRENCY_CODE</code> will be automatically fulfilled by Stripe. Based on the above examples, this would include the programs configured to reward <code>CREDIT/USD</code>, <code>CREDIT/CAD</code>, and <code>CREDIT/JPY</code>. This setting will support any valid <a href="https://www.iso.org/iso-4217-currency-codes.html">ISO 4217</a> currency code.</li></ol>
    </div>
  </div>
  <div class="span3">
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-10-28_at_2.45.01_PM_1xk8Y7KRj7kXvJydmUASEh.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/Screen_Shot_2019-10-28_at_2.45.01_PM_1xk8Y7KRj7kXvJydmUASEh.png" alt="Stripe Configuration">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
 </div>

#### Custom Stripe Reward Units
The Stripe Integration supports fulfillment of alternative reward units in addition to `CREDIT` as long as it is specificed in the Stripe Configuration and a valid currency code is appended. For example, instead of using `CREDIT/USD` you could use `SPECIAL/USD`. 

To do so, navigate to the Stripe Configurator in the Integrations tab and select "Custom" rather than "Currency" from the drop-down menu. You can then add `SPECIAL` as the custom unit that accepts all currencies, or `SPECIAL/USD` or `SPECIAL/CAD` if you would like to specify the currency accepted. As with the standard `CREDIT/` unit, custom units will accept any valid [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) currency code.

### Configure your SaaSquatch Programs
If you would like one of your programs in SaaSquatch to issue rewards that are automatically fulfilled by Stripe, you will need to configure the unit for the reward to match what you configured Stripe to look for. This is done using the *Custom* reward unit using the following steps:
1. In the SaaSquatch Admin Portal, go to __Rewards > Reward Units__.
2. Create a reward unit. 
3. Choose the __Custom__ reward unit type.
4. If you have selected a standard currency (*i.e.* `USD`) when configuring Stripe, then you will add `CREDIT/USD` as the custom reward unit. The pattern is `CREDIT/{CURRENCY_CODE}` for rewards to be picked up by Stripe.
5. If you selected a Custom unit when configuring Stripe, you will need to utilize that unit if you want Stripe to automatically fulfill the reward. Using the above examples, in the Custom unit field of your program, you would enter `SPECIAL/USD`.
  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-10-28_at_3.23.10_PM_169zJ2mKdKvtoWN2Lqo4m9.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Screen_Shot_2019-10-28_at_3.23.10_PM_169zJ2mKdKvtoWN2Lqo4m9.png" alt="Standard Stripe Reward Unit">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-10-28_at_3.23.30_PM_5diWWKHvg1atxfLMp2gstb.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/Screen_Shot_2019-10-28_at_3.23.30_PM_5diWWKHvg1atxfLMp2gstb.png" alt="Custom Reward Unit">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

#### Applicable Reward Types/Fulfillment
Stripe Integration currently only supports fulfillment of **credit reward types** and does not yet support fulfillment of percentage discounts. Unsupported rewards will be ignored by Stripe and go unfulfilled.

While SaaSquatch recommends using the custom reward units as outlined above, it is possible to use the *Dollar* reward unit with Stripe. To do so, return to the Stripe configuration and select *Custom* instead of *Currency* and put `CENTS/USD` into the field. Note that using this setup will **only** support USD as the currency.

### Connect SaaSquatch Users
In order for a customer to have their rewards fulfilled by Stripe, **you must link their SaaSquatch User Account with their [Stripe Customer ID](https://stripe.com/docs/api/customers/object) (*e.g.* `cus_FpRWZEB4b77zAI`).**

To do so, perform a [user upsert](/success/core-topics/#identification) and include the Stripe Customer ID as a [customer user field](/features/custom-user-fields/) named `stripeCustomerId`. As an example: `stripeCustomerID: "cus_FpRWZEB4b77zAI"`.

As an API Call, an example user upsert that includes the `stripeCustomerId` field might look like:

```json
{
  "id": "ABC_123",
  "accountId": "ABC_123",
  "customFields": {
    "stripeCustomerId": "cus_FpRWZEB4b77zAI"
  }
}
```
>**Note**: Stripe is not able to retroactively fulfill rewards, so be sure to add the Stripe Customer ID to your SaaSquatch users **before** they might be issued rewards. 

To confirm a user reward has been fulfilled by Stripe, sign into your SaaSquatch portal and visit the rewarded user's profile. If the reward was fulfilled by Stripe, you will see a fulfillment note beside the reward status. In Stripe you see an *Adjustment* corresponding to the customer's reward under their [Customer Balance](https://stripe.com/docs/billing/customer/balance).