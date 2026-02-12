---
title: Managing W-9 Compliance for Participants
highlights: SaaSquatch can help you track which of your participants have provided you a valid W-9 Tax form. 
slug: features/managing-w-9-compliance-for-participants
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-09
---

The United States requires a W-9 Tax form when a company gives over $599.99 USD of rewards to an individual in a calendar year. 

Learn more about SaaSquatch's W-9 Compliance Functionality here: [W-9 Compliance](/features/w-9-compliance) 

To activate W-9 compliance functionality for your program contact your Launch Manager or Solutions Architect. 

### Marking a Participant’s W-9 Form as Collected

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Participants" in the upper header of your SaaSquatch account.
4. Find the specific participant you would like to mark W-9 Collected for. Click their name.
5. Click the "Tax Compliance" tab under their Referred by code information. 
6. Click "Mark as collected" and confirm they have provided you a valid W-9 Form. 
7. The Participant is now marked as having a valid W-9 Form. They can earn over $599.99 USD in rewards each year. 

> Any historical rewards pending due to W-9 not being collected will become available. There will no longer be a $599.99 USD reward limit for current and future tax years.

![W-9 mark as collected](/assets/images/contentful/w-9_1_4eRxrUZAZIzITcLreJ14Wp.png)

### Marking a Participant’s W-9 Form as Not Collected

You can change the collection status of a participant's W-9 Form. 

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Participants" in the upper header of your SaaSquatch account.
4. Find the specific participant you would like to mark W-9 Collected for. Click their name.
5. Click the "Tax Compliance" tab under their Referred by code information. 
6. Click "Mark as not collected"
7. The partipant is no longer considered to have a valid W-9 Tax form. 

> Changing a participant's W-9 status from "Collected" to "Not Collected" will not retroactively move participant's earned rewards to Pending (Regardless of if they are over $599.99USD/per calendar year). Future rewards will be follow W-9 compliance. 

![W-9 mark as not collected](/assets/images/contentful/w-9_2_3HabVybt1sHXB1wI6pkcUq.png)

### Check Participant's W-9 Form Status
You can check a partipant's W-9 form collection status and see the amount of rewards earned in a calendar year. 

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Participants" in the upper header of your SaaSquatch account.
4. Find the specific participant you would like to mark W-9 Collected for. Click their name.
5. Click the "Tax Compliance" tab under their Reffered by code information.
6. Here you can view their W-9 Form collection status and a breakdown of Rewards earned per calendar year. 

### Exporting the US W-9 tax status of all users
SaaSquatch provides a US W-9 Tax Report, which provides information on all users and makes it possible to identify:

- Which users have not yet submitted a W-9 form
- Users who have hit their tax year limit, and have pending rewards
- The total amount of taxable rewards received in previous years

To access the report:

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Analytics", then "Reports".
4. Click "Create Report".
5. Select the "US W-9 tax report"
6. Choose the output format - both Excel and CSV are supported
7. Click "Create Report"

![W-9 tax report](/assets/images/contentful/w-9_3_1e2SkhE88kqX4NI6JZpkdX.png)

The resulting report will contain the following columns:
<table class="table"><thead><tr><th>CSV</th><th>Excel</th><th>Description</th></tr></thead><tbody><tr><td class="docs-monospace">userId</td><td class="docs-monospace">User ID</td><td>The user's ID.</td></tr><tr><td class="docs-monospace">accountId</td><td class="docs-monospace">Account ID</td><td>The user's account ID.</td></tr><tr><td class="docs-monospace">email</td><td class="docs-monospace">Email</td><td>The user's email address.</td></tr><tr><td class="docs-monospace">firstName</td><td class="docs-monospace">First Name</td><td>The user's first name.</td></tr><tr><td class="docs-monospace">lastName</td><td class="docs-monospace">Last Name</td><td>The user's lastName.</td></tr><tr><td class="docs-monospace">dateUsTaxFormSubmitted</td><td class="docs-monospace">Date US Tax Form Submitted - YYYY-MM-DD</td><td>The date that the user submitted their W-9 form. This will be blank if they have not yet submitted a W-9 form.</td></tr><tr><td class="docs-monospace">year</td><td class="docs-monospace">Year</td><td>The tax year that this row pertains to, or the value "PENDING" if this row indicates a user's pending reward value and count.</td></tr><tr><td class="docs-monospace">value</td><td class="docs-monospace">US Taxable Value in Cents</td><td>The total US taxable value of rewards earned in cents.</td></tr><tr><td class="docs-monospace">valueInDollars</td><td class="docs-monospace">US Taxable Value in Dollars</td><td>The total US taxable value of rewards earned in dollars.</td></tr><tr><td class="docs-monospace">count</td><td class="docs-monospace">Reward Count</td><td>The number of rewards that contribute to this row's US Taxable Value</td></tr></tbody></table>