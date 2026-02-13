---
title: Sending Program Emails From a Custom Email Address
highlights: How to set up SaaSquatch to send program emails from a custom email address using your own domain.
slug: sending-program-emails-from-a-custom-email-address
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-03-24
robotsTag:
  - noindex
tags:
  - Guide
---

By default, all emails sent for your program are sent using the email address `referral@mail.saasquat.ch`. This guide will show you how to setup SaaSquatch to send out program emails through an email address of your choosing. 

>*Note:* You will need the assistance of the team that manages your Email Service Provider. This is typically your IT or DevOps team.

### Select an Email Address
You will need an email address that makes use of a domain and ideally has a setup for dealing with incoming emails should anyone try to respond to the email they receive. This could be referrals@mycompany.com or support@referrals.mycompany.com. 

### Set up SaaSquatch
Once you have selected an email address, you will need to set up your SaaSquatch implementation to send emails using the address. This can be done one of two ways: By providing SaaSquatch with your SMTP credentials or by having us create an SPF Record. Your IT or DevOps team should indicate which solution is best for your implementation.

#### SMTP 
To have SaaSquatch send program emails through your SMTP server, use the following steps. 

>Please note that you will need to have the following details:
>- SMTP Server Hostname
>- Port
>- Authentication Method (None, TLS or SSL)
>- Username & Password

1. Go to the *Settings* page in the SaaSquatch portal and select *Integrations* from the sub-header.
2. Scroll to the *Custom SMTP Email Server* section and click the down-arrow button.
3. Enter in the credentials outlined above and click the orange *Connect* button.
4. The system will then attempt to connect to the SMTP server and let you know if it was successful.
5. Proceed with [updating the program email addresses](#updating-the-program-email-addresses).

#### DKIM Records
DKIM Records are a method that allows SaaSquatch to send legitimate emails on your behalf and using your domain. It should be noted that it is not recommended to have more than one DKIM Record for a given domain as it can cause authorization issues. Please use the following steps to set up this integration:
1. Contact the SaaSquatch Success Team at success@saasquatch.com and inform them that you would like to set up a DKIM Record and which domain you would like it to be for. Your IT or DevOps Team should be aware of this request.
2. Once you have received the contents for the DKIM Record, have your IT or DevOps Team add it to your DNS Records for the domain.
3. Let the SaaSquatch Success Team know once the record has been created and they'll perform an authentication to confirm. 
4. Proceed with the following steps to [update the program email addresses](#updating-the-program-email-addresses).

### Updating the Program Email Addresses
1. Click on *Programs* in the header of the SaaSquatch portal and click *Edit* for the program you would like to adjust the email address for.
2. Scroll down and click the *Customize* button for each email.
3. Change the "From Address" field with the new email address.
4. Send a test email to confirm the new settings are working as expected.