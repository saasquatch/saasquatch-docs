---
title: Participant Experiences
slug: features/end-user-experiences
sectionType: designerArticle
template: hasTableOfContents.html
date: 2023-05-17
seoDescription: Participants in your loyalty and referral programs can interact with your program through a SaaSquatch widget or microsite. This guide outlines the templates available in the visual editor and explains the component libraries that power them.
robotsTag:
  - FOLLOW
---

## Overview
Participants in your loyalty and referral programs can interact with your program through a SaaSquatch widget or microsite. Widgets and microsites emphasize the value of your program and strengthen your brand’s presence. They give your participants access to unique program benefits, like [Reward Exchange](/features/reward-exchange), [leaderboards](/features/leaderboards), and [cash payouts](/integrations/paypal/cash-payouts). 

The __Content__ tab in the Admin Portal is where you can create and manage widgets and microsites. It's home to the visual editor, which lets you adjust the content and appearance of your widget or microsite. There are a variety of widget and microsite templates available here to get you started, or you can create one from scratch.

The visual editor is powered by our three component libraries: *mint, vanilla* and *bedrock*. You don’t need to know how these work to build a beautiful and effective widget or microsite, but some templates require the latest version of a component library to work properly. For clients who’d like to use their own component library, we offer custom component library uploads. 

> This guide outlines the templates available in the visual editor and explains the component libraries that power them.  For instructional content about using the visual editor to build widgets and microsites, see our docs under __Building Programs > Program Widget__ and __Building Programs > Microsites__. 

## Widget templates
There are several templates available for your widgets. 

### Instant access templates
Designed for ecommerce and retail clients, instant access widgets provide your participants and their referred friends with an easy way to engage with your referral program—no password or authentication required. 

#### Website referral widget
Streamline your e-commerce or retail referral programs and give your participants quick access to their personal share links and referral codes. This template includes a call to action, brief program explainer, and space for the participant to provide their email address.

![website referral widget](/assets/images/contentful/website_referral_widget_4lUu6tir4dhUDAHN3PgsPw.png)

#### Friend widget
Make it easy for your participants to claim their rewards by providing their email. This template includes a call to action, brief explainer of how the reward can be used, and space for the participant to provide their email address.

![friend widget](/assets/images/contentful/friend_widget_128WYPBXqrcfYR1vkAQiKJ.png)

### Verified access templates
Verified access widgets provide a robust experience for your referral or loyalty participants, including their reward and referral history, Reward Exchange or PayPal cash payouts, and other features. To protect your participants’ personal information, we recommend displaying this widget only to those who have signed in to your product.

#### Referral and loyalty widget

Empower participants to earn rewards by referring friends and completing program goals. Clients can use the *Referral and loyalty widget with PayPal* template to create a participant experience that allows for cash payouts. 

This template includes: 
- Share mediums (referral link, referral code and social media buttons)
- Program explanation
- Task cards (progress indicators for program goals)
- Referral history
- Reward history
- Participant’s referral and reward statistics

![referral and loyalty widget](/assets/images/contentful/referral_and_loyalty_1X5Nl8a2co1IGGf0m79qe0.png)

#### Referral widget
Empower participants to refer their friends and track the status of their referrals and rewards. This template includes:
- Participant statistics, like referrals made and rewards earned
- Brief program explainer
- Task cards
- Easy access to share links and message links
- Referral and reward history

![referral widget](/assets/images/contentful/referral_widget_6SZ0dM0shgrtm4mCovpBOG.png)

#### Loyalty widget
Reward participants for completing program goals. This template includes: 
- Participant statistics, like points balance and points redeemed
- Brief program explainer
- Tasks cards
- Reward history

![loyalty widget](/assets/images/contentful/loyalty_6GHFxnm7CrWH4gEJHGFOEB.png)

## Microsite templates
Microsites are purpose-built miniature websites that only give participants access to program information. They’re built using the visual editor. Each microsite supports having multiple pages. When you use auto setup to create a microsite, we set up a basic site structure with distinct layouts and pages for signed in and signed out participants. We provide additional layout and page templates for clients who want to add more to their site.

