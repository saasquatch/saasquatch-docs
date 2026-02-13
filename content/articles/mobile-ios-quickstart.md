---
title: iOS SDK Quickstart Guide
highlights: An installation walkthrough for the SaaSquatch iOS SDK, including explanations of common usage cases, and code examples.
slug: mobile/ios/quickstart/
sectionType: guide
template: hasTableOfContents.html
date: 2018-12-03
---

### Installation

The SaaSquatch mobile SDK for iOS is available through the industry standard [CocoaPods](https://cocoapods.org/pods/saasquatch-sdk-swift) format. 

CocoaPods is a dependency manager for Swift and Objective-C projects designed so that instead of having to manually import files to your project, CocoaPods does it for you. 

#### Install CocoaPods
If you do not have CocoaPods installed on your system, install it using the following Terminal command:

```$ sudo gem install cocoapods```

Navigate to the directory of the Xcode project you would like to install our SDK into.

If you do not already have a Podfile there, create one using the following Terminal command:

```$ pod init ```


#### Edit the Podfile

> <b>Latest Version:</b> Please make sure you are using the latest version of the SaaSquatch CocoaPod in your project.
> 
> Version info for [Swift CocoaPod](https://cocoapods.org/pods/saasquatch-sdk-swift)<br>
> Version info for [Objective-C CocoaPod](https://cocoapods.org/pods/saasquatch-sdk-objectivec)

For Swift projects, add the following to your Podfile:
```
# Uncomment this line to define a global platform for your project
# platform :ios, '9.0'
 
target 'CocoapodsTest' do
  # Comment this line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!
 
  # Pods for CocoapodsTest
  pod 'saasquatch-sdk-swift', '~> 2.0.0' 
end
```
For Objective-C projects, add the following to your Podfile:
``` 
# Uncomment this line to define a global platform for your project
# platform :ios, '9.0'
 
target 'CocoapodsTest' do
  # Comment this line if you're not using Swift and don't want to use dynamic frameworks
  # use_frameworks!
 
  # Pods for CocoapodsTest
  pod 'saasquatch-sdk-objectivec', '~> 1.2.1'
end
```

Save and close the Podfile, then run `$ pod install`.

### Including our Pod
Within your project's workspace (e.g. `CocoapodsTest.xcworkspace`) you will find both your project and the Pod project contain the SaaSquatch SDK.

If your project is written in Swift, add this to the top of your files:

```swift
import saasquatch
```

If your project is written in Objective-C, add this to the top of your files: 

```objective-c
#import "saasquatch.h"
```

> <b>Note:</b> you may receive an error that indicates no module called saasquatch was found. This just means your project needs to be built with the pod. Simply clean your project and build it again and this error will disappear. 

### Usage

With the SaaSquatch SDK you can create/update participants within your referral program, track users' referrals and rewards, fetch user information, and lookup referral codes and links. In this way, the SDK provides the flexibility to work directly with the data from your referral program and display it in your mobile app.

The following steps of this guide will cover creating/updating a user in SaaSquatch, and then connecting a referral. This process will be broken down in the following components:

* Create/update a user in SaaSquatch.
* Lookup Referrer info by referral code.
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
User object:

```swift
// This is your tenant alias which identifies you with Referral SaaSquatch
let tenant = "acpiocfij942"

// Set the SaaSquatch account and user ID to a unique value you have for each participant in your system
let userId = "abc_123"
let accountId = "abc_123"

let referredBy: [String: AnyObject] = [
    "code": "JANEDOE",
    "isConverted": true]

let userInfo: [String: AnyObject] = [
    "id": userId,
    "accountId": accountId,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "locale": "en_US",
    "referralCode": "JOHNDOE",
    "referredBy": referredBy]
```
Using the above user object, call the `userUpsert` method:

```swift
// Upsert a user with Referral Saasquatch
Saasquatch.userUpsert(tenant, withUserID: userId, withAccountID: accountId, withToken: token, withUserInfo: userInfo,
    completionHandler: {(userInfo: AnyObject?, error: NSError?) in

        // Code to be executed after the async call returns
})
```
The `userUpsert` method includes a `completionHandler` which runs after the async call returns. This completion handler is called with `userInfo` and `error`, and contains the returned user information or details about any errors (if any) that were encountered. If `error` is nil then `userInfo` will exist and vice versa.

In the following example the completion handler is used to parse the returned user data:
```swift
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

#### Lookup the Referrer
Using the referral code retrieved from the branch deeplinking data you can lookup who the referrer is. This info can then be used to personalize the referral experience for the Referred Visitor (e.g. by including the Referrer’s name on the opening screen of your app).

The following example shows looking up the information of the Referrer associated with the referral code `JANEDOE`:

```swift
Saasquatch.userByReferralCode("JANEDOE", forTenant: tenant, withToken: token,
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

#### List Referrals

As part of the referral experience within your app, it's recommended to include a list of the referrals that a user has made. This can help them track the progress of their pending referrals, and see how many rewards they have earned.

The `listReferralsForTenant` method can be used to lookup a list of referrals made by a user in your program. 
Further details about the structure of the payload, and the information that is returned by this method, can be found in the [SaaSquatch
docs](../../../api/methods/#open_list_referrals "Referral SaaSquatch REST API reference").

The following example details looking up the referrals that have been made by the user John Doe (accountId `abc_123`, userId `abc_123`). The method accepts John's userId and accountId, and returns the list of referrals in `userInfo`.

```swift
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

### Done!
For a detailed description of the `Saasquatch` class and it's public methods, please visit the iOS SDK reference for [Swift](/mobile/ios/docs-swift/Classes/Saasquatch.html) or [Objective-C](/mobile/ios/docs-objectivec/Classes/Saasquatch/index.html).

More information is available about the REST API [Open Endpoints](/api/openendpoints/) which underpin the SaaSquatch mobile SDK functionality.

The github repositories for the SaaSquatch iOS SDK framework for <a href="https://github.com/saasquatch/mobile-sdk-swift-cocoapod" title="Swift">Swift <i class="fa fa-github" aria-hidden="true"></i></a> and <a href="https://github.com/saasquatch/mobile-sdk-objectivec-cocoapod" title="Objective-C">Objective-C <i class="fa fa-github" aria-hidden="true"></i></a> apps are also available for reference.