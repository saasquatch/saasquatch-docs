---
title: Custom Themes
highlights: The Referral SaaSquatch theme engine lets you build a custom widget to exactly match your brand. Change layout, wording, colors, fonts and styles to white-label your program. Upload custom images, CSS and Javascript to power A/B testing, interactive new widgets and new sharing experiences. Work with your Referral SaaSquatch account manager to have the Referral SaaSquatch enterprise team design and implement something new for you, or bring in your own UI/UX team to do the work.
slug: themes/custom
sectionType: themes
template: article.html
---


![Custom theme example](/assets/images/tablet-screenshot.jpg)



### Getting Started with Custom Themes


<div class="row-fluid">
<div class="span4" style="min-height: 150px">

<h3><span class="badge badge-inherit">1</span> Set up</h3>

Sign up for **Pro** or **Enterprise** and [open a support ticket](mailto:support@saasquat.ch) to get set up with a base custom theme [Git repo](/themes/git).

</div>
<div class="span4" style="min-height: 150px">

<h3><span class="badge badge-inherit">2</span> Modify</h3>

Make changes [templates](/themes/templates), add dymanic [fields](/themes/fields) and upload [assets](/themes/assets).

</div>
<div class="span4" style="min-height: 150px">

<h3><span class="badge badge-inherit">3</span> Publish</h3>

Commit changes to your [Git repo](/themes/git) and then [publish](/themes/publish) those changes to your test or live account

</div>
</div>

### Customizing your theme

Every theme is a git repository containing [templates](/themes/templates) and [assets](/themes/assets). Changes to themes simply
involve changing those files, committing them to your custom theme's [Git repo](/themes/git) and then [publishing](/themes/publish) those changes into your test or live tenant. 

To start clone your custom theme's git repository and start making changes to the files in that repo.
Reads the docs on using [assets](/themes/assets) to upload CSS, Images and Javascript and read
the [templates](/themes/templates) guide on creatings `.hbs` files.

```
git clone https://github.com/saasquatch/custom-theme
```

Once you've made changes that you'd like to preview in your test account, start by pushing those changes
to the configured git remote.

After changes have been pushed to the git repo, they can be pulled into 
your test tenant or live tenant using the theme publish tool. The ideal workflow would be:

  1. Clone your [Git repo](/themes/git)
  2. Modify the [templates](/themes/templates) and [assets](/themes/assets)
  3. Commit changes to your [Git repo](/themes/git)
  4. [Publish](/themes/publish) your theme to your test tenant
  5. Preview in your development environment
  6. [Publish](/themes/publish) your theme to your live tenant

---

### File Layout

Custom themes are just a bunch of files organized in a standard layout. Handlebars [templates](/themes/templates) are located in the `templates` folder, [assets](/themes/assets) in the `assets` folder,
and [variables](/themes/variables) defined in `variables.json` schema file.

```
├── /assets
|   ├── /css
|       ├── plaincss.css
|       └── lesscss.less
|   ├── /js
|       └── myscript.js
|   └── /images
|       └── logo.png
├── /templates
|   ├── widget.hbs
|   └── partial.hbs
├── variables.json
└── Readme.md
```