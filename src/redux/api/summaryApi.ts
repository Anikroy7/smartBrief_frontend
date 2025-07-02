import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const summaryApi = createApi({
  reducerPath: "summaryApi",
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
    createSummary: builder.mutation({
      query: (data) => ({
        url: "/summary/create",
        method: "POST",
        body: data,
      }),
    }),

    getSummary: builder.query({
      query: (id) => ({
        url: `/summary/${id}`,
        method: "GET",
      }),
    }),

    getUserSummaries: builder.query({
      query: () => ({
        url: `/summary/all`, 
        method: "GET",
      }),
    }),

    deleteSummary: builder.mutation({
      query: (summaryId) => ({
        url: `/summary/${summaryId}`, 
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSummaryMutation,
  useGetSummaryQuery,
  useLazyGetSummaryQuery,
  useGetUserSummariesQuery,  
  useDeleteSummaryMutation,  
} = summaryApi;
