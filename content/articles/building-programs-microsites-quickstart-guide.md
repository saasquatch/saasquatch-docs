---
title: Setting Up a Microsite
highlights: Get your SaaSquatch-hosted microsite up and running in no time with our setup guide.
slug: building-programs/microsites/quickstart-guide
sectionType: designerArticle
template: hasTableOfContents.html
date: 2023-07-31
robotsTag:
  - FOLLOW
---

> __Important__: Before attempting to set up a microsite, make sure your plan supports one. If you’re not sure or would like to talk about upgrading, then reach out to our Success team for details.

For a quick microsite setup experience, we recommend that most clients use the auto setup feature. This guide will show you how. 

## 1. Run microsite auto setup
1. Log on to the SaaSquatch Admin Portal.
2. Click __Content__ in the top menu bar.
3. Click the __Setup__ button at the bottom of the Microsite card.
4. Under the Auto setup heading, click the __Setup Referral Microsite__ button.
5. Click __Auto setup__ on the popup that appears.

## 2. Link your microsite with your program
This step is completed in the microsite editor.

1. Open the microsite editor.
    - In the microsite card, click the __Edit content__ button to go to the microsite editor.
    - Click the __Microsite__ tab in the left sidebar menu.
2. Select the __Microsite Base Layout__ row in the Microsite panel that appears.
3. Click the __Layers__ tab in the left sidebar menu (under the heading “Current Layout”).
4. Click the __Program Section__ row in the Layers tab that appears.
5. In the Edit sidebar menu at the right side of the page, use the dropdown menu to pick your program ID.
6. Click __Save__ in the top right corner of the page.

## 3. Adjust your microsite participant ID method and registration settings
> __Note:__ These steps are optional and can be skipped if you don’t want to make changes.

### Changing the ID method
By default, your microsite will assign user IDs based on the user’s email address. If you’d prefer to have user IDs randomly generated, you can switch your settings from the microsite setup area. 

> *Regardless of the ID method selected, participants can't change their email address after registering.* 

1. Go to the __Content__ tab in the Admin Portal.
2. Click the __Edit Settings__ button on the Microsite card.
3. Under the Participant Login heading, find the ID Method option.
4. Click __Edit__.
5. Change the ID method to Random IDs if desired. 

### Modifying the registration form
The registration form collects the name and email address of every participant who signs up through your microsite. You can change what information the form collects by modifying the registration form in the microsite editor. 

1. Go to the __Content__ tab in the Admin Portal.
2. Click __Edit content__ on the microsite card.
3. Go to the __Register__ page. If you used auto setup to create the microsite, then the Register page is under the Logged Out Layout in the Microsite tab.
4. Add form-specific Microsite Components to the page. 
5. Click __Save__ in the top right corner of the page. 

> __Note:__ If you have a Salesforce integration set up, then information collected by the form can be sent directly to Salesforce as a Lead or Contact. For more information and setup instructions, see [Managing Microsite Registration Form Submissions](/building-programs/microsites/registration-forms/).

## 4. Add a domain to your microsite
> __Note__: This step is optional and can be skipped if you don’t want to make changes.

By default, your microsite uses a SaaSquatch-branded domain, but many clients opt to use a domain you own. See our guide on [setting up a domain](/building-programs/participant-experiences/configuring-a-custom-domain) if you want to use one for your microsite.

## 5. Add custom HTML to the head of your microsite
By default, we include HTML that sets up a tab icon at the top of your browser tab. You can replace the icon with your company’s logo—if you don’t, the tab will show the SaaSquatch logo. The `head` element is also where you can insert SEO-related script tags and other branding/styling elements if desired.

1. Go to the __Content__ tab in the Admin Portal.
2. Click the __Edit Settings__ button on the Microsite card.
3. Under the Site Hosting heading, find the Head HTML option.
4. Click __Edit__.
5. Paste your script.

## 6. Customize your microsite's layout and pages
The default microsite has a template applied, but should be customized before it’s rolled out to your participants. You can customize the layouts, pages, branding, and content of the site. 

At minimum, we recommend:
- Customizing the dashboard
- Modifying the brand container
- Customizing the microsite header
- Reviewing the lifecycle email templates
- Editing page content

See our doc on [Customizing Microsite Layouts and Pages](/building-programs/microsites/customizing-microsites) an in-depth look at how to do these and more.