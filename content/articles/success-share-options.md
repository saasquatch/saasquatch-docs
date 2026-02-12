---
title: Referral Program Sharing Options
highlights: How you can customize the SaaSquatch referral sharing experience across web, mobile, social, and email marketing channels.
slug: success/share-options
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-17
---

<div class="row-fluid">
  <div class="span8">

<p>Your referral program participants have a wide range of ways that they can engage with the referral program to share out their referral: through a popup or embedded <a href="/topics/widget-types/">widget</a>, a notification or transactional email, or a mobile app. More information on the different engagement mediums for your referral program can be found in our <a href="/success/touchpoints/">Referral Marketing Channels</a> article. 

<p>From each of these engagement mediums there are a number of ways that a participant in your program can share out their referral. This article outlines each of the available sharing mediums in your referral program, how you can configure them, and the experience users will have using them.

</div>

<div class="span4">
<div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-17_at_8.42.37_AM_7dEM8mMIxj8Y1CKTjZ7lNC.png" data-lightbox="example-set">
  <img src="/assets/images/contentful/Screen_Shot_2019-09-17_at_8.42.37_AM_7dEM8mMIxj8Y1CKTjZ7lNC.png" alt="referral widget">
  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
</div> 

### Links
<div class="row-fluid">
  <div class="span8">

<p>Each user in your referral program has a unique link that they can share with family and friends as an easy way to make referrals. These links will direct the referred user to the landing page you have configured for your referral program. 

<p>Our <a href="/developer/squatchjs/">Squatch.js</a> Javascript tracking script will then automatically attribute the referral back to the correct referrer.

<p>A referral participant can easily access their unique links from their Referral Widget in your product, or from any email that you have included the links in.

<p>Share links use the SaaSquatch short domain <code>ssqt.co</code> by default, but can also be <a href="/customshortdomainguide/">configured</a> to use your own domain or subdomain.

</div>

<div class="span4">

<div>
<a class="docs-lightbox" href="/assets/images/contentful/sharelink_widget_6HnGONK3EwoorxKClAzDjp.png" data-lightbox="example-set">
<img src="/assets/images/contentful/sharelink_widget_6HnGONK3EwoorxKClAzDjp.png" alt="referral widget link">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
</div>
</div>

There are also a number of UTM parameters which the SaaSquatch system appends to the referral program landing page URL to help with tracking:

<table class="table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Example</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Source</td>
        <td><code>utm_source=invite</code></td>
        <td><a href="https://support.google.com/analytics/answer/1033863?hl=en#parameters">Google Analytics-compatible</a> traffic source identifier</td>
      </tr>
      <tr>
        <td>Medium</td>
        <td><code>utm_medium=link</code></td>
        <td><a href="https://support.google.com/analytics/answer/1033863?hl=en#parameters">Google Analytics-compatible</a> advertising or marketing medium</td>
      </tr>
      <tr>
        <td>Campaign</td>
        <td><code>utm_campaign=saasquatch</code></td>
        <td><a href="https://support.google.com/analytics/answer/1033863?hl=en#parameters">Google Analytics-compatible</a> campaign name</td>
      </tr>
      <tr>
        <td>Referral Code</td>
        <td><code>rsCode=JOHNDOE</code></td>
        <td>The <a href="#referral-code">referral code</a> of the Referrer</td>
      </tr>
      <tr>
        <td>Engagement Medium</td>
        <td><code>rsEngagementMedium=EMBED</code></td>
        <td>The medium from which the Referrer engaged with the referral program (e.g. embedded widget)</td>
      </tr>
      <tr>
        <td>Share Medium</td>
        <td><code>rsShareMedium=TWITTER</code></td>
        <td>The medium through which the Referrer shared their referral (e.g. Twitter share button)</td>
      </tr>
    </tbody>
  </table>

