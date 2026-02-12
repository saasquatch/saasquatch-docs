---
title: Branch Metrics Integration - Quickstart
highlights: "SaaSquatch integrates with [Branch Metrics](http://branch.io) to provide additional attribution, personalization, and analytics for mobile app referral programs by using Branch's deep links."
slug: mobile/branch-metrics
sectionType: guide
template: hasTableOfContents.html
date: 2022-01-11
---

This Quickstart Guide outlines the core steps involved in setting up your mobile app to work with Branch Metrics and your referral program. 

### Configuring Branch for your App

A Branch Metrics account is needed in order to integrate the Branch functionality into your referral program. 

#### Creating an account

Branch is a free platform.
If you don't have a Branch account yet, you can sign up for one for free from [branch.io](https://branch.io). All that's required is a valid email account.

#### Connecting up your app
Select the Link Settings item from under the Channels & Links heading on the left sidebar in the Branch dashboard. Configuring these link settings will allow Branch to correctly direct mobile users to your app store page to install your app.

Make sure to configure Redirects for all the platforms where you have an app. Leave the custom landing page for desktop field empty as that will be set in the SaaSquatch portal.

![Branch Metrics link settings](/assets/images/contentful/branch-metrics-link-settings_bCzKMbCGjuekScAuE6k24.png)

---

### Connecting Branch to your SaaSquatch Account <a name="saasquatchAccount"></a>

