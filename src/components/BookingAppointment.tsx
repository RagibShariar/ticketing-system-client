/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useCreateBookingMutation,
  useGetAvailabilityMutation,
} from "@/lib/redux/api/booking/bookingApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const BookingAppointment = ({
  serviceRequestId,
}: {
  serviceRequestId: string;
}) => {
  const today = new Date();
  const [chosenDate, setChosenDate] = useState<Date | undefined>(today);
  const [getSlots] = useGetAvailabilityMutation();
  const [availableSlots, setAvailableSlots] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const date = chosenDate ? format(chosenDate, "yyyy-MM-dd") : "";
  const [createBooking] = useCreateBookingMutation();

  const getAllSlots = async () => {
    try {
      const res = await getSlots({ serviceRequestId, date });
      setAvailableSlots(res?.data?.availableSlots || []);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  // Fetch slots whenever chosenDate or serviceRequestId changes
  useEffect(() => {
    if (chosenDate) {
      getAllSlots();
    }
  }, [serviceRequestId, date, chosenDate]);

  const handleBookingSubmission = async () => {
    if (!selectedSlot || !chosenDate) {
      toast.error("Please select a date and time slot.");
      return;
    }

    const bookingData = {
      date: format(chosenDate, "yyyy-MM-dd"),
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      serviceRequestId,
    };

    const toastId = toast.loading("Booking appointment...");
    try {
      const res = await createBooking(bookingData).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setSelectedSlot(null); // Clear the selected slot after booking
        getAllSlots(); // Refresh available slots after successful booking
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button> Book an appointment</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Available Time Slots</DialogTitle>
            <DialogDescription>
              <div className="md:flex gap-4 justify-between items-center ">
                <div>
                  <DayPicker
                    disabled={[
                      (date) =>
                        date.getDay() === 0 ||
                        date.getDay() === 6 || // Disable weekends
                        (date.getTime() < new Date().setHours(0, 0, 0, 0) &&
                          date.getDate() !== new Date().getDate()), // Disable past dates, allow today
                    ]}
                    mode="single"
                    selected={chosenDate}
                    onSelect={setChosenDate}
                    footer={
                      chosenDate
                        ? `Selected: ${chosenDate.toLocaleDateString()}`
                        : "Pick a day."
                    }
                  />
                </div>
                <div>
                  {availableSlots.length > 0 ? (
                    <ul className="flex gap-2 flex-wrap justify-center">
                      {availableSlots.map((slot, index) => (
                        <li
                          key={index}
                          className={`border p-2 cursor-pointer ${
                            selectedSlot === slot
                              ? "bg-[#041340] text-white"
                              : ""
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot?.startTime} - {slot?.endTime}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No available slots for the selected date.</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleBookingSubmission}
                className="mt-4 px-4 py-2 bg-[#041340] text-white rounded"
              >
                Confirm Booking
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingAppointment;
