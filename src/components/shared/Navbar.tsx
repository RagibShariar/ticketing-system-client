"use client";

import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  logOut,
  useCurrentToken,
  useCurrentUser,
} from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

const Navbar = () => {
  const token = useSelector(useCurrentToken);
  const user = useSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/login");
    toast.success("Logged Out Successfully");
  };

  return (
    <nav className="shadow py-2 bg-slate-100">
      <div className="  flex items-center justify-between lg:max-w-7xl mx-auto">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="font-semibold hover:text-purple-800  px-4 py-2 cursor-pointer">
              <Link href="/contact-us">Contact Us</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex justify-center items-center gap-4">
          <div>
            {!token ? (
              <div>
                <Button
                  variant={"secondary"}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Link href={"/login"}>Login</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <p> {user?.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full hover:bg-transparent focus-visible:ring-0"
                    >
                      <Image
                        className="rounded-full"
                        width="40"
                        height="40"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        alt={user?.name as string}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href={"/profile"}>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {/* {!token ? (
            <div>
              <Link href={"/login"}>Login</Link>
            </div>
          ) : (
            <div>
              <Button onClick={handleLogOut} variant={"destructive"}>
                Logout
              </Button>{" "}
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