<div class="bs-callout bs-callout-warning">
<h4>Live vs. Test</h4>
Just like you have a [Live and Test tenant](/success/using-referral-saasquatch/#test-vs-live) in your SaaSquatch, you also have a live and test version of your Branch dashboard. To fully connect your Branch account you will need to perform the following steps for both the Live and Test versions.<br><br>

The setting to switch between Live and Test in the SaaSquatch portal is in the top left. The setting to switch between Live and Test in Branch is in the top right.
</div>

1.  Retrieve the Branch Key from the Account Settings tab of the Setup & Testing section inside of [your Branch dashboard](https://dashboard.branch.io).
![Branch Metrics API key](/assets/images/contentful/Branch_Metrics_API_key_5ZVY6gXBzGMigEoca8Gmeo.png)

2.  Log into your [Saasquatch portal](https://app.referralsaasquatch.com/) and go the Settings tab on the right-hand side of the top menu bar. Then, select Integrations in the middle of the new menu that appears below the main navigation.  

3.  Open up the Branch integration settings using the chevron, paste your Branch Key into the field, and click connect. 

![Connect Branch](/assets/images/contentful/Screen_Shot_2019-09-10_at_11.22.29_AM_3pwbqpiFq1TdCMvBbvA5me.png)

4.  Repeat the same process to link your Live tenant to Branch.

### Updating your mobile app

To access the Branch deep link data in your app you need to install the Branch SDK into your mobile apps. [Branch's documentation](https://start.branch.io/#/integrate-sdk/steps) includes a full walk-through of everything you need to do to add the SDK to an app.

Once you’ve got your app set up and you’ll able to retrieve the deep link data from Branch when your app is opened. This data contains information about the referral. You can use this data to customize the login/signup experience for new users.

Here is an example of the Saasquatch [keys and values](/mobile/branch-metrics/reference/#data-fields) from the Branch deep link data: 

```json
{
    "code" : "BRITTANYTEST2",
	"$desktop_url" : "http:\/\/landingpage.com\/a\/test_a6whcgrt0vcw3\/widgets\/referral?code=BRITTANYTEST&referralMedium=DIRECT&referralSource=STANDARD",
	"sq_accountId" : "55a43496ebbaff9cf86443d3",
	"sq_amount" : "10",
	"sq_firstName" : "Brittany",
	"sq_id" : "55a43496ebbaf01cebac42cb",
	"sq_imageUrl" : "http:\/\/gravatar.com\/avatar\/77af7eba41d1ccad2bf2c13704637c25?d=mm",
	"sq_lastName" : "Test",
	"sq_referralCode" : "BRITTANYTEST2",
	"sq_type" : "PCT_DISCOUNT",
	"sq_unit" : "PERCENT",
	"~channel" : "DIRECT",
	"~tags" : ["STANDARD"],
	"~creation_source" : "API",
	"+is_first_session" : false,
	"+clicked_branch_link" : true
}
```

The most important value there is `sq_referralCode`. That's the one you need to attribute the referral. This way you know who brought the referred user to your product.

For a full technical reference of data fields and behaviour, check out our Branch Metrics [Integration Reference](/mobile/branch-metrics/reference).

### Deep linking on iOS

- Follow the [Branch SDK Integration Guide](https://dev.branch.io/getting-started/sdk-integration-guide/guide/) to setup your app for use with Branch.
- Familiarize yourself with the Branch [iOS Deep Link Routing Guide](https://dev.branch.io/getting-started/deep-link-routing/guide/ios/). The following setup steps are based on this document. Additional information about deep linking is available on their [github](https://github.com/BranchMetrics/ios-branch-deep-linking) page.

#### Start a Branch Session
To configure a View Controller to accept deep links, open the view controller that you want to appear when a user clicks a link. 

Import the Branch framework:

```
import Branch
```

Register your view controller for the delegate `BranchDeepLinkController`:
```
class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {
```
Receive the delegate method that will be called when the view controller is loaded from a link click:
```
func configureControl(withData params: [AnyHashable: Any]!) {
   let dict = params as Dictionary
   if dict["sq_referralCode"] != nil {
	   // there is a referral code, the user was referred, do action
   }
}
```
Since the view controller is displayed modally, you should add a close button:
```
var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
func closePressed() {
   self.deepLinkingCompletionDelegate!.deepLinkingControllerCompleted()
}
```

#### Handle Incoming Links
You now need to tell Branch about the view controller you just configured, and which key it is using from the link’s data dictionary. 

In your AppDelegate.swift file, find this method inside `didFinishLaunchingWithOptions`
(you would have added it in the [SDK Configuration Guide](https://dev.branch.io/getting-started/sdk-integration-guide/guide/)):
```
branch.initSession(launchOptions: launchOptions, deepLinkHandler: { params, error in
   if error == nil {
       // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
       // params will be empty if no data found
       // ... insert custom logic here ...
       print("params: %@", params.description)
   }
})
```
Remove it, and insert this snippet in the same place:

```
var controller = UIStoryboard.init("Main", NSBundle.mainBundle()).instantiateViewControllerWithIdentifier("DeepLinkingController")

branch.registerDeepLinkController(controller, forKey: "sq_referralCode")
branch.initSession(launchOptions: launchOptions, automaticallyDisplayDeepLinkController: true)
```
Now whenever your app launches from a Branch link that has the `sq_referralCode` key set in its data dictionary, the `ExampleDeepLinkingController` view controller will be displayed!

#### Example [Swift]
The following example makes use of the Branch SDK to perform custom logic if the user that opened the app was referred.

Inside the `andRegisterDeepLinkHandler` callback in your AppDelegate, you will want to examine the params dictionary to determine whether the user followed a referral link. If the user was referred perform som custom logic (could be to retrieve the deep link data for use elsewhere in your app).
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
   let branch: Branch = Branch.getInstance()
   branch.initSession(launchOptions: launchOptions, deepLinkHandler: { params, error in
       // If the key 'sq_referralCode' is present in the deep link dictionary
       if error == nil && params["+clicked_branch_link"] != nil && params["sq_referralCode"] != nil {
           // user was referred, perform custom logic
           referralCode = params["sq_referralCode"]
       } else {
           // user was not referred, load your normal view
       }
   })
   return true
}
```

#### Next Steps
With access to the Branch deep linking data (like referral code) you know that the user was referred. You can use this information when the user is signing up. 

If the referred user needs a reward applied at signup use the `sq_amount` amount to determine what their reward should be.

Use the referral code `sq_referralCode` to attribute the referral when you identify the user to Referral SaaSquatch. This can be done using the mobile widget or Mobile SDK.

### Deep Linking on Android
- Follow the [Branch SDK Integration Guide](https://dev.branch.io/getting-started/sdk-integration-guide/guide/) to setup your app for use with Branch.
- Familiarize yourself with the Branch [Android Deep Link Routing Guide](https://dev.branch.io/getting-started/deep-link-routing/guide/android/). The following setup steps are based on this document. Additional information is available in their [github](https://github.com/BranchMetrics/android-branch-deep-linking) page about deep linking.

#### Start a Branch Session

A Branch session needs to be started each time the app opens. We check to see if the user came from a branch link and if so, the callback method returns any deep link parameters for that link.

```java
Branch branch = Branch.getInstance(getApplicationContext());
branch.initSession(new Branch.BranchReferralInitListener() {
	@Override
	public void onInitFinished(JSONObject referringParams, BranchError error) {

		// TODO: Store this code in the current session, to connect attribution post-signup (see next step)
        String referralCode = referringParams.getString("sq_referralCode");

    }
});
```
#### Example [Android]
The following example makes use of the Branch SDK to customize the login/signup experience for new users.

```java
@Override
public void onStart() {
    super.onStart();

    Branch branch = Branch.getInstance(getApplicationContext());
    branch.initSession(new Branch.BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                Log.i("BranchConfigTest", "deep link data: " + referringParams.toString());

                if (referringParams.has("sq_firstName")) {
                    try {
                        //setup referrer name
                        TextView referrerName = (TextView) findViewById(R.id.referrer_name);
                        String displayText = referringParams.getString("sq_firstName") + " " 
                        	+ referringParams.getString("sq_lastName");
                        displayText += " recommends that you try Example App.";
                        referrerName.setText(displayText);

                        //setup referrer image
                        WebView referrerImage = (WebView) findViewById(R.id.referrer_image);
                        referrerImage.loadUrl(referringParams.getString("sq_imageUrl"));

                        //setup referral reward
                        String rewardText = "You'll get $" + referringParams.getString("sq_amount") +
                        	" credit for signing up!";
                        TextView reward = (TextView) findViewById(R.id.reward);
                        reward.setText(rewardText);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }, this.getIntent().getData(), this);
}
```

#### Next Steps
With access to the Branch deep linking data (like referral code) you know that the user was referred. You can use this information when the user is signing up. 

If the referred user needs a reward applied at signup use the `sq_amount` amount to determine what their reward should be.

Use the referral code `sq_referralCode` to attribute the referral when you identify the user to Referral SaaSquatch. This can be done using the mobile widget or Mobile SDK.