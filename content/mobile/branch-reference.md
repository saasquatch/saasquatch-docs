---
title: Branch Metrics Reference
highlights: |
    SaaSquatch integrates with [Branch Metrics](http://branch.io). This technical reference explains the specifics fields, features, API calls and functionality that is used in the integration.
slug: mobile/branch-metrics/reference
template: pages/branchReference.html
sectionType: mobile
---



<div class="bs-callout bs-callout-warning">
  <h4>New to Branch? Start Here</h4>
  This page is a technical reference of the Branch integration. Just getting started for the first time? Check out this 
  article instead:
  
  [Branch Metrics Getting Started Guide](/mobile/branch-metrics)
</div>

### How it Works

The SaaSquatch integration with [Branch Metrics](http://branch.io) works as follows:

 - SaaSquatch referral links (e.g. ssqt.co/h126b21) will start redirecting to Branch links
 - SaaSquatch will [create branch links dynamically](https://help.branch.io/using-branch/docs/creating-a-deep-link) and set values for `data`, `channel`, `tags` and `desktop_url`
 - Branch deep link `data` will include details of the referral code, the Referrer and reward (See field reference below)
 - Analytics Tags will be added to help you track the performance of different platforms.
	 - `channel`: the referral medium. One of `FACEBOOK`, `TWITTER`, `EMAIL`, `DIRECT`, `REMINDER`, `UNKNOWN`  
	 - `tags`: the source of the referral. One of `STANDARD`, `MOBILE`, `UNKNOWN`  


By default SaaSquatch will send all link clicks through Branch, but will continue to send redirect desktop traffic to your web/desktop site you configured. This is done by 
setting the Branch value for `desktop_url`.

 - `desktop_url`: the landing page you set in our portal when you created your program. If you set a desktop url for your app in Branch, it will be overwritten.


---


### Example Deeplink

When SaaSquatch creates links [dynamically in branch](https://help.branch.io/using-branch/docs/creating-a-deep-link) the resulting link, including analytics tags, redirects and
custom metadata produce a deep link like the following example:

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



---



  
### Data Fields

When SaaSquatch creates links [dynamically in branch](https://dev.branch.io/references/http_api/#creating-a-deep-linking-url/), it includes a number of metadata fields in the `data` field.
These includes fields from the **User**, **Referral Code** and **Reward** objects.
