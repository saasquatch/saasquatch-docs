Referral SaaSquatch Documentation
=============

[![Build Status](https://api.travis-ci.org/saasquatch/saasquatch-docs.png)](https://travis-ci.org/saasquatch/saasquatch-docs) [![Dependency Status](https://david-dm.org/saasquatch/saasquatch-docs.svg)](https://david-dm.org/saasquatch/saasquatch-docs)

We decided to make the [Referral SaaSquatch documentation](http://docs.referralsaasquatch.com/) site an open source project so that we could get help from all of the lovely people out there. Contributing is easy because the documentation is either vanilla HTML or Markdown.

 - [Live Referral SaaSquatch documentation](http://docs.referralsaasquatch.com/)


Contributing
-------------

The site is a simple [Metalsmith](http://www.metalsmith.io/) static site hosted on [Divshot](http://divshot.io).

To contribute:

 1. Clone this repo
 2. Add or edit an article in the `src` folder
 3. Run `npm install` followed by `node app.js` to run locally and verify your changes
 4. Submit a pull request to the `staging` branch.

We'll roll in changes once the [Travis CI build](https://travis-ci.org/saasquatch/saasquatch-docs) passes and someone finishes code review.


Wishlist
-------------

 - [ ] Get the LiveReload browser extension working with C9. [Use gulp?](https://github.com/FWeinb/metalsmith-watch/issues/4#issuecomment-58769378)
 - [ ] Look into Metalsmith-templates usage of `in-place` for easier mixed templates (like for robot.txt)
 - [ ] Get the _prose.yml fields for `metadata` to work with files in sub-directories