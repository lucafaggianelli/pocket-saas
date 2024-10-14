import { createFileRoute, Outlet } from "@tanstack/react-router";

import Layout from "@/components/layout/Layout";
import { protectPage } from "@/lib/auth";

export const Route = createFileRoute("/_app")({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  beforeLoad: ({ location }) => {
    // All routes under /_app are protected
    protectPage(location);
  },
});
