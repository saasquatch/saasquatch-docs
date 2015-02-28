---
title: API Webhooks
highlights: The Referral SaaSquatch Webhooks API closely matches that described by the [RestHooks](http://resthooks.org/docs/) guidelines.
slug: 'api/webhooks'
template: api.html
---

Interacting with third party APIs like Referral SaaSquatch often suffers from two important problems:


 - Services not directly responsible for making an API request may still need to know the response
 - Some events, like coupon created events, are not the result of a direct API request


Webhooks solve these problems by letting you register a URL that we will POST anytime an event happens in your account. When the event 
occurs, for example when a vanity coupon code is created for a new user, Referral SaaSquatch creates an event object. This object contains all the relevant 
information, including the type of event and the data associated with that event. Referral SaaSquatch then sends an HTTP POST request with the event object 
to any URLs in your account's webhook settings. You can find a full list of all event types below.


**Retry Policy** - Rest hooks are delivered immediately after an event is triggered. If the endpoint does not successfully respond to a delivery 
attempt (<em>i.e. respond with a status code other than 200</em>), the delivery will be considered as failed. Failed deliveries will be 
reattempted every hour after the previous failed attempt until either a successful delivery is made or until 72 attempts have 
been made (<em>approximately 3 days at the rate of 1 retry per hour</em>).


**Multiple Subscriptions** - Multiple endpoints may be subscribed, in which case each endpoint will be notified using the behavior described above. Duplicate
endpoint urls will simply result in one subscription being created for that url.


**Delivery Order** - Delivery order of events is not guaranteed and delivery timing is not guaranteed. Avoid building logic that relies on a specific delivery ordering of webhook notifications.


<hr/>

### Webhook Events

<table class="table">
<thead>
<tr>
    <th>
        Event type
    </th>
    <th>
        Description
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">coupon.created</td>
    <td>
        Sent in response to a new referral coupon being created.
    </td>
</tr>
<tr>
    <td class="docs-monospace">reward.created</td>
    <td>
        Sent whenever a new reward is created.
    </td>
</tr>
<tr>
    <td class="docs-monospace">email.referral.started</td>
    <td>
        Sent whenever a new referred user signs up for a new (trial) account.
    </td>
</tr>
<tr>
    <td class="docs-monospace">email.referral.paid</td>
    <td>
        Sent whenever a new referred user upgrades to a paid sucscription.
    </td>
</tr>
</tbody>
</table>


<hr />

### Manage Webhook Endpoints

These methods can be used to create and manage the endpoints that will receive webhook events.

 - [Create a webhook subscription](/api/methods#create_webhook)
 - [List webhook subscriptions](/api/methods#list_webhooks)
 - [Delete a webhook subscription](/api/methods#delete_webhook)

<hr/>


### Payloads

All webhook data conform to the same data format.

<table class="table table-hover">
<tr>
<th class="docs-monospace">id</th>
<td>
String - A unique identifier for this event
</td>
</tr>
<tr>
<th class="docs-monospace">type</th>
<td>
String - The type of event
</td>
</tr>
<tr>
<th class="docs-monospace">tenantAlias</th>
<td>
String - The tenant used to create this data
</td>
</tr>
<tr>
<th class="docs-monospace">live</th>
<td>
Boolean - True for live tenants and false for test tenants
</td>
</tr>
<tr>
<th class="docs-monospace">created</th>
<td>
Number - The timestamp when this event was created
</td>
</tr>
<tr>
<th class="docs-monospace">data</th>
<td>
An abitrary JSON object containing data related to this event
</td>
</tr>
</table>


**Payload Security** - Payload's can be verified by checking the request headers. The `X-Hook-Signature` header is set with a value based upon a HMAC-SHA1 (RFC 2104 compliant) hash 
computed from the hook's body contents. The signature used is the tenant's current API key. This can be used to verify the authenticity of hooks upon receipt. Careful! Although 
you can verify the hook''s authenticity via the signature, you still may need to verify the state of the 'data' by making an API call. Hook delivery order is not guaranteed. For
example, consider the scenario where an object is updated multiple times in quick succession. The related REST hooks may be delivered in a different order than the update events 
which generated them, so relying on their contents may lead you to build a different final state.

<table class="table table-hover">
<tr>
<th class="docs-monospace">X-Hook-Signature</th>
<td>A Sha1 hash of the hooks body contents signed by the tenant's API key</td>
</tr>
</table>


## Webhooks Event Types

After a webhook subscription is created, it will immediately start receiving webhooks payloads. Each payload has a noted 'type' field which can be used to differentiate between 
events. New event types may be added to the API, so avoid building logic that assumes it knows all event types.


###coupon.created

Sent in response to a new referral coupon being created.

```json
{
    "id": "31049u0194u2105",
    "type": "coupon.created",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,
    "data": {
        "code": "ABC123ABC",
        "discountPercentage": "10",
        "dateCreated": 1386180000,
        "ratePlanId": null
    }
}
```



### reward.created</h3>        

Sent whenever a new reward is created. Data is a single <a href="/api/methods#list_rewards">Reward Object</a> that is returned 
from the <a href="/api/methods#list_rewards">List Rewards REST API Endpoint</a>


```json
{
    "id": "31049u0194u2105",
    "type": "reward.created",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,
    "data": {
        "type": "PCT_DISCOUNT",
        "id": "54235160e4b05184a716a0b2",
        "dateGiven": 1411600736220,
        "dateExpires": 1443136736220,
        "dateCancelled": null,
        "accountId": "GUYRP0T2F6F3Y6PN",
        "userId": "54235132e4b059bbbadf4903",
        "cancellable": true,
        "rewardSource": "FRIEND_SIGNUP",
        "discountPercent": 10
    }
}
```


### email.referral.started

Sent whenever a new referred user signs up for a new (trial) account.

```json
{
    "id": "1337049u0194u2105",
    "type": "email.referral.started",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,
    "data": {
        "recipientUserId": "u1234",
        "recipientAccountId": "a1234",
        "subject": "Congratulations! Susy Example signed up for trial account.",
        "message": "&lt;p&gt;This is rendered HTML content.&lt;/p&gt;"
    }
}
```


### email.referral.paid

Sent whenever a new referred user upgrades to a paid sucscription.

```json
{
    "id": "1337049u0194u2105",
    "type": "email.referral.paid",
    "tenantAlias": "AAA111BBB222DDD333",
    "live": false,
    "created": 1337001337,   
    "data": {
        "recipientUserId": "u1234",
        "recipientAccountId": "a1234",
        "subject": "Congratulations! Susy Example signed up for a paid subscription.",
        "message": "&lt;p&gt;This is rendered HTML content.&lt;/p&gt;"
    }
}
```
