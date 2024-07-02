import {
  DashboardIcon,
  EnterIcon,
  ExitIcon,
  FileTextIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { pb } from "@/lib/pocketbase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PocketBaseMenu = () => (
  <>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>PocketBase</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <a href={`${pb.baseUrl}_`} target="_blank">
          <DashboardIcon className="w-5 h-5 mr-4" />
          Admin portal
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href="https://pocketbase.io/docs/" target="_blank">
          <FileTextIcon className="w-5 h-5 mr-4" />
          Docs
        </a>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </>
);

export default function UserMenu() {
  const user = pb.authStore.model;

  if (!user) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="/signin"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Avatar>
              <AvatarFallback>
                <EnterIcon className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Login</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Login</TooltipContent>
      </Tooltip>
    );
  }

  const isAdmin = pb.authStore.isAdmin;
  const initials = (user.name || user.email || "U")[0].toUpperCase();
  const primaryName = user.name || user.email;
  const secondaryName = user.name ? user.email : null;

  let avatarUrl: string | undefined = undefined;

  if (isAdmin && user.avatar && Number.isFinite(user.avatar)) {
    // This is to handle the default admin user avatar that is stored as a number
    avatarUrl = `${pb.baseUrl}_/images/avatars/avatar${user.avatar}.svg`;
  } else if (user.avatar) {
    avatarUrl = pb.files.getUrl(user, user.avatar);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={avatarUrl} alt={user.name || user.email} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{primaryName}</DropdownMenuLabel>
        {secondaryName && <DropdownMenuItem>{secondaryName}</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PersonIcon className="w-5 h-5 mr-4" />
          Profile
        </DropdownMenuItem>
        {isAdmin && <PocketBaseMenu />}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            pb.authStore.clear();
            location.reload();
          }}
        >
          <ExitIcon className="w-5 h-5 mr-4 text-rose-600" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
