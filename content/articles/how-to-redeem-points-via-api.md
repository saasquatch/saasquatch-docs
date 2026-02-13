---
title: How To Redeem Points via API
highlights: "This article will provide a step-by-step for redeeming a user's points balance via our REST API platform."
slug: how-to-redeem-points-via-api
sectionType: successArticle
template: hasTableOfContents.html
date: 2021-03-17
tags:
  - Guide
---

### Points Balance Overview
As your user's perform qualifying actions they will receive points based on the program logic of your SaaSquatch program. These points are calculated and stored for each individual but can be checked and redeemed at the account level as well. For more information on how our account/user structure works, please review our page about [Shared vs. Solo Accounts](/shared-vs-solo-accounts/ "Shared vs. Solo Accounts Doc") page.

### Recommended Points Redemption Flow
To ensure a user has the required amount of points for the planned redemption, it is recommended that a balance check for the user is performed first. If redemption is performed automatically when a user's balance reaches the threshold, it is possible to use the reward.created webhook, otherwise use the List Reward Balances API call to obtain the user's available balance.

1. Check the user's balance by either listening for the [reward.created](/api/webhooks/#reward-created) webhook or sending the [List Reward Balances](/api/methods#list_balances) API Call. For implementations with multiple rewards, be sure to look at the object that has `POINT` as the unit.

2. Once confirmed, send a [Debit Reward Balance](/api/methods#debit_balance) API call to SaaSquatch.

3. Check the response to confirm that the user's balance was successfully debited and show the user their new balance.

### Sample Use Cases
#### Redeem Points During Checkout
This sample flow is designed for a user to view their points balance during check out and request a certain amount be redeemed for a discount on their purchase. This implementation uses a user's email address for their account and user ID fields.

1. When the user begins the checkout process, make a [List Reward Balances](/api/methods#list_balances) call to get their points balance:
```
curl -X GET https://app.referralsaasquatch.com/api/v1/test_addjgg0gz6q0c/reward/balance?accountId=bob%40example.com&userId=bob%40example.com
  -u :API_KEY 
```

2. When the response is received, subtract the `totalRedeemedCredit` from the `totalAssignedCredit` to see how many points a user has available. For this example, the user has 580 points available (1080 - 500):
```json
{
"type": "CREDIT",
"unit": "POINT",
"count": 5,
"totalPendingCredit": 0,
"totalAssignedCredit": 1080,
"totalRedeemedCredit": 500,
"totalExpiredCredit": 0,
"totalCancelledCredit": 0
}
```

3. Show the balance available to the user during their checkout flow and confirm how much they would like to use for their transaction. We recommend adding logic that prevents the user from attempting to deduct more points than they have on hand. 

4. Once the order has completed, deduct the amount of points using the [Debit Reward Balance](/api/methods#debit_balance):
```
curl -X POST https://app.referralsaasquatch.com/api/v1/test_addjgg0gz6q0c/credit/bulkredeem 
  -u :API_KEY 
  -H "Content-Type: application/json" 
  -d '{
  "accountId": "bob@example.com",
  "userId": "bob@example.com",
  "unit": "POINT",
  "amount": 200
}'
```

5. Listen for the response to confirm that the balance was debited. 
```
{
    "creditRedeemed": 200,
    "creditAvailable": 380,
    "unit": "POINT"
}
```

#### Automated Redemption
This sample flow is designed to automatically issue a reward when a user earns a certain number of rewards. For this example, a reward is issued via a third-party when a user earns 400 points.

1. Listen for a `reward.created` webhook to confirm a user's balance was updated.
```
{
  "assignedCredit": 30,
  "type": "CREDIT",
  "userId": "bob@example.com",
  "accountId": "bob@example.com",
  "unit": "POINT",
  "dateCreated": 1615542997808,
  "id": "604b3ad58a45b70017888268",
  "dateGiven": 1615542997808,
  "globalRewardKey": "pointsReward,
  "programId": "points-loyalty"
}
```

2. Check the user's balance using the [List Reward Balances](/api/methods#list_balances):
```
curl -X GET https://app.referralsaasquatch.com/api/v1/test_addjgg0gz6q0c/reward/balance?accountId=bob%40example.com&userId=bob%40example.com
  -u :API_KEY 
```

3. When the response is received, subtract the `totalRedeemedCredit` from the `totalAssignedCredit` to see how many points a user has available. For this example, the user has 415 points available (1215 - 800):
```json
{
"type": "CREDIT",
"unit": "POINT",
"count": 8,
"totalPendingCredit": 0,
"totalAssignedCredit": 1215,
"totalRedeemedCredit": 800,
"totalExpiredCredit": 0,
"totalCancelledCredit": 0
}
```

4. Once the user's balance has been confirmed and they're eligible, deduct the amount of points using the [Debit Reward Balance](/api/methods#debit_balance):
```
curl -X POST https://app.referralsaasquatch.com/api/v1/test_addjgg0gz6q0c/credit/bulkredeem 
  -u :API_KEY 
  -H "Content-Type: application/json" 
  -d '{
  "accountId": "bob@example.com",
  "userId": "bob@example.com",
  "unit": "POINT",
  "amount": 400
}'
```

5. Listen for the response to confirm that the balance was debited. 
```
{
    "creditRedeemed": 400,
    "creditAvailable": 15,
    "unit": "POINT"
}
```
