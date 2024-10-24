/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LoaderPinwheel } from "lucide-react";

import { useVerifyEmailMutation } from "@/lib/redux/api/auth/authApi";
import { setUser } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verifyEmail] = useVerifyEmailMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token as string);
        console.log(res?.data?.data);

        if (res?.data?.success) {
          dispatch(setUser({ userInfo: res?.data?.data }));
          toast.success(res?.data?.message);
          router.push("/login");
        } else {
          toast.error("Verification failed. Try again");
        }
      } catch (error) {
        toast.error("Verification failed");
      }
    };

    verify();
  }, [token, dispatch, router, verifyEmail]);

  return (
    <div className="h-[85vh] flex flex-col items-center justify-center">
      <h1 className="flex gap-4 text-xl items-center">
        <LoaderPinwheel className="animate-spin" />
        Verifying. Please Wait ...
      </h1>
      <h2></h2>
    </div>
  );
};

export default VerifyEmail;
