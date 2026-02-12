---
title: Referral Program Quickstart
highlights: End to end guide for setting up a Growth Automation referral program.
slug: guides/referral-quickstart
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-17
---

This guide is designed to provide a basic step-by-step process for implementing a referral program using SaaSquatch's Growth Automation Platform. The example reward structure featured in this guide will consist of a **Get $20 for the Referrer** only upon completion of a [`purchase` event](/developer/purchase-object/) by the Referred User.

### What will you need?
We recommend having the following resources available before proceeding to make implementation as smooth and quick as possible:
* The ability to add a tracking script (similar to Google Analytics) on your webpage. A script will be provided for insertion within the code of your site.
* Access to a SaaSquatch project and user account. If you are not already set up, contact our Sales Team to schedule a product demo with you.
* A plan for how your users will interact with your referral program.
* The ability to indicate to the SaaSquatch system when a purchase has been made via either an API call or use of javascript.

### New to Referral Programs and Growth Automation?
SaaSquatch has a wide selection of [articles](/success/ "Articles"), [case studies and eBooks](https://www.referralsaasquatch.com/resources/ "Resources") available to help you learn all about referral programs and how to make them work for you.

> Check out our [Referral Program 101](/success/intro/ "Referral Program 101") and [Growth Automation 101](/growth/ga-101/ "Growth Automation 101") articles if you are not sure where to start!

### Setup your Referral Program
Follow these steps below to create, configure, and install your referral program.

#### Create your Test Referral Program
Once logged in, you can begin to create and configure a referral program:
1. Log into your SaaSquatch account and ensure that you are in your Test tenant. In the upper left-hand corner of the site should be your company name and "Test" (eg. "Bob Co. Test"). If it says Live, click on your displayed company name and select the Test tenant from the drop down menu.
2. On the Program page, click either the "Create New" (top-left) or "Create a Program" (center-bottom) button.
3. You will be taken to the 'Create New Program' screen where you can choose the type of Growth Automation program you would like to build.
    * For the purposes of this guide, choose "Referral Program" by clicking the 'Select Program' button below it.
4. The next page will outline the details of setting up a Referral Program. Read through this page and click the 'Create this Program' button at the bottom.
5. Next you will need to enter a Program Name and Program ID (used for accessing the program through either squatch.js or an API call). While this program name and ID can be anything you choose, **make sure to take note of the ID as it will need to be referenced later.**
6. Lastly, you will be taken to the configuration page for your program.

#### Configure your Test Referral Program
Before a program can launch, the program's rules, rewards, widgets and emails must be configured.

##### Set up your Rules, Rewards and Landing Page
1. Rules provide the parameters within which interlocking parts of your program (such as Conversion) will be triggered. For this example, we will set it to convert on 'First Purchase' with no minimum purchase value, no maximum number of rewards and no reward for the Referred User.
2. The Referrer and Referred Reward sections allow you to specify what is rewarded when the referral satisfies the Rules configured. For this example, we will set the 'Referrer Reward' to 20 Dollars and ignore the 'Referred Reward' as it will not be available for selection if step #1 was followed correctly.
3. Specify your Landing Page. This is the page that your users will be sent to when they click on a valid sharelink.
4. Customize your Design and Messaging. While custom copy is not required to launch your program, we strongly recommend reviewing the emails, [widgets](/topics/widget-types/) and social media messaging you plan to use to ensure that the messaging and brand are to your standards.

##### Integrate SaaSquatch with your site
<ul class="nav nav-tabs" id="install-code-steps">
		<li class="active"><a data-toggle="tab" data-target=".steps-js">squatch.js</a></li>
		<li><a data-toggle="tab" data-target=".steps-api">API</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane steps-js active">
    <ol>
      <li>Obtain the Tenant Alias and API Key for your Test tenant by clicking on Settings (rightmost option) in the top navigation bar.</li> 
      <li>As using Signed Requests is recommended to send data securely, please review <a href="/developer/squatchjs/signed-requests/" title="Signed Requests">this page</a> to ensure proper implementation.</li>
      <li>Review the <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">squatch.js guide</a> for instructions on how to install the proper scripts onto your site and ensure that the referral information is captured correctly.</li>
      <li>If you are planning to display a Referral Widget on your site to engage users, please review the "Referral Widget" section of <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">this guide</a> to learn how to incorporate the interactive user panel into your page(s).</li>
      <li>We also highly recommend creating a <a href="/api/webhooks/" title="Webhooks Guide">webhook subscription</a> so that your site/service can be notified whenever a referral is completed and a user is rewarded.</li>
      </ol>
  </div>  

  <div class="tab-pane steps-api">
    <ol>
      <li>Obtain the Tenant Alias and API Key for your Test tenant by clicking on Settings (rightmost option) in the top navigation bar.</li>
      <li>Review <a href="/api/authentication/" title="API Authentication">this page</a> to learn how to authenticate your API calls to SaaSquatch.</li>
      <li>If you plan to include a SaaSquatch generated <a href="/topics/widget-types">Referral Widget</a>, please review <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">this guide</a> for instructions on incorporating the widget into your site page(s) with JavaScript.</li>
       <li>We also highly recommend creating a <a href="/api/webhooks/" title="Webhooks Guide">webhook subscription</a> so that your site/service can be notified whenever a referral is completed and a user is rewarded.</li>
      </div>
  </div>

##### Send SaaSquatch some test data
  <ul class="nav nav-tabs" id="send-data-steps">
		<li class="active"><a data-toggle="tab" data-target=".data-js">squatch.js</a></li>
		<li><a data-toggle="tab" data-target=".data-api">API</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane data-js active">
    <ol>
      <li>To ensure everything runs smoothly after launch, we recommend Identifying a few users via <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">Squatch.js</a> to the SaaSquatch system.</li> 
      <li>Once these users have been created, attempt to send a few <code>purchase</code> events via a Squatch.js <a href="/developer/squatchjs/v2/advanced-use-cases/#sending-user-events-with-squatchjs" title="Event call">event call</a> for these users.</li>
      <li>Review these users by clicking on the Participants tab in the portal to ensure that all details and events have been captured successfully.</li>
      </ol>
  </div>  

  <div class="tab-pane data-api">
    <ol>
      <li>To ensure that everything runs smoothly after launch, we recommend Identifying a few users via the <a href="/api/methods/#open_create_user" title="Create User API Call">Create a User and Account</a> API call.</li>
      <li>Once these users have been created, attempt to send a few purchase events via the <a href="/api/methods/#trackEvent" title="Track User Event API Call">Track User Event</a> API Call</li>
      <li>Review these users by clicking on the Participants tab in the portal to ensure that all details and events have been captured successfully.</li>
      </div>
  </div>

##### Launch and Complete Test Referral Loops
1. Return to the referral program you've created by clicking on Programs at the top of the portal and clicking on the 'View/Manage Program' button.
2. Review your "Rules", "Rewards" and "Messaging" a final time before clicking on the Launch button in the upper right-hand corner.
3. Once your program is launched, you should run a couple of referral loops to ensure everything converts and fulfills as expected:

<blockquote>
  <ul class="nav nav-tabs" id="test-loop-steps">
    <li class="active"><a data-toggle="tab" data-target=".loop-js">squatch.js</a></li>
    <li><a data-toggle="tab" data-target=".loop-api">API</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane loop-js active">
    <ol>
      <li>Identify a new user (using <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">Squatch.js</a>)</li> 
      <li>Attribute them to another user (using <a href="/developer/squatchjs/v2/" title="Squatch.js Guide">Squatch.js</a>)</li>
      <li>Convert the referral with a purchase event (using <a href="/developer/squatchjs/v2/advanced-use-cases/#sending-user-events-with-squatchjs" title="Squatch.js Event Call">Squatch.js</a>)</li>
      <li>Confirm fulfillment by reviewing the users in the portal, or reviewing the <a href="/api/webhooks/" title="Webhook Guide">webhook</a> sent to you.</li>
      <li>Attempt to debit the user's reward balance using either <a href="/guides/bulk-reward-redemption/" title="Bulk Reward Redemption Guide">bulk reward redemption</a>, or directly from the portal.</li>
      </ol>
  </div>  

  <div class="tab-pane loop-api">
    <ol>
    <li>Identify a new user (using the <a href="/api/methods/#open_create_user" title="Create a User and Account API Call">Create a User and Account</a> API Call)</li>
    <li>Attribute them to another user (using the <a href="/api/methods/#open_apply_code" title="Apply a Referral Code API Call">Apply a Referral Code</a> API Call)</li>
    <li>Convert the referral with a purchase event (using the <a href="/api/methods/#trackEvent" title="Track User Event API Call">Track User Event</a> API Call)</li>
    <li>Confirm fulfillment by reviewing the users in the portal, reviewing the <a href="/api/webhooks/" title="Webhook Guide">webhook</a> sent you, or using the <a href="/api/methods/#list_balances" title="List Balances API Call">List Reward Balances</a> API Call).</li>
    <li>Attempt to debit the user&#39;s reward balance using either the <a href="/api/methods/#debit_balance" title="Debit a Reward Balance API Call">Debit a Reward Balance</a> API call, <a href="/guides/bulk-reward-redemption/" title="Bulk Reward Redemption Guide">Bulk Reward Redemption</a>, or directly from the portal.</li>
</div></p>
  </div></blockquote>

#### Transfer Program to your Live Tenant
By now you should have confirmed that the program is set up as you would like and your mechanisms for creating users and attributing referrals are working. With the testing portion done, you can now proceed with setting up and launching your live program:

1. Transfer the program into the live tenant.
    1. Switch over to the live tenant and create a new program.
    2. Populate the new program with the same rules, rewards and settings from the test program.
    3. Update all your squatch.js and API calls to use the live tenant's alias and API Key.
2. Test it.
    * Perform one last referral loop using the live tenant's program and details.
3. Launch the live program!

##### Import Your Existing Users
> For maximum impact, we recommend importing your existing users using our [Bulk User Import](/guides/user-import/ "Bulk User Import Guide") feature.
