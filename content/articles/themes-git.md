---
title: Git & Custom Themes
highlights: Custom Referral SaaSquatch themes leverage the power of Git to make theme customization and collaboration easy for you and your team.
slug: themes/git
sectionType: designerArticle
template: hasTableOfContents.html
date: 2019-02-01
---

> **Please note:** This article relates to the custom theming functionality for our classic referral programs. Theming, design, and message changes for programs on our Growth Automation platform are available directly within the SaaSquatch admin portal within the configuration for each specific program.
>
> Please contact [SaaSquatch Support](support@referralsaasquatch.com) if you have any further questions about customizing the design of your program.

### What is git?

Git is a version control system for tracking changes in computer files and coordinating work on those files among multiple people. Using git, teams can work on the same project at the same time without stepping on each other's toes.

#### Learn More about Git

For a great introduction to the workings of git and GitHub we recommend checking out [this interactive tutorial](https://try.github.io) on using git.

GitHub also lets you complete many Git-related actions without using the command line, including: Creating a repository, Forking a repository. For more information on this we recommend the GitHub [getting started with git guide](https://help.github.com/articles/set-up-git/).

### Referral SaaSquatch and GitHub

At Referral SaaSquatch we use GitHub as the basis for tracking and versioning custom themes. In this way, every Referral SaaSquatch custom theme is actually it's own GitHub repository.

We do this because referral programs are usually a collaboration between a lot of people, such as:

- **Creative directors** - want to maintain brand guidelines
- **Front-end developers** - that want pixel perfect, hex-code exact, matching with their other assets
- **Copy writers** - that want to update each individual piece of text, share message and notification
- **Referral SaaSquatch developers** - who can help you customize your widget

Git lets all of these people work on the referral program's theme in parallel without ever losing anyone's changes. It also maintains a history so that we can test new wording, layouts and changes, and roll back those changes if they don't produce the desired results.

#### Using your Theme Repository

**Pro** and **Enterprise** customers should contact our [support](mailto:support@saasquat.ch) team to get access to your custom theme repository.

1. Clone your [GitHub repository](/themes/git)


    ```

git clone https://github.com/saasquatch/MY_CUSTOM_THEME_NAME

```
  2. Modify the [templates](/themes/templates) and [assets](/themes/assets) in your theme
  3. Commit your changes to your GitHub repository when you are ready to test them
  4. [Publish](/themes/publish) your updated theme to your test tenant
  5. Preview your changes in your development environment configured for your test tenant
  6. [Publish](/themes/publish) your theme to your live tenant

Changes can be made to your theme using this development process even once your referral program is live. You can test out updates to your theme on your test tenant before pushing them to your live program to make sure that everything works before your customers see the changes.

---

### File Layout

At its core your custom theme is a series of files and folders organized in a standard layout. Handlebars [templates](/themes/templates) are located in the `templates` folder, [assets](/themes/assets) in the `assets` folder,
and [variables](/themes/variables) defined in `variables.json` schema file.

```

├── /assets
| ├── /css
| ├── plaincss.css
| └── lesscss.less
| ├── /js
| └── myscript.js
| └── /images
| └── logo.png
├── /templates
| ├── widget.hbs
| └── partial.hbs
├── variables.json
└── Readme.md

```

```
