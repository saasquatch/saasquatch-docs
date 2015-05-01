---
title: Percent Discount Integration Guide (No JS)
highlights: |
    Give your users 10% off their bill for a year for referring a friend. Follow this guide to setup a 'Give 10%, Get 10% Referral Program' using only the SaaSquatch REST API and no javascript. 
    Most companies will use [Squatch.js](/guides/percent-discount/) but this provides an example of implementing when javascript is either not desired or
    can't be used.
slug: guides/percent-discount-nojs
template: guides.html
---



<br />
**Please note:** *This integration is meant for non standard payment system integrations or programs that require more flexibility. Please review our easier integration option [Percent Discount Integration Guide with Squatch.js and the referral wdiget](/guides/percent-discount/) *

### Integration Overview ###

<div class="install-guide-checklist">
    
<h5 data-toggle="collapse" data-target=".install-step1">1. Identify the user</h5>
<div class="install-step1 collapse in">
    <p>After users log into your app, we identify the users so we can enroll them into the referral program.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Create an account using the <a href="/api/methods/#account_sync">Update an Account API call</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> Create a user using the <a href="/api/methods/#create_user">Create or Update a User API call</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Validate that the created user exists by looking up the user through the <a href="/api/methods/#get_user">Lookup a User API call</a></label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step2">2. Engage the user and help them make a referral</h5>
<div class="install-step2 collapse">
    <p>Users can refer their friends by sharing their unique sharelink and/or referral code among their friends.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Use the <a href="/api/methods/#get_sharelinks">Get sharelinks API call</a> to obtain the user's share link. </label></li>
        <li><label class="checkbox"><input type="checkbox"> Use the <a href="/api/methods/#get_user">Get User Info API call</a> to retrieve the user’s referral code. </label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step3">3. Attribute the newly registered user back to the user who made the referral</h5>
<div class="install-step3 collapse">
    <p>Identify the newly registered user and use the referral code to link them to the user that made the referral.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Create an account for the referred user using the <a href="/api/methods/#account_sync">Update an Account API call</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> Create a user for the referred user using the <a href="/api/methods/#create_user">Create or Update a User API call</a></label></li>
          <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Validate that referral was created using the <a href="/api/methods/#list_referrals">List Referrals call</a></label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step4">4. Convert the referred user when they sign up for a PAID subscription</h5>
<div class="install-step4 collapse">
    <p>Inform SaaSquatch when the referred user upgrades from a ```TRIAL``` to a ```PAID``` subscription.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> The referred user wants to upgrade to a ```PAID``` subscription. Use the <a href="/api/methods/#list_balances">List reward balances API call</a> to receive the correct referral discount</label></li>
        <li><label class="checkbox"><input type="checkbox"> After the payment has been processed, inform SaaSquatch about the account upgrade from ```TRIAL``` to ```PAID``` by using the <a href="/api/methods/#account_sync">Update an Account API call</a></li>
          <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Validate that the referral was converted using the <a href="/api/methods/#list_referrals">List Referrals call</a> to check for the new referrer reward</label></li>
    </ul>
</div>

<h5 data-toggle="collapse" data-target=".install-step5">5. Fulfill the earned reward for the referrer</h5>
<div class="install-step5 collapse">
    <p>Both users deserve a reward for the successful referral. The referred user already received their initial discount in the previous step. Next alter the invoice for the referred user for each billing cycle as long as the referred user is on a ```PAID``` subscription.</p>
    <ul class="unstyled">
        <li><label class="checkbox"><input type="checkbox"> Lookup the referral discount that each user deserves before each billing run by using the <a href="api/methods/#list_balances">List Reward balances API call</a></label></li>
        <li><label class="checkbox"><input type="checkbox"> Deduct the user's bill with the ```PCT_DISCOUNT``` that was returned in the previous step</label></li>
        <li><label class="checkbox"><input type="checkbox"> <span class="label">Testing</span> Review the generated invoice to make sure that the referral discount is correct and visible on the invoice.</label></li>
    </ul>
</div>

</div>

### Integration path ###
This section provides additional info and examples on each of 5 steps laid out above.

#### Identify the user ####

