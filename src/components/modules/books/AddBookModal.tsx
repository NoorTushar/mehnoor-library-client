import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormDescription,
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

interface IAddBooKModalProps {
   open: boolean;
   setOpen: (open: boolean) => void;
}

const AddBooKModal = ({ open, setOpen }: IAddBooKModalProps) => {
   const form = useForm();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      console.log(data);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         {/* <DialogTrigger asChild>
            <Button variant="default">Add Task</Button>
         </DialogTrigger> */}
         <DialogContent className="sm:max-w-[425px]">
            <DialogDescription className="sr-only">
               Fill up this form to add task.
            </DialogDescription>
            <DialogTitle className="sr-only"></DialogTitle>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* title field */}
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input {...field} value={field.value || ""} />
                           </FormControl>
                           <FormDescription>Enter task title.</FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* description field */}
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea {...field} value={field.value || ""} />
                           </FormControl>
                           <FormDescription>
                              Enter task description.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Select priority */}
                  <FormField
                     control={form.control}
                     name="priority"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Priority</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select task priority" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="High">High</SelectItem>
                                 <SelectItem value="Medium">Medium</SelectItem>
                                 <SelectItem value="Low">Low</SelectItem>
                              </SelectContent>
                           </Select>
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
                  />

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
