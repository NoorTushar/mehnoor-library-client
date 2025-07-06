import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
   reducerPath: "baseApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://mehnoorlibrary.vercel.app/api",
   }),
   tagTypes: ["book"],
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: () => "/books",
         providesTags: ["book"],
      }),
      //   createTask: builder.mutation({
      //      query: (taskData) => ({
      //         url: "/tasks",
      //         method: "POST",
      //         body: taskData,
      //      }),
      //      invalidatesTags: ["task"],
      //   }),
      //   deleteTask: builder.mutation({
      //      query: (taskId) => ({
      //         url: `/tasks/${taskId}`,
      //         method: "DELETE",
      //      }),
      //      invalidatesTags: ["task"],
      //   }),
   }),
});

export const {
   useGetBooksQuery,
   //    useCreateTaskMutation,
   //    useDeleteTaskMutation,
} = baseApi;
