---
title: User Segmentation
highlights: Create and manage intelligent segments of participants for your SaaSquatch programs. Improve personalization and ROI by using these segments to accurately promote each program to the correct group of users.
slug: features/user-segmentation
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-28
seoDescription: How to segment users in your referral and loyalty program to provide unique rewards to a subset of your participants...
---

## About user segmentation
User segmentation is the process of dividing your userbase into groups based on shared characteristics.

<div class="row-fluid">
  <div class="span6">
    <p>Common segmentation criteria include demographic factors like:
      <ul><li>Age
<li>Sex/Gender
<li>Location
<li>Job Industry
  <li>Place of employment
  <li>Income
  </ul>
<p>You might also segment users based on a number of characteristics related to their relationship with your business like:
<ul><li>Membership status
<li>Subscription plan tier
<li>Last purchase date
<li>Signup date
<li>Device
  </ul>
  </div>
  <div class="span6">
  <img src="/assets/images/contentful/segment_user_cloud_4Qabf0HKzuIWmiWqiYiWUA.png" alt="segment user cloud">
  </div>
</div>

By segmenting your users you can better understand their interests, follow their activity, and more accurately provide value that matches their needs.

## Managing user segments
In the SaaSquatch Admin Portal, you can create new user segments, add individual participants to user segments, add participants to user segments in bulk, and remove participants from user segments.

### Creating a user segment

1. Log on to the SaaSquatch Admin Portal.
2. In the upper left corner of your SaaSquatch account, select either your __Live__ or __Test__ tenant.
3. Click __Data__ in the top menu bar.
4. Click the __Segments__ tab. 
5. Click the __plus symbol (+)__ to the right of the segment section. 
6. Type the name of the segment you would like to add. 
7. Click __Add__ to create that segment. 

Your new segment has been created. 

### Adding a single participant to a user segment

1. Log on to the SaaSquatch Admin Portal.
2. In the upper left corner of your SaaSquatch account, select either your __Live__ or __Test__ tenant.
3. Click __Participants__ in the top menu bar of your SaaSquatch account.
4. Find the specific participant you would like to add to a user segment.
5. Click that user to load their user overview. 
6. In the bottom left of the user overview, click __Add Segment__. 
7. Select the user segment you would like to include this participant in. 

All done. The user is now within that user segment. 

### Adding participants to user segments in bulk 

1. Log on to the SaaSquatch Admin Portal.
2. In the upper left corner of your SaaSquatch account, select either your __Live__ or __Test__ tenant.
3. Click __Data__ in the top menu bar of your SaaSquatch account.
4. Click the __Segments__ tab.
5. Find the name of the segment to which you want to add users.
6. Click __Add Users__ to the right side of the row under the Participants column. 
7. Choose the import type __Users__. 
8. Using the example CSV, create a list of all participants you would like to be included in a specific User Segment. 
9. Click __Select & Upload__ to choose the CSV file you have created and upload it to SaaSquatch. 
10. From the dropdown menu choose which user segment to add the specific participants to. 
11. Click __Start Import__ to assign the specific partipants to the selected User Segment. 

Through the SaaSquatch portal you can make changes to a [bulk list of users](/guides/user-import) to add or remove them from segments in your SaaSquatch project.

### Removing a single participant from a user segment

1. Log on to the SaaSquatch Admin Portal.
2. In the upper left corner of your SaaSquatch account, select either your __Live__ or __Test__ tenant.
3. Click __Participants__ in the top menu bar of your SaaSquatch account.
4. Find the specific participant you would like to remove from a user segment.
5. Click that user to load their user overview. 
6. In the bottom left of the user overview, click the __x__ to the right of the segment you would like to remove the participant from. 

The participant has been removed from the selected user segment. 

## SaaSquatch API and squatch.js segmentation
The SaaSquatch REST API and squatch.js Javascript library can also be used to programatically manage which segments users are a member of.

This functionality can be accessed by including one or more of the following "Operations" (a combination of the name of the segment and an operator) in the user object of the API call or squatch.js method. 

### Operators
The following operators are the basis for the User Segmentation "Operations" used to manage which segments a user is a member of.
<table class="table">
<thead>
<tr>
    <th >
        Operator
    </th>
    <th>
        Description
    </th>
    <th>
        Example
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">Add</td>
    <td>
        Providing just the segment key will attempt to add the user to the segment. If the user is already part of the segment then no action will be taken.
    </td>
    <td><code>mySegmentKey</code> </td>
</tr>
<tr>
    <td class="docs-monospace">Delete</td>
    <td>
        Including the segment key with a <code>~</code> in front of it will inform the SaaSquatch system to remove the user from the segment. If the user is already not part of the segment then no action will be taken.
    </td>
    <td><code>~mySegmentKey</code> </td>
</tr>
  <tr>
    <td class="docs-monospace">Clear</td>
    <td>
        Including a <code>*</code> key, with a <code>~</code> in front of it, will inform the SaaSquatch system to remove the user from all segments they are currently part of. 
    </td>
    <td><code>~*</code> </td>
</tr>
</tbody>
</table>

### Operations
The following Operations, built using the available Operators, enable you to manage which segments a user is a member of.

<table class="table">
<thead>
<tr>
    <th >
        Operation
    </th>
    <th>
        Description
    </th>
    <th>
        Example
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">Add</td>
    <td>
        Adds a user to a segment. Any other existing segments will be retained.
    </td>
    <td><code>{ 
  "id" : "abc_123", ...
  "segments" : ["A"] 
}</code> </td>
</tr>
<tr>
    <td class="docs-monospace">Set</td>
    <td> Set the segment(s) for a user. Any other existing segments will be removed.<br><br> 
      <strong>NOTE: Ordering does matter!</strong> To perform a <code>set</code> operation, the clear Operator (<code>~*</code>) should be included first.
    </td>
    <td><code>{ 
  "id" : "abc_123", ...
  "segments" : ["~*","A" ] 
}</code></td>
</tr>
<tr>
    <td class="docs-monospace">Remove</td>
    <td>
        Remove a user from a segment. Any other existing segments will be retained.
    </td>
    <td><code>{ 
  "id" : "abc_123", ...
  "segments" : ["~A"] 
}</code></td>
</tr>
  <tr>
    <td class="docs-monospace">Clear</td>
    <td>
        Clear all segments configured for a user.
    </td>
    <td><code>{ 
  "id" : "abc_123", ...
  "segments" : ["~*"] 
}</code></td>
</tr>

</tbody>
</table>

> You can find further details about using these Operations in our squatch.js Javascript library and SaaSquatch API methods in our [documentation](/api/methods/#open_user_upsert).
