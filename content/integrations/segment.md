---
title: Segment Software Integration
integrationName: Segment
slug: segment
integrationDescription: Segment allows you to easily manage integrations with multiple analytics services. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code.
logo: "segment-integration.png"
guideLink: /segment
tags:
  - in-directory
keyFeatures:
  - "Implement SaaSquatch using Segment's javascript library"
  - Works with API and Payment Provider programs
  - Identify, attribute, and convert referrals
  - Display the Referral Widget in Popup or Embedded mode
moreInfo:
  - "[Segment Quickstart Guide](/developer/segment/quickstart)"
  - "[Segment Tech Reference](/developer/segment)"
template: intergrationLander.html
contentType: integration
---

<p style="max-width: 600px; margin: 0 auto;">![Segment Integrations](/assets/images/contentful/Segment_Integrations_1HGYnMmUl5dxcFvWnsqlN3.png)</p>

#### 1. Send data from SaaSquatch as a [source / stream in Segment](/integrations/segment-v2/stream)

The [Segment Source](/integrations/segment-v2/stream) can assist with use cases such as tracking referral codes in other systems, triggering other workflows when referrals happen, triggering fulfillment processes for loyalty credits or rewards, and so on.

#### 2. Send data to SaaSquatch as a [destination / subscription in Segment](/integrations/segment-v2/subscription).

The [Segment destination](/integrations/segment-v2/subscription) makes it faster and easier to get user data into SaaSquatch. This data can be used to achieve things such as registering users, tracking users, converting referrals, and triggering loyalty programs.

The Segment destination consumes data sent from Segment to the SaaSquatch APIs for [tracking events](/api/methods/#trackEvent) and [upserting users](/api/methods/#create_user).

<table class="table" style="max-width: 400px;">
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
