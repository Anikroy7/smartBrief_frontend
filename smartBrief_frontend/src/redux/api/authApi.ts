import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TResponseRedux } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ['Users'],
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
      providesTags: ['Users'],
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
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/users/update/${userId}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ['Users'],

    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Users'],

    }),

  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = authApi;
