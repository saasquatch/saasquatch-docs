import React from "react";
import { useSiteData } from "react-static";
import { HashLink as Link } from "react-router-hash-link";
import slug from "slug";

import { EndpointSummary, EndpointSummarySet } from "src/api/Types";

export default function Wrapper() {
  return (
    <React.Suspense fallback={<li>Loading...</li>}>
      <ApiSidebar />
    </React.Suspense>
  );
}

function ApiSidebar() {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();

  // return <li>Foo</li>;

  // return (
  //   <li>
  //     <pre>{JSON.stringify(apiRoutes, null, 2)}</pre>
  //   </li>
  // );
  return (
    <>
      {Object.keys(apiRoutesByTag)
      .filter(tag=>tag)
      .map((tag) => {
        return (
          <li key={tag}>
            <span>{tag}</span>
            <ul className="Vertical nav-onpage">
              <li>
                {" "}
                <Link to={"/api/methods#" + slug(tag)}>{tag} Overview</Link>
              </li>
              {apiRoutes
                .filter((route) => route.tags.includes(tag))
                .map((route) => {
                  return (
                    <li>
                      <Link to={"/api/methods#" + route.anchor}>
                        {route.summary}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      <li>
        <span>Account</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#Account">Account Overview</a>
          </li>
          <li>
            <a href="/api/methods#account_sync">
              <span className="label docs-label-post">POST</span>
              Create or Update an account
            </a>
          </li>
          <li>
            <a href="/api/methods#get_account">
              <span className="label docs-label-get">GET</span>
              Lookup an account
            </a>
          </li>
          <li>
            <a href="/api/methods#open_delete_account">
              <span className="label docs-label-delete">DELETE</span>
              Delete an account
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>User</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#User">User Overview</a>
          </li>
          <li>
            <a href="/api/methods#create_user">
              <span className="label docs-label-post">POST</span>
              Create or Update a User
            </a>
          </li>

          <li>
            <a href="/api/methods#get_user_by_referralcode">
              <span className="label docs-label-get">GET</span>
              Lookup a user by Referral Code
            </a>
          </li>

          <li>
            <a href="/api/methods#get_user">
              <span className="label docs-label-get">GET</span>
              Lookup a user
            </a>
          </li>

          <li>
            <a href="/api/methods#get_user_pii">
              <span className="label docs-label-get">GET</span>
              Lookup a user PII
            </a>
          </li>

          <li>
            <a href="/api/methods#get_sharelinks">
              <span className="label docs-label-get">GET</span>
              Lookup a user&#39;s share links
            </a>
          </li>

          <li>
            <a href="/api/methods#get_shareurls">
              <span className="label docs-label-get">GET</span>
              Lookup a user&#39;s share URLs
            </a>
          </li>

          <li>
            <a href="/api/methods#block_user">
              <span className="label docs-label-post">POST</span>
              Block user
            </a>
          </li>

          <li>
            <a href="/api/methods#unblock_user">
              <span className="label docs-label-post">POST</span>
              Unblock user
            </a>
          </li>

          <li>
            <a href="/api/methods#list_users">
              <span className="label docs-label-get">GET</span>
              List users
            </a>
          </li>

          <li>
            <a href="/api/methods#open_user_upsert">
              <span className="label docs-label-put">PUT</span>
              User Upsert
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_create_user">
              <span className="label docs-label-post">POST</span>
              Create a user and account
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_user">
              <span className="label docs-label-get">GET</span>
              Lookup a user
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_delete_user">
              <span className="label docs-label-delete">DELETE</span>
              Delete a user
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_shareurls">
              <span className="label docs-label-get">GET</span>
              Lookup a user&#39;s share URLs
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#create_cookie_user">
              <span className="label docs-label-put">PUT</span>
              Create Cookie User
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_user_by_code">
              <span className="label docs-label-get">GET</span>
              Get a user by a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>User Event</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#User">User Event Overview</a>
          </li>
          <li>
            <a href="/api/methods#trackEvent">
              <span className="label docs-label-post">POST</span>
              Track User Event
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Open Endpoint</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#trackEvent">
              <span className="label docs-label-post">POST</span>
              Track User Event
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_user_upsert">
              <span className="label docs-label-put">PUT</span>
              User Upsert
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_create_user">
              <span className="label docs-label-post">POST</span>
              Create a user and account
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_user">
              <span className="label docs-label-get">GET</span>
              Lookup a user
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_delete_user">
              <span className="label docs-label-delete">DELETE</span>
              Delete a user
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_shareurls">
              <span className="label docs-label-get">GET</span>
              Lookup a user&#39;s share URLs
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#create_cookie_user">
              <span className="label docs-label-put">PUT</span>
              Create Cookie User
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_get_user_by_code">
              <span className="label docs-label-get">GET</span>
              Get a user by a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_validate_code">
              <span className="label docs-label-get">GET</span>
              Lookup a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_apply_code">
              <span className="label docs-label-post">POST</span>
              Apply a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_list_referrals">
              <span className="label docs-label-get">GET</span>
              List referrals
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_delete_account">
              <span className="label docs-label-delete">DELETE</span>
              Delete an account
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Referral Code</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#get_code">
              <span className="label docs-label-get">GET</span>
              Lookup a referral code
            </a>
          </li>

          <li>
            <a href="/api/methods#open_validate_code">
              <span className="label docs-label-get">GET</span>
              Lookup a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>

          <li>
            <a href="/api/methods#open_apply_code">
              <span className="label docs-label-post">POST</span>
              Apply a referral code
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Referral</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#list_referrals">
              <span className="label docs-label-get">GET</span>
              List referrals
            </a>
          </li>

          <li>
            <a href="/api/methods#get_referral">
              <span className="label docs-label-get">GET</span>
              Lookup a Referral
            </a>
          </li>

          <li>
            <a href="/api/methods#moderate_referrals">
              <span className="label docs-label-post">POST</span>
              Moderate referrals
            </a>
          </li>

          <li>
            <a href="/api/methods#open_list_referrals">
              <span className="label docs-label-get">GET</span>
              List referrals
              <span className="label pull-right">Open Endpoint</span>
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Reward Balance</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#list_balances">
              <span className="label docs-label-get">GET</span>
              List reward balances
            </a>
          </li>

          <li>
            <a href="/api/methods#debit_balance">
              <span className="label docs-label-post">POST</span>
              Debit a reward balance
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Reward</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#list_rewards">
              <span className="label docs-label-get">GET</span>
              List an account&#39;s rewards
            </a>
          </li>

          <li>
            <a href="/api/methods#lookup_reward">
              <span className="label docs-label-get">GET</span>
              Lookup a single reward
            </a>
          </li>

          <li>
            <a href="/api/methods#debit_reward">
              <span className="label docs-label-post">POST</span>
              Redeem a single reward
            </a>
          </li>

          <li>
            <a href="/api/methods#cancel_reward">
              <span className="label docs-label-post">POST</span>
              Cancel a single reward
            </a>
          </li>

          <li>
            <a href="/api/methods#create_reward">
              <span className="label docs-label-post">POST</span>
              Create a single reward
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Webhook</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#create_webhook">
              <span className="label docs-label-post">POST</span>
              Create a webhook subscription
            </a>
          </li>

          <li>
            <a href="/api/methods#list_webhooks">
              <span className="label docs-label-get">GET</span>
              List webhook subscriptions
            </a>
          </li>

          <li>
            <a href="/api/methods#delete_webhook">
              <span className="label docs-label-delete">DELETE</span>
              Delete a webhook subscription
            </a>
          </li>

          <li>
            <a href="/api/methods#test_webhook">
              <span className="label docs-label-post">POST</span>
              Test a webhook subscription
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Export</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#create_export">
              <span className="label docs-label-post">POST</span>
              Create an Export
            </a>
          </li>

          <li>
            <a href="/api/methods#get_export">
              <span className="label docs-label-get">GET</span>
              Lookup an Export
            </a>
          </li>

          <li>
            <a href="/api/methods#download_export">
              <span className="label docs-label-get">GET</span>
              Download an Export
            </a>
          </li>

          <li>
            <a href="/api/methods#list_exports">
              <span className="label docs-label-get">GET</span>
              List Exports
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Theme</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#lookup_variables_schema">
              <span className="label docs-label-get">GET</span>
              Lookup variables schema
            </a>
          </li>

          <li>
            <a href="/api/methods#lookup_variables">
              <span className="label docs-label-get">GET</span>
              Lookup Default Variables Values
            </a>
          </li>

          <li>
            <a href="/api/methods#replace_variables">
              <span className="label docs-label-put">PUT</span>
              Replace Default Variable Values
            </a>
          </li>

          <li>
            <a href="/api/methods#update_variables">
              <span className="label docs-label-patch">PATCH</span>
              Update Default Variable Values
            </a>
          </li>

          <li>
            <a href="/api/methods#lookup_locale_variables">
              <span className="label docs-label-get">GET</span>
              Lookup Localized Variables Values
            </a>
          </li>

          <li>
            <a href="/api/methods#replace_locale_variables">
              <span className="label docs-label-put">PUT</span>
              Replace Localized Variable Values
            </a>
          </li>

          <li>
            <a href="/api/methods#update_locale_variables">
              <span className="label docs-label-patch">PATCH</span>
              Update Localized Variable Values
            </a>
          </li>

          <li>
            <a href="/api/methods#delete_locale_variables">
              <span className="label docs-label-delete">DELETE</span>
              Delete Localized Variable Values
            </a>
          </li>

          <li>
            <a href="/api/methods#preview_theme_email">
              <span className="label docs-label-post">POST</span>
              Preview Theme Email
            </a>
          </li>
        </ul>
      </li>

      <li>
        <span>Discount</span>
        <ul className="Vertical nav-onpage">
          <li>
            <a href="/api/methods#get_coupon">
              <span className="label docs-label-get">GET</span>
              Lookup a discount code
            </a>
          </li>

          <li>
            <a href="/api/methods#set_coupon">
              <span className="label docs-label-post">POST</span>
              Set discount code on an account
            </a>
          </li>

          <li>
            <a href="/api/methods#get_account_reward">
              <span className="label docs-label-get">GET</span>
              Lookup an account discount
            </a>
          </li>
        </ul>
      </li>
    </>
  );
}
