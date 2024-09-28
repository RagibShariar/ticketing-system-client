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

export function UserServiceRequests() {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

  const { data, isLoading } = useViewServicesQuery("");
  // const { data: allData, isLoading: allDataLoading } =
  //   useViewAllServicesQuery("");

  const [
    triggerViewAllServicesQuery,
    { data: allData, isLoading: allDataLoading },
  ] = useLazyViewAllServicesQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    status: string;
  }>({
    id: "",
    status: "",
  });
  const { register, handleSubmit } = useForm();
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    // Fetch all data initially (no filters)
    triggerViewAllServicesQuery({});
  }, [triggerViewAllServicesQuery]);

  const onSubmit = async (data: FieldValues) => {
    let queryData = {};
    if (filterBy === "email") {
      queryData = { ...queryData, email: data.email };
    } else if (filterBy === "ticketId") {
      queryData = { ...queryData, id: data.ticketId };
    }
    console.log(queryData);
    // Call the query with the selected filter
    triggerViewAllServicesQuery(queryData);
  };

  const handleStatusChange = (
    id: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    setSelectedStatus({ id, status: newStatus });

    // Now you can send the status and id to your API to update the status.
    console.log("ID:", id, "New Status:", newStatus);

    // Example: call an API to update status
    // updateServiceRequestStatus(id, newStatus);
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
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="w-1/2">message</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.role === "user" &&
            data?.data?.map((element: any, index: number) => (
              <TableRow key={element.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
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
            allData?.data?.map((element: any, index: number) => (
              <TableRow key={element.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.subject}</TableCell>
                <TableCell className="max-w-[250px] overflow-x-auto">
                  {element.message}
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
                    <option value="pending">{element.status}</option>
                    <option value="completed">✅ Completed</option>
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
