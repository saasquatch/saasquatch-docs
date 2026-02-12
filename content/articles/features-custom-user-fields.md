---
title: Custom Fields
highlights: Include custom information about users in your SaaSquatch Program.
slug: features/custom-user-fields
sectionType: guide
template: hasTableOfContents.html
date: 2022-11-08
---

## Overview
Custom fields are pieces of data that you send us about your participants, above and beyond the minimum required to power your program. You can send us all kinds of information in the form of a custom field, like:
- Birthday
- Language
- Location
- Type of subscription
- Membership status

You can build program rules that use the information from custom fields to trigger goals and actions. This custom information can also be referenced if you place your participants into [segments](/features/user-segmentation/).

Related to custom fields are [calculated fields](/building-programs/custom-calculated-fields/calculated-fields). Unlike custom fields, which just record the information you send us, calculated fields allow you to perform different types of calculations with the data you send us, and then store the resulting value as a custom field that’s available on the participant’s profile. 

Custom fields can be sent to us when you upload a user import file or via squatch.js, API, SDK, or another integration method.

## Field characteristics 
Any custom fields you send us need to meet a few requirements for field names and values. 

### Names
- Up to 64 characters
- Only alphanumeric characters, dashes, and underscores are accepted (__Note__: letters must be unaccented)
- Case sensitive. `customFieldName` is treated as distinct from `customfieldname`

### Values
- Supports string, number, Boolean and null types
- Max string value of 1024 characters
- Dates must be formatted as a unix timestamp in milliseconds
- Maximum of 100 fields can be added/updated per request
- Setting a custom field for a user to `null` will remove the field for that user.

## Sending custom fields
You can include custom fields whenever you create, update or upsert users, regardless of the method you use to send us the data.

### File imports
You can include custom fields when importing new users or updating existing users in bulk. See our documentation on [Bulk User Import](/guides/user-import) and [Bulk Event Import](/guides/event-import/) for instructions. 

> __Tip__: We have sample CSVs and JSONL files available to guide your import. These are also accessible from the Admin Portal.

User data imports:
- [CSV](https://assets.ctfassets.net/s68ib1kj8k5n/7LOYwhDlsI22uuaIMaWImE/71cefe860edc71c0968c8065e1d6e953/sample-user-upload.csv)
- [JSONL](https://assets.ctfassets.net/s68ib1kj8k5n/5rD1ZiKEjqStp54qjDB90N/48918dfa8b53a935c7c83ea5fbf3af77/userImportSample.jsonl)

Event data imports: 
- [CSV](https://assets.ctfassets.net/s68ib1kj8k5n/20lD8Gua3EtW8qIahBvciz/152fd3cfaa3f0ee4076a6729bc8d4164/userEventSample.csv)
- [JSONL](https://assets.ctfassets.net/s68ib1kj8k5n/2IPDDkVhCgDBPyQrRANfb9/d38643fba660ca1412b7d85f1b7c0f41/userEventSample.jsonl)

### APIs and SDKs
Custom fields can be included when using our [GraphQL API methods](/graphql/reference) or [Rest API endpoints](/api/openendpoints) that create, update or upsert users. Similarly, they can also be included when using [squatch.js](/developer/squatchjs) or our [mobile SDKs](/mobile) to create, update or upsert users from within your application.
