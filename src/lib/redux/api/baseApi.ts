import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";


const baseQuery = fetchBaseQuery({
  // baseUrl: "https://sports-facilit-booking-platform.vercel.app/api",
  // baseUrl: "http://localhost:5000/api",
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});