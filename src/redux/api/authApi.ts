import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TResponseRedux } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1`,
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
    getUsers: builder.query({
      query: () => "/users/all",
    }),
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create",
          method: "POST",
          body: data,
        };
      },
    }),
    updateUserName: builder.mutation({
      query: ({ userId, name }) => ({
        url: `/users/${userId}/name`,
        method: "PATCH",
        body: { name },
      }),
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
          token: response.accessToken,
          _id: response.data._id,
          role: response.data.role
        }
      },
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateUserNameMutation
} = authApi;
