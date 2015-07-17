---
title: Mobile Widget
highlights: |
    Referral SaaSquatch provides a mobile-responsive widget that can be embedded directly into your iOS, Android or Windows phone mobile app using a special URL. The widget
    is a on-stop-shop for your users to participate in the referral program; the can refer friends, track the status of their referrals, and see the rewards earned from referrals.
slug: mobile/widget
template: mobile.html
---

![Mobile Widget example](/assets/images/mobile-screenshot.jpg)


The mobile referral widget provides all the pieces required to track referrals:

 - **Identify Users and Generate Links**: If this is the first time a user with the given `userId` or `accountId` has been seen when the widget is loaded, their user record, referral code and referral link will be created. If a user record already exists, it will be updated. Read more on [identification](/topics/identification/).
 - **Attribute Referrals**: If a value is passed in for the `referralCode` field and this user was not previously referred then a referral will be created. Read more on [attribution](/topics/attribution/).
 - **Convert Accounts**: If the value of `accountStatus` is updated to `PAID` then any in-progress referrals will be marked as complete. Read more on [conversion](/topics/conversion/).
 - **Secure Access**: The `checksum` optional field can be included to turn on [Signed Requests](/squatchjs/signed-requests/) and protect against unauthenticated data access.

---


### Tracking App Users

To render the referral program in your iOS, Android, Windows phone, Cardova or Xamarin mobile project, you should include this special URL in a WebView or iFrame component. 
It will load a mobile-responsive web page as part of your app, look after the referral tracking, and let your users refer their friends.

```nohighlight
app.referralsaasquatch.com/a/{{tenant_alias}}/widgets/mobilewidget
```

Each link should be personalized with the details of the currently logged in user, like this example:

```nohighlight
http://app.referralsaasquatch.com/a/{{tenant_alias}}/widgets/mobilewidget?userId=123&firstName=Bob&lastName=Testserson&accountId=abc&paymentProviderId=NULL&email=misterd%2Bmuser001%40example.com&checksum=1KOCYrvKuQWKeyEUmoWCMaY8pmQCPNs%2Ft3a%2BZT0SLAM%3D
```

Here's the same URL broken across multiple lines for clarity.

```nohighlight
http://app.referralsaasquatch.com/a/{{tenant_alias}}/widgets/mobilewidget
?userId=123
&firstName=Bob
&lastName=Testserson
&accountId=abc
&paymentProviderId=NULL
&email=misterd%2Bmuser001%40example.com
&checksum=1KOCYrvKuQWKeyEUmoWCMaY8pmQCPNs%2Ft3a%2BZT0SLAM%3D
```

#### Parameters

Send information about the currently logged-in user. These parameters should be the same as for <a href="/squatchjs#init">squatch.js init</a>.

