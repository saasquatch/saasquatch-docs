---
title: Setting Up a Calculated Field
highlights: "Learn how to set up your own calculated fields and use them to power your loyalty or referral program's rules."
slug: building-programs/custom-calculated-fields/setting-up-a-calculated-field
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-28
robotsTag:
  - FOLLOW
---

Calculated fields enable you to track events as they come in, set up a calculation using event fields, and store the resulting data on a participant’s profile. Once the calculated field is set up, its value will update dynamically as you send us events that meet your criteria.

This guide will show you the basic process for setting up a calculated field, including two examples at the end. For more details about how calculated fields work and what types of calculations are possible, see our article on [calculated fields](/building-programs/custom-calculated-fields/calculated-fields). 

## Setting up a calculated field
1. Log on to the SaaSquatch Admin Portal.
2. Go to the __Data__ page and click the __Fields__ tab.
    - __Note__: You can also create a calculated field from the Program Setup page when you add or edit a goal or action.  Under the Goal or Action Criteria heading, click the first dropdown menu for the Condition and then select __Create New Calculated Field__.    
3. Click the orange __Create calculated field__ button at the top right of the page.
4. Complete the fields:
    - __Name__
    - __Event__
    - __Calculation__
    - __Event field__, if applicable for your calculation
5. Apply an optional tracking window if you want to perform a sum or count calculation on a rolling basis. The time zone for your tenant will apply to your calculated field’s tracking window. 
    - __Tip__: For details about the window types and when to use them, see [Tracking Windows for Calculated Fields](/building-programs/custom-calculated-fields/tracking-windows).
6. If you applied a sliding window, then you can set a maximum value to be counted for each unit of your interval (e.g., each day in a 60 day interval).
7. Add an optional active period if you want to set a start and end date for the calculation.
8. Add filters if you only want events that meet specific criteria to be included in the calculation.  
    - __Note:__ Filters can apply to event characteristics (e.g., revenue amount for a given purchase) or user characteristics (e.g., a count of the number of times a participant makes a purchase over $100)
9. Review your selections and decide if you want to <a href="/building-programs/custom-calculated-fields/recalculation">backfill the values</a> for all participants.
10. Click the orange __Save__ button.

### Example: Reward participants who make 3 or more purchases of at least $50 in one month after the referral was started
> __Scenario:__ You have a referral program and want to reward participants who frequently make sizable purchases soon after they’ve been referred. You determine that for your program, this means any participant who makes 3 or more purchases of at least $50 in the month after the referral starts. A calculated field can help you determine which of your participants meet this threshold and act as the basis for a program rule that issues these participants a reward. 

Here’s how the calculation can be set up:
1. Under the Calculation heading, complete the __Name__ field.
2. Enter the following values for the event and calculation fields: 
    - __Event__: Purchase
    - __Calculation__: Count
> __Note:__ This will set up the calculation to count how many times we receive purchase events that meet your criteria.
3. Apply a fixed tracking window. This will cause the calculation to reset each month.
  <ol>
    <li> Select <strong>Fixed Window</strong>.</li>
    <li>Choose a <strong>1 calendar month</strong> window duration.</li>
  </ol> 
4. Add a filter to specify that you only want to count the purchase events with a value of $50 or more: 
   <ol>
     <li>Click <strong>Add Rule</strong>. </li>
     <li> For the first Condition dropdown, select the <code>events.fields.revenue</code> field.</li>
     <li> Change the operator type to <strong>greater than or equal to</strong>.</li>
     <li> Enter <code>50</code> as the string variable value.</li>
  </ol>

    > __Tip:__ JSONata expressions only accept whole numbers. When using currency, we recommend using the lowest denomination used in your database configuration. If you’re not sure, contact our [Support team](mailto:support@saasquatch.com) for help.  

5. Review and click __Save__.

The remaining setup must be done in your referral program. The exact steps to follow depend on the full program setup, but here’s the general process.
1. Create or edit a goal. 
2. Set it to trigger when a referred user field updates.
3. Under the Goal Criteria heading, click __Add Rule__. 
4. In the Condition dropdown box:
  <ol>
    <li>Select your new calculated field</li>
    <li>Choose the operator <strong>greater than or equal to</strong></li>
    <li>Enter <code>3</code> in the variable text box</li> 
  </ol>

The goal will only trigger now if we receive 3 or more purchase events with a revenue of $50.00 or more. 

You can also add Action Criteria to only trigger the action if these events were received within the first month after we receive the __referral started__ event.

### Example: Reward participants the first time they have spent more than $1000 in the last 90 days 
> __Scenario:__ You want to set up a program rule that rewards the highest-spending members of your Points program. You determine that anyone who spends over $1000 during a 90 day period meets that threshold. A calculated field can help you determine which members of your Points program hit this purchase threshold, and act as the basis for your program rule. 

Here’s how the calculation can be set up:
1. Under the Calculation heading, complete the __Name__ field.
2. Enter the following values for the event and calculation fields: 
    - __Event__: Purchase
    - __Calculation__: Sum
    - __Event field__: Revenue
> __Note__: This will set up the calculation to sum the `revenue` field for each purchase event
3. Apply a sliding tracking window of 90 days.
  <ol>
    <li> Select <strong>Sliding Window</strong>.</li>
    <li>Use the slider or dropdown menus to set the window duration at 90 days.</li>
  </ol>  
4. Review and click __Save__.

The remaining setup can be done in your Points program rules. The exact steps to follow depend on the full program setup, but here’s the general process.
1. Create or edit a goal. 
2. Set it to trigger on a referred user field update.
3. Set the edge triggering to be the name of the calculated field you just created (e.g., `user.customFields.90DayTotal`).
4. Under the Goal Criteria heading, click __Add Rule__. 
5. In the Condition dropdown box:
  <ol>
    <li> Select your new calculated field</li>
    <li>Choose the operator <strong>greater than or equal to</strong> </li>
    <li>Enter <code>1000</code> in the variable text box</li>
  </ol>  

> __Tip__: JSONata expressions only accept whole numbers. When using currency, we recommend using the lowest denomination used in your database configuration. If you’re not sure, contact our [Support team](mailto:support@saasquatch.com) for help.  

The goal will now trigger only if the user has made $1000 in purchases over the previous 90 days.
