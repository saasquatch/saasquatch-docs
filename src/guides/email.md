---
title: Email
highlights: |
    Referral SaaSquatch uses email for 3 separate things: Identifying users, sharing between users and notifications of referrals.
slug: topics/email
template: guides.html
---


<div class="row-fluid">
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-user fa-3x fa-rounded"></i>
            <h3>Email Identification</h3>
        </div>
        <p>Referral SaaSquatch tracks email addresses to <a href="/topics/identification">identify</a> users.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-share fa-3x fa-rounded"></i>
            <h3>Email Sharing</h3>
        </div>
        <p>Referral SaaSquatch lets your users make referrals by letting them send their friends an email.</p>
    </div>
    <div class="span4">
        <div class="align-center">
            <i class="fa fa-paper-plane fa-3x fa-rounded"></i>
            <h3>Email Notifications</h3>
        </div>
        <p>Referral SaaSquatch can automatically send email notifications to keep your users informed about their progress in the referral program.</p>
    </div>
</div>

---

### <i class="fa fa-user"></i> Email Identification

Referral SaaSquatch tracks an `email` field for each of your users. Emails can be included as an optional field
for users <a href="/api/methods/#create_user">created via the API</a> or <a href="/squatchjs/#init">Squatch.js javascript library</a>. If you provide email addresses for your users, 
then SaaSquatch can use that information for analytics, fraud management, sharing optimization and email notifications.

--- 

### <i class="fa fa-share"></i> Email Sharing

Users are given the opportunity to make referrals on email, in addition to directly sharing a referral link or referral code, or by posting on social media. These emails are either
initiated by the user using an email form directly, or through a company triggered email share. 

 - User-initiated emails (sent from john@gmail.com)
 - Company-triggered emails (sent from referrals@your-company.com) <span class="label">Enterprise Plan Feature</span>


#### Examples

<div>
<a class="docs-lightbox" href="/assets/images/email-gallery/email-typeform-share.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-typeform-share.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>

<a class="docs-lightbox" href="/assets/images/email-gallery/email-kobo-share.png" data-lightbox="email-gallery">
    <img class="example-image" src="/assets/images/email-gallery/email-kobo-share.png" alt="">
    <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

---

### <i class="fa fa-paper-plane"></i> Email Notifications

Referral SaaSquatch send email notifications for two types of events.

 - `email.referral.started` Sent whenever a new referred user signs up for a new trial or free account.
 - `email.referral.paid` Sent whenever a new referred user converts as a full successful referral

Notifications emails by default are sent using Referral SaaSquatch's internal email service provider (ESP), through [Mandrill](https://mandrill.com), a Mailchimp company.
Email notifications do not need to be sent through Mandrill. Instead of delivering email notifications for you, email can be sent through your own SMTP servers, email service provider or 
tool. If you're interested in handling email delivery internally, review the documentation on [webhooks](/api/webhooks) and get in touch with [support@saasquat.ch](mailto:support@saasquat.ch)
to turn this feature on for your account.

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

