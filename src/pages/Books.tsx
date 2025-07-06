import { useGetBooksQuery } from "@/redux/api/baseApi";
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

const Books = () => {
   const [openDeleteModal, setOpenDeleteModal] = useState(false);

   const { data, isLoading } = useGetBooksQuery(undefined);
   console.log(data?.data);
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
                              <Trash2 className="text-red-500  mx-auto cursor-pointer size-5" />
                              <HandIcon className="text-primary  mx-auto cursor-pointer size-5" />
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
            </TableBody>
         </Table>
      </section>
   );
};

export default Books;
