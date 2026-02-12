---
title: Referral Programs 101
highlights: This article provides a quick overview of how referral programs in SaaSquatch work and how to use them successfully. 
slug: success/intro
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-17
---

If you're a marketer or non-technical person, this is the best place to learn about SaaSquatch. This article covers a basic overview of what a referral program is, the components that go into a typical referral program, the terminology we use when talking about referral programs, and how to go about managing your referral program.
### What is a Referral Program?
A referral program is any systematic way that your company encourages and facilitates people to tell other people about your product or service.

SaaSquatch helps you run a beautiful, fully automated, omni-channel customer referral program that engages your clients and grows your customer base.

<div class="bs-callout bs-callout-default">
  <h4>Terminology</h4>
When working with any referral program, there might be terms and expressions that you have not heard before. Below is a short list to get your familiar with some of the terms and referral lingo in use by SaaSquatch. 
<br></br>
<ul>
  <li><strong>Referrer</strong>: A person who invites another person to try the product or service.</li>
  <br>

<li> <strong>Referred User / Referree</strong>: A person who was referred by another person.</li>
  <br>

<li><strong><a href="/success/touchpoints/">Marketing Channels</a></strong>: The components of your referral program that your users interact with to participate in or get information about the referral program.</li>
  <br>

<li><strong>Referral Widget</strong>: An interactive panel that enables your users to share the referral program with their friends and track their individual progress.</li>
  <br>

<li><strong>Share messages</strong>: Predefined social or messaging copy that explain the offer and have a clear CTA. Used by your customers to invite friends and family.</li>
  <br>

<li> <strong>Notification emails</strong>: Emails the referrer receives to notify them about their referral progress.</li>
  <br>

<li><strong>Rewards</strong>: The reward you are handing out to your users for making a successful referral. I.E. 10% discount on their next bill,  $25 store credit, loyalty points, or a T-Shirt.</li>
  <br>

<li><strong><a href="/success/core-topics/#Conversion">Conversion</a></strong>: The last step a Referred User needs to complete in order for the referral to be considered successful and generate a reward for the Referrer. This can vary from account sign up, lead submission, paid subscription started, to a checkout depending on the business and program structure. </li></ul>
</div>

> Our [Core Topics](/success/core-topics/) article provides more in depth information on these topics. 

### Components of a Referral Program
A referral program is built up from a range of different components that interact with both your existing and newly brought on users. Components like the Referral Widget or the reward fulfillment tie into your website and payment system. Let’s start with the main interface your customers will interact with.

#### Referral Widget
<div class="row-fluid">
  <div class="span9">
  <p>The Referral Widget is easily loaded by providing SaaSquatch with a few details about your customers. SaaSquatch will return a fully rendered responsive Referral Widget that you can load inside your product or service to serve as the main touchpoint of your referral program. 

  <p>This touchpoint engages your current customers and explains the offer. Make sure to stay on point and communicate clearly with your users how the referral program works, and what they need to do to earn their reward. The Referral Widget’s CTA is for your users to start sharing with their friends.

 <p> Note: SaaSquatch offers two types of referral widgets--verified access and instant access. See our doc on <a href="/topics/widget-types/">widget types</a> for more information.

  <p>More information about the Referral Widget, and how users can interact with your referral program can be found in our <a href="/success/touchpoints/">Marketing Channels</a> article.

  </div>
  <div class="span3">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/referral_widget_live_1lORITdPfyMQWkqY2gosE4.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/referral_widget_live_1lORITdPfyMQWkqY2gosE4.png" alt="referral widget live">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Sharing Options 

<div class="row-fluid">
  <div class="span6">
  <p>Inside the Referral Widget your users can share the referral offer on a variety of channels. By default, email, Twitter and Facebook share buttons are visible to your users. You can work together with your Customer Success team to add or remove share options and pick the best options that match your customer base. 

  </div>
  <div class="span6">
<div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-16_at_12.02.24_PM_6lbsn0AaNJMjP5WKQghXIS.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Screen_Shot_2019-09-16_at_12.02.24_PM_6lbsn0AaNJMjP5WKQghXIS.png" alt="Social Media Share Messaging Options"> <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

> More info and examples are available in the [Share Options](/success/share-options/) article. 

#### Unique Sharelink & Referral Codes

<div class="row-fluid">
  <div class="span8">
  <p>One of the main goals of a program's sharing messages is to have a Referrer share their unique sharelink and / or referral code to their friends, the potential Referred Users/customers. These are the primary ways of establishing referral connections between two users, a process we call <a href="/success/core-topics/#Attribution">Attribution</a>. 
  <p>The Unique Sharelink performs two tasks when it is clicked by a Referred user/new visitor.  First it drops a 3rd party <a href="/developer/squatchjs/cookies/">tracking cookie</a> on <code>app.referralsaasquatch.com</code> in the user’s browser -- this allows us to know who sent this potential customer, and automatically create a referral connection. Then the sharelink redirects this new traffic to your website where our javacsript can drop a 1st party <a href="/developer/squatchjs/cookies/">tracking cookie</a>. You can decide whether you want to funnel them through your normal sign up or purchase flow, or set up a designated Landing page.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/referral_widget_sharelinks_A1jppW45QMd8awBaPGeRZ.png" data-lightbox="example-set">
<img src="/assets/images/contentful/referral_widget_sharelinks_A1jppW45QMd8awBaPGeRZ.png" alt="referral widget link code">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

