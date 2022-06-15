import { MenuParentProps } from "./MenuParentProps";
import { SVGProps } from "./SVGProps";

export interface SubcategoryProps {
  title: string;
  path: string;
  svgIcon: SVGProps;
  dropdowns: MenuParentProps[];
}
