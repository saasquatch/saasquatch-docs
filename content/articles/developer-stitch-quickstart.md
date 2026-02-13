---
title: Stitch Integration Quickstart
highlights: How to get started syncing your SaaSquatch program data to a Data Warehouse using Stitch.
slug: developer/stitch/quickstart
sectionType: guide
template: hasTableOfContents.html
date: 2023-03-20
---

>**Please Note:** The Stitch integration with SaaSquatch can be configured on a per-tenant basis. Your programs contain a separate [Live and Test tenant](/success/using-referral-saasquatch/#test-vs-live), and each can be connected to Stitch independently. Additional details about when to use your Test vs. Live tenant can be found in our article on [testing best practices](/developer/testing/).

### Add the SaaSquatch Integration

<div class="row-fluid">
  <div class="span12">
     <h4>1. Retrieve SaaSquatch Program Info</h4>
    <p>From the <a href="http://app.referralsaasquatch.com">SaaSquatch Admin Portal</a> navigate to <b>Settings > General</b>. Make note of the tenant alias and API key on this page.</p>
  </div>
</div>
<div class="row-fluid">
  <div class="span12">
    <h4>2. Open Stitch Account</h4>
    <p>Navigate to the <a href="https://www.stitchdata.com/">Stitch website</a> and create an account if you don&#39;t already have one.</p>
  </div>
  <div class="span4">
  </div>
</div>
<div class="row-fluid">
  <div class="span6">
    <h4>3. Add SaaSquatch Integration</h4>
    <p>Search for, and select, the SaaSquatch integration to add to your Stitch account.</p>
  </div>
  <div class="span6">

</a>
  </div>

  </div>
</div>
<div class="row-fluid">
  <div class="span6">
    <h4>4. Configure your Referral SaaSquatch Integration</h4>
  </div>
  <div class="span6">

  </div>
</div>

<div class="row-fluid">
  <div >

  <table class="table">
    <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td><strong>Integration Name</strong></td>
        <td>A name to give to this Stitch Data Source</td>
        <td><code>SaaSquatch Live Tenant</code></td>
    </tr>
    <tr>
        <td><strong>Tenant alias</strong></td>
        <td>The identifying value for the SaaSquatch tenant you're using</td>
        <td><code>test_bpinhag9gag</code></td>
    </tr>
    <tr>
        <td><strong>API Key</strong></td>
        <td>The API key for your SaaSquatch tenant, found on the <strong>General</strong> page under the <strong>Settings</strong> section</td>
        <td><code>TEST_AGFVazAMTsxti2S8s9ZxxIe0GYcMV0F5</code></td>
    </tr>
    <tr>
        <td><strong>Sync Historical Data</strong></td>
        <td>Default is to sync one year of historical SaaSquatch program data. This can be modified to a custom data value.</td>
        <td><code>17/03/2017</code></td>
    </tr>
    <tr>
        <td><strong>Replication Frequency</strong></td>
        <td>How often Stitch will attempt to replicate data from your SaaSquatch program. The default value is every half hour.</td>
        <td>Every 6 hours</td>
    </tr>

</table>

</div>
</div>
</div>

Congratulations, your SaaSquatch program is now successfully connected to Stitch! Your SaaSquatch data is now ready to be synced into the data destination of your choice.

### Data Destination
To begin importing your SaaSquatch data make sure that you have configured a data warehouse as your [Stitch data destination](https://www.stitchdata.com/docs/destinations/choosing-a-stitch-destination).

Stitch provides support for, among others, Amazon Redshift, Google BigQuery, and Postgres. 

#### Already have a Data Destination configured?
That's great! You are all set! Your SaaSquatch data will be available to be synced into the data destination you have already configured in your Stitch account.

#### New to Stitch?
Are you just getting started with Stitch? Not a problem, you can easily setup a free data warehouse as a Stitch data destination to get started.

The easiest data destination to get started with is Panoply. With just a few clicks you can have a Panoply account configured directly through Stitch. This will automatically provision a new Amazon Redshift data warehouse for you to use. Follow [Stitch's guide](https://www.stitchdata.com/docs/destinations/panoply/connecting-a-new-panoply-data-warehouse-to-stitch) to get setup with your free Panoply account.

Once your data destination is setup Stitch will begin importing your SaaSquatch program data at the cadence you configured in the SaaSquatch integration setup.

### Additional Resources
> - See [Choosing a Destination](https://www.stitchdata.com/docs/destinations/choosing-a-stitch-destination) to learn more about connecting your Stitch account to a Data Warehouse.
>
> - See the [Stitch + Saasquatch guide](https://www.stitchdata.com/docs/integrations/saas/referral-saasquatch) for connecting your SaaSuqatch Program to your Stitch account.
>
>- Further [technical details](https://www.stitchdata.com/docs/integrations/saas/referral-saasquatch#schema) about the data that Stitch syncs across from SaaSquatch is also available.
