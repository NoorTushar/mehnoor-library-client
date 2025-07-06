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
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { IBook } from "@/types";
import { Check, Edit, HandIcon, Trash2, X } from "lucide-react";
import { useState } from "react";

const Books = () => {
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
   const [deleteId, setDeleteId] = useState<string | null>(null);

   const { data, isLoading } = useGetBooksQuery(undefined);
   const [deleteBook] = useDeleteBookMutation();
   console.log(data?.data);

   const handleDeleteBook = async () => {
      console.log({ deleteId });

      if (!deleteId) {
         return;
      }

      try {
         await deleteBook(deleteId);

         setDeleteId(null);
         setOpenDeleteModal(false);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <section>
         <h3>All Books List</h3>

         {/* Table */}
         <Table className="max-w-6xl mx-auto">
            <TableCaption>A list of all books.</TableCaption>
            <TableHeader>
               <TableRow className="*:text-center *:border">
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
                              <Check className="text-green-500 mx-auto size-5" />
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

         <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This will delete the book from the server.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteBook}>
                     Continue
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </section>
   );
};

export default Books;
