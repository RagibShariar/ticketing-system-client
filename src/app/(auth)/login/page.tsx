/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGenerateVerifyEmailTokenMutation,
  useLoginMutation,
} from "@/lib/redux/api/auth/authApi";
import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const [generateVerifyEmailToken] = useGenerateVerifyEmailTokenMutation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setError("");
    setIsEmailSent(false);
  }, []);
  const handleLogin = async (data: FieldValues) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    setEmail(loginInfo.email);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(loginInfo).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 2000 });
        localStorage.setItem("userEmail", loginInfo.email);
        router.push("/verify");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
      setError(error?.status);
    }
  };

  const verifyEmailHandler = async () => {
    try {
      const toastId = toast.loading("Sending verification email...");
      const res = await generateVerifyEmailToken({ email }).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
      setIsEmailSent(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <section className="lg:mt-16 lg:w-[450px] md:w-1/2 mx-auto  md:mt-20 md:mb-20 mt-10 mb-10">
        {Number(error) === 403 && (
          <div className="max-w-3xl mx-auto mb-5 p-4 rounded-xl border shadow-sm">
            <div className="flex gap-3 items-center">
              {/* <TriangleAlert fill="orange" className="text-white" size={40} /> */}

              {isEmailSent ? (
                <div className="flex gap-3 items-center">
                  <CircleCheck fill="green" className="text-white" size={40} />
                  <p className="text-md font-normal">
                    The verification link has been sent to your email address.
                    Please check.
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <TriangleAlert
                    fill="orange"
                    className="text-white"
                    size={40}
                  />
                  <p className="text-md font-normal">
                    Account verification is pending. Click{" "}
                    <span className="underline">
                      <button
                        onClick={verifyEmailHandler}
                        className="text-blue-600 underline"
                      >
                        here
                      </button>
                    </span>{" "}
                    to receive the activation email.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white lg:m-1 lg:rounded-lg px-4 py-5 mx-auto dark:bg-slate-900 lg:border  lg:shadow-md">
          <h4 className=" text-2xl font-semibold dark:text-gray-50">
            Welcome Back
          </h4>
          <p className="mt-3 mb-6 text-sm font-medium text-gray-500">
            Enter your email below to login to your account
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className=" ">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <span className="text-sm text-red-500 flex items-center">
                    <CircleAlert className="mr-1 size-3" /> Email is required
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="•••••••••"
                />
                {errors.password && (
                  <span className="text-sm text-red-500 flex items-center">
                    <CircleAlert className="mr-1 size-3" /> Password is required
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          {/* <GoogleSignIn /> */}
          <Button
            variant={"ghost"}
            className="w-full mt-4 border"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Image
              className="mr-2"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              width={30}
              height={30}
              alt="google logo"
            />
            Login to Google
          </Button>
          <div className="mt-4 text-center text-sm flex items-center justify-center">
            <div>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="ml-2 underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
