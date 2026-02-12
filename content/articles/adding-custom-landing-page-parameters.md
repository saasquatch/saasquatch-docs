---
title: Adding Custom Landing Page Parameters
highlights: The guide explains how to add custom url parameters to your referral landing page url within the SaaSquatch system.
slug: adding-custom-landing-page-parameters
sectionType: guide
template: hasTableOfContents.html
date: 2022-01-06
seoDescription: Add custom URL parameters to the referred user landing page for your referral program...
tags:
  - url param
  - URL 
  - URL parameters 
  - Landing page
---

## Referral Program Landing Page URL Parameters
When building a referral program with SaaSquatch, you will need to specify a landing page. This is where a referred user will end up after clicking on a share link for your referral program.

Our system also adds several URL Parameters to the landing page URL. These Parameters are for UTM-based analytics, as well as the referral program itself. Read about the URL Parameters that get added here.

You can also add your own URL Parameters to the landing page URL. These can be for discount codes, custom analytic tracking or program logic on the page itself. Parameters can be added via the program configuration, or by adding them straight to SaaSquatch Share Links.

## Adding URL Parameters via Program Configuration
The SaaSquatch system will pass through any parameters included when setting the landing page URL.  For example, a landing page URL of `www.example.com/landingpage?discountCode=REFERRED20` will become:

### How-to add URL parameters to a landing page URL
1. Navigate to the [SaaSquatch Admin Portal](https://app.referralsaasquatch.com/portal/ "SaaSquatch Admin Portal Login Page").
2. Click on the Referral Program you would like to edit.
3. Scroll down to the **Landing Page** section and click on the "Edit" button.
4. Add the custom URL parameters to the landing page URL and click "Save".

## Adding URL Parameters via Share Links
You can also add parameters to a share link and they will pass through to the landing page URL itself. This is useful for email campaigns, tracking sales reps and adding discount codes.

For Example:
1. The original landing page is `www.example.com/landingpage`

2. Add `?salesRep=BOB` to the Share Link: `http://ssqt.co/mznBbXg?salesRep=BOB`

3. When the landing page loads, it will be: 
`http://www.example.com/landingpage?salesRep=BOB&utm_source=invite&utm_medium=link&utm_campaign=saasquatch&rscode=ALEXREFERRED287&rsShareMedium=UNKNOWN&rsEngagementMedium=UNKNOWN`

It is also possible to override a referral program's default landing page. To do this, add the `rsLandingPage` parameter with an alternate page on the same domain:
1. The original landing page is `www.example.com/landingpage`

2. Add `?rsLandingPage=https://www.example.com/newlandingpage` to the Share Link: `http://ssqt.co/mznBbXg?rsLandingPage=https://www.example.com/newlandingpage`

3. When the landing page loads, it will be: 
`http://www.example.com/newlandingpage?utm_source=invite&utm_medium=link&utm_campaign=saasquatch&rscode=ALEXREFERRED287&rsShareMedium=UNKNOWN&rsEngagementMedium=UNKNOWN`

## Good To Knows
- It is not possible to add variable values to the parameters. One value needs to be hard-coded and will be added to every landing page provided to referred users.
- A URL Parameter added here will not override the default behaviour of the SaaSquatch system for the same parameter. For example, adding `utm_campaign=referralProgram` will not override the default value of `utm_campaign=saasqautch`.
- When passing through an alternate landing page URL using `rsLandingPAge`, it needs to be on the same subdomain and domain as the original landing page. For example, substituting refer.example.com/landingpage will not work as an alternate for www.example.com/landingpage.