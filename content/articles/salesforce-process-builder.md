---
title: "SaaSquatch + SFDC: Using Invocable Methods in Process Builder"
highlights: "The SaaSquatch SFDC integration provides a number of [Invocable Methods](/salesforce/user-guide/#invocable-method-list) that can be used within Process Builder to send information to SaaSquatch."
slug: salesforce/process-builder
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-16
tags:
  - Guide
---

><span class="label">Deprecated feature</span> **Note:** This page details a feature that is no longer available for archival purposes as Salesforce has sunset the Process Builder feature. Please use Workflows or Apex code to build your program instead.

### Introduction
This guide provides an overview of how to work with the following [Invocable Methods](/salesforce/user-guide/#invocable-method-list) within Process Builder:

- `Upsert User by Lead`
- `Upsert User by Contact`
- `Upsert User by Id`
- `Track Event by Lead`
- `Track Event by Contact`
- `Track Event by Id`

#### Before You Start
1. Make sure that you've installed the [SaaSquatch SFDC integration](/salesforce/install-guide) into your Salesforce instance.
2. Make sure you have administrative access to create and modify Processes within [Process Builder](https://help.salesforce.com/articleView?id=sf.process_overview.htm&type=5).
3. The below guide also assumes that:
  - You have an understanding of [how to work with Process Builder](https://trailhead.salesforce.com/content/learn/modules/business_process_automation/process_builder)
  - You have identified the who, what, where, and when behind sending data to SaaSquatch, as well as what the data being sent will be (*e.g.* whenever any user in SalesForce creates a Lead record with an email, upsert a user in SaaSquatch with the email as their User ID & Account ID)
  - Setup has already been configured for the activity meant to trigger sending the information to SaaSquatch (*e.g* a referral code should to applied to the user in SaaSquatch when a value is seen on a `ReferredByCodes` Custom Field in a Lead or Contact, so that `ReferredByCodes` Custom Field exists on those Objects and is accessible)

#### Upserting Users
The following Apex Classes perform the same function as our [User Upsert call](/api/methods#open_user_upsert) in our REST API.

You would use any of the three following methods when:
  - Creating your Leads or Contacts as participants in SaaSquatch,
  - Making referral attributions between users in SaaSquatch when a `ReferredByCodes` Custom Field is seen with a value on a Lead or a Contact,
  - Updating a SaaSquatch participant's standard or custom [User Fields](/features/custom-user-fields/) on activity seen on a Lead, Contact, Account or Opportunity,
  - Adding or removing a SaaSquatch participant's [segments](/features/user-segmentation/) on criteria seen on a Lead, Contact, Account or Opportunity.

##### Upsert User by Lead
This method allows you to create and update SaaSquatch participants when activity or criteria are seen on a Lead Object. 

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Upsert User on Lead" and "Creates or updates a user in SaaSquatch when a Lead record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Lead' as your Object. We recommend allowing the Process to start "when a record is created or edited", so that both creation and update of users can occur.
4. Add your Criteria:
  - For example, if you want an Upsert to occur any time a Lead is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only create or update user when an email exists," or "only update a user if certain fields are modified," you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Apply Referral Code)
  - Select 'Upsert User by Lead' under your "Apex Class".
6. Set your Apex Variables:
  - At minimum, a User Upsert must include the user's `accountId` & `userId`. We recommend referencing a field that already exists on the Lead, such as email. 
  - Send along any additional information about the user you'd like SaaSquatch to receive, such as "First Name," "Last Name", "Email", the code of who they were referred by, etc. 
  - You can also choose whether or not to sync this information instantly back to SFDC once sent to SaaSquatch (*e.g.* have the newly created SaaSquatch user sync to the Lead record) by using the variable ["Immediately Upserts Objects"](/salesforce/immediate-object-upsertion/).
7. Once your Process is completed and Saved, make sure to Activate it so it can run.

##### Upsert User by Contact
This method allows you to create and update SaaSquatch participants when activity or criteria are seen on the Contact Object.

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Upsert User on Contact" and "Creates or updates a user in SaaSquatch when a Contact record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Contact' as your Object. We recommend allowing the Process to start "when a record is created or edited", so that both creation and update of users can occur.
4. Add your Criteria:
  - For example, if you want an Upsert to occur any time a Contact is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only create or update user when an email exists," or "only update a user if certain fields are modified," you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Update User Segments)
  - Select 'Upsert User by Contact' under your "Apex Class".
6. Set your Apex Variables:
  - At minimum, a User Upsert must include the user's `accountId` & `userId`. We recommend referencing a field that already exists on the Contact, such as email. 
  - Send along any additional information about the user you'd like SaaSquatch to receive, such as "First Name," "Last Name", "Email", the custom field or segment you'd like to add or change, etc. 
  - You can also choose whether or not to sync this information instantly back to SFDC once sent to SaaSquatch (*e.g.* have the newly created SaaSquatch user sync to the Contact record) by using the variable ["Immediately Upserts Objects"](/salesforce/immediate-object-upsertion/).
7. Once your Process is completed and Saved, make sure to Activate it so it can run.

##### Upsert User by Id
> This Apex Class assumes that you have [made the User ID & Account ID accessible](/salesforce/ids-config/) on the Object you are working with.

You would most likely want to use `Upsert User by Id` when you want to create a user from a SFDC Lead in SaaSquatch, or make changes to an existing SaaSquatch participant on activity or criteria seen on an associated Account or Opportunity.

For updating users on Lead or Contact, we recommend either "Upsert User by Lead" or "Upsert User by Contact" (above).

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Update User on Account" and "Updates a user in SaaSquatch when the associated Account record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Account' or 'Opportunity' as your Object. We recommend allowing the Process to start "when a record is created or edited".
4. Add your Criteria:
  - For example, if you want an Upsert to occur any time an Account or Opportunity is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only send information to SaaSquatch when an Opportunity is Closed Won", you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Update Account Status)
  - Select 'Upsert User by Id' under your "Apex Class".
6. Set your Apex Variables:
  - At minimum, a User Upsert must include the user's `accountId` & `userId`. Make sure to reference the correct field(s) containing the associated SaaSquatch user's User and Account IDs.
  - Send along any additional information about the user you'd like SaaSquatch to receive, such as "First Name," "Last Name", "Email", the custom field or segment you'd like to add or change, etc. 
  - You can also choose whether or not to sync this information instantly back to SFDC once sent to SaaSquatch (*e.g.* have the newly created SaaSquatch user sync to the SFDC record) by using the variable ["Immediately Upserts Objects"](/salesforce/immediate-object-upsertion/).
7. Once your Process is completed and Saved, make sure to Activate it so it can run.

#### Tracking Events
The following Apex Classes perform the same function as our [Track User Event](/api/methods#trackEvent) in our REST API.

> Keep in mind that as user [has to exist in SaaSquatch](#upserting-users) before it can receive event data. 

##### Track Event by Lead
This method allows you to send events to SaaSquatch participants when activity or criteria are seen on a Lead Object. 

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Track Events on Lead" and "Sends events to the SaaSquatch user when a Lead record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Lead' as your Object. We recommend allowing the Process to start "when a record is created or edited".
4. Add your Criteria:
  - For example, if you want the event to be sent any time a Lead is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only send an event to the user when an email exists," or "only send an event if certain fields are modified," you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Add Purchase Event)
  - Select 'Track Event by Lead' under your "Apex Class".
6. Set your Apex Variables:
  - An event must include the user's `accountId` & `userId` that is the same as what is already in the SaaSquatch system. We recommend referencing the same fields you used to upsert the user. 
  - You will also need to at at minimum provide the `key` of your event (*e.g.* `purchase`).
  - If the SaaSquatch system is set up to look for specific custom fields and field values under your event (*e.g.* `revenue`), you will need to include those as well.
7. Once your Process is completed and Saved, make sure to Activate it so it can run.

##### Track Event by Contact
This method allows you to send events to SaaSquatch participants when activity or criteria are seen on a Contact Object. 

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Track Events on Contact" and "Sends events to the SaaSquatch user when a Contact record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Contact' as your Object. We recommend allowing the Process to start "when a record is created or edited".
4. Add your Criteria:
  - For example, if you want the event to be sent any time a Contact is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only send an event to the user when an email exists," or "only send an event if certain fields are modified," you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Add Purchase Event)
  - Select 'Track Event by Contact' under your "Apex Class".
6. Set your Apex Variables:
  - An event must include the user's `accountId` & `userId` that is the same as what is already in the SaaSquatch system. We recommend referencing the same fields you used to upsert the user. 
  - You will also need to at at minimum provide the `key` of your event (*e.g.* `purchase`).
  - If the SaaSquatch system is set up to look for specific custom fields and field values under your event (*e.g.* `revenue`), you will need to include those as well.
7. Once your Process is completed and Saved, make sure to Activate it so it can run.

##### Track Event by Id
> This Apex Class assumes that you have [made the User ID & Account ID accessible](/salesforce/ids-config/) on the Object you are working with.

This method allows you to send events to SaaSquatch participants when activity or criteria are seen on a Contact or Opportunity Object as long as you have access to the associated user's Account ID and User ID.

1. Create a New Process. Give it a name and description that reflects the outcome of the Process, such as "Track Events on Account" and "Updates a user in SaaSquatch when the associated Account record is created or changed." 
2. For 'The process starts when', select "A record changes". 
3. Add an Object, and select 'Account' or 'Opportunity' as your Object. We recommend allowing the Process to start "when a record is created or edited".
4. Add your Criteria:
  - For example, if you want an event to be sent any time an Account or Opportunity is created or updated, name your criteria "Always" and select 'No criteria--just execute the actions!'
  - For more advanced usage, such as "only send an event to SaaSquatch when an Opportunity is Closed Won", you will have to specify your Criteria and Conditions here.
5. Add your Actions:
  - Select 'Apex' under "Action Type", and give your action a name that reflects the outcome (*e.g.* Send OppWon Event)
  - Select 'Track Event by Id' under your "Apex Class".
6. Set your Apex Variables:
  - An event must include the user's `accountId` & `userId` that is the same as what is already in the SaaSquatch system. Make sure to reference the correct field(s) containing the associated SaaSquatch user's User and Account IDs.
  - You will also need to at at minimum provide the key of your event (*e.g.* `oppWon`).
  - If the SaaSquatch system is set up to look for specific custom fields and field values under your event (*e.g.* `closedDate`), you will need to include those as well.
7. Once your Process is completed and Saved, make sure to Activate it so it can run.
