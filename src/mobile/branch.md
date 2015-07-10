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

In order to integrate Branch Metrics, you’re going to need a Branch account and an app set up within Branch. If you already have one, skip straight to [Adding your Branch account to your Saasquatch account](#saasquatchAccount).

First you’re going to need a Branch.io account. Head over to [Branch Metrics](https://branch.io) and click “Sign Up”. All you need is a valid email account.

Now you need to set up an app. Branch’s dashboard will walk you through this process if you don’t have an app yet, or you can add a new app any time from the dropdown menu in the top right corner. 

Once you have an app, you need to add your link settings. This is where you tell Branch where to send customers who click your link on different platforms. Add all the platforms where you have an app, but don’t fill in a custom landing page for the desktop. The desktop landing page will be the landing page you set in your Referral Saasquatch account.

![Branch Metrics link settings](/assets/images/mobile/branch-link-settings.png)

When your link settings are filled in, you’re ready to add your Branch account to your Saasquatch account.

##### <a name="saasquatchAccount">Adding your Branch account to your Saasquatch account</a>

To add your Branch account to your Saasquatch account, you will need your Branch account key. This is found on the General tab of the Settings section.

![Branch Metrics api key](/assets/images/mobile/branch-api-key.png)

Now you need to log into the Saasquatch portal and go the Integrations section. Open up the Branch integration using the chevron, copy your Branch api key into the field, and click connect. If you need to disconnect your integration for any reason, just go back to the Integrations page, open up your integration using the chevron, and click Disconnect:

![Referral Saasquatch integration connection process](/assets/images/mobile/connect-branch-integration.gif)

That’s it for portal setup! Saasquatch takes over from here and automatically creates Branch deep links when your customers open up our referral widget or when you request a set of share links using our API.

#### Updating your mobile app

To use Saasquatch and Branch together, you’re going to need to import the appropriate Branch SDK into each of your apps. [Branch’s documentation will walk you through everything you need to do to add the SDK to an app](https://start.branch.io/#/integrate-sdk/steps).

Once you’ve got your app set up and you’re able to get the JSON data from Branch when your app is opened, you can use that data to set up a friendly landing page with the referrer’s name and picture.

Here is an example of the Saasquatch keys and values you will see inside the JSON data you get from Branch:  
"sq_firstName": "Joanna",  
"sq_id": "559f0deeebba89f94fb618b9",  
"sq_imageUrl": "http:\/\/gravatar.com\/avatar\/7ede76436e1258b9a3deb245cfe58a29?d=mm",  
"sq_lastName": "Test",  
"sq_quantity": "10",  
"sq_referralCode": "JOANNATEST",  
"sq_type": "PCT_DISCOUNT"

The most important value there is sq_referralCode. That’s the one you need to complete the referral so that both the referrer and referree get their rewards and tell more friends how great you are.

To complete the referral you need to use our [mobile widget](/mobile/widget/). To load the widget you will need to craft a url with a number of GET parameters, including the new user’s account id and user id from your system, as well as the referral code from sq_referralCode, then use it to load the mobile widget to display to your new customer. For security we recommend that you generate this url on your server and include a checksum, which will help prevent fraudulent referrals.

We also recommend having a place in your app where a user can enter their friend’s referral code directly. We use short codes that are easy to type so that users can share them face to face as well as sending links.

### Reference

JSON data embedded in the Branch link:

#### Referrer and reward data

sq_firstName: the referrer's first name  
sq_id: the referrer's user id. This allows you to look up the user in your own system  
sq_imageUrl: the referr's profile image url or a gravatar link if we do not have an image url for that account  
sq_lastName: the referrer's last name  
sq_quantity: the quantity of the referree's reward. For example, in a 10% off referral program this would be 10  
sq_referralCode: the referrer's referral code. This is necessary to attribute the referral  
sq_type: the type of the referree's reward. One of: PCT_DISCOUNT, TIME_CREDIT, FEATURE, CREDIT, GIFTCODE  

#### Analytics data

When we generate share links and a Branch integration is enabled, we add some analytics data to help you track the perforance of different platforms.

channel: the source of the referral. One of STANDARD, MOBILE, UNKNOWN  
tags: the referral medium. One of FACEBOOK, TWITTER, EMAIL, DIRECT, REMINDER, UNKNOWN  

#### Link behaviour

desktop_url: the landing page you set in our portal when you created your program. If you set a desktop url for your app in Branch, it will be overwritten.
