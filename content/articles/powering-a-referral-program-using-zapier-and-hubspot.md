---
title: Powering a Referral Program using Zapier & Hubspot
highlights: This guide will walkthrough the steps required to set up a referral program using Hubspot through our integration with Zapier. 
slug: powering-a-referral-program-using-zapier-and-hubspot
sectionType: successArticle
template: hasTableOfContents.html
date: 2021-04-01
---

By the end of this guide, you will have set up a connection between Hubspot and SaaSquatch using Zapier to transfer data between them. The structure of this example will pull in and store the referrer's referral code from the landing page and will issue when the contact's Lifecycle Stage in Hubspot has been set to "Customer" [automatically by Hubspot](https://knowledge.hubspot.com/crm-setup/manage-how-lifecycle-stages-sync-between-objects).

>*Note:* Depending your Zapier plan, it could take up to 15 minutes for new users to make their way from Hubspot through Zapier into SaaSquatch.

### Zap 1: Send Referred User to SaaSquatch
#### Retrieving the Referral Code
1. As the new user hits your designated landing page, use squatch.js to [retrieve the referral code](/how-to-pass-referral-codes-to-a-form/).

2. Save the referral code as a custom property for the new contact in Hubspot. We recommend "Referred By Code" to prevent confusion.

#### Setting up the Trigger
1. Create a new Zap in Zapier using Hubspot's "Contact Recently Created or Updated" as the trigger. Click *Continue*.

2. Select your Hubspot account from the drop-down menu and click *Continue*.

3. From the "Additional Properties To Retrieve" drop-down menu, select "Contact Information: Referred By Code" (or whatever you've titled the property from Step 2) and click *Continue*.

4. Click *Test Trigger* and verify that information is flowing into Zapier from Hubspot correctly.

5. Click *Continue* to save the Trigger settings.

#### Setting up the Action
1. Selecting "SaaSquatch" as the App, choose "Create User" as the "Action Event". Click *Continue*.

2. Select your SaaSquatch account from the drop-down menu and click *Continue*.

3. From the "Select A Tenant" drop-down menu, select your Test or Live tenant depending on if your testing this Zap out or setting it up for production.

4. In the "Basic Information" section, fill in the User ID and Account ID with the approporiate variables from Hubspot. For simplicity's sake, we recommend using the Contact's email address for both.

5. Add the *First Name* and *Last Name* variables from Hubspot into the "Name" field and *Email* into Email.

6. Leave the "Referable" field blank.

![Zapier Basic Information screen](/assets/images/contentful/Screen_Shot_2021-04-01_at_3.39.50_PM_1qtkdZtcEgyAD2KEQEVE3W.png)

7. From the "Enable Advanced Mode?" drop-down menu, select "True" and scroll down to the "Referred By Codes" field once it loads.

8. Enter the "Referred By Code" propery from Hubspot into the "Referred By Codes" field.

![Zapier Referred By Codes](/assets/images/contentful/Screen_Shot_2021-04-01_at_2.11.29_PM_7wGpxVMX9aYeNbMPzPZ0Pe.png)

9. Scroll down and click *Continue*.

10. Verify all of the information is correct and click the *Test & Continue* button.

11. If everything looks good click the *Turn on Zap*.

12. Test the flow by signing up a new user in your landing page and checking in the *Participants* tab of the SaaSquatch portal to ensure the the user makes it through. 

### Zap 2: Send "Customer" Event to SaaSquatch
#### Setting up the Trigger
1. Create a new Zap in Zapier using Hubspot's "New Contact Property Change" as the trigger. Click *Continue*.

2. Select your Hubspot account from the drop-down menu and click *Continue*.

3. Under the "Property Name" drop-down menu, select "Contact Information: Lifecycle Stage".

4. From the "Additional Properties To Retrieve" drop-down menu, select "Contact Information: Referred By Code" (or whatever you've titled the property from Step 2) and click *Continue*.

5. Click *Test Trigger* and verify that information is flowing into Zapier from Hubspot correctly.

6. Click *Continue* to save the Trigger settings.

#### Setting up the Action
1. Selecting "SaaSquatch" as the App, choose "Create Event" as the "Action Event". Click *Continue*.

2. Select your SaaSquatch account from the drop-down menu and click *Continue*.

3. From the "Select A Tenant" drop-down menu, select your Test or Live tenant depending on if your testing this Zap out or setting it up for production.

4. Next, fill in the User ID and Account ID with the approporiate variables from Hubspot. For simplicity's sake, we recommend using the Contact's email address for both.

7. For the "Event" field, manually type in `lifecycleUpdate` to match the event key SaaSquatch will be listening for.

8. In the "Fields" section, enter `lifecycle` for "Event Fields" and choose "Contact information: Lifecycle Stage" for the right-hand field (see below).

![Zapier lifecycleUpdate Event](/assets/images/contentful/Screen_Shot_2021-04-01_at_3.38.20_PM_6SvVubYLrp8OfEsudOnTxp.png)

9. Scroll down and click *Continue*.

10. Verify all of the information is correct and click the *Test & Continue* button.

11. If everything looks good click the *Turn on Zap*.

12. Test the flow by completing a deal linked to a Contact that has previously been sent to SaaSquatch and then verify in the *Participants* tab of the SaaSquatch portal that the event has been added for the user. 

>*Note:* To use a different deal stage aside from "Closed Won", you will need to set up a [Hubspot Automation](https://knowledge.hubspot.com/chat-and-automation/topics#workflows) to ensure that when the Deal reaches the correct stage, the Contact's Lifecycle Stage is updated as well. Furthermore, you will need to configure your program logic in SaaSquatch to listen for that stage.