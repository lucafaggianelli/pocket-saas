import { createFileRoute } from "@tanstack/react-router";

import { protectPage } from "@/lib/auth";

export const Route = createFileRoute("/protected")({
  component: () => <div>Hello /protected!</div>,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});
