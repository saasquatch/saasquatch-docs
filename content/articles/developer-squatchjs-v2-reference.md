---
title: squatch.js Reference
slug: developer/squatchjs/v2/reference
sectionType: guide
template: hasTableOfContents.html
date: 2023-08-23
seoDescription: squatch.js is the SaaSquatch javascript SDK and a one-stop shop to integrate the SaaSquatch platform into your website or web app. It can show Program Widgets on any website, track users, generate unique referral short links and referral codes, and more.
---

> ## This content has been moved.
>  Please see our squatch.js reference content on <a href="https://saasquatch.github.io/squatch-js">GitHub</a> for updated information. </div>

## Methods
### ready
Squatch.js can't start safely making operations until it's "ready". This
function detects that state.

**Parameters**

-   `fn` **function** A callback once Squatch.js is ready.

**Examples**

```javascript
squatch.ready(function() {
  console.log("ready!");
  squatch.api().upsertUser();
});
```

**Returns** `void` 
### autofill
Autofills a referral code into an element when someone has been referred.
Uses [WidgetApi.squatchReferralCookie](WidgetApi.squatchReferralCookie) behind the scenes.

**Parameters**

-   `selector` **string** Element class/id

**Returns** `void` 

**Example** 
```
squatch.ready(function() {

  var element = document.getElementById('my_coupon');

  squatch.init({
    tenantAlias: "test_abzxg88g30tn2"
  });

  squatch.api().squatchReferralCookie().then(function(response) {
    element.value = response.codes["program-id"];
  });
});
```

