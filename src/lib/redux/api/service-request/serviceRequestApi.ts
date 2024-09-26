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
      query: ({ email, id, days }) => {
        // Build query parameters
        const queryParams = new URLSearchParams();

        if (email) queryParams.append("email", email);
        if (id) queryParams.append("id", id);
        if (days) queryParams.append("days", days);

        const queryString = queryParams.toString();

        return {
          url: `/service-request/all${queryString ? `?${queryString}` : ""}`, // Only append ? if query string exists
          method: "GET",
        };
      },
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
