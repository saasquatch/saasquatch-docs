---
title: Widget and Microsite Statistics
slug: features/program-and-portal-statistics
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-08-03
seoDescription: Verified access widgets and microsites can be set up to display your participants’ referral, reward and program statistics. This feature allows you to keep participants aware of what they’ve achieved and what they can work towards next. Read on for information about stat options and how to set them up. 
---

Verified access widgets and microsites can be set up to display your participants’ referral, reward and program statistics. This feature allows you to keep participants aware of what they’ve achieved and what they can work towards next. 

## Adjust the statistics shown to participants

Our templates display common high-level statistics to your participants by default. To show more custom statistics for your programs to your participants:
1. Sign in to the Admin Portal.
2. Go to the __Content__ page and open the widget or microsite editor.
3. Select the program widget or microsite page that you want to edit from the left navigation menu. 
4. Add or edit a __Stat Component__.
    - __Tip__: For additional help using the editors, check out [Customising Microsite Layouts and Pages](/building-programs/microsites/customizing-microsites#add-layout-and-page-content) or [Customizing Program Widgets](/designer/widget-editor#add-more-components). 
5. In the *Stat Type* field, enter one of the stat strings below. Depending on your program setup, some adjustment may be needed.  

## Referral statistics
Referral statistics display a participant’s referral activity, like the number of referrals made overall or within a specific time period. These statistics are program-specific. If your participant is part of multiple programs, then they’ll only see their statistics from the program the widget or microsite is set up for.

<table class="table table-hover">
	<tr>
		<th>Statistics</th>
		<th>Stat Type</th>
		<th>Example Stat String</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Referral count</td>
		<td>Count</td>
		<td><code>/referralsCount</code></td>
		<td>All referrals made by this participant in a specific referral program.</td>
	</tr>
	<tr>
		<td>Referral count - started</td>
		<td>Count</td>
		<td><code>/referralsCount/started</code></td>
		<td>Referrals that have started but not converted in a specific referral program.</td>
	</tr>
	<tr>
		<td>Referral count - converted</td>
		<td>Count</td>
		<td><code>/referralsCount/converted</code></td>
		<td>Converted referrals made by that participant under a specific referral program.</td>
	</tr>
	<tr>
		<td>Referrals week</td>
		<td>Count</td>
		<td><code>/referralsWeek</code></td>
		<td>All referrals made by that user in the past week. This includes both started and converted referrals.</td>
	</tr>
	<tr>
		<td>Referrals month</td>
		<td>Count</td>
		<td><code>/referralsMonth</code></td>
		<td>All referrals made by that user in the past month. This includes both started and converted referrals.</td>
	</tr>
</table>

## Reward statistics
Reward statistics can display a participant’s reward history, reward balances or several other metrics. You can determine whether the reward statistics display data that is:
- Specific to a program
- Specific to your tenant (recommended if you want to take into account other sources of rewards, such as rewards given manually or from other programs)

<table class="table table-hover">
	<tr>
		<th>Statistics</th>
		<th>Stat Type</th>
		<th>Example Stat String</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Rewards count</td>
		<td>Count</td>
		<td><code>/rewardsCount</code></td>
		<td>Count of all the participant's rewards under that specific program.</td>
	</tr>
	<tr>
		<tr>
		<td>Rewards count - global</td>
		<td>Count</td>
		<td><code>/rewardsCount/global</code></td>
		<td>Count of all the user's rewards, regardless of how they were earned (all programs, manual, etc.).</td>
	</tr>
	<tr>
		<td>Rewards count filtered</td>
		<td>Count</td>
		<td><code>/rewardsCountFiltered/CREDIT/CASH%2FUSD</code></td>
		<td>Count of a specific type of reward on the user under a specific program, e.g. <code>CREDIT</code>. Requires a type and a unit. Units with a slash need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards count filtered - global</td>
		<td>Count</td>
		<td><code>/rewardsCountFiltered/CREDIT/CASH%2FUSD/global</code></td>
		<td>Count of a specific type of reward on the user regardless of how it was earned (all programs, manual, etc.). Requires a type and a unit. Units with a slash need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards week</td>
		<td>Count</td>
		<td><code>/rewardsWeek</code></td>
		<td>Count of all the user's rewards for that week for that specific program.</td>
	</tr>
	<tr>
		<td>Rewards week - global</td>
		<td>Count</td>
		<td><code>/rewardsWeek/global</code></td>
		<td>Count of all the user's rewards for that week, regardless of how they were earned (all programs, manual, etc.).</td>
	</tr>
	<tr>
		<td>Rewards month</td>
		<td>Count</td>
		<td><code>/rewardsMonth</code></td>
		<td>Count of all the user's rewards for that month under that specific program.</td>
	</tr>
	<tr>
		<td>Rewards month - global</td>
		<td>Count</td>
		<td><code>/rewardsMonth/global</code></td>
		<td>Count of all the user's rewards for that month, regardless of how they were earned (all programs, manual, etc.). </td>
	</tr>
	<tr>
		<td>Integration reward count</td>
		<td>Count</td>
		<td><code>/integrationRewardsCountFiltered</code></td>
		<td>Count of all the user's Tango Gift Card rewards under a specific program, regardless of status.</td>
	</tr>
	<tr>
		<td>Integrtion reward count by status</td>
		<td>Count</td>
		<td><code>/integrationRewardsCountFiltered/AVAILABLE</code></td>
		<td>Count of all the user's Tango Gift Card rewards under a specific program for a specific reward status. (<code>PENDING</code>, <code>AVAILABLE</code>, <code>CANCELLED</code>)</td>
	</tr>
	<tr>
		<td>Integration reward count - global</td>
		<td>Count</td>
		<td><code>/integrationRewardsCountFiltered/AVAILABLE/global</code></td>
		<td>Count of all the user's Tango Gift Card rewards, regardless of how they were earned (all programs, manual, etc.). Status filter is optional. </td>
	</tr>
	<tr>
		<td>Rewards assigned</td>
		<td>Sum</td>
		<td><code>/rewardsAssigned/CREDIT/CASH%2FUSD</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> & <code>REDEEMED</code> rewards of a certain type & unit under a specific program. Not available for <code>INTEGRATION</code>. Slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards assigned - global</td>
		<td>Sum</td>
		<td><code>/rewardsAssigned/CREDIT/CASH%2FUSD/global</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> & <code>REDEEMED</code> rewards of a type & unit, regardless of how they were earned (all programs. manual, etc.). Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards redeemed</td>
		<td>Sum</td>
		<td><code>/rewardsRedeemed/CREDIT/CASH%2FUSD</code></td>
		<td>Sum of all the user's <code>REDEEMED</code> rewards only of a certain type & unit, under a specific program. Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards redeemed - global</td>
		<td>Sum</td>
		<td><code>/rewardsRedeemed/CREDIT/CASH%2FUSD/global</code></td>
		<td>Sum of all the user's <code>REDEEMED</code> rewards only of a type & unit, regardless of how they were earned (all programs, manual, etc.). Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards available</td>
		<td>Sum</td>
		<td><code>/rewardsAvailable/CREDIT/CASH%2FUSD</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> rewards only of a certain type & unit, under a specific program. Not available for `INTEGRATION`; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Rewards available - global</td>
		<td>Sum</td>
		<td><code>/rewardsAvailable/CREDIT/CASH%2FUSD/global</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> rewards only of a type & unit, regardless of how they were earned (all programs, manual, etc.). Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Reward balance</td>
		<td>Sum</td>
		<td><code>/rewardBalance/CREDIT/UNIT/prettyValue</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> & <code>REDEEMED</code> rewards of a certain type & unit under a specific program; ability to display the pretty value of the unit. Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Reward balance - global</td>
		<td>Sum</td>
		<td><code>/rewardBalance/CREDIT/UNIT/prettyValue/global</code></td>
		<td>Sum of all the user's <code>AVAILABLE</code> & <code>REDEEMED</code> rewards of a type & unit, regardless of how they were earned (all programs. manual, etc.); ability to display the pretty value of the unit. Not available for <code>INTEGRATION</code>; slash units need to be escaped.</td>
	</tr>
</table>

## Program statistics
Program statistics allow you to display to participants how many times they (or someone they referred) have completed a specific goal. Program goals can range from the number of times a participant has referred someone who’s completed a demo, to the number of times a participant has completed an action in a points program.

<table class="table table-hover">
	<tr>
		<th>Statistics</th>
		<th>Stat Type</th>
		<th>Example Stat String</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>User goal count</td>
		<td>Count</td>
		<td><code>/programGoals/count/Example-Goal-Name</code></td>
		<td>Specific goal count for that user under a specific goal program; e.g. Points Program Goals.</td>
	</tr>
	<tr>
		<td>Referred user conversion goal count</td>
		<td>Count</td>
		<td><code>/programGoals/conversionCount/Example-Goal%2FreferredGoals</code></td>
		<td>Total (non-unique) count of a specific Referred User Conversion-type Goals under a specific referral program for that Referrer user; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Referred user unique conversion goal count</td>
		<td>Count</td>
		<td><code>/programGoals/conversionCount/Example-Goal%2Freferrals</code></td>
		<td>Unique number of Referred Users that hit a specific "Referred User Conversion-type Goal" for that user under a specific referral program for the Referrer user; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Referred user goal count</td>
		<td>Count</td>
		<td><code>/programGoals/count/Example-Goal%2FreferredGoals</code></td>
		<td>Total (non-unique) count of a specific Referred User Goal under a specific referral program for that Referrer user; slash units need to be escaped.</td>
	</tr>
	<tr>
		<td>Referred user unique goal count</td>
		<td>Count</td>
		<td><code>/programGoals/count/Example-Goal%2Freferrals</code></td>
		<td>Unique number of Referred Users that hit a specific "Referred User Goal" for that user under a specific referral program for the Referrer user; slash units need to be escaped.</td>
	</tr>
</table>