---
title: Templates in Themes
highlights: Referral SaaSquatch templates use **Handlebars**. Handlebars let you include dynamic information, like the number of referrals someone has made, inside of your referral widget.
slug: themes/templates
sectionType: themes
template: article.html
---

Templates are easy to use. Here's an example template:

```hbs
You have referred {{referralsLength}} friends.
```

With Handlebars, you can create the static HTML just the way you want it, and then substitute in Handlebars expressions wherever you need dynamic data. For example you might output a the number of referrals using `{{referralsLength}}` - this is a handlebars expression for referencing
a [field](/themes/fields) called `referralsLength`. All Handlebars expressions are contained in either double `{{` or triple `{{{` curly braces, so they're easy to spot.


You can customize the wording of your referral program by changing your template. For example, here are three different ways to show someone the number of people that they have successfully referred.

```hbs
You have referred {{referralsLength}} friends.
```
```hbs
{{referralsLength}} people referred.
```
```hbs
Thanks for referring {{referralsLength}} of your colleagues!
```

To get Referral SaaSquatch to understand your HTML files as being theme files, you'll need to use the `.hbs` file extension and place it in the `/templates` folder. 

Here's a more detailed example:

```hbs
<p>You have referred {{referralsLength}} friends.</p>
<ul>
{{#each referrals}}
<li id="row-{{@index}}">
  You referred {{referredUser.firstName}} on <span data-moment="true">{{dateReferred}}</span>
</li>
{{/each}}
</ul>
```

This example uses more dynamic pieces like `{{referrals}}` and `{{#each}}`. Check out the [Fields reference](/themes/fields) and [Helpers reference](/themes/helpers) for a full list of things that you can use in your templates.


### Partials


Templates can extend another template, which means that all your base HTML doesn't have to be repeated. There is also 
support for partial templates, meaning you can share blocks of HTML between multiple templates. Using these features it's possible to reduce code 
duplication and keep individual templates focused on doing a single job to keep your theme lightweight and easy to maintain.

Building your theme using pieces (called template "partials") can be easily rolled in using the `>` sign.

```hbs
{{>myPartial}}
```

This example will find and load the `myPartial.hbs` file.


### Where can I find more info on Handlebars?

 - Get started with [Handlebars.js docs](http://handlebarsjs.com/)
 - Look at [handlebars.java](https://github.com/jknack/handlebars.java)
 - [Fields reference](/themes/fields)
 - [Helpers reference](/themes/helpers)
