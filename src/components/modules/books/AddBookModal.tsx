import { Button } from "@/components/ui/button";

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
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface IAddBooKModalProps {
   open: boolean;
   setOpen: (open: boolean) => void;
}

const AddBooKModal = ({ open, setOpen }: IAddBooKModalProps) => {
   const form = useForm();
   const [addBook] = useAddBookMutation();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      data.copies = Number(data.copies);
      if (data.available) {
         if (data.available === "yes") {
            data.available = true;
         } else if (data.available === "no") {
            data.available = false;
         }
      } else {
         data.available = true;
      }

      console.log(data);

      try {
         await addBook(data);
         toast.success("Book added successfully!");

         setOpen(false);
         form.reset();
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error("Book could not be added");
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
               Fill up this form to add a book.
            </DialogDescription>
            <DialogTitle className="sr-only"></DialogTitle>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  {/* title field */}
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 value={field.value || ""}
                                 placeholder="Enter book title"
                                 required={true}
                              />
                           </FormControl>
                           {/* <FormDescription>Enter book title.</FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* author field */}
                  <FormField
                     control={form.control}
                     name="author"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Author Name</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 value={field.value || ""}
                                 placeholder="Enter author name"
                                 required={true}
                              />
                           </FormControl>
                           {/* <FormDescription>Enter book title.</FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Select genre */}
                  <FormField
                     control={form.control}
                     name="genre"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Genre</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              required={true}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select book genre" />
                                 </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                 <SelectItem value="FICTION">
                                    Fiction
                                 </SelectItem>
                                 <SelectItem value="NON_FICTION">
                                    Non Fiction
                                 </SelectItem>
                                 <SelectItem value="SCIENCE">
                                    Science
                                 </SelectItem>
                                 <SelectItem value="HISTORY">
                                    History
                                 </SelectItem>
                                 <SelectItem value="BIOGRAPHY">
                                    Biography
                                 </SelectItem>
                                 <SelectItem value="FANTASY">
                                    Fantasy
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* isbn field */}
                  <FormField
                     control={form.control}
                     name="isbn"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>ISBN</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 value={field.value || ""}
                                 placeholder="Enter unique ISBN"
                                 required={true}
                              />
                           </FormControl>
                           {/* <FormDescription>Enter book title.</FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* copies field */}
                  <FormField
                     control={form.control}
                     name="copies"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Copies</FormLabel>
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

                  {/* Select availability */}
                  <FormField
                     control={form.control}
                     name="available"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Available?</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              required={true}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Is the book available?" />
                                 </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                 <SelectItem value={"yes"}>Yes</SelectItem>
                                 <SelectItem value={"no"}>No</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Date Picker */}
                  {/* <FormField
                     control={form.control}
                     name="dueDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Date of birth</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={"outline"}
                                       className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
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
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date >= new Date() ||
                                       date < new Date("1900-01-01")
                                    }
                                    captionLayout="dropdown"
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormDescription>
                              Your date of birth is used to calculate your age.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  /> */}

                  <DialogFooter>
                     <Button type="submit">Submit</Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default AddBooKModal;
