---
title: Open Endpoints [BETA]
highlights: |
    The Open Endpoints in the SaaSquatch REST API are endpoints designed to work in client applications like the Mobile SDK and Javascript SDK.
    Authentication relies on a User JWT and some API endpoints are unauthenticated. Even though the Open Endpoints are designed for client applications,
    they can still be used in server-to-server cases using API Key authentication.
slug: api/openendpoints
sectionType: apiReference
template: hasTableOfContents.html
published: true
---

### Use Cases

The Open Endpoints are designed for client-server interactions like the Mobile SDK and Javascript SDK. Most of the use cases for the Open Endpoints are for looking up information about a User or who referred them.

Here are some examples:
 - Lookup a referral code after app install to display a dialog about who referred them
 - Register a new user in the referral program
 - Lookup up share links to display a custom sharing dialog
 - Lookup up referrals to display a list of referred friends

> #### Enable Open Endpoints
>
> Open Endpoints are disabled by default for security and functionality reasons. 
> Open Endpoints are a core component of our [Mobile SDK](/mobile/) and are provided as an optional addon to Pro and Enterprise plans. 
> If the Mobile SDK, and Open Endpoints, are features you would like to make use of, please contact our [sales team](mailto:sales@referralsaasquatch.com) to discuss adding them to your subsciption.


### Authentication Options

Normally, authentication for the Referral SaaSquatch API is done by including one of your API keys in the request. This makes sense in server-to-server communication, but is obviously not a secure option for client-to-server calls.
The Open Enpoints solve this problem and provide a more flexible authentication process. 

 - **User JWT** - Some Open Endpoint calls that require authentication allow [JSON Web Token](https://jwt.io/introduction/) (JWT) to authenticate an invididual User.
This both solves the client-serve authentication problem and also provides a flexible way to do single-sign on in your client applications.

 - **Unauthenticated** - Some Open Endpoints do not require authentication. These endpoints, such as the endpoint to lookup a referral code do not require any authentication and need neither an API key or JWT.


The following table summarizes the Open Endpoint methods that are available for use and their required authentication:

<table class="table">
<thead>
<tr>
    <th>
        Open Endpoint method
    </th>
    <th>
        Authentication required
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">[Create a user](/api/methods#open_create_user)</td>
    <td>
        Requires Write Token or API key.
    </td>
</tr>
<tr>
    <td class="docs-monospace">[Lookup a user](/api/methods#open_get_user)</td>
    <td>
        Requires Read Token or API key.
    </td>
</tr>
<tr>
    <td class="docs-monospace">[Lookup a user by referral code](/api/methods#open_get_user_by_code)</td>
    <td>
        No authentication required.
    </td>
</tr>
<tr>
    <td class="docs-monospace">[Lookup a referral code](/api/methods#open_validate_code)</td>
    <td>
        No authentication required.
    </td>
</tr>
<tr>
    <td class="docs-monospace">[Apply a referral code](/api/methods#open_apply_code)</td>
    <td>
        Requires Write Token or API key.
    </td>
</tr>
<tr>
    <td class="docs-monospace">[List referrals](/api/methods#open_list_referrals)</td>
    <td>
        Requires Read Token or API key.
    </td>
</tr>
</tbody>
</table>

### Authentication with JWT (JSON Web Tokens)

The Referral SaaSquatch API accepts two types of JWTs, read tokens and write tokens. The read tokens are used form calls that involve looking up data while write tokens are used when adding or editing information. Using the payload to seed the JWT generation, this Token is then included in the header of the call.

All tokens must be signed with HMAC 256.

#### User Read Token Payload

The payload of a read token is based on the user id and account id. This has changed from the original `"sub": "accountId_userId"` format, which would not have worked with all valid account ids.

```json
{
  "user": {
    "id": "adfgafdg",
    "accountId": "adfklajdnrerereACdsedf"
  },
  "exp": 1462327764 //optional date in seconds since the epoch
}
```

#### User Write Token Payload

The payload of a write token contains a complete user object.

```json
{
  "user": {
    "id": "adfgafdg",
    "accountId": "adfklajdnrerereACdsedf",
    "email": "bob@example.com",
    "firstName": "Bob",
    "lastName": "Testerson", //optional
    "locale": "en_US", //optional
    "referralCode": "BOBTESTERSON", //optional
    "imageUrl": "" //optional
  },
  "exp": 1462327764 //optional date in seconds since the epoch
}
```

#### Example Call with JWT
If you are using the open endpoints with a JWT, provide the token in the `X-SaaSquatch-User-Token` header.

cURL uses the `-H` flag to pass an extra header. You may specify any number of extra headers.

```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/open/account/{ACCOUNT_ID}/user/{USER_ID} \
-H "X-SaaSquatch-User-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwXzIzOTQ4MzQ5MzQifQ.8P42BrwqkZhchHJw_qYUNBc_iZb6TspPOkbtc5WvP_0"
```

### Authentication with API Key

Details about Authenticating Open Endpoint calls with an API key are the same as with our standard API calls, details for which can be found in [API Authentication](/api/authentication/).

---
