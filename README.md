# Pocket SaaS

This template provides a minimal setup to get started with PocketBase.

## 🥞 Tech stack
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)


## 🚀 Getting Started

To use this template click on the **Use this template** button on the top of the repository
and click on **Create a new repository**, or go directly to
[this link](https://github.com/new?template_name=pocket-saas&template_owner=lucafaggianelli).

If you don't want to create a new repository, you can clone this repository or download the code
as a zip file and start from there.

### Install dependencies

Install the dependencies:

> Note: we use `pnpm` as package manager, check how to install it [here](https://pnpm.io/installation).

```bash
pnpm install
```

Run the frontend server:

```bash
pnpm dev
```

Download PocketBase binary:

> 🙋 Why PocketBase binary is not included into the template? Because its binary
> is platform-specific and must be downloaded directly from Github.

```bash
pnpm pb:download
```

The above script should work on most platforms, if it doesn't work for you, you can download the binary manually from [Github](https://github.com/pocketbase/pocketbase/releases) and place it in the folder `<project-root>/pocketbase/`

Run PocketBase:

```bash
pnpm pb:server
```

## 📖 How to use this template

### Pages

The pages are defined in `src/pages/` folder, you can add new pages and they will be automatically
added to the router without any manual configuration.
A new file in `src/pages/hello.tsx` will be available at `/hello`.

Page files named `something.lazy.tsx` are loaded lazily and not included in the main bundle to save space.

The router is based on [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
so check the documentation for more information.

### Auth-only pages

To protect a page so that only authenticated users can access it, you can use the `protectPage` helper
in the page declaration:

> Note: protected pages or any other page that requires a check before loading (i.e. using `beforeLoad` function)
  can't be lazy loaded.

```tsx
import { createFileRoute } from "@tanstack/react-router";

import { protectPage } from "@/lib/auth";

export const Route = createFileRoute("/protected")({
  component: () => <div>Hello /protected!</div>,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});
```

If a user tries to access a protected page without being authenticated, they will be redirected to the `/signin` page.

### Menu

The menu entries are defined in `src/config/menu.ts`. You can add new entries or remove existing ones.

### UI Components

The UI components are based on Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/).
Icons are provided by https://www.radix-ui.com/icons.

### Authentication

Authentication is handled by PocketBase and this template is automatically configured to use it.

The page `/signin` is automatically populated with all the authentications methods enabled in PocketBase,
both the OAuth providers and the email/password authentication.

After signing up an email is sent to the user for email verification.

After a successful sign in, the user is redirected to the `/` page or to the page they were trying to access before
signing in (see Auth-only pages section).
