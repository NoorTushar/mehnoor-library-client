import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useAddBorrowBookMutation } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";

interface IBorrowBookModalProps {
   open: boolean;
   setOpen: (open: boolean) => void;
   bookId: string | null;
   setBookId: (editId: string | null) => void;
}

const BorrowBookModal = ({
   open,
   setOpen,
   bookId,
   setBookId,
}: IBorrowBookModalProps) => {
   const form = useForm();
   const [addBorrowBook, { isLoading }] = useAddBorrowBookMutation();
   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const borrowData = {
         ...data,
         book: bookId,
      };
      try {
         const res = await addBorrowBook(borrowData).unwrap();
         toast.success(res.message);
         form.reset();
         setBookId(null);
         setOpen(false);
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         console.log(error.data.message);

         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error(error.data.message);
         }
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         {/* <DialogTrigger asChild>
            <Button variant="default">Add Task</Button>
         </DialogTrigger> */}

         <DialogContent className="sm:max-w-[425px]">
            <DialogDescription>
               Fill up this form to borrow a book.
            </DialogDescription>
            <DialogTitle className="sr-only"></DialogTitle>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  {/* quantity field */}
                  <FormField
                     control={form.control}
                     name="quantity"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Quantity</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 value={field.value || ""}
                                 type="number"
                                 required={true}
                                 placeholder="Enter quantity"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Date Picker */}
                  <FormField
                     control={form.control}
                     name="dueDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Due Date</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value &&
                                             "text-muted-foreground"
                                       )}
                                    >
                                       {field.value ? (
                                          format(field.value, "PPP")
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                 className="w-auto p-0"
                                 align="start"
                              >
                                 <Calendar
                                    required={true}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={
                                       (date) => date < new Date()
                                       //    date < new Date("1900-01-01")
                                    }
                                    captionLayout="dropdown"
                                 />
                              </PopoverContent>
                           </Popover>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <DialogFooter>
                     <Button
                        className="w-[100px] cursor-pointer"
                        disabled={isLoading}
                        type="submit"
                     >
                        {isLoading ? (
                           <ImSpinner9 className="animate-spin" />
                        ) : (
                           "Submit"
                        )}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default BorrowBookModal;
