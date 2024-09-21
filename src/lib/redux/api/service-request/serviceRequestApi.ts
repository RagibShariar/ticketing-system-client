import { baseApi } from "../baseApi";

const serviceRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (data) => ({
        url: `/service-request`,
        method: "POST",
        body: data,
      }),
    }),
    viewServices: builder.query({
      query: () => ({
        url: `/service-request`,
        method: "GET",
      }),
    }),
    viewAllServices: builder.query({
      query: () => ({
        url: `/service-request/all`,
        method: "GET",
      }),
    }),
    changeStatus: builder.mutation({
      query: () => ({
        url: `/service-request/change-status`,
        method: "PATCH", 
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useViewServicesQuery,
  useViewAllServicesQuery,
} = serviceRequestApi;
