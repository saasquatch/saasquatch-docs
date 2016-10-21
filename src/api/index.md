---
title: Referral SaaSquatch REST API
highlights: Our REST API lets you build your own custom logic on top of your referral program. The [API reference](/api/methods) includes details about using all the methods of the Referral SaaSquatch REST API.
slug: api
sectionType: apiReference
template: article.html
hero: true
---


### About the REST API

The Referral SaaSquatch REST API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API is designed to have predictable, resource-oriented URLs and to use HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which can be understood by off-the-shelf HTTP clients. [JSON](http://www.json.org/) will be returned in all responses from the API, including errors.

### REST API Benefits

The Referral SaaSquatch REST API provides a powerful, highly flexible, and highly customizable way of connecting your application with Referral SaaSquatch. 

With the Referral SaaSquatch API you can tailor your referral program to fit the specifics of your product and business model. 

### Using the Referral SaaSquatch REST API

Each API method in the reference includes a full list of the available arguements (both required and optional), and exmaple cURL request, details of the structure of the response, and a complete example of the JSON response.

<table class="table">
    <tbody>
    <tr>
        <td>**API Endpoint**</td>
        <td class="docs-monospace">https://app.referralsaasquatch.com/api/v1/</td>
    </tr>
    </tbody>
</table>

A full list of available API methods can be found in the Referral SaaSquatch [REST API Reference](/api/methods) document. 

The following examples are just some of what is possible through our REST API:

- [Create](/api/methods/#account_sync), [update](/api/methods/#account_sync), and [lookup](/api/methods/#get_account) Accounts
- [Create](/api/methods/#create_user), [update](/api/methods/#create_user), and [lookup](/api/methods/#get_user) Users
- [Attribute](/api/methods/#account_sync), [lookup](/api/methods/#get_referral), [list](/api/methods/#list_referrals), and [moderate](/api/methods/#moderate_referrals) referrals
- [Create](/api/methods/#create_reward), [List balance](/api/methods/#list_balances), and [redeem](/api/methods/#debit_balance) rewards

<div class="well ">**Note:** Please be aware that the Referral SaaSquatch API is not currenlty supported when making use of one of our direct payment provider integrations. However, it is still possible to connect up your referral program to your payment provider through your existing business flow with the use of our API. Please check out one of our many guides to get stated setting up your referral program.
</div>
