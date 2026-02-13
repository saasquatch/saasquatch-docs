---
title: Salesforce Integration FAQ
highlights: These are some of the most common questions about SaaSquatch for Salesforce™. RS for Salesforce is a managed package built on Force.com that lets you synchronize your SaaSquatch program with Salesforce. If you want to get started with RS for Salesforce, please contact your account manager.
slug: salesforce/faq
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-11-16
---

### What is synchronized?

SaaSquatch for Salesforce sychronizes to user data into your Saleforce account as **custom objects** and **custom fields**.

- **SaaSquatch User**, **Referral** and **Reward Balance** custom objects automatically link to Lead and Contact records
- **Referral Code** and **Share Link** custom fields on Lead and Contact records are automatically synchronised from the linked users
- Additional **SaaSquatch User** fields or JSONata expressions can be configured to sync to custom fields on your **Leads** and/or **Contacts**

### How are Leads & Contacts mapped?

We use email address to map records from SaaSquatch with a matching Lead or Contact. SaaSquatch automatically loads user records into Salesforce as a separate custom object called **SaaSquatch User**. These records are then linked to a Lead or Contact when the email address matches. Leads and Contacts automatically have their custom fields and related lists updated based upon the matched record.

In version 1.4.0 of the managed package, we introduced a feature for forcing the linking of a **Contact** to a **SaaSquatch User** to help users who have duplicate data and need to ensure that the right Contact is linked to the correct SaaSquatch user.

In version 1.7.0 of the managed package, we introduced a feature for syncing additional **SaaSquatch User** fields to a **Contact** or **Lead**. Additional fields can be configured to sync to your **Leads** and/or **Contacts** from the integrations page within your SaaSquatch tenant.

### How are duplicates handled?

- **Duplicate Contact or Leads in Salesforce** - SaaSquatch links the first record with the right email address (unless the **Forced Contact** option is used on the **SaaSquatch User**, in which case the automatic linking is bypassed).
- **Leads that duplicate a Contact** - SaaSquatch links to Contacts first and Leads second.
- **Merging duplicates** - SaaSquatch will map to the merged record only if it has the right email address.
- **Updating Email** - SaaSquatch will immediately relink a record when an email address changed.

### Why isn't a user syncing to Salesforce?

Here are some reasons a Lead or Contact is not getting linked:

- A **Validation Rule** on your Lead or Contact record is prevent SaaSquatch from updating records.
- A **SaaSquatch User** has been created, but the email address in SaaSquatch doesn't exactly match the email of the Lead or Contact.

### Does it work with Salesforce Lightning Experience?

Yes, SaaSquatch will work out of the box with both Salesforce Classic and Salesforce Lightning Experience.

### Which Salesforce Editions do you support?

Our integration uses the Salesforce Bulk API for efficient loading and synchronization of large data sets, so we only support Professional, Enterprise, Performance and Unlimited Editions.

### What other features should I know about?

Here are some important features to know about:

- Supports synchronization of historical data. Turn it on or off at any point.
- Use custom fields to simplify integration into your Marketing Automation systems like Marketo, Hubspot and Pardot.
- Works with **custom salesforce reports, **workflow rules** and the other Salesforce tools you're used to using.
- Support conversion tracking customization. Conversions can be triggered on custom fields through custom Workflow actions, any arbitrary APEX event or Trigger, or external conversion events using the SaaSquatch REST API
- Self-healing linking will automatically heal the link between SaaSquatch and Salesforce if a Lead or Contact is Merged, Converted or Deleted
- Attribution tracking persists into Opportunities when a Lead is converted
- Works with both Inbound Referral and Outbound Referral workflows

### How do I upgrade to a newer version of the managed package?

We periodically update our managed package to add new features and capabilities. To upgrade to a newer version, use the [setup wizard](https://salesforce.referralsaasquatch.com/) and follow the instructions. It will direct you to a flow to install the package in your sandbox and/or production organization.
