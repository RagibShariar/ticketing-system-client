/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { Key } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const UserBookings = ({ bookings }: { bookings: any }) => {
  console.log(bookings);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map(
            (booking: {
              id: Key | null | undefined;
              date: string | number | Date;
              startTime: string | number | Date;
              endTime: string | number | Date;
            }) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {format(new Date(booking.date), "MMMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(booking.startTime), "HH:mm")}
                </TableCell>
                <TableCell>
                  {format(new Date(booking.endTime), "HH:mm")}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserBookings;
