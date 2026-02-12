---
title: Bulk User Delete
highlights: The SaaSquatch portal allows you to bulk delete users from your SaaSquatch project.
slug: guides/bulk-user-delete
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-10-30
robotsTag:
  - FOLLOW
tags:
  - import
  - bulk user delete
  - user delete
---

> __Warning__: Participant deletion is an irreversible, permanent action that impacts all share links, referrals, events, and analytics connected to the deleted participant. Deleted data is not recoverable. Before starting the deletion process, we recommend confirming that all users in your upload file should be permanently erased from SaaSquatch. See our document on [Participant Deletion](/features/participant-deletion) for more information, or contact our [Support team](mailto:saasquatch-support@impact.com).

### Bulk User Delete
Delete existing users in bulk.

1. Head to your SaaSquatch account.
2. In the upper left corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Analytics" in the upper header of your SaaSquatch account.
4. Click "Reports" in the navigation.
5. Click "Import" on the right side of the Reports page.
6. Select "Delete Users" from the Import Type section.
7. Click "Select & Upload" and choose the file to import.
8. Click "Start Import" to begin the import.
9. The participants are now deleted. 

### Upload Format & Recommendations

- SaaSquatch accepts bulk user deletes submitted in `.csv` or `.jsonl` file formats. 
- Fields are case sensitive.
- It is recommended that each import does not exceed 500,000 entries. 
- Please reference our [sample CSV import file](https://assets.ctfassets.net/s68ib1kj8k5n/4IWYz9jkNTP4gQiKU5HSnO/09794e8768e3732f6d06ea29a058d388/sample-user-delete.csv) and [sample JSONL import file](https://assets.ctfassets.net/s68ib1kj8k5n/1GMnqK0sMJ9LXXaKyjXOVD/ec39618863613f483703cd6f754b6017/userDeleteImportSample.zip).

### Fields 
Bulk user deletes require only an `id` and `accountId` for the users to be deleted, and have some optional fields depending on the behaviour required.

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
    <td class="docs-monospace">preserveEmptyAccount</td>
    <td>
      <span class="muted docs-monospace">boolean</span>
    </td>
    <td>If the user's account is left with no users, by default the account will be deleted. If set, this field will result in the empty account being preserved. This will override the global <code>Preserve Empty Accounts</code> setting for the import job for this row specifically.</td>
</tr>
  <tr>
    <td class="docs-monospace">doNotTrack</td>
    <td>
      <span class="muted docs-monospace">boolean</span>
    </td>
    <td>Specify <code>true</code> if you would like this user to be deleted with the <code>Do Not Track</code> setting set. This will override the global <code>Do Not Track</code> setting for the import job for this row specifically.</td>
</tr>
</tbody>
</table>

### Results
When your upload completes you will receive an email notifying you of the result.

You can download import results from the *Reports* page within the Analytics section.

> **Please Note:** Download links will expire after 30 days.

#### Errors
If any non-fatal errors are encountered during the import, then a results file will be generated.

The errors file includes entries for each error that occurred, including the row number of the record (from the initial import file) that failed, and any associated error messages.

In the unlikely event that a fatal system error occurs and the import is interrupted, then the import will appear as **aborted** and will not recover. Please our [Success Team](mailto:success@saasquatch.com) for further assistance. 