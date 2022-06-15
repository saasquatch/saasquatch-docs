import { MenuItemProps } from "./MenuItemProps";
import { SVGProps } from "./SVGProps";

export interface MenuParentProps {
  title: string;
  parentID: string;
  menuItems: MenuItemProps[];
  svgIcon: SVGProps;
}
