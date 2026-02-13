---
title: Setting Up Cash Payouts with PayPal
highlights: Learn how to reward your referral program participants with automated cash payouts through PayPal.
slug: integrations/paypal/setting-up-cash-payouts
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-06-16
robotsTag:
  - FOLLOW
---

> __Before you begin__: To set up cash payouts, you need a PayPal business account with access to the PayPal Developer website.

## Overview
SaaSquatch offers the ability to issue cash payouts to your referral program participants via PayPal. The automated payout process is W-9 tax compliant and supports multiple currencies. Cash payouts integrate with your widgets and microsites, making them easy for you to set up and for your participants to use. Check out our doc on [automated cash payouts](/integrations/paypal/cash-payouts) for more details about this feature. 

Follow these steps to set up cash payouts for your rewards.
1. Connect PayPal with SaaSquatch using the setup wizard.
2. Configure your cash payouts settings.
3. Add PayPal components to your widget or microsite.

> __Note:__ PayPal can take up to a week to complete the payout setup process. Unfortunately, we aren’t able to expedite this.

## Connect PayPal with SaaSquatch
> __Before you begin:__ To set up cash payouts, you need a PayPal business account with access to the PayPal Developer website.

1. Log on to the SaaSquatch Admin Portal.
2. Click the __Settings__ page in the top menu bar.
3. Click the __Integrations__ tab.
4. Find the PayPal Payouts integration.
5. Follow the steps in the setup wizard to:
    - Enable payouts in your PayPal account
    - Create a SaaSquatch app in your PayPal settings. Make sure to select the __platform__ app type. 
    - Enter the SaaSquatch app details into the SaaSquatch Admin Portal 

Next, configure your payout settings.

## Set up cash payouts
__Before you begin__: Make sure your business PayPal account is set up to reward in your reward unit's currencies.

1. Select the reward unit that you want to be paid out in cash.
    - __Troubleshooting__: Any Credit reward unit with a PayPal-supported currency is eligible for cash payouts. If you don’t see any eligible reward units, then go to the Rewards page and check the units available under the Reward Units tab. You may need to create a new Credit reward unit and add it as a reward for your program. 
2. Choose the payout schedule.
    - __Note:__ You can set your payout interval as days, weeks or months. The payout schedule follows the tenant time zone you’ve configured in the __Settings__ page.
3. Enter the email addresses of the people you want us to notify if there is an error completing your payout.
4. Review and confirm your selections.

Next, add PayPal components to your widget or microsite.

## Add PayPal components to your widget or microsite
After you’ve configured the PayPal integration in your SaaSquatch and business PayPal settings, make sure you add [PayPal components](/building-programs/participant-experiences/saasquatch-components/) to your program widget or microsite. They allow your participants to connect SaaSquatch with their PayPal accounts. 

PayPal components can be added to the widget or microsite just like any other component. For a refresher on adding components, see:
- [Customizing Program Widgets](/designer/widget-editor/#add-components)
- [Customizing Microsite Layouts and Pages](/building-programs/microsites/customizing-microsites/#add-layout-and-page-content)
    - Note: In addition to standalone PayPal components, there are also PayPal templates available for microsites. 

> __Important__: PayPal components can only be used in [verified access](/topics/widget-types/#verified-access-widgets) widgets or microsites. If you have already set up a program widget or microsite, then you may need to update your installed component packages in order to use PayPal components. 

### Installing the PayPal components package
1. In the Admin Portal, click the __Content__ page in the top menu bar.
2. Open the editor for your widget or microsite.
3. Click __Packages__ in the left sidebar menu.
4. Click __Add Package__.
5. Click __Add__ at the bottom of the PayPal components card.

## Link a PayPal account with SaaSquatch
Next, your participants need to provide SaaSquatch with the email address that’s associated with their PayPal account. This is the final step in the setup process. 

### Instructions for participants
Participants can add their PayPal information independently in most cases. If they need help finding where to do this, you can direct them to:
1. Go to the program’s widget or microsite.
2. Find the PayPal section.
    - For program widgets, this can be a line on the widget or a tab. For microsites, it can be a section on a page or a page of its own.
3. Enter your email address.
4. Click __Save__. 

### Instructions for clients
In some cases, you may need to manually add or update the PayPal email address on a participant’s behalf. 
1. Log on to the SaaSquatch Admin Portal.
2. Click the __Participants__ page in the top menu bar.
3. Find the participant for whom you need to add or update the PayPal email address.
4. Click the participant’s name to open their profile.
5. Click __Edit__ beneath their name.
6. Make the needed changes under the __Custom Fields__ heading. 
