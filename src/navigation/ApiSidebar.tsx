import { Tooltip } from "components/Tooltip";
import { VersionContext } from "components/useVersion";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useSiteData } from "react-static";
import slug from "slug";
import { EndpointSummary, EndpointSummarySet } from "src/api/Types";
import styled from "styled-components";
import { ApiMenuItemView } from "./ApiMenuItemView";
import { MenuItemView, useMenuItemHook } from "./MenuItemView";
import {
  ArticleLeaf,
  DropDownMenuItem,
  GreenButton,
  GreyButton,
  MethodLeaf,
  OrangeButton,
} from "./NavigationSidebar";

export const CoreCategoryLink = styled(Link)`
  font-family: "Helvetica";
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  color: ${(props) =>
    props.clicked || props.clickedArticle ? "white" : "#003B45"} !important;
`;

export const LeafLink = styled(Link as any)<{ clicked: boolean }>`
  font-size: ${(props) => (props.isSubCategory ? "16px" : "14px")};
  line-height: ${(props) => (props.isSubCategory ? "24px" : "21px")};
  font-weight: 400;
  padding: 8px 12px;
  background-color: ${(props) => props.clicked && "#003b45"};
  margin-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "-1px" : "0px"};
  border-left: ${(props) =>
    props.clicked && !props.isSubCategory ? "2px solid #007A5B" : "0px"};
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
  }
`;

const MethodDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LabelsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const StyledLabelSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  width: fit-content;
  height: fit-content;
  padding: 2px 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

// export const MethodLeaf = (props: {
//   to: string;
//   title: string;
//   children?: React.ReactNode;
// }) => {
//   const currentPage = React.useContext(CurrentPageContext);
//   return (
//     <li>
//       <LeafLink to={props.to} clicked={currentPage === props.to}>
//         <MethodDiv>
//           {props.title}
//           <ButtonsContainerDiv>{props.children}</ButtonsContainerDiv>
//         </MethodDiv>
//       </LeafLink>
//     </li>
//   );
// };

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

function ApiMenuItem(props: { tag: string; idx: number }) {
  const { tag } = props;
  const endpoints = useEndpoints(tag);
  if (endpoints.length <= 0) {
    return null;
  }
  return (
    <ApiMenuItemView {...useMenuItemHook()}>
      <ApiSidebarChildren endpoints={endpoints} tag={tag} />
    </ApiMenuItemView>
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
    console.log({ route });
    // REMEMBER: sub this in
    const path = "/api/methods#" + route.anchor;
    return (
      // this is one list item (e.g. Account Overview, Delete an Account)
      <li key={route.anchor}>
        {/* We want:
              1. Title (summary)
              2. First button (httpMethod.toUpperCase()), e.g. "POST"
              3. Second button if it exists ("Open Endpoint") */}
        <LeafLink to={"/api/methods#" + route.anchor}>
          <MethodDiv>
            {route.summary}
            <LabelsDiv>
              <StyledLabelSpan
                className={"label docs-label-" + route.httpMethod.toLowerCase()}
              >
                {route.httpMethod.toUpperCase()}
              </StyledLabelSpan>
              {route.tags.includes("Open Endpoint") && <OpenEndpointLabel />}
            </LabelsDiv>
          </MethodDiv>
        </LeafLink>
      </li>
    );
  });
  return (
    <>
      <li>
        <LeafLink to={"/api/methods#" + slug(tag)}>{tag} Overview</LeafLink>
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
      <StyledLabelSpan
        className="label pull-right"
        style={{
          backgroundColor: "#999999",
          textTransform: "none",
        }}
      >
        Open Endpoint
      </StyledLabelSpan>
    </Tooltip>
  );
}

export default function ApiSidebar() {
  const { apiRoutes, apiRoutesByTag } = useSiteData<{
    apiRoutes: EndpointSummary[];
    apiRoutesByTag: EndpointSummarySet;
  }>();

  console.log({ apiRoutesByTag });

  return (
    <>
      {Object.keys(apiRoutesByTag)
        .filter((tag) => tag)
        .map((tag, idx) => (
          <ApiMenuItem tag={tag} idx={idx} key={tag} />
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
