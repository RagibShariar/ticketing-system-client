import { baseApi } from "../baseApi";

const spentTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSpentTime: builder.mutation({
      query: (data) => ({
        url: "/spent-time",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SpentTime"],
    }),
    getSpentTime: builder.query({
      query: (serviceId) => ({
        url: `/spent-time/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["SpentTime"],
    }),
  }),
});

export const { useAddSpentTimeMutation, useGetSpentTimeQuery } = spentTimeApi;
