---
title: Managing Microsite Registration Form Submissions
highlights: When participants register for your SaaSquatch microsite, send the information to Salesforce to keep track of potential leads and inform targeted email campaigns.
slug: building-programs/microsites/registration-forms
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-02-07
robotsTag:
  - FOLLOW
---

## Overview

When participants register for your program through your microsite, we collect and store their registration data in the SaaSquatch Admin Portall. You can view the collected data under __Data > Forms__ and use it to perform different actions, like:
- Creating or updating a lead or contacct in Salesforce, if you have this integration set up
- Notifying a [team member](/learning-saasquatch/admin-portal/team-member-roles) when someone signs up through your microsite
- Adding newly-registered participants to a specific [user segment](/features/user-segmentation/)

This guide shows you how to set up an action that sends data submitted to your form directly to Salesforce, using the example of creating a Lead. We also cover how to set rules about submission handling and view all submissions to your form. 

## Creating a Salesforce lead from registration form data 

> __Before you begin__: You'll need an existing microsite and an active Salesforce integration to continue with this process. If you're not sure whether your organization has a Salesforce integration set up, then check the __Settings__ page for integration information.

<ol> 
	<li> Open your forms settings.
		<ol> 
			<li> Sign in to the SaaSquatch Admin Portal. </li>
			<li> Go to <strong>Data > Forms </strong>. This page displays a list of all forms you've created in this tenant, including the microsite registration form. </li>
			<li> Open the <img src="/assets/images/contentful/More_menu_2E83V00eBHdtuTlxNuzovQ.png"> More menu for the Microsite Registration form. </li>
			<li> Click <strong>Edit</strong> to open the Update Form page. </li>
		</ol>
	</li>
<details> 
<summary> Troubleshooting: The list of forms doesn't include a Microsite Registration form</summary>
  Make sure that:
  <ul>
    <li>You have <a href="/building-programs/microsites/microsites-overview">created a microsite</a> on this tenant.</li>
    <li>Your microsite has a registration page. If it doesn't, then you'll need to <a href="/building-programs/microsites/customizing-microsites#create-a-new-layout-or-page">add a new page</a> and apply the Registration Page template.
    </li>
  </ul>
</details> 
	<li> Start a new lead submission action.
		<ol>
			<li> Click the pencil icon under the <strong>Submit actions</strong> heading.</li>
			<li> Click <strong> + Add Action</strong>. </li>
			<li> Select the <strong>Lead submit</strong> action type. </li>
		</ol>
	</li>
	<li> Create a filter under <strong>Filter records</strong> to help our system identify whether a matching Lead or Contact already exists in Salesforce. If we do find a matching record, we'll update it instead of creating a duplicate Lead.
		<ol>
			<li>Enter the name of the Salesforce field in the <strong>Field</strong> box.</li>
			<li>Enter the name of the SaaSquatch field in the <strong>Equals</strong> box. All SaaSquatch fields start with <code>data.</code> (including the period).</li>
		</ol>
    <details><summary>Example</summary> To filter records in Salesforce by email, enter <code>Email</code> in the <strong>Field</strong> box and <code>data.email</code> in the <strong>Equals</strong> box. This will map the email from your form submission to the Email field on Salesforce objects for filtering.</details>
	</li>
	<li>Under <strong>Create or update a Lead</strong>, map your Salesforce and SaaSquatch data fields to decide which information SaaSquatch sends to Salesforce.
		<ol>
			<li>Enter the name of the Salesforce field in the <strong>Field</strong> box.</li>
			<li>Enter the name of the SaaSquatch field in the <strong>Value</strong> box. All SaaSquatch fields start with <code>data.</code> (including the period).</li>
		</ol>
    <details><summary>Example</summary> To send the participant's email address to Salesforce, enter <code>Email</code> in the <strong>Field</strong> box and <code>data.email</code> in the <strong>Value</strong> box. This will map the email field from your form to the Email field in Salesforce.</details>
	</li>
	<li>Under <strong>Update a Contact</strong>, map your Salesforce and SaaSquatch fields so that we know what to update in Salesforce when we find a matching record.
		<ol>
			<li>Enter the name of the Salesforce field in the <strong>Field</strong> box.</li>
			<li>Enter the name of the SaaSquatch field in the <strong>Equals</strong> box. All SaaSquatch fields start with <code>data.</code> (including the period).</li>
		</ol>
    <details><summary>Example</summary> To update the participant's email address in Salesforce, enter <code>Email</code> in the <strong>Field</strong> box and <code>data.email</code> in the <strong>Value</strong> box.</details>
	</li>
	<li>Click <strong>+ Add Action</strong> if you want to do anything else with the data.</li>
	<li>Click <strong>Save</strong>.</li>
	<li>Click <strong>Update</strong> at the bottom of the page to save your changes.</li>
</ol>

## Setting submission handling rules

You can set submission handling rules for your form so that someone on your team is notified whenever there’s a new submission attempt. This can be useful if you want to track when you receive new participants, or get notified when someone attempted to register but the submission failed.

You also have the option to automatically add or remove newly-updated participants from a specific user segment, e.g., "Affiliates," "Leads," or another category.

The steps below are optional.

<ol> 
	<li> Open your forms settings.
		<ol> 
			<li> Sign in to the SaaSquatch Admin Portal. </li>
			<li> Go to <strong>Data > Forms </strong>. This page displays a list of all forms you've created in this tenant, including the microsite registration form. </li>
			<li> Open the <img src="/assets/images/contentful/More_menu_2E83V00eBHdtuTlxNuzovQ.png"> More menu for the Microsite Registration form. </li>
			<li> Click <strong>Edit</strong> to open the Update Form page. </li>
		</ol>
	</li>
	<li> Choose who receives an email when:
		<ul>
			<li>Someone signs up successfully</li>
			<li>An attempted submission fails</li>
		</ul>
	</li>
	<li>Choose the user segment (if any) that the participant should be added to after registering.</li>
	<li>(Advanced) Map user upsert fields, if you want participant fields to be set to specific values or static data during registration.
		<ul>
			<li><strong>Note</strong> You’ll need to write a JSONata expression to do user upsert field mapping.</li>
		</ul>
	</li>
</ol>

## Viewing submissions to your form

You can see the details of all attempted submissions on the __Forms__ page. Each individual submission will show a status of either `Success` or `Failed`. We recommend consulting this page if you need to troubleshoot why a submission to the form failed, or why one of your submission actions didn’t go through to Salesforce as intended.

<ol>
	<li> Sign in to the SaaSquatch Admin Portal. </li>
	<li> Go to <strong>Data > Forms </strong>.</li>
	<li> Click <strong>View Submissions</strong>.</li>
	<li> Open the <img src="/assets/images/contentful/More_menu_2E83V00eBHdtuTlxNuzovQ.png"> More menu for the Microsite Registration form.</li>
	<li> Click <strong>View Details</strong>.</li>
	<li> Review the <strong>Actions</strong> to see the history of events for this submission. 
		<ul>
			<li> <strong>Note:</strong> If you have set up a submission action to send the registration information to Salesforce, then the Actions history shows details about how Salesforce handled the data. </li>
		</ul>
	</li>
</ol>