> __Tip:__ See our docs under __Building Programs > Microsites__ for more info about what layouts and pages are, and how they can be branded.

### Layout templates
Layouts are containers for microsite pages. You can add components that you want to appear consistently across all pages within the layout—like headers and banners. Our auto setup microsites come with pre-made layouts, but you can add more. The three templates are: *Base Layout* for overall content, *Logged In Layout* for signed-in participants, and *Logged Out Layout* for public access.

### Page templates
We offer a variety of page templates as well.

#### Dashboard page

This page acts as the dashboard for logged in participants within your microsite. It includes:
- Program explainer section
- Program statistics
- Referral code and share links
- Share buttons

Clients offering PayPal cash payouts can use the *Dashboard with PayPal* version of this template. 

![microsite dashboard page template](/assets/images/contentful/dashboard_1BBm39jXwXsgK2en5CJoDB.png)

#### Activity page
The activity page is a one-stop shop for participants’ program activity within your microsite. It includes program statistics and a referral history table.

![microsite activity page template](/assets/images/contentful/activity_2MfUIaIfBMDxwF3J7Dofr0.png)

#### Account management pages
We also offer templates for pages that participants encounter when performing different site functions. These are included by default in an auto setup microsite, but can be adjusted. The account management templates are:
- Edit profile page
- 404 page
- Email verification page
- Forgot password page
- Login page
- Logout page
- Registration page
- Reset password page
- Verify email page

## Component libraries
Components are the individual building blocks, like hero images and task cards, that make up your widget or microsite. All of our current templates are powered by our mint and bedrock components libraries. 

### Mint components
Widgets and microsites built with mint components provide participants with SaaSquatch’s latest experiences.

Clients with widgets created prior to August 2022 may be using an older version of mint components, or our previous component library, vanilla components. You can manually check to make sure you’re using the current component library, and update your library if needed. 

To upgrade to mint components for your program widget:
1. Sign in to the SaaSquatch Admin Portal.
2. Go to the __Content__ tab.
3. Click __Edit widgets__ on the widgets card.
4. Click the name of the widget you want to edit.
5. Click __Settings__ at the bottom left of the page.
6. Click __+ Add package__.
7. Click __+ Add__ on the mint components card.
8. Click __Save__ at the top right of the page.

To upgrade to mint components for your microsite:
1. Sign in to the SaaSquatch Admin Portal.
2. Go to the __Content__ tab.
3. Click the __Edit settings__ button on the microsite card.
4. Under the *Site Hosting* heading, click the __Edit__ button next to *Packages*.
5. Click __+ Add Package__.
6. Click __+ Add__ on the mint components card.
7. Click __Save__.

### Bedrock components
All templates powered by mint components also have the bedrock component package installed. Bedrock components can’t be seen by participants, but they offer the ability to add advanced logic to your design.  They can conditionally show other components and define which program a component sources data from.  You can find the bedrock components package in the advanced components section within the Add menu.

There are two components in the bedrock component package: 
1. Conditional section
2. Program section

The *conditional section* component lets you to include conditional content based on a participant’s email, segment, or a custom field. Insert a JSONata expression in the Condition box to set the display conditions. 
The program section component allows you to override the program ID of its child components. Use it when you want to display content that isn’t linked to a specific program.

The *program section* component allows you to override the program ID of its child components. Use it when you want to display content that isn’t linked to a specific program.

### Custom component libraries
To further customize your user experience, you can bring in your own components. These components can be added to any template and used alongside SaaSquatch built components.

SaaSquatch widgets use standard HTML and web components. To use your own components in our widget editor, they must be written as web components. For more on building web components for SaaSquatch widgets, check out our article Writing a Web Components for SaaSquatch.

To begin building your widget with custom components, install your custom package:
1. From within the visual editor, click __Settings__ in the left-hand menu.
2. Click __+ Add Package__.
3. Click __+ Add from NPM__.
4. Enter the package name, version and file path.
5. Click __+ Add__.

Your users will not see any package related changes until you save your widget.

## If you need help...
Reach out to our [Support team](mailto:support@saasquatch.com) if you’re stuck and need some help with finding, using or personalizing our widget and microsite templates. We’re here to help! 
