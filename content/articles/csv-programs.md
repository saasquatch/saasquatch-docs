---
title: Adding Users & Triggering Reward Goals via CSV Import
highlights: This guide outlines how to upload users and trigger Program Goals by only using our Bulk Import processes.
slug: csv-programs
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-11-24
tags:
  - Guide
---

## Adding users
You can use the __[Bulk User Import](/guides/user-import/)__ to upload both Referrers and Referred Users, or Loyalty users.

- All you will need to include at minimum is `accountId` and `id`, but we recommend also including the user's first and last names as well as email.
- To connect up a referral, the referrer's code (`FRIENDCODE` in the example file below) will need to be provided in a `referredBy.Code` column.

> Supply both an account ID (`accountId`) and a user ID (`id`) field for the users being imported. Unless you are using our [Shared Accounts](/shared-vs-solo-accounts/ "Shared Accounts page") feature, both the account and user ID fields should be the same value and ideally match your internal user IDs.
> 
> You can include any other additional information about the user by using the fields outlined on our [Bulk User Import page](/guides/user-import/#standard-fields "Standard Fields for Bulk User Import"). 

### Example user import
![Screenshot 2023-11-23 at 5.19.50 PM](/assets/images/contentful/Screenshot_2023-11-23_at_5.19.50_PM_5frP5tkj6CDUoDtBY04lD8.png)

- Row 1 "Referred User" will be referred to an existing user whose referral code is `FRIENDCODE`. 
- Row 2 "Loyalty User" will not be referred to any existing users, and simply be created or updated. 

### Importing the User File

> Once the file has been filled with all relevant user information, export it as a .csv file and proceed with [importing the file](/guides/user-import/).

## Triggering program goals
Your program should be set up with __Program Goals__ that trigger on either:

- User events
- User custom fields

> You'll need to identify the event or custom field that triggers your goal and apply that logic to the below instructions. 

### User event trigger
For goals that trigger when a user performs an action, __you'll need to build a [Bulk Event Import](/guides/event-import/).__

### User custom field trigger
You can use the same Bulk User Import to send along the custom field. In the below example, the program goal is met when the custom field `status` is `subscriber`.

![Screenshot 2023-11-23 at 5.20.00 PM](/assets/images/contentful/Screenshot_2023-11-23_at_5.20.00_PM_1XOttKd8j4CdVpvXXUTWOl.png)

> You're able to send this custom field along with the user creation in order to trigger the goal if the user has already met the conditions.