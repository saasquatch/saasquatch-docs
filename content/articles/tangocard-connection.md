---
title: Connect Your Tango Card Account to SaaSquatch
highlights: Learn how to connect your Tango Card gift card account to SaaSquatch.
slug: tangocard-connection
sectionType: successArticle
template: hasTableOfContents.html
date: 2022-09-28
tags:
  - Guide
---

# Tango Card overview
Tango Card offers the ability to reward your participants with a number of different gift cards. Using Tango Card gift cards in your program makes it easy to set up and manage rewards. 

__Note__: All test tenants are set up with the SaaSquatch Tango Card sandbox account. This allows you to test the reward flow without additional configuration. Your own Tango Card account can only be configured in your live tenant. 

## Tango Card account types
There are two types of Tango Card accounts: direct accounts and Saasquatch-managed sub-accounts.

__Direct Tango Card account__: Direct Tango Card accounts offer the most functionality and control within Tango Card. As of 2020 we recommend all clients create a direct Tango Card account to use with SaaSquatch. 

__SaaSquatch managed sub-account__: Sub-accounts have access to the basic Tango Card functionality, however there are more restrictions and less control over managing the account. As of 2020 we do not recommend using a sub-account. 

> Not sure which Tango Card account to use? Contact your Solutions Architect or Launch Manager for advice. 

# Connect your direct Tango Card account to SaaSquatch
If you were onboarded with SaaSquatch after 2020, you will most likely have your own Tango Card Rewards Genius login with full control over your users, funding, reporting, orders, and most importantly, Groups and Accounts. 

Follow the instructions below to ensure that the correct Account from the correct Group is funding your SaaSquatch rewards.

1. Head to your SaaSquatch account.
2. In the upper left corner of your SaaSquatch account, select your Live tenant from the dropdown menu.
3. Click Settings in the upper header of your SaaSquatch account.
4. Select Integrations in the secondary header.
5. Scroll down to the Tango integration and click the down arrow to expand the integration view.
6. Enter your Tango Card account information:
    - __Account Identifier__
    - __Group Identifier__
    - __Tango Card Username__
    - __API Key__ (see [Tango Card's doc](https://help.rewardsgenius.com/en/articles/3326541-how-to-access-api-keys) on how to locate it)
    - __Referrer Template ID__ (Classic only)
    - __Referred Template ID__ (Classic only)
![Tango Card - Direct Account_v2](/assets/images/contentful/Tango_Card_-_Direct_Account_59XpHj2oV4TZ6nKQxaWyOb.png)
7. Click __Connect__ at the bottom of the Tango Card integration section to save and connect your account.

# Connect your SaaSquatch-managed TangoCard Account
1. Head to your SaaSquatch account.
2. In the upper left corner of your SaaSquatch account, select your Live tenant from the dropdown menu.
3. Click __Settings__ in the upper header of your SaaSquatch account.
4. Select __Integrations__ in the secondary header.
5. Scroll down to the Tango integration and click the down arrow to expand the integration view.
6. Enter your TangoCard Account information:
    - Account Identifier 
    - Group Identifier
    - Referrer Template ID (Classic only)
    - Referred Template ID (Classic only)
7. Click __Connect__ at the bottom of the Tango Card integration section to save and connect your account. 

![Tango Card - Hosted Sub Account_v2](/assets/images/contentful/Tango_Card_-_Hosted_Sub_Account_798biGQfQhsWnlM0G9zHoC.png)

# Configure your Tango Card emails
Tango Card offers the ability to customize the  email that is sent with each gift card reward. To keep track of which customized email is sent with each reward, they use an Email Template ID (ETID) that can be included on each reward. 

1. Within your Tango Card account, create an email template. If you need help, see Tango Card’s [Email Templates FAQ](https://help.rewardsgenius.com/s/article/EmailTemplatesFAQ).
2. Copy your Email Template ID (ETID). 
    - The ETID should follow this format: `Exxxxxxx`.
3. Head to your SaaSquatch account.
4. In the upper left corner of your SaaSquatch account, select your Live tenant from the dropdown menu.
5. Click __Rewards__ in the upper header of your SaaSquatch account.
6. Select an existing gift card reward, or create a new gift card reward. 
7. Paste the ETID value from the previous step into the __Custom Tango Card Email Template ID__ field. 
8. Click __Save__ to save your changes. 

Now, when the gift card is earned, the custom email you have set up will be sent to the participant. 
