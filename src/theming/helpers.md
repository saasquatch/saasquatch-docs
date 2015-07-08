---
title: Helpers
highlights: Helpers are functions that you can use in your Handlebar template files to help generate your theme.
slug: themes/helpers
template: themes.html
---

### What is a helper?

A helper is a block that helps you provide some logic in your <a href="/themes/templates/">templates</a>.

```
{{#if user.imageUrl}}
    <img src="{{user.imageUrl}}" >
{{/if}}
```

<hr/>

### Handlebars.java Helpers

The Referral SaaSquatch template system is built using [Handlebars.java](http://jknack.github.io/handlebars.java/) and comes with a number of built-in helpers:

 * **if** - check for truthiness
 * **each** - loop through lists
 * **with** - change the context 
 * **unless** - check for falsiness
 * **block** - create a block that can be overridden by subtemplates
 * **partial** - load a partial

<hr/>

### Referral SaaSquatch Helpers

The Referral SaaSquatch template system also includes a few custom helpers built specifically to help you run your theme.

 * **[assets](/themes/assets/)** - a custom helper for serving [assets](/themes/assets/)
 * **[variables](/themes/variables/)** - a helper that renders a variables value
 * **squatchHead** - includes basic Javascript and CSS to make your theme function with [squatch](/squatchjs/)

