import { createLazyFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout>
      <h1 className="mb-16 text-center bg-gradient-to-b from-pink-900 via-pink-800 to-pink-400 bg-clip-text text-transparent text-5xl font-extrabold">
        Welcome to Pocket SaaS
      </h1>
    </Layout>
  );
}
