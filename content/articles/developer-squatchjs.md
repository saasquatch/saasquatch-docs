---
title: Squatch.js JavaScript Library
slug: developer/squatchjs
sectionType: guide
template: hasTableOfContents.html
date: 2023-09-20
---

## About squatch.js
Squatch.js, our JavaScript SDK, has all the functionality required to incorporate a SaaSquatch program into your website or web app. Squatch.js can:
- Track referrals and create referral connections automatically
- Display widgets on a web page
- Generate unique referral links
- Send event data to the SaaSquatch ecosystem

Version 2 of squatch.js is flexible and fully HTML4 compliant. This version of squatch.js uses the UMD (Universal Module Definition) API, allowing us to remain compatible with the latest modules running in the client, on the server or elsewhere (including ES6, CommonJS, SystemJS and AMD, among others). Squatch.js Version 2 also provides support for a wide range of build tools, including Browserify, Webpack, NPM and Babel. 

## Install squatch.js
To power your program with squatch.js, you can take one of the installation paths below. 

### (Recommended) Get personalized scripts from the Install page
To start using squatch.js in your implementation, we recommend following along with __Settings > Install__ page in the SaaSquatch Admin Portal. The page contains instructions on configuring squatch.js for several key use cases and generates the code snippets you’ll need to use for installation.

### Reference generic examples in our squatch.js Scripts doc
Our [squatch.js Scripts](/developer/squatchjs/v2) doc has a list of the key squatch.js scripts you may need for your implementation. These are general scripts and will need to be replaced with tenant- and program-specific information to function as intended.

### Install squatch.js through NPM

The SaaSquatch squatch.js library is [available as a package](https://www.npmjs.com/package/@saasquatch/squatch-js) that can be installed through NPM. Installing squatch.js in this way avoids having to reload the library again each time a page is loaded. Here’s how to do it:

1. Install squatch.js through NPM using the following command: `$ npm install @saasquatch/squatch-js` 
2. Add squatch.js to your app so that it’s available on every page. You can use one of the following methods where applicable:
    - `import * as squatch from "@saasquatch/squatch-js";`
    - `var squatch = require("@saasquatch/squatch-js");`
3. Use squatch.js normally.  Learn more about loading the squatch.js tracking script and widget in our squatch.js Scripts doc.

## Learn more
- [squatch.js Scripts](/developer/squatchjs/v2): See general examples of the most important scripts you’ll need when implementing a SaaSquatch program. 
- [Advanced Use Cases](/developer/squatchjs/v2/advanced-use-cases): Go beyond the basic scripts and learn how to reference existing user data, render a widget without requiring user information, and more.
- [Signed Requests](/developer/squatchjs/signed-requests): Learn how to require a JWT or an API key when sending data to SaaSquatch. 
- [Tracking Cookies](/developer/squatchjs/cookies): Learn more about squatch.js and first-party cookies. 
- [Issue Code List](/developer/squatchjs/issue): Find details and troubleshooting steps about error codes you encounter.
- [squatch.js Reference](https://saasquatch.github.io/squatch-js/): Full list of methods available. 
