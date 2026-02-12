---
title: Recurly Integration Install Guide
highlights: "SaaSquatch's Recurly integration uses Recurly’s Push Notifications and Recurly's API to automatically track subscriptions and apply referral and loyalty rewards. This guide will walk you through how to set up this integration."
slug: developer/recurly
sectionType: guide
template: hasTableOfContents.html
date: 2023-02-21
---

## Set up Recurly

> **Test tenant vs. Live tenant** - Your SaaSquatch program provides both a [live and test tenant](/success/using-referral-saasquatch/#test-vs-live). Test tenants can be used in conjuction with a [Recurly Sandbox account](https://support.recurly.com/hc/en-us/articles/360027273912-What-is-the-difference-between-Sandbox-Development-and-Production-sites-) to test payments, subscriptions, and reward automation before deploying to your production environment.

### Add your Recurly API Key in the SaaSquatch Portal
We connect to the Recurly API using your Recurly API key. This allows us automatically apply discounts to participants' accounts.

1.  [Sign in to Recurly](https://app.recurly.com/login) and click on __Developer > API Credentials__.
2.  Copy the private API key.
3. Sign in to the SaaSquatch Admin Portal.
4. Choose your test tenant from the tenant selection dropdown list at the top left of the page.
5. Go to __Settings > Integrations__.
6. Expand the Recurly card and click __Enable Recurly__.
7. Paste the API key in the __Recurly API Key__ field.
8. Click __Save__.

Repeat this process for your live tenant when you are ready to go live.

### Choose which reward units to automate

The Recurly integration can automatically create credit line items in Recurly when rewards are created in SaaSquatch. By default, base currency units such as `USD`, `EUR` and `CAD` are fulfilled. If your programs are using multiple monetary units, such as cash vs. credit, then you can configure Recurly to only fulfill one of those units.

1. In the SaaSquatch Admin Portal, go to __Settings > Integrations__.
2. Expand the Recurly card. 
3. Select the __Custom__ from the Reward Units dropdown list.
4. Enter the `unitId` for an existing reward unit.
    - Tip: To find a reward unit's ID, go to __Rewards > Reward Units__. The unit ID appears below the reward unit's name. 
6. Click __Save__. 

After a reward unit is configured, any new rewards created in that unit will be automatically fulfilled.

 - Only rewards with `"type": "CREDIT"` and a configured unit are automatically fulfilled.
 - Rewards with `"unit": "CENTS"` are treated as `USD`.

### Set up Recurly to forward Webhooks to SaaSquatch
SaaSquatch uses Recurly Webhook Events as triggers for your program's reward and email automation. Recurly supports multiple Webhook Endpoints, which allows you to simultaneously receive webhooks in your other software while also sending them to SaaSquatch. Add SaaSquatch as a webhook endpoint by adding our URL into your Recurly portal.

1. Sign in to the SaaSquatch Admin Portal.
2. Choose your test tenant from the tenant selection dropdown list at the top left of the page.
3. Go to __Settings > Integrations__.
4. Expand the Recurly card.
5. Copy the webhooks URL (it should look like `https://recurly.integrations.saasquatch.com/recurly/{tenant_alias}/webhook`).
6.  [Sign in to Recurly](https://app.recurly.com/login) and go to __Developer > Webhooks > Configure__. 
7.  Click __New Endpoint__.
8.  Select a name for your SaaSquatch Webhook endpoint.
9.  Paste the URL you copied in step 3 into the field labeled __Endpoint URL__. 
10.  Click __Save Changes__.

Repeat this process for your live tenant when you are ready to publish your referral program. This will require that you switch your Recurly account to production mode. 

> **Be aware:** The conversion of your Recurly account from test to production is not reversible.

 - The Recurly integration will attempt to create participants that don't exist in SaaSquatch using the Recurly `<account_code>` as the participant's `id` and `accountId`. This field is the Account Code field when looking at a participant on the Recurly website.
 - Recurly webhooks can potentially be recorded multiple times. Recurly doesn't support sending IDs along with Webhooks, so there is a chance that it will be received and logged twice.

## Convert a referral
To successfully convert a referral that's been started, the following steps must be completed in order. 

__Before you begin__: 
- Your Recurly integration must be fully set up
- Your program rules are should be set to trigger based on one of the supported webhooks types
- The reward unit used in your programs should configured for automatic fulfillment

1. Make sure that the Referrer has been:
    - Registered in Recurly with a valid credit card and plan selected
    - Created as a user in SaaSquatch, with the Recurly `<account_code>` as their SaaSquatch `id` and `accountId`. 
2. Make sure that the referred user has been:
    - Created as a user in SaaSquatch
    - Attributed as a referral of the Referrer
3. Create an account for the referred user in Recurly, using Recurly's `<account_code>` as their SaaSquatch `id` and `accountId`. 
4. Create a subscription in Recurly for the referred user. 

**Result:** Referral converted, rewards fulfilled in Recurly, rewards redeemed in SaaSquatch.<br>

### Key Considerations
- The conversion process may take time to propagate from Recurly to SaaSquatch depending on the load on Recurly's system and the frequency of them sending out updates.
- Event tracking and reward fulfilment rely on Recurly `<account_code>` matching a participant's `id` and `accountId`.
- The rewards are applied as a line item on a pending or existing invoice. This is due to Recurly’s limitations on how account credits can be applied to customers. Recurly only allows account credits to be applied as line items, and line items can only be applied to invoices. In this way Recurly has designed invoices to only be used with subscriptions.

## Compatible Rewards

Looking to run a referral program with Recurly as your payment provider and an arbitrary reward type like points or swag? The Recurly integration only supports monetary reward fulfillment in a specified currency.

### More Information

 **Recurly API Keys** - SaaSquatch connects to Recurly through their REST API, using an API key from your Recurly account. This lets SaaSquatch automatically apply discounts to user's accounts, making the integration extremely powerful, as well as easy and fast to connect. 

>You can learn more about creating and managing Recurly API keys in their [documentation](https://docs.recurly.com/docs/api-keys).

## Supported Webhooks

Recurly webhooks are sent as XML, but they are processed and stored in SaaSquatch as User Events as JSON.

For example, a Recurly `closed_invoice_notification` notification;

```
 <?xml version="1.0" encoding="UTF-8"?>
 <closed_invoice_notification>
   <account>
      <account_code>1</account_code>
      <username nil="true" />
      <email>verena@example.com</email>
      <first_name>Verana</first_name>
      <last_name>Example</last_name>
      <company_name nil="true" />
  </account>
  <invoice>
      <uuid>ffc64d71d4b5404e93f13aac9c63b007</uuid>
      <subscription_id nil="true" />
      <state>collected</state>
      <invoice_number_prefix />
      <invoice_number type="integer">1000</invoice_number>
      <po_number />
      <vat_number />
      <total_in_cents type="integer">1100</total_in_cents>
      <currency>USD</currency>
      <date type="datetime">2014-01-01T20:20:29Z</date>
      <closed_at type="datetime">2014-01-01T20:24:02Z</closed_at>
      <net_terms type="integer">0</net_terms>
      <collection_method>manual</collection_method>
  </invoice>
</closed_invoice_notification>
```

Then Recurly integration will track it as a user event in JSON format with value:

```
{
  "account": {
    "account_code": "1",
    "username": null,
    "email": "verena@example.com",
    "first_name": "Verana",
    "last_name": "Example",
    "company_name": null
  },
  "invoice": {
    "uuid": "ffc64d71d4b5404e93f13aac9c63b007",
    "subscription_id": null,
    "state": "collected",
    "invoice_number_prefix": "",
    "invoice_number": 1000,
    "po_number": "",
    "vat_number": "",
    "total_in_cents": 1100,
    "currency": "USD",
    "date": 1388607629000,
    "closed_at": 1388607842000,
    "net_terms": 0,
    "collection_method": "manual"
  }
}
```

The Recurly integration will only forward payment and invoice webhooks to SaaSquatch. These are tracked as events on the users, and can be looked up in the SaaSquatch admin portal and via the GraphQL API.

| Recurly Webhook Type                      | Processed   |
| ------------------------------------------|---|
| `new_credit_invoice_notification`         |   |
| `processing_credit_invoice_notification`  |   |
| `closed_credit_invoice_notification`      |   |
| `voided_credit_invoice_notification`      |   |
| `reopened_credit_invoice_notification`    |   |
| `updated_credit_invoice_notification`     |   |
| `scheduled_payment_notification`          |   |
| `processing_payment_notification`         |   |
| `successful_payment_notification`         |   |
| `failed_payment_notification`             |   |
| `void_payment_notification`               |   |
| `new_credit_payment_notification`         |   |
| `successful_refund_notification`          | ignored |
| `new_account_notification`                | ignored |
| `updated_account_notification`            | ignored |
| `canceled_account_notification`           | ignored |
| `billing_info_updated_notification`       | ignored |
| `billing_info_update_failed_notification` | ignored |
| `new_shipping_address_notification`       | ignored |
| `updated_shipping_address_notification`   | ignored |
| `deleted_shipping_address_notification`   | ignored |
| `new_item_notification`                   | ignored |
| `updated_item_notification`               | ignored |
| `deactivated_item_notification`           | ignored |
| `reactivated_item_notification`           | ignored |
