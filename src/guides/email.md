---
title: Email
highlights: |
    Referral SaaSquatch uses email for three separate things: Identifying users, sharing between users, and notifications of referrals.
slug: topics/email
sectionType: guide
template: hasTableOfContents.html
---


<div class="row-fluid">
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-user fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Identification:</b> Referral SaaSquatch tracks email addresses to <a href="/topics/identification">identify</a> users.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-share fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Sharing:</b> Referral SaaSquatch lets your users make referrals by letting them send their friends an email.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-paper-plane fa-3x fa-rounded" style="margin: 20px auto"></i>
        </div>
        <p><b>Email Notifications:</b> Referral SaaSquatch can automatically send email notifications to keep your users informed about their progress in the referral program.</p>
    </div>
</div>

---

### <i class="fa fa-user"></i> Email Identification

Referral SaaSquatch tracks an `email` field for each of your users. Emails can be included as an optional field
for users <a href="/api/methods/#create_user">created via the API</a> or <a href="/squatchjs/#init">Squatch.js javascript library</a>. If you provide email addresses for your users, 
then SaaSquatch can use that information for analytics, fraud management, sharing optimization and email notifications.

--- 

### <i class="fa fa-share"></i> Email Sharing

Users can initiate sending a share message by email directly through the Referral SaaSquatch widget on your website or in your app. The mail link is a standard "mailto:" where a user clicking the email share link directs opens their email client of choice to complete the share process. In their email client the referrer can then simply input the email address of the desired recipient and make any personalizations to your referral program's standard email message.

#### Example

<div>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-typeform-share.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-typeform-share.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

---

### <i class="fa fa-paper-plane"></i> Email Notifications

Referral SaaSquatch provides a complete notification email service for your referral program. 

Email notifications are available to be sent whenever a referred user signs up for a new trial or free account, and then again whenever a referred user converts to "paid" as a successful referral. These notifications allow the referrer to track the progress of their referrals and be notified when they have earned a reward.


