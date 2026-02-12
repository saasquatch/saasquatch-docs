---
title: Recalculation and Backfilling Values
highlights: Recalculating and backfilling values is an optional way of making sure that your calculated field shows up on all of your participants’ profiles with the appropriate values.
slug: building-programs/custom-calculated-fields/recalculation
sectionType: designerArticle
template: hasTableOfContents.html
date: 2022-09-21
robotsTag:
  - FOLLOW
---

Recalculating and backfilling values is an optional way of making sure that your calculated field shows up on all of your participants’ profiles with the appropriate values. Recalculation can be triggered for any calculated fields that use a sum or count calculation. We highly recommend recalculating when you add a new calculated field or edit an existing one.

By default, after you create a calculated field, only new events that we receive will trigger the calculation and cause the value to show up on your participants’ profiles. If you want the calculation to be performed for all events that match your criteria, then you can request a recalculation to backfill the values. This will sum or count matching events we received before the calculated field was set up. Doing so __will not__ trigger your program rules to run, so you can safely perform a recalculation without affecting your program. 

Recalculation and backfilling are not instant and can take some time to complete, depending on how much data we need to process. You can check the status of the recalculation on the Data page under the Processes tab.

You can recalculate and backfill values:
- As part of the calculated field setup process
- From the editing interface for an existing calculated field

> __Example__: It’s currently September 26th. You are setting up a calculated field with a fixed 1 month tracking window. Rather than having your field start calculating values only from the 26th to the end of the month, you want it to take into account values from all of September. You can achieve this by clicking the __Backfill data__ checkbox during setup. 

# Recalculation processing queue 
Any events that we receive while your recalculation is in progress will be placed in a queue until recalculation is done. After recalculation, we will start to process them in the order they were received. If we receive more new events while we’re processing the events that are in the queue, there’s a slight chance that your events could be processed out of order. This might affect your program only if the order of events is important for your program logic.
