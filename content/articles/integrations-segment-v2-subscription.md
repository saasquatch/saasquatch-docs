---
title: Segment Subscription
highlights: SaaSquatch includes a Segment destination to receive Segment data in your SaaSquatch programs. Register and Track users, convert referrals and trigger loyalty programs with ease. 
slug: integrations/segment-v2/subscription
sectionType: guide
template: hasTableOfContents.html
date: 2022-09-23
seoDescription: Include SaaSquatch destination to Segment.io to quickly sync data to and from your referral and loyalty programs...
tags:
  - Segmenet.io
  - integration
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
  <li><a href="/integrations/segment-v2/stream">Tech Reference</a></li>
</ul>
</td>
<td>
<ul>
<li>Tech Reference</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Overview

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
<td><a href="/api/methods/#create_user">Upsert User</a></td>
</tr>
<tr>
<td>Track</td>
<td><a href="/api/methods/#trackEvent">Track User Event</a></td>
</tr>
</tbody>
</table>

### Installing the Segment Destination

1. Login to the [SaaSquatch Portal](https://app.referralsaasquatch.com)

2. Go to your Integrations page

3. Enable the Segment integration. 

![Segment Integration Page](/assets/images/contentful/Screen_Shot_2021-09-03_at_10.49.47_AM_5fTCBNeGuO8XEiYWh84XuH.png)

4. Copy your __Segment API Key__ 

5. Login to your Segment account

6. Under __Destinations__ select "Add Destination".

7. On the __Catalog__ page, search for "SaaSquatch" and select the "SaaSquatch v2" result.

![Select SaaSquatch v2 Destination](/assets/images/contentful/image_6CNohrdAkBLububV2DwMLI.png)

8. Select **Javascript** as the data source and click **Next**

9. Enter a name for the destination (eg. SaaSquatch) and click **Save**

10. On the side bar, click on __Connections__ > __Destinations__ and select your newly created Destination from the list

11. Under __Connection Settings__ click **API Key**

12. Edit the API key field and paste in the API key that you copied from the SaaSquatch Integrations page, then click Save

![Edit SaaSquatch v2 Destination](/assets/images/contentful/image_3D1KMUERVSiBDLD2DcIe7z.png)

### Using Segment for Core Topics

<table class="table">
<thead>
<tr>
<th>Area</th>
<th>Solution</th>
</tr>
</thead>
<tbody>
<tr>
<td>Identification</td>
<td>Identification is handled entirely by this integration. <code>id</code> and <code>accountId</code> are passed through the integration.</td>
</tr>
<tr>
<td>Attribution</td>
<td>Attribution can either be done by ensuring that the referral code is included in a<code>referredByCodes</code> trait as an array recorded in Segment.</td>
</tr>
<tr>
<td>Engagement</td>
<td>Engagement can be done by using the <code>referralCode</code> trait in your other marketing tools, by doing a batch export for email, or by using Squatch.js or the Mobile Widget for embedding widgets into your apps.</td>
</tr>
<tr>
<td>Conversion</td>
<td>Conversion is typically triggered by either user traits, or tracked events such as Order Completed through this integration.</td>
</tr>
<tr>
<td>Fulfillment</td>
<td>The Segment subscription does not solve fulfillment. Look at using our API, batch fulfillment, one of our 3rd party reward integrations or the Segment source.</td>
</tr>
</tbody>
</table>

### Identify Calls

Segment's identify calls are tracked in SaaSquatch by [upserting users](/api/methods/#create_user).

- __Custom Traits__ in Segment are mapped to __Custom Fields__ in SaaSquatch

- `address`, `birthday`, `created_at` and `id` traits are ignored, so they are not stored as custom fields on the SaaSquatch user

- These Segment standard fields are mapped to SaaSquatch standard fields
   - `avatar` in Segment is mapped to `imageUrl` in SaaSquatch
   - `email` in Segment is mapped to `email` in SaaSquatch 
   - `firstName` or `first_name` in Segment is mapped to `firstName` in SaaSquatch
   - `lastName` or `last_name` in Segment is mapped to `lastName` in SaaSquatch
   - `name` in Segment is mapped/split into `firstName` and `lastName` in SaaSquatch
   - `userId` in Segment is mapped to `userId` and `accountId`

- Certain values are sanitized
  - Non-alphanumeric characters in Segment traits are stripped.
  - Text traits longer than 1024 characters are truncated.
  - Trait names longer than 64 characters are truncated.

- `locale` in SaaSquatch is set based on `locale` in the [Segment context](https://segment.com/docs/spec/common/#context).

- IP Addresses in SaaSquatch are set based on the `ip` in the [Segment context](https://segment.com/docs/spec/common/#context).

- User Agent tracking in SaaSquatch uses the `user_agent` in the [Segment context](https://segment.com/docs/spec/common/#context).

- Users with a `anonymousId` but without an `userId` will be ignored. 

### Track Calls

The Segment track calls are mapped to the SaaSquatch APIs for [tracking events](/api/methods/#trackEvent). Key names will be camelcased, and `traits` will be stored as event `fields`.

- Track calls with a `timestamp` more than 180 days in the past or more than 90 days in the future will be discarded.

- Users with an `anonymousId` but without a `userId` will be ignored. 

- Certain values are sanitized
  - Text traits longer than 1024 characters are truncated.
  - Trait names longer than 64 characters are truncated.
  - Tracked event names longer than 64 characters are truncated.
  - Non-alphanumeric characters in Segment traits are stripped.
  - Non-alphanumeric characters in Segment event names are stripped.

- Segment `messageId` is used as the `idempotencyKey` in the track event API call to SaaSquatch. This results in at most once processing of the event by SaaSquatch regardless of any potential retries made by Segment. If you set a custom `messageId` that is an invalid idempotency key, it will be ignored and the event will be logged without idempotency. For more details, read our [event idempotency developer's guide](/developer/event-idempotency)

These standard [Segment Spec](https://segment.com/docs/spec) events are mapped:

 - [Order Completed](https://segment.com/docs/spec/ecommerce/v2/#order-completed) in Segment maps to the `purchase` in SaaSquatch, although this mapping can be prevented if needed

 - [Order Refunded](https://segment.com/docs/spec/ecommerce/v2/#order-refunded) in Segment maps to the `refund` in SaaSquatch

 - `purchase` and `refund` events in SaaSquatch are modelled based on the Segment spec, so contain all the same fields.

### Page, Group, Screen, and Alias Calls

These calls are not yet implemented in the SaaSquatch subscription destination.

### Configuration Options

When configuring your SaaSquatch Destination for Segment, there are several options you can set in the configuration of the integration on the Integrations page in the SaaSquatch Portal.

#### General Settings
These settings are applied to all events.

##### Invalid Segments Strategy

Segment operations on SaaSquatch users can be set using our Identify Segments Transformer or our Track User Upsert Transformer, although they only contain alpha-numeric characters. This setting allows you to choose how segments operations that do not meet this requirement are handled. You can choose from 3 different handling strategies:

__1. Discard invalid segments__

This option will remove any invalid segment from the segment array before being applied to the user in SaaSquatch.

__2. Discard all segments if any are invalid__

This option will prevent any segments from being applied to the user in SaaSquatch if any of them are invalid.

__3. Sanitize invalid segment names__

This option will attempt to "sanitize" any invalid segment names by stripping them of invalid characters.

##### Invalid Event Data Strategy

Some data that is supported by Segment is not supported in events by SaaSquatch. An example of such data is a field that contains arrays which themselves contain arrays. In the case of encountering unsupported data you can choose from 3 different handling strategies:

__1. Discard the event__

If unsupported data is encountered in an event that is to be sent to SaaSquatch, this option will discard the event and will prevent the attempt to log the event in SaaSquatch.

__2. Discard invalid event field values__

If a field of an event contains unsupported data, this option will discard only that field's data, but otherwise log the event as usual. In JSON terminology, the field's value will be set to `null`.

__3. Stringify invalid event field values__

If a field of an event contains unsupported data, this option will replace the field's value with a "stringified" version of the field's value. This way, no data will be lost from the event, however the structure of the inserted event will no longer match the original.

#### Identify Call Settings
These settings are applied to all Segment Identify events.

##### Ignore Identify Events
 This setting allows you to have control over if users are or are not upserted when SaaSquatch receives your Identify events. By default, Identify events will cause user upserts but by enabling this option, they will be ignored.

 ![Ignore Identify Events](/assets/images/contentful/Screenshot_2021-05-12_142326_56ojrLb6uzqvwzszFa2RiD.png)

##### Identify Segments Transformer
The segments transformer allows you to provide a custom [JSONata expression](http://docs.jsonata.org/overview.html) which can transform the body of a Segment Identify call into a list of segment operations which will apply to the user upsert in SaaSquatch. 

You may need to segment users in SaaSquatch based on traits provided by Segment. For example, given the following Identify body:

    {
      "messageId": "test-message-rxya2",
      "timestamp": "2021-01-12T22:28:04.947Z",
      "type": "identify",
      "email": "test@example.org",
      "projectId": "nczL0it7lw",
      "traits": {
        "trait1": 1,
        "trait2": "test",
        "trait3": true
      },
      "userId": "test-user-524utb"
    }

And a segments transformer configured as:

    [traits.trait2, "hardcoded"]

When the user is upserted into SaaSquatch it will be in the segment `test` and the segment `hardcoded`.

JSONata is a flexible expression language for transforming JSON data - for more information please [see the documentation](http://docs.jsonata.org/overview.html).

#### Track Call Settings
These settings are applied to all Segment Track events.

##### Prevent Order Completed Event Remapping
By default, the key of Order Completed events from Segment will be remapped to SaaSquatch purchase events. You may want to disable this behavior if you are sending Order Completed events with non-standard fields, as they might not be valid purchase events. 

<div class="bs-callout bs-callout-danger">
__NOTE:__ Enabling this will cause these events to be excluded from revenue generated calculations, so this may affect your analytics.
</div>

##### Track User Upsert Strategy
This setting allows you to control in which situations users should be upserted from Track events. The default is that they will be created if they do not exist, but you can choose from three handling strategies.

1. __Never upsert__: do not perform any user upsert. If the user exists, the event will be logged, if not the event will fail.
2. __Upsert if no user__: only upsert the user if they do not already exist.
3. __Always upsert__: always perform a user upsert prior to logging the event.

Using the visual editor, you can build conditions to specify when to do each of the three strategies mentioned above. This condition is an [JSONata expression](https://docs.jsonata.org/overview.html), and is evaluated using the Track event itself so any field that might be in the Track event can be used to customize this behaviour.

![User Upsert Strategy](/assets/images/contentful/Screenshot_2021-05-12_143724_2NJX5mn9iwDB5ipg1IEBjq.png) 

 For example if you created the following JSONata condition with the editor, `event = "Order Completed" ? "ALWAYS" : "MISSING_USER"`, it would configure it such that users are always upserted when Order Completed Track events are received and only upserted if the user doesn't exist in all other cases.

##### Track User Upsert Transformer
In the case where a Track event causes a user upsert, the track user upsert transformer allows you to transform properties from your Track events into fields on the user upsert. 

This transformer is a [JSONata expression](https://docs.jsonata.org/overview.html) which returns the object to include in the user upsert. Supported fields for the user upsert mirror that of our [Open User Upsert API method](/api/methods#open_user_upsert). 

Since this JSONata expression is evaluated using the Track event, any field that might be in the Track event can be used to customize this behaviour. For example, if your Track event contains a property called `plan`, you could upsert it to a custom field on the user with the expression `{ "customFields": { "plan": properties.plan } }`
