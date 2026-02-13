---
title: Key squatch.js Scripts
slug: developer/squatchjs/v2
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-17
seoDescription: Squatch.js has all the functionality required to incorporate a SaaSquatch program into your website or web app. This page has a list of the key squatch.js scripts you may need for your implementation. These are general scripts meant for reference purposes. Add your tenant- and program-specific information to ensure they function as intended. 
tags:
  - squatch.js
  - js
  - squatch.js tracking
  - tracking script
  - using squatch.js
---

This page has a list of the key squatch.js scripts you may need for your implementation of a SaaSquatch program. These are general scripts meant for reference purposes.

Add your tenant- and program-specific information to ensure they function as intended. To generate your personalized code snippets, sign in to the Admin Portal and go to *Settings > Install*. 

> We strongly recommend you use your test tenant while implementing, so that your sample data can be cleared when done.

# Loader script
This async loader script must be included on your website in order to call squatch.JS to perform many functions, including creating cookies that will take care of referral attributions. __The rest of the scripts on this page rely on the Loader script to be present as it is what retrieves the functionality of squatch.JS and allows referral cookies to be dropped and retrieved.__

> We recommend placing it on every page of your site, not just the pages where your users will be interacting with your SaaSquatch-run program.

```js
<script>
!function(a,b){a("squatch","https://fast.ssqt.io/squatch-js@2",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);
</script>
```

## Environment setup
> Adding your SaaSquatch tenant alias and [JWT](/topics/json-web-tokens) to the `head` in your window allows for easier integration of our widget, event tracking, registration and autofill scripts into individual pages. 

The `squatchToken` JWT added here will be used for user upsert (when a user is created, when a widget loads) as well as for event tracking. The example below is a static value, but you should be dynamically generating it based on your user object as needed. 

```js
<script>
window.squatchTenant = "test_aym93okveuya4";
window.squatchToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidXNlcklkIiwiYWNjb3VudElkIjoiYWNjb3VudElkIiwiZmlyc3ROYW1lIjoiU3F1YXRjaEpzIiwibGFzdE5hbWUiOiJVc2VyIiwiZW1haWwiOiJzcXVhdGNoanNAZXhhbXBsZS5jb20ifX0.E2_OHk84j7BeNtkn5v8q24htsvIrN6ecyXzoSuDlJb4";

// Below used for overriding default config values
window.squatchConfig = {
    domain: "<domain>",
    npmCdn: "<npmCdn>",
    debug: <trueOrFalse>
    }
</script>
```

# Widget scripts
> We recommend consulting the *Settings >  Install* page in the Admin Portal to generate a personalized script for your implementation. The general examples provided below are for informational purposes only and when used as is will display widgets from an example program. 

## Widget styles
Squatch.js supports two widget styles: embedded and popup. 

- Embedded widgets show up directly within your web page or app. 
- Pop-up widgets are displayed in a modal window.  When you use the `squatch-popup` element, any HTML within the children of the element will serve as a CTA for opening the popup.

