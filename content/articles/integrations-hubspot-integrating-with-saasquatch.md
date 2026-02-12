---
title: Integrating SaaSquatch with HubSpot
slug: integrations/hubspot/integrating-with-saasquatch
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-07-25
seoDescription: SaaSquatch’s HubSpot integration allows you to automatically track referrals across both platforms. Integrating with HubSpot also lets you reward referrers and referred users when deals change status. This guide walks you through the steps to get the integration up running and to use it effectively in your SaaSquatch referral program. 
robotsTag:
  - FOLLOW
---

> __Important:__ This feature is only available for the current version of the SaaSquatch platform. If your program was created before April 2019 and you're interested in this feature, reach out to our [Success team](mailto:success@saasquatch.com) to chat about upgrading. 

Our native integration with HubSpot automatically shares data between SaaSquatch and your HubSpot Sales and Marketing Hubs. After set-up, HubSpot will be able to send referral tracking, contacts and deal stage information directly to SaaSquatch. Important SaaSquatch information like referral codes, share links, and more will be visible on contact records. You can also set up a HubSpot lead capture form that [sends referral data](/integrations/hubspot/sending-data-from-hubspot-forms) to SaaSquatch. 

This guide covers:
1. Connecting SaaSquatch to HubSpot.
2. Setting up the HubSpot integration.
3. Syncing HubSpot data to SaaSquatch. 
4. Using HubSpot data to trigger rewards or other goals and actions. This is optional, but recommended to help you get the most out of the integration’s capabilities.
5. Testing the integration in your test tenant. 

> Before starting, make sure that you have the following platform permissions:
> 
> SaaSquatch Full Access team member • HubSpot Super Admin

## 1. Connect SaaSquatch to HubSpot
Enable the HubSpot integration to get started.

1. Sign in to the SaaSquatch Admin Portal.
2. From the tenant selection dropdown, choose your live or test tenant.
    - __Tip__: We recommend setting up all integrations in your test tenant first. Once you’ve confirmed that your program rules are correctly triggered by the integration, repeat the setup process in your live tenant. 
3. From the top navigation menu, go to __Settings > Integrations__.
4. Find the HubSpot card and click __Connect to HubSpot__.
5. Sign in with your HubSpot credentials.

## 2. Set up the integration
Next, connect a SaaSquatch referral program with HubSpot and pick your data sharing rules. 

> __Important:__ HubSpot can only integrate with one referral program at a time. We use this program as the source of information when creating these new contact properties in HubSpot: 
> 
> Referral code • Share link • Message links • Referred-by code • SaaSquatch user and account ID • Referral cookie

<ol>
	<li> Pick a SaaSquatch program to connect to HubSpot.</li>
	<li> Choose your contact and participant data sharing rules. By default, creating a contact in HubSpot creates a participant in SaaSquatch. 
		<ul>
			<li> <b>Note:</b> There are also a few <a href="/integrations/hubspot/integration-behaviours/#sharing-rules">non-adjustable data sharing rules</a> listed in the setup flow. You can return to view these at any time after setup. </li>
		</ul>
	</li>
</ol>

<table class="table table-hover">
	<tr>
		<th>Action</th>
		<th>When</th>
	</tr>
	<tr>
		<td> Create a contact in HubSpot</td>
		<td> 
			<ul>
				<li> A participant is created </li>
				<li> An existing, unmapped participant is updated</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td> Create a new participant in SaaSquatch </td>
		<td> 
			<ul>
				<li>A contact is created</li>
				<li>An existing, unmapped contact is updated</li>
			</ul>
		</td>
	</tr>
</table>

<ol start="3">
	<li>Update the contact record layout in HubSpot to show participants' SaaSquatch data.</li>
	<li>Review your selections and choose whether to sync all SaaSquatch participant data to HubSpot after setup.
		<ul>
			<li> <b>Note:</b> The initial data sync does not transfer your HubSpot contact records to SaaSquatch. If you’d like to import them after setting up the integration, then follow <a href="/integrations/hubspot/integrating-with-saasquatch#3-sync-hubspot-data-optional-">step 3: Sync HubSpot data</a>.</li>
		</ul>
	</li>
	<li>Click <b>Finish setup</b>.</li>
