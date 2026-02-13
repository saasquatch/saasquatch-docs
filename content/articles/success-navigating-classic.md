---
title: SaaSquatch Portal for Classic Referral Programs
highlights: "This page outlines the Program page of our portal for the Classic Referral Program (pre-2018). To learn about the current most updated version of the portal, check out [Navigating the SaaSquatch Portal](/success/navigating-the-portal/)."
slug: success/navigating-classic
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-11-23
---

><span class="label">Classic only</span> **Note:** This page details a feature that is no longer available to new customers for archival purposes. If you were onboarded with SaaSquatch later than 2017, this guide does not apply to your setup.

## Program
This sub-tab contains the configuration for your widget and emails, settings for your rewards and security, and your program analytics.

### Widget

> To read about Growth Automation Program Widget management, see our [GA Program Setup Quickstart page](/growth/quickstart#widgets).

Under Programs in the top navigation, select **Widget**.

<br></br>

<div class="row-fluid">
  <div class="span5">

![Portal Widget - Right Sidebar](/assets/images/contentful/Portal_Widget_-_Right_Sidebar_1h9pAMoeEgKc4O22wGu44U.png)

  </div>
  <div class="span7">
        <p>This section of the portal will display a live render of your program's Referral Widgets. These renders are identical to the embedded or popup (<a href="/developer/testing#test-vs-live">live or test</a> depending on the tenant) version of the widgets which can be included in a webpage. 
<br><br>
The render for each type of widget provides a preview of the layout and messaging for your widget with pre-filled test data that does not reflect real statistics.
          <br><br>
          The Sidebar on the right hand side provides options to change various visual aspects of the widgets:<br>

  <ul><li>The <b>Customize your Widget</b> section offers options to change the wording, colors, and font of your selected type of widget.<br></br></li>

<li>The <b>Share Messaging</b> section lets you adjust the default wording for email, Facebook, Twitter, and other platforms' share messages your users share with their friends and family in the Referrer's Widget. This will update the share messaging in the widget and in the notification emails.<br></br></li>

<li>The <b>Widget Preview</b> options allow you to change the language and locale of the test render of your selected widget being displayed in the portal. This option can be extremely useful when trying to quickly test what your widget will look like when displayed to your users around the world.</li></ul>

  </div>
</div>

### Emails

>To read about Growth Automation Program Email management, see our [GA Program Setup Quickstart page](/growth/quickstart#emails).

This section will allow you to customize notification emails that are sent to your program participants. 

Email notifications can be sent out to users when:
- A friend signs up with the referral program (`referral.started` webhook event).
- Referred Users complete the referral and the Referrer’s reward is ready (`referral.completed` webhook event).
- A Referrer or Referred User earns a reward (`reward.created` webhook event). 

Options for changing Email Notification settings can be found in **Emails** under the Programs on the main navigation.

All of the email types offer a wide range of possible customization changes to the default email template. It is also possible to enable/disable any of the email types.

<br></br>

<div class="row-fluid">
    <div class="span7">
    <h4>Edit</h4>
        <p>The email templates can be edited to fit your program requirements.
<br><br>
<b>Changes</b> can be made to:   
          <br>

  <ul>
  <li>From Name</li>
  <li>From Address</li>
  <li>Subject</li>
      <li>Header Image URL</li>
  <li>Header Content</li>
      <li>Body Content</li>
  <li>Share Code CTA</li>
      <li>Share Button Header</li>
  <li>Footer</li>
    <li>Ability to enable Share Links</li>
    </ul>

  </div>

  <div class="span5">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Notification_Emails_-_Tempalates_-_Referral_Complete_6TBCKt0hRm4uS0ioE8gemA.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Notification_Emails_-_Tempalates_-_Referral_Complete_6TBCKt0hRm4uS0ioE8gemA.png" alt="Notification Emails - Templates - Referral Complete]">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
<p><br><br><b>Options</b> are also available for:   
          <br>

  <ul>
  <li>Previewing changes</li>
  <li>Sending a test version of the email to a specific email address</li>
  <li>Publishing changes</li>
      <li>Restoring the default values</li>
    </ul>

  </div>

</div>

#### Preview
The preview option for each of the email event types provides a render of a desktop and mobile version of the referral email. 

It is also possible to test the email preview render with a different language and locale provided you program is configured correctly for internationalization if configured.

> Our developer documentation provides further information about [email notifications](/topics/email/#email-notifications).

### Settings
The **Settings** section provides the ability to configure Program Setup, Reward Settings and Program Display Settings.

##### Program settings

>To read about Growth Automation Program Settings, see our [GA Program Setup Quickstart page](/growth/quickstart#settings).

- **Landing Page**

The referral landing page is where the share links will direct people who are referred to your product. Often this is your main webpage, other times this is a specialized referral welcome/signup page.

**Note:** Please make sure to include the `http://` or `https://` at the front of the URL.

*Correct Examples:*
- `http://example.com`
- `https://example.com`
- `http://www.example.com`

*Incorrect Examples:*
- `example.com`
- `www.example.com`

If you have setup your referral program with [Branch Metrics](/branch-metrics/) for mobile deep linking then this referral landing page will only apply to your desktop user. Users accessing a share link on mobile will be directed to the the app store or your mobile app as setup in your branch settings. More information on our integration can also be found in our [documentation](/mobile/branch-metrics/).
- **Fallback URL**

The fallback URL is the address of where your users should be directed in the case of a broken sharelink when a project is making use of a [custom short domain](/customshortdomainguide). 

##### Reward Settings

>To read about Growth Automation Program Reward Settings, see our [GA Program Setup Quickstart page](/growth/quickstart#rewards).

This option gives you the ability to adjust the value of the rewards that will be given out to referral participants upon the successful [completion](/success/core-topics/#conversion) of a referral. You can adjust the Referrer and Referred User rewards independently of one another for added customization.

**Please note:** Changing your program rewards will only apply to future rewards. Existing rewards will not be retroactively changed.

##### Program display settings
Referral Programs created after November 2016 will include additional settings in the portal for configuring display of the Referral Widgets when making use of our [squatch.js](/developer/squatchjs/) library.

These settings allow you to configure which pages on your website you want to display the referral program, and what pages you would like to use as a [conversion](/topics/conversion/) trigger.

- **Conversion URL(s)**

When your Referred Users have hit the goalpost for your referral program their referral needs to be [converted](/success/core-topics/#conversion) to release the reward for the Referrer. Read more about the touchpoints that make up a referral program in our [How Referral SaaSquatch Works](/success/core-topics/) article.

This conversion mechanism can be triggered for a referral when a Referred User lands on a specific page. This page can be set with the Conversion URL field. You can also set multiple conversion URLs.

- **Widget Display Rules**

The Widget Display Rule settings can be used to configure what [type of widget](/topics/widget-types/) will be displayed on which page. There are two types of widgets that can be displayed using the Widget Display Rules:

| Referrer Widget     | Referred User Widget     |
| ---------- | ---------- |
| ![Referrer Widget](/assets/images/contentful/morp-referrer-widget_5IlzP8WjYIE46AQy8UAcmI.png)| ![Referred User Widget](/assets/images/contentful/morp-conversion-widget_5pVQzLjgVqacGASsmscOgo.png)|

>*To display a widget:*
>- Select the type of widget you would like the Display Rule to trigger ('Referrer's Widget' or 'Referred User Widget').
>- The URL on which you would like to show the widget.
>- Place [element](https://saasquatch.github.io/squatch-js/classes/PopupWidget.html) on the page to trigger a popup.
>  - The Widget can also be displayed as a [CTA rather than a Popup](/assets/images/contentful/Referrer_widget_CTA_4ttUUBcf60268yO6agOmk6.gif). If so, check the **Show CTA** option.
>- Click **add rule**.
>
> You can add as many widget display rules as you would like to display the widget throughout your product.

### Analytics
> See the section below on "Analytics" for a more comprehensive view.

### Security
The Security Management System section of the portal allows for configuration of the referral moderation process which helps prevent fraudulent referrals. 

The Sections here include:
- **Pending Referrals** - List of Pending referrals including any applicable fraud criteria
- **Referral History** - List of Historical Approved and Denied referrals

#### Security options
Security options can be configured via the "Settings" sub-menu under *Security*.

> An overview of [Security Management System](/success/referral-security/) can be found in our Success Center while an in-depth guide with [details about the workings of this feature](/developer/referral-security/) can be found in our developer documentation.

## Analytics

- __[Program Analytics](/success/analytics-data/)__ provides a wide range of rich data which can be used to review the activity and progress of your program.
- The __[Referral Feed](/success/referral-feed/)__ provides a list of recent referral events for your program.
- The __[Reports tab](/success/navigating-the-portal/#reports)__ provides a place to bulk upload and extract report data, as well a history of any Import or Export jobs listed in chronological order.

## Participants
The [Participants tab](/success/navigating-the-portal/#participants) dives in depth with a list of all customers who have been registered in your referral program. It also allows you to segment or import users.

## Settings
This [settings section](/success/navigating-the-portal/#settings) houses all the global settings for all your programs. 