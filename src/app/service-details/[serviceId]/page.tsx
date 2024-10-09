/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useAddAdditionalInformationMutation,
  useViewAdditionalInformationQuery,
} from "@/lib/redux/api/additional-information/additionalInformationApi";
import { useViewServiceByIdQuery } from "@/lib/redux/api/service-request/serviceRequestApi";
import withAuth from "@/lib/withAuth";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// Dummy comments data (You can replace this with dynamic data later)

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const { data, isLoading } = useViewServiceByIdQuery(serviceId);
  const [addAdditionalInformation] = useAddAdditionalInformationMutation();
  const { data: additionalInformation } =
    useViewAdditionalInformationQuery(serviceId);

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

  if (isLoading) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white  rounded-lg overflow-hidden">
        {/* Service and User Details Section */}
        <div className="p-6">
          {/* Service Details */}
          <h2 className="text-3xl font-bold text-gray-800">
            {data?.data.subject}
          </h2>
          <p className="mt-4 text-gray-600">{data?.data.message}</p>

          <div className="mt-4 flex items-center text-gray-700">
            <svg
              className="h-6 w-6 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 6h18M3 14h18M3 18h18"
              />
            </svg>
            <span className="capitalize">
              Request type: {data?.data.requestType.type}
            </span>
          </div>
          {data?.data.image && (
            <div className="mt-4 ">
              <p>
                <a
                  className="text-blue-700 hover:text-blue-900 font-medium underline"
                  target="_blank"
                  href={data?.data.image}
                >
                  View Attachment
                </a>
              </p>
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                {data?.data?.user.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {data?.data?.user.email}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Company:</span>{" "}
                {data?.data?.user.companyName}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Designation:</span>{" "}
                {data?.data?.user.designation}
              </p>
            </div>
          </div>
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
    </div>
  );
};

export default withAuth(ServiceDetailsPage);
