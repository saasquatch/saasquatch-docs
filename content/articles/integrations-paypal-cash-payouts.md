---
title: Automated Cash Payouts with PayPal
highlights: SaaSquatch’s integration with PayPal lets you reward your participants with cash in any currency supported by PayPal. 
slug: integrations/paypal/cash-payouts
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-07-28
robotsTag:
  - FOLLOW
---

## Feature overview
SaaSquatch’s integration with PayPal lets you give referral program participants who live in [eligible countries](https://developer.paypal.com/docs/payouts/standard/reference/country-feature/) with cash in [any currency supported by PayPal](https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/).  Cash payouts are W-9 compliant, and the setup process requires just a few steps for you and your participants. The only information we require from your participants is the email associated with their PayPal account. 

To get started, you need a business PayPal account with access to the PayPal Developer website. After you connect your business PayPal account with SaaSquatch, you can choose the reward units that you want to be paid out via PayPal and then set up a regular payout schedule. Any Credit reward unit with a PayPal-supported currency is eligible. 

![Reward Unit Creation page](/assets/images/contentful/image_fhhK9ZBdxl274WkUdtydI.png)

> __Note:__ Clients are responsible for any currency conversion and [transaction fees](https://www.paypal.com/ca/webapps/mpp/merchant-fees) charged by PayPal. Not all currencies are eligible for conversion—check out PayPal’s [currency conversion documentation](https://developer.paypal.com/docs/payouts/standard/reference/currency-conversion/) for more details.

Ready to begin? See our doc on [Setting Up Cash Payouts with PayPal](/integrations/paypal/setting-up-cash-payouts).

### Required client information
To use PayPal for cash payouts, you need a business PayPal account. SaaSquatch only supports connecting with one business PayPal account at a time. If you want to connect SaaSquatch with a different account, then we recommend either:
- Pausing payouts temporarily
- Waiting until your most recent batch of payouts is complete 

We obtain information from PayPal by listening for webhooks associated with your 
PayPal account. If you change to a different account, then SaaSquatch will no longer authorize or process any webhooks from PayPal that are linked to the previous account. This means that the status of rewards in progress won’t be recorded or updated in SaaSquatch.

### Required participant information
Cash payouts integrate with your widgets and microsites, making them easy for your participants to use. All your participants need to do is enter their PayPal email into your company’s [verified access](/topics/widget-types/#verified-access-widgets) program widget or microsite. We store the email address they provide as a custom field called `paypalEmail` that can be viewed on the participant’s profile. 

If participants don’t provide their PayPal information to SaaSquatch, then their rewards will remain unredeemed and you’ll need to pay them out manually. We recommend communicating to your participants that they need to provide their PayPal email address to receive rewards.

## Cash payouts functionalities

### Scheduled payout dates
Automated cash payouts occur at regular intervals that you define as part of the setup process. The redemption interval can be set to days, weeks, or months. For monthly redemption, you can choose between payouts on the first or last day of the month, or a custom date in between.

We use the time zone settings for your tenant to determine when you’ve arrived at your next payout date. On your scheduled date, we  submit your payout batches to PayPal, and PayPal attempts to make the payments. The specific time of day can vary. 

### Payout batches
On your scheduled payout date, SaaSquatch will initiate a payout to any participants with a PayPal email that have accrued eligible rewards. 

We group all of the individual payout items into currency-specific batches of up to 500 payout items so that they’re easier for you to track. For example, if your participants are being rewarded in USD, GBP, and CAD, then we submit separate batches for each currency to PayPal. You can view all of the batches we submitted in the Admin Portal by going to the Payout History section of the PayPal integration dashboard. 

The overall payout for your scheduled payout date is limited to 15,000 payout items across all batches. If there are more than 15,000 items, then the ones remaining will be postponed until the next payout date.  

> __Note:__ Each reward a participant earns is added to the batch as a separate payout item. If participants earn multiple rewards during a payout period, then each reward is submitted separately to PayPal and is subject to their transaction fee policy.

## U.S. W-9 tax compliance for cash payouts
Participants residing in the U.S. are required by law to report their earnings if their annual rewards total more than $600. We’ve implemented a W-9 compliance feature that you can enable for your account to help—see [W-9 Compliance](/features/w-9-compliance/) for general information and setup instructions. 