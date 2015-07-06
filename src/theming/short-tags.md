---
title: Short Tags Reference
highlights: Short tags highlights
slug: themes/short-tags
template: themes.html
---


The portal share message editor allows you to write the default messages that will be used to refer people to your product. These messages can incorporate handlebars-style variables (link?) to allow for easy customization around the current referral program context, and can include references to template fields (link) and **short tags**. Short tags act as an alias to longer commonly used template fields, and may provide more complicated additional functionality such as conversion of currency unit (i.e. cents to dollars). The following table presents each of the currently available short tags. 


Short tags and fields can be included in your messaging by placing the name of the variable between symmetric curly brackets (i.e. {{emailsharelink}} or {{user.firstName}})) following the handlebars convention.

<h3>Supported Short Tags</h3>

<table class="table">
    <tr>
        <td>companyname</td>
        <td>[Less](http://lesscss.org/) files will be **compiled and minified with the less compiler**</td>
    </tr>
    <tr>
        <td>emailsharelink</td>
        <td>Css files will be served with appropriate content-type headers but without any minifcations or modifications.</td>
    </tr>
    <tr>
        <td>facebooksharelink</td>
        <td>Js files will be served raw with appropriate content-type headers. Error checking and linting should be done prior to upload.</td>
    </tr>
    <tr>
        <td>twittersharelink</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referralcode</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrerpercentdiscount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referredpercentdiscount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrerpercentlength</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referredpercentlength</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrerrewardamount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrerrewardunit</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referredrewardunit</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrerdollaramount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referreddollaramount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referrertimeamount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
    <tr>
        <td>referredtimeamount</td>
        <td>Image files will be served zwith appropriate content-type headers but without any minifications. Uploaded images should be optimized for web prior to including them as assets.</td>
    </tr>
</table>