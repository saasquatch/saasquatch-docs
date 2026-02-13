---
title: Bulk Reward Redemption
highlights: SaaSquatch allows you to process batch reward redemption for your Referral or Loyalty program. 
slug: guides/bulk-reward-redemption
sectionType: successArticle
template: hasTableOfContents.html
date: 2021-11-04
seoDescription: "How to manually perform bulk reward redemption for participant's of your referral and loyalty programs..."
tags:
  - Bulk reward
  - redemption 
  - bulk
  - rewards
  - manual rewards
  - manual fufillment
---

When looking to provide manual rewards to your participants in bulk you can use the Available balance report. 

### Download Available Balance Report
The Available Balance Report lists all customers with available reward balances in your project. This list can be used to manually fulfill rewards within your external system. 

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select either your Live or Test tenant.
3. Click "Rewards" in the upper header of your SaaSquatch account.
4. Click "Bulk Redeem" in the lower header.
5. Under Section 1, Select which units you would like to filter on your Available Balance Report. 
6. Click "Request Report". 
7. Your report will download to your computer. 
8. You can use this report to manually fulfill rewards in your external system.

### Update Available Balance Report
After manually fulfilling rewards in your external system you will need to update the Available Balance Report. This will allow SaaSquatch to know which participants have had their rewards fulfilled.

1. Using a spreadsheet application open the Available Balance Report. 
2. For each user you have manually fulfilled a reward for, update the valueToRedeem column. 
3. Save the Available Balance Report in .CSV format.

> valueToRedeem can only be positive numbers. 

#### Redemption Notes

- Reward balances need to be redeemed in the same units (*e.g*. `CENTS` or `CASH/USD`) that the balance is shown in (*i.e.* Dollars cannot be redeemed in amounts of cents).
- Only changes to the `valueToRedeem` field will be processed during an import.  
- Individual rewards within a reward balance will be redeemed in order of when they expire (`dateExpires`), and then when they were made available to the user (`dateGiven`). 
- Only rewards with a status of `AVAILABLE` will be redeemed.
- Fractions of the fractional unit will be truncated on redemption (*e.g.* redemption for "10.556 USD" will only redeem "10.55 USD").

### Upload the Updated Available Balance Report
Upload your Available Balance Report with current reward balances back into SaaSquatch. This will ensure SaaSquatch knows and displays the correct information for each participant.

1. Head to your SaaSquatch account.
2. In the upper right corner of your SaaSquatch account select the same tenant you downloaded the Available Balance Report from.
3. Click "Rewards" in the upper header of your SaaSquatch account.
4. Click "Bulk Redeem" in the lower header.
5. Under Section 3, Click "Select & Upload". 
6. Select your updated Available Balance Report from your computer to import it into SaaSquatch. 
