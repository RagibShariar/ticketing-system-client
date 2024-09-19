"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logOut, useCurrentToken, useCurrentUser } from "@/lib/redux/features/authSlice";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const token = useSelector(useCurrentToken);
  const user = useSelector(useCurrentUser);
  const dispatch = useAppDispatch();


  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Logged Out Successfully");
  };


  return (
    <nav className="shadow py-2 bg-slate-200">
      <div className="  flex items-center justify-between lg:max-w-7xl mx-auto">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="font-semibold hover:text-purple-800  px-4 py-2 cursor-pointer">
              <Link  href="/contact-us">
                
                  Contact Us
               
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
        <div>{user?.name}</div>
        { 
          !token
          ? (<div><Link href={"/login"}>Login</Link></div>)
          : (<div><Button onClick={handleLogOut} variant={"destructive"}>Logout</Button>  </div>)
        }
                  
        </div>
        
        
      </div>
    </nav>
  );
};

export default Navbar;
