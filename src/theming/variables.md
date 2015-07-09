---
title: Theme Variables
highlights: |
  Theme Variables make themes more customizable through custom fields. For example, the theme variables defined in [Standard Themes](/themes/standard) are what lets each program have custom email, facebook and twitter share messages.
  To use varibles, the theme developers define variables in a [JSON Schema](http://json-schema.org/examples.html) in the theme git repository. These variables can then be
  [updated via the SaaSquatch REST API](/api/methods/#update_variables) and then those values rendered in Handlebars templates.
slug: themes/variables
template: themes.html
---

![JSON Schema Example](/assets/images/schema-to-json.png)


---


Theme variables consist of three things: a schema, instance values and templates.

 1. **A schema** that defines what variables exists and their constraints. Defined in a `variables.json` file located in the root of the theme git repository. This file must be a valid [JSON Schema](http://json-schema.org/examples.html).
 2. **Instance values** that you can [lookup](/api/methods/#lookup_variables) and [update](/api/methods/#update_variables) via the SaaSquatch REST API.
 3. **Templates** that use the `variables` helper to lookup variables and render them in the widget.


---

### Schema

Consider the following example schema which includes a custom field `emailShareSubject` embedded within the `shareMessaging` sub-schema. 
Schemas are defined in a `variables.json` file located in the root of the theme git repository and must be a valid [JSON Schema](http://json-schema.org/examples.html).
The schema published with your theme is available to be [looked up via the SaaSquatch REST API](/api/methods/#lookup_variables_schema) and as the `variablesSchema` field
in the [theme context](/themes/fields).

```json
{
  "title": "root",
  "type": "object",
  "properties": {
    "shareMessaging": {
      "title": "Share Messaging",
      "type": "object",
      "properties": {
        "emailShareSubject": {
          "type": "string",
          "description": "Email share subject",
          "minLength": 4,
          "default": "Get {{companyName}} for {{programDetails.referredRewardDetails.discountPercent}}% less!"
        }
      }
    }
  }
}
```


### Values

Given the schema above, the following represents a possible value for the `shareMessaging` field. 
Note that this field value itself includes references to other fields from the general theme context.
The variables helper will ensure these references are replaced by the actual context values. These values
are available to be [looked up via the SaaSquatch REST API](/api/methods/#lookup_variables) and as the `variables` field in the [theme context](/themes/fields). 

```json
{
  "shareMessaging": {
    "emailShareSubject": "Get {{companyName}} for {{programDetails.referredRewardDetails.discountPercent}}% less!"
  }
}
```


### Template

To render a variables value in a Handlebars template, pass the field path to the `variables` helper as a single argument. 
For example, to render the field `shareMessaging.emailShareSubject` the helper would be used as follows:


```html
<div>
  <p>{{variables 'shareMessaging.emailShareSubject'}}</p>
</div>
```


### Output

The variables value will appear in the template rendering output. Note how the variables helper has substituted the theme context reference with a value.

```html
<div>
  <p>Get Example Co. for 10% less!</p>
</div>
```