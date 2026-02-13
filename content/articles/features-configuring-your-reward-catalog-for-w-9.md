---
title: Configuring your Reward Catalog for W-9
highlights: "Our W-9 Compliance feature is compatible with a wide array of different reward units, flexible enough for practically any situation on our Growth Automation Platform.\n"
slug: features/configuring-your-reward-catalog-for-w-9
sectionType: successArticle
template: hasTableOfContents.html
date: 2021-04-30
---

When W-9 Compliance is configured, participants without W-9 Tax Forms will not be able to receive over $599.99 USD in rewards during the tax year. A participant's total for the tax year is calculated using the taxable value of a reward. For more information about W-9 Compliance, we recommend that you read our article about [W-9 Compliance](/features/w-9-compliance) on the SaaSquatch Growth Automation Platform.

### Configuring USD Reward Units
The taxable value of rewards from USD reward units will be calculated automatically and added to the participants’s total for the tax year. Reward unit types such as Cash, Credit and Custom can be configured to explicitly reward USD. For example, to create a USD Credit reward unit go to Rewards -> Reward Units and click “Create Reward Unit”. Select Credit, select USD as the currency and click “Create Unit”.

![USD Reward Unit Set Up](/assets/images/contentful/Screenshot_2021-04-29_140001_7EjmjGocm9Yoi1k6fJXxrq.png)

This reward unit can now be used when configuring rewards to be given manually or through a program.

### Configuring Custom Reward Units
There are many other ways to reward participants other than directly with USD, and you might want these rewards to count towards a participant's USD total for the tax year. The US Taxable Value customization allows the configuring of a taxable value for rewards which do not directly reward USD. This can be done by creating and customizing Cash, Months, Points and Custom reward units. When a reward unit’s US Taxable Value is configured, it will be used when calculating a participant's USD total for the tax year. This also means that rewards from these reward units will be compliant with your W-9 Compliance configuration, and can be set to Pending when rewarded. When creating or editing a reward unit, configuring the US Taxable Value is possible by clicking on Advanced Settings dropdown found at the bottom of the reward unit configuration.

![Advanced Setting Big](/assets/images/contentful/Screenshot_2021-04-29_161001_5TNqXEgnbrX3KaLU9SZu9C.png)

The US Taxable Value is a [JSONata](https://docs.jsonata.org/overview) expression that returns a value in cents and when configuring, you have access to two variables as shown below.

**totalValue**: The total value of rewards earned in this unit by a participant.

**count**: The number of rewards earned in this unit by a participant.

For example, if you had a POINT unit being used for rewards and wanted each POINT to count as one dollar USD for its taxable value, you could configure an expression like `100*totalValue`.

This reward unit can now be used when configuring rewards to be given manually or through a program.

**Note:** If you have a USD reward unit and configure a custom US Taxable Value, the custom US Taxable Value will take precedence and be used for USD tax calculations.

### Effects of Changing the US Taxable Value On Your Reward Units
The US Taxable Value of a reward unit may need to naturally change over time and that's okay, but before it's changed, do know that it can have active changes on a participant's tax calculations. If it is changed during a tax year, this will also change the calculations of total USD rewards for each participant who has received this reward unit. Depending on the change, this could potentially put a participant without a W-9 Tax Form over the $599.99 USD compliance limit. In this case their existing rewards will not be set to Pending but as expected, but any new rewards will be set as Pending.

There may also be the need to remove a reward unit’s US Taxable Value and this can similarly affect a participant's calculation of USD rewards for a tax year. If the US Taxable Value is removed from a non-USD reward unit, rewards using that reward unit will no longer count towards participant's USD total for the tax year. If the US Taxable Value is removed from a USD reward unit, the USD amount of the reward will be used as the taxable value.

### Additional Information
W-9 Compliance is only available on our Growth Automation platform and not available to Classic tenants. If this is an issue, please contact our Support team for information about migrating to our Growth Automation Platform.
