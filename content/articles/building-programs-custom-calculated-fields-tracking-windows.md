---
title: Tracking Windows for Calculated Fields
highlights: Tracking windows allow your referral and loyalty programs to reward participants for their behavior as tracked within a window of time
slug: building-programs/custom-calculated-fields/tracking-windows
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-08-03
robotsTag:
  - FOLLOW
---

## Overview
> Not sure what a calculated field is or when to use one? Check out our article on [calculated fields](/building-programs/custom-calculated-fields/calculated-fields) for an explanation of what they are and when they’re useful. If you’re looking for help setting up a tracking window for your calculated field, see [Setting Up a Calculated Field](/building-programs/custom-calculated-fields/setting-up-a-calculated-field).  

A tracking window allows you to add time-based elements to calculated fields. You can add tracking windows to any calculated fields that use a sum or count calculation. 

Including a tracking window on a calculated field is useful if you want to allow your participants to accrue a value periodically (such as purchase amount) and then reward them based on the value. Event data will only be calculated during the window you select—as time passes and the window updates, previous data won’t be taken into account.

You can use the value from the field to set up program rules that incentivize your participants to align with your goals for: 
- __Recency__: Encourage dormant participants to reactivate or make a new purchase
- __Frequency__: Incentivize your most frequent customers to keep engaging with your program and services
- __Monetary Value__: Reward high spenders for hitting a certain purchase value threshold 

When setting up a calculated field, you can choose from two types of tracking windows: fixed and sliding.

## Fixed tracking windows
Fixed windows let you track a value during a calendar day, week, month, or year. The window starts at the beginning of the interval and rolls over at the end. The start and end time will depend on the time zone settings for your tenant, e.g., the calculation will start at midnight Pacific time if that’s your tenant’s time zone, regardless of the time zone your participants are located in. (__Note__: Your time zone can be changed from the __General__ tab of the __Settings__ page.) 

When you create a calculated field with a fixed window, it will start counting from the moment the field is created–it won’t wait for the start of the next full interval, and it won’t retroactively calculate (by default) any values from the beginning of the current interval if you missed them. See our doc about [recalculation and backfilling values](/building-programs/custom-calculated-fields/recalculation) for more on this topic.

> __Example__: You want to set up a program rule that issues a special reward to participants who spend over a certain amount each month. To do this, you’ll need a calculated field that sums the value of purchases over a 1 month fixed window. Once this is set up, purchase events will be added from the first of the month at midnight to 11:59 p.m. on the final day of the month. 

![fixed windows chart](/assets/images/contentful/Fixed_tracking_window_2gMIZfbx2OIRN6QXm2ymAB.png)

## Sliding tracking windows
Sliding windows let you measure a value over a custom interval of up to 90 days, weeks, months, or years.  Unlike fixed windows, sliding windows don’t rely on set individual calendar intervals–you can set a window for 10 days, 5 weeks, 3 months, 2 years, and so on. 

Within each interval is an individual __unit__ of time. The calculated field will be updated as each unit passes and we receive new events that meet your criteria. 

<table class="table table-hover">
	<tr>
		<th>Example Interval</th>
		<th>Unit of time</th>
		<th>Your field will update...</th>
	</tr>
	<tr>
		<td>10 days</td>
		<td>1 day (12:00 a.m. to 11:59 p.m.)</td>
		<td>After every 1 day passes </td>
	</tr>
	<tr>
		<td>5 weeks</td>
		<td>1 week (Sunday to Saturday)</td>
		<td>After every 1 week passes</td>
	</tr>
	<tr>
		<td>3 months</td>
		<td>1 month (First of the month to the last day of the month)</td>
		<td>After every 1 month passes</td>
	</tr>
	<tr>
		<td>2 years</td>
		<td>1 year (January 1st to December 31st)</td>
		<td>After every 1 year passes</td>
	</tr>
</table>

Sliding windows allow you to set a maximum value to be summed or counted for each unit of your tracking window, e.g., for each day of your 90 day window, or each week of your 12 week window.  This does not set a maximum for the entire interval. It only sets a maximum for each unit.

Regardless of your interval, we consider the start time of each unit as 12:00 a.m. (midnight) and the end as 11:59 p.m. We use the time zone settings for your tenant to determine this. (__Note__: Your time zone can be changed from the __General__ tab of the __Settings__ page.) 

> __Example__: You want to allow participants to accrue points based on the amount they spend over the course of 90 days. As each day passes and we receive new matching event data, the calculated field value is updated to reflect the amount spent over the previous 90 days.

![sliding windows chart](/assets/images/contentful/Sliding_window_1V7cLskvg7BOzLwI9k4iOx.png)