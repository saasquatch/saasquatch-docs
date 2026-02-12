---
title: SaaSquatch & Emails
highlights: "SaaSquatch uses email for three separate things: Sending notifications to participants, Identifying users, and sharing between users."
slug: topics/email
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-23
---


<div class="row-fluid">
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-user fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Identification:</b> SaaSquatch tracks email addresses to <a href="/success/core-topics/#identification">identify</a> users.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-share fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Sharing:</b> SaaSquatch lets your users make referrals by letting them send their friends an email.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-paper-plane fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Notifications:</b> SaaSquatch can automatically send email notifications to keep your users informed about their progress in the SaaSquatch program.</p>
    </div>
</div>

---

### <i class="fa fa-user"></i> Email Identification

SaaSquatch tracks an <code>email</code> field for each of your users. Emails can be included as an optional field
for users <a href="/api/methods/#open_user_upsert">created or updated via the API</a> or <a href="/developer/squatchjs/v2/#tracking-script">Squatch.js javascript library</a>. If you provide email addresses for your users, 
then SaaSquatch can use that information for analytics, fraud management, sharing optimization and email notifications.

--- 

### <i class="fa fa-share"></i> Email Sharing

<div class="row-fluid">
  <div class="span8"><p>Users can initiate sending a share message by email directly through the SaaSquatch widget on your website or in your app. The mail link is a standard <code>mailto:</code> where a user clicking the email share link directs opens their email client of choice to complete the share process. In their email client the Referrer can then simply input the email address of the desired recipient and make any personalizations to your referral program's standard email message.

  </div>
  <div class="span4">
  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-23_at_8.39.26_AM_2WYkLXLr9iVovCCrb2Ylh2.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/contentful/Screen_Shot_2019-09-23_at_8.39.26_AM_2WYkLXLr9iVovCCrb2Ylh2.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
  </div>
</div>

---

### <i class="fa fa-paper-plane"></i> Email Notifications
Email notifications are sent whenever the following events occur in one of your Growth Automation or Classic Referral Programs:

- **Referral Started**: An email is sent to the Referrer letting them know that the Referred User has completed the attribution process.
- **Referral Completed**: An email is sent to the Referrer informing them that the referral has converted, the Referred User has successfully completed the requirements of the program.
- **Referred User Rewarded**: An email is sent to the Referred User letting them know that they successfully completed the requirements of the program and have received a reward.
- **Reward Limit Reached**: An email is sent to the Referred User letting them know that they have received another reward but have reached the reward limit and will not receive further rewards.

The following emails are sent out to Participants of our non-referral Growth Automation Programs (*i.e.* Birthday or Repeat Purchase):

- **Reward Created Email**: This email is sent to participants notifying them they have received a reward for successfully meeting the requirements of the specific Growth Automation Program.
- **Birthday Summary Email**: This email is sent to participants on or around their birthday (depending on the rules of the program) when the Birthday program is active. The email notifies them of the reward they have received for their birthday.
- **VIP Summary Email**: This email is sent to participants when they have reached a specific total purchase value.

#### Email Theming 
Email theming for Growth Automation Programs is done the comprehensive drag-and-drop Email Editor in the SaaSquatch Portal. A guide on how to use the editor can be found **[here](/themes/emails/)**.

#### Default ESP
By default, notifications are sent using SaaSquatch's internal email service provider (ESP) [SendGrid](https://sendgrid.com/). 

<table class="table">
<tr>
<th style="width:50%">Name</th>
<th>Formatting</th>
<th>Delivery</th>
</tr>
<tr>
<td>
  <b>We format & we deliver</b> <span class="label">Default</span> <br/>
  <small>Emails are formatted by the SaaSquatch Theme Engine and 
  sent using SaaSquatch's default email service provider.</small>
</td>
<td>SaaSquatch</td>
<td>SaaSquatch</td>
</tr>
<tr>
<td>
  <b>We format & you deliver</b><br/>
  <small>Emails are formatted by the SaaSquatch Theme Engine and 
  sent using via your email servers using SMTP or Webhooks.</small>
</td>
<td>SaaSquatch</td>
<td>You</td>
</tr>
<tr>
<td>
  <b>You format & you deliver</b><br/>
  <small>Intended for advanced use cases. Emails are formatted and delivered
  entirely by you building off the SaaSquatch API or Webhooks</small>
</td>
<td>You</td>
<td>You</td></tr>
</table>

In addition to the default email notification option, the Enterprise and Managed plans provide the ability to setup more advanced email functionality. There are three options for more advanced email notification functionality: **SMTP**, **Webhooks**, and **SPF Record setup**. Setup instructions, examples, and the advantage of each of these options are covered below:

#### SMTP

It is possible to set up your own SMTP Server to manage notification emails.

To disable SaaSquatch sending notification emails and start using your own SMTP Server, head over to the Integrations page under the Setup sidebar heading in your SaaSquatch portal. 

Here you can input the details of your SMTP server. The required fields are: 
- SMTP Server Hostname and Port 
- Authentication Method (options include "No Encryption", "TLS", and "SSL") 
- Username and Password

Test the connection to your SMTP Server to make sure all the information if correct, and then connect the SMTP server to your program.

#### Webhooks

[Webhooks](/api/webhooks/) provide a solution for retrieving information through services, either not directly responsible for making an API request, or for events, like coupon created, which are not the result of a direct API request. 

> Please refer to the [webhook documentation](/api/webhooks/) for a detailed look at all the Webhook events, restrictions, and best practices.

#### SPF Record Setup

The SPF (Sender Policy File) allows you to define a hostname or IP address from which email for a given domain can originate.

Setting up the SPF Record will allow you to utilize our email servers for sending out notifications, but make it look like the emails were sent from your domain.

The SPF Record is a text record that is kept as part of the domain’s DNS zone file and is stored in the same format as the A, MX, and CNAME records. Once this is set there are no further changes that need to be made. 

To allow your notification emails to be sent by SaaSquatch you will need set the SPF Record to list our IP address in the SPF Record. 

__It is discouraged to create more than one SPF Record for a given domain as they can cause authorization problems.__ This can become a problem when trying to send out emails from your own domain as well as allowing SaaSquatch to send out notifications from the same domain. This limitation should be taken into consideration before deciding to make use of our SPF email support.

><span class="label">Classic only</span> **Note:** If you running a Classic program (pre-2018), you'll need to set up your email SPF Record by contacting our [success team](mailto:success@referralsaasquatch.com) so that they can help you with this process.

#### IBM Watson Marketing

IBM Watson Marketing (formerly Silverpop) is an email marketing automation platform. 
SaaSquatch supports integration with IBM Watson Marketing for sending notification emails. To enable our IBM Watson Marketing integration head over to the Integrations page under the Setup sidebar heading in your SaaSquatch portal. 

Here you can input the details for your Silverpop account:
- HTTP Submit Address
- Referral Complete Email Campaign ID
- Supplemental Values:
    - Name, and Value

Test the connection to your IBM Watson Marketing account to make sure all the information is correct, and then connect IBM Watson Marketing to your program.