import { createLazyFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout>
      <h1 className="text-center bg-gradient-to-b from-zinc-800 to-zinc-500 bg-clip-text text-transparent text-5xl font-extrabold">
        Welcome to Pocket SaaS
      </h1>
    </Layout>
  );
}
