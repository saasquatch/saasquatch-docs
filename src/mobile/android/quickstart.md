---
title: Android SDK Quickstart Guide
highlights: |
    The Referral SaaSquatch Android SDK integrates a referral program into your app.
permalinks: false
slug: mobile/android/quickstart
template: mobile.html
---

Overview
--------


We're going to add the SDK into our project and start using it to interface with Referral SaaSquatch.

For a working demo implementation, check out our [Sample App](https://github.com/saasquatch/mobile-sdk-android-sample "Sample App").


Installation
------------

The minimum Android API required to use this SDK is 15.

You can install the latest version of the SDK from the maven repository, or download the aar and manually include the library.

### Install from the repository

To install the SDK from the maven repository, first include the repo in your *project's* `build.gradle` file:

```gradle
// ...
allprojects {
    repositories {
        jcenter()
        // Include the SDK maven repository
        maven {
            url 'https://github.com/saasquatch/mobile-sdk-android-maven/raw/master/'
        }
    }
}
```

Next, add the dependency in your *module's* `build.gradle` file:

```gradle
// ...
dependencies {
    // ...
    compile 'com.wholepunk.saasquatch:saasquatch-sdk-android:1.0.3'
}
```

Run a gradle sync and the SDK is now ready for use in your project.

### Manual install

There are 2 steps to manually install the SDK in your app:

* Import the library into your project.
* Reference the library in your module's `build.gradle` file.

#### Step 1: Import the library into your project

To add the SDK to your project, go to File -> New -> New Module.

Select *Import .JAR/.AAR Package* and hit "Next".

Click the "..." button next to the *File name* field, and locate `saasquatch-release.aar` within the zip and select it. Click "Finish" and your project will include the `saasquatch-release` module.


#### Step 2: Reference the library in your module's build.gradle file

Open up the `build.gradle` file for your module and add the following:

```gradle
// ...
dependencies {
    // ...
    compile project(':saasquatch-release')
}
```

Run a gradle sync and you will be able to use the SDK in your app.

Usage
-----

The Referral SaaSquatch Android SDK allows us to:

* Register our users with Referral SaaSquatch to track their referrals.
* Track our user's referrals with Referral SaaSquatch.
* Fetch information about our users, referral codes and rewards.


To demonstrate how to use the SDK, let's walk through registering a user with Referral SaaSquatch and making a referral as demoed in our [Sample App](https://github.com/saasquatch/mobile-sdk-android-sample "Sample App"). This can be achieved by following these steps:

* Register our new user with Referral SaaSquatch.
* Look up a referral code provided by our user during sign up.
* Apply the referral to our user's account.
* Show our user come information about the user who referred them.

#### Register a user with Referral SaaSquatch

To register a user, we provide user information to Referral SaaSquatch. We provide our tenant alias which identifies our app. A userId from our system is passed to SaaSquatch to uniquely identify our users. We pass in an accountId, which Referral SaaSquatch uses to group users together; see [Shared vs Solo Accounts](/shared-vs-solo-accounts/ "Shared vs Solo Accounts") to see what you should use here.
Lastly, we provide a valid JSONObject containing information about our user. For a description of the available `userInfo` fields, please see [SaaSquatch docs](../../../api/methods/#open_create_user "Referral SaaSquatch REST API reference"). Here is an example:

```java
// This is your tenant alias which identifies you with Referral SaaSquatch
String tenant = "SaaS";

// We register our user internally, then pass the user's information to Referral SaaSquatch
String userId = "000001";
String accountId = "000001";
JSONObject userInfo = new JSONObject();
try {
    userInfo.put("id", userId);
    userInfo.put("accountId", accountId);
    userInfo.put("email", "claire@lallybroch.com");
    userInfo.put("firstName", "Claire");
    userInfo.put("lastName", "Fraser");
    userInfo.put("locale", "en_US");
    userInfo.put("referralCode", "CLAIREFRASER");
} catch (JSONException e) {
    Log.e("MyActivity", e.getLocalizedMessage());
}
```

In this example, we assign an id of 000001 since Claire is our first user. We pass her email, first and last names, and her locale to Referral SaaSquatch. We have also assigned her a referral code so she can use it to refer new users. When a new user signs up with referral code "CLAIREFRASER" she will get the credit.

Now we can register our user with Referral SaaSquatch using this call:

```java
// Register a user with Referral Saasquatch
Saasquatch.registerUser(tenant, userId, accountId, token, userInfo, this,
    new Saasquatch.TaskCompleteListener() {
        @Override
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            // Code to be executed after the async task returns
        }
    });
```

We provide a `TaskCompleteListener` which will be called with `userInfo`, `errorMessage` and `errorCode`. The JSONObject `userInfo` contains the returned information about the user. If there was an error, `errorMessage` contains a description of what went wrong, and `errorCode` contains an Integer indicating the HTTP status code returned by the server, or 0 if there was some other error. If `errorMessage` and `errorCode` are null then `userInfo` will exist and vice versa.

In our listener, we will parse through the returned data and save anything useful for later.

```java
public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

    // First, check if an error occurred
    if (errorCode != null) {
        // handle errors
    }

    // If the error is null, then userInfo will exist
    if (userInfo != null) {

        // We would like to save the share links returned by the Referral SaaSquatch server.
        JSONObject shareLinks;
        String shareLink;
        String facebookShareLink;
        String twitterShareLink;

        try {
            shareLinks = userInfo.getJSONObject("shareLinks");
            shareLink = shareLinks.getString("shareLink");
            facebookShareLink = shareLinks.getString("mobileFacebookShareLink");
            twitterShareLink = shareLinks.getString("mobileTwitterShareLink");
        } catch (JSONException e) {
            Log.e("MyActivity", e.getLocalizedMessage());
            return;
        }
    }
}
```

#### Make the referral

Once the user is registered and any useful information returned in `userInfo` has been saved away, we will make their referral with Referral SaaSquatch. We'll call `applyReferralCode` with the code our user gave us and their userId, accountId and token. The function validates the referral code. If the code is successful the reward information will be returned in `userInfo`, or if the code cannot be applied to the account an error will be returned.


```java
Saasquatch.applyReferralCode(tenant, userId, accountId, "BOBTESTERSON", token, MyActivity.this,
    new Saasquatch.TaskCompleteListener() {
        @Override
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            // First, check the error
            if (errorCode != null) {
                // handle errors
            }

            // Parse the referral code information returned in userInfo
            JSONObject reward;
            String type;
            String discountPercent;

            try {
                reward = userInfo.getJSONObject("reward");
                type = reward.getString("type");
            } catch (JSONException e) {
                Log.e("MyActivity", e.getLocalizedMessage());
                return;
            }

            // For a complete list of reward types and fields, please visit http://docs.referralsaasquatch.com/api/methods/#open_apply_code
            if (type.equals("PCT_DISCOUNT")) {
                try {
                    discountPercent = reward.getString("discountPercent");
                } catch (JSONException e) {
                    Log.e("MyActivity", e.getLocalizedMessage());
                    return;
                }
            }
        }
    });
```

During your user's registration, you may want to look up a referral code they entered to check it's existance and get information about the associated reward. The call is very similar to applyReferralCode and returns the same reward information in userInfo. The tenant, referral code and context are the only required parameters, but if you make too many calls without a token you may get a 401: Unauthorized response.

For a complete description of the available fields, visit the [SaaSquatch docs](../../../api/methods/#open_apply_code "Referral SaaSquatch REST API reference").

```java
Saasquatch.lookupReferralCode(tenant, "BOBTESTERSON", token, MyActivity.this,
    new Saasquatch.TaskCompleteListener() {
        @Override
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            // Parse the reward as in applyReferralCode above
        }
    })
```


#### Lookup who referred our user

The last thing we would like to do is let our user know they have been referred successfully. Let's lookup the user that referred them so we can let our user know who they can thank. For this, we can use the `getUserByReferralCode` method like this:

```java
Saasquatch.getUserByReferralCode(tenant, "BOBTESTERSON", token, MyActivity.this,
    new Saasquatch.TaskCompleteListener() {
        @Overried
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            // Always check the error
            if (errorCode != null) {
                // handle errors
            }

            // Parse the returned information
            String referrerFirstName;
            String referrerLastInitial;
            String referrerImageURL;

            try {
                referrerFirstName = userInfo.getString("firstName");
                referrerLastInitial = userInfo.getString("lastInitial");
                referrerImageURL = userInfo.getString("imageUrl");
            } catch (JSONException e) {
                Log.e("MyActivity", e.getLocalizedMessage());
                return;
            }
        }
    });
```         

Great! We registered our new user with Referral SaaSquatch and successfully made a referral.

#### List Referrals

Let's add one more bit of functionality to our app to demonstrate `listReferralsForTenant`. Bob Testerson referred our new user, Claire Fraser, and we would like to show him a list of everyone he's referred (it's a lot). To do this, we call `listReferralsForTenant`.

This method looks up all the referrals for us, the tenant. The other required parameter is a token to authenticate the request. The remainder of the parameters are options for filtering this list. In this case, we want to list only the referrals where Bob is the *referrer*. We will pass in Bob's userId and accountId and parse the list returned in `userInfo`. For a description of the options for filtering, see the [SaaSquatch
docs](../../../api/methods/#open_list_referrals "Referral SaaSquatch REST API reference").

```java
Saasquatch.listReferralsForTenant(tenant, token, bobsAccountId, bobsUserId, null, null, null, null, null, null, MyActivity.this,
    new Saasquatch.TaskCompleteListener() {

        @Override
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            if (errorCode != null) {
                // handle errors
            }

            JSONArray referrals;

            try {
                referrals = userInfo.getJSONArray("referrals");
            } catch (JSONException e) {
                Log.e("MyActivity", e.getLocalizedMessage());
            }

            for (int i = 0; i < referrals.length(); i++) {
                try {
                    JSONObject referredUser = referrals.getJSONObject(i).getJSONObject("referredUser");
                    String firstName = referredUser.getString("firstName");
                    JSONObject referredReward = referrals.getJSONObject(i).getJSONObject("referredReward");

                    // In this case, we are giving out only percent discount rewards, so we know this field will exist
                    String discountPercent = referredReward.getInt("discountPercent");
                } catch (JSONException e) {
                    break;
                }

                // Do something with the reward information
            }
        }
    })
```


#### Done!

For a working demo implementation, check out our [Sample App](https://github.com/saasquatch/mobile-sdk-android-sample "Sample App").

For a detailed description of the `Saasquatch` class and it's public methods, please visit the [API Docs](../docs/ "API level docs").

For a reference of the fields available in `userInfo` please visit the [Referral SaaSquatch REST API docs](../../../api/methods/#open_create_user "Referral SaaSquatch REST API docs").
