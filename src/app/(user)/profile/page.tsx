"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { register, handleSubmit } = useForm();

  const handleProfileEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  if (!isEdit) {
    return (
      <>
        <div className=" p-6 max-w-7xl mx-auto rounded-xl shadow-md mt-10">
          <div className="mb-12 flex justify-between border-b-2 border-dashed py-4">
            <p className="text-2xl font-semibold">My Profile</p>
            <button onClick={() => handleProfileEdit()}>
              <Edit2Icon />
            </button>
          </div>
          {/* 1st row */}
          <div className="mb-12 md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg ">Full Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">{user?.name}</h3>
            </div>
            <div>
              <p className="text-lg"> Email</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">{user?.email}</h3>
            </div>
          </div>
          {/* 2nd row */}
          <div className="md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg">Mobile Number</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.phone || "Not Set"}
              </h3>
            </div>
          </div>
          {/* 3rd row */}
          <div className="md:grid md:grid-cols-2 mt-6">
            <div>
              <p className="text-lg">Company Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.companyName}
              </h3>
            </div>
            <div>
              <p className="text-lg">Designation</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.designation}
              </h3>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      <div className=" p-6 max-w-7xl mx-auto rounded-xl shadow-md mt-10">
        <div className="mb-12 flex justify-between border-b-2 border-dashed py-4">
          <p className="text-2xl font-semibold">My Profile</p>
          <button onClick={() => handleProfileEdit()}>
            <Cross1Icon />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="mb-12 md:grid md:grid-cols-2 ">
            <div>
              <p className="text-lg ">Full Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">{user?.name}</h3>
            </div>
            <div>
              <p className="text-lg ">Email</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">{user?.email}</h3>
            </div>
          </div>
          {/* 2nd row */}
          <div className="md:grid md:grid-cols-2 ">
            <div className="mr-6">
              <p className="text-lg">Mobile Number</p>
              <input
                className="mt-2 text-xl font-semibold bg-zinc-200 p-3 rounded-lg w-full"
                type="text"
                placeholder={"Enter your mobile number"}
                {...register("mobileNumber")}
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="mb-12 md:grid md:grid-cols-2 mt-8">
            <div>
              <p className="text-lg ">Company Name</p>
              <h3 className="mt-2 p-3 text-xl font-semibold">
                {user?.companyName}
              </h3>
            </div>
            <div className="mr-6">
              <p className="text-lg">Designation</p>
              <input
                className="mt-2 text-xl font-semibold bg-zinc-200 p-3 rounded-lg w-full"
                type="text"
                defaultValue={user?.designation}
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
