---
title: Segment Web Plugin Quickstart
highlights: Walk-through for the SaaSquatch Segment.io integration for sending data from Segment.io to SaaSquatch. Further information about our Segment.io integration can be found in our full [Segment.io Guide](/segment)
slug: developer/segment/quickstart
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-23
robotsTag:
  - noindex
---

<table class="table">
<thead>
<tr>
<th></th>
<th>Source / Stream</th>
<th>Destination / Subscription</th>
<th>Web Plugin</th>
</tr>
</thead>
<tbody>
<tr>
<th>Segment Integration Documentation</th>
<td>
<ul>
  <li><a href="/integrations/segment-v2/stream/">Tech Reference</a></li>
</ul>
</td>
<td>
<ul>
<li><a href="/integrations/segment-v2/subscription">Tech Reference</a></li>
</ul>
</td>
  <td><ul>
<li>*Quickstart*</li>
<li><a href="/developer/segment/">Tech Reference</a></li>
</ul></td>
</tr>
</tbody>
</table>

### Using the Segment Integration

This quickstart guide will walk you through setting up a referral program by making use the SaaSquatch integration with Segment.io.

The Segment integration with SaaSquatch allows you to replace the functionality of the SaaSquatch [squatch.js](/squatchjs) library with that of the Segment [Analytics Library's Identify](https://segment.com/docs/sources/website/analytics.js/#identify) method. This quickstart guide includes code examples for common use-cases for the segment integration.

The use of Segment in your referral program can be extended beyond what is covered in this Quickstart Guide by simply substituting the SaaSquatch squatch.js library for the Segment Analytics Library's Identify method where applicable. Our [Guides portal](/guides) also contains examples for a range of business models and reward types.

> Further details can be found in our [Segment Integration Reference](/developer/segment).

### Configuring Segment

#### Select the Workspace and Source

1. Select the Segment Workspace that you would like to add the SaaSquatch integration to:

![Segment Workspace Select - Highlighted](/assets/images/contentful/Screen_Shot_2019-10-03_at_1.25.10_PM_4Wqupe63jWI60LmM5OFq2p.png) 2. Select the source that you would like add the SaaSquatch integration to:

![Segment Source Select - Highlighted](/assets/images/contentful/Screen_Shot_2019-10-03_at_1.25.32_PM_2AnGbwCGgg4CahlxMOc5ee.png)

#### Enable SaaSquatch Integration

Search for "SaaSquatch", select the item, and click the green "Enable Integration" button:

![Segment SaaSquatch Select - Highlighted](/assets/images/contentful/Screen_Shot_2019-10-03_at_1.23.03_PM_aVrzJjPiKE2qCGySIx97n.png)

#### Configure Tenant

Go the settings page for the integration and insert the [tenant alias](/success/navigating-the-portal/#install) you would like to use.

> **Note:** If using your Test tenant, make sure to change this value to your Live tenant alias when you have completed testing and your product goes live.

![Segment SaaSquatch Settings - Highlighted](/assets/images/contentful/Screen_Shot_2019-10-03_at_1.30.40_PM_5c3VHTtonNZgUVgUuFEquR.png)

#### Segment Code in Page

Please refer to Segment's [setup guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) for how to integrate their [Analytics.js](https://segment.com/docs/sources/website/analytics.js/) Library into your product.

[Step 2](https://segment.com/docs/sources/website/analytics.js/quickstart/#step-2-identify-users) of that setup guide includes details about using the analytics.identify method. The following is a basic example of using analytics.js:

<pre><code class="lang-js">
&lt;script type = "text/javascript"&gt;
  ! function() {
    var analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize)
      if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "page", "once", "off", "on"];
        analytics.factory = function(t) {
          return function() {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(t);
            analytics.push(e);
            return analytics
          }
        };
        for (var t = 0; t &lt; analytics.methods.length; t++) {
          var e = analytics.methods[t];
          analytics[e] = analytics.factory(e)
        }
        analytics.load = function(t) {
          var e = document.createElement("script");
          e.type = "text/javascript";
          e.async = !0;
          e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(e, n)
        };
        analytics.SNIPPET_VERSION = "3.1.0";
        analytics.load("<strong><font color="red">YOUR_WRITE_KEY</font></strong>");
        analytics.page()

        <strong><font color="red">analytics.identify('f4ca124298', {
          name: 'Michael Bolton',
          email: 'mbolton@initech.com'
        });</font></strong>

      }
  }(); &lt;/script&gt;</code></pre>

