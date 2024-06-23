import { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MainNavigation />
        <main>{children}</main>
      </div>
    </div>
  );
}
