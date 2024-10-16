/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddAdditionalInformationMutation,
  useViewAdditionalInformationQuery,
} from "@/lib/redux/api/additional-information/additionalInformationApi";
import {
  useUpdateServiceRequestMutation,
  useViewServiceByIdQuery,
} from "@/lib/redux/api/service-request/serviceRequestApi";
import withAuth from "@/lib/withAuth";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

// Dummy comments data (You can replace this with dynamic data later)

const ServiceDetailsPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const { serviceId } = useParams();
  const { data, isLoading } = useViewServiceByIdQuery(serviceId);
  const [addAdditionalInformation] = useAddAdditionalInformationMutation();
  const { data: additionalInformation } =
    useViewAdditionalInformationQuery(serviceId);
  const [updateServiceRequest] = useUpdateServiceRequestMutation();

  const handleAddComment = async (e: FieldValues) => {
    e.preventDefault();

    try {
      const res = await addAdditionalInformation({
        serviceRequestId: serviceId,
        message: e.target.additionalInformation.value,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      // clear form
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle file input change and set image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  const handleImage = async (data: FieldValues) => {
    const submitData = new FormData();

    // Append image file if it exists
    if (data.image && data.image.length > 0) {
      submitData.append("image", data.image[0]); // Get the first image file
    }

    const toastId = toast.loading("Uploading image...");
    try {
      const res = await updateServiceRequest({ serviceId, submitData });

      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto   overflow-hidden lg:grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-lg ">
          {/* Service and User Details Section */}
          <div className="p-6">
            {/* Service Details */}
            <h2 className="text-2xl md:text-3xl font-medium capitalize text-gray-800">
              <span className="capitalize font-normal">
                [Ticket #{data?.data.id}] [{data?.data.requestType.type}]{" "}
              </span>
              {data?.data.subject}
            </h2>

            <p className="text-sm mt-2">{formatDate(data?.data.createdAt)}</p>

            <p className="mt-4 text-gray-600">{data?.data.message}</p>

            {data?.data.images && (
              <div className="mt-4 ">
                <p className="flex flex-wrap gap-4">
                  {data?.data.images.map((image: string, index: number) => {
                    return (
                      <a
                        key={index}
                        className="text-blue-700 hover:text-blue-900 font-medium underline"
                        target="_blank"
                        href={image}
                      >
                        View Attachment
                      </a>
                    );
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Additional image upload */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Additional Image
            </h2>
            <form
              onSubmit={handleSubmit(handleImage)}
              className="grid w-full  items-center gap-1.5 "
            >
              <Label htmlFor="image">Image</Label>
              <Input
                {...register("image")}
                className="grid w-full items-center gap-1.5 shadow-none rounded-none  border-gray-400 "
                id="image"
                type="file"
                accept="image/*" // Restrict file input to images only
                onChange={handleImageChange} // Handle file change to show preview
              />
              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <div className="mt-4">
                    <p>Image Preview:</p>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={500}
                      height={200}
                      className="h-40 w-40 object-cover"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-[#041340] text-white px-10 py-2 rounded-sm"
                  >
                    Add Attachment
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Comments Section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <div className="space-y-4">
              {additionalInformation?.data.map((additionalInfo: any) => (
                <div
                  key={additionalInfo.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#041340] flex items-center justify-center text-white font-bold mr-3">
                      {additionalInfo?.user?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800  ">
                        {additionalInfo?.user?.role === "admin" ? (
                          <p>
                            {additionalInfo?.user.name}
                            <span className="ml-3 bg-[#041340] text-white px-2 text-xs rounded-full">
                              Admin
                            </span>
                          </p>
                        ) : (
                          <span className="">{additionalInfo?.user.name}</span>
                        )}
                      </p>
                      <p className="text-xs">
                        {formatDate(additionalInfo?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{additionalInfo.message}</p>
                </div>
              ))}
            </div>

            {/* Add a new comment */}
            {data?.data?.status !== "fulfilled" &&
              data?.data?.status !== "cancelled" && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Add additional information
                  </h3>
                  <form onSubmit={handleAddComment}>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="additionalInformation"
                      placeholder="Write additional information here..."
                      rows={1}
                    />
                    <button
                      className="mt-4 bg-[#041340] text-white px-10 py-2 rounded-sm"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
          </div>
        </div>
        {/* User Information */}
        <div className="h-full  p-6 border-t border-gray-200 rounded-lg  lg:col-span-4 bg-white mt-4 lg:mt-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Info
          </h2>

          <div>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Name:</span> {data?.data?.user.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Email:</span>{" "}
              {data?.data?.user.email}
            </p>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Company:</span>{" "}
            {data?.data?.user.companyName}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Designation:</span>{" "}
            {data?.data?.user.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ServiceDetailsPage);
