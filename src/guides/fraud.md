---
title: Fraud, Security and Fake Referrals
highlights: |
    The prizes that are offered in your referral program can be the target of fraud and faked referrals. This is why Referral SaaSquatch has a number of security features to help you prevent, detect and respond to these attempts to fraud or fake referrals.
slug: fraud-and-security
template: guides.html
---

Some examples of fraud are:

 - **Self-referral**: existing users creating fake referrals to take advantage of referral prizes
 - **Exploitation**: anonymous internet users creating referrals for personal financial gain
 - **Account Cycling**: existing users signing up for and cancelling subsequent accounts
 - **Broadcasting**: Posting referral links on coupon sites or other locations your company does not approve of

There are three parts to a complete fraud management strategy:

 - **Prevention**: the best strategy for fraud management is in the structure of your referral program and identity systems to make fraud financially and logically infeasible.
 - **Detection**: in some cases not all types of fraud can be prevented, leaving additional cases to be detected through automated algorithms and human oversight.
 - **Response**: every business has their own practices on how best to respond to fraud cases, like removing rewards, suspending accounts or even seeking legal recompense.


### Prevention

The best strategy for fraud management is to prevent fraud before it happens. This can usually be accomplished by choosing the right structure for the referral incentives and the goalpost required to earn a referral credit:

 - **Conversion goalposts should be meaningful** to customer acquisition. Typical examples include making a purchase or fully experiencing a product such as setting up a website, verifying a phone number or making your first post. This makes exploiting the referral program harder, while still achieving your business goals.
 - **Incentives should be profitable** to the company immediately or shortly after the conversion goal post is passed by the referred user. This reduces the financial risk of any potential fraud, and in some cases can ensure a positive ROI from every possible referral.

Referral SaaSquatch fraud prevention also takes advantage of a company's existing account and identity systems and leverages them to simplify referral program integration and the fraud preventions systems involved.

Referral SaaSquatch comes with several built-in fraud prevention features:

 - **Existing User Detection**: Referral SaaSquatch blocks current paying customers from being referred. This protects against paying users referring themselves or paying users finding a referral link in the wild (i.e. social media or coupon sites) and using it to get a false discount. 

 - **Two-step Referral Tracking**: Referral SaaSquatch tracks a referral for new users is separated into the two steps of Attribution and Conversion. This lets your referral program be structured so that referral rewards are only triggered for *conversion* goalpost events like purchases even though referrals are fully tracked for free accounts, un-verified accounts or partial carts. 

 - **Consolidated identity**: Referral SaaSquatch is designed to easily connect with your user database and other identity systems. Users in SaaSquatch are tracked by account and user identities, which means that your existing systems for account de-duplication, email address verification, credit card authorization, social log-in, and account lockdown are automatically tied into your referral program.

 - **Explicit Double-sided Incentive Management**: Referral SaaSquatch manages all rewards associated with a referral program; both the rewards earned from making referrals as well as the rewards given to new users in a double-sided incentive program. Referral SaaSquatch also ties these rewards tightly to your users identities. This lets companies have complete control over what rewards users have access to, revoke rewards, track payout and avoid the potential headaches of leaked global-use coupon codes or secret landing pages.

Other fraud prevention measures that involve other systems:

- **The Threat of Cancellation**: Existing users that are looking to game the referral system can often be deterred by the threat of losing access to their account. This is particularly effective for SaaS, games, or marketplace companies because users often have vested value in keeping their accounts active, and fear losing access to a service they regularly use. 


**Example 1: Bad Incentive, Shallow Goalpost, No Implicit Prevention**: For example, imagine a referral program that gives people $100 in cash for each email address that they provide to an anonymous web form. It is easy to exploit this type program by providing fake email addresses, and anonymous users making referrals. While it would still be possible to create systems for fraud detection and response within Referral SaaSquatch, it would be a routine exercise to get around those systems with access to fake email addresses and proxy servers. Even if someone was caught repeatedly abusing the system, they would have already received their cash payout and the company would have no viable tracking means to pursue response from potentially anonymous individuals.