Referral Codes are a way to establish a referral connection without tracking cookies. The referred user receives the code from their friend and is required to fill in the referral code on a form during checkout or registration. Alternatively, this can be autofilled as a coupon or into  another relevant field.  More info on Unique Sharelinks & Referral Codes can be found in our [Share Options](/success/share-options/#Code) article. 

#### Landing Page 

<div class="row-fluid">
  <div class="span8">
  <p>This is the first impression of your product that potential new customers will see, so make it count! A designated Landing page is a great place to recognize that the user was referred, explain the offer they will receive and why they should sign up.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/referral_landing_page_example_5BGt1hHuYoK4qykU0Kwaiy.png" data-lightbox="example-set">
<img src="/assets/images/contentful/referral_landing_page_example_5BGt1hHuYoK4qykU0Kwaiy.png" alt="referral landing page example">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Signup Flow
If you offer some sort of discount or credit to the Referred User, you should enhance your signup flow to reflect this change. Whether you flag the newly created account for a pending account credit, add a generic discount code to their order, or give them additional free time, the reward fulfillment comes into play.  

Once the Referred User has signed up for your service or product, you can identify them to SaaSquatch through the Referral Widget and entice them to start making their own referrals. 

#### Billing & Reward Fulfillment 
Depending on the reward that you have chosen for your referral program, the reward fulfillment can range from your customers automatically receiving a gift card through email, their next bill being lowered automatically through our Payment Provider integrations, or receiving an account credit for a future purchase. 

SaaSquatch can [help you choose the right reward](http://www.referralsaasquatch.com/choosing-rewards-for-your-referral-program/) for your referral program and provide you with all the caveats and details on the reward fulfillment steps.
#### Notification Emails
<div class="row-fluid">
  <div class="span8">
  <p>Whenever a Referred User signs up for your service, SaaSquatch can automatically send the Referrer an update on the progress of their referral. This email is a great way to give positive feedback to your users and inform them of any earned rewards. We also include the sharing options from the Referral Widget in these emails so the user can easily refer more friends.
  <p>More information on the referral program email notifications is available in our <a href="/success/touchpoints/">Marketing Channels</a> article or in our <a href="/topics/email/">technical documentation</a>. 

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/parkwhiz_referral_complete_email_3kY9y28NlSuGeMWMUCG8yu.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/parkwhiz_referral_complete_email_3kY9y28NlSuGeMWMUCG8yu.png" alt="parkwhiz referral complete email">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

### Managing a Referral Program
So you have a referral program that’s up and running, great! Now let’s go over what you should keep an eye on. 

#### Take a Look at Your Analytics
The SaaSquatch portal’s [Analytics](/features/analytics/) page gives you vital information about your referral program’s performance.

<div class="row-fluid">
  <div class="span8">
  <h4>Key Analytics metrics to look at:</h4>
    <ul><li><i>Referred Visitors:</i> The number of times your referral program sharelinks have been clicked.</li>
<li><i>Referred Users:</i> The number of users who have signed up for your service as a result of a referral.</li>
<li><i>Paid Conversions:</i> The number of new paying customers successfully referred to your service.</li></ul><br>
More information on what analytics metrics are available, definitions of each of the terms, and how to make the most of the analytics portal can be found in our <a href="/features/analytics/">analytics docs</a>.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-16_at_12.14.43_PM_2YPI3sTb8jWtwD8JxTzXTl.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/Screen_Shot_2019-09-16_at_12.14.43_PM_2YPI3sTb8jWtwD8JxTzXTl.png" alt="analtytics preview">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Take a Look at Potential Fraud Cases 

<span class="label">Classic only</span>

The SaaSquatch Portal comes with a security system that helps you keep the bad apples out and reward real referrals. More info on our [Security features is available in our documentation](/fraud-and-security/). 
### Referral Program Best Practices 
Whether you launched your referral program months ago or are looking to kick off soon, these best practices and tips will help you get the best results. 

#### Make Sure the Program is Visible 
With the SaaSquatch platform you can surface the Referral Widget on different places inside your product which helps drive more engagement from your users. For example, you can surface the program after your customer makes a purchase, fills out a feedback form or upgrades to a bigger plan. 

You can also incorporate the program information, or even the user’s unique sharelinks in transactional emails and other touch points inside your product. 
#### Pick a Reward that Your Customers Actually Want
The core part of your referral program is the reward you hand out to your users. Pick a double sided reward that both sides would love to get. 

If you are running a B2B product or service where your users don’t pay the invoice themselves, consider a Gift Card program. Instead of getting a discount the user doesn’t feel or experience personally, give them the opportunity to buy that new gadget or book to get a positive brand experience and keep the referrals flowing. 
#### Hand Out Rewards as Soon as Possible
We all like to get our reward as soon as we earned it. Although from a business perspective it might make sense to hold off on rewarding the Referrer until the Referred User pays their second invoice, the long delay in reward fulfillment may cause less participation in your program. The more strongly and quickly an action is rewarded the more likely it is to be repeated. 
#### Keep Things Simple!
Having a hard time explaining the offer to your customers? Try keeping the offer simple so it’s easy to communicate to your customers. The rule of thumb is: **If you can’t explain the offer to your customers in a single sentence, then simplify the offer.**

Looking for more ways to optimize your referral program? 
Download our [E-Commerce Referral Marketing Guide](https://www.saasquatch.com/wp-content/uploads/2020/11/E-Book-E-Commerce-Referral-Marketing-Guide-Referral-SaaSquatch.pdf).
### Further Resources & Reading Material
Now that you have a healthy referral program acquiring new customers for you, here are some additional resources to help you get the most out of your referral marketing strategy:
> - [Referral Program Best Practices Guide](https://info.saasquatch.com/rs/162-BJJ-156/images/Referral-Playbook-SaaSquatch-V1.pdf)
> - [State of Referral Marketing Report](https://info.saasquatch.com/rs/162-BJJ-156/images/StateOfReferralMarketing-SaaSquatch-V1.pdf)
> - [Referral Program Success Stories](https://www.saasquatch.com/customers/) 
