import React from "react";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

export const StyledLink = styled(Link)`
  display: flex !important;
  align-items: center !important;
  height: fit-content !important;
  /* Product News clicking behaviour */
  background-color: ${(props) =>
    props.clicked ? "#003B45" : "white"} !important;
  color: ${(props) => (props.clicked ? "white" : "#003B45")} !important;
  /* Drop-down menu clicking style change */
  font-weight: ${(props) =>
    props.dropdownSelected || props.clicked ? "700" : "400"};

  &:hover {
    /* Clicked hovering behaviour */
    background-color: ${(props) =>
      props.clicked ? "#003B45" : "#e7edee"} !important;
  }
`;

/* ul styles */
export const SubMenuList = styled.ul``;

export const DropdownMenuList = styled.ul`
  list-style: none !important;
  /* border-left: 1px solid #003b45 !important; */
  margin-left: 12px !important;
`;

export const NestedList = styled.ul`
  list-style: none !important;
  border-left: 1px solid #003b45 !important;
  margin-left: 12px !important;
  ${StyledLink} {
    padding: 0px 0px !important;
    width: 100%;
  }
`;

/* Different list items in order of size */
export const MainMenuLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  & > a.mm-next {
    display: none;
  }
`;

export const SubMenuLeadLi = styled.li`
  font-size: 16px;
  line-height: 24px;
  background-color: "#003B45" !important;
  color: white !important;
`;

export const DropdownParentLi = styled.li`
  font-size: 16px;
  line-height: 24px;
`;

export const DropdownChildLi = styled.li<{ clicked: boolean }>`
  font-family: "Helvetica" !important;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  color: #003b45;

  border-left: ${(props) =>
    props.clicked ? "2px solid #06966F" : "1px solid #003b45"} !important;

  ${StyledLink} {
    padding: 8px 10px;
  }
`;

export const LeadAndListSeperator = styled.li`
  height: 6px;
  border-bottom: 1px solid #e2e2e2;
`;

/* Divs for spacing within each list item (space between SVG and text) */
export const IconAndTextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const LeadIconAndTextDiv = styled.div`
  display: flex;
  gap: 8px;
`;
export const AllContentDiv = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;
`;

// @ts-ignore
export const SubMenuLeadDiv = styled(AllContentDiv)`
  gap: 8px;
`;

export const DropdownParentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

/* Seperator styled components (to seperate versions, webhooks, etc. in Dev Center section) */
export const SeperatorSpacing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 11px;
  gap: 10px;
`;

export const SeperatorText = styled.p`
  align-self: center;
  width: fit-content;
  white-space: nowrap;
  text-transform: uppercase;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  margin: 0 !important;
`;

export const SeperatorLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e2e2e2;
`;

export const ArrowDiv = styled.div`
  display: flex !important;
  justify-self: end !important;
`;

/* Referral code list items styled components (contain buttons and different layout than other list items) */
export const ReferralCodeLi = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 21px;
  padding: 8px 0;
  padding-left: 11px;
  gap: 4px;
`;

export const ButtonsContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const GreenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  background-color: #06966f;
  padding: 2px 5px;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

// @ts-ignore
export const OrangeButton = styled(GreenButton)`
  background-color: #e79533;
`;

export const GreyButton = styled(GreenButton)`
  background-color: #999999;
  text-transform: capitalize;
`;

/* SVG icon container and render function */
export const IconSVGDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: auto;
`;
export const SidebarSVGIcon: React.FC<SVGProps> = ({
  width,
  height = "auto",
  viewBox,
  d,
  clicked,
  dropdownSelected,
}) => {
  return (
    <IconSVGDiv>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill={clicked ? "white" : "#003B45"}
        transform={dropdownSelected ? "rotate(180)" : "rotate(0)"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} />
      </svg>
    </IconSVGDiv>
  );
};
export interface SVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  d?: string;
  clicked?: boolean;
  dropdownSelected?: boolean;
}
