---
title: Mobile Widget Reference
highlights: This Mobile Widget reference includes details of the structure, available parameters, and an example of the request.
slug: mobile/widget/reference
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-21
robotsTag:
  - noindex
---

> This approach has been deprecated and will be removed in 2021. Please use the REST API, GraphQL API or Android SDK to create mobile widgets

To render the referral program in your iOS, Android, Windows phone, Cordova or Xamarin mobile project, you should include a customized URL in a WebView or iFrame component. 

This will load a mobile-responsive widget in your app which can track referrals as well as let your users refer their friends.

### Base URL

Each of these customized URLs starts off with the same base URL section. To complete the URL, first replace `{{tenant_alias}}` with your program's Live or Test tenant alias.

```nohighlight
app.referralsaasquatch.com/a/{{tenant_alias}}/widgets/mobilewidget
```
Each link is then customized with the following parameters:

### Parameters

The base URL is then personalized with a combination of the parameters outlined below. 

These parameters should be from the logged in user for whom you intend to load the mobile widget. 

The parameters for the mobile widget are similar to those used the [squatch.js init](/developer/squatchjs/v2/reference/#init) call.

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
            Unless explicitly setting this field it should be left as `NULL`. On payment provider programs this can be set to the Stripe Customer ID, Recurly Account ID, Braintree Account ID, or the Zuora Account ID.
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
                Omit this parameter on programs configured for a payment provider.
            </li>
            <li>
                Defaults to <code>TRIAL</code>
            </li>
            <li>
                Possible values are `TRIAL`, `FREE`, `PAID`, or `CANCELLED`
            </li>
            <li>
                Can also be <a href="/api/methods#account_sync">updated using the REST API</a> or <a href="/developer/squatchjs">Squatch.js</a>.
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
              <li>Only works with <b>Classic</b> referral programs</li>
            <li>
            Defaults to the first referral cookie value detected for <code>FREE</code> or <code>TRIAL</code> accounts. (Note: Only works with 3rd party cookies, not 1st party cookies)
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
            Can also be <a href="/api/methods#account_sync">set using the REST API</a> or <a href="/developer/squatchjs">Squatch.js</a>.
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>userReferralCode</th>
        <td><span class="label">Optional</span></td>
        <td>
            The referral code to be shared by this `userId`.
            <ul>
            <li>
            Used to set a custom referral code for this `userId`.
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
        <td>Defaults to <a href="http://gravatar.com/">Gravatar</a> or, if unavailable, the user's initials. If you provide a absolute profile image URL the minimum image size is 80px x 80px. Requires <a href="/developer/squatchjs/signed-requests">Signed Requests</a>.</td>
    </tr>
    <tr>
        <th>fbShareImage</th>
        <td><span class="label">Optional</span><span class="label">Deprecated</span></td>
        <td>Defaults to no image for Facebook referrals. If you provide an absolute URL an image it will be used when a referral is made on Facebook. Minimum image size is 114px tall or 155px wide.</td>
    </tr>
    <tr>
        <th>locale</th>
        <td><span class="label">Optional</span></td>
        <td>The user's locale, used for <a href="/themes/internationalization">Internationalization</a>. The locale must be of the format `language_COUNTRY` where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.
            Examples: <code>en</code> or <code>en_US</code> or <code>zh_CN</code> </td>
    </tr>
    <tr>
	<th>mode</th>
	<td><span class="label">Optional</span></td>
	<td>
		<p>Sets the display mode for the mobile widget being loaded. The mobile widget defaults to being loaded in a hosted mode.
		<ul>
			<li>
				Omitting this parameter (the default usage) loads the mobile widget in hosted mode.
			</li>
			<li>
				Set mode to `EMPTY` to make POST requests to use Mobile Widget URL's functionality without displaying a widget to the user.
			</li>
			<li>
				Not included in [Signed Request](/developer/squatchjs/signed-requests/) calculations.
			</li>
		</ul>
	</td>
</tr>
    <tr>
            <th>checksum</th>
            <td><span class="label">Optional</span></td>
            <td>A HMAC-SHA2 checksum that is used to validate that data originated from your servers. For details, see the <a href="/developer/squatchjs/signed-requests">Signed Requests documentation</a>. A signed request can use EITHER <code>jwt</code> or <code>checksum</code> but not both.</td>
          </tr>
    <tr>
            <th>jwt</th>
            <td><span class="label">Optional</span></td>
            <td>A JSON Web Token (JWT) that is used to validate that data originated from your servers. For details, see the <a href="/developer/squatchjs/signed-requests">Signed Requests documentation</a>. A signed request can use EITHER `jwt` or `checksum` but not both.</td>
          </tr>
</table>

### Example 

#### Parameters

Along with the Base URL (filled with out tenant alias) we select some test data to set for the parameters.
```nohighlight
https://app.referralsaasquatch.com/a/test_345gh4545g23kj3/widgets/mobilewidget
?userId=123
&firstName=Bob
&lastName=Testserson
&accountId=abc
&paymentProviderId=NULL
&email=misterd%2Bmuser001%40example.com
&jwt={{calculated_JWT}}
```

>**Note**: Make sure to URL encode any parameters (`john@example.com` vs `john%40example.com`)

#### Example Personalized URL
The parameters are then combined to create the unique URL. For the example parameters from the previous section, this will look like:
```nohighlight
https://app.referralsaasquatch.com/a/test_345gh4545g23kj3/widgets/mobilewidget?userId=123&firstName=Bob&lastName=Testserson&accountId=abc&paymentProviderId=NULL&email=misterd%2Bmuser001%40example.com&checksum={{calculated_JWT}}
```

### Embedding the URL in a WebView or iFrame

The unique URL can then be used to show the referral widget to your users.

Details about how to include a URL in a WebView or iFrame can be found through the following external references for a wide range of mobile development platforms.

 - [Android Webview](http://developer.android.com/reference/android/webkit/WebView.html)
 - [iOS Webview](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIWebView_Class/)
 - [Xamarin Webview](http://developer.xamarin.com/guides/cross-platform/xamarin-forms/working-with/webview/)
 - [Cordova Webview](http://cordova.apache.org/docs/en/5.0.0/guide_hybrid_webviews_index.md.html#Embedding%20WebViews)
 - [Windows Phone Webview](https://msdn.microsoft.com/library/windows/apps/windows.ui.xaml.controls.webview.aspx)

### Widget Theme Customization

Mobile widgets take full advantage of the Referral SaaSquatch [theme system](/themes/), so they can be completely customized to match
your brand, theme, style, colors, fonts, animations and more. By default, [standard themes](/themes/standard/) come with a mobile-responsive template based upon Bootstrap 3, 
but [custom themes](/themes/custom/) like those used in the Shoeboxed referral program shown here can be customized complete with tabbed navigation.

### Configuring Default Behavior

The Email and SMS Share options in the referral widget uses the `mailto:` and `sms:` link formats. 

Your app needs to be correctly configured in order for the `mailto:` and `sms:` links to work smoothly on both iOS and Android devices from within an webview.

#### Configure iOS Links

When using **Swift 2.2.1 or 2.3** add the following code in your UIWebView’s delegate:

```swift
func webView(webView: UIWebView, shouldStartLoadWithRequest r: NSURLRequest, navigationType nt: UIWebViewNavigationType) -> Bool {
    if let scheme = r.URL?.scheme where scheme == "mailto" || scheme == "sms" || scheme == "whatsapp" {
        UIApplication.sharedApplication().openURL(r.URL!)
        return false
    }
    return true
}
```
For **Swift 3** add the following code to your **ViewController.swft**:
```swift
func webView(_ webView: UIWebView, shouldStartLoadWith r: URLRequest, navigationType nt: UIWebViewNavigationType) -> Bool {
    if let scheme = r.url?.scheme, scheme == "sms" || scheme == "mailto" || scheme == "whatsapp" {
        UIApplication.shared.openURL(r.url!)
        return false
    }
    return true
}
```
Add the following to your **Info.plist**:
```
LSApplicationQueriesSchemes
  Item 0 - String - sms
  Item 1 - String - mailto
  Item 2 - String - whatsapp
```

#### Configure Android Links

Configure the URL actions:

```java
public class MyWebViewClient extends WebViewClient {

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            String stringUri = null;
            try {
                stringUri = URLDecoder.decode(url, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            if(url.startsWith("mailto:")) {

                String[] url_variables = stringUri.split("&");
                String subject = url_variables[0].replaceFirst("mailto:\\?subject=", "");
                String body = url_variables[1].replaceFirst("body=", "");
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("message/rfc822");
                intent.putExtra(Intent.EXTRA_SUBJECT, subject);
                intent.putExtra(Intent.EXTRA_TEXT, body);

                startActivity(Intent.createChooser(intent, "Send Email"));
            }
            else if (url.startsWith("sms:")) {

                String[] url_variables = stringUri.split("&");
                String body = url_variables[1].replaceFirst("body=", "");
                Intent smsIntent = new Intent(Intent.ACTION_VIEW);
                smsIntent.setType("vnd.android-dir/mms-sms");
                smsIntent.putExtra("sms_body", body);
                startActivity(smsIntent);
            }
            else if (url.startsWith("whatsapp:")) {

                String[] split_string = stringUri.split("=");
                String text = split_string[1];
                Intent sendIntent = new Intent();
                sendIntent.setAction(Intent.ACTION_SEND);
                sendIntent.putExtra(Intent.EXTRA_TEXT, text);
                sendIntent.setType("text/plain");
                startActivity(sendIntent);

            }
            else if(url.startsWith("http:") || url.startsWith("https:")) {
                view.loadUrl(url);
            }

            return true;
        }
    }
```

Use the following code example to Load the Webview:

```java
String url = "https://app.referralsaasquatch.com/widgeturl";
WebView widget = (WebView) this.findViewById(R.id.webView);
widget.getSettings().setJavaScriptEnabled(true);
widget.setWebViewClient(new MyWebViewClient());
widget.loadUrl(url);
```