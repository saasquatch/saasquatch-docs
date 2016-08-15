---
title: Segment Integration
highlights: The Segment integration with Referral SaaSquatch makes it easy to send your existing Segment data to Referral SaaSquatch.
slug: developer/segment
sectionType: jsReference
template: hasTableOfContents.html
---

### How do I use the Segment integration?

Segment customers can use the Segment [analytics.js](https://segment.com/docs/sources/website/analytics.js/) library instead of directly using the [Squatch.js](/squatchjs) Referral SaaSquatch javascript library.

Use the analytics.js [identify](https://segment.com/docs/methods/identify) method instead of [squatch.js init](/squatchjs#init) call to identify the currently logged in user and set up SaaSquatch.

Below is a comparison of a squatch.js init call vs the equivalent Segment analytics.js identify call.

<table class="table">
    <tr>
        <th>
            Squatch.js
        </th>
        <th>
            Segment / analytics.js
        </th>
    </tr>
    <tr>
        <td>
            Use <a href="/squatchjs#init">squatch.js init</a>
        </td>
        <td>
            Use <a href="https://segment.com/docs/methods/identify">analytics.js identify</a>
        </td>
    </tr>
    <tr>
        <td>
<pre><code class="lang-js">_sqh.push(["init", {
    tenant_alias: "test_aaaexampleaaa",
    user_id: "u1234",
    account_id: "a5678",
    email: "joe.tester@example.com",
    user_image: "http://example.com/avatar/205e460b479e2e",
    first_name: "Joe",
    last_name: "Tester",
    user_referral_code: "JOETESTER",
    mode: "EMBED",
    locale: "en_US",
    fb_share_image: "http://www.example.com/logo.png",
    checksum: "arbPDAcedO38Qw/qdJLCqd2tlRQ="
}]);</code></pre>
                </td>
                <td>
<pre><code class="lang-js">analytics.identify( "u1234", {
    accountId: "a5678",
    email: "joe.tester@example.com",
    avatar: "http://example.com/avatar/205e460b479e2e",
    firstName: "Joe",
    lastName: "Tester",
    userReferralCode: "JOETESTER",
    mode: "EMBED",
    locale: "en_US",
    referralImage: "http://www.example.com/logo.png",
    paymentProviderId: 'cus_8rVOAthroptvT6'
},{
    integrations: {
        SaaSquatch: {
            checksum: 'n3VtXg92TVOuzQ+6EMV8FvjY4em5NptCcesDYv+9tegs='
        }
    }
});</code></pre>
        </td>
    </tr>

</table>

* * *

### What features are supported with Segment?

Most of the features of the Referral SaaSquatch squatch.js library are released immediately for Segment. You can always use squatch.js directly to [open](/squatchjs#open) or [close](/squatchjs#close) the referral widget. However, there will always be some things that will require you to use squatch.js directly.  

**Note:** 
- To set `paymentProviderId` as `null` it must be set as `'null'`. E.g. `paymentProviderId: 'null',`.
- Some of the parameters are named differently in squatch.js vs analytics.js. For example, use `avatar` to add an image for a user instead of `user_image`.
* * *

### How do I use Signed Requests with Segment.io?

You can still use [Signed Requests](/squatchjs/signed-requests) with Segment, keeping in mind a few things:

*   Include `tenant_alias` in the checksum
*   Omit other analytics.js traits from the checksum, such as Google Analytics ids
*   Ordering is based upon [squatch.js init](/squatchjs#init) parameters names, not the analytics.js parameter names. For example, `avatar` should still be sorted with "u" for `user_image`.

* * *

### Can I used the REST API with Segment?

No, at this time the Segment integration with Referral SaaSuatch is only an abstractions of the squatch.js javascript library. 

* * *

### Where can I find more information?

Segment provides [support documents](https://segment.com/docs/integrations/saasquatch/) about their integration with Referral SaaSquatch. You can also check out the full source code for the integration on [Segment's Github](https://github.com/segment-integrations/analytics.js-integration-saasquatch).