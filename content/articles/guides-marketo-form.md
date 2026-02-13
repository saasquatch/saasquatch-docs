---
title: Marketo Form Quickstart Guide
highlights: The guide will show you how to leverage your existing Marketo Forms to automatically add referred signups into your referral program.
slug: guides/marketo-form
sectionType: successArticle
template: hasTableOfContents.html
date: 2019-10-04
---

### Include SaaSquatch Library on the Page

The SaaSquatch [squatch.js library](/developer/squatchjs/) is used to power the referral program tracking script. Load this library by adding the SaaSquatch Library code snippet to the `<body>` tag page you have the Marketo form on:

```javascript
<script>!function(a,b){a("squatch","https://d2rcp9ak152ke1.cloudfront.net/assets/javascripts/v2/squatch.min.js",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);</script>
```

### Configure Code Snippet
As the Marketo form and SaaSquatch code snippets are each unique to you there will be certain customizations that need to be made to make sure all the correct form fields get picked up and passed in to the SaaSquatch system.

#### Marketo Snippet
Marketo will provide you with a JavaScript code snippet to drop on the page where you would like the form to be displayed. We will be adding some SaaSquatch code into this snippet Marketo has provided to enable you to identify users to the SaaSquatch system right from the form.

**Example Marketo Snippet:**
```
<script src="//app-sjst.marketo.com/js/forms2/js/forms2.js"></script>
<form id="mktoForm_1057"></form>
<script>
  MktoForms2.loadForm("//app-sjst.marketo.com", "785-UHP-775", 1057, function(form){
  
  //SaaSquatch code will go here
    
  });
</script>
```

#### Configure Form Field Names
Depending on the names of the fields in your form the SaaSquatch code you will configure might be slightly different from the following example. In our example form we have fields named `First Name`, `Last Name`, `Email`. The variables for these form fields are in upper camelCase, and so will look like:
- First Name -> `FirstName`
- Last Name -> `LastName`
- Email -> `Email`

You can easily include other fields you want to pass to the SaaSquatch system (like account ID if you collect that value) by following the camelCase naming convention: `TwoWords` or `FirstSecond`

**Example form field variables:**
```
initObj.user.id = vals.Email;
initObj.user.accountId = vals.Email;
initObj.user.email = vals.Email;
initObj.user.firstName = vals.FirstName;
initObj.user.lastName = vals.LastName;
```

#### Configure SaaSquatch Tenant Alias
The tenant alias for you referral program determines which of the [live or test tenant](/success/using-referral-saasquatch/#test-vs-live) of your referral program your Marketo form will be sending data to. We recommend making use of your test tenant right up until you are ready to expose your referral program to your customers. More information on when to use which tenant alias can be found in our [Testing Best Practices](/developer/testing) article. 

The following example shows configuring your Marketo code snippet with an example test tenant alias.
```
squatch.init({
  tenantAlias: 'test_ae7bygqkh9gag'
});
```

### Add SaaSquatch Snippet into Marketo Form Code
The form variables and SaaSquatch tenant alias can now be substituted into the SaaSquatch code snippet:

<pre><code>form.onSuccess(function(values, followUpUrl) {

  //get the form field values
  var vals = form.vals();
  window.squatch.ready(function(){

    //configure squatch.js for the tenant you are using
    <strong>squatch.init({
      tenantAlias: 'test_ae7bygqkh9gag'
    });</strong>

    //object containing the init parameters for squatch.js
    var initObj = { user: { } };
    
    <strong>initObj.user.id = vals.Email;
    initObj.user.accountId = vals.Email;
    initObj.user.email = vals.Email;
    initObj.user.firstName = vals.FirstName;
    initObj.user.lastName = vals.LastName;</strong>

    squatch.api().upsertUser(initObj).then(function(response) {
      user = response.user;
    }).catch(function(error){
      console.log(error);
    })
  });
  
  setTimeout(function() { waitForSquatch(); }, 1500);

  function waitForSquatch(){
    location.href = followUpUrl;
  }

  return false;
  
});
</code></pre>

Now drop the configured SaaSquatch code snippet into your Marketo form code snippet:

<pre><code>
  &lt;script src="//app-sjst.marketo.com/js/forms2/js/forms2.js">&lt;/script>
&lt;form id="mktoForm_1057">&lt;/form>
&lt;script>
  MktoForms2.loadForm("//app-sjst.marketo.com", "785-UHP-775", 1057, function(form){
  
  //SaaSquatch code goes here
    
  });
&lt;/script>
</code></pre>

### Configure Tenant Security Settings
From the SaaSquatch Admin Portal, navigate to the install page. Change the Secure mode to “Custom” and make sure that the “Create/Update User” option is disabled. 
 
This will allow you to submit user information from the Marketo from to the SaaSquatch system without your website having to sign the request using a [JWT](/topics/json-web-tokens/) generated from your SaaSquatch API key. More information about Secure Mode can be found on our [Signed Requests](/developer/squatchjs/signed-requests/) page in our docs.

![Highlighted Disable Upsert Method](/assets/images/contentful/Highlighted_Disable_Upsert_Method_3cldqWUZfigcug4MaiWYGi.png)

### What's next? 
Congratulations on connecting up your marketo form to your Referral Program! For further details about how to go about installing your referral program please check out our [Quickstart Referral Program Install Guide](/guides/referral-quickstart). 

> Explore more of the configuration options available in the SaaSquatch Portal in our [Using Referral SaaSquatch](/success/using-referral-saasquatch/) article.
