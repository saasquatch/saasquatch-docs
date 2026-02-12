---
title: Setting Up a Domain
highlights: "We've made it simpler to customize your brand's presence with personalized domains. Use our self-serve setup flow to assign a domain you own to all your major participant touchpoints—from emails and share links to your microsite."
slug: building-programs/participant-experiences/configuring-a-custom-domain
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-03-02
robotsTag:
  - FOLLOW
---

> __Before you begin:__ You will need assistance from the person who manages your domain to verify ownership and adjust your DNS settings.

SaaSquatch can use root domains or subdomains that you own for your program’s share links, microsite and emails. After a domain has been set up, it’s available for use in your live and test tenants. We prioritize the live tenant if there’s a conflict between the two. 

Any [full access](/learning-saasquatch/admin-portal/team-member-roles) team member can add and manage new domains, use them for your program, or manage team member [logins and single sign-on (SSO)](/learning-saasquatch/admin-portal/single-sign-on). Program managers can only use domains set up by others.

To set up a domain, you'll need to:
1. Add a domain on the __Organization Settings__ page.
2. Verify that you own the domain and update your DNS settings.
3. Use the domain in your microsite, emails or share links.
    - __Note__: A domain that's used for your microsite can't be reused for share links.

## 1. Add the domain
Full access team members start the process of adding a domain from the __Organization Settings__ page.

1. Sign in to the SaaSquatch Admin Portal.
2. Go to the __Organization Settings__ page by clicking on your company's initials to the left of the tenant selection dropdown.
    - __Note__: The setup flow is also accessible anywhere you can use the domain, including within the email editor, microsite editor, and general settings page.
3. Click __Add Domain__ to go to the domain setup page. Both root domains and subdomains are accepted.
4. Enter the name of the domain you want to use.
5. Select one or more domain configurations.
    - __Note__: Skip this step if you just want to verify that you own the domain. You can return later to configure the domain for email or hosting, if you change your mind.
6. Click __Next__. 

Next, verify that you own the domain and update your DNS records. This step is required before you can start to use the domain for your programs.

## 2. Update your DNS records
__Before you begin__: Ownership verification is required before you can use this domain in your programs. You will need assistance from the person who manages your domain.

1. Verify ownership of the domain by creating or updating a TXT record with the values on-screen.
2. Follow the on-screen instructions to update your DNS settings for hosting authentication, email authentication or both.
3. Return to this page 48 hours after updating your DNS settings and click __Check Status__ to confirm that setup is complete. 
    - __Important__: This step is required before you can start to use your domain. If setup still isn’t complete after 48 hours, then reach out to our [Support team](mailto:support@saasquatch.com) for help with troubleshooting.  
4. Click __Finish__.

## 3. Use your domain
Full access team members and program managers can now use this domain for the microsite, emails or share links.

__Tip__: As a best practice, we recommend using a root domain for your main website and subdomains for your share links and microsite. While either a root domain or a subdomain is acceptable for emails, many clients prefer using a root domain for better brand recognition.   

### Using a domain for a microsite
> __Important:__ Domains used for microsites can’t be reused for share links. Microsites can't use the same domain on both your live and test tenant.

Adding a domain to your microsite will replace the default `saasquatch.app` domain. 

1. Go to the __Content__ page.
2. Click __Edit Settings__ on the microsite card.
3. Make sure site hosting is turned on.
4. Click __Edit__ to the right of the __Hosted domain__ heading.
5. Select your domain from the dropdown list.
    - __Note for program managers__: If you don't see the domain you expected, then contact a full access team member to make sure the domain setup process was completed.
6. Click __Save__.

### Using a domain for emails
Adding a domain to your emails will replace the default email address, `referral@mail.saasquat.ch`.

1. Go to the __Content__ page.
2. Click __Edit emails__ on the emails card to open the editor.
3. Click the name of the email you want to add the domain to.
4. Close the menu to view the editing canvas.
5. Click __Edit__ to the right of the __Contact Information__ heading.
6. Select your domain from the __From address__ dropdown menu.
7. Click __Save__. 

### Using a domain for share links
> __Important__: Domains used for share links can't be reused for microsites. You can use this domain for both your live and test tenant. We prioritize your live tenant if there’s a conflict between the two. 

Adding a domain to your share links will replace the default `.ssqt.co` domain when users send their referral share links. 

1. Go to the __Settings__ page.
2. Click the __General__ tab.
3. Select your domain from the __Primary share link domain__ dropdown menu.
    - __Note__: If you want to set up secondary share links too, then contact our Support team for more information. Secondary share links allow you to add more domains for other brands in your company.
4. Click __Save__.