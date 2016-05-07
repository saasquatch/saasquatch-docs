---
title: Open Endpoints [BETA]
highlights: The Open endpoints in the SaaSquatch REST API are authenticated with an API key or a user secret
slug: api/openendpoints
template: api.html
published: true
---

Normally, you authenticate to the Referral SaaSquatch API by providing one of your API keys in the request. When using an open endpoint, you have the choice of using an API key or a <a href="https://jwt.io/introduction/">JSON Web Token</a> (JWT). Some open endpoints do not require any authentication.


Authentication to the API occurs either via <a href="http://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Auth</a> or by providing a JWT in a header. All API requests must be made over <a href="http://en.wikipedia.org/wiki/HTTP_Secure">HTTPS</a>. Calls made over plain HTTP will fail.

The Referral SaaSquatch API accepts two types of JWTs, read tokens and write tokens. Read tokens contain only the user id and account id, write tokens contain the full user object to ensure that users are only created with trusted information.

### Read Token

The payload of a read token is

```
{
  "sub": "accountId_userId",
  "exp": 1462327764000 // optional  
}
```

Both the account id and user id are necessary to uniquely identify a user, so we concatenate them together with an underscore to create a single value that meets the JWT <a href="https://www.iana.org/assignments/jwt/jwt.xhtml">specification</a>.

### Write Token

The payload of a write token contains a user object in addition to the `sub` field.

```
{
  "sub": "accountId_userId",
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
  "exp": 1462327764000 // optional
}
```

All tokens must be signed with HMAC 256.

When you are using the open endpoints with an API key, provide your API key as the basic auth username. You do not need to provide a password.

```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/coupon \
-u TEST_B4BYA15POHYQ284HBND1:
```


curl uses the -u flag to pass basic auth credentials (adding a colon after your API key will prevent it from asking you for a password).

If you are using the open endpoints with a JWT, provide the token in the `X-SaaSquatch-User-Token` header.


```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/open/account/{ACCOUNT_ID}/user/{USER_ID} \
-H "X-SaaSquatch-User-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwXzIzOTQ4MzQ5MzQifQ.8P42BrwqkZhchHJw_qYUNBc_iZb6TspPOkbtc5WvP_0"
```

curl uses the -H flag to pass an extra header. You may specify any number of extra headers.

### Open Endpoints

These methods can be used safely from a mobile or javascript only client without a tenant api key.

 - [Create a user](/api/methods#open_create_user)
 - [Lookup a user](/api/methods#open_get_user)
 - [Lookup a user by referral code](/api/methods#open_get_user_by_code)
 - [Lookup a referral code](/api/methods#open_validate_code)
 - [Apply a referral code](/api/methods#open_apply_code)
 - [List referrals](/api/methods#open_list_referrals)

<hr/>
