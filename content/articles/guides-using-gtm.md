---
title: Use Google Tag Manager with SaaSquatch
slug: guides/using-gtm
sectionType: guide
template: hasTableOfContents.html
date: 2023-07-21
seoDescription: Quickstart guide for leveraging Google Tag Manager (GTM) to integrate your referral program into your website.
---

This guide outlines the basic steps needed to leverage your existing Google Tag Manager to run your referral program on your website.

## 1. Create a tag

1. Create a new tag.
2. For the tag type, select __Custom HTML__.
3. Drop in the code for the squatch.js init call.

```
<script>

// Include squatch.js
!function(a,b){a("squatch","https://fast.ssqt.io/squatch-js@2",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);

// Push user details for a user who is logged in to your system
window.squatch.ready(function(){    
      squatch.init({
// Your tenant alias can be found under Settings -> General
          tenantAlias: 'test_bpinhag9yagag'
      });
// Define your user object 
let userObj = {
      id: '5678',
      accountId: 'abc',
      email: 'bob@example.com',
      firstName: 'Bob'
}

// Upsert the user to SaaSquatch
squatch.api().upsertUser(userObj);
  });
</script>
```

## 2. Add a trigger

How your signup flow works will change what kind of trigger you will need to use.

In many cases the signup flow makes use of a confirmation page that congratulates the user on their successful signup. For this flow, you can use a trigger of type “Page View” which fires on “Some Page Views”. Select “Page URL contains domain.com/signup_success.html” as the conditional event trigger.

## 3. Add Google Tag manager code to your pages
GTM recommends placing the required code snippet immediately after the opening `<body>` tag on each page. 

This code can be found in the __Admin > Install__ Google Tag Manager section of the GTM portal.