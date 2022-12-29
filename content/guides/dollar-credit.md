---
title: Dollar Credit
highlights: Follow this guide to setup a "Give $20, Get $20 Referral Program" using the SaaSquatch REST API and Squatch.js
slug: guides/dollar-credit
sectionType: guide
template: article.html
date: '2019-11-18'
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

<h5 data-toggle="collapse" data-target=".install-step2">Apply credit at checkout</h5>
<div class="install-step2 collapse">
    <p>When someone makes a purchase, you're in charge of making sure that credit is properly applied on their bill.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Make sure a user has been identified to Squatch.js before checkout</label></li>
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#list_balances">Lookup remaining referral credit</a> during checkout</label></li>
        <li><label class="checkbox"><input type="checkbox"> Apply referral credit to their order</label></li>
        <li><label class="checkbox"><input type="checkbox"> Mark credit as redeemed by <a href="/api/methods#debit_balance">debiting the account's balance</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#account_sync">Update the account status</a> for new accounts</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click a referral link and make your first purchase. Your credit should have been applied. <a href="https://app.referralsaasquatch.com/">Login</a> to your SaaSquatch account
            to see the new referral in the news feed.
        </label></li>
    </ul>
</div>

</div>

<hr/>
<h3>How to use the REST API at checkout</h3>

<p>When your customers checkout, use the SaaSquatch API to lookup referral credit, apply the credit internally and then update SaaSquatch with the new account balance.</p>

<h5>Step 1 - Lookup referral credit</h5>
<p>When a new user creates an account in your app, make sure they get identified in a call to <a href="/squatchjs#init">squatch.js init</a>. This will complete the referral tracking by SaaSquatch to automatically link them to the account that referred them and give them a credit off their first order.</p>

<p>Lookup credits by checking the <a href="/api/methods#list_balances">balance on an account</a>. This will include both credit from being referred, and from referring friends. 
It is possible to explore the individual credits that have been earned by an account (see <a href="/api/methods#list_rewards">List Rewards</a>), but for most cases it is simpler during checkout to just lookup the full reward balance.</p>

<p>Looking up the credit value does not change the state of an account, so you can also use this call to update the price of plans on the checkout page. For example, 
  using the example response below, you could include a message on your checkout page that says "You have $20 of referral credit"</p>

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
        "totalAssignedCredit": 2000,
        "totalRedeemedCredit" : 0,
        "unit": "cents"
    }
]</code></pre></td>
        </tr>
    </tbody>
</table>

<h5>Step 2 - Apply the Credit Internally</h5>

<p>You can use any method to apply the credit, but we recommend line items so that your customers can clearly see the referral credit on their 
invoices. Add a line item to the invoice for the discount or use an internal code to identify the referral credit.</p>


<h5>Step 3 - Mark credit as used</h5>

<p>Update the accounts' balance in SaaSquatch once credit has been used. This lets SaaSquatch display a users' up-to-date account balance and lets us track referral credit usage.

Use the <a href="/api/methods#debit_balance">Debit Account Balance</a> endpoint to mark the credit as used.</p>

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
    "amount" : 2000, 
    "unit" : "cents"
}'
</code></pre></td>
            <td><pre><code>{
    "creditRedeemed": 2000,
    "creditAvailable": 0,
    "unit": "cents"
}</code></pre></td>
        </tr>
    </tbody>
</table>


<h5>Step 4 - Notify SaaSquatch of the new account status</h5>

<p>If this is the first purchase that a customer has made, use this API call to notify SaaSquatch about the new account status. In particular, make sure to set <code>status: PAID</code>. You should update this status for all accounts. If a valid referral has been made and someone has paid their first bill. Then SaaSquatch will automatically add a referral credit into the account of the friend that referred them.</p>

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
        "value": 99.99,
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