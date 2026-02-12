---
title: Hubspot Quickstart Guide
highlights: A quickstart guide for setting up your referral program using Hubspot.
slug: guides/hubspot
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-03-23
robotsTag:
  - noindex
---

This guide outlines the basic steps needed to leverage your existing Hubspot Webpages to run your referral program.

Additional information about our drag-and-drop installation solution can be found in our [Referral Program Install Guide for Marketers](/guides/morp-install).

### Adding the SaaSquatch Code Snippet
In order to display the widget and trigger when you want to convert the referral you will need to add the SaaSquatch code snippet to your Hubspot pages.

To add the code to your [Hubspot Webpages](https://knowledge.hubspot.com/website-user-guide/how-to-create-and-edit-website-pages), select the Website Pages item from the Content Drop-down in your Hubspot Portal.

>**Note:** If your lead capture page is setup as a Hubspot Landing Page you will find it listed under the [Landing Pages](https://knowledge.hubspot.com/articles/kcs_article/cos-general/how-can-i-edit-my-landing-page-template) item from the Content Drop-down menu in your Hubspot Portal.

You will need to repeat the following steps for each of the Hubspot pages you setup a URL rule for in the SaaSquatch portal.

1. Select the edit option for the page you would like to add the code to
2. Add a new "Custom HTML" module onto an available space on the webpage layout:
<br /><br />
  ![Custom HTML Module](/assets/images/contentful/Custom_HTML_Module_2GKGVChBVmqwqWUKq0WAcs.gif)
<br /><br />
4. Edit the Custom HTML module and paste the following SaaSquatch code snippet into the Custom HTML mdule text field that appears. 
  
  **Code Snippet Template:**
  
  <pre><code class="lang-js">&lt;script>!function(a,b){a("squatch","https://fast.ssqt.io/squatch-js@2",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]={},c[a].ready=function(b){c["_" + a].ready =  c["_" + a].ready || [];c["_" + a].ready.push(b);},e=document.createElement("script"),e.async=1,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);squatch.ready(function(){squatch.init({tenantAlias:"<span><strong>YOUR_TENANT_ALIAS_HERE</strong></span>"});squatch.widgets().createCookieUser({});});&lt;/script>
</code></pre>

  >**Note:** Make sure to replace `YOUR_TENANT_ALIAS_HERE` with your test tenant alias when you paste the following Tracking Script code snippet onto your the webpage. You can find your **Tenant Alias** on the install page inside the SaaSquatch portal
  
  **Example:**
  
  ![Custom HTML snippet](/assets/images/contentful/Custom_HTML_snippet_3M9Rm9kEHC2AGWQO0qe8u2.png)
  
6. Click "Save and go to module list"

Repeat this process for each of the Hubspot Webpages that you setup a URL for inside the SaaSquatch portal.

> #### Program Configuration
> Before launching your referral program you will need to configure where to display the widget and when to trigger converting completing a referral. This configuration can be done in the SaaSquatch Portal.
> 
> A complete walkthrough of this process can be found in our [Integration Configuration Article](/guides/integration-quickstart).

### What's next? 
Congratulations on setting up your Referral Program! Although this is super exciting, this is also just the beginning of growing your userbase and revenue. We recommend diving deeper into the world of Referral Programs and our platform by reading these documents: 

- Explore more of the configuration options available in the SaaSquatch Portal in our [Using Referral SaaSquatch](/success/using-referral-saasquatch/) article.
- Learn more about how to protect your referral program against unwanted referral activity by reading up on our [Security Management System](/success/referral-security/).
- Our [SaaS Guide](/guides/saas-intro/) provides details, examples and further detail on how to integrate the SaaSquatch referral program in your product.
