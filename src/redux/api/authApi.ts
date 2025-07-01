import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TResponseRedux } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const stringUser = localStorage.getItem('userInfo');
      if (stringUser) {
        const userInfo = JSON.parse(stringUser)
        if (userInfo?.token) {
          headers.set('Authorization', `Bearer ${userInfo.token}`);
          headers.set('Content-Type', 'application/json');
        }
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),

    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signin",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: TResponseRedux) => {
        return {
          email: response.data.email,
          token: response.token,
          _id: response.data._id,
          role: response.data.role
        }
      },
    }),

  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
} = authApi;
