---
title: Internationalization (i18n) helper
highlights: |
    The i18n helper is used to swap translated strings into Handlebars templates and powers [Internationalization](/themes/internationalization). The helper loads messages from resource bundles (collections of messages files) from a messages file ([.properties files](https://en.wikipedia.org/wiki/.properties)) that matches a specified locale. These files follow the .properties standard, with the exception that they must be encoded using UTF8 instead of ISO-8859-1.
slug: themes/i18n-helper
sectionType: themes
template: article.html
---


### Usage

The usage syntax is as follows:

```
{{i18n "key" [arg1, ..., argN] [locale="en_CA"] [bundle="messages"]}}
```

Where:

 - `key` is the name of the message
 - `[arg1, ..., argN]` are optional dynamic arguments encoded as `{0}`, `{1}` and `{N}` etc.
 - `locale` is an optional override of the locale. The locale must be of the format `language_COUNTRY` where the language code must be lowercase and the country code must be uppercase. The separator must be an underscore.
 - `bundle` is an optional override of the default resource bundle.

The locale is determined by the following steps (in order of precedence):

 1. Is the `locale` helper option specified? If so, use that locale.
 2. Is the locale defined in the theme context? If so, use that locale.
 3. Default to the "en" locale.

Typically, the 2nd step (locale defined in theme context) will determine the locale.

Look at the `messages` bundle for the `hello` key:

```
{{i18n "hello"}}
```

Look at the `myMessages` bundle for the `hello` key:

```
{{i18n "hello" bundle="myMessages"}}
```

Look at the `messages` bundle for the `hello` key using the `es_AR` locale:

```
{{i18n "hello" locale="es_AR"}}
```

Look at the `messages` bundle for the `hello` key and bind the `{0}` parameter to "i18n helper":

```
{{i18n "hello" "my friend"}}
```

---

### Defining resource bundles

A "resource bundle" is simply a collection of UTF8 encoded .properties files located within the same directory.

```
├── /assets
├── /templates
├── /i18n
|   ├── messages.properties
|   ├── messages_de.properties
|   ├── messages_ko.properties
|   └── messages_ja.properties
└── Readme.md
```

It is important that you name your messages files correctly or they will not be found. Resources are named by combining the `bundle` name and the `locale`, separated by an underscore. In the event that a messages file is not found, a series of fallbacks are attempted as follows:

 1. Attempt to find a messages file with the same language, but country code ommitted. For example, if the messages file "myMessages_fr_CA.properties" was not found, "myMessages_fr.properties" will be attempted next.

 2. Attempt to find a messages file using the default locale. Continuing with the above example, this would mean the file "myMessages_en.properties" would be tried next.

 3. Attempt to find the default messages file. As a last ditch attempt, the helper will try loading the message file "messages.properties". If this fails, rendering cannot continue and the helper will error.

By default, resource bundles are expected to be in the root theme folder. This means if you use the helper definition `{{i18n "example" bundle="myMessages" locale="fr"}}` the expected path of the associated messages file would be `/myMessages_fr.properties`.

To use a different path, just include the path as part of the bundle name. If you would like to place your resource bundle in the `i18n` subdirectory instead, the above example would be changed to `{{i18n "example" bundle="i18n/myMessages" locale="fr"}}`.