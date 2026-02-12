---
title: Instapage Form Quickstart Guide
highlights: A quickstart guide for leveraging your existing Instapage Forms to automatically add referred signups into your referral program.
slug: guides/instapage-form
sectionType: successArticle
template: hasTableOfContents.html
date: 2019-10-04
---

Using the [Instapage form submit callback](https://help.instapage.com/hc/en-us/articles/205223588-Form-submit-callback) we can identify incoming Referred Users to the SaaSquatch system and create the referral connections.

### Configure Form Fields to Collect
In our example form we are collecting information from `First Name`, `Last Name`, and `Email` form fields. You can also choose to submit additional information from the form like account ID, or locale if that is available. 

Once you know the names of the form fields you would like to pass into the SaaSquatch system to identify the user:

1. Pick a name for the variable, like `form_first_name`
2. Add the name of the variable and the form field you are looking to pickup into the following example:

```javascript
var form_first_name = ijQuery( form ).find( 'input[name="'+ base64_encode( 'First Name' ) +'"]').val();
```

Create additional copies of this line of code for each variable you would like to pass into the SaaSquatch system.

### Configure SaaSquatch User Object
To pass the form information into the SaaSquatch system we map the form variables to the ones in the SaaSquatch system.

In the following example, we are passing in the info from the email address, first name, and last name, through their respective variable names, `form_email`, `form_first_name`, and `form_last_name`:

```javascript
id: form_email,      
accountId: form_email,       
email: form_email,               
firstName: form_first_name,       
lastName: form_last_name
```

You might need to adjust these mappings based on the names you have for each of the variables, and the information you are looking to pass to the SaaSquatch system.

### Configure the SaaSquatch Tenant Alias
The tenant alias for your program determines which of the [live or test tenant](/success/using-referral-saasquatch/#test-vs-live) of your referral program your Instapages form will be sending data to. We recommend making use of your test tenant right up until you are ready to expose your referral program to your customers. More information on when to use which tenant alias can be found in our [Testing Best Practices](/developer/testing) article. 

The following example shows a code snippet with an example test tenant alias:

```javascript
squatch.init({
  tenantAlias: 'test_ae7bygqkh9gag'
});
```

### Building the Final Code Snippet
Once you have each of the above steps completed you can drop them into the following code snippet:

```javascript
&lt;script type="text/javascript">
  window.instapageFormSubmitSuccess = function( form ){
    var form_email = ijQuery( form ).find( 'input[name="'+ base64_encode( 'Email' ) +'"]').val();
    var form_first_name = ijQuery( form ).find( 'input[name="'+ base64_encode( 'First Name' ) +'"]').val();
    var form_last_name = ijQuery( form ).find( 'input[name="'+ base64_encode( 'Last Name' ) +'"]').val();
    //Include squatch.js in your webpage
    !function(a,b){a("squatch","https://d2rcp9ak152ke1.cloudfront.net/assets/javascripts/v2/squatch.min.js",b)}    (function(a,b,c){var d,e,f;c[""+a]={},c[a]={},c[a].ready=function(b){c["" + a].ready =  c["" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);
    squatch.ready(function() {        // when squatch.js is ready to use
      squatch.init({
        tenantAlias: "test_ae7bygqkh9gag"        //configure squatch.js for the tenant you are using
      });
      var initObj = {        //object containing the init parameters for squatch.js
        user: {        //the object for the user you want to upsert                              
          <strong>
          id: form_email,      
          accountId: form_email,       
          email: form_email,               
          firstName: form_first_name,       
          lastName: form_last_name
          </strong>
        }
      };
      //update/register a referral participant without displaying a widget 
      squatch.api().upsertUser(initObj).then(function(response) {
        user = response.user;
      }).catch(function(err){
        console.log(err);
      });
    });
  };
&lt;/script>
```

With the information being collected from the form, the SaaSquatch user object configured, and SaaSquatch tenant alias added you can place the code snippet on your Instapage. This can be done by adding it to the JavaScript code section under the pages Settings menu in the Instapage editor.

### Configure Tenant Security Settings
From the SaaSquatch Admin Portal, navigate to the [Install page](/success/navigating-the-portal/#install). Change the Secure mode to “Custom” and make sure that the “Create/Update User” option is disabled. 
 
This will allow you to submit user information from the Instapages from to the SaaSquatch system without your website having to sign the request using a [JWT](/topics/json-web-tokens/) generated from your SaaSquatch API key. More information about Secure Mode can be found on our [Signed Requests](/developer/squatchjs/signed-requests/) page in our docs.

![Highlighted Disable Upsert Method](/assets/images/contentful/Highlighted_Disable_Upsert_Method_3cldqWUZfigcug4MaiWYGi.png)

### Next Steps 
Congratulations on connecting up your Instapages form to your SaaSquatch Program! For further details about how to go about installing your referral program please check out our [Quickstart Referral Program Install Guide](/guides/referral-quickstart). 

>We also recommend diving deeper into the world of Referral Programs and our platform by reading these documents: 
>
>- Explore more of the configuration options available in the SaaSquatch Portal in our [Using SaaSquatch](/success/using-referral-saasquatch/) article.
>- View a list of all Growth Automation Programs available to you by viewing our [Program Library](/program/library).
