---
title: Setting Up Login Rules and Single Sign-On (SSO)
highlights: Making accessing your SaaSquatch referral and loyalty programs even easier by setting up SSO or Google OAuth.  We support SSO integration for most major Identity Providers, including Okta, Azure, SAML and OneLogin.
slug: learning-saasquatch/admin-portal/single-sign-on
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-03-01
robotsTag:
  - FOLLOW
---

SaaSquatch offers three sign-in methods: email and password, Google OAuth and SSO. 

By default, team members sign in with an email address and password. Full access team members can update these settings to allow signing in with Google OAuth or SSO. They may also create login rules to enforce a specific sign-in method, e.g., requiring all team members to use SSO after it’s been set up. 

To start signing in with Google OAuth or SSO, you'll need to tell us which domain you want to use and then verify that you own it. This helps us identify that the person logging into SaaSquatch is a part of your organization and eligible to use Google OAuth or SSO. There are a few steps you'll need to take in the SaaSquatch Admin Portal to finalize the process. 

> Before you begin: You will need assistance from the person who manages your domain in order to verify domain ownership.  Ownership verification is required before you can set up login rules or SSO.  

## 1. Add the domain and verify ownership
Before you can set up login rules or SSO, you’ll need to verify that your organization owns the domain. If you’ve already verified ownership for the domain you want to use, then continue to Set login rules for the domain.

1. Sign in to the Admin Portal as a full access team member.
2. Go to the __Organization Settings__ page by clicking on your company's initials to the left of the tenant selection dropdown list.
3. Add the domain.
    1. Click the __Add Domain__ button in the Domains section.
    2. Enter the domain name. Both root and subdomains are accepted.
    3. Click __Next__. YOu don't need to select a domain configuration if you will only use this domain for login settings or SSO.
4. Verify that you own the domain.
    1. Expand the ownership verification section.
    2. Update your DNS settings with the information you see on screen.
5. Return to this page 48 hours after updating your DNS settings and click __Check Status__ to confirm that setup is complete.
    - __Note__: This step is required before you can start to use your domain. If setup still isn't complete after 48 hours, then reach out to our [Support team](mailto:support@saasquatch.com) for help with troubleshooting.
6. Click __Finish__.

The domain that you added will appear on the __Organization Settings__ page. Now you can update your login settings to use this domain for sign-in.

## 2. Update the login settings
Login settings let you choose the sign-in method available for team members signing in from this domain. Once you’ve picked a sign-in method, you can only change it if no one on your team is still using the old method. 

1. Return to the __Organization Settings__ page.
2. Expand the __Login Settings__ tab for the domain you want to use.
3. Select the login rules you want to enforce.
    - __Note__: If you want to enforce SSO, then make sure you have set it up first.
4. Click __Save__.

## 3. Set up SSO (optional)
This step requires technical setup, and you may require developer assistance.

> __Important:__ Changing or removing an existing SSO connection may lock team members out of the Admin Portal. Please contact our [Support team](mailto:support@saasquatch.com) first—we’ll help you make sure all your team members keep their Admin Portal access. 

1. Expand the __Login Settings__ tab for the domain you want to use.
2. Click __Configure SSO Settings__.
3. Continue on to:
    - Create a SAML application
    - Upload identity provider metadata
    - Confirm your SSO setup

Your team members can now use SSO to sign in to SaaSquatch. Make sure to update the login settings to restrict other sign-in methods if needed.

### Supported SSO identity providers
We support SSO integration for many major identity providers, including:

<table class="table">
  <tr>
    <td>Okta </td>
    <td>Azure</td>
  </tr>
  <tr>
    <td>Google</td>
    <td>SAML</td>
  </tr>
  <tr>
    <td>OneLogin</td>
    <td>ADFS</td>
  </tr>
  <tr>
    <td>JumpCloud</td>
    <td>PingFederate</td>
  </tr>
  <tr>
    <td>OpenID</td>
    <td>Auth0</td>
  </tr>
  <tr>
    <td>CyberArk</td>
    <td>Shibboleth</td>
  </tr>
  <tr>
    <td>VMware</td>
    <td>Duo</td>
  </tr>
</table>

<div style="display:flex; align-items: center; gap: 32px; flex-wrap:wrap;">
    <img src="/assets/images/contentful/Azure_475mZJse6iGgJOR7QD2CD5.png" alt="Azure logo"><img src="/assets/images/contentful/cyberark_2J1qltyk7TyZPc7ddwk3Vx.png" alt="CyberArk logo"><img src="/assets/images/contentful/Google_5xUI8QRmG4BpHWmifxXNnf.png" alt="google logo - OAuth"><img src="/assets/images/contentful/jumpcloud_4zvTEIb3FNmyiq9rD1Oh5w.png" alt="JumpCloud logo"><img src="/assets/images/contentful/okta_5GEsSS8WQHkWIweZO4z6aE.png" alt="Okta logo"><img src="/assets/images/contentful/Onelogi_2OxbXErkrEZywRaacbNYY.png" alt="OneLogin logo"><img src="/assets/images/contentful/OpenId_rlnxsvkPFwJiTu4OTTS9X.png" alt="OpenID logo"><img src="/assets/images/contentful/PingFederate_264SHJobqvsuFbLpjUjS0F.png" alt="PingFederate logo"><img src="/assets/images/contentful/SAML_1rBiJDIeEQx1OQjjYbRVCi.png" alt="SAML logo"><img src="/assets/images/contentful/Shibboleth_7xu2gwpZ30mG5c9peZ7kOd.png" alt="Shibboleth logo"><img src="/assets/images/contentful/vmware_iTlErV5n38XVYMNOt8oaH.png" alt="VMware logo">
</div>