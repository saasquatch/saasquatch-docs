---
title: Signed Requests
highlights: Signed requests provide an additional layer of security for your program by allowing us to validate the data sent to us and confirm it originated from you. This feature is optional, but highly recommended. 
slug: developer/squatchjs/signed-requests/
sectionType: guide
template: hasTableOfContents.html
date: 2023-08-23
---

JWTs can be used to send authorized information to SaaSquatch via [squatch.js](/developer/squatchjs/) or [API](/api/authentication/). Learn more about building JWTs and including them with your calls on our [JSON Web Tokens](/topics/json-web-tokens) doc. 

## About signed requests
A signed request is a chunk of data that includes a [JWT](/topics/json-web-tokens/) or [API key](/api/authentication/). We use signed requests to verify that data sent to us comes from a trusted source. If signed requests aren’t used and we receive data that includes your tenant alias, then it’s possible for this data to make unauthorized or unintended changes to your program.

JWTs provide an extra layer of security when using squatch.js because they are created with your private API key. You can use signed requests when creating or updating participants, events and referrals. 

## Manage signed request settings
Your *Secure Mode* settings determine which squatch.js and [Open Endpoint API](/api/openendpoints/#authentication-requirements-by-method) methods are required to be signed with a JWT or API key. To manage them, sign in to the Admin Portal, then go to __Settings > Security__ and find the *Security Settings* section. 

*Secure Mode* can be set to __Enabled__, __Disabled__ or __Custom__. By default, your *Secure Mode* setting is __Custom__, with all options enabled except for *Get User Widget*. 

> __Important__: We __highly recommend__ using signed requests to reduce your referral program's exposure to a man-in-the-middle security vulnerability. If signed requests are disabled, then more attention should be paid to your incoming referrals. 

### *Secure Mode* enabled
With Secure Mode enabled, all calls are required to be signed with a JWT or an API key to verify the contents of the request. This requirement applies regardless of whether authentication is needed for the method.

### *Secure Mode* disabled
Disabling *Secure Mode* allows you to send requests to SaaSquatch without a JWT or API key. You’ll be able to make __any__ requests through the squatch.js library and __some__ requests through Open Endpoint API calls.

#### Custom *Secure Mode* 
By default, *Secure Mode* is set to __Custom__. Custom settings allow for granular control of the methods that need to be sent with a JWT or API key. Note that some API calls may still be required to be sent with authentication, even if disabled is selected. See our [API documentation](/api/authentication/) for details. 

<table class="table table-hover">
    <tr>
        <th>Option
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            Create Account/User
        </td>
        <td>
            Enable/Disable the ability to create or update Accounts in the SaaSquatch system without use of Signed Requests 
        </td>
    </tr>
    <tr>
      <td>
        Lookup User
      </td>
      <td>
        Enable/Disable the ability to lookup users in your program(s) without use of Signed Requests  
      </td>
  </tr>
  <tr>
    <td>
      Apply Referral Code
    </td>
    <td>
      Enable/Disable the ability to apply a referral code to a user's account without use of Signed Requests 
    </td>
  </tr>
  <tr>
    <td>
      List Referrals
    </td>
    <td>
      Enable/Disable the ability to list all of the referrals for a given user without use of Signed Requests 
    </td>
    <tr>
      <td>
        Create/Update User
      </td>
      <td>
        Enable/Disable the ability to create or update a user without use of Signed Requests
      </td>
  </tr>
  <tr>
    <td>
      Get User Widget
    </td>
    <td>
      Enable/Disable the ability to display the widget for the user without use of Signed Requests 
    </td>
  </tr>
  <tr>
    <td>
      Get Share Links
    </td>
    <td>
      Enable/Disable the ability to get a user's sharelinks without use of Signed Requests 
    </td>
  </tr>
  <tr>
    <td>
      Track User Events
    </td>
    <td>
      Enable/Disable the ability to sending a user event without the use of a Signed Request 
    </td>
  </tr>
</table>