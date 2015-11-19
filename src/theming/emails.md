---
title: Emails Theming
highlights: |
  The content of the emails sent to your customers by SaaSquatch can be customized using the theme engine. These emails are typically delivered in the case of referral events such as [attribution](/topics/attribution/) or [conversion](/topics/conversion/).
  To begin email theming you must have a [custom theme](/themes/custom/). From there, email theming can be accomplished in a similar manner to customizing your widget [template](/themes/templates/), but with a few additional configuration steps that will be discussed below.
slug: themes/emails
template: themes.html
---

### Template Mappings

Once you've set up your [custom theme](/themes/custom/) you can begin implementing your email templates. Create a new handlebars template file under your theme repository's **templates**  directory (e.g. `/templates/emails/referral-converted.hbs`). 
Next you will need to create a mapping to this template from your [schema variables](/themes/variables/). This can be accomplished by adding the `email` sub-schema to the root of your schema as demonstrated below for the `referral converted` and `referral attributed` emails.

```json
{
  "title": "root",
  "type": "object",
  "properties": {
    "email": {
      "type": "object",
      "properties": {
        "REFERRAL_CONVERTED": {
          "type": "object",
          "properties" : {
            "configuration" : {
              "type" : "object",
              "properties" : {
                "themeMapping": { "default" : "emails/referral-converted" }
              }
            }
          }
        },
        "REFERRAL_STARTED": {
          "type": "object",
          "properties" : {
            "configuration" : {
              "type" : "object",
              "properties" : {
                "themeMapping": { "default" : "emails/referral-started" }
              }
            }
          }
        }
      }
    }
  }
}
```
Note that in the above example template paths are *relative* with respect to the **templates** root and do not include the `hbs` extension. 
Also note that the schema paths to the template mappings include the template identifiers `REFERRAL_CONVERTED` and `REFERRAL_STARTED`. 
The choice of identifier will determine which email the provided `themeMapping` maps to; a list of available email identifiers is presented below.

<table class="table table-hover">
    <thead>
      <tr>
        <th>Email Type</th>
        <th>Webhook</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th class="docs-monospace" style="white-space:nowrap">
            REFERRAL_STARTED
          </th>
          <td>
            email.referral.started
          </td>
          <td>
            The email sent as a result of a referral [attribution](/topics/attribution/) action. This email may be enabled on the portal `email` page.
          </td>
        </tr>
        <tr>
          <th class="docs-monospace" style="white-space:nowrap">
            REFERRAL_CONVERTED
          </th>
          <td>
            email.referral.paid
          </td>
          <td>
            The email sent as a result of a referral [conversion](/topics/conversion/) action. This email is enabled by default, but may be disabled on the portal `email` page.
          </td>
        </tr>
        <tr>
          <th class="docs-monospace" style="white-space:nowrap">
            REFERRER_REWARD_LIMIT_REACHED
          </th>
          <td></td>
          <td>
            The email sent when a user has received the maximum number of rewards available in their referral program. This will only affect programs that have configured a `reward limit`.
          </td>
        </tr>
    </tbody>
</table>


### Front Matter

Email templates are written using the **Front Matter** format, which consists of a *YAML header* and *handlebars* body delimited by `---` blocks. Supported headers include the following:

- **from**: The *email address* to be presented as the *from address* for emails created from this template. Must be a valid email address.
- **fromName**: The *name* to be presented as the *sender's name* for emails created from this template.
- **subject**: The *subject* to be presented for emails created from this template.

An example email template is demonstrated below. Note that aside from the YAML header, writing this template will be no different than building a widget [template](/themes/templates/) 
and email templates share similar access to [assets](/themes/assets/), [fields](/themes/fields/), [helpers](/themes/helpers/), and [variables](/themes/variables/).
Email templates also have access to several context-specific fields, including the `newReferral` and `convertedReferral` fields; see [fields](/themes/fields/) for details.

