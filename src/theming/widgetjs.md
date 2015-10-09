---
title: Widget.js
highlights: Publicly available widget JS API at ```window._sqh = _sqh || {};```
slug: themes/widgetjs
template: themes.html
---

### Methods

##### ready
API call the indicate when the event bus has loaded and can begin accepting publish requests (or any other future added API features).
It accepts an anonymous JavaScript function to be called when initialized

```
widget.rpc.ready(function() { 
	/* code to execute now the EasyXDM event bus has initialized   */ 
});
```

##### publish
API call that publishes an event of type eventName with payload "payload" containing data to be received by any listeners (ideally this will be JSON data but there's probably no reason we should restrict it to JSON if developers prefer to send a String instead or no content at all)

```
widget.rpc.publish(String eventName, [Object payload]);
```

<hr/>

### Example

```
widget.rpc.ready(function() {
	$(‘#changeURL’).click(function() {
		widget.rpc.publish(“changeUrl”, { url : "http://zappos.com/charity" });
	});
});
```