Users that log into your website should be identified to SaaSquatch so they can be enrolled in the referral program.  Every user needs to belong to an [account](/shared-vs-solo-accounts), so we start by creating one using the [Create or Update Account API call](/api/methods/#account_sync).

For this example the account that we're creating is for an active subscriber paying $99/mo. In this example, we're showing [solo accounts](/shared-vs-solo-accounts), so the account and user both share the same unique id `"abc123"` used in these calls. In the real world, those IDs would come from your user database.

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Create Account</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{   
    "id": "abc123",
    "subscription": {
        "status": "PAID",
        "value": 99.99,
        "billingIntervalType": "DAY"
        "billingIntervalValue": 30
    }
}'</code></pre></td>
            <td><pre><code>{
    "id": "abc123",
    "subscription": {
        "status": "PAID",
        "value": 99.99,
        "billingIntervalType": "DAY",
        "billingIntervalValue": 30
    }
}</code></pre></td>
        </tr>
    </tbody>
</table>

This call creates a new account or updates an existing one, so it's safe to run multiple times. Now that account `"abc123"` has been created, we can create a user in that account using the [Create or Update a User API call](/api/methods/#create_user).

In this example, we're creating a user for someone named "Bob Testerson".

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Create User</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/user \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "id": "abc123",
    "accountId": "abc123",
    "referralCode": "SUPERBOB",
    "email": "bob@example.com",
    "firstName": "Bob",
    "lastName": "Testerson"
}'</code></pre></td>
            <td><pre><code>{
    "id": "876343",
    "accountId": "abc123",
    "referralCode": "SUPERBOB",
    "email": "bob@example.com",
    "firstName": "Bob",
    "lastName": "Testerson"
}</code></pre></td>
        </tr>
    </tbody>
</table>

When creating a user the field `referralCode` is optional. When the field is left empty the system will automatically generate a Referral Code based on the `firstName` and `lastName` fields. You can also choose to generate your own Referral Code by filling out `referralCode`, as shown above.

**Please note:** In this guide we're using example for tracking [solo accounts](/shared-vs-solo-accounts), but SaaSquatch also supports [shared accounts](/shared-vs-solo-accounts). For more information please read the guide on [shared vs solo accounts page](/shared-vs-solo-accounts).


#### Engage the user and help them make a referral ####

When a user is created in SaaSquatch, they are automatically generated unique share links that they can share to refer their friends. Since we want our users to share these links, we're going to look them up from SaaSquatch using the [Lookup Share Links API call](/api/methods/#get_sharelinks) and show them on our website when someone has logged in. 

Usually companies include the Referral SaaSquatch widget instead of directly looking up share links. Both methods do the job of letting people share their links, but in this example we're focusing on not using javascript, which can be helpful for mobile apps, integrations into CRM software, and other offline use cases.

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Lookup Share Links</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X GET https://app.referralsaasquatch.com/api/v1/{tenant_alias}/account/abc123/user/abc123/sharelinks \
-u API_KEY: \</code></pre></td>
            <td><pre><code>{
    "shareLink": "http://ssqt.co/pZVp",
    "facebookShareLink": "http://ssqt.co/pZVq",
    "twitterShareLink": "http://ssqt.co/pZVr",
    "emailShareLink": "http://ssqt.co/pZVs",
    "mobileShareLink": "http://ssqt.co/pZVt",
    "mobileFacebookShareLink": "http://ssqt.co/pZVu",
    "mobileTwitterShareLink": "http://ssqt.co/pZVv",
    "mobileEmailShareLink": "http://ssqt.co/pZVw"
}</code></pre></td>
        </tr>
    </tbody>
</table>


#### Attribute referred users ####

When someone signs up after being referred, they need to be attributed as a referral and connected to the person that referred them. For this example, we're creating users in SaaSquatch the first time that they log in, and the attribution of referrals would happen as soon as they're identified.

For this example, our friend "Bob Testerson" referred his friend "Erik Squatchy" by sharing his referral link. Erik clicked on that referral link and signed up for a trial account. This new account has an account ID `"def456"` and user ID that are the same.

<div class="text-center">

![Erik Squatch clicks through](/assets/images/rsCode-example.png)

![Erik Squatch signs up with SUPERBOB as referral code](/assets/images/erik-signup-example.png)

</div>

