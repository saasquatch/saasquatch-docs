---
title: Writing a Web Component for SaaSquatch
highlights: "This tutorial will explain how to use [Stencil](https://stenciljs.com/) to build web components to work inside of a SaaSquatch widget. We recommend Stencil for those new to web components and familiar with React-style development."
slug: developer/widgets/writing-a-web-component-for-saasquatch
sectionType: guide
template: hasTableOfContents.html
date: 2022-06-09
---

## Web Components

SaaSquatch widgets are based on standard HTML and use [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) as the building blocks for your user experience. This makes extending the SaaSquatch widget experience possible for web developers familiar with these web technologies.

All of SaaSquatch's components are __web components__, for example the component for showing a sharelink with a copy button looks like this:

```html
<sqh-copy-link-button text="Copy" buttoncolor="#5C6164" textcolor="#FFFFFF"></sqh-copy-link-button>
```

In order write web components, you need to write Javascript. This tutorial walks you through using [Stencil](https://stenciljs.com/), a web component compiler, that makes writing web components easier for those familiar with React-style development.

> SaaSquatch also supports web components built frameworks besides Stencil. Some examples include [Vue](https://vuejsdevelopers.com/2018/05/21/vue-js-web-component/), [Angular](https://angular.io/guide/elements) and [React](https://reactjs.org/docs/web-components.html#using-react-in-your-web-components).

## Create your Component Package

To get started with [Stencil](https://stenciljs.com/), there’s some excellent documentation on the Stencil website.

1. Read the Stencil [Getting Started](https://stenciljs.com/docs/getting-started) documentation
2. Create a new Stencil project `npm init stencil`
3. Create a component library
4. Develop your component library locally using `npm start`
5. Build your component library for production using `npm run build`

Once you’re done building your component, you’re ready to deploy it to NPM and start using it in your SaaSquatch widget.

> Contact support@saasquatch.com for a verion of our widget starter. A pre-built npm package template with helpful examples and boilerplate. 

### Editability 
Editability is an important part of developing web components for SaaSquatch. You can utilize the power of the SaaSquatch widget editor and make changes to your components without having to edit your HTML. 

1. Read the [Stencil Docs Target Read Me](https://www.npmjs.com/package/@raisins/stencil-docs-target) for component and attribute annotation information
2. Run `npm install @raisins/stencil-docs-target` in your stencil package
2. Add `plugin({outDir: 'docs'})` as an Output Target in your `stencil.config.js` 
3. Add `"docs/"` in the files array of your `package.json`
4. Add `"raisins": "docs/raisins.json"` in your `package.json` 
5. Annotate your components and their attributes

## Deploy to NPM

SaaSquatch has a CDN for serving static assets (Javascript, CSS, Images, Icons) from NPM. To include your components, first deploy to NPM.

1. Pick a unique NPM package name, e.g. `my-company-components`
2. Make sure you’ve built with `npm run build`
3. Deploy to NPM with `npm publish`

## Add your component library as a dependency

You will need to add your new NPM package as a **dependency** of your widget inside of SaaSquatch for it to show up.

1. [Login to SaaSquatch](http://app.referralsaasquatch.com/)
2. Edit your widget
3. Click on **Settings** in the sidebar of the widget editor
4. Click on **Add Package**
5. Click on **Add from NPM**
6. Include your NPM package name for the version number you just deployed
7. For file path, this is usually something like `/dist/my-company-components/my-company-components.js`
5. Click **Add** on the form
6. Press Save on the widget editor
7. Refresh the page

## Include your components in the HTML

Now that you have included your component library as a dependency, you are ready to put your components into your widget where they’re needed.

1. Click the **< >** icon in the header
2. Edit the HTML and include your new component. For example, add `<my-company-form></my-company-form>` after the `<sqh-share-buttons>` but before the `<sqh-referral-list>`
3. Click the paintbrush icon in the header

Once you’ve completed these steps, you should see your component render in the editor. When you are happy with your changes, click the save button to apply your changes.

## Troubleshooting

Now that your component is in the HTML, it should be rendering in the page. If it is not rendering, here are some common things to look at to make sure you got it right.

- Make sure that your component renders in your development environment when you run `npm start`. If it doesn’t, then you probably have a problem with your Stencil source code, and should consult the [Stencil documentation](https://stenciljs.com/docs/introduction) or [Stencil slack community](https://stencil-worldwide.herokuapp.com/).
- Make sure you spelled your NPM package name correctly. You can [search NPM](https://www.npmjs.com/) to make sure it exists on NPM. If you can’t find it, make sure you successfully published it with `npm publish`.
- Make sure your NPM package is loading correctly. Once you’re added the package as a dependency, you can check your browser console to see if your code has produced any errors when loading.
- Make sure you’ve spelled your component name correctly. The stencil tutorial starts with a component called `my-first-component` that is included in HTML as `<my-first-component name="Max"></my-first-component>`.
- Make sure your component is in your HTML. Click on **< >** and check if your component is in there. If not, then retry the steps for including your HTML.
