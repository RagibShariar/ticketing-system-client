import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    verifyLogin: builder.mutation({
      query: (verifyLoginData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: verifyLoginData,
      }),
    }),
    signUp: builder.mutation({
      query: (signUpData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/auth/reset-password/${token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;