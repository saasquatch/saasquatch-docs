---
title: Program Reward Options
highlights: Learn about the wide range of reward options available on each SaaSquatch Growth Automation program.
slug: feature/rewards
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-28
---

Each SaaSquatch project provides the power and flexibility to customize the type of rewards that you provide your users with. 

>**Using our integration with Recurly or Stripe?**<br>
> <span class="label">Classic only</span> The SaaSquatch Stripe and Recurly integrations support the ability to provide Dollar Credit and Percentage Discount rewards. Full details about reward options for our direct integrations with payment providers can be found in our documentation for  [Stripe](/stripe/) and [Recurly](/recurly/).

### Gift Card Rewards
The SaaSquatch Gift Card Integration enables you to automatically reward successful participants with digital gift cards.

With our [Tango Card](/success/gift-card-rewards) integration, you are able to select your program's configured reward from a wide range of available regional and international brands.

Gift cards can be a great reward option for users who are not directly paying for your product (*e.g.* company pays the bill), or when you want to give the user the flexibility to choose the reward that provides them the most value (like with Tango Card's Reward Link). 

Learn more about our [Gift Card integration](/success/gift-card-rewards).

### Reward Codes (Fuel Tank)

<div class="row-fluid">
  <div class="span7">

  <p>Provide your participants with Custom Reward Codes (Fuel Tank).

<p>The SaaSquatch system can be configured to automatically provide a successful program participant with a Custom Reward Code at the correct time and place in their lifecycle. 

  <p>The SaaSquatch Custom Reward Fuel Tank provides a simplified way of handing out rewards, easy management of each code and reward, and can be configured to work with a wide range of eCommerce platforms like Shopify, WooCommerce, Magento, and BigCommerce.

<p>Find out more about our <a href="/features/rewards-fuel-tank/">Custom Rewards Fuel Tank</a> functionality.

  </div>
  <div class="span5">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Manage_Used_Referred_User_Codes_mxWv4Ov4OGCo2kM2qyWQA.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Manage_Used_Referred_User_Codes_mxWv4Ov4OGCo2kM2qyWQA.png" alt="Manage Used Referred User Codes">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

### Account Credit Rewards

<div class="row-fluid">
  <div class="span7">
<p>Provide participants in your SaaSquatch program with Account Credit rewards.

<p>Leveraging your existing account credit system, these rewards can be provided seamlessly to users through their account in your product.

<p>Account credit rewards are a great way to incentivize users to continue engaging with, and making purchases through, your product.

<p>For example, with products that have a subscription or transactional business model, users would be able to apply their reward towards another month/year of service, or as a discount on their next purchase.

</div>
  <div class="span5">
  <img src="/assets/images/contentful/account_credit_rewards_Gxzx69Bp84I22yo08oACY.png" alt="account credit rewards">
  </div>
</div>

### Percentage Discount Rewards

<div class="row-fluid">
  <div class="span7">
<p>Provide participants in your SaaSquatch program with rewards in the form of a percentage discount. 

<p>Leveraging your existing account credit system, these rewards can be provided seamlessly to users through their account in your product.

<p>Percentage discount rewards are great as an alternative to using fixed-value account credits. 

<p>For example, with business models that offer a number of different pricing tiers, percentage discount rewards provide the flexibility for users to choose which product/plan to purchase as the reward's value will scale with the value of their purchase.

</div>
  <div class="span5">
  <img src="/assets/images/contentful/percent_discount_rewards_2KviCjp2hiYOy0gy4mYgE0.png" alt="percent discount rewards">
  </div>
</div>

### Reward Points

<div class="row-fluid">
  <div class="span12">

<p>The SaaSquatch system supports the ability to provide your users with rewards in the form of points.

<p>Points can be a great reward option when your platform/product offers a range of features, upgrades, or add-ons which people can put their points towards.

<p>Points can also be a viable substitute to offering account credit in situations where there can't be a monetary value for the rewards.

<p>These points can also be configured to match your own custom points system naming structure.

</div>
</div>

### Free Time Rewards
<div class="row-fluid">
  <div class="span7">

<p>Your SaaSquatch program can be configured to provide participants with rewards they can use towards free time in your product.

<p>This type of reward is particularily helpful in subscription-based products, with monthly and/or yearly billing, and which have a number of plans at different price-points.

<p>For example, offering a reward in the form of a free month of service can provide the flexibility for users to choose which product/plan to purchase (and on which billing cycle) as the reward's value will scale with the value of their purchase.

<p>These rewards can be configured in units of <code>days</code>, <code>months</code>, or even <code>quarters</code>.

</div>
  <div class="span5">
  <img src="/assets/images/contentful/free_time_rewards_6ua2g6VKgwsuwwKeg2Wkew.png" alt="free time rewards">
  </div>
</div>

### Custom Rewards
<div class="row-fluid">
  <div class="span7">

<p>The SaaSquatch system can also be configured to provide rewards in nearly any other custom unit. 

<p>Would you like to give out a product you make, a gift basket, or even some company swag (like a T-shirt)? All of these reward options, and many more, can be configured as the reward for your SaaSquatch program.

<blockquote>Not sure if your type of reward you are looking to provide will work with SaaSquatch?<br> <a href="mailto:sales@referralsaasquatch.com">Our sales team</a> will be more than happy to help answer any questions you have about the types of rewards you are looking to offer.</blockquote>

</div>
  <div class="span5">
  <img src="/assets/images/contentful/arbitrary-reward2_33mAMvmEDmmGQ6CGAGSCIe.png" alt="arbitrary-reward2">
  </div>
</div>

### Additional Information

#### Cancellability
All reward types other than gift card integrated rewards can be cancelled using the SaaSquatch API, or through the SaaSquatch Admin portal, if they have not already been redeemed.

More information about Cancelling existing rewards can be found in our guide on [Managing Existing Rewards](/guides/manage-rewards/#cancel-rewards), or in our [API docs](/api/methods/#cancel_reward).

>**Cancelling Percent Discount Rewards**<br>
>For referral programs using percentage discount rewards, if the Referred User's subscription is cancelled in SaaSquatch before the end of the discount period, the Referrer's reward will also be marked as cancelled.

#### Discount duration
For reoccurring rewards (like percentage discount rewards) the SaaSquatch platform keeps track of the duration that the discount is valid for.

Using this, you can configure your system to query the SaaSquatch platform to check whether a particular user has a valid discount.

These discount durations are based on your program's reward setting, which can can be configured through the SaaSquatch Portal. For percentage discount rewards, the duration can be configured as 1, 3, 6, or 12 months, or unlimited.

#### W-9 Compliance
The SaaSquatch Growth Automation Platform offers W-9 Compliance for our programs and rewards. When configured, it prevents participants who have not submitted a W-9 Tax Form from receiving in excess of $600 USD of rewards during a tax year. More information can be found in our article on [W-9 Compliance](/features/w-9-compliance) and [Configuring your Reward Catalog for W-9 Compliance](/features/configuring-your-reward-catalog-for-w-9).
