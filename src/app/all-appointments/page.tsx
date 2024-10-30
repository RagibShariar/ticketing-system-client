/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBookingsQuery } from "@/lib/redux/api/booking/bookingApi";
import { format } from "date-fns";

const page = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery("");
  console.log(bookings?.data);

  if (isLoading) {
    return <div className="text-center ">Loading...</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.data.map((booking: any) => (
              <TableRow key={booking?.id}>
                <TableCell>{booking?.serviceRequest?.id}</TableCell>
                <TableCell>{booking?.user?.name}</TableCell>
                <TableCell>{booking?.user?.email}</TableCell>
                <TableCell>{booking?.serviceRequest?.subject}</TableCell>
                <TableCell>
                  {format(new Date(booking.date), "MMMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(booking.startTime), "HH:mm")} -{" "}
                  {format(new Date(booking.endTime), "HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default page;
