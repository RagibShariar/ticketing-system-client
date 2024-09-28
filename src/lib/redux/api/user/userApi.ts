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
  }),
});

export const { useUpdateUserMutation, useGetUserInfoQuery } = userApi;
