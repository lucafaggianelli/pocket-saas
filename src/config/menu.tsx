import { LockClosedIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { LinkProps } from "@tanstack/react-router";

export interface MenuEntry {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: LinkProps["to"];
}

export const MENU_ENTRIES: MenuEntry[] = [
  {
    label: "Protected",
    href: "/protected",
    icon: LockClosedIcon,
  },
];
