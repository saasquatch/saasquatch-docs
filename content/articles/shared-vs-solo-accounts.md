---
title: Shared vs. Solo Accounts
highlights: SaaSquatch provides flexible options for structuring how participants are grouped in your programs.
slug: shared-vs-solo-accounts
sectionType: guide
template: hasTableOfContents.html
date: 2019-10-15
---

 
<div class="row">
  <hr>
  <div class="span3 offset1"><strong>Shared Account</strong></div>
  <div class="span7"><i class="fa fa-users"></i> Multiple users with a shared reward pool</div>
</div>
<div class="row">
  <hr>
  <div class="span3 offset1"><strong>Solo Account</strong></div>
  <div class="span7"><i class="fa fa-user"></i> Every user has their own reward pool</div>
  <hr>
</div>

### Accounts
An account is the lowest-level structure in your programs used to organize  participants.

Key aspects of an account:
- Each account can only be referred once.
- <span class="label">Classic only</span> The account status (`TRIAL`, `PAID`, `CANCELLED`) is set at the account level.
- Rewards are also earned at the account level

#### <span class="label">Classic only</span> Payment Provider Id
The `payment_provider_id` is a property of an account, not a user. The `account_id` is your internal identifier while the `payment_provider_id` is used to connect a SaaSquatch account to the related account in your payment system (e.g. Stripe or Recurly). 

If you're using the API integration, or your account does not yet have an account in your payment system, then simply leave `payment_provider_id: null` for every account.

### Users
Users are each mapped to one specific account. 

The following information is controlled at the user level:
- First and last name
- Email address
- Referral code
- Share links

Each user is able to use their own referral links and codes to share and make referrals.

### Shared Accounts
In a Shared Account every user works towards the same goals and shares the same reward pool. 

Even though users in a Shared Account are all working towards the same pool of rewards their referrals are tracked seperately. Each user can see the referrals and rewards that they have made and how that has contributed to the overall reward pool. 

#### Usage
To setup a shared account simply set the same `account_id` of each of user you wish to be in the same account.

#### Example Use Case
Many B2B apps have multiple users that access the same account, but there is only one bill paid for all of those users. Helpdesk, CRM, or collaboration software applications tend to have Shared Accounts.

Subscriptions like Netflix are also an example of Shared Account setup. Each Netflix account can contain multiple users while sharing the same billing information.

**For example:** if each referral is worth 10% off, then a shared account can get the full 100% off through 10 referrals from and of the different users in the account; Ron makes 5 referrals, Ginny makes 3 referrals, and Percy makes 2 referrals, for a total of 10.

![Shared Accounts - Scaled](/assets/images/contentful/Shared_Accounts_-_Scaled_2Yh84nziYU6IeWEy4yqYsy.png)

### Solo Accounts
Solo accounts are identical to Shared Accounts in every way other than the number of users in the account. In a Solo Account there is only one user. This 1-to-1 mapping of account and user means that information and settings that might otherwise have applied to multiple accounts instead only apply to one. 

#### Usage
To make use of solo accounts, mapping users and accounts 1-to-1, simply set the `account_id` and `user_id` of each referral participant to the same value.

#### Example Use Case
Most B2C apps make use of having each user with their own account.

For example, each Facebook or LinkedIn account is setup to be used by only one person. 

![Solo Account - Scaled](/assets/images/contentful/Solo_Account_-_Scaled_6fo2mGJiJGAcC84sUQU84Y.png)

### Finding Account/User Details
A referral participant's account and user information can be found on their profile in the [participant explorer](/success/navigating-the-portal/#participants) in the SaaSquatch Portal.

##### 1. Navigate to the Participant section in the SaaSquatch Portal.
##### 2. In the search Box, enter the Referrer's name, email, or SaaSquatch user id.
![Search For Participant](/assets/images/contentful/Search_For_Participant_3IAWt0NLrWIY2ceA2Q0KgC.png)
##### 3. When you find the Referrer in the search results, click on their name to be taken to their profile.
##### 4. Click on the **[Manage User]** button below their name.

  ![Manage User - Referred](/assets/images/contentful/Manage_User_-_Referred_2fAEccErAEk2cIAOyUcoQw.png)
  
##### 5. View User Details:
![User Details](/assets/images/contentful/User_Details_3IQ1vizTx6kawSAqCcA8ee.png)
