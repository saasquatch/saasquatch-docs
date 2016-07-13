---
title: API Errors
highlights: |
    Referral SaaSquatch uses conventional HTTP response codes to indicate success or failure of an API request. In general, codes in the 2xx range indicate
    success, codes in the 4xx range indicate an error that resulted from the provided information (e.g. a required parameter was missing, a
    coupon code doesn't exist, etc.), and codes in the 5xx range indicate an error with Referral SaaSquatch's servers.
slug: api/errors
sectionType: apiReference
template: article.html
---


### HTTP Status Code Summary

<ul class="unstyled docs-monospace">
    <li><strong>200</strong> OK - Everything worked as expected.</li>
    <li><strong>400</strong> Bad Request - Often missing a required parameter.</li>
    <li><strong>401</strong> Unauthorized - No valid API key provided.</li>
    <li><strong>402</strong> Request Failed - Parameters were valid but request failed.</li>
    <li><strong>403</strong> Forbidden - Returned by open endpoints if they are disabled.</li>
    <li><strong>404</strong> Not Found - The requested item doesn't exist.</li>
    <li><strong>500, 502, 503, 504</strong> Server errors - something went wrong on Referral SaaSquatch's end.</li>
</ul>
