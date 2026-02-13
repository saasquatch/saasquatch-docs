---
title: Bulk Event Import
highlights: The SaaSquatch portal provides a quick and easy way to import events within our system.
slug: guides/event-import
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-08-09
seoDescription: Import event information into your referral or loyalty program using our bulk event import...
tags:
  - import
  - events
  - bulk events
  - triggers
  - bulk event import
---

### Importing an Event

Imported events link to a user and can trigger both conversion and non-conversion goals.

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Analytics" in the upper header of your SaaSquatch account.
4. Select the "Reports" tab in the secondary header.
5. Click "Import" on the right side of the Your Reports page.
6. Select "User Events" from the Import Type.
7. Click "Select & Upload" and choose the file to import.
8. Click "Start Import" to begin the import.
9. When the import completes a confirmation email is sent.

> Event imports may take up to 30 minutes depending on queue and file size.

### Upload Format & Recommendations

- SaaSquatch accepts event imports submitted in `.csv` or `.jsonl` file formats.
- Fields are case sensitive
- It is recommended that each import does not exceed 500,000 entries.
- Please reference our [sample CSV file](/assets/samples/userEventSample.csv) and [sample JSONL file](/assets/samples/userEventSample.jsonl).

#### Standard Fields

<table class="table">
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="docs-monospace">accountId</td>
<td><span class="label">Required </span> <span class="muted docs-monospace">string</span></td>
<td>The unique identifier of the Account that this user belongs to.</td>
</tr>
<tr>
<td class="docs-monospace">userId</td>
<td><span class="label">Required </span> <span class="muted docs-monospace">string</span></td>
<td>The unique identifier provided for this user.</td>
</tr>
<tr>
<td class="docs-monospace">event.key</td>
<td><span class="label">Required </span> <span class="muted docs-monospace">string</span></td>
<td>The unique identifier for the type of event. EX: purchase or refund.</td>
</tr>
<tr>
<td class="docs-monospace">event.dateTriggered</td>
<td><span class="muted docs-monospace">integer</span></td>
<td>The timestamp in milliseconds when this event was triggered.</td>
</tr>
<tr>
<td class="docs-monospace">event.fields</td>
<td><span class="muted docs-monospace">object</span></td>
<td>A collection of fields with event specific information.</td>
</tr>
</tbody>
</table>

#### Event Fields

Events sent to SaaSquatch can contain a wide array of fields. This includes event specific information to interface with programs and third party integrations.

For example, a 'purchase' event would have 'revenue' and 'currency' fields.

When importing an event using .csv, these fields would be represented as: `event.fields.revenue` and `event.fields.currency`.

#### Add more Event Fields

To add more fields to an imported event, use the following format:

**CSV**: `event.fields.yourEventFieldName`

**JSON**: `"event":{ "key":"yourEventKey", "fields":{"yourEventFieldName":"yourEventFieldValue"}}`

### Results

We notify you by email when your import is complete. If you want to review the results of the import, you can go to **Analytics > Reports** and select **Create Report** to get started.

> **Please Note:** Download links will expire after 30 days.

#### Successful Upload

If the import completes successfully, a file with the event information of those that were successfully imported will be generated and emailed to you.

The file will contain the following fields.

<table class="table">
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="docs-monospace">user.accountId</td>
<td><span class="muted docs-monospace">string</span></td>
<td>The unique identifier of the Account that this user belongs to.</td>
</tr>
<tr>
<td class="docs-monospace">user.id</td>
<td><span class="muted docs-monospace">string</span></td>
<td>The unique identifier provided for this user.</td>
</tr>
<tr>
<td class="docs-monospace">event.id</td>
<td><span class="muted docs-monospace">string</span></td>
<td>The unique identifier given to the event created in SaaSquatch.</td>
</tr>
<tr>
<td class="docs-monospace">event.key</td>
<td><span class="muted docs-monospace">string</span></td>
<td>The unique identifier for the type of event. EX: purchase or refund.</td>
</tr>
<tr>
<td class="docs-monospace">event.dateTriggered</td>
<td><span class="muted docs-monospace">integer</span></td>
<td>The timestamp in milliseconds when this event was triggered.</td>
</tr>
<tr>
<td class="docs-monospace">event.dateReceived</td>
<td><span class="muted docs-monospace">integer</span></td>
<td>The timestamp in milliseconds when SaaSquatch received this event.</td>
</tr>
  <tr>
<td class="docs-monospace">event.dateProcessed</td>
<td><span class="muted docs-monospace">integer</span></td>
<td>The timestamp in milliseconds when SaaSquatch processed this event.</td>
</tr>
<tr>
<td class="docs-monospace">event.fields</td>
<td><span class="muted docs-monospace">object</span></td>
<td>The collection of fields containing event specific information.</td>
</tr>
</tbody>
</table>

#### Errors

If any non-fatal errors are encountered during the import, then a second results file will also be generated (in addition to the file with the successfully uploaded records).
The errors file includes entries for each error that occurred, including the row number of the record (from the initial import file) that failed, and any associated error messages:

<table class="table">
<thead>
<tr>
    <th class="docs-monospace">
        recordNumber
    </th>
    <th class="docs-monospace">
        message
    </th>
    <th class="docs-monospace">
        apiErrorCode
    </th>
      <th class="docs-monospace">
        statusCode
    </th>
</tr>
</thead>
<tbody>

  <tr>
  <td class="docs-monospace">2</td>
  <td>
This request requires a valid non-empty id
  </td>
  <td class="docs-monospace">BAD_REQUEST</td>
  <td class="docs-monospace">400</td>
</tr>

</tbody>
</table>

Please contact support@referralsaasquatch.com for additional questions.
