---
title: Changes to event retention period coming October 2022
deadline: 2022-10-17
contentType: breakingChange
---

We’re making some changes to how we handle event retention. 

All the events that you send us about your users are stored in multiple locations. We use fast database lookups to serve queries about events in our API and our Admin Portal, and duplicate this data into long-term database storage for analytics. Currently there are no restrictions on how long events remain available for fast lookups. 

Starting October 17, 2022, this is changing—events older than two years will only be retained in long-term storage.

__Impacts to you__
1. Events older than two years will no longer be accessible via API or visible in the Participants page in the Admin Portal. 
2. Reward retraction and refunds will only be possible if the reward you want to retract/refund is based on an event less than two years old. Because retractions/refunds require the original event, they can't be processed using the copy of the event that remains in long-term storage.

__New report available for historical data__

Don’t worry—your older data isn’t going anywhere! We’ve created a new report type to make sure you can still access your historical data. You’ll now be able to run an Event Export report and download event data in CSV or JSONL format.

The new report will be available starting October 17. Here’s how to run it: 
1. Go to the SaaSquatch Admin Portal.
2. Click __Analytics__ in the top menu bar.
3. Click the __Reports__ tab.
4. Click the __Create Report__ button.
5. Under the Choose a Report Type heading, click __User Event Export__.
6. Add filters or custom parameters if needed.
7. Click __Create Report__. And that’s it! 

Have questions? We’re here to help. Contact us at [support@saasquatch.com](mailto:support@saasquatch.com). 