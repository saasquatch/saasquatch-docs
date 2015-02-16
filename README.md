Referral SaaSquatch Documentation
=============

[![Build Status](https://api.travis-ci.org/saasquatch/saasquatch-docs.png)](https://travis-ci.org/saasquatch/saasquatch-docs)

We decided to make the [Referral SaaSquatch documentation](http://docs.referralsaasquatch.com/) site an open source project so that we could get help from all of the lovely people out there. Contributing is easy because the documentation is 99% plain HTML.


Contributing
-------------

The site is a simple [Play Framework 2.0](http://www.playframework.com/) application. The only gotcha is that the `@` character is a reserved character, so you need to use `@@` to escape it in any scala.html files.

    play run
    
To make sure that everything is good, run the tests.

    sbt test
    

When you're done with edits, just submit a pull request, and we'll roll it in once the [Travis CI build](https://travis-ci.org/saasquatch/saasquatch-docs) passes and someone finishes code review.


Pre-Release Checklist
-------------
 
 [_] Implement a 404 page. (Branch the Metalsmith-Serve plugin? Or change deploy to use Php/S3/etc?
 [_] Implement redirects for moved pages


Wishlist
-------------

 [_] Get the LiveReload browser extension working
 [_] Support markdown fields in Yaml front-matter for e.g. RS-001 issue descriptions (custom swig tag?)