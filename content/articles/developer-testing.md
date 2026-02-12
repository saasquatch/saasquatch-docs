---
title: Testing - Best Practices
highlights: Recommended program development process with SaaSquatch to minimize technical errors and installation deficiencies.
slug: developer/testing
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-01
robotsTag:
  - FOLLOW
  - INDEX
---

### Test vs Live
Each SaaSquatch Program has two *modes*: [**Live** and **Test**](/success/using-referral-saasquatch/#test-vs-live). These modes (tenants) both play an important role in the lifecycle of your program. The functionality of your Live and Test tenants are designed to be very similar so that there are as few changes as possible when transitioning from your Test to Live tenant.

The intended use of each of your tenants can be summarized as follows:

<table class="table">
    <tr>
        <th>
            Test
        </th>
        <th>
            Live
        </th>
    </tr>
    <tr>
        <td>
            <ul>
              <li>Design</li>
              <li>Development</li>
              <li>Testing</li>
              <li>Payment System Sandbox</li>
            </ul>
        </td>
        <td>
            <ul>
              <li>Live tenant configuration on final Production environment</li>
              <li>Running your Live Growth Automation Program</li>
              <li>For automated reward integrations such as gift cards with real monetary value: <strong>Live, uncancellable</strong> rewards generated and sent out to users</li>
            </ul>
        </td>
    </tr>
</table> 

### Example Development Process
The following flow chart provides an example of what a development process could look like when integrating your Growth Automation programs into your product:

![Development Process](/assets/images/contentful/Development_Process_4VuAPt2Vfau2o0eMkqQ4KQ.png)

#### Example Development Process Explanation

<table class="table">
    <tr>
        <th nowrap>
            Development Stage
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td nowrap>
            1. <strong>Design</strong> 
        </td>
        <td>Planning a software solution (to launch a Growth Automation program).</td>
    </tr>
    <tr>
        <td nowrap>
            2. <strong>Development</strong> 
        </td>
        <td>Creation of the software solution intended to lauch a Growth Automation program.</td>
    </tr>
    <tr>
        <td nowrap>
            3. <strong>Unit (Local) Testing</strong> 
        </td>
        <td>Testing that each of the components of the Growth Automation program functions as intended.</td>
    </tr>
    <tr>
        <td nowrap>
            4. <strong>Deploy to Staying Environment</strong> 
        </td>
        <td>Once the program has passed initial testing it can be deployed to the staging environment.</td>
    </tr>
    <tr>
        <td nowrap>
            5. <strong>Integration (Staging) Testing</strong> 
        </td>
        <td>Testing how the program works in conjunction with the rest of your platform.</td>
    </tr>
    <tr>
        <td nowrap>
            6. <strong>Quality Assurance</strong>  
        </td>
        <td>Ensuring the all the goals of the project (to launch a program) have been completed to a satisfactory level, and that the solution works as expected.</td>
    </tr>
    <tr>
        <td nowrap>
            7. <strong>Live Tenant Configuration</strong>  
        </td>
        <td>With the mechanics of your Growth Automation program confirmed to be working using your Test tenant you can begin the process of deploying your program to your production environment. 
        <br><br>As part of the transition from your <strong>Test ➡ Live</strong> tenant a number of pieces need to be swapped over to point to your Live tenant.
        <br><br>The following items should be changed and checked before your program is fully configured on your Live tenant: 
        <ul>
        <li><strong>Tenant Alias</strong> - <i>eg.</i> <code>test_alu125hh1si9w</code> ➡ <code>51hsahuilw921</code>  </li>
        <li><strong>Tenant API key</strong>
        <i>eg.</i> <code>TEST_BHASKh5125Las5hL125oh3VbLmPxUSs</code>➡<code>LIVE_saLhhP5ohLSS3bB115sKLA5x5UHV22m</code></li>
        <li><strong>Copy and Messaging</strong> - The copy and messaging within the widget, share options, and emails are independently configurable between tenants. Make sure that the copy and messaging in the widget, share options, and emails is correctly configured on your live tenant before it is made available to customers.</li>
        </ul>
        With each of these components updated to point to your Live tenant your Live program should be ready for use.
        </td>
    </tr>
    <tr>
        <td nowrap>
            8. <strong>Live Program</strong>  
        </td>
        <td>Your Live Program is now ready to be deployed from your <strong>Staging ➡ Production</strong> environment.
        <br><br>It is recommended to run through at least one final full test of the full loop before publicizing your program. <br></br><strong>Please note:</strong> This test loop on your Live tenant, like all data on your Live tenant, cannot be deleted.
        </td>
    </tr>
    <tr>
        <td nowrap>
            9. <strong>Optimization</strong> 
        </td>
        <td>Launching your Growth Automation program is only the first step in running a successful program. As you begin to generate traffic you can begin to optimize your program to make it even more successful.</td>
    </tr>
</table> 

### Portal
Your program Portal provides access to the configuration settings for both your Test and Live tenants. 

Details about functionality in the portal can be found in our [Navigating the SaaSquatch Portal](/success/navigating-the-portal) article.

### Debugging

<div class="row-fluid">
  <div class="span8"><p>Your SaaSquatch program makes dubugging on your Test tenant easier by exposing additional logging. 

<p>Our Squatch.js Library provides the following debugging tools to help you work out issues as you impliment your referral program:

<p><a href="/developer/squatchjs/issue">Error codes</a> displayed in the widget help to identify any problem as when displaying the widget.</div>
  <div class="span4">
  <div>
<a class="docs-lightbox" href="/assets/images/contentful/RS032_7qBm69rkhUQcEsamI6gS8U.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/RS032_7qBm69rkhUQcEsamI6gS8U.png" alt="RS032">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
  </div>
</div>
<br>

Additionally, status updates and error messages are displayed on the console to help troubleshoot as you call squatch.js methods:

  ![squatch.js Console Error Example](/assets/images/contentful/squatch.js_Console_Error_Example_5t54orqmooUe4uQe2meWss.png)

### Test Data
Only your Test tenant provides the ability to delete test data. 

Data that **WILL** be deleted:
- Users, accounts, and referrals
- Analytics events

The following data **WILL NOT** be deleted:
- Any data stored in external payment systems (e.g. Stripe/Recurly)
- Your SaaSquatch Account (including accounts of your other team members
- Your theme and widget customizations
- Your program settings, like reward settings, and API keys

To access this functionality: 
- Select [Settings](/success/using-referral-saasquatch/#program-settings) under the Setup menu in the Sidebar
- Click Delete Test Data
- Toggle the 'I would like to delete my test data' toggle from "No" to "Yes"
- Click **Delete**.

>**Please note:** Data on the **Live** tenant cannot be deleted.

### Additional Resources
If you would like to dive deeper into the world of Growth Automation Programs and our accompanying platform, we recommend checking out the following articles: 

- Learn more about the structure of our Growth Automation Platform in our [Growth Automation 101](/growth/ga-101/) article.
- Explore all of our Growth Automation Programs availble on the SaaSquatch Platform in our [Growth Automation Program Library](/program/library/) article.
- Our [Growth Automation Program Mechanisms](/growth/ga-mechanisms/) provides details, examples and further detail on how to integrate the SaaSquatch platform in your product.