---
title: Segment Integration Reference
highlights: The Segment.com integration with SaaSquatch makes it easy to send your existing Segment data to SaaSquatch. For further information about our complete integration, review our full [Segment.io Guide](/segment).
slug: developer/segment
sectionType: guide
template: hasTableOfContents.html
date: 2023-02-28
---

<table class="table">
<thead>
<tr>
<th></th>
<th>Source / Stream</th>
<th>Destination / Subscription</th>
</tr>
</thead>
<tbody>
<tr>
<th>Segment Integration Documentation</th>
<td>
<ul>
  <li><a href="/integrations/segment-v2/stream">Tech Reference</a></li>
</ul>
</td>
<td>
<ul>
<li><a href="/integrations/segment-v2/subscription/">Tech Reference</a></li>
</ul>
</td>
</tr>
</tbody>
</table>

This reference outlines the functionality of the Segment Integration that allows you to send data from Segment to your SaaSquatch program. It includes details about the structure of the method, available parameters, limitations, and examples.

### How do I use the Segment integration?

Segment customers can use the Segment [analytics.js](https://segment.com/docs/sources/website/analytics.js/) library instead of directly using the [squatch.js](/developer/squatchjs) SaaSquatch javascript library.

Use the analytics.js [identify](https://segment.com/docs/methods/identify) method instead of [squatch.js `userUpsert`](/developer/squatchjs/v2/reference/#upsertuser) call to [identify](/success/core-topics/#Identification), [attribute](/success/core-topics/#Attribution), and [convert](/success/core-topics/#Conversion) users in your SaaSquatch program.

### What features are supported with Segment?

Most of the features of the SaaSquatch [squatch.js](/developer/squatchjs) library are available through this Segment Integration. However, there will always be some things that will require you to use [squatch.js](/developer/squatchjs) directly.

##### Signed Requests

The Segment Integration supports [Signed Requests](/developer/squatchjs/signed-requests) using checksums.

Please be aware of the following differences:

The structure and contents of the checksum being generated is based on that of the equivalent squatch.js call.

- Ordering of parameters when generating the checksum is based upon [squatch.js `userUpsert`](/developer/squatchjs/v2/reference/#upsertuser) parameters names, not the analytics.js parameter names. For example, `avatar` should still be sorted with "u" for `user_image`.
- Omit other analytics.js traits from the checksum, such as Google Analytics IDs.

##### SaaSquatch REST API

At this time the Segment integration with SaaSquatch is only an abstraction of the squatch.js javascript library.

### Identify Method Reference

The Segment analytics.js library identify method is used to connect with your SaaSquatch.

#### Structure

The Segment analytics.identify method is structured differently than the SaaSquatch squatch.js `userUpsert` call.

Unlike the squatch.js `userUpsert` call, in the analytics.identify method the `userId` and the `tenantAlias` are not listed among the regular parameters.

<table class="table table-hover">
    <tr>
        <th>tenantAlias</th>
        <td><span class="label">Required</span></td>
        <td>
            Identifies which program tenant to connect to. Your program has <a href="/success/navigating-the-portal/#install">two tenant aliases</a> -- one for Test mode and one for Live mode. Test mode alias are prefixed with <code>test_</code>, for example <code>test_abhoihnqwet</code> <br><br>The <code>tenantAlias</code> is set in the SaaSquatch Integration settings in the Segment portal.
        </td>
    </tr>
    <tr>
        <th>userId</th>
        <td><span class="label">Required</span></td>
        <td>A user ID from your system (must be unique for every user). We use this to uniquely track users, and lets us handle accounts that are shared between users.<br><br>The <code>userId</code> is used as the analitics.identify <code>userId</code> rather than a <code>trait</code> like the other parameters.</td>
    </tr>
</table>

##### Example

The following example highlights the structure of the analytics.identify method with no parameters:

```javascript
analytics.identify(
  "userId",
  {
    /*
    PARAMETERS GO HERE
    */
  },
  {
    integrations: {
      SaaSquatch: {
        checksum: null,
      },
    },
  },
);
```

#### Parameters

<table class="table table-hover">
    <tr>
        <th>accountId</th>
        <td><span class="label">Required</span></td>
        <td>
            We use <code>accountId</code> to link a group of users together. See <a href="/shared-vs-solo-accounts">Shared vs Solo Accounts</a> to see what you should use here.
        </td>
    </tr>
    <tr>
        <th>firstName</th>
        <td><span class="label">Required</span></td>
        <td>The user's first name</td>
    </tr>
    <tr>
        <th>lastName</th>
        <td><span class="label">Optional</span></td>
        <td>The user's last name</td>
    </tr>
    <tr>
        <th>email</th>
        <td><span class="label">Optional</span></td>
        <td>The e-mail address of the user. We use this to contact the user when someone they referred signs up or pays.</td>
    </tr>
    <tr>
        <th>avatar</th>
        <td><span class="label">Optional</span></td>
        <td>Defaults to <a href="http://gravatar.com/">Gravatar</a> or, if unavailable, the user's initials. If you provide a absolute profile image URL the minimum image size is 80px x 80px. Requires <a href="/developer/squatchjs/signed-requests">Signed Requests</a>.</td>
    </tr>
    <tr>
        <th>paymentProviderId</th>
        <td><span class="label">Required</span><br></td>
        <td>
            Unless explicitly setting this field it should be left as <code>'null'</code>. On payment provider programs this can be set to the Stripe Customer ID, Recurly Account ID, Braintree Account ID, or the Zuora Account ID.
        </td>
    </tr>
    <tr>
        <th>accountStatus</th>
        <td><span class="label">Optional</span><br></td>
        <td>
        <p>
            The status of the account identified by <code>accountId</code>.
        </p>
        <ul>
            <li>
                Omit this parameter on Payment Provider Integration programs.
            </li>
            <li>
                The default value is <code>TRIAL</code>.
            </li>
            <li>
                Possible values are <code>TRIAL</code>, <code>FREE</code>, <code>FREE</code>, or <code>CANCELLED</code>
            </li>
            <li>
                Can also be <a href="/api/methods#account_sync">updated using the REST API</a> or <a href="/squatchjs/">Squatch.js</a>.
            </li>
        </ul>
    </td>
    </tr>
    <tr>
        <th>referralCode</th>
        <td><span class="label">Optional</span></td>
        <td>
            <p>
            The referral code of the person that referred this <code>accountId</code> (i.e. if Bob referred you, this value would be BOB)
            </p>
            <ul>
            <li>
            Do not include when <code>paymentProviderId</code> exists.
            </li>
            <li>
            Automatically filled in the background by Analytics.identify method from browser cookie. (Note: This only works with 3rd party cookies)
            </li>
            <li>
            If someone uses a referral code during checkout, set that value here.
            </li>
            <li>
            Can also be <a href="/api/methods#account_sync">set using the REST API</a> or <a href="/developer/squatchjs/">Squatch.js</a>.
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>userReferralCode</th>
        <td><span class="label">Optional</span></td>
        <td>
            The referral code to be shared by this <code>userId</code>.
            <ul>
            <li>
            Used to set a custom referral code for this <code>userId</code>.
            </li>
            <li>
            Defaults to the first 15 alphanumeric characters of the user's first and last names.
            </li>
            <li>
            Limited to 15 characters. Restricted to ASCII character codes 48-57, 65-90, and 97-122.
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>locale</th>
        <td><span class="label">Optional</span></td>
        <td>The user's locale, used for <a href="/themes/internationalization">Internationalization</a>. The locale must be of the format <code>language_COUNTRY</code> where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.
            Examples: <code>en_US</code> or <code>zh_CN</code> </td>
    </tr>
    <tr>
	<th>mode</th>
	<td><span class="label">Optional</span></td>
	<td>
      <p>Sets the mode in which the widget is displayed. Valid options are <code>POPUP</code> (default), <code>EMBED</code> and <code>NOCONTENT</code>. Not signed in the checksum.</p>
        <ul>
            <li>
                <b>Popup mode</b> (<code>POPUP</code>) requires an element with <code>class="squatchpop"</code> applied to trigger the popup to show
            </li>
            <li>
                <b>Embed mode</b> (<code>EMBED</code>) requires a div with <code>id="squatchembed"</code> to control where the widget is embedded
            </li>
            <li>
                <b>No content mode</b> (<code>NOCONTENT</code>) allows user tracking and does not load any widget
            </li>
        </ul>
    </td>
    </tr>
    <tr>
            <th>checksum</th>
            <td><span class="label">Optional</span></td>
            <td>A HMAC-SHA2 checksum that is used to validate that data originated from your servers. For details, see the <a href="/developer/squatchjs/signed-requests">Signed Requests documentation</a>.</td>
          </tr>
</table>

#### Example

Below is a comparison of a squatch.js init call vs the equivalent Segment analytics.js identify call.

<table class="table">
    <tr>
        <th>
            Referral SaaSquatch - squatch.js
        </th>
        <th>
            Segment - analytics.js
        </th>
    </tr>
    <tr>
        <td>
            Use <a href="/developer/squatchjs/v2/reference/#init">squatch.js init</a>
        </td>
        <td>
            Use <a href="https://segment.com/docs/methods/identify">analytics.js identify</a>
        </td>
    </tr>
    <tr>
        <td>
<pre><code class="lang-js">squatch.init({
    tenantAlias: 'test_abzxg88g30tn2'
  });

var initObj = {

    user: {
      id: 'u1234',
      accountId: 'a5678',
      email: 'joe.tester@example.com',
      firstName: 'Joe',
      lastName: 'Tester',
      referralCode: 'JOETESTER',
      paymentProviderId: 'cus_8rVOAthroptvT6',
      locale: 'en_US'
    },
    engagementMedium: 'EMBED',
    widgetType: 'REFERRER_WIDGET'

};

squatch.api().upsertUser(initObj).then(function(response) {
user = response.user;
}).catch(function(error){
console.log(error);
})
});</code></pre>

  </td>
<td>
<pre><code class="lang-js">analytics.identify( "u1234", {
    accountId: "a5678",
    email: "joe.tester@example.com",
    firstName: "Joe",
    lastName: "Tester",
    userReferralCode: "JOETESTER",
    mode: "EMBED",
    locale: "en_US",
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

### Additional Resources

Segment provides [support documents](https://segment.com/docs/connections/destinations/catalog/saasquatch-v2/) about their integration with SaaSquatch.

You can also check out the full source code for the integration on [Segment's Github](https://github.com/segment-integrations/analytics.js-integration-saasquatch).

You can also checkout our full [Segment Guide](/segment).

Details about squatch.js can be found in our [squatch.js Quickstart](/developer/squatchjs/v2) as well as in the [squatch.js reference](/developer/squatchjs/).
