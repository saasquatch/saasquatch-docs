---
title: Attribution
highlights: "**\"Attribution\"** means creating a referral link between two people; the person that was referred and the person doing the referring. It is one of the 5 core terms you should know for your referral program. When you run a referral program you often want to separate the linking of referrals from the process of giving people rewards. For example you want to *attribute* a referral as soon as some one signs in to your website,  but you only want to give a referral reward when the referred person [converts](/topics/conversion) and pays their first bill."
slug: topics/attribution
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-01-16
---

<div class="bs-callout bs-callout-default">
  <h4>Definition</h4>
  Attribution is the process of tracking a referral link between two people.
</div>

### Share Links

One of the most popular ways to let people share with their friends is using share links like `http://ssqt.co/hR6O`. Share links are unique links generated for each user that can be used for making referrals.
Share links rely on [Tracking Cookies](/developer/squatchjs/cookies/) to track when someone has been referred, redirecting referred friends to a website or landing page to get started as a new customers. Share links are
often used along with [Squatch.js Javascript Library](/squatchjs) or deeplinking like Branch Metrics integration to track when someone has made a successful referral.

**Benefits of Share Links**:

 - Work across email, facebook, twitter and other social channels
 - Easy to set up
 - Can have a white-labeled domain

**Disadvantages of Share Links**:

 - Relies on Cookies or Deeplinking
   - Can be blocked by some browsers or cleared regularly
   - Requires a Deeplinking tool like Branch to work well in Mobile apps
 - Does not support real world face-to-face referrals

<div class="text-center"><img src="/assets/images/attribution/sharelink-attribution.png" alt="Example share link"></div>

### Referral Codes

Referral codes are a more modern way of sharing that rely on a human-readable code like `BOBTESTERSON`. Referral codes are unique codes that people can use when they sign up for a product
or check out at a store. Since there is a unique referral code for everyone who shares, referral codes can be used as the sole way of doing attribution. 

__Benefits of Referral Codes__:

 - Can be used with on-the-phone and in-person sign up processes link Banks, Call Centers and Retail Stores
 - Works well with printed materials
 - Supports mobile-first referrals for native mobile apps

__Disadvantages of Referral Codes__:

 - Some companies have policies against allowing any sort of promo codes
 - Can be listed on coupon sites

<div class="text-center"><img src="/assets/images/attribution/referralcode-attribution.png" alt="Example share link"></div>

### Hybrid (recommended)

It is possible to get the best of both worlds by using both human-readable codes and share links. This is the recommended approach for attribution because it provides all of the benefits
of both of the methods of share links and codes. In most cases, if it's possible to refer friends using a referral code, then it is preferable to go for a hybrid approach and take
advantage of the additional analytics provided by links.

__Benefits of Hybridization__:

 - All of the benefits listed above
 - Best in class success rates

__Disadvantages of Hybridization__:

 - Some companies have policies against allowing any sort of promo codes

<div class="text-center"><img src="/assets/images/attribution/hybrid-attribution.png" alt="Example share link"></div>

### Choosing an attribution method

Referral SaaSquatch has flexible attribution methods for controlling how referrals can be made and tracked. Each attribution method has certain strengths and limitations. Unique share links, for example, are a simple way to power your referral program but they don't work well offline, with cookie blockers or on mobile. Referral codes work well on mobile, but aren't as 
convenient for online sharing.

<table class="table">
<tr>
    <td></td>
    <td>Desktop</td>
    <td>Mobile</td>
    <td>Offline</td>
<tr>
<tr>
    <th>Share Links</th>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x" style="color: #CCC"></i></td>
    <td></td>
</tr>
<tr>
    <th>Referral Codes</th>
    <td><i class="fa fa-check-circle fa-3x" style="color: #CCC"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
</tr>
<tr>
    <th>Hybrid (Recommended)</th>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
    <td><i class="fa fa-check-circle fa-3x"></i></td>
</tr>
</table>

<div class="bs-callout bs-callout-default">
  Attribution can use share links, referral codes or both (hybrid).
</div>