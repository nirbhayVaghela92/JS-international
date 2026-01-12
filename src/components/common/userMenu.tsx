"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FiLogOut, FiUser } from "react-icons/fi";
import { PiHeart, PiUserCircleGear } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface UserMenuProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}

export function UserMenu({
  isAuthenticated,
  userName = "User",
  onLogout,
}: UserMenuProps) {
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <FiUser
        className="w-6 h-6 cursor-pointer text-[#1B1918] hover:text-[#0f4a45]"
        onClick={() => router.push(routes.signIn)}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-full p-0 hover:bg-[#e9dcc1] cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#0f4a45] text-white text-sm">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl shadow-lg">
        <DropdownMenuLabel className="text-sm font-medium">
          {userName}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(routes.editUserDetails)}
          className="cursor-pointer gap-2"
        >
          <PiUserCircleGear className="h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(routes.wishList)}
          className="cursor-pointer gap-2"
        >
          <PiHeart className="h-4 w-4" />
          Wish List
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
        >
          <FiLogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
