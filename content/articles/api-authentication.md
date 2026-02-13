---
title: API Keys 
highlights: The SaaSquatch APIs authenticate requests using API Keys to ensure secure data transmission. 
slug: api/authentication
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-09
seoDescription: API keys are used to authenticate the requests of your Loyalty and Referral programs. Learn how to access your API keys here...
robotsTag:
  - FOLLOW
---

All interactions with the SaaSquatch API use an API key for authentication. 

### Access API key
Access the API key of either your [Live and Test tenant](/success/navigating-the-portal/#install). 

1. Sign in to the SaaSquatch Admin Portal.
2. Choose your live or test tenant from the tenant selection dropdown.
3. Go to __Settings > General__.
4. In the __Tenant details__ section, click the eye icon to reveal the API key.
5. Click "Reveal" to display the API key.

> **Note:** Authentication to the API occurs via <a href="http://en.wikipedia.org/wiki/Basic_access_authentication">HTTP Basic Auth</a>. Provide your API key as the basic auth password. You do not need to provide a username.

***Do not expose any API keys to unauthorized users, such as through code of a client-side page.*** 

### Reset API Key
If an API key has been compromised, It can be reset to ensure secure exchanges of data.

1. Sign in to the SaaSquatch Admin Portal.
2. Choose your live or test tenant from the tenant selection dropdown.
3. Go to __Settings > General__.
4. In the __Tenant details__ section, click __Reset__ below the API key heading.
5. Click __Reset__ on the confirmation message. Click "Reset" under the API Key section. 

A new API key is now available for the Tenant. 

All API requests are made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). Unsecured requests will fail. 

#### Example:

<pre><code class="lang-http">curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/code/{code} \
<span class="nocode"><strong>-u :TEST_B4BYA15POHYQ284HBND1 \</strong></span></code></pre>

curl uses the `-u` flag to pass basic auth credentials.
