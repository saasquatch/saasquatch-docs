---
title: Crowdin Integration
highlights: |
    SaaSquatch internationalization integrates easily with [Crowdin](http://crowdin.com) to automatically manage your translations. 
    This article describes how to use the Crowdin CLI to translate your custom theme.
slug: themes/integrations/crowdin
sectionType: themes
template: article.html
---


### Setting up Crowdin

The easiest way to use Crowdin to manage internationalization is using the [Crowdin CLI tool](https://crowdin.com/page/cli-tool).
First, you should create a new project in Crowdin for translating the strings from your
SaaSquatch referral progam's custom theme.

Once you're set up with a Crowdin project, you need to set up your custom theme to work with
the Crowdin CLI tool.

To use the Crowdin CLI tool, you need to have a config file located at `/crowdin.yaml`.
This file tells Crowdin where to look to find the translations for the source
files like `messages.properties`.


```
>> crowdin.yaml

project_identifier: my-project
api_key: b90f5b5fb249147728578ed71d21c4bf
base_path: /home/ubuntu/workspace/      # Your local machine...

files:
  - source: '/i18n/messages.properties'
    translation: '/i18n/%file_name%_%two_letters_code%.properties'
```

Example file layout:

```
├── /assets
├── /templates
├── /i18n
|   └── messages.properties
├── crowdin.yaml
└── Readme.md
```


### Use the Crowdin CLI to upload sources and download translations

To upload `messages.properties` into Crowdin for translation,
we need to use the command `crowdin-cli upload sources`. This will push the latest version of 
`messages.properties` from your local repo to Crowdin.

Once in Crowdin, you can either translate the strings yourself, use machine
translation or pay professional translators to do the work.

After translation, use the `crowdin-cli download translations` command to download the new versions of the
strings from Crowdin into your local repo.

Commit those new string to git and deploy the new version to SaaSquatch.

```
crowdin-cli upload sources

... do translations

crowdin-cli download translations
git commit
git push
squatch deploy
```

After you've downloaded the new versions, you should have many new files 
located in the i18n folder.

```
├── /assets
├── /templates
├── /i18n
|   ├── messages.properties <-- uploaded
|   ├── messages_de.properties <-- downloaded
|   ├── messages_ko.properties <-- downloaded
|   └── messages_ja.properties <-- downloaded
├── crowdin.yaml
└── Readme.md
```

To check that the project pulled in successfully, use the `crowdin-cli list sources` command.

```
/messages.properties
```

Or to confirm the location of the translation files, use `crowdin-cli list translations`.

```
/i18n/messages_de.properties
/i18n/messages_ko.properties
/i18n/messages_ja.properties
```