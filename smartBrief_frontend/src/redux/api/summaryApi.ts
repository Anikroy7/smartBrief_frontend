import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const summaryApi = createApi({
  reducerPath: "summaryApi",
  tagTypes: ['Summaries'],
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
    rePromptSummary: builder.mutation({
      query: (summaryData) => ({
        url: `/summary/re-prompt`,
        method: "PATCH",
        body: summaryData,
      }),
      invalidatesTags: ["Summaries"],
    }),
    updateSummary: builder.mutation({
      query: ({ summaryId, updatedData }) => ({
        url: `/summary/update/${summaryId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ['Summaries']
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
      providesTags: ["Summaries"]

    }),

    deleteSummary: builder.mutation({
      query: (summaryId) => ({
        url: `/summary/delete/${summaryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Summaries']
    }),
  }),
});

export const {
  useCreateSummaryMutation,
  useGetSummaryQuery,
  useLazyGetSummaryQuery,
  useGetUserSummariesQuery,
  useDeleteSummaryMutation,
  useUpdateSummaryMutation,
  useRePromptSummaryMutation
} = summaryApi;
