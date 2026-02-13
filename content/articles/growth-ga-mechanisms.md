---
title: Program Mechanisms
highlights: An overview of the key functional pieces that make up a SaaSquatch Growth Automation program. 
slug: growth/ga-mechanisms
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-17
---

While the features, goals, and intended audience of each program can be extremely varied, there are a number of core functional components that are included in every program. This article outlines what each of these components are, and how they work together to make each program function.

### User Events
One of the foundational pieces of the SaaSquatch platform is the ability to pass SaaSquatch User Events about the activity of participants within your product.

<div class="bs-callout bs-callout-default no-anchor">
  <h4>Definition</h4>
Custom User Events are pieces of information you choose to send the SaaSquatch system (using our API or Javascript library) regarding the activity of your customers within your business. 
</div>

Any time a user interacts with your system, you would send SaaSquatch an event with details about this interaction. 

Some examples of User Events to send to SaaSquatch include:
- [Purchases](/developer/purchase-object/) or Transactions
- Subscription Creation/Update/Removal
- Mailing List Subscription

With each of these (and any other events you pass over), the more information you provide with the User Event, the more granual control is available in the SaaSquatch system when processing these events. 

These events are then leveraged to update user information and trigger actions within your running programs. 

> __Note:__ Events older than 2 years are not accessible via API or visible on the Participants page in the Admin Portal. However, you can continue to access historical data by running an [event export report](/running-programs/creating-an-event-export-report). 

#### Custom Fields

An alternative means for collecting the information of your users is through Custom User Fields. These are fields specified as part of the user object and can also be used to trigger conversion and fulfillment in programs. For more information, refer to our [Custom User Fields page](/features/custom-user-fields).

### Program Rules
<div class="row-fluid">
  <div class="span8">
  <p>

Each time a User Event or Custom Field is sent to SaaSquatch, the system evaluates this event/field against each of your configured programs. If the event/field and its contents, match the configured program rules, then that will trigger further action by the SaaSquatch system.

<p>SaaSquatch programs are able to perform actions (e.g. send emails, generate rewards) based on these configured criteria. See to the right for a simple reward-focused flowchart based off of the idea of a 'purchase' event, and below for a general overview of the many flows possible with programs:

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Program_Rules_17iquWY0xEaA9CSjAXvy0F.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Program_Rules_17iquWY0xEaA9CSjAXvy0F.png" alt="Program Rules">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

![Generic Program Flowchart](/assets/images/contentful/Generic_Program_Flowchart_2IY64iikwWAF92FEgTg3G4.png)

> Curious about pre-configured rule options? **Check out our [Growth Automation program library](/program/library/) for more information on what each turnkey program can do.**

### Widgets
<div class="row-fluid">
  <div class="span8">
  <p>

Driving user engagement with each of your Growth Automation programs is an important component of increasing participation. One of the most powerful ways to drive this engagement is through the use of visual pieces displayed to your users within your product/behind your web login.

<p>Powered by our <a href="/developer/squatchjs">squatch.js Javascript Library</a>, the SaaSquatch system provides widgets for a number of our Growth Automation programs (e.g. referrals, partners, affiliates), including both verified access and instant access widgets. See our doc on <a href="/topics/widget-types/">widget types</a> for more information.

  <p>These widgets can be placed on a page, or underneath a button within your product/behind your login, and provide an easy way to facilitate this engagment. The messaging, layout, and design of these widgets can be customized to match your brand, and the type of program they are being used to drive engagement for. 

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/ui_screenshot-unedited_2afkGfxD3bwYhZgma9rH3O.png" data-lightbox="example-set">
<img src="/assets/images/contentful/ui_screenshot-unedited_2afkGfxD3bwYhZgma9rH3O.png" alt="Self Serve Widget Editor UI - Non-Annotated">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

### Emails
<div class="row-fluid">
  <div class="span8">

<p>The SaaSquatch system is able to send out notification emails to participants in each of your SaaSquatch Growth Automation programs. From within the SaaSquatch portal you can preview, modify, and edit these notification email templates.

<p>Each of these email templates can be customized in our drag-and-drop email editor, where you can adjust the layout, design, messaging, and images in each of the program’s available email templates. 

 <p> Learn more about the email functionality available in the SaaSquatch system in our <a href="/topics/email">email guide</a>.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Email_Editor_3BGdQQe5MQSAW6UCeS0EEM.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Email_Editor_3BGdQQe5MQSAW6UCeS0EEM.png" alt="Email Editor">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

### Rewards
<div class="row-fluid">
  <div class="span7">
  <p>The SaaSquatch system is also able to provide rewards to successful program participants. These rewards can be used to rewards specific behaviour within your product/platform, or encourage future activity by the user. 

   <p>The SaaSquatch system offers a wide range of reward options to cater to different business models, cutomer segments, and stages of the customer lifecycle. 

<p>Learn more about the <a href="/feature/rewards">available reward options</a> on our Growth Automation platform, and in each of our <a href="/program/library">available programs</a>. 

  </div>
  <div class="span5">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Program_Rewards_Config_6oSpvFaYU41CR56thTFZCz.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Program_Rewards_Config_6oSpvFaYU41CR56thTFZCz.png" alt="Program Rewards Config">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>
