---
title: Points Integration Guide
highlights: Follow this guide to setup a "Give 50, Get 50 Points Referral Program" using the SaaSquatch REST API and Squatch.js
slug: guides/point-reward
template: guides.html
---

<div class="install-guide-checklist">
    
<h5 data-toggle="collapse" data-target=".install-step1">Install squatch.js</h5>
<div class="install-step1 collapse in">
    <p><a href="/app-integration">squatch.js</a> will show a gorgeously rendered popup in your app so your customers can seamlessly refer their friends.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Install <a href="/app-integration">squatch.js</a> on your page</label></li>
        <li><label class="checkbox"><input type="checkbox"> Replace the <a href="/squatchjs#init">init</a> variables with real user data</label></li>
        <li><label class="checkbox"><input type="checkbox"> Add a button to your page with <code>class="squatchpop"</code></label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click the button. Make sure the popup shows. (Make sure you are using the right <code>account_id</code> and <code>user_id</code>)</label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step2">Track Conversions</h5>
<div class="install-step2 collapse">
    <p>When a referred user converts, typically to paid, notify Referral SaaSquatch so their rewards can be distributed.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#account_sync">Update the account status</a> for new paid accounts</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click a referral link and make your first purchase.<a href="https://app.referralsaasquatch.com/">Login</a> to your SaaSquatch account to check if reward points are being distributed.
    </ul>
</div>


<h5 data-toggle="collapse" data-target=".install-step3">Redeem points</h5>
<div class="install-step3 collapse">
    <p>When someone wants to redeem their points, adjust their point balance and give them their reward.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Make sure a user has been identified to Squatch.js before they redeem points</label></li>
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#list_balances">Lookup remaining points balance</a> on the points redemption page</label></li>
        <li><label class="checkbox"><input type="checkbox"> Mark points as redeemed by <a href="/api/methods#debit_balance">debiting the account's point balance</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span>Refer a new user who converts, then redeem points on the points redemption page. Your should have been adjusted properly. <a href="https://app.referralsaasquatch.com/">Login</a> to your SaaSquatch account
            to see the new referral in the news feed.
        </label></li>
    </ul>
</div>
</div>

<hr/>
<h3>How to use the REST API to track conversions</h3>

<h5>Step 1 - Notify SaaSquatch of the new account status</h5>

<p>If this is the first purchase that a customer has made, use this API call to notify SaaSquatch about the new account status. In particular, make sure to set <code>status: PAID</code>. You should update this status for all accounts. If a valid referral has been made, and someone has paid their first bill, then SaaSquatch will automatically add points to the account of the friend that referred them.</p>

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

<hr/>
<h3>How to redeem points</h3>

<h5>Step 1 - Lookup points balance</h5>

<p>Lookup a users' points balance by checking the <a href="/api/methods#list_balances">balance of an account</a>. This will include both points from being referred and points from referring friends. 
It is possible to explore the individual points that has been earned by an account (see <a href="/api/methods#list_rewards">List Rewards</a>), but for most cases it is simpler to just lookup the full reward balance.</p>

<p>Looking up the points balance does not change the state of an account, so you can also use this call to display a users' point balance on any page. For example, 
  using the example response below, you could include a message in your app head "You've earned 50 points. Make more referrals to earn more."</p>

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
        "totalAssignedCredit": 50,
        "totalRedeemedCredit" : 0,
        "unit": "points"
    }
]</code></pre></td>
        </tr>
    </tbody>
</table>

<h5>Step 2 - Fulfill Reward </h5>

<p>You are responsible for fulfilling the reward you offer through your referral program. </p>


<h5>Step 3 - Redeem Points with Referral SaaSquatch</h5>

<p>Update the accounts' balance in SaaSquatch once points have been used. This lets SaaSquatch display a users' up-to-date point balance and lets us track points usage.

Use the <a href="/api/methods#debit_balance">Debit Account Balance</a> endpoint to mark the points as used.</p>

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
    "amount" : 20, 
    "unit" : "points"
}'
</code></pre></td>
            <td><pre><code>{
    "creditRedeemed": 20,
    "creditAvailable": 0,
    "unit": "points"
}</code></pre></td>
        </tr>
    </tbody>
</table>