**Example 2: Good Incentive, Rewards for payment, Implicit Prevention Constraints**: The referral program structure gives people a credit towards a future purchase when a friend makes a purchase. The credit can only be applied against future purchases, preventing people from exploiting the system for cash benefit. The credit is associated with an account, so if someone is caught, the credit could be revoked, the account canceled. The friends are required to make a purchase, creating a paper trail of purchase information (such as credit card) that can be used to de-duplicate accounts, and for fraud detection and response.


### Detection

The best strategy for fraud management is preventing fraud before it happens, but a company may not have natural systems to prevent fraud, like verifying emails or de-duplicating accounts. In these cases, Referral SaaSquatch provides a way to detect and address fraud.

**Example of detection**: A company's account system does not prevent an email address from being used for more than one account, creating a potential fraud hole since people could refer themselves using their own email address. Referral SaaSquatch helps fill that hole by detecting when two users with the same email address sign up.

**Referral Moderation**

Referral SaaSquatch provides a referral moderation functionality that works much like a blog comment moderation system. You may elect to:

 - Approve all referrals until revoked
 - Pend all referrals until approved
 - Approve one side of a referral and pend the other (i.e. approve newly referred users’ prizes while pending referrer’s prizes)

If you elect to use the referral moderation functionality you will be notified every 24 hours of all referrals requiring review. 

### Response

The best strategy for fraud management is preventing fraud before it happens, but sometimes you may need to respond to fraud cases regardless either on a one-off basis, or as a general strategy.

**Investigation**

The first step of responding to a potential fraud case is investigation. Not all cases are worth a formal action. In some cases, for example, multiple people may genuinely share the same name, and the potential case can be ignored.

In the Referral SaaSquatch security view you can easily see all approved and pending referrals. Each referral shows you dates of the referral and the names of the referrer and referred users. If you see similar names all in a short period, then it’s likely that you have a case of self-referral fraud.

If the names do not match but you are still suspicious of a referral, perhaps one user has made a large number of referrals in rapid succession, you are able to investigate the referral further and review:

- The IP address of the referrer and referred user
- The email address of the referrer and referred user
- The site the referred user clicked the referral link from

Alternatively, if you are suspicious of a specific user you can view their referral history from their profile, which will show you the name and email address of each person they referred. You can then further investigate each referral to verify IP address and referring site. 

**Action**

Referral SaaSquatch lets you both **moderate referrals** as they come in, as well as **revoke historical credit** that has not yet been used.

 - **Referral Moderation**: Referral SaaSquatch has the ability to mark referral rewards as `PENDING` while one of your agents performs a review. The agent can choose to either Approve or Deny the referral. When a referral is denied, rewards for both sides are either cancelled or never created. If a referral is approved during moderation, it can later be denied. Any rewards that have not been consumed will be cancelled.

 - **Cancel Historical Credit**: Referral SaaSquatch allows referral credits to be revoked at any time, regardless of whether they were auto-approved, manually approved, or denied. Any referral can be approved or denied as many times as needed for your business case. There is no timeline by when rewards can be cancelled, but some reward types by their very nature are uncancellable, like for example a coupon that has already been redeemed.

Fraud response strategies may also involve other external systems, like your account, ecommerce or CRM systems. Other types of fraud action may not explicitly rely on using Referral SaaSquatch.

 - **Account Cancellation**: If someone has been found to be repeatedly abusing the referral system, a logical avenue of recourse would be to cancel their account and blacklist them. In most cases the threat of this is sufficient to stop the activity in question.


### Referral SaaSquatch Professional Services

Fraud management is not one size fits all. Referral SaaSquatch provides a number of professional services to help design, manage and maintain your referral program and the fraud, gaming and fake referral considerations therein.

 - **Fraud Management Strategy Consultation Services**: Referral SaaSquatch has implemented fraud management solutions across industries such eCommerce, SaaS, mobile and POS situations for private and publicly traded companies, startups and fortune 500 companies alike. Companies that subscribe to our Pro and Enterprise plans are eligible for limited complimentary consultation as part of the onboarding package. Further consultations are available on a per hour or per diem basis.

 - **Fraud Investigation Services**: Referral SaaSquatch investigates all reported patterns of fraud as a service to our customers. We continuously monitor for new types of fraud, gaming and fake referrals to stay on top of the new development in social network sharing, privacy blocking systems, proxy networks and anonymous systems. All Referral SaaSquatch customers are urged to report any patterns of suspicious activity directly to Referral SaaSquatch support.