> #### autofill Troubleshooting
> If experiencing difficulties with usage of autofill, first ensure that the [squatch.js loader script](/developer/squatchjs/v2/#1-including-squatch-js) is included on your initial landing page (the page that all your SaaSquatch user sharelinks redirect to) in order to allow it to create a 1st party cookie that can be properly retrieved.

### submitEmail
Overrides the default function that submits the user email. If you have
Security enabled, the email needs to be signed before it's submitted.

**Parameters**

-   `fn` **function** Callback function for the 'submit_email' event.

**Examples**

```javascript
squatch.submitEmail(function(target, widget, email) {
  // Sign email and generate jwt token
  var jwt = 'token';
  widget.reload(email, jwt);
});
```

**Returns** `void` 
### Widgets
`Widgets` is a factory for creating widgets. It's possible to build your own widgets using the
[WidgetApi](#widgetapi) but most people will prefer to use these easy methods.

#### constructor
Initialize a new [Widgets](#widgets) instance.

**Parameters**

-   `tenantAlias` **string** The Tenant that you're using.
-   `domain` **string** The domain for API. Defaults to `https://app.referralsaasquatch.com`

**Examples**

_Browser example_

```javascript
var widgets = new squatch.Widgets({tenantAlias:'test_12b5bo1b25125'});
```

_Browserify/Webpack example_

```javascript
var Widgets = require('squatch-js').Widgets;
var widgets = new Widgets({tenantAlias:'test_12b5bo1b25125'});
```

_Babel+Browserify/Webpack example_

```javascript
import {Widgets} from 'squatch-js';
let widgets = new Widgets({tenantAlias:'test_12b5bo1b25125'});
```

#### upsertUser
This function calls the [WidgetApi.upsert](#widgetapi) method, and it renders
the widget if it is successful. Otherwise it shows the ["error" widget](/developer/squatchjs/v2/#troubleshooting).

**Parameters**

-   `config` **object** Config details
    -  `config.user` **Object** The user details.
       -  `config.user.id` **string** The user id.
       -  `config.user.accountId` **string** The user account id.
       -  `config.user.firstName` **string** The user's first name.
       -  `config.user.lastName` **string** The user's last name.
       -  `config.user.email` **string** The user's email.
       -  `config.user.locale` **string** The user's locale, used for [Internationalization](/themes/internationalization/). The locale must be of the format 'language_COUNTRY' where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.
       -  `config.user.countryCode` **string** The user's two letter ISO 3166-1 Alpha-2 country code.
       -  `config.user.segments` **array** A list of operations for adding and removing the user from segments. Details about the supported operators and operations for adding and removing users from a segment can be found in our [User Segmentation](/features/user-segmentation/#saasquatch-api-and-squatchjs-segmentation) article.
       -  `config.user.referable` **boolean** Indicates if a user is referable or not. Use this in an upsert to indicate a user is no longer eligible to be referred. 
          -  **Note:** This flag shouldn't be used as part of the initial user upsert of a referred user as it will override the attribution.
          -  **Spelling Counts:** Make sure that when using this flag you spell it correctly, using a single r. It should always be `referable` or the system will not pick up the value.
       -  `config.user.referredByCodes` **array** This array is used to indicate who referred this user for Growth Automation programs.
       -  <span class="label">Classic only</span> `config.user.referredBy` **object** This object is used to pass in the referral code using the following fields.
          - `config.user.referredBy.code` **string** is the field in which the referrer's code is added.
          - `config.user.referredBy.isConverted` **boolean** tells the system whether or not the referral should be converted or not.
       - `config.user.referralCodes` **object** This is where you can optionally specify the referral codes for your growth automation programs.
       - <span class="label">Classic only</span> `config.user.referralCode` **string** This string can be optionally used to specify a referral code in a classic program for the user. 
       - `config.user.shareLinks` **object** The primary custom shareLinks for different programs. If a given program does not have a referral code, one will be generated.
       - `config.user.imageUrl` **string** The user's image, optionally used in widgets, emails, and themes. If you provide an absolute profile image URL the minimum image size is 80px x 80px.
       - `config.user.dateUsTaxFormSubmitted` **integer** The timestamp of when a user's W-9 tax form was submitted. Used for [W-9 Compliance](/features/w-9-compliance) on your tenant, if configured.
       - `config.user.customFields` **object** An object containing the custom fields for this user. Learn more about the available custom field functionality in our [Custom Fields Developer Guide](/features/custom-user-fields/).
    -  `config.widgetType`  The type of widget to be displayed.
       -  For Growth Automation Programs:
          -  `referrerWidget` **string** Widget content that lets people make referrals.
          -  `conversionWidget` **string** Widget content that shows that someone has been referred.
          -  `partnerWidget` **string** Widget content that lets partners refer people into a Partner Program.
       -  <span class="label">Classic only</span> For Classic Referral Programs:
          -   `REFERRER_WIDGET` **string** Widget content that lets people make referrals.
          -   `CONVERSION_WIDGET` **string** Widget content that shows that someone has been referred.

        **Examples**

        *Growth Automation Programs:*
          ```javascript
          widgetType: "p/program-name/w/referrerWidget"
          ```
         <span class="label">Classic only</span> *Classic Referral Programs:*
          ```javascript
          widgetType: "REFERRER_WIDGET"
          ```         

    -   `config.engagementMedium` How the widget is to be displayed.
        -  `POPUP` **string** Displays the widget as a modal popup. Popups widgets are rendered on top of other elements in a page.
        -  `EMBED` **string** Displays the widget embedded in the page. An EmbedWidget is displayed inline as part of your page.<br>          

          **Examples**
      ```javascript
      engagementMedium: "POPUP"
      ```     
    -   `config.jwt` **string** the JSON Web Token (JWT) that is used to validate the data (can be disabled)
    - <span class="label">Optional</span> `config.container` **HTMLElement Or String** An HTML Element or custom query selector used by squatch.js to append the widget iframe to. This takes precedence over the default "squatchembed" element. With a container value, your widget is hidden by default. Use the 'open()' method on the returned widget to show it. This only affects Embedded widgets.
    - <span class="label">Optional</span> `config.trigger` **String** A query selector to find the trigger element for your Pop-Up widget (ex: ".myPopUpButton"). It takes presence over the default ".squatchpop" and only affects Pop-Up widgets.

**Example Request**

*For Growth Automation Platforms*
```javascript
var initObj = {
  user: {                               
    id: 'abc_123',                      
    accountId: 'abc_123',       
    email: 'john@example.com',                
    firstName: 'John',       
    lastName: 'Doe',
    locale: 'en_US',
    countryCode: 'US',
    imageUrl: 'https://www.example.com/profile/ab5111251125',
    referralCodes: {
      program-id1: 'JOHNDOECODE',
      program-id2: 'JOHNDOECODETWO'
    },
    shareLinks: {
      program-id1: 'http://example.com/free1',
      program-id2: 'http://example.com/free2'
    },
    referredByCodes: [
      'JANEDOE'
    ],
    segments: [
        'sampleSegment'
    ],
    dateUsTaxFormSubmitted: 1619647338270,
    customFields: {
        lastPurchaseDate: 1512152525513,
        plan: 'Pro+',
        phone: 19055551234,
        address: '123 Main st., City, State, Country, H0H0H0',
        shoeSize: 12.5,
        currency: 'USD'
      }
  },
  engagementMedium: 'EMBED',
  widgetType: '/p/program-name/w/referrerWidget',
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJsb2NhbGUiOiJlbl9VUyIsInJlZmVycmVkQnlDb2RlcyI6WyJKQU5FRE9FIl19fQ.mlBQG0iaZuheMp4W4SmvmIMz7IiGWMpCzBQrABLLJgA'
};

squatch.widgets().upsertUser(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```
<span class="label">Classic only</span> *For Classic Referral Platforms* 
 ```javascript
var initObj = {
  user: {       
    id: 'abc_123',
    accountId: 'abc_123',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    locale: 'en_US',
    imageUrl: 'https://www.example.com/profile/ab5111251125',
    referralCode: 'JOHNDOECODE',
    referredBy: {
      code: 'JANEDOE',          
      isConverted: false
     }
  },
  engagementMedium: 'EMBED',
  widgetType: 'REFERRER_WIDGET',
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJsb2NhbGUiOiJlbl9VUyIsInJlZmVycmVkQnkiOnsiY29kZSI6IkpBTkVET0UiLCJpc0NvbnZlcnRlZCI6ZmFsc2V9fX0.yePfMPei_2VvC-W14KGwJ054QB7BBAJcyquKAjijBdw'
};

squatch.widgets().upsertUser(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```

**Returns **

Promise json object if true, with a Widget and user details.
-   `widget` **Widget** The widget that was created.
-   `user` **User** The user that's in the widget.

#### render
This function calls the [WidgetApi.render](#widgetapi) method, and it renders
the widget if it is successful. Otherwise it shows the ["error" widget](/developer/squatchjs/v2/#troubleshooting).

<div class="bs-callout bs-callout-warning">
<h4>Classic Only</h4>
The render function is a legacy call that is only usable for classic programs
</div>

**Parameters**

-   `config` **object** Config details
    -  `config.user` **Object** The user details
      -  `config.user.id` **string** The user id
      -  `config.user.accountId` **string** The user account id 

          **Examples**
          ```javascript 
          user: {                               
            id: 'abc_125',                      
            accountId: 'abc_125'
          }
          ``` 
    -  `config.widgetType`  The type of widget to be displayed.
       -  <span class="label">Classic only</span> For Classic Referral Programs:
          -   `REFERRER_WIDGET` **string** Widget content that lets people make referrals.
          -   `CONVERSION_WIDGET` **string** Widget content that shows that someone has been referred.

        **Examples**

        *Growth Automation Programs:*
          ```javascript
          widgetType: "/p/program-name/w/referrerWidget"
          ```
         <span class="label">Classic only</span> *Classic Referral Programs:*
          ```javascript
          widgetType: "REFERRER_WIDGET"
          ```  

    -   `config.engagementMedium` How the widget is to be displayed.
        -  `POPUP` **string** Displays the widget as a modal popup. Popups widgets are rendered on top of other elements in a page.
        -  `EMBED` **string** Displays the widget embedded in the page. An EmbedWidget is displayed inline as part of your page.<br>          

          **Examples**
      ```javascript
      engagementMedium: "POPUP"
      ```     
    -   `config.jwt` **string** the JSON Web Token (JWT) that is used to validate the data (can be disabled)

**Example Request**

<span class="label">Classic only</span> *For Classic Referral Programs:*
```javascript
var initObj = {
  user: {                               
    id: 'abc_123',                      
    accountId: 'abc_123'       
  },
  engagementMedium: 'EMBED',
  widgetType: 'REFERRER_WIDGET',
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMifX0.Sor56NRtkKqZKLLOy8177bFee5ukiS2-__R1s34KNOE'
};

squatch.widgets().render(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```

**Returns **

Promise json object if true, with a Widget and user details.
-   `widget` **Widget** The widget that was created.
-   `user` **User** The user that's in the widget.

### WidgetApi

The WidgetApi class is a wrapper around the Widget Endpoints of the SaaSquatch REST API.

#### constructor
Initialize a new [WidgetApi](#widgetapi) instance.

**Parameters**

-   `tenantAlias` **string** The Tenant that you're using.
-   `domain` **string** The domain for API. Defaults to `https://app.referralsaasquatch.com`

**Examples**

_Browser example_

```javascript
var squatchApi = new squatch.WidgetApi({tenantAlias:'test_12b5bo1b25125'});
```

_Browserify/Webpack example_

```javascript
var WidgetApi = require('squatch-js').WidgetApi;
var squatchApi = new WidgetApi({tenantAlias:'test_12b5bo1b25125'});
```

_Babel+Browserify/Webpack example_

```javascript
import {WidgetApi} from 'squatch-js';
let squatchApi = new WidgetApi({tenantAlias:'test_12b5bo1b25125'});
``` 

#### upsertUser
Creates/upserts a user.

**Parameters**

-   `params.user` **object** The user details.
    -   `params.user.id` **string** The user id.
    -   `params.user.accountId` **string** The user account id.
    -   `params.user.firstName` **string** The user's first name.
    -   `params.user.lastName` **string** The user's last name.
    -   `params.user.email` **string** The user's email.
    -   `params.user.locale` **string** The user's locale, used for [Internationalization](/themes/internationalization/). The locale must be of the format 'language_COUNTRY' where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.
    -   `params.user.countryCode` **string** The user's two letter ISO 3166-1 Alpha-2 country code.
    -   `params.user.referable` **boolean** Indicates if a user is referable or not. Use this in an upsert to indicate a user is no longer eligible to be referred. 
        -   **Note:** This flag shouldn't be used as part of the initial user upsert of a Referred User as it will override the attribution.
        -   **Spelling Counts:** Make sure that when using this flag you spell it correctly, using a single r. It should always be `referable` or the system will not pick up the value.
    -  `params.user.referredByCodes` **array** This array is used to indicate who referred this user for Growth Automation programs.
    -  <span class="label">Classic Only</span> `params.user.referredBy` **object** This object is used to pass in the referral code using the following fields.
       - `params.user.referredBy.code` **string** is the field in which the referrer's code is added.
       - `params.user.referredBy.isConverted` **boolean** tells the system whether or not the referral should be converted or not.
    - `params.user.referralCodes` **object** This is where you can optionally specify the referral codes for your growth automation programs.
    - <span class="label">Classic only</span> `params.user.referralCode` **string** This string can be optionally used to specify a referral code in a classic program for the user. 
    -   `params.user.segments` **array** A list of operations for adding and removing the user from segments. Details about the supported operators and operations for adding and removing users from a segment can be found in our [User Segmentation](/features/user-segmentation/#saasquatch-api-and-squatchjs-segmentation) article.
    -   `params.user.shareLinks` **object** The primary custom shareLinks for different programs. If a given program does not have a referral code, one will be generated.
    -   `params.user.imageUrl` **string** The user's image, optionally used in widgets, emails, and themes. If you provide an absolute profile image URL the minimum image size is 80px x 80px.
    -   `params.user.dateUsTaxFormSubmitted` **integer** The timestamp of when a user's W-9 tax form was submitted. Used for [W-9 Compliance](/features/w-9-compliance) on your tenant, if configured.
    -   `params.user.customFields` **object** An object containing the custom fields for this user. Learn more about the available custom field functionality in our [Custom Fields Developer Guide](/features/custom-user-fields/).

          **Examples**

          *For Growth Automation Programs:*
          ```javascript 
          user: {                               
            id: 'abc_125',                      
            accountId: 'abc_125',       
            email: 'john@example.com',                
            firstName: 'John',       
            lastName: 'Doe',         
            locale: 'en_US',
            countryCode: 'US',
            imageUrl: 'https://www.example.com/profile/ab5111251125',
            referralCodes: {
              program-id1: 'JOHNDOECODE'
            },
            shareLinks: {
                program-id1: 'http://example.com/free1'
            },
            referredByCodes: [
              "JANEDOE"
            ],
            segments: [
                'sampleSegment'
            ],
            dateUsTaxFormSubmitted: 1619647338270,
            customFields: {
                lastPurchaseDate: 1512152525513,
                plan: 'Pro+',
                phone: 19055551234,
                address: '123 Main st., City, State, Country, H0H0H0',
                shoeSize: 12.5,
                currency: 'USD'
            }
          }
          ```  

          <span class="label">Classic only</span> *For Classic Referral Programs:*
          ```javascript 
          user: {                               
            id: 'abc_125',                      
            accountId: 'abc_125',       
            email: 'john@example.com',                
            firstName: 'John',       
            lastName: 'Doe',         
            locale: 'en_US',
            imageUrl: 'https://www.example.com/profile/ab5111251125',
            referralCode: 'JOHNDOECODE',
            referredBy: {
              code: 'JANEDOE',   
              isConverted: true
            }
          }
          ```
  -   `params.widgetType` The type of widget to be displayed.
      -  For Growth Automation Programs:
         -  `referrerWidget` **string** Widget content that lets people make referrals.
         -  `conversionWidget` **string** Widget content that shows that someone has been referred.
         -  `partnerWidget` **string** Widget content that lets partners refer people into a Partner Program.
      -  For Classic Referral Programs:
         -   `REFERRER_WIDGET` **string** Widget content that lets people make referrals.
         -   `CONVERSION_WIDGET` **string** Widget content that shows that someone has been referred.

        **Examples**

        *Growth Automation Programs:*
          ```javascript
          widgetType: "p/program-name/w/partnerWidget"
          ```
         <span class="label">Classic only</span> *Classic Referral Programs:*
          ```javascript
          widgetType: "REFERRER_WIDGET"
          ```  

  -   `params.engagementMedium` How to display the widget.
      -  `POPUP` **string** Displays the widget as a modal popup. Popups widgets are rendered on top of other elements in a page.
      -  `EMBED` **string** Displays the widget embedded in the page. An EmbedWidget is displayed inline as part of your page.

      **Examples**
      ```javascript
      engagementMedium: "POPUP"
      ```

  -   `params.jwt` **string** the JSON Web Token (JWT) that is used to validate the data (can be disabled)

**Example Request**
```javascript
var initObj = {
  user: {                               
    id: 'abc_123',                      
    accountId: 'abc_123',       
    email: 'john@example.com',                
    firstName: 'John',       
    lastName: 'Doe'  
  },
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UifX0.EZAUeRp3QHEM7rkDrF-eU_-MHIv1nJlUuNGSD5eWUHM'
};

squatch.api().upsertUser(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```

**Returns**

Promise string if true, with the widget template, jsOptions and user details.
#### render
Render an HTML template of the widget.

<div class="bs-callout bs-callout-warning">
<h4>Classic Only</h4>
The render function is a legacy call that is only usable for classic programs
</div>

**Parameters**

  -   `params.user` **object** The user details
    -   `params.user.id` **string** The user id
    -   `params.user.accountId` **string** The user account id

          **Examples**
          ```javascript 
          user: {                               
            id: 'abc_125',                      
            accountId: 'abc_125'
          }
          ```  
  -   `params.widgetType` The type of widget to be displayed.
      -  <span class="label">Classic only</span> For Classic Referral Programs:
         -   `REFERRER_WIDGET` **string** Widget content that lets people make referrals.
         -   `CONVERSION_WIDGET` **string** Widget content that shows that someone has been referred.

        **Examples**

        *Growth Automation Programs:*
          ```javascript
          widgetType: "p/program-name/w/referrerWidget"
          ```
         <span class="label">Classic only</span> *Classic Referral Programs:*
          ```javascript
          widgetType: "REFERRER_WIDGET"
          ```  

  -   `params.engagementMedium` How to display the widget.
      -  `POPUP` **string** Displays the widget as a modal popup. Popups widgets are rendered on top of other elements in a page.
      -  `EMBED` **string** Displays the widget embedded in the page. An EmbedWidget is displayed inline as part of your page.

      **Examples**
      ```javascript
      engagementMedium: "POPUP"
      ```

    -   `params.jwt` **string** the JSON Web Token (JWT) that is used to validate the data (can be disabled)

<span class="label">Classic only</span> *For Classic Referral Programs:*
```javascript
var initObj = {
  user: {                               
    id: 'abc_123',                      
    accountId: 'abc_123'       
  },
  engagementMedium: 'EMBED',
  widgetType: 'REFERRER_WIDGET',
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWJjXzEyMyIsImFjY291bnRJZCI6ImFiY18xMjMifX0.Sor56NRtkKqZKLLOy8177bFee5ukiS2-__R1s34KNOE'
};

squatch.widgets().render(initObj).then(function(response) {
  user = response.user;
}).catch(function(error){
  console.log(error);
}); 
```

**Returns**

Promise template html if true.
#### squatchReferralCookie
Looks up the referral code of the current user, if there is any.

_**Returns** Promise json code referral code if true._

### Static Instance
#### init

Initializes the static `squatch` global. This sets up:

-   `squatch.api()` a static instance of the [WidgetApi](#widgetapi)
-   `squatch.widgets()` a static instance of [Widgets](#widgets)

**Properties**
  -   `tenantAlias` **string** The Tenant that you're using.
  -   `domain` **string** The domain for API. Defaults to `https://app.referralsaasquatch.com`

**Examples**

```javascript
squatch.init({tenantAlias:'test_basbtabstq51v'});
```

**Returns** `void` 
#### api
A static instance of the [WidgetApi](#widgetapi) created when you call [init](#init). Read the [WidgetApi](#widgetapi) docs.

*Returns **[WidgetApi](#widgetapi)** static instance*

#### widgets
A static instance of the [Widgets](#widgets) created when you call [init](#init). Read the [Widgets](#widgets) docs.

*Returns **[Widgets](#widgets)** static instance*
<br></br>
<br></br>
## Methods for Widgets
The following methods can be used to control when and how your widget works. These methods are available for Pop-Up and Embedded Widgets.

#### Widget Open
Pop-Up and Embedded widgets with containers are not displayed automatically. You can open them by using the `widget.open()` function. This also triggers a silent background refresh and updates the widgets data for our widget mint-components.

The following example opens the widget as soon as it's available. 
<pre><code class="lang-js"> 

    testTenantWidgets.upsertUser(initObj).then(function(response) {
        <span><strong>response.widget.open();</strong><span>
    });
</code></pre>

### Widget Close
You can close your widget using the `widget.close()` function. This method is available on both Popup and Embedded widgets.

The following widget example opens the widget and closes it after a 5 second delay. 
<pre><code class="lang-js">

    testTenantWidgets.upsertUser(initObj).then(function(response) {
    response.widget.open();

    setTimeout(function() {

        <span><strong>response.widget.close()</strong><span>

    }, 5000);

    });

</code></pre>