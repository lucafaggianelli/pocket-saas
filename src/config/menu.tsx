import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type { LinkProps } from "@tanstack/react-router";

export interface MenuEntry {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: LinkProps["to"];
}

export const MENU_ENTRIES: MenuEntry[] = [];
