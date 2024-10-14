import { type ParsedLocation, redirect } from "@tanstack/react-router";

import { pb } from "./pocketbase";

const REDIRECT_PARAM = "redirect";

/**
 * Check if the user is authenticated. If not, redirect to the sign-in page.
 *
 * @param location a path to redirect to after sign-in
 */
export const protectPage = (location?: ParsedLocation) => {
  if (!pb.authStore.isValid) {
    throw redirect({
      to: "/signin",
      search: {
        [REDIRECT_PARAM]: location?.href,
      },
    });
  }
};

export const getRedirectAfterSignIn = () =>
  new URLSearchParams(location.search).get(REDIRECT_PARAM) || "/";
