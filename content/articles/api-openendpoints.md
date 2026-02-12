---
title: API Open Endpoints
highlights: Open Endpoints are API Calls designed for simplified use of the SaaSquatch REST API functionality in client applications like the Mobile widget and SDK.
slug: api/openendpoints
sectionType: guide
template: hasTableOfContents.html
date: 2023-02-28
---

### Use Cases

The primary use case for the Open Endpoints is in **client-server** interactions such as through a mobile app. These actions typically involve looking up information about a referred user or who referred them.

Some examples include:
- [Lookup a referral code](/api/methods/#open_validate_code) after app install to display a dialog about who referred them
- [Register a new user](/api/methods/#open_create_user) in the referral program
- [Lookup share links](/api/methods/#open_get_user) to display a custom sharing dialog
- [Lookup referrals](/api/methods/#open_list_referrals) to display a list of referred friends

### Authentication Options
The Open Enpoints provide flexible authentication options: 
- *Authenticated* - For Open Endpoint calls that reqire authentication there are two options:
  - *JWT* - JWTs can be used for requests that require authentication. 
  - *API Key* - Your tenant's API key can also be used for requests that require authentication. 
- *Unauthenticated* - Some Open Endpoints do not require any form of authentication.

#### Authentication Requirements by Method

The following table summarizes the Open Endpoint methods that are available for use, and their required level of authentication:

<table style="white-space: nowrap" class="table">
<thead>
<tr>
    <th >
        Open Endpoint method
    </th>
    <th>
        Authentication required
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_create_user">Create a user</a></td>
    <td>
        Requires Write Token or API key
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_user_upsert">Upsert a user</a></td>
    <td>
        Requires Write Token or API key
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_get_user">Lookup a user</a></td>
    <td>
        Requires Read Token or API key
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_get_user_by_code">Lookup a user by referral code</a></td>
    <td>
        No authentication required.
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_validate_code">Lookup a referral code</a></td>
    <td>
        No authentication required.
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_apply_code">Apply a referral code</a></td>
    <td>
        Requires Write Token or API key.
    </td>
</tr>
<tr>
    <td class="docs-monospace"><a href="/api/methods#open_list_referrals">List referrals</a></td>
    <td>
        Requires Read Token or API key.
    </td>
</tr>
</tbody>
</table>

### Authentication with JWT
Authentication with JWTs should be used in **client-server**, not server-server communication.

The SaaSquatch API accepts two types of JWTs: *read tokens* and *write tokens*. Read tokens are intended to validate a request to lookup information about an existing user/account while write tokens are intended to be used when adding or updating information about a user/account. 

The format of the JWT payloads required for read and write tokens are outlined below:

<table class="table">
<tr>
    <th>
        Read Token Payload
    </th>
    <th>
        Write Token Payload
    </th>
</tr>
</thead>
<tbody>
<tr>
  <td>
  The payload of a read token is based on the <code>user id</code> and <code>account id</code>:
  <pre><code class="lang-json">{
  "user": {
      "id": "adfgafdg",
      "accountId": "adfklajdnrerereACdsedf"
    },
    "exp": 1462327764 //optional date in seconds since the epoch
}</code></pre>
  </td>
  <td>
    The payload of a write token can contain the complete user object:
  <pre><code class="lang-json">{
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
}</code></pre>
</td>
</tr>
</tbody>
</table>

#### Building the JWT
> The process for building the JWT is outlined on our [JSON Web Tokens page](/topics/json-web-tokens).

Make sure you that you are trying to sign the correct format of the payload (Read Token vs Write Token) for your specific Open Endpoint API call.

### Authentication with API Key
Authentication with your API key should be done when conducting **server-server** communication.

> Authenticating Open Endpoint calls with an API key is done in the same way as with our standard API calls, details for which can be found in [API Authentication](/api/authentication/).