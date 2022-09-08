---
title: Page Speed Best Practice Guide
highlights: This guide explains best practices for making the Referral SaaSquatch widget load quickly without affecting other items on your page.
slug: bestpractices/speed
sectionType: guide
template: article.html
date: '2019-11-18'
---

<strong><i class="icon-chevron-right"></i> Keep it in the body.</strong> Place the `&lt;script&gt;` tag examples that we provide right before the `&lt;/body&gt;` tag, or at the very least, keep 
it out of the `&lt;head&gt;` tag. This will make sure that the `squatch.js` is the last script to execute, and won't delay other scripts on your page.


<strong><i class="icon-chevron-right"></i> Use the default onload function.</strong> By default our javascript library will only load after the rest of your page is fully loaded. Don't 
directly reference the squatch.min.js library, because you might end up making it load synchronously, which means that it will delay the rest of your page from loading. Instead, 
use the default load function in our script examples.


<strong><i class="icon-chevron-right"></i> Use timeout.</strong> If you have a lot of assets to load in your app, you can also choose to delay the initialization of squatch.js by some fixed time. 
New to javascript timeouts? <a href="http://stackoverflow.com/questions/10312963/javascript-settimeout">Check out this StackOverflow post on the subject</a>. 
<span class="label">for advanced javascript programmers</span>


We serve all of our assets, like images, javascript and CSS, from the Amazon Cloudfront CDN. This makes sure that your customers have the lowest latency possible. We know that a quick and 
responsive app can <a href="http://blog.kissmetrics.com/loading-time/?wide=1">greatly improve your engagement rate</a>, so we're constantly developing new ways to reduce file size and 
improve user-perceived latency.


<hr />

### Dissecting our onload function

Want to build your own script loader and manager? No problem. Let's look at the code that loads our javascript.


```js
(function(){function l(){var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src=location.protocol+"//d2rcp9ak152ke1.cloudfront.net/assets/javascripts/squatch.min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t)}if(window.attachEvent){window.attachEvent("onload",l)}else{window.addEventListener("load",l,false)}})();
```

Let's tidy that up and give you some comments. Here's a line-by-line breakdown of what's going on:


```js
// This is an "self-executing function". It makes sure that our variables don't leak into global scope.
(function(){

    // The library loader function 'l'. Executing it will start loading the squatch.min.js javascript library.
    function l(){ 
        // Creates a script tag
        var s=document.createElement("script"); s.type="text/javascript";
        // The Async flag begins the download without pausing the javascript parser 
        s.async=true; 
        // Notice the cloudfront domain? That means this javascript file is served from a CDN for super-fast downloads
        s.src=location.protocol+"//d2rcp9ak152ke1.cloudfront.net/assets/javascripts/squatch.min.js";
        // Adds the script tag to the DOM, triggering the download
        var t=document.getElementsByTagName("script")[0]; t.parentNode.insertBefore(s,t)
    }
    
    // Waits for the page to load before executing the loader function. 
    if(window.attachEvent){ // Internet explorer support
        window.attachEvent("onload",l);
    }else{ // Others
        window.addEventListener("load",l,false);
    }
})();
```

<hr/>

### Hosting the JavaScript Library Yourself

**We do not recommend that you host squatch.js yourself**. If you decide to host the JavaScript 
Library yourself, you would not receive code updates to the JavaScript Library, if we add functionality, optimize, or fix bugs.
