import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </TooltipProvider>
  ),
});
