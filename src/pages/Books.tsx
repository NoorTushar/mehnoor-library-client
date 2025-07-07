import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

import type { IBook } from "@/types";
import { Check, Edit, HandIcon, Trash2, X } from "lucide-react";
import { useState } from "react";
import DeleteModal from "@/components/modules/books/DeleteModal";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import AddBooKModal from "@/components/modules/books/AddBookModal";

const Books = () => {
   // states for deleting a book === start ===
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
   const [deleteId, setDeleteId] = useState<string | null>(null);
   // states for deleting a book === end ===

   // states for adding a book === start ===
   const [openAddBookModal, setOpenAddBookModal] = useState(false);
   // states for adding a book === end ===

   // RTK Query for getting books
   const { data, isLoading } = useGetBooksQuery(undefined);
   console.log(data?.data);

   // RTK Mutation for deleting a book
   const [deleteBook] = useDeleteBookMutation();

   // Final delete book function === start ===
   const handleDeleteBook = async () => {
      if (!deleteId) {
         return;
      }

      try {
         await deleteBook(deleteId);
         toast.success("Book deleted successfully!");
         setDeleteId(null);
         setOpenDeleteModal(false);
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error("Book could not be deleted");
         }
      }
   };
   // Final delete book function === end ===

   return (
      <section className="max-w-[1200px] mx-auto px-6">
         <h3 className="text-primary uppercase text-3xl mb-4 tracking-wider">
            Books List
         </h3>

         {/* Table */}
         <div className="max-w-6xl mx-auto">
            <Button className="mb-4" onClick={() => setOpenAddBookModal(true)}>
               Add Book
            </Button>
            <Table className="">
               <TableCaption>A list of all books.</TableCaption>
               <TableHeader>
                  <TableRow className="*:text-center *:border bg-secondary">
                     <TableHead className="w-[70px]">Sl.No</TableHead>
                     <TableHead>Title</TableHead>
                     <TableHead>Author</TableHead>
                     <TableHead>Genre</TableHead>
                     <TableHead>ISBN</TableHead>
                     <TableHead>Copies</TableHead>
                     <TableHead>Availability</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!isLoading &&
                     data.data.map((book: IBook, index: number) => (
                        <TableRow className="*:border">
                           <TableCell className="font-medium text-center">
                              {index + 1}
                           </TableCell>
                           <TableCell>{book.title}</TableCell>
                           <TableCell>{book.author}</TableCell>
                           <TableCell>{book.genre}</TableCell>
                           <TableCell>{book.isbn}</TableCell>
                           <TableCell>{book.copies}</TableCell>
                           <TableCell className="">
                              {book.available ? (
                                 <Check className="text-green-700 mx-auto size-5" />
                              ) : (
                                 <X className="text-red-500  mx-auto size-5" />
                              )}
                           </TableCell>
                           <TableCell className="text-right min-w-[100px]">
                              <div className="flex gap-2 items-center">
                                 <Edit className="text-primary  mx-auto cursor-pointer size-5" />
                                 <Trash2
                                    onClick={() => {
                                       setOpenDeleteModal(true);
                                       setDeleteId(book._id);
                                    }}
                                    className="text-red-500  mx-auto cursor-pointer size-5"
                                 />
                                 <HandIcon className="text-primary  mx-auto cursor-pointer size-5" />
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </div>

         {/* Modal for confirming a book deletion == start*/}
         <DeleteModal
            handleDeleteBook={handleDeleteBook}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
         />
         {/* Modal for confirming a book deletion == end*/}

         {/* Modal for adding a book == start*/}
         <AddBooKModal open={openAddBookModal} setOpen={setOpenAddBookModal} />
         {/* Modal for adding a book == end*/}
      </section>
   );
};

export default Books;
