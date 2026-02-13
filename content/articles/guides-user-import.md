---
title: Bulk User Import
highlights: The SaaSquatch portal provides a quick and easy way to bulk upload users into your SaaSquatch project to create or update user information.
slug: guides/user-import
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-28
tags:
  - bulk user import
  - user import
  - import
---

### Bulk User Import

Imported new users or update existing users in bulk.

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Participants" in the upper header of your SaaSquatch account.
4. Click "Import Users" on the right side of the Participants page.
5. Select "User" from the Import Type section.
6. Click "Select & Upload" and choose the file to import.
7. Click "Start Import" to begin the import.
8. When the import completes a confirmation email is sent.

> Bulk User imports may take up to 30 minutes depending on queue and file size.

### Upload Format & Recommendations

- SaaSquatch accepts bulk user imports submitted in `.csv` or `.jsonl` file formats.
- Fields are case sensitive.
- It is recommended that each import does not exceed 500,000 entries.
- Please reference our [sample CSV import file](/assets/samples/sample-user-upload.csv) and [sample JSONL import file](/assets/samples/userImportSample.jsonl).

### Fields

Bulk user imports support both Standard Fields and Custom fields in the upload file.

#### Standard Fields

Standard fields are parsed with the same validation as our [Open Endpoint User Upsert API call](/api/methods/#open_user_upsert):

<table class="table">
<thead>
<tr>
    <th >
        Field
    </th>
    <th>
        Type
    </th>
    <th>
        Description
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">accountId</td>
    <td>
         <span class="label">Required</span> 
      <span class="muted docs-monospace">string</span>
    </td>
    <td>The unique identifier of the Account that this user belongs to.</td>
</tr>
<tr>
    <td class="docs-monospace">id</td>
    <td> <span class="label">Required</span> 
      <span class="muted docs-monospace">string</span>
    </td>
    <td>The unique identifier provided for this user.</td>
</tr>
<tr>
    <td class="docs-monospace">firstName</td>
    <td>
      <span class="muted docs-monospace">string</span>
    </td>
    <td>The user's first name</td>
</tr>
  <tr>
    <td class="docs-monospace">lastName</td>
    <td>
      <span class="muted docs-monospace">string</span>
    </td>
    <td>The user's last name</td>
</tr>

  <tr>
    <td class="docs-monospace">email</td>
    <td>
      <span class="muted docs-monospace">string</span>
    </td>
    <td>The email address for the user. </td>
</tr>

  <tr>
  <td class="docs-monospace">referable</td>
  <td>
    <span class="muted docs-monospace">boolean</span>
  </td>
  <td>Flag used by the SaaSquatch system to determine whether a user is able to be referred.<br>
    <strong>Note:</strong> Flag must be spelled with only <i>one</i> <code>r</code> for status to be modified successfully.</td>
</tr>

<tr>
  <td class="docs-monospace">locale</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The user's locale, used for <a href="/themes/internationalization">Internationalization</a>. The locale must be of the format <code>language_COUNTRY</code> where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.</td>
</tr>
  <tr>
  <td class="docs-monospace">countryCode</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The user's locale, used for <a href="/themes/internationalization">Internationalization</a>. The user's country code (e.g CA)</td>
</tr>
<tr>
  <td class="docs-monospace">referredBy.code</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The referral code of the Referrer who referred this user.</td>
</tr>
  <tr>
  <td class="docs-monospace">referralCodes.{programId}</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The vanity referral code for this user to share for the specified program (automatically generated if not included)</td>
</tr>
  <tr>
  <td class="docs-monospace">sharelinks.{programId}</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The vanity sharelink for this user to share for the specified program (automatically generated if not included)</td>
</tr> 
  <tr>
  <td class="docs-monospace">dateCreated</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The user's creation date</td>
</tr>
 <tr>
  <td class="docs-monospace">imageUrl</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>Optionally used in widgets, emails, and themes. If you provide a absolute profile image URL the minimum image size is 80px x 80px.</td>
</tr>
  <tr>
  <td class="docs-monospace">dateUsTaxFormSubmitted</td>
  <td>
    <span class="muted docs-monospace">integer</span>
  </td>
  <td>The date that a user's W-9 Tax Form was marked as collected. Used for <a href="/features/w-9-compliance">W-9 Compliance</a> on your tenant, if configured<br>
</td>
</tr>
  <tr>
  <td class="docs-monospace">customFields.{fieldName}</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>Use this structure to include a custom field of your choosing</td>
</tr>
<tr>
  <td class="docs-monospace">paymentProviderId</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The paymentProviderId is either the Stripe Customer ID or the Recurly Account ID. <br>
    <strong>Note:</strong> This field cannot be updated. Do not include this arguement on an API-only program, or unless looking to set it.
   <br>
       <span class="label">Classic only</span> <strong>Note:</strong> Only used by classic referral programs.</td>
</tr>
<tr>
  <td class="docs-monospace">referralCode</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The referral code <i>used for sharing by this user</i><br>
      <span class="label">Classic only</span> <strong>Note:</strong> Only used by classic referral programs.</td>
</tr>
<tr>
  <td class="docs-monospace">referredBy.isConverted</td>
  <td>
    <span class="muted docs-monospace">string</span>
  </td>
  <td>The <a href="/success/core-topics/#conversion">referral status</a> of the Referred User. <br>
    <span class="label">Classic only</span> <strong>Note:</strong> Only used by classic referral programs.</td>
</tr>
</tbody>
</table>

#### Custom Fields

[Custom user fields](/features/custom-user-fields) allow for data unique to your participants. Add a custom fields to the column header in this format: customFields.yourCustomFieldName

[Growth Automation](/growth/saasquatch-ga/) programs allow for triggering goals based on custom user fields.

Example: The [Birthday Program](/program/birthday-program/) allows for a user's birthdate to trigger a goal. First, upload the participant's birthday in --MM-DD format in the customFields.birthday field. Then set the goal to convert on or around their birthday.

Example: Reward participants when they renew their subscription membership. First, include the custom field customFields.subscriptionPaid with the value of yes. Then, set the goal to convert when when customFields.subscriptionPaid is equal to yes.

> **Note:** Custom fields are not able to accept array or object values.

### User Segments

You can include or remove participants from a specific **[user segment](/features/user-segmentation)**. during the bulk user upload process.

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Participants" in the upper header of your SaaSquatch account.
4. Click "Import Users" on the right side of the Participants page.
5. Select "User" from the Import Type section.
6. Click "Select & Upload" and choose the file to import.
7. Select a segment from the dropdown list below "Select & Upload".
8. Click "Start Import" to begin the import.
9. When the import completes a confirmation email is sent.

> **Note:** When a segment is selected all participants uploaded at that time will be added to or removed from the selected segment.

### Results

When your upload completes you will receive an email notifying you of the result.

You can download import results from the _Import and Export Jobs_ page within the Reporting section.

> **Please Note:** Download links will expire after 30 days.

#### Successful Upload

If the import completes successfully, a file with the user information of those that were successfully imported will be generated and emailed to you.

The user information that is included in these results is the same as is found in our [User Details Report](/features/reports/#user-details-report).

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

In the unlikely event that a fatal system error occurs and the import is interrupted, then the import will appear as **aborted** and will not recover. Please our [Success Team](mailto:success@saasquatch.com) for further assistance.
