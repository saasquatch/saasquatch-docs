---
title: Squatch.js Advanced Use Cases
slug: developer/squatchjs/v2/advanced-use-cases
sectionType: guide
template: hasTableOfContents.html
date: 2023-11-17
seoDescription: Examples of advanced use cases that the squatch.js V2 library supports. 
---

squatch.js, our JavaScript SDK, has all the functionality required to incorporate a SaaSquatch program into your website or web app. Below are some advanced use cases that you may run into when implementing squatch.js. 

> For a list of key scripts that apply to most or all implementations, check out our [key scripts](/developer/squatchjs/v2) doc. 

## Running multiple referral programs

### Retrieving multiple codes
When you have multiple referral programs with the same landing page and form, you can retrieve information from multiple programs if more than one cookie has been dropped using the [Autofill script](/developer/squatchjs/v2#autofill-script) as this information is kept in a combined JSON array.

#### Retrieving a primary code

The example below uses only one form field and selects which code to use in priority order if multiple codes are present in the combined cookie. 

```
squatch.ready(function () {

  squatch.api().squatchReferralCookie().then(function(response) {

    // Define the heirarchy of desired referral codes 
    // The following will use `primary-program` as default or `secondary-program` if no cookie is found for the former
    document.getElementById('referralCode').value = response.codes['primary-program'] || response.codes['secondary-program']; 

    });
  });
```

#### Retrieving more than one code
The example below uses only one form field and joins all the codes in the array together in a list. 

You may choose not to expose this list to users, but rather pluck out the codes for use in your other calls if users are eligible to be referred to multiple programs.

```
squatch.ready(function () {

  squatch.api().squatchReferralCookie().then(function(response) {

    // Retrieve the full list of codes to capture in a field
    var codesList = Object.values(response.codes);
    if(codesList.length > 0){
       document.getElementById('referralCodes').value = codesList.join(", ");
    }

    // Or simply log the return so you can apply any individual codes for applicable programs
    console.log(codesList);

    });
  });
```

## Multi-program widgets
The squatch.js library provides multi-program support by allowing you to include multiple widgets on the same page, as well as widgets that display information from combined programs.

For example, the following snippets below display program-agnostic widgets with the respective keys of `referrals-widget` & `loyalty-widget`:

```js
<squatch-embed widget="w/referrals-widget"></squatch-embed>
<squatch-popup widget="w/loyalty-widget"></squatch-embed>
```

# Advanced widgets

## Display translated widgets
> **Before you begin**: To display a translated widget, you must first upload [translated content](/features/program-i18n) to the Admin Portal. 
> 
Translated widget content can be displayed to participants in two ways:
- By including a `locale` attribute with the squatch.JS web component
- By including a `locale` value on a participant’s user object

For the best participant experience, we recommend including a `locale` attribute with the web component. This `locale` allows you to serve content to the participant according to their browser language. It temporarily overrides any `locale` value on the user object.  

If a locale value exists on both the user object and in the web component, then the value used in the web component determines which version of the content your participants see. 

__Example:__

```js
<squatch-embed locale="fr_FR" widget="w/myWidget"></squatch-embed>
```

## Preload an embedded widget
> Reduce load times for participants by preloading an embedded widget in the background. 

You can pass a parent container or a query selector to squatch.js, giving you more control on where and how your widget is loaded within your app.  When you pass squatch.js a container or query selector, the embedded widget is shown via a calling method instead of being displayed when loaded. For example, the widget can be loaded and then shown or hidden as a participant navigates your app, instead of re-rendering. 

The widget returned from your call to squatch.js has `.open()` and `.close()` methods to show or hide itself. Calling `.open()` reveals the widget and can trigger a background refresh. Calling `.close()` hides the widget.

The following example applies to popup and embedded widgets with a container or custom query selector. The code opens the widget as soon as it is available:

```js
const initObj = {
	...
	engagementMedium: "EMBED",
	container: "#customcontainer"
}  

squatch.widgets().upsertUser(initObj).then(function(response) {
      response.widget.open();

  });
```

The example below opens the widget as soon as it's available and closes it after a 5 second delay:

```js
const initObj = {
	...
	engagementMedium: "EMBED",
	container: "#customcontainer"
}  

squatch.widgets().upsertUser(initObj).then(function(response) {
  response.widget.open();
  setTimeout(function() {
      response.widget.close()
    }, 5000);

  });
``` 

# Legacy object-based squatch.js
squatch.js supports uploading user data by using a user object within the widget and tracking scripts. This user object should ideally be sent along with a [signed JWT](/topics/json-web-tokens/) for a fully secure implementation. 

> Information about our current widget and tracking scripts can be found in our [Key squatch.JS Scripts doc](/developer/squatchjs/v2).

## Register participants

```js
<script>
// Include squatch.js loader script in your website
!function(a,b){a("squatch","https://fast.ssqt.io/squatch-js@2",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);

// Wait for squatch.JS to be ready
squatch.ready(function(){

  // Configure squatch.js for the tenant you are using 
  // Compare this with setting up your environment with `squatchTenant`
  squatch.init({
    tenantAlias: 'test_aym93okveuya4'
  });

  // Object containing the init parameters for squatch.js
  var initObj = {

    // The object for the user you want to upsert
    user: {                               
      id: 'legacy.user@example.com',      
      accountId: 'legacy.user@example.com',       
      email: 'legacy.user@example.com',               
      firstName: 'Legacy',       
      lastName: 'User',
      locale: 'en_US',
      customFields: {
        companyName: "Legacy Inc.",
        phoneNumber: "(555) 555-5555"
          }            
      },

    // Include your JWT here (compare this with setting up your environment with `squatchToken`)
    // Exclude the JWT entirely if secure mode is disabled 
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoibGVnYWN5LnVzZXJAZXhhbXBsZS5jb20iLCJhY2NvdW50SWQiOiJsZWdhY3kudXNlckBleGFtcGxlLmNvbSIsImVtYWlsIjoibGVnYWN5LnVzZXJAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJMZWdhY3kiLCJsYXN0TmFtZSI6IlVzZXIiLCJsb2NhbGUiOiJlbl9VUyIsImN1c3RvbUZpZWxkcyI6eyJjb21wYW55TmFtZSI6IkxlZ2FjeSBJbmMuIiwicGhvbmVOdW1iZXIiOiIoNTU1KSA1NTUtNTU1NSJ9fX0.lr2rIVjUYByOFRZ0mIRHgu3nan1g0ryhG4WJB00ClWU"

  };

  // Make the call to create/update your user
  squatch.api().upsertUser(initObj).then(function(response) {
    user = response.user;
  }).catch(function(error){
    console.log(error);
  });

});
</script>
```

## Render a widget

```js 
<script>
// Include squatch.js loader script in your website
!function(a,b){a("squatch","https://fast.ssqt.io/squatch-js@2",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);

// Wait for squatch.JS to be ready
squatch.ready(function(){

  // Configure squatch.js for the tenant you are using 
  // Compare this with setting up your environment with `squatchTenant`
  squatch.init({
      tenantAlias: 'test_aym93okveuya4'
  });

  // Object containing the init parameters for squatch.js
  var initObj = {

  // The object for the user you want to render the widget for
  user: {                               
      id: 'legacy.user@example.com',      
      accountId: 'legacy.user@example.com',       
      email: 'legacy.user@example.com',               
      firstName: 'Legacy',       
      lastName: 'User',
      locale: 'en_US'
      },

  // Define the type of widget you want to display, you may also choose to display a `POPUP`
  engagementMedium: 'EMBED',

  // Define the widget you want to display by ID string (program-bound only, requires widget type)
  widgetType: 'p/example-program/w/referrerWidget',

  // Include your JWT here (compare this with setting up your environment with `squatchToken`)
  // Exclude the JWT entirely if secure mode is disabled
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoibGVnYWN5LnVzZXJAZXhhbXBsZS5jb20iLCJhY2NvdW50SWQiOiJsZWdhY3kudXNlckBleGFtcGxlLmNvbSIsImVtYWlsIjoibGVnYWN5LnVzZXJAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJMZWdhY3kiLCJsYXN0TmFtZSI6IlVzZXIiLCJsb2NhbGUiOiJlbl9VUyJ9fQ.IAZuGUCf5v9Bd0CFnVprFciqlrTYBd9PfMaYbKY1r-o'

  };

  // Update/register a referral participant and display a widget
  squatch.widgets().upsertUser(initObj).then(function(response) {
    user = response.user;
  }).catch(function(error){
    console.log(error);
  }); 

});
</script>

      <!-- Include the widget in the body of your page as an embed -->
      <div class="squatchembed"></div>
      <!-- Or as a CTA popup -->
      <button class="squatchpop">Click me!</button>
``` 

# Learn more
- [Key squatch.js Scripts](/developer/squatchjs/v2): See general examples of the most important scripts you’ll need when implementing a SaaSquatch program. 
- [Signed Requests](/developer/squatchjs/signed-requests): Learn how to require a JWT or an API key when sending data to SaaSquatch. 
- [Tracking Cookies](/developer/squatchjs/cookies): Learn more about squatch.js and first-party cookies. 
- [Issue Code List](/developer/squatchjs/issue): Find details and troubleshooting steps about error codes you encounter.
- [squatch.js Reference](https://saasquatch.github.io/squatch-js/pull/58/): Full list of methods available. 