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
  useViewAllServicesQuery,
  useViewServicesQuery,
} from "@/lib/redux/api/service-request/serviceRequestApi";
import {
  useCurrentToken,
  useCurrentUser,
} from "@/lib/redux/features/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useState } from "react";

export function UserServiceRequests() {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

  const { data } = useViewServicesQuery("");
  const { data: allData } = useViewAllServicesQuery("");

  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    status: string;
  }>({
    id: "",
    status: "",
  });

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

  return (
    <div className="w-full">
      <div className="mt-2 mb-4 bg-purple-100">
        <h1 className="text-xl font-medium text-center">
          Welcome, {user?.name}
        </h1>
        <h2 className="text-md font-medium text-center"> {user?.email}</h2>
        <p className="text-center">role: {user?.role}</p>
      </div>

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
