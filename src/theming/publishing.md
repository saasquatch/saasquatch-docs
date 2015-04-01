---
title: Publishing Custom Themes
highlights: Custom referral saasquatch themes can be published using the Command Line Interface.
slug: themes/publish
template: themes.html
---


[saasquatch-cli](https://github.com/saasquatch/saasquatch-cli) is a command-line tool for interacting with your Referral SaaSquatch account. It is distributed as a [node.js](http://nodejs.org/) module via [npm](https://www.npmjs.com/package/saasquatch-cli).

### Install saasquatch-cli

You can install saasquatch-cli using npm. If you haven't used npm before you should take a moment and read through the [npm Getting Started guide](https://docs.npmjs.com/getting-started/what-is-npm).

```bash
npm install -g saasquatch-cli
```

Note: The `-g` flag here installs `saasquatch-cli` globally, making it easier to deploy a theme from any directory.


### Using saasquatch-cli

Use saasquatch-cli via the command line:

```bash
squatch --help
```

For example, to publish a theme:

```bash
squatch publish -t test_alu125hh1si9w -k TEST_BHASKh5125Las5hL125oh3VbLmPxUSs
```

We also have an easy way to edit and publish a custom theme for those that aren't custom themes.

<img src="/assets/images/cli-demo.gif" />
