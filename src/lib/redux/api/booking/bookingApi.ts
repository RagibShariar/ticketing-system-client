import { baseApi } from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailability: builder.mutation({
      query: (data) => ({
        url: `/booking/available-slots`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: `/booking`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getBookings: builder.query({
      query: (serviceRequestId) => ({
        url: `/booking/${serviceRequestId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAvailabilityMutation,
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
