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

export function UserServiceRequests() {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

  const { data } = useViewServicesQuery("");
  const { data: allData } = useViewAllServicesQuery("");

  if (!token || data?.data?.length === 0) {
    return (
      <div className="min-h-[85vh]  flex items-center justify-center w-full">
        <h1 className="text-xl font-medium"> You have no requests.</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-2 mb-4">
        <h1 className="text-xl font-medium text-center">
          Welcome, {user?.name}
        </h1>
        <h2 className="text-md font-medium text-center"> {user?.email}</h2>
        <p className="text-center">role: {user?.role}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>message</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.role === "user" &&
            data?.data?.map((element: any) => (
              <TableRow key={element.id}>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.subject}</TableCell>
                <TableCell className="max-w-[250px] overflow-x-auto">
                  {element.message}
                </TableCell>
                <TableCell>{element.requestType}</TableCell>
                <TableCell>{element.status}</TableCell>
              </TableRow>
            ))}

          {user?.role === "admin" &&
            allData?.data?.map((element: any) => (
              <TableRow key={element.id}>
                <TableCell className="font-medium">{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.subject}</TableCell>
                <TableCell className="max-w-[250px] overflow-x-auto">
                  {element.message}
                </TableCell>
                <TableCell>{element.requestType}</TableCell>
                <TableCell>{element.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
