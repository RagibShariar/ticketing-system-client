/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatDuration } from "@/utils/formatDuration";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AllSpentTimeRows = ({
  timeSpent,
  totalTime,
}: {
  timeSpent: any;
  totalTime: any;
}) => {
  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSpent?.map((time: any) => (
              <TableRow key={time.id}>
                <TableCell>{format(time.createdAt, "MMMM d, yyyy")}</TableCell>
                <TableCell>{formatDuration(time.timeSpent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableCell>Total Time:</TableCell>
            <TableCell> {totalTime}</TableCell>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default AllSpentTimeRows;
