---
title: Transifex Integration
highlights: |
    SaaSquatch internationalization integrates easily with [Transifex](http://transifex.com) to automatically manage your translations. 
    This article describes how to use the Transifex CLI to translate your custom theme.
slug: themes/integrations/transifex
sectionType: themes
template: article.html
---


### Setting up Transifex

The easiest way to use Transifex to manage internationalization is using the Transifex CLI tool.
First, you should create a new project in Transifex for translating the strings from your
SaaSquatch referral progam's custom theme.

Once you're set up with a Transifex project, you need to set up your custom theme to work with
the Transifex CLI tool.

To use the Transifex CLI tool, you need to have a config file located at `/.tx/config`.
This file tells Transifex where to look to find the translations for the source
files like `messages.properties`.


**/.tx/config**
```
[main]
host = https://www.transifex.com

[my-project.messagesproperties-10]
file_filter = i18n/messages_<lang>.properties
source_file = i18n/messages.properties
source_lang = en
type = UNICODEPROPERTIES
```

Example file layout:

```
├── /.tx
|   └── config
├── /assets
├── /templates
├── /i18n
|   └── messages.properties
├── variables.json
└── Readme.md
```

If you're getting started for the first time, you may need to set up your Transifex credentials
in your local machine.

Transifex credentials are stored in the file `~/.transifexrc` in your home folder.

**~/.transifexrc**
```
[https://www.transifex.com]
hostname = https://www.transifex.com
password = wethwey2112512
token = 
username = foobar
```

### Use the Transifex CLI to push and pull translations

To upload `messages.properties` into Transifex for translation,
we need to use the command `tx push`. This will push the latest version of 
`messages.properties` from your local repo to Transifex.

Once in Transifex, you can either translate the strings yourself, use machine
translation or pay professional translators to do the work.

After translation, use the `tx pull` command to download the new versions of the
strings from Transifex into your local repo.

Commit those new string to git and deploy the new version to SaaSquatch.

```
tx push

... do translations

tx pull
git commit
git push
squatch deploy
```

After you've downloaded the new versions, you should have many new files 
located in the i18n folder.

```
├── /.tx
|   └── config
├── /assets
├── /templates
├── /i18n
|   ├── messages.properties <-- pushed
|   ├── messages_de.properties <-- pulled
|   ├── messages_ko.properties <-- pulled
|   └── messages_ja.properties <-- pulled
├── variables.json
└── Readme.md
```

To check that the project pulled in successfully, use the `tx status` command.

```
my-project -> messagesproperties-10 (1 of 1)
Translation Files:
 - en: i18n/messages.properties (source)
 - de: i18n/messages_de.properties
 - ko: i18n/messages_ko.properties
 - ja: i18n/messages_ja.properties
 ```