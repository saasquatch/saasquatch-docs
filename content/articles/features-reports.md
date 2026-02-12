---
title: Program Reports
highlights: Overviews on each of the Program Reports that are available through the SaaSquatch portal.
slug: features/reports
sectionType: successArticle
template: hasTableOfContents.html
date: 2022-11-17
seoDescription: SaaSquatch offers different downloadable reports for your program and participant data. Learn about all the reports for your loyalty and referral programs here...
robotsTag:
  - FOLLOW
---

SaaSquatch offers different reports for your program and participant data. They can be downloaded in .CSV or Excel format. All reports have filtering options to allow you greater control over the data you download.

See [Running a Program Report](/running-programs/analytics-and-reporting/running-a-report/) for instructions on generating new reports.

## Available reports
<table class="table table-hover">
  <tr>
    <th>Report</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>User details</b></td>
    <td>Export a list of all users to keep your records up to date with SaaSquatch sharelinks and referral codes</td>
  </tr>
  <tr>
    <td><b>Reward details</b></td>
    <td>A report of all earned rewards within your programs. Use this information to create balance sheets, track reward status at a specific point in time, and more</td>
  </tr>
  <tr>
    <td><b>Available reward balances by user</b></td>
    <td>A list of available rewards to help with your bulk reward redemption process</td>
  </tr>
  <tr>
    <td><b>User event export</b></td>
    <td>Export all historic user events</td>
  </tr>
  <tr>
    <td><b>Reward balances by user</b></td>
    <td>A list of all rewards with key information for fulfilling rewards manually, or in a system like Tango Card</td>
  </tr>
  <tr>
    <td><b>Referral activity</b></td>
    <td>A record of all referral connections made in your referral programs to analyze their rate of success and track new users being brought in</td>
  </tr>
</table>

## User details report
> A full list of the fields can be found in our [sample CSV](https://assets.ctfassets.net/s68ib1kj8k5n/7Am85AH6wmNdArmjRNW3vr/95f52c5d79311509d795a0be4c94166f/User_Details_Report_Sample.csv) user details report.

The user details report contains detailed information about each participant in all your programs. 

By default, the report will include __user detail__ information like:
- Name
- User and Account ID
- Email address
- Custom fields
- Segments
- Referral information (if applicable)

When generating the report, you can optionally include: 
- __User stats__, including analytics information about the user like traffic, revenue, and more
- __Referral share links and codes__, if applicable. This information can be helpful as part of updating contact records in your CMS or email system to include each user's SaaSquatch sharelinks and codes.

## Reward details report
>  A full list of the included fields can be found in our [sample CSV](https://assets.ctfassets.net/s68ib1kj8k5n/7E5DNWKrh7iQMNGYQBWRiS/3ae6c7a9109542215763a07a18cb0494/Reward_Details_Example_Report_CSV.csv), [sample Excel](https://assets.ctfassets.net/s68ib1kj8k5n/2MQjc4XjXGPNhsv10tHal6/dc40679812b99d0aef4ace46a780e1ee/Reward_Details_Example_Report_XLSX.xlsx) or [sample JSONL](https://assets.ctfassets.net/s68ib1kj8k5n/5BeuDmYM1WFAySjqntGeji/f321cf59a96d45061645d971e06fb569/Reward_Details_Example_Report_JSONL.jsonl) reward details reports.

The reward details report provides a detailed record of each of your rewards and their relationships with users and referrals. This information can be useful in creating balance sheets, as well as getting the status of all your rewards at a point in time.

By default, the report will include __reward fields__ information like:
- Reward ID
- Reward Type
- Reward Value

When generating the report, you can optionally include:
- __User details__ like name, user and account ID, email address, custom fields, segments, and referral information (if applicable)
- __Referral fields__ like referral ID, referred user fields, referrer user fields, and more

> __Tip:__ The Reward Details Report can be generated as a Snapshot Report. When a Snapshort Report is created, the Available Value, Redeemed Credit, and Reward Status fields will be calculated based on a specific point in time which you can configure. This provides you with the ability to retrieve historical data in your report.

## Available reward balances by user report
> A full list of the fields can be found in our [sample CSV](https://assets.ctfassets.net/s68ib1kj8k5n/7CggBzV2U5EoJqp1HFF5SA/f3b417f460c0d960f8429b26824a225b/Available_Reward_Balances_by_User.csv) available reward balances report. 

The available reward balances report provides a list of unredeemed rewards. This report type is intended to be used as part of fulfilling rewards through the [Bulk Reward Redemption](/guides/bulk-reward-redemption) process. 

By default, the report includes:
- User details like name, user and account ID, email address, and more
- Reward unit
- Reward currency
- Available amount

> __Note__: This report does not include details about Percentage Discount, Fuel Tank, or Gift Card rewards. Please download the [Reward Balances Report](/features/reports#reward-balances-by-user-report) for balances for these types of rewards. 

## User events export report
The user event exports report provides a record of all user events that SaaSquatch has received from your company. You can apply filters to narrow down a time range, event key, user ID, and more.

By default, the report includes:
- Event ID
- Event key
- User and Account ID
- Date Triggered
- Date Received
- Date Processed

## Reward balances by user report
> A full list of the fields can be found in our [sample CSV](https://assets.ctfassets.net/s68ib1kj8k5n/5iv0ByBQquLwShSyRjawck/e04b55a4e5afe24c01d5192c10682aab/Reward_Balances_by_User.csv) reward balances report.

The reward balances by user report provides a record of outstanding rewards, including their value and intended recipient, that were generated through your referral program. This report is often used as part of fulfilling rewards manually, or as part of a batch process to a system like Tango Card. It can also be useful for tracking how much your referral program paid out in a given time period.

By default, the report includes:
- User details like name, user and account ID, email address, and more
- Reward type
- Reward unit
- Reward amount

## Referral activity report
> A full list of the fields in our [sample CSV](https://assets.ctfassets.net/s68ib1kj8k5n/7B4pBHawfu9GtzE5mL1yo2/4fd194ee3080c5190639abab70b35e47/Referral_Activity_Report.csv) referral activity report. 

The referral activity report provides a record of the status of each referral connection made in your referral program. This information can be useful when checking on the success of your program, and tracking the number of new customers your program has brought in.

By default, the report includes:
- Referred user details like name, user and account ID, email address, and more
- Referrer user details like name, user and account ID, email address, and more
- Referral status
- Moderation status
- Reward IDs