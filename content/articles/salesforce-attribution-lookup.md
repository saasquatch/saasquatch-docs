---
title: "SaaSquatch + SFDC: Attribution via Contact Lookup"
highlights: "When properly synced, the SaaSquatch SFDC can be configured to automatically retrieve a Referrer's (Contact) \"Referral Code\" and apply it to a Custom Field on the Referred User (Lead). "
slug: salesforce/attribution-lookup
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-16
---

><span class="label">Deprecated feature</span> **Note:** This page details a feature that is no longer available for archival purposes as Salesforce has sunset the Process Builder feature. Please use Workflows or Apex code to build your program instead.

### Introduction
This guide provides instruction on how to make use of a [Lookup Custom Field](https://help.salesforce.com/articleView?id=sf.search_lookups_how_works.htm&type=5) to populate a [Text Custom Field](https://help.salesforce.com/articleView?id=sf.custom_field_types.htm&type=5) with the Referrer's "Referral Code" on the Lead record, which can then be [sent to SaaSquatch](/salesforce/process-builder/#upserting-users) to attribute the Lead to the Contact (creating a referral).  

#### Before You Start
1. Make sure that you've installed the [SaaSquatch SFDC integration](/salesforce/install-guide) into your Salesforce instance, including adding the "Referral Code" field to the [Contact Page Layout](https://www.process.st/checklist/install-referral-saasquatch-for-salesforce-copy-2/#configure-page-layouts).
2. Make sure you have administrative access and know how to work with:
  - [Page Layouts](https://help.salesforce.com/articleView?id=sf.customize_layout.htm&type=5) 
  - [Custom Fields](https://help.salesforce.com/articleView?id=sf.adding_fields.htm&type=5)
  - Processes within [Process Builder](https://help.salesforce.com/articleView?id=sf.process_overview.htm&type=5).
3. The below guide also assumes that:
  - Your new Referred Users are being created as Leads, 
  - You intend to [create/update a user in SaaSquatch when a Lead is created/updated in SFDC](/salesforce/process-builder/#upserting-users). 

#### 1. Creating the Contact Lookup Field
Create a [new Custom Field](https://help.salesforce.com/articleView?id=sf.adding_fields.htm&type=5) on the Lead: 
  - Make sure to select a Data Type of "Lookup Relationship"
  - Select "Contact" for your related object
  - Name your field something like "Referred By"
  - Name the Child Relationship Name something like "Leads"
  - Name the related list something like "Referred Leads"

![SFDC Contact Lookup Field](/assets/images/contentful/Screenshot_2021-06-28_11.45.51_AM_17XvOwOqJJ7nHghsNRoFWk.png)

> Make sure to make the field available to the required users as well as adding it to the Lead Page Layout. We recommend editing the Page Layout to include your Custom Field in the ["SaaSquatch" section](https://www.process.st/checklist/install-referral-saasquatch-for-salesforce-copy-2/#configure-page-layouts).

#### 2. Creating the `ReferredByCodes` Custom Field
Create a [new Custom Field](https://help.salesforce.com/articleView?id=sf.adding_fields.htm&type=5) on the Lead: 
  - Make sure to select a Data Type of "Text"
  - Enter a max length (*e.g.* `255`)
  - Name your field something like "Attribution Code" or "Referred By Code"

![SFDC Referred By Codes Field](/assets/images/contentful/Screenshot_2021-06-28_12.04.48_PM_2EWE89oavNOSWuZZmX0D8j.png)

> Make sure to make the field available to the required users as well as adding it to the Lead Page Layout. We recommend editing the Page Layout to include your Custom Field in the ["SaaSquatch" section](https://www.process.st/checklist/install-referral-saasquatch-for-salesforce-copy-2/#configure-page-layouts).

#### 3. Automatically Populating the Referral Code When a Contact is Selected via Lookup
Once you've set up a Lookup field to search for Contacts, and a Text field to hold the Referrer's "Referral Code", you can [build a Process](https://trailhead.salesforce.com/content/learn/modules/business_process_automation/process_builder) to grab the "Referral Code" from the Contact record and place it onto the custom field on the Lead.

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Apply Referral Code from Contact". 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Lead' as your Object. We recommend allowing the Process to start "when a record is created or edited", so that both creation and update of users can occur.
4. Add your Criteria. We recommend setting a Condition that the Process will only run if the "Referral Code" field on the Contact that was looked up exists (*i.e.* `Is null: False`):
![SFDC Contact Referral Code](/assets/images/contentful/Screenshot_2021-06-28_12.26.11_PM_4KTRqrOvJ4Hxhjd0K9Feap.png)
![SFDC Referral Code Exists](/assets/images/contentful/Screenshot_2021-06-28_12.27.25_PM_6B7mUQVrPGi16R63pcre6r.png)
5. Add your Actions:
  - Select 'Update Records' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Apply Referral Code)
  - Choose 'Select the Lead record that started your process' under your "Record Type".
  - Set the field value for the Lead you want to update. Select the Text Custom Field you created previously (*e.g.* Attribution Code) and select the Contact's Referral Code as the Value via a Field Reference Type:
![SFDC Attribution Code Reference](/assets/images/contentful/Screenshot_2021-06-28_12.36.55_PM_6nP8Bs3bM2K93WMktj0luW.png)
6. Once your Process is completed and Saved, make sure to Activate it so it can run.

> You can also set this up using Workflow Rules or through APEX if those methods are more accessible for you.

#### 4. Sending the `ReferredByCodes` Information to SaaSquatch 
Once the your `ReferredByCodes` Custom Field is populated, you can send that information to SaaSquatch via [an upsert](/salesforce/process-builder/#upserting-users).

When defining your Apex Variables in your Process, select the Field "Referred By Codes" and then reference the Custom Field you've created and configured to autopopulate with the Referrer's "Referral Code":

![SFDC Referred By Codes Upsert](/assets/images/contentful/Screenshot_2021-06-28_1.24.21_PM_7GuuSKdYKjs4J1WUfrxuWH.png)

> You can also make [an upsert via APEX](/salesforce/using-salesforce-apex-trigger-to-upsert-lead/) if this is easier for you.