import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRightIcon, GearIcon, RocketIcon } from "@radix-ui/react-icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MENU_ENTRIES } from "@/config/menu";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";

const MainNavigation: React.FC = () => {
  const { resolvedLocation } = useRouterState();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            to="/"
            className={cn(
              "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            )}
          >
            <RocketIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Pocket SaaS</span>
          </Link>

          {MENU_ENTRIES.map((entry) => (
            <Tooltip key={entry.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={entry.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    resolvedLocation.href === entry.href &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  <entry.icon className="h-5 w-5" />
                  <span className="sr-only">{entry.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{entry.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <GearIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <UserMenu />
        </nav>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <ChevronRightIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <RocketIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Pocket SaaS</span>
              </Link>
              {MENU_ENTRIES.map((entry) => (
                <Link
                  key={entry.href}
                  to={entry.href}
                  className={cn(
                    "flex items-center gap-4 px-2.5 hover:text-foreground",
                    resolvedLocation.href === entry.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <entry.icon className="h-5 w-5" />
                  {entry.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};

export default MainNavigation;
