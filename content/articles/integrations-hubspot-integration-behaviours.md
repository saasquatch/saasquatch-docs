---
title: HubSpot Integration Behaviors
slug: integrations/hubspot/integration-behaviours
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-07-25
seoDescription: "Our native HubSpot integration automatically shares participant referral data between the two platforms. This technical guide has detailed information about how it works, including: adjustable and non-adjustable data sharing rules; deletion and restoration of participants; what happens when you change the referral program connected to your HubSpot account and how we handle event data received from HubSpot. "
robotsTag:
  - FOLLOW
---

> __Important:__ This feature is only available for the current version of the SaaSquatch platform. If your program was created before April 2019 and you're interested in this feature, reach out to our [Success team](mailto:success@saasquatch.com) to chat about upgrading. 

Our native integration with HubSpot automatically shares data between SaaSquatch and your HubSpot Sales and Marketing Hubs. After set-up, HubSpot will be able to send referral tracking, contacts and deal stage information directly to SaaSquatch. Important SaaSquatch information like referral codes, share links, and more will be visible on contact records. You can also set up a HubSpot contact submission form that sends referral data to SaaSquatch. 

This doc goes into detail about specific data sharing and event handling behaviors. If you’re looking for a general overview of the integration’s features, see our [HubSpot integration](/integrations/hubspot/overview) doc. For setup instructions, check out [Integrating SaaSquatch with HubSpot](/integrations/hubspot/integrating-with-saasquatch).

## Data sharing
SaaSquatch and HubSpot share data through a combination of report-based syncs and webhooks. 

Our report-based syncs from SaaSquatch to HubSpot run with 1-minute intervals in between. They transmit to HubSpot any created or updated participant information that occurred after the previous sync. 

Data from HubSpot is shared to SaaSquatch with webhooks. When we receive a webhook that triggers the creation or mapping of a contact with a SaaSquatch participant, we immediately send SaaSquatch properties back to the contact in HubSpot. This means you’ll see SaaSquatch-specific properties, like referral code and share link, as soon as a contact is created or updated. 

### Sharing rules
By default, there are several situations in which we send data between platforms.

