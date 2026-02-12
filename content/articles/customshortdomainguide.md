---
title: Connect a custom domain for Share Links
highlights: "Adding a custom domain to your share links will replace the default “.ssqt.co\" domain when users send their referral share links. Example: referral.your-domain.com/unique-referral-code (subdomain setup) or your-domain.com/unique-referral-code (root domain setup)"
slug: customshortdomainguide
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-24
seoDescription: When your customer shares their referral link, you can ensure the link aligns with your brand by using a custom domain share link... 
robotsTag:
  - noindex
tags:
  - domain
  - subdomain
  - short domains
  - Share Link
  - Custom domain share link
---

## Recommended Setup - Subdomain - Using CNAME Record

The Recommended approach uses a subdomain from an existing domains. For example, if your root domain was your-domain.com your Custom Domain Share Link could be: example. your-domain.com followed by the participant’s unique share code. 

1. Head to your domain register.
2. In your DNS settings for your chosen domain, Add this DNS record: 
   - Record type: CNAME
   - Host (Name): example (Enter your preferred subdomain here)
   - Value: ssqt.co
   - TTL: Automatic, or 1 Hour. 
1. Contact your SaaSquatch Solutions Architect, notifying them you have configured the CNAME record.
2. Verify the custom domain name is arriving on your landing page by heading to any participant in your program and viewing their Share Link. If properly configured you will see your Custom domain Share Link.
3. Congratulations! Your Share Links are now using a custom domain. 

## Alternative Setup - Root Domain - Using A-Record
1. Contact your SaaSquatch Solutions Architect, notifying them you would like to use a Root domain for your Custom Domain Share Link. SaaSquatch will provide you with a unique A-Record.
2. Head to your domain register.
3. In your DNS settings for your chosen domain, Add the A-Record provided by your SaaSquatch Solution Architect. 
4. Contact your SaaSquatch Solutions Architect, notifying them you have configured the A-Record.
5. SaaSquatch will provision a secure SSL certificate for this domain. SaaSquatch will add the custom domain to your Share Links on your Test Tenant.
6. Verify the custom domain name is arriving on your landing page by heading to any participant in your program and viewing their Share Link. If properly configured you will see your Custom domain Share Link.
7. Congratulations! Your Share Links are now using a custom domain.

__Default share links will continue to work even when a Custom Domain Share Link is used.__