### Messages on Facebook, Messenger and LinkedIn
The SaaSquatch system makes use of [Open Graph](http://ogp.me/) to include text and images with your referral link in Facebook, Facebook Messenger and LinkedIn. 

#### Rich Content
According to the [protocol's official site](http://ogp.me/), Open Graph is able to "richly represent any web page within the social graph". With Open Graph tags you can "take control over how your content appears [around the web and] on **Facebook**" and **LinkedIn**. 

> Open Graph is [used on Facebook](https://developers.facebook.com/docs/sharing/webmasters/) to allow any web page to have the same functionality as any other object on Facebook.

By leveraging SaaSquatch's support for Open Graph metadata you are able to provide your end-users the best social experience as they go about sharing their referral.

#### Images in Open Graph
Images used for these messages need to be 5Mb or smaller and have an ideal ratio of 1.91:1. A recommended size for these images is 1200 x 630 px.

<h4 class="no-anchor">Example</h4>
The following is a comparison of what SaaSquatch sharelinks look like on Facebook & LinkedIn with and without Open Graph Metadata:

<div class="row-fluid">
    <div class="span6">
    <strong>With Open Graph Metadata</strong>
    <img src="/assets/images/contentful/Door_to_door_fb_share_2sMCCJIxhK02u8yw0OIaqu.png" alt="Door to door fb share">
</div>
  <div class="span6">
  <strong>Without Open Graph Metadata</strong>
  <img src="/assets/images/contentful/Door_to_door_fb_share_noog_6RISJ73q7K8ogYAwk4gOkG.png" alt="Door to door fb share noog">
</div>
</div>

#### Available Fields
The SaaSquatch system supports the ability to configure the following Open Graph Metadata fields from within the SaaSquatch Admin Portal:

<table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Tag</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title</td>
        <td><code>og:title</code></td>
        <td>The title for the referral link being shared.</td>
      </tr>
      <tr>
        <td>Image</td>
        <td><code>og:image</code></td>
        <td>The URL of the image to be associated with the referral link.</td>
      </tr>
      <tr>
        <td>Description</td>
        <td><code>og:description</code></td>
        <td>The description of the referral link.</td>
      </tr>
    </tbody>
  </table>

### Social Media Share Messages
<div class="row-fluid">
<div class="span1"><img src="/assets/images/contentful/facebook-box_6BsN85dJQIUuqKq8ysm0u4.png" alt="facebook-box"></div>
<div class="span1"><img src="/assets/images/contentful/facebook-messenger_4o7wmudO2AUM2IaK8SycIO.png" alt="facebook-messenger"></div>
<div class="span1"><img src="/assets/images/contentful/whatsapp_xlH3mc8sHAI0SCqEEYiUo.png" alt="whatsapp"></div>
<div class="span1"><img src="/assets/images/contentful/twitter-box_1qTRramRJ6wCYYYgM2U06I.png" alt="twitter-box"></div>
<div class="span1"><img src="/assets/images/contentful/linkedin-box_8rOwXRF9ccWaSM0GsISiI.png" alt="linkedin-box"></div>
<div class="span1"><img src="/assets/images/contentful/pinterest-circle_6h2gv3nHmEWgms4eiYYESy.png" alt="pinterest-circle"></div>
<div class="span1"><img src="/assets/images/contentful/line-box_2Bw9jJJqDaq8wcIc0OWSmU.png" alt="line-box"></div>
<div class="span1"><img src="/assets/images/contentful/email-outline_KSja2wU9uoo8ukO8w8us6.png" alt="email-outline"></div>
<div class="span1"><img src="/assets/images/contentful/message-text_33Lebp4HhYISYwQO6qU2Ke.png" alt="message-text"></div>
</div>

The referral widget also provides your users the ability to share their referral through social media plaforms.

  Each of these share options has pre-configured messaging that can be edited [through the SaaSquatch Admin Portal]().
<br></br>

#### Including Share Links and Referral Codes in Share Messages
Our system can automatically include a user's share link or referral code in the message being sent out. This is done by including `{shareLink}` or `{referralCode}` in the message. 

For example:<br>
`If you want to sign up, click here: {shareLink}`<br>
or<br>
`Be sure to use my referral code {referralCode} during checkout!`

Will appear as:<br>
If you want to sign up, click here: http://ssqt.co/mzkw4aZ<br>
or<br>
Be sure to use my referral code JIMDOE during checkout!

#### Facebook and Messenger
<div class="row-fluid">
  <div class="span8">

<p>The Facebook and Messenger sharing options allow a referral participant to share their referral through the Facebook platform.</p>

<p>They can choose to make a post to their wall or send a message directly to their friends.</p>

<p>Friction is minimized by not requiring users to authorize access to their account to share via Facebook.</p>

</div>
<div class="span4">

<div>
<a class="docs-lightbox" href="/assets/images/contentful/tile_facebook_share_message_example_5xZa7pLe5qcE60G6WKaUgW.png" data-lightbox="example-set">
<img src="/assets/images/contentful/tile_facebook_share_message_example_5xZa7pLe5qcE60G6WKaUgW.png" alt="tile facebook share message example">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

</div>
</div>

#### WhatsApp
<div class="row-fluid">
  <div class="span8">

  <p>The WhatsApp sharing options allow a referral participant to share their referral to their WhatsApp contacts and groups.  

  <p>Users are linked directly into the WhatsApp app to allow them to select who they would like to share with.

  <p>The WhatsApp share option only appears in the widget when it is displayed on a mobile device, where the app could be available for them to share through.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/WhatsApp_share_5ipvurnNFKQWoKco8kwgEW.png" data-lightbox="example-set"><img src="/assets/images/contentful/WhatsApp_share_5ipvurnNFKQWoKco8kwgEW.png" alt="WhatsApp share">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### SMS / Text Message
<div class="row-fluid">
  <div class="span8">

  <p>The SMS sharing option allows a referral participant to share their referral to their text messaging contacts.  

  <p>The SMS share option links the user directly into their default SMS app which allows them to select who they would like to share with.

  <p>The SMS share option only appears in the widget when it is displayed on a mobile device, where they have the ability to send an SMS.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/SMS_Share_2h73T55L1u2GKCU680eqYI.png" data-lightbox="example-set"><img src="/assets/images/contentful/SMS_Share_2h73T55L1u2GKCU680eqYI.png" alt="SMS Share">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Email
<div class="row-fluid">
  <div class="span8">

<p>Users are also able to make a referral by sharing their sharelink through email. The email share link in the widget is a standard <code>mailto:</code> link which lets users complete the share process through their email client of choice. In their email client the Referrer can then simply input the email address of the desired recipient and make any personalizations to your referral program's standard email message.

<p>This default messaging can be customized just like that of the Facebook and Twitter share options. Configurable options for the email share messages include the message subject and body text.

<p>While formatting is limited to plain text, allowing users to send the email through their own email account provides a more personalized experience for both the referrer and referred user, and will consistently arrive in the recipient's general inbox, not the promotions folder.

</div>
  <div class="span4">

<div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-26_at_2.30.41_PM_52wfAmSI4JsSsD1Vhwftuj.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Screen_Shot_2019-09-26_at_2.30.41_PM_52wfAmSI4JsSsD1Vhwftuj.png" alt="email share">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

</div>
</div>

#### Twitter
<div class="row-fluid">
  <div class="span8">

  <p>The Twitter sharing option allows a referral participant to tweet the referral program to their network of friends. 

  <p>Twitter share messages are configurable up to the standard 140 character limit, and any link, including the user’s sharelink, counts for 23 characters. 

  <p>Twitter image thumbnails, up to 440x220px in size, can also be included in the pre-filled tweet copy.

  <p>The sharing flow is streamlined by not requiring users to authorize with Twitter in order to make a post.

  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-09-26_at_2.42.41_PM_5V9xLTr4pumJzL2h18p95l.png" data-lightbox="example-set">
<img src="/assets/images/contentful/Screen_Shot_2019-09-26_at_2.42.41_PM_5V9xLTr4pumJzL2h18p95l.png" alt="Twitter Share Message">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### LinkedIn
<div class="row-fluid">
  <div class="span8">

  <p>The LinkedIn sharing options allow a referral participant to share their referral with their LinkedIn network.  

  <p>The LinkedIn share option allows referral participants to share their referral as a published post, an update, a post to a group, or directly to individuals.
  </div>
  <div class="span4">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/LinkedIn_Share_Message_6LoWZZ2L8kQ4Oq2qusseEY.png" data-lightbox="example-set"><img src="/assets/images/contentful/LinkedIn_Share_Message_6LoWZZ2L8kQ4Oq2qusseEY.png" alt="LinkedIn Share Message">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Line Messenger
<div class="row-fluid">
  <div class="span9">

  <p>The Line Messenger sharing options allow a referral participant to share their referral with their Line Messenger friends as part of a group chat, or directly to individuals.  

  </div>
  <div class="span3">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Line_Messenger_Share_nvPU7aj2zm4o88MeiOQwe.png" data-lightbox="example-set"><img src="/assets/images/contentful/Line_Messenger_Share_nvPU7aj2zm4o88MeiOQwe.png" alt="Line Messenger Share">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

#### Pinterest
<div class="row-fluid">
  <div class="span9">

  <p>The Pinterest sharing options allow a referral participant to share their referral with their Pinterest network.  

  <p>The Pinterest share option allows referral participants to pin and comment on their referral link, and share it with friends.

  </div>
  <div class="span3">

  <div>
<a class="docs-lightbox" href="/assets/images/contentful/Pinterest_Share_6lecqGiCiWc8aOyKGkGsWS.png" data-lightbox="example-set"><img src="/assets/images/contentful/Pinterest_Share_6lecqGiCiWc8aOyKGkGsWS.png" alt="Pinterest Share">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

  </div>
</div>

### Referral Code
<div class="row-fluid">
  <div class="span8">

<p>When a user is registered in our system they are provided a unique referral code. This code typically comes in the form of <code>FIRSTNAMELASTNAME</code>, such as <code>JOHNDOE</code>. By default the referral code is shown in the referral widget right underneath the main text.

<p>The referral code provides a simple method for users to connect with your referral program. They are relatively short human-readable codes which users can share with their friends and family. Many people are familiar with the concept of a coupon code so using the referral codes as part of your referral program can make the process easier to understand.
  <p>The main limitation of this share option is that it does not take advantage of our automatic referral attribution. The Referred User is required to manually input the referral code on your referral landing page. This means that Referred Users could forget the code, or have take the extra step of copying and pasting it. Referral codes can be hidden for products that do not have a coupon or code input field.

</div>

<div class="span4">
<div>
<a class="docs-lightbox" href="/assets/images/contentful/code_widget_4kCyiTyMwzV6tPyEyhlIh5.png" data-lightbox="example-set">
<img src="/assets/images/contentful/code_widget_4kCyiTyMwzV6tPyEyhlIh5.png" alt="referral widget code">
<div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>
</div>
</div>

### Additional Information
>More information about ways to engage with your existing user and how to drive participation in your referral program can be found in our [Referral Marketing Channels](/success/touchpoints/) article.
>
>To learn more about referral programs and how to get your program up and running, check out our [Referral Program 101](/success/intro/) article.
