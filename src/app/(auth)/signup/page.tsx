"use client";

import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/lib/redux/api/auth/authApi";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Armchair, Building, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const [signUp] = useSignUpMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSignUp = async (data: FieldValues) => {
    const { name, email, password, confirmPassword, companyName, designation } =
      data;

    const signUpData = { name, email, password, companyName, designation };

    // reset error message
    setSignUpError("");

    if (password !== confirmPassword) {
      setSignUpError("password doesn't match");
      return;
    }

    const toastId = toast.loading("Signing up...");

    try {
      // console.log(signUpData)
      const res = await signUp(signUpData).unwrap();
      // console.log(res);

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 1500 });
        // localStorage.setItem("userEmail", signUpData.email);
        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <section className=" lg:mt-16 lg:w-[550px] md:w-1/2 mx-auto lg:border lg:rounded-xl lg:shadow-md bg-gradient md:mt-20 md:mb-20 mt-10 mb-10">
      <div className="bg-white lg:m-1 lg:rounded-lg dark:bg-slate-900 ">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="px-4 py-5 mx-auto "
        >
          <div className="mb-8 ">
            <h3 className="text-3xl font-extrabold dark:text-gray-200">
              Register
            </h3>
            <p className="mt-3 text-balance text-muted-foreground ">
              Enter your information to create an account
            </p>
          </div>
          <div className="space-y-6 ">
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Name
              </label>
              <div className="relative flex items-center ">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Enter name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="absolute w-4 h-4 right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" />
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                </svg>
              </div>
              {errors.name && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> Name is required
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Email Id
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="absolute w-4 h-4 right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    />
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                  </g>
                </svg>
              </div>
              {errors.email && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> Email is required
                </span>
              )}
            </div>
            {/* company name */}
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Company Name
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("companyName", { required: true })}
                  type="text"
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Enter your company name"
                />
                <Building className="absolute w-4 h-4 text-[#bbb] right-4" />
              </div>
              {errors.companyName && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> Company name is
                  required
                </span>
              )}
            </div>
            {/* designation */}
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Your Designation
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("designation", { required: true })}
                  type="text"
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Enter your designation"
                />
                <Armchair className="absolute w-4 h-4 text-[#bbb] right-4" />
              </div>
              {errors.designation && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> designation is
                  required
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Password
              </label>
              <div className="relative ">
                <input
                  {...register("password", { required: true })}
                  type={passwordVisible ? "text" : "password"}
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Enter password"
                />
                <span
                  className=" text-gray-400 absolute right-3 bottom-3 flex items-center text-sm leading-5 bg-transparent border-none shadow-none hover:bg-transparent "
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <EyeOpenIcon className="w-4 h-4 right-4 cursor-pointer " />
                  ) : (
                    <EyeClosedIcon className="w-4 h-4 right-4 cursor-pointer" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> Password is required
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                Confirm Password
              </label>
              <div className="relative ">
                <input
                  {...register("confirmPassword", { required: true })}
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-full py-2.5 pl-4 pr-10 text-sm border border-gray-300 rounded outline-blue-500 dark:bg-slate-900"
                  placeholder="Confirm password"
                />
                <span
                  className="btn text-gray-400 absolute right-3 bottom-3 flex items-center text-sm leading-5 bg-transparent border-none shadow-none hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? (
                    <EyeOpenIcon className="w-4 h-4 right-4 cursor-pointer" />
                  ) : (
                    <EyeClosedIcon className="w-4 h-4 right-4 cursor-pointer" />
                  )}
                </span>
              </div>
              {errors.name && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> Confirm password is
                  required
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center ">
                <input
                  id="termAndConditions"
                  {...register("termsAndConditions", { required: true })}
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 shrink-0 "
                />
                <label
                  htmlFor="termAndConditions"
                  className="block ml-3 text-sm dark:text-gray-900 dark:text-gray-200"
                >
                  I accept the
                  <a
                    href="#"
                    className="ml-1 font-semibold text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.termsAndConditions && (
                <span className="mt-2 text-sm text-red-500 flex items-center">
                  <CircleAlert className="mr-1 size-3" /> You must accept our
                  terms and conditions
                </span>
              )}
            </div>
          </div>
          <div>
            {signUpError && (
              <p className="mt-2 text-red-500 text-sm font-medium leading-6">
                {signUpError}
              </p>
            )}
          </div>
          <div className="mt-4 ">
            <Button
              type="submit"
              className="w-full px-4 py-3 text-sm font-semibold  focus:outline-none "
            >
              Create Account
            </Button>
          </div>
          <p className="mt-6 text-sm text-center ">
            Already have an account?
            <span className="ml-1 font-semibold text-blue-600 hover:underline">
              <Link href={"/login"}>Login Here</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
