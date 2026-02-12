---
title: HubSpot Integration Overview
slug: integrations/hubspot/overview
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-04-21
seoDescription: Our native HubSpot integration automatically shares participant referral data between the two platforms. By connecting your SaaSquatch participants to contacts in HubSpot, you’ll be able to run powerful customer marketing programs that reward behaviors tied to your sales or marketing process.
robotsTag:
  - FOLLOW
---

> __Important:__ This feature is only available for the current version of the SaaSquatch platform. If your program was created before April 2019 and you're interested in this feature, reach out to our [Success team](mailto:success@saasquatch.com) to chat about upgrading. 

Our native integration with HubSpot automatically shares data between SaaSquatch and your HubSpot Sales and Marketing Hubs. After set-up, HubSpot will be able to send referral tracking, deal stage, and contact information directly to SaaSquatch. Important SaaSquatch properties like referral codes, share links, and more will be visible on contact records. You can also set up a HubSpot lead capture form that sends referral data to SaaSquatch.

The HubSpot integration supports:
- Linking contacts with participants
- Tracking referrals in HubSpot
- Sending personalized referral marketing emails to HubSpot contacts
- Triggering rewards or other goals and actions in SaaSquatch when a HubSpot deal changes status (for example, when deal status changes to Closed Won). 

If you’re ready to set up this integration, check out our [instructional guide](/integrations/hubspot/integrating-with-saasquatch)—or read on for an overview of the integration features. Our [integration behaviors](/integrations/hubspot/integration-behaviours) doc has you covered if you’d like more detailed information about data sharing and event handling. 

## Link contacts with participants
Linking contacts with participants gives you access to SaaSquatch-specific information within the HubSpot contact record. 

One referral program can be connected with HubSpot at a time. The program you select acts as the source of three new contact properties: referral code, share link and message links. When you set up the integration, we send those program-specific properties to HubSpot. We also send four participant-specific properties: referred-by code, SaaSquatch user and account ID, and referral cookie.

By default, the integration shares data between platforms when a HubSpot contact is updated or a SaaSquatch participant is created or updated. The near real-time data sharing means that you always have updated, accurate information at hand in HubSpot. 

For detailed information about how we link participants with contacts and share data between platforms, see our [integration behaviors](/integrations/hubspot/integration-behaviours) doc. 

## Track referrals in HubSpot
Once SaaSquatch and HubSpot are linked, referrals can be tracked directly in HubSpot and displayed on our custom CRM cards on each contact record. The integration offers two ways of tracking referrals: referral cookies and referral codes.

[Referral cookies](/developer/squatchjs/cookies/) allow automatic referral tracking. If you’re already using HubSpot forms or landing pages, then you can add a squatch.js script that sends new referral information to SaaSquatch using the referral cookies field. Check out our instructions on sending HubSpot form data to SaaSquatch if this sounds like a good fit for your implementation. 

Referral codes offer a way to track referrals manually. For example: you’re speaking with a prospect who verbally informs you that they were referred by an existing contact. You can give the existing contact credit for the referral by adding their unique referral code to the prospect’s contact record. When participants are connected using referral codes, this data will be shared between SaaSquatch and HubSpot in alignment with your dating sharing rules. 

## Send personalized referral marketing emails
Use HubSpot to expand the reach of your program promotion by engaging with your contacts regularly outside of your existing SaaSquatch program emails. 

Program emails sent through SaaSquatch are transactional: they notify your participants when a referral converts, they earn a reward, or they meet another goal. By using HubSpot’s email marketing features, you can promote your program to all of your contacts, not just those who are actively referring. Marketing emails that use merge tags to include a participant’s referral code and share link make it simple for you to keep your referral program top-of-mind for your audience. You can also add their message links to encourage quick and easy referral sharing to specific platforms and socials:

- Facebook
- Facebook Messenger
- WhatsApp
- Twitter
- Email
- Line Messenger
- LinkedIn
- Pinterest

## Trigger rewards or other program goals and actions
To get the most out of the integration, we recommend updating your program to perform actions, like rewarding referrers, based on the event data HubSpot sends to SaaSquatch. 

After your HubSpot contacts are linked to SaaSquatch participants, the integration can automatically send event data to SaaSquatch  whenever a deal associated with that contact changes status. This event data can be used in your program rules. For example, you can create a program rule that rewards the referrer and the person they referred after a deal’s status changes to closed-won. Moving forward, whenever we receive a deal status change event, we’ll reward the referrer and referred user. 

> For important event handling information, see our [integration behaviors](/integrations/hubspot/integration-behaviours) doc. 

## Ready to get started? 
Check out our [setup guide](/integrations/hubspot/integrating-with-saasquatch) for more information about how to set up the integration and use it in your program. 