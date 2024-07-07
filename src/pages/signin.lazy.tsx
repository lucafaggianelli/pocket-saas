import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthMethodsList, RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/lib/pocketbase";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { getRedirectAfterSignIn } from "@/lib/auth";
import { UsersResponse } from "@/lib/pocketbase-types";

export const Route = createLazyFileRoute("/signin")({
  component: LoginForm,
});

/**
 * Look for the user name and avatar in the OAuth2 provider's response and update the user's
 * profile.
 *
 * @param authData data returned from the OAuth2 provider after successful authentication
 * @returns
 */
const updateProfileFromOAuth2 = async (
  authData: RecordAuthResponse<UsersResponse>
) => {
  const meta = authData.meta;

  if (!meta) {
    return;
  }

  const formData = new FormData();

  if (meta.avatarUrl) {
    const response = await fetch(meta.avatarUrl);

    if (response.ok) {
      const file = await response.blob();
      formData.append("avatar", file);
    }
  }

  if (meta.name) {
    formData.append("name", meta.name);
  }

  await pb.collection("users").update(authData.record.id, formData);
};

const UserLoginForm = () => {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        const isAdmin = form["admin-auth"][1].checked;
        console.log(form["admin-auth"]);

        if (isAdmin) {
          await pb.admins.authWithPassword(email, password);
        } else {
          await pb.collection("users").authWithPassword(email, password);
        }

        navigate({ to: getRedirectAfterSignIn() });
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="admin-auth" name="admin-auth" />
        <label
          htmlFor="admin-auth"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Admin
        </label>
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};

const UserCreateForm = () => {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        const data = {
          email,
          password,
          passwordConfirm: password,
        };

        try {
          await pb.collection("users").create(data);
          await pb.collection("users").requestVerification(email);
          await pb.collection("users").authWithPassword(email, password);
          navigate({ to: getRedirectAfterSignIn() });
        } catch (error) {
          console.error(error);
        }
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
        />
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
};

const UserAuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <CardDescription>
        Use your email and password to access your account.
      </CardDescription>

      <div className="flex justify-end">
        <Button onClick={() => setIsSignIn(!isSignIn)} variant="link">
          {isSignIn ? "Create an account" : "Login with your existing account"}
        </Button>
      </div>

      {isSignIn ? <UserLoginForm /> : <UserCreateForm />}
    </>
  );
};

function LoginForm() {
  const navigate = useNavigate();

  const [authProviders, setAuthProviders] = useState<AuthMethodsList | null>(
    null
  );

  const hasPasswordAuth: boolean = !!(
    authProviders?.emailPassword || authProviders?.usernamePassword
  );
  const hasSocialAuth: boolean = !!authProviders?.authProviders?.length;

  useEffect(() => {
    pb.collection("users")
      .listAuthMethods()
      .then((result) => {
        setAuthProviders(result);
      });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {hasSocialAuth && (
            <CardDescription>
              Login with one of the following providers.
            </CardDescription>
          )}

          {authProviders?.authProviders.map((provider) => (
            <Button
              key={provider.name}
              className="w-full"
              variant="outline"
              onClick={async () => {
                const authData = await pb
                  .collection("users")
                  .authWithOAuth2({ provider: provider.name });

                await updateProfileFromOAuth2(authData);

                navigate({ to: getRedirectAfterSignIn() });
              }}
            >
              <img
                src={`${pb.baseUrl}_/images/oauth2/${provider.name}.svg`}
                className="h-4 w-4 mr-4"
              />
              Sign in with {provider.displayName}
            </Button>
          ))}

          {hasPasswordAuth && hasSocialAuth && <Separator />}

          {hasPasswordAuth && <UserAuthForm />}
        </CardContent>
      </Card>
    </div>
  );
}
