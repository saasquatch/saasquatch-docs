---
title: Setting Up Reward Exchange Options
highlights: Empower participants in your Loyalty program to exchange rewards they’ve earned for something they’ll really love. With our self-serve Reward Exchange feature, you can set up customized reward exchange options for your participants to pick from.
slug: /building-programs/rewards/setting-up-reward-exchange
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-05-17
robotsTag:
  - FOLLOW
---

## Overview
[Reward Exchange](/features/reward-exchange/) is a feature that empowers your participants to exchange reward units they’ve earned for different rewards or other reward units, such as exchanging Points for a gift card. To use Reward Exchange for your program, you can set up one or several reward exchange options and choose the rules around:
- What reward units your participants can exchange
- What they can get in return
- Who can see and use the exchange option

Full Access and Program Manager team members can create a reward exchange option and set its rules. 

![Screenshot of reward exchange option](https://res.cloudinary.com/saasquatch/image/upload/v1648662177/squatch-assets/Screenshot_2022-03-30_103003.png)

## 1. Create the reward exchange option
1. Sign in to the SaaSquatch Admin Portal.
2. Go to the **Rewards** page.
3. Click the **Exchange** tab.
4. Click the orange **Create exchange option** button.
5. Enter a name for the reward exchange option.

Next, set up your reward exchange rules.

## 2. Set the exchange rules
For more information about the types of fixed and variable exchanges you can set up, see our doc on [Reward Exchange](/features/reward-exchange/#reward-exchange-options).
1. Use the **From** dropdown list to choose the reward unit that participants can exchange.
2. Use the **To** dropdown list to choose the reward or reward unit that participants will receive.
    - **Tip**: You can create new reward units or rewards within the dropdown list.
3. Set either the **Cost** or the **Exchange Rate** and **Increments** in the lowest denomination of the reward unit, e.g., cents if your reward unit is dollars.

<table class="table table-hover" style="width:100%">
	<tr>
		<th style="width:40%">If exchanging one reward unit for...</th>
		<th style="width:60%">Then</th>
	</tr>
	<tr>
		<td>
			<ul>
				<li>A fixed-value reward from the catalog</li>
				<li>A set of rewards</li>
			</ul>
		</td>
		<td>
			<ol>
				<li>Set the <b>Cost</b>.</li>
			</ol>
			<p>
			<strong>Note</strong>: If you chose <strong>A set of rewards</strong>, then you'll need to assign a cost for each reward. Click <strong>Add fixed reward option</strong> to give your participants more choices.</p>
		</td>
	</tr>
	<tr>
		<td>
			<ul>
				<li>Another reward unit</li>
				<li>A variable-value reward from the catalog</li>
			</ul>
		</td>
		<td>
			<ol>
				<li>Set the <strong>Exchange Rate</strong>. This is how many of the original reward unit must be available to get one of the chosen reward or reward unit. </li>
				<li>Enter the <strong>Increments</strong>. This defines how much the cost of the next available item  increases by, and is used with the exchange rate to calculate the reward values a participant can choose from.</li>
				<li>Set the <strong>Minimum exchange</strong> and <strong>Maximum exchange</strong> values that the participant can exchange.</li>
			</ol>
		</td>
	</tr>
</table>
Next, set some availability criteria to determine who can see and use this reward exchange option.

## 3. Set the availability rules
The Availability section allows you to set optional rules around who can see this reward exchange option and when they can use it. 

### Showing or hiding the exchange option
By default, this exchange option is shown to all participants. In some situations, you may want to hide a particular exchange option—for example, if you only want to show US participants an exchange that lets them turn in their Points for US Dollars. 

The steps below are optional. 
<ol>
  <li> Using the <strong>Country</strong> dropdown list, select the countries you want the exchange option to be available in.
    <ul>
      <li><strong>Note</strong>: This checks if participants have a <code>countryCode</code> field on their profile that matches with the countries you selected. If you would rather exclude countries, then you'll need to set additional filters with a JSONata expression.</li>
    </ul>
  </li>
  <li>Set other criteria for showing or hiding the exchange option.
    <ol>
      <li>Click <strong>Add rule</strong>.</li>
      <li>Use the dropdown lists to set conditions based on participants' default, custom or calculated fields.
        <ul>
          <li><strong>Click Switch to Advanced</strong> if you want to enter an expression using JSONata.</li>
        </ul>
    </ol>
  </li>
</ol>

### Enabling or disabling the exchange option
By default, this exchange option is enabled for all participants who have an available balance to exchange.  You can add rules that enable the exchange option only for participants who meet specific criteria, like belonging to a Gold segment. 

The steps below are optional.
1. Click **Add Rule**.
2. Use the dropdown menus to set conditions based on participants' default, custom or calculated fields.
    - Click **Switch to Advanced** if you want to enter an expression using JSONata.

## 4. Choose display options
If you don’t modify the display settings, then participants will see the default gift image along with the cost of the reward. The exchange options will be shown in the order they were created, from oldest to newest.

1. Enter the name you want to be displayed to your participants.
2. Set the display order.
    - **Note**: To override the default display order, enter a number in this box. `1` is the highest priority and will be shown first. 
3. Enter a one- or two-sentence description.
4. Choose an image to represent the exchange option by either:
    - Uploading an image from your computer
    - Pasting a URL

Next, review your choices and save the reward exchange option.

## 5. Review and save
In the final section of the setup flow, you will see a summary of your selections. 
1. Confirm that the exchange rules and eligibility criteria are accurate.
2. Click the orange **Save** button.

Next, add the Reward Exchange component to your widget or microsite so that participants can see and use your exchange option.

## 6. Add the Reward Exchange component to your widget or microsite
> **Before you begin**: Reward Exchange is only compatible with [verified access](/topics/widget-types/#verified-access-widgets) widgets or microsites that have our mint components package installed. For help adding the mint components package or checking if you have it installed, see our document on [participant experiences](/features/end-user-experiences#mint-components).

1. Go to the **Content** page.
2. Open the widget editor by clicking **Edit widgets** or the microsite editor by clicking **Edit content**.
3. Follow our guide on customizing [program widgets](/designer/widget-editor) or [microsite layouts and pages](/building-programs/microsites/customizing-microsites) if you need help adding a new component.
    - **Note**: The Reward Exchange component is available under the Rewards category.
4. Save your changes.
