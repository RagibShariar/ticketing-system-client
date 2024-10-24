/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import requestSVG from "@/assets/request.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useChangeStatusMutation,
  useLazyViewAllServicesQuery,
  useViewServicesQuery,
} from "@/lib/redux/api/service-request/serviceRequestApi";
import {
  useCurrentToken,
  useCurrentUser,
} from "@/lib/redux/features/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export function UserServiceRequests() {
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { data, isLoading } = useViewServicesQuery("");
  const [
    triggerViewAllServicesQuery,
    { data: allData, isLoading: allDataLoading },
  ] = useLazyViewAllServicesQuery();

  const { register, handleSubmit } = useForm();
  const [filterBy, setFilterBy] = useState("all");

  const [changeStatus] = useChangeStatusMutation();

  // Fetch last 3 days' data initially on load
  useEffect(() => {
    triggerViewAllServicesQuery({ days: 3 });
  }, [triggerViewAllServicesQuery]);

  const onSubmit = async (data: FieldValues) => {
    const queryData: any = {};

    // Add email filter if selected
    if (filterBy === "email") {
      queryData.email = data.email;
    }
    // Add ticket ID filter if selected
    else if (filterBy === "ticketId") {
      queryData.id = data.ticketId;
    }
    // Add days filter if input is provided
    if (data.days) {
      queryData.days = data.days;
    }

    // Call the query with the filters
    triggerViewAllServicesQuery(queryData);
  };

  const handleStatusChange = async (
    id: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    const toastId = toast.loading("Updating...");
    try {
      const res = await changeStatus({ id, status: newStatus }).unwrap();
      if (res?.success === true) {
        toast.success("Status updated successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  if (!token || data?.data?.length === 0) {
    return (
      <div className="min-h-[85vh]  flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-7xl mx-auto gap-12">
        <h1 className="text-xl font-medium">
          {" "}
          You have no requests. Create new request?
          <Link
            className="ml-3 text-blue-700 underline"
            href={"/service-request"}
          >
            Create a new Request
          </Link>
        </h1>
        <Image src={requestSVG} alt="Request" width={600} height={600} />
      </div>
    );
  }

  if (isLoading || allDataLoading) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto  bg-white rounded-lg p-4">
        {user?.role === "user" ? (
          <div className="flex items-center justify-start p-4">
            <h2 className="text-xl font-medium">
              Your submitted requests are below
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-start p-4">
            <h2 className="text-xl font-medium">
              All Service Requests - Admin Dashboard
            </h2>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="flex items-center justify-start p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex space-x-4 items-center"
            >
              {/* Filter by Select */}
              <div>
                <select
                  defaultValue="all"
                  className="p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="email">Email</option>
                  <option value="ticketId">Ticket ID</option>
                </select>
              </div>

              {/* Email Input - Show only if "email" is selected */}
              {filterBy === "email" && (
                <div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter email"
                    {...register("email", { required: filterBy === "email" })}
                  />
                </div>
              )}

              {/* Ticket ID Input - Show only if "ticketId" is selected */}
              {filterBy === "ticketId" && (
                <div>
                  <input
                    type="text"
                    id="ticketId"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Ticket ID"
                    {...register("ticketId", {
                      required: filterBy === "ticketId",
                    })}
                  />
                </div>
              )}

              {/* Days Filter Input */}
              <div>
                <input
                  type="number"
                  id="days"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter days"
                  {...register("days")}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#041340] text-white px-4 py-2 rounded-md  transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        <Table className="text-md mb-14 px-10">
          <TableHeader>
            <TableRow className="bg-slate-200 hover:bg-slate-200">
              <TableHead>Ticket Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>

              <TableHead>Subject</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.role === "user" &&
              data?.data?.map((element: any) => (
                <TableRow
                  className="cursor-pointer"
                  key={element.id}
                  onClick={() => router.push(`/service-details/${element.id}`)}
                >
                  <TableCell>#{element.id}</TableCell>
                  <TableCell className="font-medium">{element.name}</TableCell>
                  <TableCell>{element.email}</TableCell>

                  <TableCell className="font-semibold">
                    {element.subject}
                  </TableCell>
                  <TableCell>
                    {element.requestTypeId === 1 ? "Incident" : ""}
                    {element.requestTypeId === 2 ? "Request" : ""}
                    {element.requestTypeId === 3 ? "Change" : ""}
                  </TableCell>
                  <TableCell>
                    {element.status === "opened"
                      ? "🟢 Opened"
                      : element.status === "pending"
                      ? "⌛ Pending"
                      : element.status === "in_progress"
                      ? "🔄 In-progress"
                      : element.status === "resolved"
                      ? "✅ Resolved"
                      : element.status === "cancelled"
                      ? "❌ Cancelled"
                      : ""}
                  </TableCell>
                  <TableCell>{formatDate(element.createdAt)} </TableCell>
                </TableRow>
              ))}

            {user?.role === "admin" &&
              allData?.data?.map((element: any) => (
                <TableRow
                  key={element.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/service-details/${element.id}`)}
                >
                  <TableCell>#{element.id}</TableCell>
                  <TableCell className="font-medium">{element.name}</TableCell>
                  <TableCell>{element.email}</TableCell>

                  <TableCell className="font-medium">
                    {element.subject}
                  </TableCell>

                  <TableCell>
                    {element.requestTypeId === 1 ? "Incident" : ""}
                    {element.requestTypeId === 2 ? "Request" : ""}
                    {element.requestTypeId === 3 ? "Change" : ""}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <select
                      defaultValue={element.status}
                      onChange={(e) => {
                        handleStatusChange(element.id, e);
                      }}
                    >
                      <option value="opened">🟢 Opened</option>
                      <option value="pending">⌛ Pending</option>
                      <option value="in_progress">🔄 In-progress</option>
                      <option value="resolved">✅ Resolved</option>
                      <option value="cancelled">❌Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>{formatDate(element.createdAt)} </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
