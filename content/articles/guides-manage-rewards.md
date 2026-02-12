---
title: Managing Existing Rewards
highlights: "How to manage a participant's existing rewards through the SaaSquatch Portal."
slug: guides/manage-rewards
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-06-28
---

## Overview
In the Admin Portal, you can manually redeem available rewards on behalf of a participant and, in some cases, cancel rewards they've earned.   

Rewards are stored at the account level in the SaaSquatch system. This means that if there are multiple users in the same account, they will share a pool of rewards. In other words, redeeming or cancelling a reward from one user in a shared account's profile will apply to the balance for everyone in the account. 

> More information about the implications of this type of program configuration can be found in our [Shared vs. Solo Accounts](/shared-vs-solo-accounts) article.

## Redeem rewards
Rewards in a participant's account can be marked as redeemed through the SaaSquatch portal, through [Bulk Reward Redemption](/guides/bulk-reward-redemption/), and through the [REST API](/api/methods/#debit_balance). Marking a reward as redeemed indicates to the SaaSquatch system that the reward has been fulfilled and should no longer be part of the account's available reward balance.

To **redeem a reward** through the SaaSquatch portal:

1. In the Admin Portal, go to the __Participants__ page.
2. Find the participant you want to redeem a reward for.
3. Select the participant's name to open their participant profile.
4. From the *Rewards List*, select the three-dot menu to the to the right of the reward you want to redeem.
5. Select __Redeem Reward__.
6. Enter the amount of the reward that you would like to redeem. You can redeem part or all of the available reward.
7. Select __Redeem__.

## Cancel rewards
In alignment with our event retention policy, reward retraction and refunds will only be possible if the reward you want to retract/refund is based on an event *less than two years old*. Because retractions/refunds require the original event, they can't be processed using the copy of the event that remains in long-term storage.  However, you can continue to access historical data by running an [event export report](/running-programs/creating-an-event-export-report).

### Canceling a previously redeemed reward
>  **Important:** Rewards that have already been redeemed from a SaaSquatch account **cannot** be canceled. 

This can be especially important to programs configured to automatically redeem rewards from an account (*e.g.* through a gift card integration, payment provider integration, or an automated API integration you have configured). 

<span class="label">Classic only</span> The ability to manually approve rewards can be acomplished using our referral program Security Management System by setting all incoming referrals to [default to pending](/developer/referral-security/#default-status).

### Canceling an unredeemed reward

1. In the Admin Portal, go to the __Participants__ page.
2. Find the participant you want to redeem a reward for.
3. Select the participant's name to open their participant profile.
4. From the *Rewards List*, select the three-dot menu to the to the right of the reward you want to redeem.
5. Select __Cancel Reward__.
6. Confirm that you want to cancel the reward.

## Manage pending rewards
Rewards are usually shown as pending only when a pending period was set up during reward configuration. Rewards subject to a pending period automatically become available when the pending period is over.

For clients using our W-9 Compliance feature, rewards may also be put in a pending state due to their tax implications. Rewards that are pending because of W-9 compliance are only be made available after the participant is marked as having submitted a W-9 tax form. 

For more information, read our article on [W-9 Compliance](/features/w-9-compliance) and [Managing W-9 Tax Compliance for Participants](/features/managing-w-9-compliance-for-participants).
