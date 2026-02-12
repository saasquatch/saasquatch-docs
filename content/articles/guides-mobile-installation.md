---
title: Mobile Referral Program Guide - Installation
highlights: "In-depth instructions on how to install your mobile platform's referral program."
slug: guides/mobile-installation
sectionType: guide
template: hasTableOfContents.html
date: 2019-01-31
---

This page uses step-by-step instructions, relevant examples, and plenty of links to additional resources help explain concepts and provide information about how to go about the integration as well as tailor your program to the specifics of your business.

This is a companion document to the [Mobile Referral Program Guide Introduction](/guides/mobile-intro) and [Mobile Referral Program Guide Outline](/guides/mobile-outline) from our Success Centre. Please make sure you have familiarized yourself with these two documents before moving forward with the installation.

### Getting Started

To get started installing your referral program, make sure you have successfully [created](/success/using-referral-saasquatch/#Getting-Started) a Referral SaaSquatch account and [project](/success/using-referral-saasquatch/#Project-Setup). When you are creating the project, please make sure you choose your Program Reward as either Dollar Credit or Percent Discount, and your Payment System as Other (via [SaaSquatch API](/api)).

The main examples in this installation guide were created for use with a Dollar Credit referral program. In the referrer and referred user reward [fulfillment](/success/core-topics/#Fulfillment) steps there are additional details about differences in the fulfillment process for Percentage Discount programs.

This guide provides examples on how to setup your referral program using either the [mobile widget](/mobile/widget) or [mobile SDK](/mobile). You can find more details about the functionality available through our [mobile widget](/mobile/widget) and [mobile SDK](/mobile) in our technical docs.

If you have any questions about the information in this install guide, or throughout the process of implementing your referral program, don’t hesitate to contact our [support team](mailto:support@referralsaasquatch.com) who will be more than happy to assist you.

<div class="well "><strong>Live and Test Tenant Alias:</strong> 
This Install guide includes references to the tenant alias for your program. Make sure to replace `{{tenant alias}}` with your actual tenant alias found on the install page of your Referral SaaSquatch program portal. Please note that each project includes both a Live and a Test tenant. Please check out our document on [best practices for testing](/testing/).</div>

<div class="well "><strong>Signed Requests:</strong>
[Signed Requests](/developer/squatchjs/signed-requests/) are turned on by default with a new project. Places where a [JWT](/topics/json-web-tokens/) is needed in this guide are indicated using `{{calculated_JWT}}`. Information about generating the JWT’s, and how to turn them off can be [found](/developer/squatchjs/signed-requests/) in our docs.</div>

### Additional Resources:

- [REST API Reference](/api/)
- Open Endpoints [Reference](/api/openendpoints/) (for use with SDK calls)
- [iOS](/mobile/ios/quickstart) and [Android](/mobile/android/quickstart/) SDK Quickstart Guide
- iOS Reference ([Swift](/mobile/ios/docs-swift/index.html) and [Objective-C](/mobile/ios/docs-objectivec/Classes/Saasquatch/index.html#//apple_ref/occ/cl/Saasquatch))

### This Install Guide includes the following steps:

[1. Identifying Users to Referral SaaSquatch](#1-Identifying-Users-to-Referral-SaaSquatch)

[2. Display Referral Program in App](#2-Display-Referral-Program-in-App)

[3. Attributing Referral](#3-Attributing-Referral)

[4. Conversion Script](#4-Conversion-Script)

[5. Reward Fulfillment - Referred User](#5-Reward-Fulfillment-Referred-User)

[6. Reward Fulfillment - Referrer](#6-Reward-Fulfillment-Referrer)

### 1. Identifying Users to Referral SaaSquatch

#### Using the Mobile SDK

To [identify](/success/core-topics/#Identification) a referred user you need to provide user information to Referral SaaSquatch. This information includes the tenant alias which identifies your program, a userId and an accountId (see [Shared vs Solo Accounts](/shared-vs-solo-accounts/) to see what you should use here), and a valid JSON object containing information about the user. For our documentation also includes a description of the [available userInfo fields](/api/methods/#open_create_user).

Here is an example:

```
// This is your tenant alias which identifies you with Referral SaaSquatch
let tenant = "{{tenant alias}}"

// We register our user internally, then pass the user's information to Referral SaaSquatch
let userId = "abc_123"
let accountId = "abc_123"

let userInfo: [String: AnyObject] = [
    "id": userId,
    "accountId": accountId,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "locale": "en_US",
    "referralCode": "JOHNJOE"]
```

With this information set the user can now be [registered](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch21registerUserForTenantFMS0_FTSS10withUserIDSS13withAccountIDSS12withUserInfoPSs9AnyObject_17completionHandlerFT8userInfoGSqPS1___5errorGSqCSo7NSError__T__T_) with Referral SaaSquatch using this call:

```
// Register a user with Referral Saasquatch
Saasquatch.registerUserForTenant(tenant, withUserID: userId, withAccountID: accountId, withToken: token, withUserInfo: userInfo,
    completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // Code to be executed after the async call returns
})
```

A completionHandler will then be called with `userInfo` and `error`. `userInfo` contains the returned information about the user. error contains a description of the error, if any, and an error code indicating the HTTP status code returned by the server. If `error` is nil then `userInfo` will exist and vice versa.

Within the `completionHandler` the returned data will be parsed and anything useful saved for later:

```
completionHandler: {(userInfo: AnyObject?, error: NSError?) in

    // First, check if an error occurred
    if error != nil {
        //handle errors
    }

    // We would like to save the share links returned by the Referral SaaSquatch server.
    guard let shareLinks = userInfo?["shareLinks"] as? [String: AnyObject],
        let shareLink = shareLinks["shareLink"] as? String,
        let facebookShareLink = shareLinks["mobileFacebookShareLink"] as? String,
        let twitterShareLink = shareLinks["mobileTwitterShareLink"] as? String, else {
            return
    }
}
```

#### Using the Mobile Widget

The mobile widget can be used to [identify](/success/core-topics/#Identification) referred users inside the Mobile app. The following is an example to use this endpoint for tracking and conversion purposes:

```
https://app.referralsaasquatch.com/a/{{tenant alias}}/widgets/mobilewidget
?jwt={{calculated_JWT}}
&systemId=abc_123
&userId=abc_123
&email=john%40example.com
&firstName=John
&lastName=Doe
&referralCode=JANEDOE
&accountStatus=TRIAL
&mode=EMPTY
```

The above example will result in the following URL:

```
https://app.referralsaasquatch.com/a/{{tenantalias}}/widgets/mobilewidget?jwt={{calculated_JWT}}&systemId=abc_123&userId=abc_123&email=john%40example.com&firstName=John&lastName=Doe&referralCode=JANEDOE&accountStatus=TRIAL&mode=EMPTY
```

**Please note:**

- Make sure to encode special characters.
- Son’t include `paymentProviderId`
- Use `systemId` instead of `account_id`
- The referral code of the referrer this referred user was referred by can be found inside the [Branch integration’s](/mobile/branch-metrics/) JSON format: `"sq_referralCode" : "JANEDOE"`
- If this user was not referred, leave the `referralCode` field empty.

### 2. Display Referral Program in App

#### Using the Mobile SDK

The [Mobile SDK](/mobile) provides very flexible options for integrating the referral program into your app. You have the choice about what and how the info is displayed to the referral program participant.

Below are common types of information used in displaying referral program info to the user in the app, and how to access this data.

##### User

Using the information about the user that is currently logged into the app you can lookup the `userInfo` object using the [userForTenant](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch13userForTenantFMS0_FTSS10withUserIDSS13withAccountIDSS10withSecretSS17completionHandlerFT8userInfoGSqPSs9AnyObject__5errorGSqCSo7NSError__T__T_) function.

An example of what this call looks like:

```
public class func userForTenant(
        tenant: String,
        withUserID userID: String,
        withAccountID accountID: String,
        withSecret secret: String,
        completionHandler: (userInfo: AnyObject?, error: NSError?) -> Void)
```

If successful this will return the user object as outlined in the Open Endpoints [Get User](/api/methods/#open_get_user) call.

##### Rewards

To display the current available reward balance for the user, you can use the [Lookup Reward Balance](/api/methods/#list_balances) API call. This will return the current reward balance for the account.

##### Referrals

To display a list of all the referrals that a user has made you can use the [listReferralsForTenant](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch22listReferralsForTenantFMS0_FTSS10withSecretSS21forReferringAccountIDGSqSS_18forReferringUserIDGSqSS_22beforeDateReferralPaidGSqSS_23beforeDateReferralEndedGSqSS_28withReferredModerationStatusGSqSS_28withReferrerModerationStatusGSqSS_9withLimitGSqCSo8NSString_10withOffsetGSqS1__17completionHandlerFT8userInfoGSqPSs9AnyObject__5errorGSqCSo7NSError__T__T_) SDK call.

This call lists all referrals made on this tenant. Include the current user’s account and user id to only list those who were referred by this user. The other required parameter is a [token](/developer/squatchjs/signed-requests/) to authenticate the request:

```
Saasquatch.listReferralsForTenant(tenant, withToken: token, forReferringAccountID: bobsAccountId, forReferringUserID: bobsUserId, beforeDateReferralPaid: nil, beforeDateReferralEnded: nil, withReferredModerationStatus: nil, withReferrerModerationStatus: nil, withLimit: nil, withOffset: nil,
    completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // Check the error
        if (error != nil) {
            //handle errors
        }
        // Parse the list of referrals
        guard let referrals: NSArray = userInfo!["referrals"] as? NSArray else {
            return
        }
        for referral in referrals {
            guard let referredUser = referral["referredUser"] as? NSDictionary,
                let firstName = referredUser["firstName"] as? NSString,
                let referredReward = referral["referredReward"] as? NSDictionary,

                // In this case, we are giving out only percent discount rewards, so we know this field will exist
                let discountPercent = referredReward["discountPercent"] as? NSInteger else {
                    break
                }
            // Do something with the referral information
        }
    })
```

#### Using the Mobile Widget

The following is an example URL which could be used to load the [Mobile Widget](/mobile/widget/) for your users in an iFrame in your app. The URL to request the Mobile Widget stores all the parameters.

```
https://app.referralsaasquatch.com/a/{{tenant alias}}/widgets/mobilewidget
?userId=abc_123
&firstName=John
&lastName=Doe
&accountId=abc_123
&paymentProviderId=NULL
&email=john%40example.com
&jwt={{calculated_JWT}}
```

The above example will result in the following URL:

```
https://app.referralsaasquatch.com/a/{{tenantalias}}/widgets/mobilewidget?userId=abc_123&firstName=John&lastName=Doe&accountId=abc_123&paymentProviderId=NULL&email=john%40example.com&jwt={{calculated_JWT}}
```

**Note:** Make sure to encode special characters.

### 3. Attributing Referral

#### Using the Mobile SDK

Once the user is registered we need to [attribute](/success/core-topics/#Attribution) their referral.

The referral code of the referrer for this referred user can be found inside the [Branch integration’s](/mobile/branch-metrics/) JSON format: `"sq_referralCode" : "JANEDOE"`

Using the SaaSquatch mobile SDK we can attribute this referral by calling [applyReferralCode](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch17applyReferralCodeFMS0_FTSS9forTenantSS8toUserIDSS11toAccountIDSS10withSecretSS17completionHandlerFT8userInfoGSqPSs9AnyObject__5errorGSqCSo7NSError__T__T_) with this code and their `userId`, `accountId`, and token. The function validates the referral code. If the code is successful the reward information will be returned in `userInfo`, or if the code cannot be applied to the account an error will be returned.

An example of how to attribute the referral using the mobile SDK:

```
Saasquatch.applyReferralCode("JANEDOE", forTenant: tenant, toUserID: userId, toAccountID: accountId, withToken: token, completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // First, make sure there is no error
        if error != nil {
            //handle errors
        }

        // Parse the referral code information returned in userInfo
        guard let reward = userInfo?["reward"] as? [String: AnyObject],
        let type = reward["type"] as? String else {
            return
        }

        // For a complete list of reward types and fields, please visit /api/methods/#open_apply_code
        if type == "PCT_DISCOUNT" {
            guard let percent = reward["discountPercent"] as? Int else {
                return
            }
        }

        // Do something with the reward
    })
```

During your user's registration, you may want to look up a referral code they entered to check its existence and get information about the associated reward. This is done with the [lookupReferralCode](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch18lookupReferralCodeFMS0_FTSS9forTenantSS10withSecretGSqSS_17completionHandlerFT8userInfoGSqPSs9AnyObject__5errorGSqCSo7NSError__T__T_) call that is very similar to `applyReferralCode` and returns the same reward information in userInfo. The tenant and referral code are the only required parameters, but if you make too many calls without a token you may get a 401: Unauthorized response. Our technical docs also contain a complete description of the [available fields](/api/methods/#open_apply_code).

```
Saasquatch.lookupReferralCode("JANEDOE", forTenant: tenant, withToken: token,
    completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // Parse the reward as in applyReferralCode(_:forTenant:toUserID:toAccountID:withToken:completionHandler)

    })
```

#### Mobile Widget

The Mobile Widget URL from Step 1 can be used to perform both [Identification](/success/core-topics/#Identification) and [Attribution](/success/core-topics/#Attribution). The referral code of the referrer can be found inside the Branch integration’s JSON format: `"sq_referralCode" : "JANEDOE"`. If this user was not referred, leave the `referralCode` field empty.

### 4. Conversion Script

When a referred user successfully completes their purchase you need to notify Referral SaaSquatch that the referral has been completed. This should be done using the [Update Account](/api/methods/#account_sync) API call.

Submitting the status value in the subscription object of the call as “PAID” will [convert the referral](/success/core-topics/#Conversion).

The following example shows what this API call might look like for your test tenant:

```
curl -X POST
-H "Content-Type: application/json"
-H "Authorization: Basic {{base64encoded API}}"
-d '{
    "id": "abc_123",
    "subscription": {
        "status": "PAID",
        "billingIntervalType": "DAY",
        "billingIntervalValue": 1,
        "value": 99.99
    },
    "currency": "USD"
}' "https://app.referralsaasquatch.com/api/v1/{{tenant alias}}/accountsync"
```

Note: The `billingIntervalType`, `billingIntervalValue`, and `value` for the subscription object are not used for your program type, but are required fields. You can hard-code these fields to the values in this example.

This call returns a HTTP 200 response if it was successful:

<div class="row">
  <div class="span5 offset1">
      <hr>
      <strong>Example Response [Successful registration]:</strong>
    <hr>
    <pre><code class="lang-js">
    {
      "id": "abc_123",
      "subscription": {
        "status": "PAID",
        "billingIntervalType": "DAY",
        "billingIntervalValue": 1,
        "value": 99.99
      },
      "currency": "USD"
    }
    </code></pre>
  </div>
<div class="span6">
  <hr>
  <strong>Example Response [Account Sync Failed]:</strong>
  <hr>
  <pre><code class="lang-js">
  {
    "message": "Account sync failed. This push is not valid for your tenant   type[STRIPE]",
    "statusCode": 403,
    "apiErrorCode": "API_REQUEST_NOT_SUPPORTED"
  }
  </code></pre>
  </div>
</div>

### 5. Reward Fulfillment - Referred User

During the referred user’s checkout process the referred user should have their reward applied. The following code examples help determine whether or not a user was referred.

The Referral Code is stored in the [Branch integration’s](/mobile/branch-metrics/) JSON format instead of a cookie on the user’s device:
`"sq_referralCode" : "JANEDOE"`

If a referral code is found, this means that this user has been referred and should receive their discount during the checkout process.

The above code only checks to see if there is a referral code present.

#### Verify the referral code [SDK]

You can verify that the referral code is valid by looking up the referrer info using the referral code. For this, we can use the [userByReferralCode](/mobile/ios/docs-swift/Classes/Saasquatch.html#/s:ZFC10saasquatch10Saasquatch18userByReferralCodeFMS0_FTSS9forTenantSS10withSecretGSqSS_17completionHandlerFT8userInfoGSqPSs9AnyObject__5errorGSqCSo7NSError__T__T_) method like this:

```
Saasquatch.userByReferralCode("BOBTESTERSON", forTenant: tenant, withToken: token,
    completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // Always check the error
        if error != nil {
            //handle errors
        }

        // Parse the returned information
        guard let referrerFirstName = userInfo?["firstName"] as? String,
            let referrerLastInitial = userInfo?["lastInitial"] as? String,
            let referrerImageURL = userInfo?["imageUrl"] as? String else {
                return
        }

        // Now we can use this information to inform our user of their referral
    })
```

#### Verify the referral code [API]

You can also choose to verify the referral code by using the [Lookup a Referral Code](/api/methods/#get_code) API call.

```
Type: GET
URL: https://app.referralsaasquatch.com/api/v1/{{tenant alias}}/code/JANEDOE
```

<div class="row">
  <div class="span5 offset1">
      <hr>
      <strong>Example Response [Valid Referral Code]:</strong>
    <hr>
    <pre><code class="lang-js">{  
   "code":"JANEDOE",
   "dateCreated":1455752646974,
   "referrerName":"JANE Doe",
   "reward":{  
      "credit":1000,
      "unit":"CENTS",
      "type":"CREDIT"
   }
}</code></pre>
  </div>
<div class="span6">
  <hr>
  <strong>Example Response [Invalid Referral Code]:</strong>
  <hr>
  <pre><code class="lang-js">{  
   "message":"Invalid referral code",
   "statusCode":404,
   "apiErrorCode":"REFERRAL_CODE_NOT_FOUND"
}</code></pre>
  </div>
</div>

##### Percentage Discount Programs

For referral programs configured for percentage discount rewards the only difference for referred user reward fulfillment will be the Lookup Referral Code API call which will intead return something like:

```
{
  "code": "BOBTESTERSON",
  "dateCreated": 1411600868797,
  "referrerName": "Bob Testerson",
  "reward": {
    "discountPercent": 10,
    "monthsDiscountIsValid": 1,
    "type": "PCT_DISCOUNT"
  }
}
```

#### Reward Fulfillment

If the user was referred, apply a discount during the checkout process so the referred user gets their reward.

### 6. Reward Fulfillment - Referrer

The Reward Fulfillment for the referrer can be automated by using the Referral SaaSquatch [REST API](/api).

#### Listen for Webhooks

[Subscribe](/api/methods/#create_webhook) a URL as a webhook endpoint to receive webhook events.

Here you can listen for the creation of a reward for the referrer. The `reward.created` event will notify you whenever a new reward is created.

#### Lookup the reward

Use the [List reward balances](/api/methods/#list_balances) API call to lookup the user’s available reward balance based on the `rewardId`, `accountId`, and `userId` in the webhook data.

```
Type: GET
URL: https://app.referralsaasquatch.com/api/v1/{{tenantalias}}/reward/balance?accountId=abc_122
```

**Example response:**

```
{
    "count": 1000,
    "totalAssignedCredit": 1000,
    "totalRedeemedCredit": 0,
    "unit": "CENTS",
    "type": "CREDIT"
}
```

This will give you the reward balance by calculating the difference between `totalAssignedCredit` and `totalRedeemedCredit`. In this example:

`totalAssignedCredit` 1000 minus `totalRedeemedCredit` 0 equals 1000 CENTS `available`.

##### Percentage Discount Programs

For referral programs configured for percentage discount rewards the available reward balance will intead return something like:

**Example response:**

```
{
    "totalDiscountPercent": 10,
    "referrerDiscountPercent": 10,
    "referredDiscountPercent": 0,
    "type": "PCT_DISCOUNT"
}
```

The total reward discount available to the referrer is then the `totalDiscountPercent` value.

Make sure to be aware of the length of the discount set in your Referral SaaSquatch project so that you are aware when the discount will expire.

#### Apply the reward

Depending on the desired program rewards, the calculated amount can be discounted from the user's next invoice, applied to their next checkout, or delivered as a coupon, gift card, or other reward.

#### Redeem the reward

Use the [Debit a reward balance](/api/methods/#debit_balance) API call to debit the account’s reward balance. This will update the reward balance and the referral participant’s progress inside the [Referral Widget](/themes/standard/).

```
Type: POST
URL: https://app.referralsaasquatch.com/api/v1/{{tenant alias}}/credit/bulkredeem
```

<div class="row">
  <div class="span5 offset1">
      <hr>
      <strong>JSON request</strong>
    <hr>
    <pre><code class="lang-json">{
    "accountId": "abc_122",
    "unit": "CENTS",
    "amount": 1000
}</code></pre>
  </div>
<div class="span6">
  <hr>
  <strong>Example response:</strong>
  <hr>
  <pre><code class="lang-json">{
   "creditRedeemed": 1000,
   "creditAvailable": 0,
   "unit": "CENTS"
}</code></pre>
  </div>
</div>

##### Percentage Discount Programs

Percentage discount rewards do not require redemption as they will automatically expire when no longer valid.
