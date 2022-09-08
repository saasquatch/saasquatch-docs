---
title: Conversion Tech Guide
highlights: |
     Conversion is the process of converting in-progress referrals and unlocking rewards. It is the final of three steps in referral tracking,
     the first two being [identifying a user](/topics/identification) and [attributing the referral](/topics/attribution) back to the person who referred them.
     In this guide, we explain how to track conversions.
slug: developer/conversion
sectionType: guide
template: hasTableOfContents.html
date: '2019-11-18'
---

For a full explanation of the difference between identification, attribution and conversion, check out [The Basics Success Center Article](/intro) and the [Success Center Guide on Conversion](/topics/conversion)

### Squatch.js

Squatch.js support tracking conversion using the `account_status` field when a user is [identified to Squatch.js](/squatchjs/#init). The first time that `account_status`
is updated to `PAID` for a user it will trigger a conversion for any in-progress referrals that were previously [attributed](/topics/attribution), or if the user was not referred 
will stop them from being [attributed as a referral](/topics/attribution) in the future.


```js
_sqh.push(['init', {
   tenant_alias: 'test_bpinhag9yagag',
   account_id: 'abc',
   payment_provider_id: null,
   user_id: '5678',
   email: 'bob@example.com',
   first_name: 'John',
   // account_status: 'PAID' // Include the value "PAID" to trigger a conversion. Omit it if you're using a payment system connectors like Stripe and Recurly.
}]);
```

### REST API
 
Using the REST API, one can trigger a conversion based off the use of a `account.subscription.status` field. The main method for this is the 
[Update Account](/api/methods/#account_sync) method. The first time that `status`
is updated to `PAID` for a user it will trigger a conversion for any in-progress referrals that were previously [attributed](/topics/attribution), or if the user was not referred 
will stop them from being [attributed as a referral](/topics/attribution) in the future. Updating an account in this way will not complete the referral until
at least one user has been [identified](/topics/identification).

```curl
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/accountsync \
-u API_KEY: \
-H "Content-Type: application/json" \
-d '{
    "id": "abc123",
    "subscription": {
        "status": "PAID",
        "billingIntervalValue": 30,
        "billingIntervalType": "DAY",
        "value": 99.99
    }
}'
```

### Payment Systems (Stripe, Recurly, Braintree, Zuora)

If you've configured your Referral SaaSquatch account to be connected using one of the payment system connectors (like Stripe), then you should follow the integration guide for 
those payment systems. Payment system integrations typically rely on direct API integration to detect when an account has paid their first invoice to trigger a conversion.

<ul class="unstyled">
    <li><a href="/developer/braintree"><i class="fa fa-docs-chevron"></i>Braintree</a></li>
    <li><a href="/developer/recurly"><i class="fa fa-docs-chevron"></i>Recurly</a></li>
    <li><a href="/developer/stripe"><i class="fa fa-docs-chevron"></i>Stripe</a></li>
    <li><a href="/developer/zuora"><i class="fa fa-docs-chevron"></i>Zuora</a></li>
</ul>


<div class="bs-callout bs-callout-default">
  Conversions can be tracked using Squatch.js, the REST API or a payment system connector.
</div>
