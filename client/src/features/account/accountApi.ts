import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/user";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    login: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: `login?useCookies=true`,
          method: "POST",
          body: creds,
        };
      },
    }),
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: `account/register`,
          method: "POST",
          body: creds,
        };
      },
    }),
    userInfo: builder.query<User, void>({
      query: () => "account/user-info",
    }),
    logout: builder.mutation({
      query: () => ({
        url: `logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  accountApi;
