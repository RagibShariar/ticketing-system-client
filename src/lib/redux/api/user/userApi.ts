import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/user`,
        method: "PATCH",
        body: userData,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
    }),
    getEmailSuggestions: builder.query({
      query: (email) => `user/suggestions?email=${email}`,
    }),
    getUserDetails: builder.query({
      query: (email) => `user/details?email=${email}`,
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetUserInfoQuery,
  useGetEmailSuggestionsQuery,
  useLazyGetUserDetailsQuery,
} = userApi;
