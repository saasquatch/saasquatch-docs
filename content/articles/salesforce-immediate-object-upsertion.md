---
title: Salesforce Immediate Object Upsertion
highlights: Details about the immediate object upsert functionality available in the SaaSquatch for Salesforce Integration.
slug: salesforce/immediate-object-upsertion
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-16
---

> Immediate object upsertion functionality was introduced with version 1.4.0 of the Managed Package

### Immediate Object Upsertion
Traditionally, SaaSquatch for Salesforce has relied on a separate synchronisation service to periodically export and bulk import SaaSquatch Users, Referrals, and Reward Balances into Salesforce.

The issue with this approach is that the results of actions triggered in Salesforce which in turn manipulate data in SaaSquatch (through one of the available invocable methods) are not reflected in Salesforce immediately, as the changes are only synced periodically by the synchronisation service.

To improve this situation, in v1.4.0 of SaaSquatch for Salesforce we have introduced functionality to immediately create or insert (`upsert`) SaaSquatch custom objects in Salesforce when any of the `Upsert User` invocable methods are called.

To make use of this functionality, when setting up your Workflow rules or Apex code to call a SaaSquatch for Salesforce `Upsert User` invocable method, set the property `Immediately Upsert Objects` to `true`.

When your setup runs and the SaaSquatch API upserts a user, extra details about the user will be returned and immediately updated in Salesforce, which could result in any of the following being upserted into Salesforce:
 - The user themselves (which will trigger automatic Contact/Lead linking)
 - The user's reward balances
 - The user's referred by referrals, as well as the referring user
 - The user's 10 most recent referrals, as well as the referred user

Note, for the other users involved in referrals, this process is not recursive - the users will be created in Salesforce, but their respective reward balances and referrals will not be automatically upserted.