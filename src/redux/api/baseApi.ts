import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
   reducerPath: "baseApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://mehnoorlibrary.vercel.app/api",
   }),
   tagTypes: ["book", "borrow"],
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: () => "/books",
         providesTags: ["book"],
      }),
      getBookById: builder.query({
         query: (id) => `/books/${id}`,
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
      editBook: builder.mutation({
         query: ({ id, ...body }) => ({
            url: `/books/${id}`,
            method: "PUT",
            body,
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

      addBorrowBook: builder.mutation({
         query: (borrowData) => ({
            url: "/borrow",
            method: "POST",
            body: borrowData,
         }),
         invalidatesTags: ["book", "borrow"],
      }),

      getBorrowBook: builder.query({
         query: () => "/borrow",
         providesTags: ["borrow", "book"],
      }),
   }),
});

export const {
   useGetBooksQuery,
   useDeleteBookMutation,
   useAddBookMutation,
   useGetBookByIdQuery,
   useEditBookMutation,
   useAddBorrowBookMutation,
   useGetBorrowBookQuery,
} = baseApi;
