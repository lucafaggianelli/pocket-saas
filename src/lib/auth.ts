import { ParsedLocation, redirect } from "@tanstack/react-router";

import { pb } from "./pocketbase";

const REDIRECT_PARAM = "redirect";

export const protectPage = (location: ParsedLocation) => {
  if (!pb.authStore.isValid) {
    throw redirect({
      to: "/signin",
      search: {
        [REDIRECT_PARAM]: location.href,
      },
    });
  }
};

export const getRedirectAfterSignIn = () =>
  new URLSearchParams(location.search).get(REDIRECT_PARAM) || "/";
