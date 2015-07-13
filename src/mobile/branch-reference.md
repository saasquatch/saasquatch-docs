---
title: Branch Metrics Reference
highlights: |
    Referral SaaSquatch integrates with [Branch Metrics](http://branch.io). This technical reference explains the specifics fields, features, API calls and functionality that is used in the integration.
slug: mobile/branch-metrics/reference
template: pages/branchReference.html
---



<div class="bs-callout bs-callout-warning">
  <h4>New to Branch? Start Here</h4>
  This page is a technical reference of the Branch integration. Just getting started for the first time? Check out this 
  article instead:
  
  [Branch Metrics Getting Started Guide](/mobile/branch-metrics)
</div>

### Summary

The Referral SaaSquatch integrates with [Branch Metrics](http://branch.io) works as follows:

 - SaaSquatch referral links (e.g. ssqt.co/h126b21) will start redirecting to Branch links
 - Referral SaaSquatch will [create branch links dynamically](https://dev.branch.io/recipes/dynamic_link_creation/) and set values for `data`, `channel`, `tags` and `desktop_url`
 - Branch deep link `data` will include details of the referral code, the referrer and reward (See field reference below)


---


### Example Deeplink

When Referral SaaSquatch creates links [dynamically in branch](https://dev.branch.io/recipes/dynamic_link_creation/) the resulting link, including analytics tags, redirects and
custom metadata produce a deep link like the following example:

```json
{
    "code" : "JOANNATEST",
    "$desktop_url" : "http:\/\/example.com",
    "sq_id" : "559f0deeebba89f94fb618b9",
    "sq_firstName" : "Joanna",
    "sq_lastName" : "Test",
    "sq_imageUrl" : "http:\/\/gravatar.com\/avatar\/7ede76436e1258b9a3deb245cfe58a29?d=mm",
    "sq_referralCode" : "JOANNATEST",
    "sq_type" : "PCT_DISCOUNT",
    "sq_quantity" : "10",
    "~channel" : "DIRECT",
    "~tags" : ["STANDARD"],
    "~creation_source" : "API",
    "+is_first_session" : false,
    "+clicked_branch_link" : true
}
```



---


### Analytics Tags

When we generate share links and a Branch integration is enabled, we add some analytics tags to help you track the performance of different platforms.

 - `channel`: the referral medium. One of `FACEBOOK`, `TWITTER`, `EMAIL`, `DIRECT`, `REMINDER`, `UNKNOWN`  
 - `tags`: the source of the referral. One of `STANDARD`, `MOBILE`, `UNKNOWN`  

----



### Link redirect behaviour

By default Referral SaaSquatch will send all link clicks through Branch, but will continue to send redirect desktop traffic to your web/desktop site you configured. This is done by 
setting the Branch value for `desktop_url`.

 - `desktop_url`: the landing page you set in our portal when you created your program. If you set a desktop url for your app in Branch, it will be overwritten.


---


  
### Data Fields

When Referral SaaSquatch creates links [dynamically in branch](https://dev.branch.io/recipes/dynamic_link_creation/), it includes a number of metadata fields in the `data` field.
These includes fields from the **User**, **Referral Code** and **Reward** objects.
