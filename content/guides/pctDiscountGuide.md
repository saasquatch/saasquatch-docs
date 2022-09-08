---
title: "Percent Discount Integration Guide"
highlights: "Give your users 10% for a year for referring a friend. Follow this guide to setup a 'Give 10%, Get 10% Referral Program' using the SaaSquatch REST API and Squatch.js"
slug: guides/percent-discount
sectionType: guide
template: article.html
date: '2019-11-18'
---
<div class="well pull-right span3">
    Alternatively to the API, you can create this type of program using the <a href="/developer/stripe">Stripe</a>, <a href="/developer/recurly">Recurly</a>, <a href="/developer/braintree">Braintree</a> or <a href="/developer/zuora">Zuora</a> connectors.
</div>

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

<h5 data-toggle="collapse" data-target=".install-step2">Connect the REST API at signup</h5>
<div class="install-step2 collapse">
    <p>When new friends click through on a referral link and signup. You're in charge of making sure that any discount is applied on their first bill.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Add a hidden input to your checkout page</label></li>
        <li><label class="checkbox"><input type="checkbox"> Use <a href="/squatchjs#autofill">squatch.js autofill</a> to read the tracking cookie and set the active referral code in your form</label></li>
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#get_coupon">Validate the referral code</a> to ensure the discount is valid</label></li>
        <li><label class="checkbox"><input type="checkbox"> Apply a discount or credit to the first bill</label></li>
        <li><label class="checkbox"><input type="checkbox"> Use <a href="/api/methods#account_sync">accountsync REST endpoint</a> to update SaaSquatch about the new account</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Click a referral link and signup for a new account. <a href="https://app.referralsaasquatch.com/">Login</a> to your SaaSquatch account
            to see the new referral in the news feed.
        </label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step3">Connect the REST API during billing runs</h5>
<div class="install-step3 collapse">
    <p>Referral credit can increase and decrease as people refer more friends, so make sure you lookup referral information during bill runs.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#get_account_reward">Lookup an accounts' reward</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> Apply a discount or credit to the invoice</label></li>
        <li><label class="checkbox"><input type="checkbox"> Use <a href="/squatchjs#autofill">squatch.js autofill</a> to read the tracking cookie and set the active referral code in your form</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Run a billing run, 
            make sure that a user gets a discount that matches what's in <a href="https://app.referralsaasquatch.com/">your SaaSquatch account</a>
        </label></li>
    </ul>
</div>


<h5 data-toggle="collapse" data-target=".install-step4">Connect the REST API for upgrades, downgrades and cancels</h5>
<div class="install-step4 collapse">
    <p>When someone upgrades or downgrades, you might need to look up referral information again. Make sure you send us the <b>new</b> state of an account anytime it changes.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Use the <a href="/api/methods#account_sync">accountsync REST endpoint</a> to update SaaSquatch about upgrades, downgrades or cancels</label></li>
        <li><label class="checkbox"><input type="checkbox"> <a href="/api/methods#get_account_reward">Lookup an account's reward</a> if you need to apply any proration during upgrades or downgrades</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Cancel an account that was previously referred. <a href="https://app.referralsaasquatch.com/">Login</a> to 
            your SaaSquatch account to verify that referral credit was properly adjusted.
        </label></li>
    </ul>
</div>

</div>



<hr/>
<div>
    <b>Test mode vs. live mode</b> - We let you test your referral program using a test account and before deploying to your production environment. You will not be charged for any users or referrals 
    made using your test account.
</div>

<hr/>
<h3>How to use the REST API at signup</h3>

<p>When new friends click through on a referral link and signup. You're in charge of making sure that any discount is applied on their first bill.</p>

<h5>Validate the discount</h5>
<p>To get the coupon/referral code value from the tracking cookie, use the <a href="/squatchjs#autofill">squatch.js autofill</a> function and include the value during payment submission. Use the <a href="/api/methods#get_account_reward">Get Account Reward</a> method to look up the discount percentage for the new paying user. If a <code>couponCode</code> doesn't exist or is invalid, we will return an HTTP 404 status.</p>

<p>Looking up discount value does not change the state of an account, so you can also use this call to update the price of plans on the payment page. For example, 
  using the example response below, you could include a message on your checkout page that says "You’ve got 20% off, 10% off from being referred, and 10% off from referring one of your friends"</p>

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/account/{ACCOUNTID}/reward?couponCode={CODE} \
-u {API_KEY}: \
-H "Content-Type: application/json"</code></pre></td>
            <td><pre><code>{
    "accountId":"SV0TYE5OWI11120144",
    "discountPercentage":20,
    "referrerDiscountPercent":10,
    "referredDiscountPercent":10
}</code></pre></td>
        </tr>
    </tbody>
</table>


<h5>Apply the Discount</h5>

<p>You can use any method to apply the discount, but we recommend line items so that your customers can clearly see the referral discount on their 
invoices. When you create your first invoice, create an invoice line item for the discount.</p>

<h5>Notify SaaSquatch of the new account</h5>

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
    },
    "referral": {
        "code": "3j033r"
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
        "code": "3j033r"
    }
}</code></pre></td>
        </tr>
    </tbody>
</table>

<hr />
<h3>How to use the REST API during billing runs</h3>

<p>Referral credit can increase and decrease as people refer more friends, so make sure to lookup the latest referral information during bill runs.</p>
        
<h5>Lookup referral credit</h5>

<p>Use the <a href="/api/methods#get_account_reward">Get Account Reward</a> to look up the discount percentage. 
   You don't need to set <code>coupon_code</code> every time you make this call, you only need to do this during first signup and we'll 
   keep track of it from then on.
</p>

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/account/{ACCOUNTID}/reward \
-u {API_KEY}: \
-H "Content-Type: application/json"
</code></pre></td>
            <td><pre><code>{
    "accountId":"SV0TYE5OWI11120144",
    "discountPercentage":20,
    "referrerDiscountPercent":10,
    "referredDiscountPercent":10
}</code></pre></td>
        </tr>
    </tbody>
</table>

<h5>Apply the Discount</h5>

<p>Whenever an invoice is created for your customers, make sure that you're applying the referral discount. As previously described for new signups, you can use
any method to apply the discount, but we recommend invoice line items so that your customers can clearly see the referral discount on their invoices.</p>


<hr/>

<h3>How to use the REST API for upgrades, downgrades and cancels</h3>

<p>When someone upgrades or downgrades, you might need to look up referral information again. Make sure to send us the new state of an account anytime it changes.</p>

<h5>Notify SaaSquatch of the account change</h5>

<p>When someone cancels, notify SaaSquatch of the change so we can automatically reduce the referral discount for the person that referred them.</p>

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
        <span class="nocode"><strong>"status": "CANCELLED",</strong></span>
        "value": 99.99,
        "billingIntervalType": "DAY",
        "billingIntervalValue": 30
    },
    "referral": {
        "code": "3j033r"
    }
}'</code></pre></td>
            <td><pre><code>{
    "id": "SV0TYE5OWI11120144",
    "currency": "USD",
    "subscription": {
        <span class="nocode"><strong>"status": "CANCELLED",</strong></span>
        "value": 99.99,
        "billingIntervalType": "DAY",
        "billingIntervalValue": 30
    },
    "referral": {
        "code": "3j033r"
    }
}</code></pre></td>
        </tr>
    </tbody>
</table>