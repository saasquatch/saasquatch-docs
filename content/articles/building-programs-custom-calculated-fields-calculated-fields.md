---
title: Calculated Fields
highlights: Calculated field values can be used in setting up your program rules, allowing for a wide range of advanced program logic. 
slug: building-programs/custom-calculated-fields/calculated-fields
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-08-03
robotsTag:
  - FOLLOW
---

## Overview
Through [custom fields](/features/custom-user-fields/), you can send SaaSquatch a wide range of additional information about your participants beyond the basics required to run your program.  

Calculated fields take this concept a step further.  As user and event data are received by a calculated field, the values are calculated, stored and become visible on the participant's profile. Once the calculated field is set up, its value will update dynamically as you send SaaSquatch events that meet your criteria. 

Calculated field values can be used in setting up your program rules, allowing for a wide range of advanced program logic. For example, a calculated field can be configured to count how many times a participant makes a purchase of at least $100 in a one-month window. Then, you can set up your program to issue special rewards to participants who make at least 3 of these $100 purchases in a month. 

![Calculated Fields and Program Rules](/assets/images/contentful/Frame_19_3f6bnS6l2idpVnA0bpFHh9.png)

## Default calculated fields
All clients are supplied with four calculated fields by default. You can reference these as soon as you start setting up the rules for your program. 

<table class="table table-hover">
	<tr>
		<th>Calculated field</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>lastSeenDate</td>
		<td>Tracks the last time the user was upserted in SaaSquatch</td>
	</tr>
	<tr>
		<td>firstPurchaseDate</td>
		<td>Tracks the first date that we received a purchase event for this participant</td>
	</tr>
	<tr>
		<td>lastPurchaseDate</td>
		<td>Tracks the date of the participant's most recent purchase event</td>
	</tr>
	<tr>
		<td>totalPurchaseCount</td>
		<td>Tracks the total number of purchase events for this participant</td>
	</tr>
</table>

## User-created calculated fields
You can create your own calculated fields that go beyond the default ones provided by SaaSquatch.

### Customization options
When you set up a calculated field, you can:
- Add a start and end date if you want the calculation to run for a limited time (e.g., January 1st to February 17th). This set time frame is called an active period. 
- Specify a recurring [tracking window](/building-programs/custom-calculated-fields/tracking-windows) for your sum and count calculations. Tracking windows can be either fixed windows (e.g., a singular calendar month or year)  or sliding windows (e.g., last 90 days).
- Set additional constraints for when the calculation is performed by adding a filter or writing a JSONata expression
These options are discussed in greater detail in our article [Setting Up a Calculated Field](/building-programs/custom-calculated-fields/setting-up-a-calculated-field).

> __Note:__ If your calculated field has an active period or tracking window, then values won't be updated after the calculation period ends. If your calculated field has an active period (or a tracking window, for sum/count calculations only), then values won’t be further updated after the calculation period ends. However, the values will remain visible on each participant’s profile. 

### Available calculations
There are several types of calculations that you can use when building a calculated field. 

<table class="table table-hover">
	<tr>
		<th style="width:25%">Calculation</th>
		<th style="width:35%">Description</th>
		<th style="width:55%">Example</th>
	</tr>
	<tr>
		<td>Sum</td>
		<td>Calculate the sum of the <code>{fieldname}</code> field from <code>{eventkey}</code> events</td>
		<td>Sum all purchases a referred user makes within the first 30 days after signup. Issue tiered rewards to the referrer based on the amount spent.  </td>
	</tr>
	<tr>
		<td>Count</td>
		<td>Count the number of <code>{eventkey}</code> events</td>
		<td>Reward participants when they have made more than 10 purchases.</td>
	</tr>
	<tr>
		<td>First Seen (Date)</td>
		<td>Calculate the timestamp of the first <code>{eventkey}</code> event</td>
		<td>Reward participants if they started making purchases before a certain date.</td>
	</tr>
	<tr>
		<td>Last Seen (Date)</td>
		<td>Calculate the timestamp of the last <code>{eventkey}</code> event</td>
		<td>Reward participants if their last purchase was within 5 days.</td>
	</tr>
	<tr>
		<td>First Value</td>
		<td>Calculate the value of the <code>{fieldname}</code> field from the first {eventkey} event</td>
		<td>Reward participants when they make a large first purchase.</td>
	</tr>
	</tr>
		<td>Last Value</td>
		<td>Calculate the value of the <code>{fieldname}</code> field from the most recent <code>{eventkey}</code> event</td>
		<td>Reward participants when their last payment was at least a certain value. </td>
</table>

Create and manage calculated fields from the Data page in the Admin Portal. See [Setting Up a Calculated Field](/building-programs/custom-calculated-fields/setting-up-a-calculated-field) for help doing so. 