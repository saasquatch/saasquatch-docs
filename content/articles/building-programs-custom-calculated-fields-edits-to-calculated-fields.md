---
title: Edits to Calculated Fields
slug: building-programs/custom-calculated-fields/edits-to-calculated-fields
sectionType: designerArticle
template: hasTableOfContents.html
date: 2023-08-03
seoDescription: Calculated fields enable you to track events as they come in, set up a calculation using event fields, and store the resulting data on a participant’s profile. User-created calculated fields can be edited at any time.
robotsTag:
  - FOLLOW
---

[User-created calculated fields](/building-programs/custom-calculated-fields/calculated-fields) can be edited at any time.  For all types of calculated fields, you __are__ able to edit:
- Event used to calculate the field
- Event field (if applicable)
- Tracking window
- Filters, including active period

You __are not__ able to edit the:
- Calculated field key
- Calculation type

> If your field uses a sum or count calculation, then we recommend requesting a [recalculation](/building-programs/custom-calculated-fields/recalculation) when you make your edits. For calculated fields that use another type of calculation, recalculation isn’t possible and the below should be taken into account.

<table class="table table-hover">
	<tr>
		<th style="width:25%">If</th>
		<th style="width:35%">Then</th>
		<th style="width:60%">Example</th>
	</tr>
	<tr>
    <td>Field does not have a tracking window or the tracking window has been <b>removed</b></td>
		<td rowspan="2">
			<ul>
				<li>The old field value will be retained and act as the <b>starting point</b> for the new calculation</li>
				<li>The new calculation will be used moving forward</li>
			</ul>
		<td rowspan="2"> The field currently sums the revenue on userPurchase events. When you update it to sum revenue on purchase events instead, the existing value on a participant’s profile will be unchanged. The next time we receive a purchase event for them, the revenue amount is added to the existing value.</td>
	</tr>
	<tr>
		<td>Field has an existing tracking window but the window is <b>unchanged</b></td>
	</tr>
	<tr>
		<td>Field has an tracking window that is being <b>added to</b></td>
		<td>
			<ul>
				<li>The old field value will be retained only until new events come in. It will be wiped when the next matching event comes in</li>
				<li>The new configuration will be used moving forward</li>
				<li>Request a recalculation if you want to take historical data into account with the new configuration</li>
		</td>
		<td>
			<p>The field counts the number of purchases a participant makes. If you add a tracking window for a month, then when the next purchase event comes in, the existing value on the participant’s profile is wiped. </p>
			<p>A participant who made 5 purchases would have a value of 5 prior to your edits. The next time this participant makes a purchase, the old value is wiped and the field value is set to 1. </p>
		</td>
	</tr>
  <tr>
		<td>Field has an existing tracking window that is being <b>edited</b></td>
		<td>
			<ul>
				<li>When editing an existing window on a calculation field, be sure to recalculate.</li>
				<li>Editing without recalculation can have adverse effects on the participants field value and it is best to recalculate.</li>
		</td>
		<td>
			<p>N/A</p>
		</td>
	</tr>
	<tr>
		<td>Field has an existing sliding window and the <b>maximum calculation value is changed</b></td>
		<td>
			<ul>
				<li>The new configuration will be applied to participants’ historical data when the next matching event comes in</li>
				<li>Request a recalculation to update the field value without waiting for new events </li>
			</ul>
		</td>
		<td>The windowed field currently counts the number of purchases a participant has made, to a maximum value of 10. When the max changes to 5 and a new purchase event comes in for that participant, the maximum of 5 will be retroactively applied  to the data within the window.</td>
	</tr>
</table>

> __Note:__ The value of a windowed calculated field can’t be manually overwritten via API. You will receive an error message if you send us data that would overwrite an existing value.
