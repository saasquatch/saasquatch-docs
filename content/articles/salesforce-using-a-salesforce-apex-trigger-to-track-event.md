---
title: Using a Salesforce APEX Trigger to track an Event
highlights: The SaaSquatch Managed Package for Salesforce includes a number of global classes and invocable methods that can be used to upsert users from APEX code. In this tutorial we will walk through how to create an APEX Trigger and use it to track events for users in SaaSquatch when a Contact is updated.
slug: salesforce/using-a-salesforce-apex-trigger-to-track-event
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

 - The SaaSquatch for Salesforce managed package installed in your organization. If not follow the [install guide](/salesforce/install-guide/).
 - A Salesforce user with [permission to use the Developer Console](https://help.salesforce.com/articleView?id=sf.code_dev_console_opening.htm&type=5).

## Create a new Trigger

To start open the __Developer Console__ from inside of Salesforce. 

![DeveloperConsole](/assets/images/contentful/DeveloperConsole_67cVITWpH5n2Tc0x5X7C55.png)

We are going to create a new __Apex Trigger__. Create one by going to `File -> New -> Apex Trigger`

![NewTrigger](/assets/images/contentful/NewTrigger_6I47ceTlOp4GQs6crYbrJL.png)

We will be triggering on __Opportunity__ objects after they are marked as Won. You can name the trigger something that won't conflict with other trigger names in your environment.

```apex
trigger OppToContact on Opportunity (after insert, after update) {
    // Empty trigger ready for our logic
}
```

We want to only track events when an opportunity is marked as won, so we need to add some additional logic to check for when `IsWon` changes.

```apex
trigger OppToContact on Opportunity (after insert, after update) {

    for (Opportunity opp : Trigger.new) {
        if(opp.IsWon){  
            Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
            if(!oldOpp.IsWon){
               // Only trigger when opportunities become won

            }
        }
    }
}
```

## Build records to insert

We're going to be building up `SaaSquatchTrackEventByIdReq` objects to send to the SaaSquatch API. Since triggers operate on batches, we're going to create a `List` of objects to build up.

```apex
trigger TutorialForSaaSquatch on Lead (after insert, after update) {
    List<SaaSquatch.SaaSquatchTrackEventByIdReq> userEvents = new List<SaaSquatch.SaaSquatchTrackEventByIdReq>();   
    // ... code from above ...
}
```

For each Opportunity that has been marked `IsWon` in this trigger we are going to copy that data to SaaSquatch. Since SaaSquatch tracks everything by user, we're also going to use the `PrimaryReferralEmail__c` field to be able to identify which user in the account was referred.

```apex
trigger OppToContact on Opportunity (after insert, after update) {

    List<SaaSquatch.SaaSquatchTrackEventByIdReq> userEvents = new List<SaaSquatch.SaaSquatchTrackEventByIdReq>();   
    for (Opportunity opp : Trigger.new) {
        SaaSquatch.SaaSquatchTrackEventByIdReq event = new SaaSquatch.SaaSquatchTrackEventByIdReq();
        if(opp.IsWon){  
            Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
            if(!oldOpp.IsWon){
                event.userId = opp.PrimaryReferralEmail__c;
                event.accountId = opp.PrimaryReferralEmail__c;
                event.key = 'oppwon';
                userEvents.add(event);
            }
        }
    }
}
```

> The `oppwon` event key used here has no special meaning. SaaSquatch support dynamic event keys defined by your team. Ask your customer success team representative about what event keys are relevant to your program's data catalog.

## Call the Invocable Method

Now that we have a list of events to track in SaaSquatch, we need to call the SaaSquatch invocable method to send the data to SaaSquatch. 

We're sending the `userEvents` list to the `SaaSquatchTrackEventById` invocable method.

```apex
SaaSquatch.SaaSquatchTrackEventById.trackUserEvents(userEvents);
```

> For this example we're using `SaaSquatchTrackEventById` but there are other InvocableMethods in the SaaSquatch package that may suite your use case, such as upserting users.

The final code should end up looking like this:

```apex
trigger OppToContact on Opportunity (after insert, after update) {

    List<SaaSquatch.SaaSquatchTrackEventByIdReq> userEvents = new List<SaaSquatch.SaaSquatchTrackEventByIdReq>();   
    for (Opportunity opp : Trigger.new) {
        SaaSquatch.SaaSquatchTrackEventByIdReq event = new SaaSquatch.SaaSquatchTrackEventByIdReq();
        if(opp.IsWon){  
            Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
            if(!oldOpp.IsWon){
                event.userId = opp.PrimaryReferralEmail__c;
                event.accountId = opp.PrimaryReferralEmail__c;
                event.key = 'oppwon';
                userEvents.add(event);
            }
        }
    }
    SaaSquatch.SaaSquatchTrackEventById.trackUserEvents(userEvents);
}
```

## Test the Trigger

To test that this trigger is working:

  - Save your trigger
  - Make sure there are no alerts in the __Problems__ tab of the Developer Console
  - Mark an Opportunity as Won in Salesforce
  - Open the [SaaSquatch Admin Portal](http://app.referralsaasquatch.com/) to confirm that the user related to the `PrimaryReferralEmail__c` has an `oppwon` event tracked.

## Conclusion

In this tutorial we walked through creating a new trigger on Opportunity to track events in SaaSquatch whenever the opportunity is marked as won in Salesforce. Since the SaaSquatch API uses batches behind the scenes this create a low-overhead and near-realtime way of synchronizing data between Salesforce and SaaSquatch in order to trigger your referral and loyalty programs.