The [Shared Fields table](/integrations/hubspot/integration-behaviours#shared-fields) has a list of the specific fields that are shared between platforms during a creation or update. 

__Note:__ Your HubSpot account settings determine whether new contacts are marketing or non-marketing. 

<table class="table table-hover">
	<tr>
		<th>Adjustable rule?</th>
		<th>If</th>
		<th>Then</th>
	</tr>
	<tr>
		<td rowspan="4">Yes</td>
		<td>A SaaSquatch participant is created</td>
		<td rowspan="2">Create a contact in HubSpot</td>
	</tr>
	<tr>
		<td>An existing, unmapped SaaSquatch participant is updated</td>
	</tr>
	<tr>
		<td>A HubSpot contact is created</td>
		<td rowspan="2">Create a new participant in SaaSquatch</td>
	</tr>
	<tr>
		<td>An existing, unmapped HubSpot contact is updated</td>
	</tr>
	<tr>
		<td rowspan="5">No</td>
		<td>A contact is deleted in HubSpot</td>
		<td>Delete the mapped participant in SaaSquatch</td>
	</tr>
	<tr>
		<td>A deal stage is updated in HubSpot</td>
		<td>Send a matching event to the mapped participant in SaaSquatch</td>
	</tr>
	<tr>
		<td>An existing, mapped participant is updated in SaaSquatch</td>
		<td>Update the mapped contact’s record in HubSpot</td>
	</tr>
	<tr>
		<td>An existing, mapped contact is updated in HubSpot</td>
		<td>Update the mapped participant’s details in SaaSquatch</td>
	</tr>
	<tr>
		<td>A contact is restored in HubSpot</td>
		<td>
      <p>Re-create the participant in SaaSquatch.</p>
			<p><b>Important:</b> Participant data like referral history cannot be restored. See the <a href="/integrations/hubspot/integration-behaviours#participant-deletion">Participant deletion</a> section for more information.</p> 
    </td>
	</tr>
</table>

### Shared fields
We share data between specific HubSpot and SaaSquatch fields when a creation or update is triggered. Check your integration’s data flow under __Settings > Integrations__ to see which apply for your program.  

__Note:__ We consider a HubSpot contact’s record to be updated if one of these fields has changed values: email, referred-by code, referral cookies, user ID or account ID.

<table class="table table-hover">
	<tr>
		<th style="width:25%">If</th>
		<th style="width:25%">Then send data from</th>
		<th style="width:25%">From field</th>
		<th style="width:25%">To field</th>
	</tr>
	<tr>
		<td rowspan="8">
    <p>A SaaSquatch participant is created</p>
		<p><b>Example:</b> Someone who isn’t a HubSpot contact signs up for your referral program.</p>
		</td>
		<td rowspan="8">SaaSquatch to HubSpot</td>
		<td>First name</td>
		<td>First name</td>
	</tr>
	<tr>
		<td>Last name</td>
		<td>Last name</td>
	</tr>
	<tr>
		<td>Email</td>
		<td>Email</td>
	</tr>
	<tr>
		<td>Program referral code</td>
		<td>Referral code</td>
	</tr>
	<tr>
		<td>Program share link</td>
		<td>Share link</td>
	</tr>
	<tr>
		<td>User ID</td>
		<td>SaaSquatch user ID</td>
	</tr>
	<tr>
		<td>Account ID</td>
		<td>SaaSquatch account ID</td>
	</tr>
	<tr>
		<td>Message links</td>
		<td>Message links</td>
	</tr>
	<tr>
		<td rowspan="5">
    <p>An existing SaaSquatch (mapped or unmapped)  participant is updated</p>
		<p><b>Example:</b> An existing program participant hasn’t yet been mapped to the matching HubSpot contact.</p>
		</td>
		<td rowspan="5">SaaSquatch to HubSpot</td>
		<td>Program referral code</td>
		<td>Referral code</td>
	</tr>
	<tr>
		<td>Program share link</td>
		<td>Share link</td>
	</tr>
	<tr>
		<td>User ID</td>
		<td>SaaSquatch user ID</td>
	</tr>
	<tr>
		<td>Account ID</td>
		<td>SaaSquatch account ID</td>
	</tr>
	<tr>
		<td>Message links</td>
		<td>Message links</td>
	</tr>
  <tr>
		<td rowspan="3">
    <p>A HubSpot contact is created</p>
		<p><b>Example:</b> A new contact is added to HubSpot through your lead submission form.</p>
		</td>
		<td rowspan="3">HubSpot to SaaSquatch</td>
		<td>Referred-by code</td>
		<td>Referred-by code</td>
	</tr>
	<tr>
		<td>Referral cookie</td>
		<td>Cookie</td>
	</tr>
	<tr>
		<td>Contact ID</td>
		<td>HubSpot contact ID</td>
	</tr>
	<tr>
		<td rowspan="8">
    <p>An existing (mapped or unmapped) HubSpot contact is updated</p>
			<p><b>Example:</b> We receive a contact property change webhook.</p>
		</td>
		<td rowspan="8">HubSpot to SaaSquatch</td>
		<td>First name</td>
		<td>First name</td>
	</tr>
	<tr>
		<td>Last name</td>
		<td>Last name</td>
	</tr>
	<tr>
		<td>Email</td>
		<td>Email</td>
	</tr>
	<tr>
		<td>Email</td>
		<td>User ID</td>
	</tr>
	<tr>
		<td>Email</td>
		<td>Account ID</td>
	</tr>
	<tr>
		<td>Referred-by code</td>
		<td>Referred-by code</td>
	</tr>
	<tr>
		<td>Referral cookie</td>
		<td>Cookie</td>
	</tr>
	<tr>
		<td>Contact ID</td>
		<td>HubSpot contact ID</td>
	</tr>
</table>

<h3 id="participant-deletion">Participant deletion</h3>

When a contact is deleted in HubSpot, their mapped SaaSquatch participant will also be deleted. Please note that participant deletion in SaaSquatch is __irreversible__ and __will impact your analytics and referral history__ information. 

We support two types of participant deletion:
- Standard deletion, which allows a new participant to be created with the same email address
- GDPR-compliant deletion, which does not allow participant restoration or re-creation in SaaSquatch 

### Participant restoration
To a limited extent, restoring a HubSpot contact re-creates the mapped participant in SaaSquatch. However, the re-created participant’s profile won’t display their previous referral history and associated analytics.   

Contacts who request a GDPR-compliant, permanent deletion are never re-created in SaaSquatch. We mark any permanently deleted participants with a `do not track` label that prevents another participant from being created with this email address. 

### Mass syncs
Mass syncs are an optional way of updating SaaSquatch information in HubSpot. You can trigger a mass sync when:
- Setting up the integration
- Changing connected programs 

All participants on your tenant are updated or created in HubSpot when you run a mass sync. We follow your data sharing rules to determine the specific sync behavior. For example, if your integration is set up to create contacts when a new participant is detected, we’ll also match any existing but unmapped SaaSquatch participants during the mass sync. 

## Mapping behaviors
We don’t automatically share changes to participants’ or contacts’ personally identifying information (name and email address) between platforms. This approach helps to avoid unintentional impacts to your sales or marketing processes. 

From a program standpoint, a mapped contact and participant don't need to have matching email addresses after the initial data sync. The contact and participant will always be linked based on the SaaSquatch user ID and account ID stored on the HubSpot contact.  You can manually update the contact or participant record, but it’s not required for successful referral tracking. 

### Remapping contacts and participants
Contacts and participants can be manually remapped. We recommend doing so only in limited situations, such as if a business and personal contact need to be merged into the same participant. To map a contact with a different participant, change the user and account ID fields in HubSpot to match the participant you want to connect to.

## Program changes
> __Important:__ Only one referral program can be connected with HubSpot at a time. While you may change the connected program later, it’s best to avoid doing so unless necessary. 

The program you select acts as the source of three new contact properties: referral code, share links and message links.  When you change connected programs, we:
- Delete all of the contact properties we previously created 
- Re-create the properties using the newly-selected program

You have the option to run a mass sync when you change connected programs. The mass sync automatically updates all referral codes, share links and message links in HubSpot so that they reflect your current program. However, HubSpot forms, emails and other features that use SaaSquatch properties will need to be manually updated in order to continue working properly.

## Event handling
This integration adds a new HubSpot-managed event: `hubspot_deal_status_changed`. Its properties can be viewed in the Admin Portal under __Data > Events__. Clicking the event name takes you to the event details page, which includes a full list of the event fields.

You can adjust your program to trigger whenever we receive this event and one of the `dealProperties` matches your selected criteria. The most common use case is rewarding a referrer or referred user when the `dealProperties.dealstage` field changes to `closedwon`. 

### Deals with multiple contacts
We can only credit one contact with `dealProperties.dealstage` change. If your deal has multiple contacts, then we run three checks to determine which contact receives the event data.

- __Check 1: Is at least one contact mapped to a SaaSquatch participant?__ If no, then we don’t record any data. 
- __Check 2: Were any of the contacts referred through your program?__ If yes, then the event is added to the earliest referral. 
- __Check 3: When were the contacts created in HubSpot?__ If no contacts were referred, then the event is added to earliest contact.  

Here’s how these checks play out in two examples where a deal has three contacts: Sam, Alex and Tom. 

__Example 1:__ Sam and Alex were previously referred through your program, but Tom wasn’t. Sam was referred in 2021 and Alex was referred in 2022. In this example, check 2 passes, so we add the event to the earliest referral: Sam. Sam’s participant record receives the status change event, and Sam is rewarded by your program.

__Example 2:__ None of the contacts were previously referred through your program, but all are mapped with SaaSquatch participants. Tom was added as a contact in 2020, Sam in 2021, and Alex in 2022. In this example, check 3 passes, so we add the event to the oldest contact: Tom. Tom’s participant record receives the status change event, and Tom is rewarded by your program. 

## Ready to get started?
Check out our [setup guide](/integrations/hubspot/integrating-with-saasquatch) for more information about how to set up the integration and use it in your program. 