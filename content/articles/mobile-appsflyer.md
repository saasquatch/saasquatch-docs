---
title: AppsFlyer Integration - Quickstart
highlights: "SaaSquatch integrates with [AppsFlyer](https://www.appsflyer.com) to provide additional attribution, personalization, and analytics for mobile app referral programs by using AppsFlyer's OneLinks."
slug: mobile/appsflyer
sectionType: guide
template: hasTableOfContents.html
date: 2022-12-29
---

This Quickstart Guide outlines the core steps involved in setting up your mobile app to work with AppsFlyer and your referral program.

### Configuring AppsFlyer for your App

An AppsFlyer account is needed in order to integrate the AppsFlyer functionality into your SaaSquatch project.

#### Creating an account

AppsFlyer offers a free plan for app owners with the option to upgrade for added features. If you don’t have an AppsFlyer account yet, you can sign up for one for free through [AppsFlyer](https://www.appsflyer.com/). All that is required is a valid email account.

After adding your app to AppsFlyer, go to your [dashboard](https://hq1.appsflyer.com/).

#### Activate SaaSquatch as an Integrated Partner

SaaSquatch is an Appsflyer Integrated Partner. Our partner ID is `saasquatch_int`. To enable the partner integration, from your [dashboard](https://hq1.appsflyer.com/):

- Select Integrated Partners from the left sidebar
- Search for SaaSquatch

![Appsflyer Partner Integration 1](/assets/images/contentful/appsflyer1_5JM7oBxEnlnzfHCxEYm5NB.png)

- Select the SaaSquatch partner
- Enable the toggle Activate partner
- Select Save Integration

![Appsflyer Partner Integration 2](/assets/images/contentful/appsflyer2_riHNFGxEIDp5E7WCRZgxp.png)

#### Configuring AppsFlyer OneLink

This method of configuring a OneLink with a correct Partner ID is based on Appsflyer's documentation [available here](https://support.appsflyer.com/hc/en-us/articles/207032246-OneLink-1-4-Converting-users-from-owned-media).

The limitation with this method is that you must use the Long URL version of the OneLink and you have to modify the link manually to add SaaSquatch's partner ID.

To create the OneLink, from your [dashboard](https://hq1.appsflyer.com/):

- Select the OneLink Custom Links heading on the left sidebar
- Create a OneLink Template for your application

![One Link 1](/assets/images/contentful/onelink1_5DisagIOWpLe1aQALIA35y.png)

- Add a Custom link with a name and subdomain of your choice

![One Link 2](/assets/images/contentful/onelink2_1TyNevgKDflzIDNGFmK8oz.png)

- Configure your custom link and the fields for mobile redirection and deep linking under the redirecting & deep linking tab. Be sure to leave the field for **when the link is clicked on desktop empty**. SaaSquatch will fill in the `af_web_dp` field dynamically so that the desktop landing page can be configured from within the SaaSquatch portal

- On the Attribution tab, set the Custom media source as "CHANGEME", as it will need to be changed manually in the final link.

![One Link 3](/assets/images/contentful/onelink3_44eKlGpT203R7cK6IkpyX.png)

- Click Generate Link
- In the modal, expand the Long URL and copy it

![One Link 4](/assets/images/contentful/onelink4_2Z2kMeRrkwu4XfmLVpG0wX.png)

- Replace **"CHANGEME"** in the link with **"saasquatch_int"**, this is the URL you will add to the SaaSquatch configuration in the Portal.

For example, if your Long URL is:

> https://my-one-link-for-saasquatch.onelink.me/JFlJ?pid=CHANGEME&c=MyCampaign

You will need to use the following URL in SaaSquatch:

> https://my-one-link-for-saasquatch.onelink.me/JFlJ?pid=saasquatch_int&c=MyCampaign

#### Configure SaaSquatch

- Log into your SaaSquatch portal
- Go to Settings -> Integrations
- Find the AppsFlyer integration and click Enable Appsflyer
- Paste your modified Long URL into the link field
- Save the integration configuration

![One Link 5](/assets/images/contentful/onelink5_2WjnvJ7BpdGVZaOb2o8XnK.png)

You are now setup to use Appsflyer with SaaSquatch!

---

### Connecting AppsFlyer to your SaaSquatch Account <a name="saasquatchAccount"></a>

<div class="bs-callout bs-callout-warning">
<h4>Live vs. Test</h4>
We recommend testing any new integration on your SaaSquatch Test Tenant before launching it on your Live Tenant. Since AppsFlyer does not offer a test environment, we suggest creating a test custom link first then following the steps below to connect the integration on your SaaSquatch Test Tenant.<br><br>

Once you have tested the integration thoroughly and are happy with the configuration, you can make a new custom link in AppsFlyer and repeat the setup steps for your Live Tenant.

</div>

![AppsFlyer OneLink](/assets/images/contentful/Screen_Shot_2020-08-19_at_9.19.49_AM_2uSiq77jQfNQpp3ZoC4U4Y.png)

1. Retrieve the short URL for your desired AppsFlyer link, located on the OneLink Custom Links tab of your [AppsFlyer Dashboard](https://hq1.appsflyer.com/)

2. Log into your [Saasquatch portal](https://app.referralsaasquatch.com) and go the Settings > Integrations > AppsFlyer Integration

3. Open up the AppsFlyer integration settings using the chevron and click Enable AppsFlyer

4. Paste your short URL into the AppsFlyer base attribution link field and click Save

Please note that the URL you provide will be used for all of your SaaSquatch programs.

### Updating your Mobile App

To access the AppsFlyer deep linking data from within your mobile application you will need to install the AppsFlyer SDK. The AppsFlyer documentation contains all the steps required to get their SDK setup on your application.

Once set up, you can retrieve the deep link data from AppsFlyer. This data contains information about the referral and can be used to attribute the referral and customize the signup experience for new users.

AppsFlyer may add other parameters depending on how your OneLink is configured. The most important parameter from the SaaSquatch side is `_saasquatch`, or the equivilant `deep_link_sub1` if you are using Unified Deep Linking, which contains the referral code and sharelink used for the referral and are needed for attributing the referral. For more detail on data fields and behaviour, check out our AppsFlyer [Integration Reference](/mobile/appsflyer/reference).

Here is an example of the SaaSquatch data that will be appended to the AppsFlyer onelink:

<ul class="nav nav-tabs" id="deep-linking-example">
<li class="active">
  <a data-toggle="tab" data-target=".example-unified">
    Unified Deep Linking
  </a>
</li>
<li>
  <a data-toggle="tab" data-target=".example-legacy">
    Legacy Deep Linking
  </a>
</li>
</ul>
<div class="tab-content">
<div class="tab-pane example-unified active">
<pre><code>
{
  "pid": "saasquatch_int",
  "c": "saasquatch",
  "af_web_dp": "http://myReferralLandingPage.com",
  "deep_link_sub1": "eyJhcHAucmVmZXJyYWxzYWFzcXVhdGNoLmNvbSI6eyJ0ZXN0XzEyMzQ1NjdfQ09ERSI6eyJjb2RlcyI6eyJyZWZlcnJhbCI6IlJFRkVSUkFMQ09ERSJ9LCJjb2Rlc0V4cCI6eyJSRUZFUlJBTENPREUiOjE2Mjk1ODIxOTl9LCJsaW5rcyI6eyJyZWZlcnJhbCI6Imh0dHBzOi8vc3NxdC5jby9temFBMjIifSwibGlua3NFeHAiOnsiaHR0cHM6Ly9zc3F0LmNvL216YUEyMiI6MTYyOTU4MjE5OX19fX0=",
  "deep_link_sub2": "invite",
  "deep_link_sub3": "link",
  "deep_link_sub4": "saasquatch",
  "deep_link_sub5": "REFERRALCODE",
  "deep_link_sub6": "UNKNOWN",
  "deep_link_sub7": "UNKNOWN"
}
</code></pre>
</div>
<div class="tab-pane example-legacy">
<pre><code>
{
  "pid": "saasquatch_int",
  "c": "saasquatch",
  "af_web_dp": "http://myReferralLandingPage.com",
  "utm_source": "invite",
  "utm_medium": "link",
  "utm_campaign": "saasquatch",
  "rsCode": "REFERRALCODE",
  "rsShareMedium": "UNKNOWN",
  "rsEngagementMedium": "UNKNOWN",
  "_saasquatch": "eyJhcHAucmVmZXJyYWxzYWFzcXVhdGNoLmNvbSI6eyJ0ZXN0XzEyMzQ1NjdfQ09ERSI6eyJjb2RlcyI6eyJyZWZlcnJhbCI6IlJFRkVSUkFMQ09ERSJ9LCJjb2Rlc0V4cCI6eyJSRUZFUlJBTENPREUiOjE2Mjk1ODIxOTl9LCJsaW5rcyI6eyJyZWZlcnJhbCI6Imh0dHBzOi8vc3NxdC5jby9temFBMjIifSwibGlua3NFeHAiOnsiaHR0cHM6Ly9zc3F0LmNvL216YUEyMiI6MTYyOTU4MjE5OX19fX0="
}
</code></pre>
</div>
</div>

---

### Unified Deep Linking on iOS

Prior to implementing deep linking in your mobile application, be sure to follow the AppsFlyer [IOS SDK initial setup documentation](https://dev.appsflyer.com/hc/docs/initial-setup-2) to initialize and implement the SDK in your application and read their [IOS developer documentation](https://dev.appsflyer.com/docs/ios) for general information on setting up deep linking within your application.

#### Swift Sample Code for Unified Deep Linking:

Once you have followed the [steps to setup unified deep linking](https://dev.appsflyer.com/hc/docs/unified-deep-linking-udl-1) and configured the Appsflyer integration in SaaSqautch, referral information will be available in the `deep_link_sub1` through `deep_link_sub7` params. Below is a modified code example showing how to extract the `_saasquatch` SaaSquatch cookie from the DeepLink data.

```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  ...
  AppsFlyerLib.shared().deepLinkDelegate = self
  ...
}

// For Swift version < 4.2 replace function signature with the commented out code
// func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool { // this line for Swift < 4.2
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
  AppsFlyerLib.shared().continue(userActivity, restorationHandler: nil)
  return true
}

// Open URI-scheme for iOS 9 and above
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  AppsFlyerLib.shared().handleOpen(url, options: options)
  return true
}

extension AppDelegate: DeepLinkDelegate {
    func didResolveDeepLink(_ result: DeepLinkResult) {

        switch result.status {
        case .notFound:
            NSLog("[AFSDK] Deep link not found")
            return
        case .failure:
            print("Error %@", result.error!)
            return
        case .found:
            NSLog("[AFSDK] Deep link found")
        }

        guard let deepLinkObj:DeepLink = result.deepLink else {
            NSLog("[AFSDK] Could not extract deep link object")
            return
        }

        if deepLinkObj.clickEvent.keys.contains("deep_link_sub1") {
            let saasquatchCookie:String = deepLinkObj.clickEvent["deep_link_sub1"] as! String
            NSLog("[AFSDK] AppsFlyer: _saasquatch param: \(saasquatchCookie)")
        } else {
            NSLog("[AFSDK] Could not extract _saasquatch param")
        }

        let deepLinkStr:String = deepLinkObj.toString()
        NSLog("[AFSDK] DeepLink data is: \(deepLinkStr)")

        if( deepLinkObj.isDeferred == true) {
            NSLog("[AFSDK] This is a deferred deep link")
        }
        else {
            NSLog("[AFSDK] This is a direct deep link")
        }

        // ...
    }
}

```

### Unified Deep Linking on Android

Prior to implementing deep linking in your mobile application, be sure to follow the AppsFlyer [Android SDK initial setup documentation](https://dev.appsflyer.com/hc/docs/initial-setup-for-deep-linking-and-deferred-deep-linking) to initialize and implement the SDK in your application and read their [Android developer documentation](https://dev.appsflyer.com/docs/android) for general information on setting up deep linking within your application.

#### Java Sample Code for Unified Deep Linking:

Once you have followed the [steps to setup unified deep linking](https://dev.appsflyer.com/hc/docs/unified-deep-linking-udl) and configured the Appsflyer integration in SaaSqautch, referral information will be available in the `deep_link_sub1` through `deep_link_sub7` params. Below is a modified code example showing how to extract the `_saasquatch` SaaSquatch cookie from the DeepLink data.

```
appsflyer.subscribeForDeepLink(new DeepLinkListener(){
            @Override
            public void onDeepLinking(@NonNull DeepLinkResult deepLinkResult) {
                DeepLinkResult.Status dlStatus = deepLinkResult.getStatus();
                if (dlStatus == DeepLinkResult.Status.FOUND) {
                    Log.d(LOG_TAG, "Deep link found");
                } else if (dlStatus == DeepLinkResult.Status.NOT_FOUND) {
                    Log.d(LOG_TAG, "Deep link not found");
                    return;
                } else {
                    // dlStatus == DeepLinkResult.Status.ERROR
                    DeepLinkResult.Error dlError = deepLinkResult.getError();
                    Log.d(LOG_TAG, "There was an error getting Deep Link data: " + dlError.toString());
                    return;
                }
                DeepLink deepLinkObj = deepLinkResult.getDeepLink();
                try {
                    Log.d(LOG_TAG, "The DeepLink data is: " + deepLinkObj.toString());
                } catch (Exception e) {
                    Log.d(LOG_TAG, "DeepLink data came back null");
                    return;
                }
                // An example for using is_deferred
                if (deepLinkObj.isDeferred()) {
                    Log.d(LOG_TAG, "This is a deferred deep link");
                } else {
                    Log.d(LOG_TAG, "This is a direct deep link");
                }

                if (dlData.has("deep_link_sub1")){
                    _saasquatch = deepLinkObj.getStringValue("deep_link_sub1");
                    Log.d(LOG_TAG, "The SaaSquatch cookie is: " + _saasquatch);
                } else {
                    Log.d(LOG_TAG, "deep_link_sub1/_saasquatch not found");
                }

                // ...
            }
        });
```

---

### Legacy Deep Linking on iOS

Prior to implementing deep linking in your mobile application, be sure to follow the AppsFlyer [IOS SDK integration documentation](https://support.appsflyer.com/hc/en-us/articles/207032066-iOS-SDK-V5-integration-for-developers#introduction) to initialize and implement the SDK in your application and read their [IOS developer documentation](https://dev.appsflyer.com/docs/ios) for general information on setting up deep linking within your application. We also recommend following [AppsFlyer’s four part guide](https://support.appsflyer.com/hc/en-us/articles/207032246) outlining the steps to getting deep linking set up on your mobile application.

#### Configuring and Initializing the SDK

In AppDelegate.swift, import AppsFlyerLib and add the AppsFlyerTrackerDelegate to the class declaration.

```
import AppsFlyerLib
class AppDelegate: UIResponder, UIApplicationDelegate, AppsFlyerTrackerDelegate {
   // your code here
}
```

Use the [code in the AppsFlyer docs](https://support.appsflyer.com/hc/en-us/articles/207032066-iOS-SDK-V5-integration-for-developers#integration-33-initializing-the-sdk) to initialize the SDK with your [app ID](https://support.appsflyer.com/hc/en-us/articles/207377436) taken from iTunes Connect and your [AppsFlyer dev key](https://support.appsflyer.com/hc/en-us/articles/211719806). The app ID is digits only, without the "id" prefix. The code supports iOS 13 and scene delegate. You can use it even if the app doesn't support scene delegate.

In order to support deep linking, add [code found in the AppsFlyer docs](https://support.appsflyer.com/hc/en-us/articles/207032066-iOS-SDK-V5-integration-for-developers#integration-34-support-for-scene-delegate) to SceneDelegate for every scene your app supports deep linking into. For more information visit AppsFlyer’s [IOS SDK Integration documentation](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS#integration-3-implementing-and-initializing-the-sdk).

#### Getting Deep Link Data

The AppsFlyer SDK returns the deep linked conversion data through two dedicated methods.

- `onConversionDataSuccess` is used for User Acquisition (UA) and re-attribution conversions, holding the full cached attribution data.
- `onAppOpenAttribution` is used for re-engagement conversions as it uses the `attributionData` map to dispatch other activities in the app and pass relevant data.

To connect your referrals and optimize the landing experience for both new and existing users you will need to implement the logic for both direct and deferred deep linking. For more detail visit the AppsFlyer documentation outlining how to get [conversion data on IOS](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS#core-apis-6-deep-linking-with-onelink) and how to get [conversion data on Android](https://support.appsflyer.com/hc/en-us/articles/207032126-Android-SDK-integration-for-developers#core-apis-7-get-conversion-data).

##### Swift Sample Code for legacy direct deep linking:

When a OneLink is clicked and the user has the app installed on their device, the `onAppOpenAttribution` method is called by the AppsFlyer SDK. This is referred to as a retargeting re-engagement.

The deep link calls the `onAppOpenAttribution` method in the AppDelegate. The parameters in the method input are used to implement the specific user experience when the application is opened.

```
func onAppOpenAttribution(_ attributionData: [AnyHashable: Any]) {
    //Handle Deep Link Data
    print("onAppOpenAttribution data:")
    for (key, value) in attributionData {
        print(key, ":",value)
    }
    walkToSceneWithParams(params: attributionData)
}

// User logic
fileprivate func walkToSceneWithParams(params: [AnyHashable:Any]) {
    let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
    UIApplication.shared.windows.first?.rootViewController?.dismiss(animated: true, completion: nil)

    var referralData = ""

    if let cookie = params["_saasquatch"] as? String {
        referralData = cookie
    }

/* insert custom logic here to handle user landing experience in app. Depending on your referral flow and signup process, make sure you handle/store the SaaSquatch attribution data in your application so that on signup you can complete the attribution.
*/

}

func onAppOpenAttributionFailure(_ error: Error) {
    print("\(error)")
}
```

See AppsFlyer Developer Documentation for [direct deep linking](https://dev.appsflyer.com/docs/direct-deep-linking) on iOS and Android.

##### Swift Sample Code for legacy deferred deep linking:

For deferred deep linking, the `onConversionDataSuccess` method input must be planned and the input decided in the previous section (for deep linking) is made relevant for the first time the app is launched.

When the app is opened for the first time, the `onConversionDataSuccess` method is triggered in the main activity. The parameters in the method input are used to implement the specific user experience when the app is first launched.

```
// Handle Organic/Non-organic installation
func onConversionDataSuccess(_ data: [AnyHashable: Any]) {
    print("onConversionDataSuccess data:")
    for (key, value) in data {
        print(key, ":", value)
    }

    if let status = data["af_status"] as? String {
        if (status == "Non-organic") {
            if let sourceID = data["media_source"],
                let campaign = data["campaign"] {
                print("This is a Non-Organic install. Media source: \(sourceID) Campaign: \        (campaign)")
            }
        } else {
            print("This is an organic install.")
        }
        if let is_first_launch = data["is_first_launch"] as? Bool,
            is_first_launch {
            print("First Launch")
            if let _saasquatch = data["_saasquatch"]
            {
                // The key '_saasquatch' exists only in OneLink originated installs from a SaaSquatch program
                print("deferred deep-linking params: \(_saasquatch)")
                walkToSceneWithParams(params: data)            }
            else {
                print("Install from a non-owned media")
            }
        } else {
            print("Not First Launch")
        }
    }
}

func onConversionDataFail(_ error: Error) {
    print("\(error)")
}
```

See AppsFlyer Developer Documentation for [deferred deep linking](https://dev.appsflyer.com/docs/deferred-deep-linking) on iOS and Android.

---

### Legacy Deep Linking on Android

Prior to implementing deep linking in your mobile application, be sure to follow the AppsFlyer [Android SDK integration documentation](https://support.appsflyer.com/hc/en-us/articles/207032126-Android-SDK-integration-for-developers#introduction) to initialize and implement the SDK in your application and read their [Android developer documentation](https://dev.appsflyer.com/docs/android) for general information on setting up deep linking within your application. We recommend going through [AppsFlyer’s four part guide](https://support.appsflyer.com/hc/en-us/articles/207032246) outlining the steps to getting deep linking set up on your mobile application.

#### Configuring and Initializing the SDK

To initialize the AppsFlyer Android SDK, you must do three things. Firstly, inside the app's global class, import the following libraries

```
import android.app.Application;
import android.util.Log;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.AppsFlyerConversionListener;
import java.util.Map;
```

Secondly, inside the global class, assign your dev key to a variable, preferably named AF_DEV_KEY.

```
public class AFApplication extends Application {
    private static final String AF_DEV_KEY = "MY_DEV_KEY";

    //...

}
```

Thirdly, in the AndroidManifest.xml file, inside the `application` tag, add the following line, replacing APP.PACKAGE.NAME with the app's package name and AFApplication with the name that you set for the app's global class.

```
android:name="APP.PACKAGE.NAME.AFApplication"
```

For more information visit AppsFlyer’s [Android SDK Integration documentation](https://support.appsflyer.com/hc/en-us/articles/207032126#integration-3-implementing-and-initializing-the-sdk).

---

### Next Steps

With access to the AppsFlyer deep linking data, you can now know when a mobile user was referred through a SaaSquatch program. Additionally you can use this information to enrich the mobile landing experience for your referred users.

Include the `_saasquatch` or `deep_link_sub1` value in the `cookies` field of a User Upsert to attribute the referral when you identify the user to SaaSquatch. This can be done using our [REST API](/api/methods/#open_user_upsert) or [Graphql API](/graphql/reference/) and upserting a user as shown below:

```
{
    "id": "219065",
    "accountId": "accc9065",
    "firstName": "Bob",
    "lastName": "Testerson",
    "email": "bob@example.com",
    "referable": true,
    "referralCode": "BOBTESTERSON",
    "locale": "en_US",
    "cookies":
"eyJhcHAucmVmZXJyYWxzYWFzcXVhdGNoLmNvbSI6eyJ0ZXN0XzEyMzQ1NjdfQ09ERSI6eyJjb2RlcyI6eyJyZWZlcnJhbCI6IlJFRkVSUkFMQ09ERSJ9LCJjb2Rlc0V4cCI6eyJSRUZFUlJBTENPREUiOjE2Mjk1ODIxOTl9LCJsaW5rcyI6eyJyZWZlcnJhbCI6Imh0dHBzOi8vc3NxdC5jby9temFBMjIifSwibGlua3NFeHAiOnsiaHR0cHM6Ly9zc3F0LmNvL216YUEyMiI6MTYyOTU4MjE5OX19fX0="
}
```
