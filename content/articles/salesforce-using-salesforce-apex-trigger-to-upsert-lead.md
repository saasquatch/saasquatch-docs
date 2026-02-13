---
title: Using a Salesforce APEX Trigger to upsert a Lead
highlights: The SaaSquatch Managed Package for Salesforce includes a number of global classes and invocable methods that can be used to upsert users from APEX code. In this tutorial we will walk through how to create an APEX Trigger and use it to upsert users in SaaSquatch when a Lead is created in Salesforce.
slug: salesforce/using-salesforce-apex-trigger-to-upsert-lead
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-16
tags:
  - salesforce
  - Guide
---

## Before you start

This article is written for advanced users of Salesforce that understand Apex code and are comfortable with Apex triggers. If you are new to Salesforce there are a few Trailhead modules we recommend reading to get you started.

 - [Apex Basics & Database - Trailhead Module](https://trailhead.salesforce.com/en/content/learn/modules/apex_database)
 - [Apex Triggers - Trailhead Module](https://trailhead.salesforce.com/content/learn/modules/apex_triggers)

To get started you will need:

 - The SaaSquatch for Salesforce managed package installed in your organization. If not follow the [install guide](/salesforce/install-guide/)
 - A Salesforce user with [permission to use the Developer Console](https://help.salesforce.com/articleView?id=sf.code_dev_console_opening.htm&type=5).

## Create a new Trigger

To start open the __Developer Console__ from inside of Salesforce. 

![DeveloperConsole](/assets/images/contentful/DeveloperConsole_67cVITWpH5n2Tc0x5X7C55.png)

We are going to create a new __Apex Trigger__. Create one by going to `File -> New -> Apex Trigger`

![NewTrigger](/assets/images/contentful/NewTrigger_6I47ceTlOp4GQs6crYbrJL.png)

We will be triggering on __Lead__ objects after insert. You can name the trigger something that won't conflict with other trigger names in your environment.

```apex
trigger TutorialForSaaSquatch on Lead (after insert, after update) {
    for (Lead lead : Trigger.new) {
        // Iterate over each sObject
    }
}
```

> For this example we are triggering on Lead, but organizations may also want to trigger on Contact updates as well. That would require different code in the Apex trigger, but most of this tutorial would still apply.

## Build records to insert

We're going to be building up `ReferralSaaSquatchUpsertUserByIdReq` objects to send to the SaaSquatch API. Since triggers operate on batches, we're going to create a `List` of objects to build up.

```apex
trigger TutorialForSaaSquatch on Lead (after insert, after update) {
    List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq> users = new List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq>();
    for (Lead lead : Trigger.new) {
        // Iterate over each sObject
    }
}
```

For each Lead that has been inserted or updated in this trigger we are going to copy that data to SaaSquatch. In this example we're going to use `Email` as the unique ID in SaaSquatch. We're also to use the `immediatelyUpsertObjects` flag to make sure that the SaaSquatch User, Referral and RewardBalance custom objects get updated immediately.

```apex
trigger TutorialForSaaSquatch on Lead (after insert, after update) {
    List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq> users = new List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq>();
    for (Lead lead : Trigger.new) {
        // Iterate over each sObject
        SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq user = new SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq();

        // Uses `Email` as the ID
        user.userId=lead.Email;
        user.accountId=lead.Email;

        // Syncs `FirstName` and `Email`
        user.firstName=lead.FirstName;
        user.email=lead.Email;

        // Tracks who referred this person
        user.referredByCodes=lead.CodeUsed__c;

        // Tells the integration to immediately update corresponding objects in Salesforce
        user.immediatelyUpsertObjects=true;
        users.add(user);
    }
}
```

> We're using [Immediate Object Upsertion](/salesforce/immediate-object-upsertion/) in this example so that the SaaSquatch Custom Objects are updated in Salesforce as quickly as possible. Alternatively the Salesforce background sync will periodically update records if this is turned off.

## Call the Invocable Method

Now that we have a list of users to send to SaaSquatch, we need to call the SaaSquatch invocable method to send the data to SaaSquatch. 

We're sending the `users` list to the `ReferralSaaSquatchUpsertUserById` invocable method.

```apex
SaaSquatch.ReferralSaaSquatchUpsertUserById.upsertUsers(users);
```

> For this example we're using `ReferralSaaSquatchUpsertUserById` but there are other InvocableMethods in the SaaSquatch package that may suite your use case, such as logging events and upserting based a linked standard object.

The final code should end up looking like this:

```apex
trigger TutorialForSaaSquatch on Lead (after insert, after update) {
    List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq> users = new List<SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq>();
    for (Lead lead : Trigger.new) {
        // Iterate over each sObject
        SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq user = new SaaSquatch.ReferralSaaSquatchUpsertUserByIdReq();

        // Uses `Email` as the ID
        user.userId=lead.Email;
        user.accountId=lead.Email;

        // Syncs `FirstName` and `Email`
        user.firstName=lead.FirstName;
        user.email=lead.Email;

        // Tracks who referred this person
        user.referredByCodes=lead.CodeUsed__c;

        // Tells the integration to immediately update corresponding objects in Salesforce
        user.immediatelyUpsertObjects=true;
        users.add(user);
    }
    // Queues a callout to the SaaSquatch API
    SaaSquatch.ReferralSaaSquatchUpsertUserById.upsertUsers(users);
}
```

## Test the lead trigger

To test that this trigger is working:

  - Save your trigger
  - Make sure there are no alerts in the __Problems__ tab of the Developer Console
  - Create a new Lead in Salesforce
  - Open the [SaaSquatch Admin Portal](http://app.referralsaasquatch.com/) to confirm that a User has been created in SaaSquatch.

## Conclusion

In this tutorial we walked through creating a new trigger on Lead to send data to SaaSquatch whenever data is changed in Salesforce. Since the SaaSquatch API uses batches behind the scenes this create a low-overhead and near-realtime way of synchronizing data between Salesforce and SaaSquatch in order to trigger your referral and loyalty programs.