The content of the emails sent to your customers through Referral SaaSquatch can also be customized using the theme engine. Basic plans have the ability to customize the header image, title, and content of the message they send to their users. Pro and Enterprise accounts are able to fully customize the email theme through a similar manner to their [widget customization](https://docs.referralsaasquatch.com/themes/).

By default, notifications are sent using Referral SaaSquatch's internal email service provider (ESP) [SendGrid](https://sendgrid.com/). 

In addition to the default email notification option, the Pro and Enterprise plans provide the ability to setup more advanced email functionality. There are three options for more advanced email notification functionality; SMTP, Webhooks, and SPF Record setup. Setup instructions, examples, and the advantage of each of these options will be covered below:

#### SMTP

It is possible to set up your own SMTP Server to manage notification emails.

To disable SaaSquatch sending notification emails, and start using your own SMTP Server, head over to the Integrations page under the Setup sidebar heading in your SaaSquatch portal. 

Here you can input the details of your SMTP server. The required fields are: 
- SMTP Server Hostname and Port 
- Authentication Method (options include "No Encryption", "TLS", and "SSL") 
- Username and Password

Test the connection to your SMTP Server to make sure all the information if correct, and then connect the SMTP server to your program.

#### Webhooks

[Webhooks](https://docs.referralsaasquatch.com/api/webhooks/) provide a solution for retrieving information through services, either not directly responsible for making an API request, or for events, like coupon created, which are not the result of a direct API request. 

The two webhook events which are relevant to the email notifications are `email.referral.started`, for notifications when a referred user signs up for a trial, and `email.referral.paid` to notify whenever a referred user upgrades to a paid subscription.

Picking up these two webhook events gives you the flexibility to send out your own notification emails using your preferred email service, without needing to integrate directly with Referral SaaSquatch or make API calls.

To create a webhook subscription to SaaSquatch use:

```json
Type: POST
URL: https://app.referralsaasquatch.com/api/v1/{tenant_alias}/subscription
```


**Example curl request:**

```bash
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/subscription \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "endpointUrl": "http://app.example.com/endpoint/sqtch",
    "name": "Zapier"
}'
```

Which, if successful, should return a response code: `HTTP 201`

You will then start receiving events via webhooks to the endpoint URL that was included above.

Please refer to the [webhook documentation](https://docs.referralsaasquatch.com/api/webhooks/) for a detailed look at all the Webhook events, restrictions, and best practices.

All webhook data conform to the same data format:

<table class="table table-hover">
<tbody>
    <tr>
        <th class="docs-monospace">id</th>
        <td>String - A unique identifier for this event</td>
    </tr>
    <tr>
        <th class="docs-monospace">type</th>
        <td>String - The type of event</td>
    </tr>
    <tr>
        <th class="docs-monospace">tenantAlias</th>
        <td>String - The tenant used to create this data</td>
    </tr>
    <tr>
        <th class="docs-monospace">live</th>
        <td>Boolean - True for live tenants and false for test tenants</td>
    </tr>
    <tr>
        <th class="docs-monospace">created</th>
        <td>Number - The timestamp when this event was created</td>
    </tr>
    <tr>
        <th class="docs-monospace">data</th>
        <td>An abitrary JSON object containing data related to this event</td>
    </tr>
</tbody>
</table>

Check for the `email.referral.started` and `email.referral.paid` type strings in the webhook data. 

The `email.referral.started` event will return data in the format:

```json
{
    "id": "1337049u0194u2105",
    "type": "email.referral.started",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,
    "data": {
        "recipientUserId": "u1234",
        "recipientAccountId": "a1234",
        "subject": "Congratulations! Susy Example signed up for a trial account.",
        "message": "&lt;p&gt;This is rendered HTML content.&lt;/p&gt;"
    }
}
```


While the `email.referral.paid` event will be in the format:

```json
{
    "id": "1337049u0194u2105",
    "type": "email.referral.paid",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,   
    "data": {
        "recipientUserId": "u1234",
        "recipientAccountId": "a1234",
        "subject": "Congratulations! Susy Example signed up for a paid subscription.",
        "message": "&lt;p&gt;This is rendered HTML content.&lt;/p&gt;"
    }
}
```

You can then make use of the [Lookup User](https://docs.referralsaasquatch.com/api/methods/#get_user) API call to grab the email address of the referrer based on the `recipientUserId` parameter in the webhook event.

This information provides everything needed to send out your own emails to the referrer informing them about the trial or paid status of their referrals.

#### SPF Record Setup

The SPF (Sender Policy File) allows you to define a hostname or IP address from which email for a given domain can originate.

Setting up the SPF Record will allow you to utilize our email servers for sending out notifications, but make it look like the emails were sent from your domain.

The SPF Record is a text record that is kept as part of the domain’s DNS zone file and is stored in the same format as the A, MX, and CNAME records. Once this is set there are no further changes that need to be made. 

To allow your notification emails to be sent by Referral SaaSquatch you will need set the SPF Record to list our IP address in the SPF Record. If you are looking at setting up your email SPF Record with Referral SaaSquatch please contact our [success team](mailto:success@referralsaasquatch.com) so that they can help you with this process.
It is discouraged to create more than one SPF Record for a given domain as they can cause authorization problems. This can become a problem when trying to send out emails from your own domain as well as allowing Referral SaaSquatch to send out notifications for referral events from the same domain. This limitation should be taken into consideration before deciding to make use of our SPF email support.

#### Silverpop

Silverpop is an email marketing automation platform. 
Referral SaaSquatch supports integration with Silverpop for sending notification emails. To enable our Silverpop integration head over to the Integrations page under the Setup sidebar heading in your SaaSquatch portal. 

Here you can input the details for your Silverpop account:
- HTTP Submit Address
- Referral Complete Email Campaign ID
- Supplemental Values:
    - Name, and Value

Test the connection to your Silverpop account to make sure all the information is correct, and then connect Silverpop to your referral program.


#### Examples

<div>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-ballpark-referral-done.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-ballpark-referral-done.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-kobo-referral-done.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-kobo-referral-done.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-snapwire-referral-started.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-snapwire-referral-started.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-ghost-referral-done.gif" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-ghost-referral-done.gif" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

