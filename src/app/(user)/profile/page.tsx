"use client";

import { Button } from "@/components/ui/button";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "@/lib/redux/api/user/userApi";
import { useCurrentToken } from "@/lib/redux/features/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Edit2Icon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const router = useRouter();
  const {
    data: user,
    isLoading: userLoading,
    refetch,
  } = useGetUserInfoQuery("");
  const { register, handleSubmit } = useForm();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const handleProfileEdit = () => {
    setIsEdit(!isEdit);
  };

  if (!token) {
    toast.warning("Please login to access this page");
    router.replace("/login");
  }

  const onSubmit = async (data: FieldValues) => {
    const userData = new FormData();

    userData.append("phone", data.phone);
    userData.append("designation", data.designation);

    // Append image file if it exists
    if (data.avatar && data.avatar.length > 0) {
      userData.append("avatar", data.avatar[0]); // Get the first image file
    }

    // console.log(userData);
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateUser(userData);
      // console.log(res);
      if (res?.data?.success) {
        toast.success("Updated successfully", { id: toastId });
        setIsEdit(false);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update", { id: toastId });
    }
  };
  if (userLoading || updateLoading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  // View Profile
  if (!isEdit) {
    return (
      <>
        <div className=" p-6 max-w-7xl mx-auto rounded-xl shadow-md md:mt-20 md:mb-20">
          <div className="mb-12 flex justify-between border-b-2 border-dashed py-4">
            <p className="text-2xl font-semibold">My Profile</p>
            <button onClick={() => handleProfileEdit()}>
              <Edit2Icon />
            </button>
          </div>
          {/* 1st row */}
          <div className="mb-12 md:grid md:grid-cols-2 ">
            <div className=" rounded-full w-[150px] h-[150px]">
              <Image
                src={
                  user?.data?.avatar ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                width={200}
                height={200}
                className=" w-[150px] h-[150px] object-cover  rounded-full  border-gray-300 border-2"
                alt="Profile Image"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="mb-12 md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg ">Full Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.name}
              </h3>
            </div>
            <div>
              <p className="text-lg"> Email</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.email}
              </h3>
            </div>
          </div>
          {/* 3rd row */}
          <div className="md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg">Mobile Number</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.phone || "Not Set"}
              </h3>
            </div>
            <div>
              <p className="text-lg">Verify Status</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.isVerified ? "✅ Verified" : "❌ Not Verified"}
              </h3>
            </div>
          </div>
          {/* 4th row */}
          <div className="md:grid md:grid-cols-2 mt-6">
            <div>
              <p className="text-lg">Company Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.companyName}
              </h3>
            </div>
            <div>
              <p className="text-lg">Designation</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.designation}
              </h3>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Edit profile
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      <div className=" p-6 max-w-7xl mx-auto rounded-xl shadow-md md:mt-20 md:mb-20">
        <div className="mb-12 flex justify-between border-b-2 border-dashed py-4">
          <p className="text-2xl font-semibold">My Profile</p>
          <button onClick={() => handleProfileEdit()}>
            <Cross1Icon />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="mb-12 md:grid md:grid-cols-2 flex justify-center items-center">
            <div className=" rounded-full w-[150px] h-[150px]">
              <Image
                src={
                  user?.data?.avatar ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                width={100}
                height={100}
                alt="Profile Image"
                className=" w-[150px] h-[150px] object-cover  rounded-full  border-gray-300 border-2"
              />
            </div>
            <div>
              <input type="file" {...register("avatar")} accept="image/*" />
            </div>
          </div>
          {/* 2nd row */}
          <div className="mb-12 md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg ">Full Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.name}
              </h3>
            </div>
            <div>
              <p className="text-lg ">Email</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.email}
              </h3>
            </div>
          </div>
          {/* 3rd row */}
          <div className="md:grid md:grid-cols-2 ">
            <div className="mr-6">
              <p className="text-lg">Mobile Number</p>
              <input
                className="mt-2 text-xl font-semibold bg-zinc-200 p-3 rounded-lg w-full"
                type="text"
                placeholder={"Enter your mobile number"}
                defaultValue={user?.data?.phone}
                {...register("phone")}
              />
            </div>
            <div>
              <p className="text-lg">Verify Status</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data.isVerified === true
                  ? "✅ Verified"
                  : "❌ Not Verified"}
              </h3>
            </div>
          </div>
          {/* 4th row */}
          <div className="mb-12 md:grid md:grid-cols-2 mt-8">
            <div>
              <p className="text-lg ">Company Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.data?.companyName}
              </h3>
            </div>
            <div className="mr-6">
              <p className="text-lg">Designation</p>
              <input
                className="mt-2 text-xl font-semibold bg-zinc-200 p-3 rounded-lg w-full"
                type="text"
                defaultValue={user?.data?.designation}
                {...register("designation")}
              />
            </div>
          </div>
          <div className="mt-10 text-end px-6">
            <Button className="">Save Changes</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
