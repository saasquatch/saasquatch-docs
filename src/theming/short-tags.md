---
title: Short Tags Reference
highlights: The messages your customers use to refer others to your product can be customized to suite your needs. This reference describes the ways in which you can customize such messaging via the portal. 
slug: themes/short-tags
template: themes.html
---


The **portal share message editor** allows you to write the default messages that will be used by your customers to refer others to your product. These messages can incorporate Handlebars-style variables to allow for easy customization around the current referral program context, and can include references to [template fields](/themes/fields) and **short tags**. Short tags act as an alias to longer commonly used template fields, and may provide more complicated additional functionality such as conversion of currency unit (*i.e. cents to dollars*). The following table presents each of the currently available short tags. 


Short tags and fields can be included in your messaging by placing the name of the variable between symmetric curly brackets (*i.e.* `{{emailsharelink}}` *or* `{{user.firstName}}`) following the [Handlebars convention](http://handlebarsjs.com/). Embedded template fields with corresponding short tag aliases will be **replaced** with their respective short tags when viewed in the portal share message editor.

<h3>Supported Short Tags</h3>

<table class="table">
    <tr>
        <td>companyname</td>
        <td>The name of the company for the referral program as configured on your *portal settings page*.<td>
    </tr>
    <tr>
        <td>emailsharelink</td>
        <td>The link that should be used to *establish a referral via email*. Use this in the email share body tab of your portal share message editor.</td>
    </tr>
    <tr>
        <td>facebooksharelink</td>
        <td>The link that should be used to *establish a referral via Facebook*. Use this in the Facebook share body tab of your portal share message editor.</td>
    </tr>
    <tr>
        <td>twittersharelink</td>
        <td>The link that should be used to *establish a referral via Twitter*. Use this in the Twitter share body tab of your portal share message editor.</td>
    </tr>
    <tr>
        <td>referralcode</td>
        <td>The code that the current user will use for sharing. If your program includes a place to enter a referral code then include this code in the body of your share messages.</td>
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