---
title: Cash Payouts Reward Statuses
highlights: Learn about the PayPal cash payout fulfillment lifecycle and how we assign payout statuses to individual rewards.
slug: integrations/paypal/reward-statuses
sectionType: successArticle
template: hasTableOfContents.html
date: 2022-11-30
robotsTag:
  - FOLLOW
---

SaaSquatch’s integration with PayPal lets you reward referral program participants who live in [eligible countries](https://developer.paypal.com/docs/payouts/standard/reference/country-feature/) with cash in [any currency supported by PayPal](https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/). For more information about cash payouts, check out our [feature overview](/integrations/paypal/cash-payouts) or our [setup instructions](/integrations/paypal/setting-up-cash-payouts). 

## Fulfillment lifecycle
When a participant earns a reward that’s eligible for a cash payout, their reward is added to a currency-specific batch. Each batch can contain up to 500 payout items. For each payout date, we can send a maximum of 15,000 payout items to PayPal, across all batches.

On the scheduled payout date, each batch is sent to PayPal for processing. PayPal will then attempt to pay out each item. Based on the information SaaSquatch receives from PayPal’s webhooks, we will update the status of each reward in the Admin Portal to show whether it was successfully redeemed. 

![Cash payout reward fulfillment cycle](/assets/images/contentful/Screenshot_20221115_181922_743qGLTnadmXr2Sx3i8UIz.png)

__Example:__ Your cash payouts are scheduled for the 15th of each month. This month, your participants have earned rewards in three currencies: GBP, CAD and USD. 

On the 15th, we will send a separate payout batch to PayPal for each of the reward currencies. PayPal will process the batches and send us webhooks with a reward status for each item. We use this reward status information to update what you see in three places:
- On the participant’s profile in the Admin Portal
- In the Reward Details report
- In the Payout History section of the PayPal integration dashboard

## Reward statuses
PayPal has several different [statuses](https://developer.paypal.com/docs/payouts/standard/reference/payment-processing/) that can apply for a payout item: success, pending, unclaimed, on hold, refunded, returned, denied, blocked, or failed.  SaaSquatch gets information about the PayPal status of each individual payout item from PayPal’s webhooks.  Most statuses don’t require client action, but a few do, as shown below.

<table class="table table-hover">
  <tr>
    <th>PayPal Status</th>
    <th>Meaning</th>
    <th>Required action</th>
  </tr>
  <tr>
    <td>Success</td>
    <td>Reward was successfully paid out by PayPal and marked as redeemed in SaaSquatch.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Pending</td>
    <td>PayPal is currently processing this item</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Unclaimed</td>
    <td>The participant provided an email address that doesn’t map to an existing PayPal account, or PayPal paid this item out to an account that does not exist.</td>
    <td>The participant will need to register with PayPal using the email address they originally supplied and then accept the transfer. PayPal will send them an email notifying them of the available balance.</td>
  </tr>
  <tr>
    <td>On hold</td>
    <td>This payment is on hold by PayPal. The hold may have been initiated by either PayPal or the client.</td>
    <td>Wait, or investigate why the payment is on hold and fix.</td>
  </tr>
  <tr>
    <td>Refunded</td>
    <td>The payout item was refunded.</td>
    <td>Check with PayPal for details. Payout refunds are typically initiated by clients.</td>
  </tr>
  <tr>
    <td>Returned</td>
    <td>This payout was returned because it was unclaimed for more than 30 days.</td>
    <td>Contact the participant to confirm their PayPal information and investigate why they did not claim the reward. </td>
  </tr>
  <tr>
    <td>Denied</td>
    <td>PayPal denied the payout because the action is not supported for this user (for example, sending money to a person in a country that PayPal doesn’t service).</td>
    <td>Check with PayPal to understand the reason the payout was denied.</td>
  </tr>
  <tr>
    <td>Blocked</td>
    <td>This payout was blocked by PayPal</td>
    <td>Check with PayPal to understand the reason for the block. </td>
  </tr>
  <tr>
    <td>Failed</td>
    <td>The reward failed to be paid out.</td>
    <td>No client action required. <br>

We will retry the reward once per day for three days. If the payout still isn’t successful, then we’ll try again during your next scheduled payout.</br></td>
  </tr>
</table>