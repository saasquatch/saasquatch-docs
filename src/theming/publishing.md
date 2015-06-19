---
title: Publishing Custom Themes
highlights: Custom referral saasquatch themes can be published using the Command Line Interface.
slug: themes/publish
template: themes.html
---

Once you've made changes to a theme and pushed those changes to you remote git repository, you'll want to publish those changes to your tenants to see how they look in a live environment. To publish themes,
use the saasquatch-cli. The [saasquatch-cli](https://github.com/saasquatch/saasquatch-cli) is a command-line tool for interacting with your Referral SaaSquatch account. It 
is distributed as a [node.js](http://nodejs.org/) package via [npm](https://www.npmjs.com/package/saasquatch-cli).

<div class="bs-callout bs-callout-info">
  <h4>Node.js and NPM required</h4>
  The only requirement for installing the saasquatch-cli is that you have Node.js and NPM installed on your computer. The fastest way to install Node is to 
  [download and install one of the node.js pre-packaged installers](https://nodejs.org/).
</div>

### Install saasquatch-cli

You can install saasquatch-cli using npm. If you haven't used npm before you should take a moment and read through the [npm Getting Started guide](https://docs.npmjs.com/getting-started/what-is-npm).
Use this command to install saasquatch-cli as a globally accessible package. This will add the `squatch` executable to your global path.

```bash
npm install -g saasquatch-cli
```


### Using saasquatch-cli

You can use saasquatch-cli via the command line as `squatch`. It is self-documented, so to start look at the list of command using `--help`.

```bash
squatch --help
```

For example, to publish a theme:

```bash
squatch publish -t test_alu125hh1si9w -k TEST_BHASKh5125Las5hL125oh3VbLmPxUSs
```


<img src="/assets/images/cli-demo.gif" />


<div class="bs-callout bs-callout-warning">
  <h4>squatch renamed</h4>
  As of v1.0.0 the executable was renamed from `saasquatch-cli` to `squatch`. To make sure you're always using the latest version, you can update
  the installed version with `npm update -g saasquatch-cli`. The node package and github repo names and core functionality are unchanged.
</div>