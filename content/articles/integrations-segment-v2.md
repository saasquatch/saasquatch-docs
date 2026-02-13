---
title: Segment V2
highlights: V2 of the SaaSquatch for Segment integration sends data from SaaSquatch to Segment, and ingests data from Segment to help you get your referral and loyalty program installed with less development work. Everything that you can achieve with the Segment integration can also be achieved using the SaaSquatch REST API and Webhooks.
slug: integrations/segment-v2
sectionType: guide
template: hasTableOfContents.html
date: 2021-05-12
---

### Overview

> __Terminology__ In this document we will rely heavily on terminology as defined by Segment. 

V2 of SaaSquatch for Segment supports SaaSquatch as both a Source (Stream) and as a Destination (Subscription).

![Segment Integration V2 Overview](/assets/images/contentful/Segment_Integrations_20iE1CSRrl3hudqlY4xHxL.svg)

### Destination / Subscription

The Segment destination makes it faster and easier to get user data into SaaSquatch. This data can be used to achieve things such as:

- Registering users
- Tracking users
- Converting referrals
- Triggering loyalty programs

The Segment destination consumes data sent from Segment to the SaaSquatch APIs for [tracking events](/api/methods/#trackEvent) and [upserting users](/api/methods/#create_user).

<table class="table">
<thead>
<tr>
<th>Segment</th>
<th>SaaSquatch</th>
</tr>
</thead>
<tbody>
<tr>
<td>Identify</td>
<td><a href="/api/methods#open_user_upsert">Upsert User</a></td>
</tr>
<tr>
<td>Track</td>
<td><a href="/api/methods/#trackEvent">Track User Event</a> and <a href="/api/methods#open_user_upsert">Upsert User</a></td>
</tr>
</tbody>
</table>

For a detailed mapping of fields and installation instructions, see our [Subscription Tech Reference](/integrations/segment-v2/subscription).

### Source / Stream

The Segment source speeds up integrating SaaSquatch with other tools in your marketing and analytics stack. This can assist with use cases such as:

 - Tracking referral codes in other systems
 - Triggering other workflows when referrals happen
 - Triggering fulfillment processes for loyalty credits or rewards

For a detailed mapping of fields and installation instructions, see our [Stream Tech Reference](/integrations/segment-v2/stream).
