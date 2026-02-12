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

> A full list of the fields can be found in our [sample CSV](/assets/samples/User_Details_Report_Sample.csv) user details report.

The user details report contains detailed information about each participant in all your programs.

By default, the report will include **user detail** information like:

- Name
- User and Account ID
- Email address
- Custom fields
- Segments
- Referral information (if applicable)

When generating the report, you can optionally include:

- **User stats**, including analytics information about the user like traffic, revenue, and more
- **Referral share links and codes**, if applicable. This information can be helpful as part of updating contact records in your CMS or email system to include each user's SaaSquatch sharelinks and codes.

## Reward details report

> A full list of the included fields can be found in our [sample CSV](/assets/samples/Reward_Details_Example_Report_CSV.csv), [sample Excel](/assets/samples/Reward_Details_Example_Report_XLSX.xlsx) or [sample JSONL](/assets/samples/Reward_Details_Example_Report_JSONL.jsonl) reward details reports.

The reward details report provides a detailed record of each of your rewards and their relationships with users and referrals. This information can be useful in creating balance sheets, as well as getting the status of all your rewards at a point in time.

By default, the report will include **reward fields** information like:

- Reward ID
- Reward Type
- Reward Value

When generating the report, you can optionally include:

- **User details** like name, user and account ID, email address, custom fields, segments, and referral information (if applicable)
- **Referral fields** like referral ID, referred user fields, referrer user fields, and more

> **Tip:** The Reward Details Report can be generated as a Snapshot Report. When a Snapshort Report is created, the Available Value, Redeemed Credit, and Reward Status fields will be calculated based on a specific point in time which you can configure. This provides you with the ability to retrieve historical data in your report.

## Available reward balances by user report

> A full list of the fields can be found in our [sample CSV](/assets/samples/Available_Reward_Balances_by_User.csv) available reward balances report.

The available reward balances report provides a list of unredeemed rewards. This report type is intended to be used as part of fulfilling rewards through the [Bulk Reward Redemption](/guides/bulk-reward-redemption) process.

By default, the report includes:

- User details like name, user and account ID, email address, and more
- Reward unit
- Reward currency
- Available amount

> **Note**: This report does not include details about Percentage Discount, Fuel Tank, or Gift Card rewards. Please download the [Reward Balances Report](/features/reports#reward-balances-by-user-report) for balances for these types of rewards.

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

> A full list of the fields can be found in our [sample CSV](/assets/samples/Reward_Balances_by_User.csv) reward balances report.

The reward balances by user report provides a record of outstanding rewards, including their value and intended recipient, that were generated through your referral program. This report is often used as part of fulfilling rewards manually, or as part of a batch process to a system like Tango Card. It can also be useful for tracking how much your referral program paid out in a given time period.

By default, the report includes:

- User details like name, user and account ID, email address, and more
- Reward type
- Reward unit
- Reward amount

## Referral activity report

> A full list of the fields in our [sample CSV](/assets/samples/Referral_Activity_Report.csv) referral activity report.

The referral activity report provides a record of the status of each referral connection made in your referral program. This information can be useful when checking on the success of your program, and tracking the number of new customers your program has brought in.

By default, the report includes:

- Referred user details like name, user and account ID, email address, and more
- Referrer user details like name, user and account ID, email address, and more
- Referral status
- Moderation status
- Reward IDs
