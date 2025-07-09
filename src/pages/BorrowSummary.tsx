import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useGetBorrowBookQuery } from "@/redux/api/baseApi";
import type { IBorrow } from "@/types";

const BorrowSummary = () => {
   const { data: borrowList, isLoading } = useGetBorrowBookQuery(undefined);

   return (
      <section className="max-w-[1200px] mx-auto px-6 min-h-[calc(100vh-68px)] pt-6">
         <h3 className="text-primary uppercase text-2xl mb-4 tracking-wider">
            Borrow Summary
         </h3>

         <div className="max-w-6xl mx-auto">
            <Table className="">
               <TableCaption>A list of all books.</TableCaption>
               <TableHeader>
                  <TableRow className="*:text-center *:border bg-secondary">
                     <TableHead className="w-[70px]">Sl.No</TableHead>
                     <TableHead>Title</TableHead>
                     <TableHead>ISBN</TableHead>
                     <TableHead>Total Quantity</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {!isLoading &&
                     borrowList.data.map((borrow: IBorrow, index: number) => (
                        <TableRow className="*:border" key={borrow._id}>
                           <TableCell className="font-medium text-center">
                              {index + 1}
                           </TableCell>
                           <TableCell>{borrow.book.title}</TableCell>
                           <TableCell>{borrow.book.isbn}</TableCell>
                           <TableCell>{borrow.totalQuantity}</TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </div>
      </section>
   );
};

export default BorrowSummary;
