---
title: Free Time Integration Guide
highlights: Follow this guide to setup a "Give 1 Month, Get 1 Month Referral Program" using the SaaSquatch REST API and Squatch.js
slug: guides/time-reward
sectionType: guide
template: hasTableOfContents.html
---

<div class="install-guide-checklist">

<h5 data-toggle="collapse" data-target=".install-step1">Install squatch.js</h5>

<div class="install-step1 collapse in">

[squatch.js](/app-integration) will show a gorgeously rendered popup in your app so your customers can seamlessly refer their friends.

*   <label class="checkbox"><input type="checkbox"> Install [squatch.js](/app-integration) on your page</label>
*   <label class="checkbox"><input type="checkbox"> Replace the [init](/squatchjs#init) variables with real user data</label>
*   <label class="checkbox"><input type="checkbox"> Add a button to your page with `class="squatchpop"`</label>
*   <label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click the button. Make sure the popup shows. (Make sure you are using the right `account_id` and `user_id`)</label>

</div>

<h5 data-toggle="collapse" data-target=".install-step2">Track Conversions</h5>

<div class="install-step2 collapse">

When a referred user converts, typically to paid, notify Referral SaaSquatch so their rewards can be distributed.

*   <label class="checkbox"><input type="checkbox"> [Update the account status](/api/methods#account_sync) for new paid accounts</label>
*   <label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click a referral link and make your first purchase. [Login](https://app.referralsaasquatch.com/) to your SaaSquatch account to check if Free Time rewards are being distributed.</label>

</div>

<h5 data-toggle="collapse" data-target=".install-step3">Redeem Time</h5>

<div class="install-step3 collapse">

When someone wants to redeem their Free Time, adjust their Free Time balance and give them their reward.

*   <label class="checkbox"><input type="checkbox"> Make sure a user has been identified to Squatch.js before they redeem their Free Time</label>
*   <label class="checkbox"><input type="checkbox"> [Lookup remaining Free Time balance](/api/methods#list_balances) on the Free Time redemption page</label>
*   <label class="checkbox"><input type="checkbox"> Mark Free Time as redeemed by [debiting the account's Free Time balance](/api/methods#debit_balance)</label>
*   <label class="checkbox"><input type="checkbox"> <span class="label">Testing</span>Refer a new user who converts, then redeem Free Time on the Free Time redemption page. Your should have been adjusted properly. [Login](https://app.referralsaasquatch.com/) to your SaaSquatch account to see the new referral in the news feed.</label>

</div>

</div>

* * *

### How to use the REST API to track conversions

##### Step 1 - Notify SaaSquatch of the new account status

If this is the first purchase that a customer has made, use this API call to notify SaaSquatch about the new account status. In particular, make sure to set `status: PAID`. You should update this status for all accounts. If a valid referral has been made, and someone has paid their first bill, then SaaSquatch will automatically add Free Time to the account of the friend that referred them.

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl https://app.referralsaasquatch.com/api/v1/TENANT_ALIAS/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{ "id": "SV0TYE5OWI11120144",
  "currency": "USD",
  "subscription": {
    "status": "PAID", 
    "value": 99.99,
    "billingIntervalType": "DAY",
    "billingIntervalValue": 30
  }
}'</code></pre></td>
                    <td><pre><code>{
  "id": "SV0TYE5OWI11120144",
  "currency": "USD",
  "subscription": {
    "status": "PAID", 
    "value"": 99.99,
    "billingIntervalType": "DAY",
    "billingIntervalValue": 30
  },
  "referral": {
    "code": "BOBTESTERSON"
  }
}</code></pre></td>
        </tr>
    </tbody>
</table>

* * *

### How to redeem Free Time

##### Step 1 - Lookup Free Time balance

Lookup a users' Free Time balance by checking the [balance of an account](/api/methods#list_balances). This will include both Free Time from being referred and referring others. It is possible to explore the individual Free Time Rewards that has been earned by an account (see [List Rewards](/api/methods#list_rewards)), but for most cases it is simpler to just lookup the full reward balance.

Looking up the Free Time Reward balance does not change the state of an account, so you can also use this call to display a users' Free Time balance on any page. For example, using the example response below, you could include a message in your app head "You've earned 1 Free Month. Make more referrals to earn more."

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/reward/balance?accountId=SV0TYE5OWI11120144 \
-u API_KEY: \
-H "Content-Type: application/json"</code></pre></td>
            <td><pre><code>[
    {
        "type": "CREDIT",
        "count": 1,
        "totalAssignedCredit":1,
        "totalRedeemedCredit" : 0,
        "unit": "months"
    }
]</code></pre></td>
        </tr>
    </tbody>
</table>

##### Step 2 - Fulfill Reward

You are responsible for fulfilling the rewards for your users.

##### Step 3 - Redeem Free Time with Referral SaaSquatch

Update the accounts' balance in SaaSquatch once Free Time have been used. This lets SaaSquatch display a users' up-to-date Free Time balance and lets us track Free Time usage. Use the [Debit Account Balance](/api/methods#debit_balance) endpoint to mark the Free Time as used.

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl https://app.referralsaasquatch.com/api/v1/TENANT_ALIAS/credit/bulkredeem \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "accountId" : "SV0TYE5OWI11120144",
    "amount" : 1, 
    "unit" : "months"
}'
</code></pre></td>
            <td><pre><code>{
    "creditRedeemed": 1,
    "creditAvailable": 0,
    "unit": "months"
}</code></pre></td>
        </tr>
    </tbody>
</table>