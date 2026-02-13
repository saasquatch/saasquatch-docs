---
title: SaaSquatch Admin Portal
slug: success/using-referral-saasquatch
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-04-24
seoDescription: "Your home base for managing your programs, content and rewards is the SaaSquatch Admin Portal. In this guide, you'll find important structural information, details on what each tab has to offer, and helpful resources to get you started."
---

Your home base for managing your programs, content and rewards is the [SaaSquatch Admin Portal](https://app.saasquatch.com/). In this guide, you’ll find important structural information, details on what each tab has to offer, and helpful resources to get you started.

## Portal layers and structure
The Admin Portal is organized into three layers: tenants, projects and organizations.

Use the tenant selection dropdown in the top navigation menu to switch between tenants or get to your project and organization settings. 

### Tenants
The Admin Portal has both a staging and a production environment, which we call __test__ and __live tenants__, respectively.

The __test tenant__ is your starting point for creating programs, trying out reward options, and setting up integrations. Anything that’s set up in the test tenant won’t be available to your participants — so it's a safe space to make sure your integrations and program rules work as intended. 

The __live tenant__ houses the version of your program that participants can interact with. It acts as a record of all program, participant and referral activity. Because programs can’t be deleted in the live tenant, we recommend only setting up programs that have been fully tested. 

<details> 
  <summary> Learn more about <b>tenant settings</b> throughout our docs site. Here are a few resources to get you started.
  </summary>

- [Setting Up a Domain](/building-programs/participant-experiences/configuring-a-custom-domain/#using-a-domain-for-share-links) for share links
- [W-9 Compliance](/features/w-9-compliance/)
- [How to load a Referral Widget on a Web Page](/how-to-load-a-referral-widget-on-a-web-page/)
- [API Webhooks](/api/webhooks/)
- [Integrations](/integrations)

</details> 

### Projects
Projects act as a container for your tenants. New members of your team are added at the project level, and will have access to all the project’s tenants. We support distinct team member roles to help effectively manage your team’s access to SaaSquatch.  

<details>
  <summary> Learn more about <b>project settings</b> under <b>Learning SaaSquatch</b> on our docs site. Here are a few resources to get you started. </summary>

- [Team Member Roles](/learning-saasquatch/admin-portal/team-member-roles)
- [Managing Team Members](/success/add-portal-member)

</details>

### Organizations
Organizations contain projects. The organization settings page lets full access team members add domains to use for share links, emails or microsites for any of its projects and tenants. Some domains can also be used to allow your team to sign into the Admin Portal with SSO. 

<details>
  <summary> Learn more about <b>organization settings</b> under <b>Learning SaaSquatch</b> and <b>Building Programs</b> on our docs site. Here are a few resources to get you started. </summary>

- [Setting Up a Domain](/building-programs/participant-experiences/configuring-a-custom-domain/)
- [Setting Up Login Rules and Single Sign-on (SSO)](/learning-saasquatch/admin-portal/single-sign-on)

</details>

## Tabs and features
The top navigation menu has several tabs: __Programs, Content, Rewards, Data, Analytics, Participants__ and __Settings__. 

### Programs
The Programs tab is where you can create new programs and manage existing programs.

<details>
  <summary> Learn more about <b>programs</b> under <b>Building Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [Program Library](/program/library)
- [General Quickstart](/growth/quickstart)
- [Referral Program Quickstart](/guides/referral-quickstart)

</details> 

### Content
The Content tab is home to the participant-facing elements of your program. It’s where you can create new widgets, emails or microsites, and adjust their appearance using our WYSIWYG visual editors.

<details>
  <summary>Learn more about <b>content</b> under <b>Building Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [Customizing Program Widgets](/designer/widget-editor)
- [Designing Your Program Emails](/designer/email-editor)
- [Setting Up a Microsite](/building-programs/microsites/quickstart-guide)

</details>

### Rewards
The Rewards tab lets you review your Reward Catalog and set up new rewards. Use this tab to set up Reward Exchange, manage coupon codes for fuel tank rewards, or redeem rewards in bulk. 

<details>
  <summary>Learn more about <b>rewards</b> under <b>Building Programs</b> and <b>Running Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [Program Reward Options](/feature/rewards)
- [Reward Exchange](/features/reward-exchange)
- [Bulk Reward Redemption](/guides/bulk-reward-redemption/)

</details> 

### Data
The Data tab shows you what data you send to SaaSquatch and how it’s used in your program rules. Use this tab to create and review custom and calculated fields, see what event data you send us and where it’s used in your program, and view a history of all event data we’ve received from you. The Data tab also contains submissions to your microsite’s registration form, which you can choose to send to Salesforce. 

<details>
  <summary>Learn more about <b>data</b> under <b>Building Programs</b> and <b>Running Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [User Segmentation](/features/user-segmentation/)
- [Custom Fields](/features/custom-user-fields)
- [Calculated Fields](/building-programs/custom-calculated-fields/calculated-fields)
- [User Purchase & Refund Event](/developer/purchase-object/)
- [Managing Microsite Registration Form Submissions](/building-programs/microsites/registration-forms/)

</details>

### Analytics
The Analytics tab tracks several key tenant- and program-specific metrics to help you evaluate the health and performance of your programs. This tab includes all-time or program-specific metrics, a filterable referral feed that shows all referrals across your programs, and custom reports. 

<details>
  <summary>Learn more about <b>analytics</b> under <b>Running Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [Analytics Overview](/success/ga-analytics)
- [Program Reports](/features/reports)
- [Bulk Event Import](/guides/event-import)

</details>

### Participants
The Participants tab is a list of all of the participants in your tenant. You can view or add participants, manually connect referrals and issue rewards, and see all reward and event history for individual participants. 

<details>
  <summary>Learn more about <b>participants</b> under <b>Running Programs</b> on our docs site. Here are a few resources to get you started.</summary>

- [Manual User Actions](/guides/one-time)
- [Bulk User Import](/guides/user-import)

</details>

### Settings
This tab is home to the settings of the tenant you’re working in. See your project settings if you want to add team members, or organization settings if you want to set up domains to use in your program.

Use this tab to:
- Assign a domain you’ve already set up to a program’s share links 
- Get instructions for using squatch.js to display your widget and create or update participants
- Add webhooks subscriptions or third-party integrations with platforms like Stripe, Salesforce, PayPal and HubSpot

<details>
  <summary>Learn more about <b>tenant settings</b> throughout our docs site. Here are a few resources to get you started.</summary>

- [Setting Up a Domain](/building-programs/participant-experiences/configuring-a-custom-domain/#using-a-domain-for-share-links) for share links
- [W-9 Compliance](/features/w-9-compliance/)
- [How to load a Referral Widget on a Web Page](/how-to-load-a-referral-widget-on-a-web-page/)
- [API Webhooks](/api/webhooks/)
- [Integrations](/integrations)

</details>
