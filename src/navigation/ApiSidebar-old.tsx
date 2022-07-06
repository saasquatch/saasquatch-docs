import { Tooltip } from "components/Tooltip";
import { VersionContext } from "components/useVersion";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useSiteData } from "react-static";
import slug from "slug";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import { MenuItemView, useMenuItemHook } from "./MenuItemView";
import {
  ArticleLeaf,
  DropDownMenuItem,
  GreenButton,
  GreyButton,
  MethodLeaf,
  OrangeButton,
} from "./NavigationSidebar";

function useEndpoints(tag: string) {
  const { apiRoutes } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();
  const { showTags } = VersionContext.useContainer();
  const endpoints = apiRoutes
    .filter((route) => route.tags.includes(tag))
    .filter((route) => showTags(route.tags));
  return endpoints;
}

function MenuItem(props: { tag: string; idx: number }) {
  const { tag } = props;
  const endpoints = useEndpoints(tag);
  if (endpoints.length <= 0) {
    return null;
  }
  return (
    <MenuItemView {...useMenuItemHook()}>
      <ApiSidebarChildren endpoints={endpoints} tag={tag} />
    </MenuItemView>
  );
}

function ApiSidebarChildren({
  endpoints,
  tag,
}: {
  endpoints: EndpointSummary[];
  tag: string;
}) {
  const children = endpoints.map((route) => {
    return (
      <li key={route.anchor}>
        <Link to={"/api/methods#" + route.anchor}>
          <span
            className={"label docs-label-" + route.httpMethod.toLowerCase()}
            style={{
              width: "47px",
              textAlign: "center",
            }}
          >
            {route.httpMethod.toUpperCase()}
          </span>{" "}
          {route.summary}
          {route.tags.includes("Open Endpoint") && <OpenEndpointLabel />}
        </Link>
      </li>
    );
  });
  return (
    <>
      <li>
        <Link to={"/api/methods#" + slug(tag)}>{tag} Overview</Link>
      </li>
      {children}
    </>
  );
}

function OpenEndpointLabel() {
  return (
    <Tooltip
      content={
        <span>
          Open Endpoints are optimized for Mobile or Browser, don't require a
          server-side call from an API key
        </span>
      }
      placement="right"
    >
      <span className="label pull-right">Open Endpoint</span>
    </Tooltip>
  );
}

export default function ApiSidebar() {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();

  return (
    <>
      {Object.keys(apiRoutesByTag)
        .filter((tag) => tag)
        .map((tag, idx) => (
          <MenuItem tag={tag} idx={idx} key={tag} />
        ))}
    </>
  );
}

// export default function ApiSidebar() {
//   return (
//     <div>
//       <ArticleLeaf to="/api/methods" title="Full list of Methods" />

//       <DropDownMenuItem title="Account" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#Account" title="Account Overview" />
//         <MethodLeaf
//           to="/api/methods#open_delete_account"
//           title="Delete an account"
//         >
//           <GreyButton>DELETE</GreyButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="User" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#User" title="User Overview" />
//         <MethodLeaf to="/api/methods#get_user_pii" title="Lookup a user PII">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#block_user" title="Block user">
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#unblock_user" title="Unblock user">
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#list_users" title="List users">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#open_user_upsert" title="User Upsert">
//           <OrangeButton>put</OrangeButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_create_user"
//           title="Create a user and account"
//         >
//           <OrangeButton>post</OrangeButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#open_get_user" title="Lookup a user">
//           <GreenButton>get</GreenButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#open_delete_user" title="Delete a user">
//           <GreyButton>DELETE</GreyButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#create_cookie_user"
//           title="Create Cookie User"
//         >
//           <OrangeButton>put</OrangeButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_get_user_by_code"
//           title="Get a user by a referral code"
//         >
//           <GreenButton>get</GreenButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="User Event" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#User-Event" title="User Event Overview" />
//         <MethodLeaf to="/api/methods#trackEvent" title="Track User Event">
//           <OrangeButton>post</OrangeButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Share Links" isNestedDropDown>
//         <ArticleLeaf
//           to="/api/methods#Share-Links"
//           title="Share Links Overview"
//         />
//         <MethodLeaf
//           to="/api/methods#get_shareurls"
//           title="Lookup a user's share URLs"
//         >
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_get_shareurls"
//           title="Lookup a user's share URLs"
//         >
//           <GreenButton>get</GreenButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Referral Code" isNestedDropDown>
//         <ArticleLeaf
//           to="/api/methods#Referral-Code"
//           title="Referral Code Overview"
//         />
//         <MethodLeaf to="/api/methods#get_code" title="Lookup a referral code">
//           <GreenButton>Get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_validate_code"
//           title="Lookup a referral code"
//         >
//           <GreenButton>Get</GreenButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_apply_code"
//           title="Apply a referral code"
//         >
//           <OrangeButton>Post</OrangeButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Referral" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#Referral" title="Referral Overview" />
//         <MethodLeaf to="/api/methods#list_referrals" title="List referrals">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#get_referral" title="Lookup a Referral">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#open_list_referrals"
//           title="List referrals"
//         >
//           <GreenButton>get</GreenButton>
//           <GreyButton>Open Endpoint</GreyButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Reward Balance" isNestedDropDown>
//         <ArticleLeaf
//           to="/api/methods#Reward-Balance"
//           title="Reward Balance Overview"
//         />
//         <MethodLeaf
//           to="/api/methods#list_balances"
//           title="List reward balances"
//         >
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#debit_balance"
//           title="Debit a reward balance"
//         >
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Reward" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#Reward" title="Reward Overview" />
//         <MethodLeaf
//           to="/api/methods#list_rewards"
//           title="List an account's rewards"
//         >
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#lookup_reward"
//           title="Lookup a single reward"
//         >
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#debit_reward"
//           title="Redeem a single reward"
//         >
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#cancel_reward"
//           title="Cancel a single reward"
//         >
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#create_reward"
//           title="Create a single reward"
//         >
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//       </DropDownMenuItem>

//       <DropDownMenuItem title="Export" isNestedDropDown>
//         <ArticleLeaf to="/api/methods#Export" title="Export Overview" />
//         <MethodLeaf to="/api/methods#create_export" title="Create an Export">
//           <OrangeButton>post</OrangeButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#get_export" title="Lookup an Export">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf
//           to="/api/methods#download_export"
//           title="Download an Export"
//         >
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//         <MethodLeaf to="/api/methods#list_exports" title="List Exports">
//           <GreenButton>get</GreenButton>
//         </MethodLeaf>
//       </DropDownMenuItem>
//       <ArticleLeaf to="/api/methods#hidden" title="Hidden Endpoints" />
//     </div>
//   );
// }
