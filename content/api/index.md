---
title: SaaSquatch REST API
highlights: Our REST API lets you build your own custom logic on top of your referral program. The [API reference](/api/methods) includes details about using all the methods of the SaaSquatch REST API.
slug: api
sectionType: apiReference
template: article.html
hero: true
date: "2019-11-18"
---

### About the REST API

The SaaSquatch REST API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API is designed to have predictable, resource-oriented URLs and to use HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which can be understood by off-the-shelf HTTP clients. [JSON](http://www.json.org/) will be returned in all responses from the API, including errors.

### REST API Benefits

The SaaSquatch REST API provides a powerful, highly flexible, and highly customizable way of connecting your application with SaaSquatch.

With the SaaSquatch API you can tailor your referral program to fit the specifics of your product and business model.

### Using the SaaSquatch REST API

Each API method in the reference includes a full list of the available arguments (both required and optional), and exmaple cURL request, details of the structure of the response, and a complete example of the JSON response.

<table class="table">
    <tbody>
    <tr>
        <td> <strong>API Endpoint</strong> </td>
        <td class="docs-monospace"><a href="https://app.referralsaasquatch.com/api/v1/">https://app.referralsaasquatch.com/api/v1/</a></td>
    </tr>
    </tbody>
</table>

A full list of available API methods can be found in the SaaSquatch [REST API Reference](/api/methods) document.

The following examples are just some of what is possible through our REST API:

<ul>
    <classic-only>
        <li>
            <a href="/api/methods/#get_account">Lookup</a> Accounts
        </li>
    </classic-only>
    <li>
        <a href="/api/methods#open_create_user">Create</a>, 
        <a href="/api/methods#open_user_upsert">update</a>, and 
        <a href="/api/methods#open_get_user">lookup</a> Users
    </li>
    <li>
        <a href="/api/methods#open_apply_code">Attribute</a>, 
        <a href="/api/methods/#get_referral">lookup</a>, <new-programs-only>and</new-programs-only>
        <a href="/api/methods/#list_referrals">list</a><classic-only>, and <a href="/api/methods/#moderate_referrals">moderate</a></classic-only>
        referrals
    </li>
    <li>
        <a href="/api/methods/#create_reward">Create</a>, 
        <a href="/api/methods/#list_balances">List balance</a>, and 
        <a href="/api/methods/#debit_balance">redeem</a>
        rewards
    </li>
</ul>

<div class="well ">

**Note:** Please be aware that the SaaSquatch API is not currently supported when making use of one of our direct payment provider integrations. However, it is still possible to connect up your referral program to your payment provider through your existing business flow with the use of our API. Please check out one of our many guides to get stated setting up your referral program.

</div>
