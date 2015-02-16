---
title: Custom Themes
highlights: The Referral SaaSquatch theme engine lets you build a custom widget to exactly match your brand
slug: themes/custom
template: themes.html
---

### Getting Started

 - Custom themes are only available on <b>Pro</b> and <b>Enterprise</b> plans</li>
 - A custom theme is just a <b>Git repository</b>
 - To get started email <a href="mailto:support@saasquat.ch">support@saasquat.ch</a> or your account manager


<hr/>

### Customizing your theme

Every theme is a git repository containing templates and assets. Changes to themes simply
involve changing those files, and pushing those changes into your test or live tenant. To start checkout your git repository and start making changes to the files in that repo. 
Reads the docs on using [assets](/themes/assets) to upload CSS, Images and Javascript and read
the handlebars guide on creatings `.hbs` files.

```
git clone http://gitorigin.com/repo
```

Once you've made changes that you'd like to preview in your test account, start by pushing those changes
to the configured git remote.

After changes have been pushed to the git repo, they can be pulled into 
your test tenant or live tenant using the theme publish tool. The ideal workflow would be:

  1. Publish your theme to your test tenant
  2. Preview in your development environment
  3. Publish your theme to your live tenant

```
git commit
git push origin
deploy.sh -t test_a081lut1vm7nu -k TEST_nFnurmR978SrzNrdlbTheNAbtPCdYAyd
```
