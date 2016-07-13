---
title: Widget.js
highlights: Publicly available widget JS API at ```window.widget.rpc = widget.rpc || {};```
slug: themes/widgetjs
sectionType: themes
template: article.html
---

### Methods

##### ready
API call that indicates when the event bus has loaded and can begin accepting publish requests. It accepts an anonymous JavaScript function to be called when initialized.

```
widget.rpc.ready(function() { 
	/* code to execute now the event bus has initialized */ 
});
```

##### publish
API call that publishes an event of type eventName with an optional payload "payload" containing data to be received by any [Squatch JS listeners](/squatchjs/#subscribe). The payload can be a string or JSON object.


```
widget.rpc.publish(String eventName, [Object payload]);
```

<hr/>

### Example

```
widget.rpc.ready(function() {
	$(‘#changeURL’).click(function() {
		widget.rpc.publish(“changeUrl”, { url : "http://www.referralsaasquatch.com/done" });
	});
});
```