The subsequent parts of this Quickstart Guide assume the main segment code has been correctly configured in your page. The examples below will only cover the changes to the identify method which relate to the SaaSquatch integration.

### Display the Referral Widget

[Identify](/success/core-topics/#Identification) the users to SaaSquatch and enable them to [share](/success/share-options/) their unique sharelink to their network of friends through email, Facebook, or Twitter.

<pre><code class="lang-js">analytics.identify( "abc_172", {
    accountId: "abc_172",
    email: "test2@example.com",
    firstName: "test2",
    lastName: "test2",
    paymentProviderId: 'null'
},{
    integrations: {
        SaaSquatch: {
            checksum: null
        }
    }
});</code></pre>

#### Embedded Mode

By default the Referral Widget is displayed in Popup mode. The Referral Widget can also be [displayed in embedded mode](/developer/squatchjs/v2/#embedded-widget) by including the mode parameter set to `EMBED`:

<pre><code class="lang-js">analytics.identify( "abc_170", {
    accountId: "abc_170",
    email: "test@example.com",
    firstName: "test",
    lastName: "test",
    <strong><font color="red">mode:"EMBED",</font></strong>
    paymentProviderId: 'null'
},{
    integrations: {
        SaaSquatch: {
            checksum: null
        }
    }
});</code></pre>

### Track Signups

The following script will [identify](/success/core-topics/#Identification) a newly registered user to SaaSquatch. By loading the script in `NOCONTENT` mode it is being used for purely tracking purposes and will not load a widget.

The script will automatically look for a referral cookie in the Referred User's browser and make the [referral connection](/success/core-topics/#Attribution). Note this only works with <b>Classic</b> programs and 3rd party cookies:

<pre><code class="lang-js">analytics.identify( "abc_170", {
    accountId: "abc_170",
    email: "test@example.com",
    firstName: "test",
    lastName: "test",
    <strong><font color="red">mode:"NOCONTENT",</font></strong>
    paymentProviderId: 'null'
},{
    integrations: {
        SaaSquatch: {
            checksum: null
        }
    }
});</code></pre>

### Convert Referrals

#### API Programs

For API programs [converting a referral](/success/core-topics/#Conversion) is accomplished by including the `accountStatus` parameter set to `PAID`:

<pre><code class="lang-js">analytics.identify( "abc_172", {
    accountId: "abc_172",
    email: "test2@example.com",
    firstName: "test2",
    lastName: "test2",
    <strong><font color="red">accountStatus: 'PAID',</font></strong>
    paymentProviderId: 'null'
},{
    integrations: {
        SaaSquatch: {
            checksum: "{{Calculated_Checksum}}"
        }
    }
});</code></pre>

#### Payment Provider Integrations

For Programs configured for one of our Payment Provider Integrations (e.g. [Stripe](/developer/stripe/) or [Recurly](/developer/recurly/)) the [conversion](/success/core-topics/#Conversion) is accomplished in the Payment Provider itself. Simply include the user's ID from the payment provider as `paymentProviderId` so that our system can track when a conversion happens.

Further details about Payment Provider Integrations can be found in the [guides](/guides) section of our docs.

<pre><code class="lang-js">analytics.identify( "abc_170", {
    accountId: "abc_170",
    email: "test@example.com",
    firstName: "test",
    lastName: "test",
    <strong><font color="red">paymentProviderId: "cus_8yKs12342nsNl"</font></strong>
},{
    integrations: {
        SaaSquatch: {
            checksum: "{{Calculated_Checksum}}"
        }
    }
});</code></pre>

**Note:**

- Payment Provider programs have slightly different Signed Request requirements than API programs. Please refer to our [Signed Requests](/developer/squatchjs/signed-requests/) page for further details.
- Signed Requests using JWT are not currently supported using the Segment integration.

### Additional Resources

The [Overview](/segment) doc for our Segment Integration and [squatch.js](/developer/squatchjs/) library provide further details about how to go about setting up this integration.

Segment provides [an overview](https://segment.com/docs/integrations/saasquatch/) of, and the <a href="https://github.com/segment-integrations/analytics.js-integration-saasquatch">Github code <i class="fa fa-github" aria-hidden="true"></i></a> for, their Integration with SaaSquatch.
