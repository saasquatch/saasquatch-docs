---
title: Sending Data From HubSpot Forms to SaaSquatch
slug: integrations/hubspot/sending-data-from-hubspot-forms
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-04-21
seoDescription: Once you’ve integrated SaaSquatch with HubSpot, you can start to automatically track referrals with HubSpot forms.  Referrals are tracked by placing a cookie on the website that your referral form is on. Clients using other setups will need to add squatch.js to their landing page.  
robotsTag:
  - FOLLOW
---

> This feature is only available for the current version of the SaaSquatch platform. If your program was created before April 2019 and you're interested in this feature, reach out to our [Success team](mailto:success@saasquatch.com) to chat about upgrading. 

Once you’ve integrated SaaSquatch with HubSpot, you can start to automatically track referrals with HubSpot forms.  Referrals are tracked by placing a cookie on the website that your referral form is on. Clients using other setups will need to add [squatch.js](/developer/squatchjs/v2) to their landing page.  

__Before you begin:__ An active HubSpot integration is required to send data from HubSpot Forms to SaaSquatch. Check out our doc on [integrating HubSpot with SaaSquatch](/integrations/hubspot/integrating-with-saasquatch)  to get started. 

1. In HubSpot, create a lead capture form.
    - Skip this step if you have an existing lead capture form you want to use.
2. Make sure your form contains a field for `ssqt_referralcookies`. We recommend hiding this field from the interface.
3. Save your changes and exit.
4. In the SaaSquatch Admin Portal, go to __Settings > Install__ and view the __Use referral cookies__ card.
5. Choose whether the lead capture form will go onto a <a href="#hubspot-landing-page">HubSpot landing page</a> or <a href="#custom-landing-page">a custom landing page</a>.
7. *(Optional)* Submit test information to the form to confirm that the form is properly attributing referrals. Make sure that: 
    - The lead is created as a new SaaSquatch participant, if you’re using this data sharing rule
    - The contact in HubSpot contains SaaSquatch properties like referral code, share link and message links

<br>

<p id="hubspot-landing-page"><b>If you're using a HubSpot landing page:</b></p>

*Note: Not all HubSpot landing pages support adding custom code. If yours does not, then you’ll need to use another type of landing page.*

1. Copy the loader script.
2. In HubSpot, go to your landing page’s settings.
3. Expand Advanced Options.
4. In the Additional code snippets box, add the loader script.
5. Return to SaaSquatch and copy the squatch.js code snippet. 
6. Return to HubSpot and paste the squatch.js code snippet below the loader script.

<br>

<p id="custom-landing-page"><b>If you're using a custom landing page</b></p>

1. Paste the loader script in your landing page.
2. Paste the squatch.js code snippet in your landing page.
3. In HubSpot, go to your form settings.
4. Click Embed and find the `region`, `portalId`, and `formId` values.
5. Paste them into the squatch.js code snippet. There are instructions in the script to show you where to add this information.