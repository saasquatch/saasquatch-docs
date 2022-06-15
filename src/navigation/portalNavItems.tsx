import { MenuParentProps } from "./types/MenuParentProps";
import { dropdownCaret, graphGrowthIcon } from "./components/icons";
import { MenuItemProps } from "./types/MenuItemProps";
import { SubcategoryProps } from "./types/SubcategoryProps";

const adminPortalItems: MenuItemProps[] = [
  {
    path: "/success/using-referral-saasquatch/",
    title: "Using the SaaSquatch Portal",
  },
  {
    path: "/success/navigating-the-portal/",
    title: "Navigating the SaaSquatch Portal",
  },
  {
    path: "/success/referral-feed/",
    title: "The Referral Feed",
  },
  {
    path: "/features/analytics/",
    title: "Program Analytics",
  },
];

const growthAutoItems: MenuItemProps[] = [
  {
    path: "/growth/ga-101",
    title: "Growth Automation 101",
  },
  {
    path: "/growth/customer-lifecycle",
    title: "Growth Automation Customer Lifecycle",
  },
  {
    path: "/growth/saasquatch-ga",
    title: "SaaSquatch Growth Automation Platform",
  },
];

const referralProgramsItems: MenuItemProps[] = [
  {
    path: "/success/intro/",
    title: "Referral Programs 101",
  },
  {
    path: "/success/referral-program-optimization/",
    title: "Referral Program Optimization",
  },
  {
    path: "/success/core-topics/",
    title: "The SaaSquatch Referral Program Loop",
  },
  {
    path: "/success/touchpoints/",
    title: "Referral Marketing Channels",
  },
  {
    path: "/success/referral-program-retargeting/",
    title: "Referral Program Retargeting",
  },
  {
    path: "/success/share-options/",
    title: "Referral Program Sharing Options",
  },
];

const fraudSecurityManageItems: MenuItemProps[] = [
  {
    path: "/success/referral-security/",
    title: "Security Management System",
  },
  {
    path: "/fraud-and-security/",
    title: "Fraud, Security & Fake Referrals",
  },
];

const learningSaasquatchDropdowns: MenuParentProps[] = [
  {
    title: "SaaSquatch Admin Portal",
    parentID: "adminPortal",
    menuItems: adminPortalItems,
    svgIcon: dropdownCaret,
  },
  {
    title: "Growth Automation",
    parentID: "growthAuto",
    menuItems: growthAutoItems,
    svgIcon: dropdownCaret,
  },
  {
    title: "Referral Programs",
    parentID: "referralPrograms",
    menuItems: referralProgramsItems,
    svgIcon: dropdownCaret,
  },
  {
    title: "Fraud and Security Management",
    parentID: "fraudSecurityManage",
    menuItems: fraudSecurityManageItems,
    svgIcon: dropdownCaret,
  },
];

export const learningSaasquatchSubCategories: SubcategoryProps = {
  title: "Learning SaaSquatch",
  path: "/success/",
  svgIcon: graphGrowthIcon,
  dropdowns: learningSaasquatchDropdowns,
};
