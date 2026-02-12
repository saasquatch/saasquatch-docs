---
title: Email Template Merge Tags
highlights: In SaaSquatch, you can use Merge Tags when designing email communications to ensure that your message is personalized and dynamic.
slug: designer/short-tags
sectionType: designerArticle
template: hasTableOfContents.html
date: 2023-10-18
---

<p>Merge tags allow the SaaSquatch system to populate your program’s transactional emails with dynamic information about:</p>
<ul>
<li>Your participants</li>
<li>Rewards they earn</li>
<li>People they refer</li>
<li>Personal share links and message links</li>
</ul>
<div>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-10-11_at_9.40.08_AM_2wIqSsVO3X5tv7koGNQvnl.png" data-lightbox="example-set"><img src="/assets/images/contentful/Screen_Shot_2019-10-11_at_9.40.08_AM_2wIqSsVO3X5tv7koGNQvnl.png" alt="Email in Editor">  <div><i class="fa fa-eye"></i> Preview</div>
</a>
<a class="docs-lightbox" href="/assets/images/contentful/Screen_Shot_2019-10-11_at_9.58.01_AM_6awp6mrTQFHi2NDyBqTguH.png" data-lightbox="example-set"><img src="/assets/images/contentful/Screen_Shot_2019-10-11_at_9.58.01_AM_6awp6mrTQFHi2NDyBqTguH.png" alt="Email in Inbox">  <div><i class="fa fa-eye"></i> Preview</div>
</a>
</div>

## Available merge tags

<table class="table table-hover"
	<thead>
		<td style="width:15%">Category</td>
		<td style="width:25%">Merge tag</td>
		<td style="width:30%">Description</td>
		<td style="width:30%">Example</td>
	</thead>
	<tr>
		<td rowspan="4">Participant information</td>
		<td><code>{{user.firstName}}</code></td>
		<td>The first name of the participant viewing the email.</td>
		<td rowspan="2"><code>{{user.firstName}} {{user.lastName}}</code>, you’ve earned a reward!</td>
	</tr>
	<tr>
		<td><code>{{user.lastName}}</code>
		<td>The last name of the participant viewing the email.</td>
	</tr>
	<tr>
		<td><code>{{user.referralCode}}</code></td>
		<td>The participant's referral code. </td>
		<td>Your personal referral code is <code>{{user.referralCode}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.customFields.xxx}}</code></td>
		<td>Use this tag to reference any participant information that you’ve included as a custom field. This example shows a merge that populates with the name of the company for which the participant works.</td>
		<td>Share your referral information with your colleagues at <code>{{user.customFields.companyName}}</code>.</td>
	</tr>
	<tr>
		<td>Client information</td>
		<td><code>{{tenant.settings.companyName}}</code></td>
		<td>Your company’s name, as listed on the <strong>Settings > General</strong> page. </td>
		<td>Welcome to <code>{{tenant.settings.companyName}}</code>’s Advocate program.</td>
	</tr>
	<tr>
		<td rowspan="6">Reward details</td>
		<td><code>{{reward.prettyValue}}</code></td>
		<td>The value of the reward in a formatted manner (e.g., $15.00).</td>
		<td>Get <code>{{reward.prettyValue}}</code> off your next order.</td>
	</tr>
	<tr>
		<td><code>{{reward.unit}}</code></td>
		<td>The unit of the reward (e.g., Point or Month).</td>
		<td>You’ve received a <code>{{reward.unit}}</code> for referring your friend, <code>{{referral.referredUser.firstName}}</code>!</td>
	</tr>
	<tr>
		<td><code>{{reward.name}}</code></td>
		<td>The name of the reward as seen in the Reward Catalog.</td>
		<td>Congratulations on your reward of <code>{{reward.name}}</code>!</td>
	</tr>
	<tr>
		<td><code>{{formatDate reward.dateGiven "dd/MM/yyyy"}}</code></td>
		<td>The date that the reward was fulfilled. The date format is adjustable.</td>
		<td rowspan="2">You earned a <code>{{reward.name}}</code> on  <code>{{formatDate reward.dateGiven "dd/MM/yyyy"}}</code>. Make sure to redeem it before it expires on {{formatDate reward.dateExpires "dd/MM/yyyy"}}!</td>  
	</tr>
	<tr>
		<td><code>{{formatDate reward.dateExpires "dd/MM/yyyy"}}</code></td>
		<td>The date that the reward will expire, if an expiry has been set in your program rules. The date format is adjustable.</td>
	</tr>
	<tr>
		<td><code>{{reward.fuelTankCode}}</code></td>
		<td>The fuel tank reward code, if you are using this feature.</td>
		<td>Use code <code>{{reward.fuelTankCode}}</code> to apply your discount to your next purchase.</td>	
	</tr>
	<tr>
		<td rowspan="4">Referral-specific information</td>
		<td><code>{{referral.referrerUser.firstName}}</code></td>
		<td>The first name of the person who made the referral.</td>
		<td rowspan="4"><code>{{referral.referrerUser.firstName}}</code> <code>{{referral.referrerUser.lastName}}</code>, your friend <code>{{referral.referredUser.firstName}}</code> <code>{{referral.referredUser.lastName}}</code> has signed up! 
	</tr>
	<tr>
		<td><code>{{referral.referrerUser.lastName}}</code></td>
		<td>The last name of the person who made the referral.</td>
	</tr>
	<tr>
		<td><code>{{referral.referredUser.firstName}}</code></td>
		<td>The first name of the referred participant.</td>
	</tr>
	<tr>
		<td><code>{{referral.referredUser.lastName}}</code></td>
		<td>The last name of the referred participant.</td>
	</tr>
	<tr>
		<td rowspan="7">Share links and message links</td>
		<td><code>{{user.email}}</code></td>
		<td>Generates the message link that is sent out in referral emails.</td>
		<td>Share via <code>{{user.email}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.shareLink}}</code></td>
		<td>The participant’s main share link. This shows up as <code>UNKNOWN</code> in Analytic reports. This link is meant for the participant to copy and provide to other people, rather than to click on themselves.</td>	
		<td>Provide this share link to your friends: <code>{{user.shareLink}}</code>
	</tr>
	<tr>
		<td><code>{{user.facebook}}</code></td>
		<td>The participant's message link for Facebook.</td>
		<td>Share on <code>{{user.facebook}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.fbmessenger}}</code></td>
		<td>The participant's message link for Facebook Messenger.</td>
		<td>Share on <code>{{user.fbmessenger}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.twitter}}</code></td>
		<td>The participant's message link for X.</td>
		<td>Share on <code>{{user.twitter}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.linkedin}}</code></td>
		<td>The participant's message link for LinkedIn.</td>
		<td>Share on <code>{{user.linkedin}}</code>.</td>
	</tr>
	<tr>
		<td><code>{{user.sms}}</code></td>
		<td>The participant's message link for texting.</td>
		<td>Share via <code>{{user.sms}}</code>.</td>
	</tr>
</table>
