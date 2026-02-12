---
title: Program Internationalization
highlights: Translate and adapt your SaaSquatch Growth Automation Programs to support each of the languages and regions you operate in.
slug: features/program-i18n
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-26
---

### What is Internationalization?
Internationalization **(i18n)** is the process of configuring a product or service to easily adapt to supporting additional languages, regions, countries, and currencies (a process called localization).

By internationalizing your product or service, the resources needed to localize it to support additional languages and regions are significantly reduced.

### SaaSquatch and i18n
The SaaSquatch platform supports the ability to internationalize your SaaSquatch programs, enabling your to localize each of your Growth Automation campaigns for each of the languages and regions you operate in.

### Locales
The localization for your SaaSquatch programs are powered by user locales. The SaaSquatch system uses the locale value of each user to keep track of their langauge and region in order to display your program to them using the correct messaging, in the correct language, with the correct currency. Locales can also be used to customize the rewards that are given out.

These locales (e.g. `en_GB`, `nl_NL`) are a combination of a two-letter language code and a two-letter country code, as defined in ISO 639-1 and ISO 3166-1 alpha-2 respectively.

### Translation Quickstart
The following quickstart provides a high-level overview of the steps involved in localizing your SaaSquatch programs for each of your supported languages and regions.

#### 1. Download the Source Copy/Messaging
1. From the *Program* section in the SaaSquatch portal, select the Growth Automation program you would like to translate, and navigate to the program's *Advanced* step.

2. Select the `Download Source and Translations` option. 

  ##### Format of Source Files
The provided zip file will include your default and any translated copy (if present) in the following format:
```
Your Program Name.zip
├── /Emails
|   ├── /programEmailID 
|   |   └── nl_NL.json
|   └── programEmailID.json
├── /Rewards
|   ├── /referredReward 
|   |   └── nl_NL.json
|   ├── /referrerReward 
|   |   └── nl_NL.json
|   └── referredReward.json
|   └── referrerReward.json
└── /Widgets
    ├── /programWidgetID 
    |   └── nl_NL.json 
    └── programWidgetID.json
```

  In this example the `programEmailID.json`, `programWidgetID.json`, `referredReward.json` or `referrerReward.json` files contain the default copy for the program's email, widget and rewards.

#### 2. Translate Source Files

Use a copy of the default email or widget messaging (found in the `programEmailID.json` or `programWidgetID.json` files) as the basis for your translations, and a copy of the default reward settings as the template for your localized reward types and amounts. 

If you have previously made translations they will be included in the download, in the folder of the widget/email they are for (*e.g.* `/programEmailID`) with the file name of the locale they are for (*e.g.* `nl_NL.json`). You can choose to make edits to the existing translations/rewards you have for a specific locale, or delete the existing content and start fresh from the default file.

#### 3. Package Translations
1. Place your translated files back into the folder of the same name as the source file you translated (*e.g.* the `/signupRewardEmail` folder for the translations of `signupRewardEmail.json`).

##### Example Folder Structure
The following example shows translations for the `fr_FR` and `en_US` locales having been placed in the folder for the program's email `/programEmailID`, widget `/programWidgetID`, and rewards `/referredReward` and `/referrerReward`.
  ```
Your_Program_Name.zip
├── /Emails
|   ├── /programEmailID  <-- Place your translated email files here
|   |   ├── fr_FR.json
|   |   └── en_US.json
|   └── programEmailID.json
├── /Rewards
|   ├── /referredReward  <-- Place your translated referred reward files here
|   |   ├── fr_FR.json
|   |   └── en_US.json
|   ├── /referrerReward  <-- Place your translated referrer reward files here
|   |   ├── fr_FR.json
|   |   └── en_US.json
|   └── referredReward.json
|   └── referrerReward.json
└── /Widgets
      ├── /programWidgetID  <-- Place your translated widget files here
      |   ├── fr_FR.json
      |   └── en_US.json 
      └── programWidgetID.json
```
2. Create a zip of the folder containing the `/Emails` and `/Widgets` folders.

__NOTE:__ When you go to open any of the json files you will see and object that looks something like this:

![internationalization error](/assets/images/contentful/image__12__1Z9uFfE3M2u2OKssSq6e1Q.png)

If you are seeing errors when you go to upload, make sure to add the highlighted line below. 

![internationalization error solution](/assets/images/contentful/image__13__3R0qxoXuvHgCol9oovehCV.png)

#### 4. Upload Translations

<div class="row-fluid">
  <div class="span8">
    <ol><li>Back on the program's *Advanced* tab in the SaaSquatch portal, drag and drop your zipped translations onto the designated section of the page.    
    <li>Confirm that the zip file was uploaded successfully.
    <li>Confirm that each of the translations your included were uploaded successfully.
    </ul>
  </div>
  <div class="span4">
   <div>
<a class="docs-lightbox" href="/assets/images/contentful/Translation_Upload_3VS4r7notWKgSiY2a6cUQo.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Translation_Upload_3VS4r7notWKgSiY2a6cUQo.png" alt="Translation Upload">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

Congratulations! Your Growth Automation program is now localized!

### Additional Resources
>Check out our [Program Library](/program/library) for a full list of available Growth Automation programs.
>
>Learn more about all of the [available reward options](/feature/rewards) that are supported on the SaaSquatch Growth Automation programs.