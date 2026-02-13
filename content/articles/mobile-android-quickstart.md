---
title: Android SDK Quickstart Guide
highlights: An installation walkthrough for the Android SDK, explanations of common usage cases, and code examples.
slug: mobile/android/quickstart
sectionType: guide
template: hasTableOfContents.html
date: 2018-11-07
---

### Installation

The minimum Android API required to use this SDK is 15.

You can install the latest version of the SDK from the maven repository, or download the `aar` and manually include the library.

#### Install from the repository

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
    compile 'com.wholepunk.saasquatch:saasquatch-sdk-android:1.1.0'
}
```

Run a gradle sync and the SDK is now ready for use in your project.

> <b>Latest Version:</b> Please make sure you are using the latest version of the SaaSquatch library in your project.
> 
> Version info for the [SaaSquatch Maven Library](https://github.com/saasquatch/mobile-sdk-android-maven)


#### Manual install

There are 2 steps to manually install the SDK in your app:

* Import the library into your project.
* Reference the library in your module's `build.gradle` file.

##### Step 1: Import the library into your project

To add the SDK to your project, go to File -> New -> New Module.

Select *Import .JAR/.AAR Package* and hit "Next".

Click the "..." button next to the *File name* field, and locate `saasquatch-sdk-android-1.1.0.aar` within the zip and select it. Click "Finish" and your project will include the `saasquatch-sdk-android-1.1.0` module.


##### Step 2: Reference the library in your module's build.gradle file

Open up the `build.gradle` file for your module and add the following:

```gradle
// ...
dependencies {
    // ...
    compile project(':saasquatch-sdk-android-1.1.0')
}
```

Run a gradle sync and you will be able to use the SDK in your app.

### Usage

With the SaaSquatch SDK you can create/update participants within your referral program, track users' referrals and rewards, fetch user information, and lookup referral codes and links. In this way, the SDK provides the flexibility to work directly with the data from your referral program and display it in your mobile app.

The following steps of this guide will cover creating/updating a user in SaaSquatch, and then connecting a referral. This process will be broken down in the following components:

* Create/update a user in SaaSquatch.
* Lookup a Referrer info by referral code.
* Lookup information about referrals a user has made.

#### Signing Requests
The SaaSquatch Mobile SDK is build on our Open Endpoints API functionality, and requests are signed with [JWTs](/topics/json-web-tokens). More information about these API methods can be found in our [Open Endpoints](/api/openendpoints/#rate-limit) documentation.

#### Create/Update a User
The SaaSquatch mobile SDK includes a `userUpsert` method which can be used to create/update participants in your SaaSquatch project.

This method is helpful when programatically updating information about existing users within your program from within your app, as well as for registering new users who sign up from within your app.

Full details about the structure of the payload, and information that is returned, can be found in our [API reference](../../../api/methods/#open_create_user "Referral SaaSquatch REST API reference").

##### Attribute Referral
The `userUpsert` method can be used to attribute the Referred User's referral back to the correct Referrer.

This is accomplished by including the referral code of the Referrer as the `code` field within the `referredBy` object in the Refered User's user object. 

Use the Branch SDK to retrieve the Referrer's referral code automatically. Learn more about our [branch.io integration](/mobile/branch-metrics/). Alternatievly, ask the Referred User to enter the referral code of their Referrer when they signup in your app.

In the following example the referral code `JANEDOE` is applied to the Referred User to attribute their referral back to the correct Referrer.

##### Convert Referral
The `userUpsert` method can also be used to [convert a referral](/success/core-topics/#conversion).

This is accomplished by setting the `isConverted` field within the `referredBy` object in the Referred User's user object to `true`.

##### Example
User Object:
```java
// This is your tenant alias which identifies you with Referral SaaSquatch
String tenant = "SaaS";

// We register our user internally, then pass the user's information to Referral SaaSquatch
String userId = "abc_123";
String accountId = "abc_123";

JSONObject referredBy = new JSONObject();
try {
    userInfo.put("code", "JANEDOE");
    userInfo.put("isConverted", false);
}catch (JSONException e) {
    Log.e("MyActivity", e.getLocalizedMessage());
}

JSONObject userInfo = new JSONObject();
try {
    userInfo.put("id", userId);
    userInfo.put("accountId", accountId);
    userInfo.put("email", "john@example.com");
    userInfo.put("firstName", "John");
    userInfo.put("lastName", "Doe");
    userInfo.put("locale", "en_US");
    userInfo.put("referralCode", "JOHNDOE");
    userInfo.put("referredBy": referredBy);
} catch (JSONException e) {
    Log.e("MyActivity", e.getLocalizedMessage());
}
```

Using the above user object, call the `userUpsert` method:

```java
// Upsert a user with Referral Saasquatch
Saasquatch.userUpsert(tenant, userId, accountId, token, userInfo, this,
    new Saasquatch.TaskCompleteListener() {
        @Override
        public void onComplete(JSONObject userInfo, String errorMessage, Integer errorCode) {

            // Code to be executed after the async task returns
        }
    });
```

The method provides a `TaskCompleteListener` which will be called with `userInfo`, `errorMessage` and `errorCode`. The JSONObject `userInfo` contains the returned information about the user. If there was an error, `errorMessage` contains a description of what went wrong, and `errorCode` contains an Integer indicating the HTTP status code returned by the server, or 0 if there was some other error. If `errorMessage` and `errorCode` are null then `userInfo` will exist and vice versa.

Within the listener the returned data can be saved for later.

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

#### Lookup the Referrer
Using the referral code retrieved from the branch deeplinking data you can lookup who the referrer is. This info can then be used to personalize the referral experience for the Referred Visitor (e.g. by including the Referrer’s name on the opening screen of your app).

The following example shows looking up the information of the Referrer associated with the referral code `JANEDOE`:

```java
Saasquatch.getUserByReferralCode(tenant, "JANEDOE", token, MyActivity.this,
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

#### List Referrals

As part of the referral experience within your app, it's recommended to include a list of the referrals that a user has made. This can help them track the progress of their pending referrals, and see how many rewards they have earned.

The `listReferralsForTenant` method can be used to lookup a list of referrals made by a user in your program. 
Further details about the structure of the payload, and the information that is returned by this method, can be found in the [SaaSquatch
docs](../../../api/methods/#open_list_referrals "Referral SaaSquatch REST API reference").

The following example details looking up the referrals that have been made by the user John Doe (accountId `abc_123`, userId `abc_123`). The method accepts John's userId and accountId, and returns the list of referrals in `userInfo`.


```java
Saasquatch.listReferralsForTenant(tenant, token, accountId, userId, null, null, null, null, null, null, MyActivity.this,
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

### Done!
For a detailed description of the `Saasquatch` class and it's public methods, please visit the [Android SDK reference](/mobile/android/docs/com/wholepunk/saasquatch/Saasquatch.html).

More information is available about the REST API [Open Endpoints](/api/openendpoints/) which underpin the SaaSquatch mobile SDK functionality.

The github repository for the SaaSquatch <a href="https://github.com/saasquatch/mobile-sdk-android-maven" title="Android">Android SDK <i class="fa fa-github" aria-hidden="true"></i></a> is also available for reference.


