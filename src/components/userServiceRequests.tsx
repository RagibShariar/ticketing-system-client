/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RequestDetails } from "./RequestDetails";

export function UserServiceRequests() {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

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
      <div className="min-h-[85vh]  flex items-center justify-center w-full">
        <h1 className="text-xl font-medium"> You have no requests.</h1>
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
    <div className="w-full">
      <div className="mt-2 mb-4 bg-purple-100">
        <h1 className="text-xl font-medium text-center">
          Welcome, {user?.name}
        </h1>
        <h2 className="text-md font-medium text-center"> {user?.email}</h2>
        <p className="text-center">role: {user?.role}</p>
      </div>

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
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      <Table className="text-md">
        <TableHeader>
          <TableRow>
            <TableHead>Ticket Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.role === "user" &&
            data?.data?.map((element: any) => (
              <TableRow key={element.id}>
                <TableCell>{element.id}</TableCell>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.user.companyName}</TableCell>
                <TableCell>{element.user.designation}</TableCell>
                <TableCell>{element.subject}</TableCell>
                <TableCell className="max-w-[250px] overflow-x-auto">
                  {element.message}
                </TableCell>
                <TableCell>
                  {element.requestTypeId === 1 ? "incident" : ""}
                  {element.requestTypeId === 2 ? "request" : ""}
                  {element.requestTypeId === 3 ? "change" : ""}
                </TableCell>
                <TableCell>{element.status}</TableCell>
              </TableRow>
            ))}

          {user?.role === "admin" &&
            allData?.data?.map((element: any) => (
              <TableRow key={element.id}>
                <TableCell>{element.id}</TableCell>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.user.companyName}</TableCell>
                <TableCell>{element.user.designation}</TableCell>
                <TableCell className="font-medium">{element.subject}</TableCell>
                <TableCell>
                  <RequestDetails element={element} />
                </TableCell>
                <TableCell>
                  {element.requestTypeId === 1 ? "incident" : ""}
                  {element.requestTypeId === 2 ? "request" : ""}
                  {element.requestTypeId === 3 ? "change" : ""}
                </TableCell>
                <TableCell>
                  <select
                    defaultValue={element.status}
                    onChange={(e) => handleStatusChange(element.id, e)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">⏳ In-progress</option>
                    <option value="fulfilled">✅ Fulfilled</option>
                    <option value="cancelled">❌Cancelled</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
