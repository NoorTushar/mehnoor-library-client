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
      addBook: builder.mutation({
         query: (bookData) => ({
            url: "/books",
            method: "POST",
            body: bookData,
         }),
         invalidatesTags: ["book"],
      }),
      deleteBook: builder.mutation({
         query: (bookId) => ({
            url: `/books/${bookId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["book"],
      }),
   }),
});

export const { useGetBooksQuery, useDeleteBookMutation, useAddBookMutation } =
   baseApi;