</ol> 

## 3. Sync HubSpot data (optional)

A bulk import is required to sync HubSpot contact data with SaaSquatch after the integration has been set up. We recommend a bulk import if you are new to SaaSquatch and want to set up your HubSpot contacts as participants.  If you skip this step, then we’ll gradually sync your contacts and participants over time, in alignment with your data sharing rules. 

1. Export your contacts from HubSpot as a .CSV file.
2. Adjust the .CSV file to match SaaSquatch’s accepted bulk import format. Our [bulk user import doc](/guides/user-import/#upload-format-recommendations) has an example .CSV file and more details about the bulk import process. 
    - __Tip:__ Make sure that the name of the email column in the import file is `email`. We use this field to map contacts with participants.
3. In SaaSquatch, go to __Participants__ and select __Import users__.
4. Upload the .CSV file.

To avoid errors, please double check the .CSV file you’ve prepared to make sure it follows the accepted import format. If you have questions about the acceptable format, then reach out to our [Support team](mailto:support@saasquatch.com). 

## 4. Use HubSpot data to trigger rewards or other goals and actions
Congrats! Your HubSpot integration is set up and ready to use. To get the most out of the integration, we recommend updating your program to perform actions, like rewarding referrers, based on the event data HubSpot sends to SaaSquatch. 

As an example, this is one method of setting up a program rule that rewards the referrer and referred user when a deal status changes to Closed Won. Please note that the best way to incorporate HubSpot data into your program depends on your specific implementation. 

1. Create a program goal that triggers when a Referred user performs an action.
2. For the event key, choose `hubspot_deal_status_changed`.
3. Update the goal criteria.
    1. Set the first condition to __First time__ so that the referrer and referred user are only rewarded the first time this person is referred. 
    2. Add a condition that triggers the goal when the `fields.properties.stage` equals `closedwon`. 
4. Set up your goal actions as usual. 

## 5. Test the integration (recommended)
If you set up the integration in your test tenant, then we recommend making sure that data sharing, referral tracking and program triggers work as intended. Testing steps vary based on the sharing rules you adjusted and your general program setup. 

<table class="table table-hover">
  <tr>
    <th style="width:50%">Test</th>
    <th style="width:50%">Confirms that</th>
  </tr>
  <tr>
    <td><p> Create four new SaaSquatch participants</p>
      <p><b>Use if:</b> Your sharing rules create contacts in HubSpot</p>
    </td>
    <td><ul><li>HubSpot contacts are correctly created or updated</li>
      <li>SaaSquatch properties sync to HubSpot</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><p>Create four new HubSpot contacts</p>
      <p><b>Use if:</b> Your sharing rules create new participants in SaaSquatch</p>
    </td>
    <td>SaaSquatch participants map to HubSpot contacts</td>
  </tr>
  <tr>
    <td><p>In SaaSquatch, manually connect referrals between two of your test participants</p>
      <p><b>Note</b>: Use the participants who weren’t connected by a referral in HubSpot</p>
    </td>
    <td>Referral tracking information is correctly shared with HubSpot</td>
  </tr>
  <tr>
    <td><p>In HubSpot, manually connect referrals between two of your test contacts</p>
      <p><b>Note:</b> Use the contacts who weren’t connected by a referral in SaaSquatch</p>
    </td>
    <td> Referral tracking information is correctly shared with SaaSquatch</td>
  </tr>
  <tr>
    <td><p>Create a deal with one of the new HubSpot contacts and change its status to <b>Closed Won</b>.</p>
      <p><b>Use if:</b> You set up your program rules to perform an action when a deal’s status changes. If you used another status than <b>Closed Won</b>, test with that. </p>
    </td>
    <td>Program rules trigger correctly when a deal’s status changes</td>
  </tr>
  </table>