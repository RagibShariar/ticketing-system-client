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

import logo from "@/assets/logo.jpg";
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
    <nav className="shadow py-3 bg-[#041340] text-white px-4">
      <div className="  flex items-center justify-between lg:max-w-7xl mx-auto ">
        <div className=" lg-ml-0">
          <Link href={"/"}>
            <Image
              className="rounded-full"
              src={logo}
              alt="Solar-ICT"
              width={60}
              height={60}
            />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="font-semibold hover:text-purple-800  px-4 py-2 cursor-pointer">
              <Link href="/service-request">Service Request</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex justify-center items-center">
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
              <div className="flex items-center ">
                <div className="mr-4">
                  <p className="hidden md:block"> {user?.name}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="rounded-full cursor-pointer w-12 h-12 bg-white flex items-center justify-center">
                      {/* <Image
                        className="rounded-full"
                        width="40"
                        height="40"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        alt={user?.name as string}
                      /> */}
                      <User size={20} className="text-black" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href={"/profile"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="cursor-pointer"
                    >
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
