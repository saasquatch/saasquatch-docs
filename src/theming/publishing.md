---
title: Publishing Custom Themes
highlights: Custom referral saasquatch themes can be published using the Command Line Interface.
slug: themes/publish
template: themes.html
---


SaaSquatch-CLI is a command-line tool for interacting with your Referral SaaSquatch account. It is distributed as a [Node.js](http://nodejs.org/) module via [NPM](https://www.npmjs.com/package/saasquatch-cli) and is open source on [Github](https://github.com/saasquatch/saasquatch-cli).

### Install saasquatch-cli

You can install the CLI using NPM. If you haven't used NPM before you should take a moment and read through the [NPM Getting Started guide](https://docs.npmjs.com/getting-started/what-is-npm).

```bash
npm install -g saasquatch-cli
```

Note: The `-g` flag here installs `saasquatch-cli` in global mode into current package context, making it easier to deploy a theme from any directory.


### Using saasquatch-cli

Once installed you can use saasquatch-cli via the command line

```bash
saasquatch-cli --help
```

For example, to publish a theme.

```bash
saasquatch-cli publish -t test_alu125hh1si9w -k TEST_BHASKh5125Las5hL125oh3VbLmPxUSs
```

We also as an easy way to edit and publish a custom theme for those that aren't custom themes. 

<img src="/assets/images/cli-demo.gif" />
