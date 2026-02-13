---
title: Segment Stream
highlights: "The Segment source speeds up integrating SaaSquatch with other tools in your marketing and analytics stack and can help with use cases such as tracking referral codes in other systems, triggering other workflows when referrals happen, and triggering fulfillment processes for loyalty credits or rewards.\n"
slug: integrations/segment-v2/stream
sectionType: guide
template: hasTableOfContents.html
date: 2022-08-12
---

<table class="table">
<thead>
<tr>
<th></th>
<th>Source / Stream</th>
<th>Destination / Subscription</th>
</tr>
</thead>
<tbody>
<tr>
<th>Segment Integration Documentation</th>
<td>
<ul>
<li>Tech Reference</li>
</ul>
</td>
<td>
<ul>
<li><a href="/integrations/segment-v2/subscription">Tech Reference</a></li>
</ul>
</td>
</tr>
</tbody>
</table>

### Installing the Segment Source

1. Login to the [SaaSquatch Portal](https://app.referralsaasquatch.com)

2. Go to your Integrations page

3. Enable the Segment integration.

![Segment Integration Page](/assets/images/contentful/Screenshot_2021-05-12_140247_6fmuKc3bsJ275aeRwaneSY.png)

4. Login to your Segment account

5. Create a new __HTTP API__ source.

![Segment HTTP API Source](/assets/images/contentful/Segment_HTTP_API_Source_6JngTjyjrpnDNQiqly0NVY.png)

6. Copy the __Write Key__ 

![Segment Write Key](/assets/images/contentful/Segment_Write_Key_1LtoLJKdMGTOYxYHaQTE55.png)

7. Navigate to the Segment Source tab on the integrations page and paste the __Write Key__ into the Segment write key field.

8. (Optional) Enable/disable event types to be sent

![Segment Data Settings](/assets/images/contentful/Screenshot_2021-05-12_154742_5G4QYnnzLKnIgePfjCvAoE.png)

### Data sent to Segment

The data that gets sent to Segment is based on the SaaSquatch webhooks. Each webhooks maps to an event type in Segment and can be enabled or disabled individually.

<table class="table">
<thead>
<tr>
<th>SaaSquatch Webhook Name</th>
<th>Segment Event Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>referral.created</code></td>
<td><code>Referral Created</code></td>
</tr>
<tr>
<td><code>reward.created</code></td>
<td><code>Reward Created</code></td>
</tr>
<tr>
<td><code>user.created</code></td>
<td><code>Identify</code></td>
</tr>
</tbody>
</table>
