import { baseApi } from "../baseApi";

const additionalInformationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdditionalInformation: builder.mutation({
      query: (data) => ({
        url: "/additional-information",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdditionalInformation"],
    }),
    viewAdditionalInformation: builder.query({
      query: (id) => `/additional-information/${id}`,
      providesTags: ["AdditionalInformation"],
    }),
  }),
});

export const {
  useAddAdditionalInformationMutation,
  useViewAdditionalInformationQuery,
} = additionalInformationApi;
