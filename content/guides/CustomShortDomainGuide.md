---
title: Custom Short Domains
highlights: SaaSquatch supports the use of Custom Short Domains which allow you to change the format of the referral links shared by your users. Instead of the standard link format `ssqt.co/barYS` you can create your own `referral.your-domain.com/barYS`.

Custom short domains support secure link generation through HTTPS, which requires an HTTPS certificate. SaaSquatch will automatically issue and manage this certificate for you.
slug: customshortdomainguide
sectionType: guide
template: hasTableOfContents.html
---


* * *

### Requirements:

The main requirement for being able to make use of a Custom Short Domain is having access to a dedicated domain or subdomain for use with the referral program. The domain you want to use for Custom Short Domains cannot already be in use.

For example, if you are already using your-domain.com for your website, you cannot re-use this as your Custom Short Domain. Instead, a subdomain like `referral.your-domain.com` or `share.your-domain.com` should be used. You can also make use of another domain like `your-domain.io` or `your-domain.ca`.

### Step 1: Pick your Domain
Confirm which domain or subdomain you want to use, making sure that it conforms to the restrictions outlined above.

### Step 2: Setup Domain CNAME or A Records
To point your chosen domain at SaaSquatch's URL shortener service, you will need to create or modify the DNS record for your chosen domain.

There are two major options for doing this, which depend on the domain that you have chosen:
- **CNAME record:** If your chosen domain is a subdomain of a domain that you own, like `referral.your-domain.com` then you can create a CNAME record in your DNS configuration. Please contact the [Success Team](mailto:success@referralsaasquatch.com) to obtain the destination for your CNAME record.
- **A records:** If your chosen domain is an "apex" domain without a subdomain, like `your-domain.io` or `your-domain.ca` you will need to create A records in your DNS configuration, as most DNS management systems do not allow CNAME records to be added for the apex domain. Please contact the [Success Team](mailto:success@referralsaasquatch.com) to obtain the destination IP addresses for your A records.

> A change to a domain’s A or CNAME records can take anywhere from minutes all the way up to 24 hours to take effect. If after 24 hours there is still no change then the A or CNAME records was not changed correctly and is not pointing at the right location.

### Step 3: Testing DNS Record Change
Before we continue with the setup of your Custom Short Domain we need to confirm that the domain’s DNS records have been correctly changed to point to the correct destinations.

To test whether the DNS records have been changed correctly take a working referral link from your program with the existing SaaSquatch Short Domain, like `ssqt.co/barY`, and remove our domain and substitute in your own. This should leave you with a URL that looks something like `referral.your-domain.com/barYS`.

If this new link takes you to the landing page that was set for the tenant then your DNS records are correctly setup. If the link does not take you to your tenant’s landing page allow for the full 24 hours needed to reflect the DNS record changes. If after 24 hours the link still doesn’t work then the DNS records have not been set correctly.

### Step 4: Inform SaaSquatch
Only once the DNS records are setup correctly we can make the necessary changes on our end to move forward with setting up your Custom Short Domain. Make sure you have correctly completed Step 3 otherwise all the links generated going forward will be broken.

With the DNS Records set correctly, contact a member of the success team with the Custom Short Domain you wish to use so that SaaSquatch can change your program to make use of this Custom Short Domain.

> If you wish to use HTTPS short links, please let the success team know. There will be an additional step required to verify the new certificate SaaSquatch will issue and manage for you, and we will walk you through the process of completing this setup.

SaaSquatch will notify you when the changes on our end are complete and another step of setting up your Custom Short Domains is completed.

### Step 5: Verify

As a precaution, we will make the change to the new Custom Short Domain on your [Test tenant](/success/using-referral-saasquatch/#test-vs-live) before making changes to the Live Tenant.

Confirm with a member of the SaaSquatch Success team that the new links in your Test tenant are being generated correctly.

### Step 6: Launch!
With confirmation from you that the new links in the Test tenant are working we will push the Custom Short Domain changes to the Live tenant.

Congratulations, you are now live with your own Custom Short Domain!

#### Please note:

Existing referral links in the wild that make use of our short domain, like `ssqt.co/barYS`, will still work as they always have. The change is that new links being generated, or exposed in the widget, will be with the Custom Short Domain you have chosen.
