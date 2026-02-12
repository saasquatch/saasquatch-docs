---
title: Customizing Microsite Layouts and Pages
highlights: Learn about the features of the SaaSquatch microsite editor and how to use them to create your microsite. 
slug: building-programs/microsites/customizing-microsites
sectionType: designerArticle
template: hasTableOfContents.html
date: 2023-02-28
robotsTag:
  - FOLLOW
---

> __Note:__ If your microsite was created before August 2022, then you might be using an older version of our microsites feature that can’t be edited using the microsite editor. Contact our Success team to see if your microsite is eligible for an upgrade.

This guide will walk you through how to use the microsite editor to create a microsite that reflects your brand and provides an engaging experience for your end users.

If you haven’t created a microsite yet, then you’ll need to do so in the SaaSquatch Admin Portal first. Our [setup doc](/building-programs/microsites/quickstart-guide/) provides step-by-step instructions on how to do this. Before attempting to set up a microsite, make sure your plan supports one. If you’re not sure or would like to talk about upgrading, then reach out to our Success team for details. 

Our [microsite editor doc](/building-programs/microsites/microsite-editor) explains the user interface, microsite structure (including layouts, pages, and components), and what’s included by default if you used auto setup to create the microsite.

> __Warning:__ The microsite editor does not autosave your changes. Click Save frequently to make sure you don't lose your work.

## Change your microsite's branding
This step is optional and can be skipped if you don’t want to make changes.

### Modifying the brand container
Your Base layout contains a brand container component that controls your microsite’s font and brand colors. Brand colors are used by an array of components within your user experience, including highlight colors and button colors.

1. Go to the microsite editor.
    <ol>
     <li> In the Admin Portal, click the <b>Content</b> tab.</li>
     <li> On the microsite card, click <b>Edit Content</b>.</li>
   </ol>
2. Click __Microsite__ in the Navigate submenu.
3. Click the __Microsite Base layout__ in the Microsite tab.
4. Under the Current Layout submenu, click __Layers__.
5. Click the __Brand Container__ component.
6. Edit the component properties in the Add/Edit menu:
    - Color
    - Font
7. Click __Save__.

### Customizing the microsite header
You can add a clickable header image that redirects your users to a page you designate. Set it up in the Base layout.

1. Click __Microsite__ in the Navigate submenu.
2. Click the __Microsite Base layout__ in the Microsite tab.
3. Under the Current Layout submenu, click __Layers__.
4. Click the __Microsite Frame Header Content__ component.
5. Update the image and adjust its height and width as desired.
6. Set the redirect path. This is where your users will be redirected upon clicking the image.

## Create a new layout or page
1. In the microsite editor, click __Microsite__ in the Navigate submenu.
2. Click the __Add Page__ or __Add Layout__ button.
3. (Optional) Select the layout that you want to act as the parent layout using the Inherited Layout dropdown menu.
    - __Note:__ We recommend that your new layout/page inherit either the logged in or logged out layouts for site organization purposes. However, you can skip this step if you want to make a new, top-level layout or page.
> __Example:__ If you want to add a landing page to your site that anyone can see regardless of whether they’re a logged in user, you can nest a new page within the Base layout.
4. Enter the page title or layout name.
5. Enter the URL for your page.
    - __Note:__ Add a slash before the name you want to use and use hyphens if you want to have a multi-word URL, e.g., `/company-info` rather than `/company info`.
6. __Required:__ Choose who you want to be able to see your page.
    - __Verified:__ Logged in users only
    - __Unverified:__ Logged in users who haven't verified their email addresses
    - __Public:__ Viewable by anyone
    - __Note:__ If you created a custom landing page in Step 3, then make sure you choose Public from the Allowed Users dropdown so that everyone can see your page.
7. If your page is accessible only to verified users, then choose the page where you want disallowed users to be sent from the Redirect dropdown.
8. Click __Add__.
9. Click __Save__.
10. (Optional) Add the new page to the microsite sidebar menu.

## Add layout and page content
Components are how you add content to your layouts and pages. For example, clients commonly add header images or footer text to layouts, and add statistics or share links to pages.

1. In the microsite editor, click the name of the layout or page you want to edit.
2. In the Add/Edit menu, click the category of component that you would like to add.
3. Click the green __Add to__ button where you want the component to appear on the canvas.
4. Adjust the component properties in the Add/Edit menu.
    - __Note__: If you added a text component, then you can edit the text directly on the canvas. You won’t see additional properties in the Add/Edit menu.

## Apply a template to a layout or page
You can apply a template to your new layout or page if you don’t want to start from scratch.

1. Click __Microsite__ in the Navigate submenu.
2. Click on the name of your new layout or page.
3. In the left sidebar menu, click __Templates__.
4. Apply the template you want to use.
5. Click __Save__.

## Edit the microsite's sidebar
This is recommended if you want logged in users to be able to navigate to a page from the sidebar. The most common use case will be if you add a new page to the logged in layout. These steps will show you how to do so, but you can adapt them if you want to add a sidebar item to another layout.

1. Open the Microsite tab.
2. Click the __Microsite Logged In layout__.
3. Click the __Add__ tab of the Add/Edit menu.
4. Expand the Microsite Components category and click __Sidebar Item__.
5. Click the green __Add to sidebar content__ button where you’d like the new page to appear.
6. Return to the __Edit__ tab of the Add/Edit menu.
7. Select an icon to represent the page.
8. Enter the label.
9. Select the page from the Navigation Path dropdown.
10. Click __Save__.

## Preview and save

### Previewing your microsite
Preview how the microsite will appear to your participants by clicking the eye icon from the top menu bar. You can switch between a preview of the experience for desktop, tablet, or mobile users by clicking the respective device icon.

To return to the editing interface, click the paintbrush icon from the top menu bar.
### Saving your microsite
> __Warning:__ The microsite editor does not autosave your changes. Click Save frequently to make sure you don't lose your work.

When you click Save, the changes will instantly appear in the live version of your microsite.

## Advanced customization options

### Installing custom packages
If you want to use custom components to build your microsite, then you can install a custom package.

1. Go to the SaaSquatch Admin Portal.
2. Click __Content__ in the top menu bar.
3. Click the __Edit settings__ button on the microsite card.
4. Under the Site Hosting heading, click the __Edit__ button next to Packages.
5. Click __Add Package__.
6. Click __Add from NPM__.
7. Enter the package name, file path, and version.
8. Click __Add__.
9. Click __Save__. 

Return to the microsite editor to start adding your custom components to your site.

### Writing a web component for SaaSquatch
SaaSquatch widgets are based on standard HTML and web components. This makes extending the SaaSquatch widget editing experience possible for web developers familiar with these web technologies. See our doc on [writing a web component for SaaSquatch](/developer/widgets/writing-a-web-component-for-saasquatch/) for details.

### Editing microsite HTML/CSS
You can edit the HTML or CSS to further customize your microsite’s layouts and pages. While the HTML editor allows for additional flexibility in design, keep in mind that the SaaSquatch team is unfortunately unable to troubleshoot any adjustments made with custom HTML or CSS.

1. Open the microsite editor.
2. Select the layout or page that you want to edit from the tree in the microsite tab.
3. Click the brackets < > icon in the top menu bar.
4. Make edits in the code.
5. To view the effects of your edits, click the paintbrush icon to return to the microsite editing interface.
6. Once you’re happy with the results, click __Save__.

## If you need help
For further assistance with the design and editing of your microsite using the basic customization options, feel free to reach out to our [Support team](mailto:support@saasquatch.com).