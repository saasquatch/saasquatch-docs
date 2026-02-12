---
title: Deleting a Calculated Field
highlights: Learn how to delete user-created calculated fields.
slug: building-programs/custom-calculated-fields/deleting-a-calculated-field
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-04-26
robotsTag:
  - FOLLOW
---

<style> 
th, td {
  border: 1px solid;
  border-color: #C0C0C0;
  border-collapse: collapse;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

You can delete user-created [calculated fields](/building-programs/custom-calculated-fields/calculated-fields) at any time in the Admin Portal. (The default calculated fields cannot be deleted.)  

There are slight differences in behavior depending on whether the calculated field you delete has a fixed or sliding [tracking window](/building-programs/custom-calculated-fields/tracking-windows). 

<table class="table table-hover">
	<tr>
		<th>If</th>
		<th>Then the deleted field will...</th>
	</tr>
	<tr>
		<td>No tracking window</td>
		<td>
			<ul>
				<li>Remain on participants’ profiles with value frozen in time</li>
				<li>Remain visible in the Fields table on the Fields page</li>
				<li>Not be calculated in the future</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Tracking window</td>
		<td>
			<ul>
				<li>Immediately be removed from participants’ profiles</li>
				<li>Remain visible in the Fields table on the Fields page</li>
				<li>Not be calculated in the future</li>
			</ul>
		</td>
	</tr>
</table>

# Deleting a calculated field
> __Important__: Deleted calculations can’t be restored. This action is permanent. 

1. Log on to the SaaSquatch Admin Portal.
2. Go to the __Data__ page and click the __Fields__ tab.
3. Find the calculated field you want to delete in the Fields table.
4. Click the three-dot menu on the right side of the row.
5. Click __Delete__.
6. Review the pop-up and confirm if you want to proceed. 