# Pocket SaaS

This template provides a minimal setup to get started with PocketBase.

## Getting Started

Install the dependencies:

```bash
pnpm install
```

Run the frontend server:

```bash
pnpm dev
```

Run PocketBase:

```bash
pnpm pb:server
```

## How to use this template

### Pages

The pages are defined in `src/pages/` folder, you can add new pages and they will be automatically
added to the router without any manual configuration.

The router is based on [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
so check the documentation for more information.

### Menu

The menu entries are defined in `src/config/menu.ts`. You can add new entries or remove existing ones.

### UI Components

The UI components are based on Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/).
Icons are provided by https://www.radix-ui.com/icons.
