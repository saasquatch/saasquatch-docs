---
title: Identification
highlights: |
     Identification is the topic of loading contact records into SaaSquatch from other systems. To implement a referral program you need to develop a strategy
     for how and when a user will be identified to SaaSquatch. Typically this happens whenever a user logs in to your website or service, or makes a purchase.
     Identifying a user enrolls them to be able to refer their friends and tracks if they have been referred.
     For details on how referrals are tracked see [Attribution](/topics/attribution/) and [Conversion](/topics/conversion/).
slug: topics/identification
template: guides.html
---


<div class="bs-callout bs-callout-default">
  <h4>Definition</h4>
  Identification is the process sending information about your users, like email and user id, to Referral SaaSquatch.
</div>


### Identifications Strategies

SaaSquatch needs identifying information about your user so that we can build out their profile. This usually involves a company providing information about the active user to Referral SaaSquatch using our REST API or Squatch.js, our javascript library. Here are a few examples of common ways that people identify users.

 - **eCommerce:** After someone completes a purchase, they visit a "Thank You" page. On this page, an ecommerce company loads Squatch.js to track the email address, user id and name of the person that just made a purchase. This identifying information is used to build a contact record in SaaSquatch so that this person that just purchased can make referrals, or if they were referred, so they can be [attributed as a referral](/topics/attribution) and [marked as converted](/topics/conversion).
 - **SaaS:** Identification usually happens by including Squatch.js on every page of your web application. After launching your referral program, then the first time someone signs into your product, they'll have their email address, user id and name synched with SaaSquatch. If someone has been referred, then this identifying information will be used to [attribute](/topics/attribution) any referrals that happened.
 - **Mobile:** Identification usually happens when someone signs up for a user account. When someone is created in the server database, it is also created as a record in the SaaSquatch database using the SaaSquatch REST API.


### Accounts vs Users

Referral SaaSquatch supports referral tracking for both B2B and B2C workflows by seperating an "Account" and a "User".
Users are for people. Accounts are for companies or groups. Users have individual contact records for a person with names, email addresses, profile pictures and share links. Accounts have 
one or more users in them and have rewards and reward balances. For more information, read the article on [Shared vs Solo Accounts](/shared-vs-solo-accounts/).

<table class="table">
<tbody><tr>
<th>
    <strong>Shared</strong> Account
</th>
<td>
    <i class="fa fa-users"></i> Multiple users share the same billing information. [Read More](/shared-vs-solo-accounts/)
</td>
</tr>
<tr>
<th>
    <strong>Solo</strong> Account
</th>
<td>
    <i class="fa fa-user"></i> Every user has their own billing information. [Read More](/shared-vs-solo-accounts/)
</td>
</tr>
</tbody></table>