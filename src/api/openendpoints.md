---
title: Open Endpoints [BETA]
highlights: The Open endpoints in the SaaSquatch REST API are authenticated with a JWT or API key
slug: api/openendpoints
sectionType: apiReference
template: article.html
published: true
---

Normally, authentication when using the Referral SaaSquatch API is accomplished by including one of your API keys in the request. Open Enpoints provide a more flexible authentication process. Open Endpoint calls that require authentication offer the choice of using an API key or a <a href="https://jwt.io/introduction/">JSON Web Token</a> (JWT). Some Open Endpoints do not require any authentication and thus need neither an API key or JWT.

### Enable Open Endpoints

Open Endpoints are disabled by default for security and functionality reasons. Open Endpoints are a core component of our [Mobile SDK](/mobile/) and are provided as an optional addon to Pro and Enterprise plans. If the Mobile SDK, and Open Endpoints, are features you would like to make use of, please contact our <a href="mailto:sales@referralsaasquatch.com">sales team</a> to discuss adding them to your subsciption.

### Open Endpoint Methods

The following Open Endpoint methods are available for use:

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

### Authentication with JSON Web Tokens

The Referral SaaSquatch API accepts two types of JWTs, read tokens and write tokens. The read tokens are used form calls that involve looking up data while write tokens are used when adding or editing information. Using the payload to seed the JWT generation, this Token is then included in the header of the call.

All tokens must be signed with HMAC 256.

#### Read Token Payload

The payload of a read token is based on the user id and account id. This has changed from the original `"sub": "accountId_userId"` format, which would not have worked with all valid account ids.

```
{
  "user": {
    "id": "adfgafdg",
    "accountId": "adfklajdnrerereACdsedf"
  }
  "exp": 1462327764 //optional date in seconds since the epoch
}
```

#### Write Token Payload

The payload of a write token contains a complete user object.

```
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

cURL uses the -H flag to pass an extra header. You may specify any number of extra headers.

```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/open/account/{ACCOUNT_ID}/user/{USER_ID} \
-H "X-SaaSquatch-User-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwXzIzOTQ4MzQ5MzQifQ.8P42BrwqkZhchHJw_qYUNBc_iZb6TspPOkbtc5WvP_0"
```

### Authentication with API Key

Details about Authenticating Open Endpoint calls with an API key are the same as with our standard API calls, details for which can be found in [API Authentication](/api/authentication/).

---
