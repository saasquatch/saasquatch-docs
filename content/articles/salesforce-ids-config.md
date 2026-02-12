---
title: "SaaSquatch + SFDC: User & Account IDs"
highlights: "The SaaSquatch Salesforce integration requires that you send along both the user's SaaSquatch Account and User ID from SFDC when using an [Invocable Method](/salesforce/user-guide#invocable-method-list) such as `Upsert User by Id` & `Track Event by Id`."
slug: salesforce/ids-config
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-16
tags:
  - Guide
---

### Introduction
The [Invocable Methods](/salesforce/user-guide#invocable-method-list) `Upsert User by Id` & `Track Event by Id` allow you to make changes to SaaSquatch from Salesforce from records other than the [automatically linked Lead or Contact](/salesforce/faq#how-are-leads-contacts-mapped-), such as Account or Opportunity, as long as you have access to the user's SaaSquatch Account ID and User ID.

This guide walks you through the recommended configuration of the User ID and Account ID Custom Field(s) in order to make that information accessible on the Account and/or Opportunity Objects.

#### Before You Start
1. Make sure that you've installed the [SaaSquatch SFDC integration](/salesforce/install-guide) into your Salesforce instance.
2. Make sure you have administrative access and know how to work with:
  - [Page Layouts](https://help.salesforce.com/articleView?id=sf.customize_layout.htm&type=5) 
  - [Custom Fields](https://help.salesforce.com/articleView?id=sf.adding_fields.htm&type=5)
  - [Field Mapping](https://help.salesforce.com/articleView?id=sf.customize_mapleads.htm&type=5)
5. The below guide assumes that:
  - Your new Referred Users are being created as Leads, then converted to a Contact, an Account, and an Opportunity when they become eligible,
  - You intend to [send information to SaaSquatch](/salesforce/user-guide/) for the Referred User that is linked to the Object when certain actions happen within those Accounts or Opportunities.  

#### 1. Setting Up Your ID(s)
> When making use of the SaaSquatch SalesForce integration, we highly recommend that you use the user's email address as both their SaaSquatch Account ID and User ID. 

1. Create your Custom Field(s) on the Lead Object. We recommend:
  - Using a [Text Field Type](https://help.salesforce.com/articleView?id=sf.custom_field_types.htm&type=5),
  - That [User & Account ID](/shared-vs-solo-accounts/#solo-accounts) are the same value (thus requiring only one custom field),
  - That you name your Custom Field(s) something like "SaaSquatch User/Account ID",
  - That if are using an existing field on the Lead Object as your ID(s) (*e.g.* email or Lead ID), [making use of a formula](https://help.salesforce.com/articleView?id=sf.customize_formulas.htm&type=5) to prepopulate the Custom Field(s) so it does not have to be manually entered,
  - That you add your Custom Field(s) to the ["SaaSquatch" Section of your page layout](https://www.process.st/checklist/install-referral-saasquatch-for-salesforce-copy-2/#configure-page-layouts).
2. Create and place your Custom Field(s) on your Account and/or Opportunity layouts that mirror the field(s) on the Lead:
  - As these Custom Field(s) will be automatically populated when the Lead converts (if mapped as instructed below), there is no need to insert a formula. 
  - You must create an additional Custom Field on __every__ Object you'd like the original Custom Field from the Lead to persist to when a Lead gets converted (*e.g.* Lead: "SaaSquatch ID" > Account: "SaaSquatch ID", Opportunity: "SaaSquatch ID") 

#### 2. Mapping Your ID(s)
> You only need to map the Custom Fields from the Lead to the Objects you intend to interact with to send information to SaaSquatch. For example, if you only want to trigger on actions that happen in Opportunities, you do not need to map to Accounts.

1. Map To Account
  -  If you intend to send information to SaaSquatch about the associated user when actions are taken on the Account, map the Custom Field(s) on the Lead to Custom Field(s) on the Account.
  - Select which Custom Field(s) on the Account the "SaaSquatch Account/User ID" field(s) should automatically populate when a Lead is converted (*e.g.* Lead: "SaaSquatch ID" > Account: "SaaSquatch ID"). 
2. Map to Opportunity
  -  If you intend to send information to SaaSquatch about the associated user when actions are taken on the Opportunity, map the Custom Field(s) on the Lead to Custom Field(s) on the Opportunity.
  - Select which Custom Field(s) on the Opportunity the "SaaSquatch Account/User ID" field(s) should automatically populate when a Lead is converted (*e.g.* Lead: "SaaSquatch ID" > Opportunity: "SaaSquatch ID"). 

#### 3. Reference Your ID Field(s)
Once a Lead has been converted, and the Custom Field(s) mapped to the Account and/or Opportunity, you can then reference those field(s) within a Workflow Rule or within an Apex Trigger.
