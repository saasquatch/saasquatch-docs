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

<table class="table">
<thead>
<tr>
    <th >
        Error
    </th>
    <th>
        Detail
    </th>
</tr>
</thead>
<tbody>
<tr>
    <td class="docs-monospace">200</td>
    <td>OK - Everything worked as expected.</td>
</tr>
<tr>
    <td class="docs-monospace">400</td>
    <td>Bad Request - Often missing a required parameter.</td>
</tr>
<tr>
    <td class="docs-monospace">401</td>
    <td>Unauthorized - No valid API key provided.</td>
</tr>
<tr>
    <td class="docs-monospace">402</td>
    <td>Request Failed - Parameters were valid but request failed.</td>
</tr>
<tr>
    <td class="docs-monospace">403</td>
    <td>Forbidden - Returned by open endpoints if they are disabled.</td>
</tr>
<tr>
    <td class="docs-monospace">404</td>
    <td>Not Found - The requested item doesn't exist.</td>
</tr>
<tr>
    <td class="docs-monospace">500, 502, 503, 504</td>
    <td>Server errors - something went wrong on Referral SaaSquatch's end.</td>
</tr>
</tbody>
</table>

---
If you require further assistance with any error codes you are experiencing, please feel free to reach out to our [Success Team](mailto:success@referralsaasquatch.com) who will be more than happy to help.<p>
For quicker troubleshooting, include a copy of the call that was made and the full error message that was received.
