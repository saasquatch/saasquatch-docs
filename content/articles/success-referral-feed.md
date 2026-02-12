---
title: The Referral Feed
highlights: The SaaSquatch Portal provides live data on the status of each referral in your referral programs. 
slug: success/referral-feed
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-03-16
---

> The Referral Feed page provides a list of recent referral events for your program. You can access this page by clicking on [**Analytics**](/success/navigating-the-portal/#analytics) in the navigation header and "Referral Feed" in the sub-menu:
> 
> ![Referral Feed](/assets/images/contentful/image__6__1pumbR7gbaB5fU15CBb9I8.png)

### Sorting Your Data

The default view for this page lists all referrals from all programs from within the last 30 days in descending order. You can adjust this using the three drop-down menus underneath the Referral Feed header. 

<table class="table">
<thead>
<tr>
    <th width="20%">
    </th>
    <th>
        Information Displayed
    </th>
</tr>
</thead>
<tbody>
<tr>
<th>
    Referring User
</th>
    <td>This is the user in your program that provided the referral code and has made the referral.</td>
</tr>
<tr>
<th>
    Referred User 
</th>
    <td>This is the user in your program that used the provided referral code and has been referred.</td>
</tr>
<tr>
<th>
Program Name 
</th>
    <td> As the feed provides a list of events across all of your active programs, the name of the program the referral is associated with is listed here.</td>
</tr>
<tr>
<th>
Status
</th>
    <td>This field shows the current status of the referral. Statuses include <code>Started</code> and <code>Converted<c/ode>. </td>
</tr>
<tr>
<th>
Last Update 
</th>
    <td>This column shows the last time the referral was updated along with the last status saved. States include <code>Approved</code>, <code>Pending</code>, <code>Denied</code>, <code>User Modified</code>, and <code>Expired</code>.</td>
</tr>
</tbody>
</table>

#### Status

Referrals will go through a few different statuses as they [complete the referral loop](/success/core-topics):

<table class="table">
<thead>
<tr>
    <th>
        Status
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
    <td>
      <span class="docs-monospace">Started</span>
    </td>
    <td>A referral that has been attributed, but has not yet been converted.    </td>
    <td>
            <span class="muted">A Referred User has clicked on a sharelink or entered the Referrer's unique code upon sign-up and become registered in the SaaSquatch system, but has not yet reached the goalpost required to trigger conversion, such as making a qualifying purchase.</span></td>
</tr>
<tr>
    <td>
      <span class="docs-monospace">Converted</span>
    </td>
    <td>A completed referral; (if applicable) a referral where the Referred User has completed the goalpost and the SaaSquatch system has been notified of this benchmark.    </td>
    <td>
                  <span class="muted">A Referred User registered in SaaSquatch and attributed to a Referrer mets the goalpost outlined by the referral program, such as completing a qualifying purchase, and this information has subsquently been received by the SaaSquatch system.</span></td>
</tr>
</tbody>
</table>

> **Note:** The status of a referral may differ based on the parameters of the individual program. For example, if a program is set to convert without the requirement of the referred making a purchase, it would skip `Started` and display immediately as `Converted`.

#### Last Update

 This column will indicate the most recent state of the referral. You can find more information about each state below:

<table class="table">
<thead>
<tr>
    <th width="20%">
        State
    </th>
    <th>
        Meaning
    </th>
</tr>
</thead>
<tbody>
<tr>
<th>
      <span class="docs-monospace">Pending</span>
</th>
    <td>Referral is <a href="/developer/referral-security">awaiting moderation</a>.</td>
</tr>
<tr>
<th>
      <span class="docs-monospace">Denied</span>
</th>
    <td>Referral was rejected during the moderation process either automatically or manually, and is no longer active.</td>
</tr>

<tr>
<th>
      <span class="docs-monospace">Approved</span>
</th>
    <td> Referral has passed the moderation process and is active.</td>
</tr>

<tr>
<th>
      <span class="docs-monospace">Expired</span>
</th>
    <td>The subscription that is associated with this referral is no longer active, therefore the referral has also been invalidated.</td>
</tr>

<tr>
<th>
      <span class="docs-monospace">User Modified</span>
</th>
    <td>The user object associated with this referral has been modified. This modification can occur through the <a href="/developer/squatchjs/v2/#referral-widget">referral widget (squatch.js)</a>, via an <a href="/api/methods">API upsert call</a>, or through <a href="/success/using-referral-saasquatch">the SaaSquatch portal</a>. <br></br>These referrals are still active.</td>
</tr>

</tbody>
</table>

> **Note**: This column only shows the most recent last updated state. A referral showing *User Modified* as the last state may have also passed through *Pending* and *Approved* before its present state. <br></br>You can view more information about the current state of a referral by clicking on the ⚙️gear icon on the far-right of the referral.
