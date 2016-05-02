---
title: Open Endpoints [BETA]
highlights: The Open endpoints in the SaaSquatch REST API are authenticated with an API key or a user secret
slug: api/openendpoints
template: api.html
published: true
---

Normally, you authenticate to the Referral SaaSquatch API by providing one of your API keys in the request. When using an open endpoint, you have the choice of using an API key or a user secret. Some open endpoints do not require any authentication. A user secret is a string you provide when you create a user, we recommend generating a UUID for this purpose. Existing users can be given a secret for use with the open endpoints using the [create or update a user method](/api/methods#create_user).


Authentication to the API occurs either via <a href="http://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Auth</a> or by providing a user secret in a header. All API requests must be made over <a href="http://en.wikipedia.org/wiki/HTTP_Secure">HTTPS</a>. Calls made over plain HTTP will fail.

When you are using the open endpoints with an API key, provide your API key as the basic auth username. You do not need to provide a password.

```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/coupon \
-u TEST_B4BYA15POHYQ284HBND1:
```


curl uses the -u flag to pass basic auth credentials (adding a colon after your API key will prevent it from asking you for a password).

If you are using the open endpoints with a user secret, provide the secret in the `X-SaaSquatch-User-Secret` header.


```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/open/account/{ACCOUNT_ID}/user/{USER_ID} \
-H "X-SaaSquatch-User-Secret: usersecret"
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
