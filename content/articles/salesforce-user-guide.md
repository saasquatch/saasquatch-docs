---
title: Salesforce Integration User Guide
highlights: Details about the Invocable Methods and Apex Triggers available in the SaaSquatch for Salesforce Integration.
slug: salesforce/user-guide
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-24
---


> **Getting Started: Installation**
>
> Installation instructions for the SaaSquatch Integration can be found in our [Salesforce Installation Guide](/salesforce/install-guide). It is recommended to follow that guide to complete the initial installation before adding any of the customizations outlined in this guide.

### Workflow Rules vs. Apex Triggers

Salesforce provides a number of tools for automating your business processes Workflow Rules and Triggers.

**Workflow Rules** can help automate processes like Tasks, Email Alerts, Field Updates, and Outbound Messages. Each Workflow Rule consists of a Criteria and either an Immediate action or a Time-dependent action.

**Apex Triggers** are built using Apex code and are an advanced functionality available in Salesforce which provides the ability to build out custom functionality and workflows.

You may select either tool based on your business needs and development bandwidth.

Further details about which tool to use when automating your business processes through Salesforce can be found in the [Salesforce Trailhead](https://trailhead.salesforce.com/modules/business_process_automation/units/process_whichtool).

### Invocable Method List

The Referral SaaSquatch integration provides the following Invocable Methods for use in your Salesforce instance.

<table class="table table-hover">
  <tr>
    <th>Method Name</th>
    <th>Version Introduced</th>
    <th>Input Variable Name</th>
    <th>Expect Variable Type</th>
    <th>Expected Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="/salesforce/ids-config/">Track Event by Id</a></td>
    <td>v1.4.0</td>
    <td><code>usersEvents</code></td>
    <td>String</td>
    <td><a href="/salesforce/ids-config/">Id</td>
    <td>Track a list of events for SaaSquatch Users based on their SaaSquatch User and Account Ids</td>
  </tr>
  <tr>
    <td>Track Event by Lead</td>
    <td>v1.4.0</td>
    <td><code>usersEvents</code></td>
    <td>Lead</td>
    <td>Lead</td>
    <td>Track a list of events for SaaSquatch Users based on their associated SFDC Lead record</td>
  </tr>
  <tr>
    <td>Track Event by by Contact</td>
    <td>v1.4.0</td>
    <td><code>usersEvents</code></td>
    <td>Contact</td>
    <td>Contact</td>
    <td>Track a list of events for SaaSquatch Users based on their associated SFDC Contact record</td>
  </tr>
  <tr>
    <td><a href="/salesforce/ids-config/">Upsert User by Id</a></td>
    <td>v1.3.0</td>
    <td><code>usersUpserts</code></td>
    <td>String</td>
    <td>Id</td>
    <td>Update a list of SaaSquatch Users based on their SaaSquatch User and Account Ids. As of v1.4.0 supports <a href="/salesforce/immediate-object-upsertion">Immediate Object Upsertion</a>.</td>
  </tr>
  <tr>
    <td>Upsert User by Lead</td>
    <td>v1.3.0</td>
    <td><code>usersUpserts</code></td>
    <td>Lead</td>
    <td>Lead</td>
    <td>Update a list of SaaSquatch Users based on their associated SFDC Lead record. As of v1.4.0 supports <a href="/salesforce/immediate-object-upsertion">Immediate Object Upsertion</a>.</td>
  </tr>
  <tr>
    <td>Upsert User by Contact</td>
    <td>v1.3.0</td>
    <td><code>usersUpserts</code></td>
    <td>Contact</td>
    <td>Contact</td>
    <td>Update a list of SaaSquatch Users based on their associated SFDC Contact record. As of v1.4.0 supports <a href="/salesforce/immediate-object-upsertion">Immediate Object Upsertion</a>.</td>
  </tr>
</table>

### Custom Triggers

Advanced users can also use an Apex Trigger to call SaaSquatch invocable methods. If you're looking for a more fine-grained alternative to Workflow rules check out [Using a Salesforce APEX Trigger to upsert a Lead](/salesforce/using-salesforce-apex-trigger-to-upsert-lead)

### Default SaaSquatch Triggers

The SaaSquatch Integration includes a number of built in triggers. The majority of these triggers are enabled by default to provide the standard functionality of the integration, such as linking Users to Contacts & Leads and cascading custom fields.

A full list of the available SaaSquatch Triggers can be found in your Salesforce instance under Setup -> Custom Metadata Types -> "Manage Records" for "Referral SaaSquatch Trigger". You can disable these triggers individually to help diagnose compatibility issues with any other triggers and processes in your Salesforce organization.

### Configuring Additional Fields to be Synced to Leads/Contacts

As of version 1.7.0 of the SaaSquatch Integration, you can now configure user fields to be synced to custom fields on your Lead and/or Contact objects in Salesforce. You can edit your synced fields in Step 2 of your Salesforce Integration setup on the Integrations page of your SaaSquatch tenant.

#### Convenience Mappings

<table class="table table-hover">
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Recommend Salesforce Field type</th>
  </tr>
  <tr>
    <td>User - Program Referral Code</td>
    <td>Evaluates to the primary referral code for the selected program.</td>
    <td>Text</td>
  </tr>
  <tr>
    <td>User - Program Share Link</td>
    <td>Evaluates to the primary share link for the selected program.</td>
    <td>Text or URL</td>
  </tr>
  <tr>
    <td>User - Segments</td>
    <td>Evaluates to a true/false value representing whether the user is in the inputted segment</td>
    <td>Checkbox</td>
  </tr>
  <tr>
    <td>User - Custom Field</td>
    <td>Evaluates to the value of the inputted custom field.</td>
    <td>Text</td>
  </tr>
  <tr>
    <td>User - Statistic</td>
    <td>A calculated user statistic. Note, user statistics are not updated in real time and can be up to 24 hours out of date.</td>
    <td>-</td>
  </tr>
  <tr>
    <td></td>
    <td> - Date Modified</td>
    <td>DateTime</td>
  </tr>
  <tr>
    <td></td>
    <td> - Traffic</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Referrals</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Conversions</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Goals</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Rewards</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Widget Loads</td>
    <td>Number</td>
  </tr>
  <tr>
    <td></td>
    <td> - Revenue</td>
    <td>Currency</td>
  </tr>
  <tr>
    <td></td>
    <td> - Generated Revenue</td>
    <td>Currency</td>
  </tr>
  <tr>
    <td></td>
    <td> - Referred Revenue</td>
    <td>Currency</td>
  </tr>
</table>

#### Advanced JSONata input

By selecting `Advanced - JSONata expression` you will be able to use JSONata expressions to combine static values, logic, and values from the user context.

To read more about JSONata, [read the documentation here](https://docs.jsonata.org/overview).

Example User Context JSON:

```
{
  "id": "0000001",
  "accountId": "0000001",
  "firstName": "Maggie",
  "lastName": "Grey",
  "email": "mgrey@example.com",
  "imageUrl": "https://www.example.com/cat.jpg",
  "firstSeenIP": "1.1.1.1",
  "lastSeenIP": "1.1.1.1",
  "dateCreated": 1646159727900,
  "emailHash": "afdd2e3665f5db029df9a40bd06a5631",
  "referralSource": "UNKNOWN",
  "locale": "en_CA",
  "countryCode": "CA",
  "referralCodes": {
    "r1": "MAGGIEGREY250",
    "r2": "MAGGIEGREY235"
  },
  "programShareLinks": {
    "r1": "https://www.example.com/mz22n",
    "r2": "https://www.example.com/mz92k"
  },
  "customFields": {
    "foo": "bar"
  },
  "segments": [
    "vip",
    "closed"
  ],
  "stats": {,
    "dateModified": 1646159727900,
    "traffic": 5,
    "referrals": 5,
    "conversions": 5,
    "goals": 5,
    "rewards": 5,
    "widgetLoads": 13,
    "revenue": 133.33,
    "generatedRevenue": 133.33,
    "referredRevenue": 133.33
  }
}
```

Example JSONate expressions:

- <code>"a static value"</code>
- <code>user.firstName & ' ' & user.lastName</code>
- <code>"vip" in user.segments ? user.referralCodes.\`vip-rewards\` : user.referralCodes.rewards</code>

#### Supported Field types

Currently SaaSquatch supports syncing to Salesforce Custom fields with the following field types:

<table class="table table-hover">
  <tr>
    <th>Salesforce Field Type</th>
    <th>Example Values</th>
  </tr>
  <tr>
    <td>Checkbox</td>
    <td><code>true</code>, <code>false</code>, <code>"true"</code>, <code>"false"</code>, <code>0</code>, <code>1</code></td>
  </tr>
  <tr>
    <td>Currency</td>
    <td><code>1.23</code>, <code>"1.23"</code></td>
  </tr>
  <tr>
    <td>Date</td>
    <td><code>1646071200000</code>, <code>"2022-02-28T18:00:00.000Z"</code>, <code>"2022-02-28"</code></td>
  </tr>
  <tr>
    <td>DateTime</td>
    <td><code>1646071200000</code>, <code>"2022-02-28T18:00:00.000Z"</code>, <code>"2022-02-28"</code></td>
  </tr>
  <tr>
    <td>Email</td>
    <td><code>"example@example.com"</code></td>
  </tr>
  <tr>
    <td>Number</td>
    <td><code>42</code>, <code>"3.34"</code></td>
  </tr>
  <tr>
    <td>Percent</td>
    <td><code>42</code>, <code>"3.34"</code></td>
  </tr>
  <tr>
    <td>Phone</td>
    <td><code>"555-555-5555"</code>, <code>"+15555555555"</code></td>
  </tr>
  <tr>
    <td>Text</td>
    <td><code>"Example text"</code></td>
  </tr>
  <tr>
    <td>Text Area</td>
    <td><code>"Example text"</code></td>
  </tr>
  <tr>
    <td>Text Area (Long)</td>
    <td><code>"Example text"</code></td>
  </tr>
  <tr>
    <td>Text Area (Rich)</td>
    <td><code>"Example text"</code></td>
  </tr>
  <tr>
    <td>Text (Encrypted)</td>
    <td><code>"Example text"</code></td>
  </tr>
  <tr>
    <td>URL</td>
    <td><code>"app.referralsaasquatch.com"</code></td>
  </tr>
  <tr>
    <td>Lookup Relationship</td>
    <td><code>"0015f00000BDEqbAAH"</code></td>
  </tr>
</table>
