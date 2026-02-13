---
title: Setting Up a Custom Subdomain for a SaaSquatch Microsite
highlights: Set a custom subdomain for your SaaSquatch Microsite to align with your brand.
slug: setting-up-a-custom-subdomain-for-your-hosted-portal
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-08-16
seoDescription: Set up a Custom Subdomain for a SaaSquatch Microsite affiliate referral program.
robotsTag:
  - noindex
  - nofollow
tags:
  - Guide
---

> __IMPORTANT:__ There's a more recent doc available on this topic. Please go to: [Setting Up a Domain](/building-programs/participant-experiences/configuring-a-custom-domain).

## About SaaSquatch microsites
SaaSquatch microsites allow your affiliates or customers to sign up and have access to the referral widget. This is ideal when participants referred to your program would not have access to an account on your website (this is common for affiliates, as an example). Check out our [Microsites Overview](/building-programs/microsites/microsites-overview) doc for a high-level overview of the microsite setup process or jump straight into our [detailed setup guide](/building-programs/microsites/quickstart-guide). 

## Before you begin
This guide is for companies using SaaSquatch microsites. To set up your custom domain, you will need the ability to __either__:
- __(Recommended)__ Change your DNS (Domain Name Server) settings 
- Configure a reverse proxy to send traffic to the microsite, if you can’t change the DNS settings

### Connect a Custom Subdomain to your SaaSquatch Microsite
You can set a custom domain to more closely align with your brand. For instance, you could have `portal.YourCompany.com`.

> __Important:__ You’ll need access to your DNS (Domain Name Server) settings to do this.

1. Head to your domain register.
2. Add a new DNS record in the DNS settings for your chosen domain.
    - __Record type__: `CNAME`
    - __Host (Name)__: (enter your preferred subdomain here)
    - __Value:__ `ssqt.co`
    - __TTL__: `Automatic` or `1 Hour`
3. Notify the [Success team](mailto:success@saasquatch.com) that you have configured the CNAME record for your SaaSquatch microsite.

Next, your Solutions Architect will finish connecting the custom domain to your microsite. 

### Configure a reverse proxy for your SaaSquatch Microsite
In advanced cases, you can host a reverse proxy to `ssqt.co`. We only recommend this if:
- You can’t modify your DNS to add the CNAME record to `ssqt.co`
- You want to manage your own TLS certificate 

This option requires extra setup and infrastructure to be hosted by your technical team. 

Configure the reverse proxy to:
1. Reverse proxy all requests to your custom domain to go to `ssqt.co`.
2. Send the Host header with your custom domain along with all requests, for example Host: `referrals.example.com`.

> As SaaSquatch will not have a signed certificate for your custom domain, your reverse proxy will have to accept the default certificate for `ssqt.co` when proxying requests.
