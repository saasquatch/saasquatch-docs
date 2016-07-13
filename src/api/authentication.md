---
title: API Authentication
highlights: The Referral SaaSquatch REST API is authenticated by providing one of your API keys in the request
slug: api/authentication
sectionType: apiReference
template: article.html
published: true
---

You authenticate to the Referral SaaSquatch API by providing one of your API keys in the request. You can manage your API keys from your <a href="https://app.referralsaasquatch.com">account</a>. You can have multiple API keys active at one time. Your API keys carry many privileges, so be sure to keep them secret!


Authentication to the API occurs via <a href="http://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Auth</a>. Provide your API key as the basic auth username. You do not need to provide a password.


All API requests must be made over <a href="http://en.wikipedia.org/wiki/HTTP_Secure">HTTPS</a>. Calls made over plain HTTP will fail. You must authenticate for all requests.


```
curl https://app.referralsaasquatch.com/api/v1/{TENANT_ALIAS}/coupon \
-u TEST_B4BYA15POHYQ284HBND1:
```


curl uses the -u flag to pass basic auth credentials (adding a colon after your API key will prevent it from asking you for a password).
