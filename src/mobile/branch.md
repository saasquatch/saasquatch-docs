---
title: Branch Metrics Integrations
highlights: |
    Referral SaaSquatch integrates with [Branch Metrics](http://branch.io) to provide additional attribution, personalization and analytics by using Branch's deep links.
slug: mobile/branch-metrics
template: mobile.html
---

### Overview

There are two parts of integrating Referral Saasquatch with Branch Metrics: setting up the integration in our portal, and updating your mobile app to use the information Saasquatch will pass in when your customer clicks a share link and to complete the referral using our mobile widget.

#### Portal Setup

##### Branch account

In order to integrate Branch Metrics, you're going to need a Branch account and an app set up within Branch. If you already have one, skip straight to [Adding your Branch account to your Saasquatch account](#saasquatchAccount).

If you don't have a Branch account yet, head over to [Branch Metrics](https://branch.io) and click “Sign Up”. All you need is a valid email account.

Now you need to set up an app. Branch's dashboard will walk you through this process if you don't have an app yet, or you can add a new app any time from the dropdown menu in the top right corner. 

Once you have an app, you need to add your link settings. This is where you tell Branch where to send customers who click your link on different platforms. Add all the platforms where you have an app, but don't fill in a custom landing page for the desktop. The desktop landing page will be the landing page you set in your Referral Saasquatch account.

![Branch Metrics link settings](/assets/images/mobile/branch-link-settings.png)

When your link settings are filled in, you're ready to add your Branch account to your Saasquatch account.

##### <a name="saasquatchAccount">Adding your Branch account to your Saasquatch account</a>

To add your Branch account to your Saasquatch account, you will need your Branch account key. This is found on the General tab of the Settings section.

![Branch Metrics api key](/assets/images/mobile/branch-api-key.png)

Now you need to log into the Saasquatch portal and go the Integrations section. Open up the Branch integration using the chevron, copy your Branch api key into the field, and click connect. If you need to disconnect your integration for any reason, just go back to the Integrations page, open up your integration using the chevron, and click Disconnect:

![Referral Saasquatch integration connection process](/assets/images/mobile/connect-branch-integration.gif)

That's it for portal setup! Saasquatch takes over from here and automatically creates Branch deep links when your customers open up our referral widget or when you request a set of share links using our API.

#### Updating your mobile app

To use Saasquatch and Branch together, you're going to need to import the appropriate Branch SDK into each of your apps. [Branch's documentation will walk you through everything you need to do to add the SDK to an app](https://start.branch.io/#/integrate-sdk/steps).

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

To complete the referral you need to use our [mobile widget](/mobile/widget/). To load the widget you will need to craft a url with a number of GET parameters, including the new user's account id and user id from your system, as well as the referral code from `sq_referralCode` (the referral code is required in this case because it's the only way to connect the new user with their referrer from a deep link), then use it to load the mobile widget to display to your new customer. For security we recommend that you generate this url on your server and include a checksum, which will help prevent fraudulent referrals.

We also recommend having a place in your app where a user can enter their friend's referral code directly. We use short codes that are easy to type so that users can share them face to face as well as sending links.


<div class="bs-callout bs-callout-warning">
  <h4>Technical Reference</h4><a name="reference"></a>
  
  For a full technical reference of data fields and behaviour, check out the [Branch Metrics Reference](/mobile/branch-metrics/reference)
</div>