<table class="table table-hover">
    <tr>
        <th>tenantAlias</th>
        <td><span class="label">Required</span></td>
        <td>
            Identifies which account to connect to. This is a super important parameter. For your app, you will get 
            two tenant aliases -- one for test mode and one for live mode. Test mode alias are prefixed with <b>test_</b>, for example <code>test_abhoihnqwet</code>
        </td>
    </tr>
    <tr>
        <th>userId</th>
        <td><span class="label">Required</span></td>
        <td>A user ID from your system (must be unique for every user). We use this to uniquely track users, and lets us handle accounts that are shared between users.</td>
    </tr>
    <tr>
        <th>accountId</th>
        <td><span class="label">Required</span></td>
        <td>
            We use accountId to link a group of users together. See <a href="/shared-vs-solo-accounts">Shared vs Solo Accounts</a> to see what you should use here.
        </td>
    </tr>
    <tr>
        <th>paymentProviderId</th>
        <td><span class="label">Required</span></td>
        <td>
            In most cases, this field should be explicitly set to <code>NULL</code>. If you're using a payment system connection, then 
            the paymentProviderId is either the Stripe Customer ID, the Recurly Account ID, the Braintree Account ID or the Zuora Account ID. Can be also <code>NULL</code>
            for <a href="/free-trials">free trials or freemium accounts</a>.
        </td>
    </tr>
    <tr>
        <th>accountStatus</th>
        <td><span class="label">Optional</span></td>
        <td>
        <p>
            The status of the account identified by <code>accountId</code>.
        </p>
        <ul>
            <li>
                Automatically calculated when <code>paymentProviderId</code> exists
            </li>
            <li>
                Defaults to <code>TRIAL</code>
            </li>
            <li>
                Possible values are <code>PAID</code>, <code>TRIAL</code>, <code>FREE</code> or <code>CANCELLED</code>
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
            Defaults to the first referral cookie value detected for <code>FREE</code> or <code>TRIAL</code> accounts.
            </li>
            <li>
            Stores the value that is looked up with <a href="/squatchjs#autofill">Coupon Autofill</a>
            </li>
            <li>
            If someone uses a referral code during checkout, set that value here.
            </li>
            <li>
            Automatically calculated from integrations that use <code>paymentProviderId</code>
            </li>
            <li>
            Will not update a value inside of a payment provider. Do not use when <code>paymentProviderId</code> exists.
            </li>
            <li>
            Can also be <a href="/api/methods#account_sync">set using the REST API</a> or <a href="/squatchjs/">Squatch.js</a>.
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>firstName</th>
        <td><span class="label">Optional</span></td>
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
        <td>The e-mail address of the user. We use this to contact someone when they have a successful referral.</td>
    </tr>
    <tr>
        <th>userImage</th>
        <td><span class="label">Optional</span></td>
        <td>Defaults to <a href="http://gravatar.com/">Gravatar</a> or, if unavailable, the user's initials. If you provide a absolute profile image URL the minimum image size is 80px x 80px. Requires <a href="/squatchjs/signed-requests">Signed Requests</a>.</td>
    </tr>
    <tr>
        <th>fbShareImage</th>
        <td><span class="label">Optional</span></td>
        <td>Defaults to no image for Facebook referrals. If you provide an absolute URL an image it will be used when a referral is made on Facebook. Minimum image size is 114px tall or 155px wide.</td>
    </tr>
    <tr>
        <th>checksum</th>
        <td><span class="label">Optional</span></td>
        <td>A HMAC-SHA2 checksum of the other parameter values. Used to validate that data originated from your servers. For details, see the <a href="/squatchjs/signed-requests">Signed Requests documentation</a>.</td>
    </tr>
</table>


### Embedding a webview

Once you've generated a unique URL based off of the current user's `userId`, you can load it in a "WebView" component to show the referral widget to your users.
Usually this requires a small amount of UI code to include the widget in the appropriate place inside of your app.


 - [Android Webview](http://developer.android.com/reference/android/webkit/WebView.html)
 - [iOS Webview](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIWebView_Class/)
 - [Xamarin Webview](http://developer.xamarin.com/guides/cross-platform/xamarin-forms/working-with/webview/)
 - [Cardova Webview](http://cordova.apache.org/docs/en/5.0.0/guide_hybrid_webviews_index.md.html#Embedding%20WebViews)
 - [Windows Phone Webview](https://msdn.microsoft.com/library/windows/apps/windows.ui.xaml.controls.webview.aspx)


### Customization & Examples

Mobile widgets take full advantage of the Referral SaaSquatch [theme system](/themes/), so they can be completely customized to match
your brand, theme, style, colors, fonts, animations and more. By default, [stanard themes](/themes/standard/) come with a mobile-responsive template based upon Bootstrap 3, 
but [custom themes](/themes/custom/) like those used in the Shoeboxed referral program can be customized complete with tabbed navigation.


![Shoeboxed Mobile Screenshot 1](/assets/images/mobile/shoeboxed-mobile-1.png)
![Shoeboxed Mobile Screenshot 2](/assets/images/mobile/shoeboxed-mobile-2.png)
![Shoeboxed Mobile Screenshot 3](/assets/images/mobile/shoeboxed-mobile-3.png)