```hbs
---
from: no-reply@referralsaasquatch.com
fromName: Referral SaaSquatch
subject: Your friend signed up for an account with Referral SaaSquatch
---
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif' !important;">
  <head>
    ...
  </head>
  <body>
    <h1>Congratulations {{user.firstName}}!</h1>
    ...
  </body>
</html>
  
```

Once you have finished theming your email and are ready to begin testing you can [publish](/themes/publish/) your theme just would be done when editing your widget template.

### Previewing Emails

To test your emails you can call the [theme preview api endpoint](/api/methods/#preview_theme_email). This endpoint gives you the option of sending a 
full email test to the address of your choosing via the `sendTo` parameter.


### Portal

Alternatively, if you include the `content` subschema as part of your *email type* subschema you will be able to preview and edit parts of your email via the portal. This ability is 
exposed in the default themes which use the `configuration` and `content` email subscema [theme variables](/themes/variables/) to allow for portal-based configurability. Note that in 
the portal the `configuration` subschema contains variables for customizing the email headers (i.e. `from`, `fromAddress`, and `subject`) and `content` the variables for changing the 
email's visual properties and wording.


<div class="row-fluid">
    <div class="span12 well">
      <b>Source: referral-converted.hbs</b>
      <pre>
```
---
from: {{variables 'email.REFERRAL_CONVERTED.configuration.fromAddress'}}
fromName: {{variables 'email.REFERRAL_CONVERTED.configuration.fromName'}}
subject: {{variables 'email.REFERRAL_CONVERTED.configuration.subject'}}
---
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif' !important;">
  <head>
    ...
  </head>
  <body>
    <h1>{{variables 'email.REFERRAL_CONVERTED.content.headerContent'}}</h1>
    <p>{{variables 'email.REFERRAL_CONVERTED.content.bodyContent'}}</p>
  </body>
</html>
```
      </pre>
    </div>
</div>
<div class="row-fluid">
    <div class="span7 well">
      <b>Source: variables.json</b>
      <pre>
```
{
  "title": "root",
  "type": "object",
  "properties": {
    "email": {
      "type": "object",
      "properties": {
        "REFERRAL_CONVERTED": {
          "type": "object",
          "properties" : {
            "configuration" : {
              "type" : "object",
              "properties" : {
                "themeMapping": { 
                  "default" : "emails/referral-converted", 
                  "options" : { 
                    "hidden" : true 
                  } 
                },
                "fromName": {
                  "type": "string",
                  "title": "From Name",
                  "default": "{{companyName}}",
                  "propertyOrder": 1,
                  "minLength": 1,
                  "options": {
                    "validate": ["handlebars"]
                  }
                },
                "fromAddress": {
                  "type": "string",
                  "title": "From Address",
                  "format": "email",
                  "default": "referral@mail.saasquat.ch",
                  "propertyOrder": 2,
                  "minLength": 5,
                  "options": {
                    "validate": ["email"]
                  }
                },
                "subject": {
                  "type": "string",
                  "title": "Subject",
                  "format": "textarea",
                  "default": "Referral Update",
                  "propertyOrder": 3,
                  "minLength": 1,
                  "options": {
                  	"validate": ["handlebars"],
                    "input_height": "50px"
                  }
                }
              }
            },
            "content" : {
              "type" : "object",
              "properties" : {
                "headerContent": {
                  "type": "string",
                  "title": "Header Content",
                  "format": "markdown",
                  "propertyOrder": 2,
                  "options": {
                    "validate": ["handlebars"],
                    "input_height": "50px"
                  }
                },
                "bodyContent": {
                  "type": "string",
                  "title" : "Body Content",
                  "format": "markdown",
                  "propertyOrder": 3,
                  "options": {
                  	"validate": ["handlebars"],
                    "input_height": "50px"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
      </pre>
  </div>
  <div class="span5">
    <div class="well">
      <b>File Layout</b>
      <pre>
├── /templates
|   └── /emails
|      └── referral-converted.hbs
└── variables.json
      </pre>
    </div>
  </div>
</div>

