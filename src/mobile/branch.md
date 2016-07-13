---
title: Branch Metrics Integration
highlights: |
    Referral SaaSquatch integrates with [Branch Metrics](http://branch.io) to provide additional attribution, personalization and analytics for mobile app referral programs by using Branch's deep links.
slug: mobile/branch-metrics
sectionType: mobile
template: hasTableOfContents.html
---

### Overview

There are two parts of integrating Referral Saasquatch with Branch Metrics: setting up the integration in our portal, and updating your mobile app to use the information Saasquatch will pass in when your customer clicks a share link and to complete the referral using our mobile widget.

 - Setting up a Branch account & app
 - Configuring SaaSquatch's Branch integration
 - Updating your mobile app

---


### Setting up a Branch account & app

In order to integrate Branch Metrics, you're going to need a Branch account and an app set up within Branch. 
If you already have one, skip straight to [Adding your Branch account to your Saasquatch account](#saasquatchAccount).

** Setting up an account **

Branch is a free platform.
If you don't have a Branch account yet, you can sign up for one for free from [branch.io](https://branch.io). All you need is a valid email account.

** Setting up an app **

Now you need to set up an app.
Branch's dashboard will walk you through this process. Don't worry about getting this perfect the first time, you can always add a new app any time from the dropdown menu in the top right corner. 
Once you have an app, you need to add your link settings.
This is where you tell Branch how to redirect customers who click your link on different platforms.
Add all the platforms where you have an app, but don't fill in a custom landing page for the desktop.
The desktop landing page will be the landing page you set in your Referral Saasquatch account.
When your link settings are filled in, you're ready to add your Branch account to your Saasquatch account.

![Branch Metrics link settings](/assets/images/mobile/branch-link-settings.png)

That's it! Your Branch app is ready to integrate.

---


### Adding your Branch account to your Saasquatch account <a name="saasquatchAccount"></a>

To add your Branch account to your Saasquatch account, you will need your Branch account key. This is found on the General tab of the Settings section inside of [your Branch dashboard](https://dashboard.branch.io).

![Branch Metrics api key](/assets/images/mobile/branch-api-key.png)

Now you need to log into the Saasquatch portal and go the Integrations section. Open up the Branch integration using the chevron, copy your Branch api key into the field, and click connect. If you need to disconnect your integration for any reason, just go back to the Integrations page, open up your integration using the chevron, and click Disconnect:

![Referral Saasquatch integration connection process](/assets/images/mobile/connect-branch-integration.gif)

That's it for portal setup! Saasquatch takes over from here and automatically creates Branch deep links when your customers open up our referral widget or when you request a set of share links using our API.
For a full technical reference of this behaviour, check out the [Branch Metrics Technical Reference](/mobile/branch-metrics/reference).

### Updating your mobile app

To use Saasquatch and Branch together, you're going to need to install the Branch SDK into your mobile apps. [Branch's documentation will walk you through everything you need to do to add the SDK to an app](https://start.branch.io/#/integrate-sdk/steps).

Once you've got your app set up and you're able to get the JSON data from Branch when your app is opened, you can use that data to set up a friendly landing page with the referrer's name and picture.

Here is an example of the Saasquatch keys and values you will see inside the JSON data you get from Branch: 

```json
{
    "code" : "BRITTANYTEST",
	"$desktop_url" : "http:\/\/landingpage.com\/a\/test_a6whcgrt0vcw3\/widgets\/referral?code=BRITTANYTEST&referralMedium=DIRECT&referralSource=STANDARD",
	"sq_accountId" : "55a43496ebbaff9cf86443d3",
	"sq_amount" : "10",
	"sq_firstName" : "Brittany",
	"sq_id" : "55a43496ebbaf01cebac42cb",
	"sq_imageUrl" : "http:\/\/gravatar.com\/avatar\/77af7eba41d1ccad2bf2c13704637c25?d=mm",
	"sq_lastName" : "Test",
	"sq_referralCode" : "BRITTANYTEST",
	"sq_type" : "PCT_DISCOUNT",
	"sq_unit" : "PERCENT",
	"~channel" : "DIRECT",
	"~tags" : ["STANDARD"],
	"~creation_source" : "API",
	"+is_first_session" : false,
	"+clicked_branch_link" : true
}
```

The most important value there is `sq_referralCode`. That's the one you need to complete the referral so that both the referrer and referree get their rewards and tell more friends how great you are.

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

To complete the referral you need to use our [mobile widget](/mobile/widget/). To load the widget you will need to craft a url with a number of GET parameters, including the new user's account id and user id from your system, as well as the referral code from `sq_referralCode` (the referral code is required in this case because it's the only way to connect the new user with their referrer from a deep link), then use it to load the mobile widget to display to your new customer. For security we recommend that you generate this url on your server and include a checksum, which will help prevent fraudulent referrals.

```java
String tenantAlias = "test_example";

Uri.Builder builder = new Uri.Builder();
builder.scheme("https")
    .authority("app.referralsaasquatch.com")
    .appendPath("a")
    .appendPath(tenantAlias)
    .appendPath("widgets").appendPath("mobilewidget")
    .appendQueryParameter("userId", user.getId())
    .appendQueryParameter("firstName", user.getFirstName())
    .appendQueryParameter("accountId", user.getCompanyId())
    .appendQueryParameter("email", user.getEmail())
    // If status is available, include it here to trigger conversions
    .appendQueryParameter("accountStatus", "PAID")
    
    // TODO: connect the `referralCode` field from Branch deeplink to trigger attribution (See previous step)
    .appendQueryParameter("referralCode", referralCode)
    
    .appendQueryParameter("paymentProviderId", "NULL");

String widgetUrl = builder.build().toString();

WebView webview = new WebView(this);
webview.getSettings().setJavaScriptEnabled(true);
webview.loadUrl(widgetUrl);
```

We also recommend having a place in your app where a user can enter their friend's referral code directly. We use short codes that are easy to type so that users can share them face to face as well as sending links.


### A more complete Branch SDK Example (android)

Here's a more complete example of using the Branch SDK to customize the login/signup experience for new users.

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

<div class="bs-callout bs-callout-warning">
  <h4>Technical Reference</h4><a name="reference"></a>
  
  For a full technical reference of data fields and behaviour, check out the [Branch Metrics Reference](/mobile/branch-metrics/reference)
</div>