To track Erik we use the same [Create or Update an Account API call](/api/methods/#account_sync) used when we identified Bob, but in this case since Erik was referred we include the field for `referral.code` to connect the referral with Bob.

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Create a Referred Account</th>
            <th>Example Response to Create Account</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{   "id": "def456",
        "subscription": {
        "status": "TRIAL"
    },
    "referral": {
        <b>"code": "SUPERBOB"</b>
    }
}'</code></pre></td>
            <td><pre><code>{
    "id": "def456",
    "currency": "USD",
    "subscription": {
        "status": "TRIAL"
    },
    "referral": {
        <b>"code": "SUPERBOB"</b>
    }
}</code></pre></td>
        </tr>
    </tbody>
</table>

By filling out the `referral.code` this account is linked to Bob, the user that made this referral.  We also set the `subscription.status` to `TRIAL` because Erik signed up for a Trial account. Erik will show up in the Bob's widget as a referral and a Trial user. Later if Erik completes his trial, we will need to update his account again using this API call and set the `subscription.status` to `PAID` so we can complete the conversion step.

After creating the account, add the referred user to this account by using the [Create or Update a User API call](/api/methods/#create_user). Use the `account_id` from our previous step to attach this new user to the account we just created. 

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Create a Referred User</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/user \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "id": "def456",
    "accountId": "def456",
    "email": "erik@example.com",
    "firstName": "Erik",
    "lastName": "Squatchy"
}'</code></pre></td>
            <td><pre><code>{
    "id": "def456",
    "accountId": "def456",
    "referralCode": "ERIKSQUATCHY",
    "email": "erik@example.com",
    "firstName": "Erik",
    "lastName": "Squatchy"
}</code></pre></td>
        </tr>
    </tbody>
</table>

The new user is created and linked back to its referrer through the `referral.code` stored in the Account. 

#### Convert the referred user when they sign up for a PAID subscription ####

When someone pays for a subscription at the end of their trial, it's vital to inform SaaSquatch about this account upgrade so the user who made the referral can receive their reward for successfully referring a friend. We call this step "Conversion".

In this example, the referral program is set up with a double-sided incentive, so the referred user that is paying for subscription also gets a discount on their first bill for being referred. To fulfill this reward use the [List reward balances API call](/api/methods/#list_balances) when the user upgrades to check if they have been referred and deserve any discount. This call returns all the rewards that are linked to the `accountId`. 

To apply the reward, use the `totalDiscountPercent` and use it to calculate to amount that need to be discounted from the first bill. Then, apply this amount to their bill. Every payment system has different tools for applying this credit, and it's up to you to decide the right way to do this. This is the fulfillment step for the referred user. 

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Lookup Rewards for a Referred Account</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X GET https://app.referralsaasquatch.com/api/v1/{tenant_alias}/reward/balance?accountId=def456 \
-u API_KEY: \
</code></pre></td>
<td><pre><code>[{
        "type": "PCT_DISCOUNT",
        <b>"totalDiscountPercent": 10,</b>
        "referredDiscountPercent": 10,
        "referrerDiscountPercent": 0
    }]</code></pre></td>
        </tr>
    </tbody>
</table>

**Note:** In this scenario `referredDiscountPercent` can be used, but this can cause a problem later when a user downgrades their account and later decides to upgrade again. This user would not receive the discount he or she earned by referring users if we calculated the bill based on the on `referredDiscountPercent`.

After the account upgrade is complete, update the `status` from `TRIAL` to `PAID` to complete the conversion using the [Update an Account API call](/api/methods/#account_sync).

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to Update Referred Account Conversion</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{   "id": "def456",
        "subscription": {
            <b>"status": "PAID",</b>
            "value": 99.99,
            "billingIntervalType": "DAY",
            "billingIntervalValue": 30
    }
}'</code></pre></td>
            <td><pre><code>{
    "id": "def456",
    "currency": "USD",
    "subscription": {
        <b>"status": "PAID",</b>
        "value": 99.99,
        "billingIntervalType": "DAY",
        "billingIntervalValue": 30
    },
    "referral": {
        "code": "SUPERBOB"
    }
}</code></pre></td>
        </tr>
    </tbody>
</table>
 
 
#### Fulfill the earned reward for the referrer ####

The referrer successfully referred their friend who signed up to `PAID` subscription. Hand out the referrer's reward by applying the percentage discount on their next bill. 

Before the next billing run check the discount percentage for each user by using the [List reward balances API call](/api/methods/#list_balances). This API call returns all the rewards that are linked to the `accountId` that was used in the request. 

<table class="table">
    <thead>
        <tr>
            <th style="width: 50%;">Example Request to  Lookup Rewards for a Referrer's Account</th>
            <th>Example Response</th>                
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>$ curl -X GET https://app.referralsaasquatch.com/api/v1/{tenant_alias}/reward/balance?accountId=abc123 \
-u API_KEY: \
</code></pre></td>
<td><pre><code>{
        "type": "PCT_DISCOUNT",
        "totalDiscountPercent": 10,
        "referredDiscountPercent": 10,
        "referrerDiscountPercent": 0
    }</code></pre></td>
        </tr>
    </tbody>
</table>