### Verified access widget
[Verified access widgets](/topics/widget-types#verified-access-widgets) provide a robust, in-app experience for your referral or loyalty participants. To protect your participants’ personal information, we recommend displaying this widget only to those who have signed in to your product. 

> JWTs are required by default for verified access widgets. 
> 
> In-app/Points Widgets require: 
>  - A program ID (for program-bound widgets)
>  - Widget type (linked to program type) or widget ID (for program agnostic widgets)

The below code snippets display an in-app widget for a Referrer in a referral program with the ID `example-program`. 

**Embedded widget**

```js
<squatch-embed widget="p/example-program/w/referrerWidget"><div>Loading...</div></squatch-embed>
```

**Popup widget**

```js
<squatch-popup widget="p/example-program/w/referrerWidget"><button>Click me to show widget!</button></squatch-popup>
```

### Instant access widget
<classic-only> **Note:** This feature is only available for the current version of the SaaSquatch platform. If your program was created before April 2019 and you're interested in this feature, reach out to our <a href="mailto:success@saasquatch.com">Success team</a> to chat about upgrading. </classic-only>

  <a href="/topics/widget-types#instant-access-widgets">Instant access widgets</a> give your participants a simple way to engage with your referral program–without signing into your product or service. They’re available for clients using the current version of the SaaSquatch platform (post-2019). 

> JWTs are not required for instant access widgets. 
> 
> Website Referral Widgets require: 
>  - A program ID (for program-bound widgets)
>  - Widget type (linked to program type) or widget ID (for program agnostic widgets)

The below code snippets display a widget for a anonymous Referrer in a referral program with the ID `example-program`. 

**Embedded widget**

```js
<squatch-embed widget="p/example-program/w/websiteReferralWidget"><div>Loading...</div></squatch-embed>
```

**Popup widget**

```js
// Click to open button
<squatch-popup widget="p/example-program/w/websiteReferralWidget"><button>Click me!</button></squatch-popup>
```

**Auto-popup friend widget**

In addition to the standard embedded and popup widget styles, instant access widgets allow for an automatic pop-up widget to appear whenever the landing page is loaded for [Friend Widgets](/topics/widget-types#friend-widget). Participants don’t need to interact with your landing page to trigger a widget load when `Show automatically for referred friends` is toggled in the program settings as long as the loader script is present.

> See [Setting Up an Instant Access Widget](/building-programs/program-widget/setting-up-an-instant-access-widget/) for more details.

# Register participants script
Use `squatch.api`'s `upsertUser` method to create or update a user in your referral program without displaying a widget. For example, this method can be used to create a user in SaaSquatch when someone fills out a registration form.

When a cookie is present, squatch.JS will also automatically attribute the referral when users are upserted without the need to pass in an explicit referral code. 

> Note that if you added a JWT during the environment setup, then you don’t need to include one with this script too. If there is an existing token on `window.squatchToken`, then all requests will use that as the default. 

If you are following along by testing the examples on this page, you'll need to adjust the hardcoded `squatchToken` outined in "Environment setup" for the below call to reflect the user object. 

```js
<script>
// Wait for squatch.js to be ready
squatch.ready(function(){

    // Configure squatch-js for your user
    const userConfig = {
        user: {                               
        id: 'sample.user@example.com',      
        accountId: 'sample.user@example.com',       
        email: 'sample.user@example.com',               
        firstName: 'Sample',       
        lastName: 'User',
        locale: 'en_US',
        customFields: {
            companyName: "Example Inc.",
            phoneNumber: "(555) 340-0505"
                }            
            }
        };

    // Make the request to upsert your user
    squatch.api().upsertUser(userConfig).then(function(response) {
        const user = response.user;
            }).catch(function(error){
        console.log(error);
                });
    });
</script>
```

## Autofill script
> The squatch.js library can be used to retrieve a referral code from dropped cookie value, or the cookie value itself via `squatch.api`'s `squatchReferralCookie` method. 

You can then "autofill" an element with the value, such as a referral code field in a sign-up form. There are many methods to accomplish this, such as:

- `getElementbyId`: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
- `getElementsByClassName`: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
- `getElementsByTag`: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName

**Referral codes**

- The request to retrieve the information from the dropped cookie returns referral codes within an object called "codes". 
- This object is key value pair where the key is the program ID and the value is the referral code.
- You'll need to use your referral program's ID to access and apply the correct referral code to your element.

If you want to learn more about using autofill for multiple referral programs, then check out our [autofill guide](/how-to-pass-referral-codes-to-a-form/#running-multiple-referral-programs). 

**Cookie values**

- Cookies are dropped after a user clicks on a sharelink. 
- This cookie includes important referral analytics information and should be passed along with REST API & GraphQL API calls if you are not upserting users/attributing users automatically with squatch.JS. 

To read more on our referral cookies see: /developer/squatchjs/cookies/

### Autofill a referral code
Use cases:
- Displaying the referral code in a sign-up form field to your new user to confirm that a referral is taking place.
- Using the retrieved referral code to perform a `Get a user by referral code` [REST API call](/api/methods#open_get_user_by_code) to show the Referrer's details to the Referred User.
- Retrieved then applied as a discount/coupon code with our [Hubspot, Stripe and Recurly integrations.](/integrations)

> **Please note that it is NOT recommended to retrieve the referral code from the cookie to pass in explicitly if using squatch.JS to upsert your users.** 
> 
> In this scenario, allow squatch.JS to make the attribution automatically in the background, which will also capture important analytics information that would otherwise be overridden by the inclusion of a manual referral code.

```js
<script>
// Wait for squatch.js to be ready
squatch.ready(function(){

    // Retrieve the element you want to autofill the Referral Code into from the DOM. 
    var code = document.getElementById('referralCode');

    // Make the request to retrieve the information from the dropped cookie
    squatch.api().squatchReferralCookie().then(function(response) {
        // Use your referral program id to access and apply the correct referral code to your element
        code.value = response.codes["example-program"];
        });
    });
</script>
```

### Retrieve a cookie value
Use case:
- Included as part of a [REST API](/api/methods#open_user_upsert) `User Upsert` call to attribute a Referred User with extended analytics information.

> Passing in the cookie value instead of just the referral code allows you to capture additional analytics information such as the sharelink used, which provides context like engagement and share mediums.

```js
<script>
// Wait for squatch.js to be ready
squatch.ready(function(){

    // Retrieve the element you want to autofill the Referral Code into from the DOM. 
    var cookie = document.getElementById('cookieValue');

    // Make the request to retrieve the dropped cookie value
    squatch.api().squatchReferralCookie().then(function(response) {
        cookie.value = response.encodedCookie;
        });
    });
</script>
```

# Track user event script
You can use squatch.js to send user events directly to SaaSquatch, such as during a check-out action via the `squatch.events`'s `track` method.

> By default, SaaSquatch requires a user object payload JWT to be included with the request when sending a user event. This JWT's payload should be in the format as outlined for the [Write Token](/api/openendpoints/#authentication-with-jwt), including the `id` and `accountId` as well as at least one additional user value.

If you are following along by testing the examples on this page, you'll need to adjust the hardcoded `squatchToken` outined in "Environment setup" for the below call to reflect the user object. 

```js
<script>
// Wait for squatch.js to be ready
squatch.ready(function(){

    // Object containing the user & event object
    var eventObj = {
        "userId": "sample.user@example.com",
        "accountId": "sample.user@example.com",
        "events": [{
        "key": "purchase",
        "fields":{
            "checkout_id": "123456",
            "order_id": "234567",
            "total": 100,
            "revenue": 40,
            "tax": 15,
            "currency": "USD",
            "products": [	{
            "product_id": "p_name",
            "name": "Product Name",
            "price": 85,
            "quantity": 1				
                }]
            }
        }]
    };

    // If window.squatchToken is not set, pass in a jwt with .track(eventObj, { jwt }), otherwise include the {squatchToken}
    squatch.events().track(eventObj, {squatchToken}).then(function(response) {
    }).catch(function(error){
    console.log(error);
    })
});
</script>
```

## Authentication
The requirement for including a JWT in the request can be [removed](/developer/squatchjs/signed-requests/#custom-secure-mode) by disabling the Track User Event option on the **Settings > Security page**. If you choose not to include a JWT, then you MUST use an empty JSON object (`{}`) instead of excluding that value.

> **WARNING: Including a JWT is important for fraud prevention and security.** 
> 
> We highly recommend including a JWT as outlined in the example above, as otherwise anyone with access to the JWT for that participant will be able to send authorized events. We additionally recommend that your JWT include an expiry for extra security.

# Program loop
See a sample referral program as outlined on this page's scripts in action: [Sample Referral Program Code](https://github.com/beckatimpact/squatch-js)

__The sample program includes use of:__
- `squatch.api().upsertUser()`
- `squatch.api().squatchReferralCookie()`
- Embedded "Verified access widget"
- `squatch.events().track()`
- Embedded "Instant access widget"

> 1. To ensure that everything runs smoothly after launch, we recommend identifying a few users via the `Register Participants` script.
> 
> 2. Once these users have been created, attempt to send a few (purchase) events via the `Track User Event` script.
> 
> 3. Review these users by clicking on the Participants tab in the administrative portal for your program to ensure that all details and events have been captured successfully.

# Learn more

## Error codes
We maintain an [Issue Code List](/developer/squatchjs/issue/) with details and specific troubleshooting tips for any error codes that you may receive. If you try out the troubleshooting steps and are still experiencing problems, then don’t hesitate to reach out to our [Support team](mailto:support@saasquatch.com) for assistance. 

## Additional documentation
- [Advanced Use Cases](/developer/squatchjs/v2/advanced-use-cases): Go beyond the basic scripts and learn how to reference existing user data, render a widget without requiring user information, and more.
- [Signed Requests](/developer/squatchjs/signed-requests): Learn how to require a JWT or an API key when sending data to SaaSquatch. 
- [Tracking Cookies](/developer/squatchjs/cookies): Learn more about squatch.js and first-party cookies. 
- [Issue Code List](/developer/squatchjs/issue): Find details and troubleshooting steps about error codes you encounter.
- [squatch.js Reference](https://saasquatch.github.io/squatch-js/pull/58/): Full list of methods available. 