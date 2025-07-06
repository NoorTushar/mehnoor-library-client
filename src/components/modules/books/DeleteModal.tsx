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

interface DeleteModalProps {
   openDeleteModal: boolean;
   setOpenDeleteModal: (open: boolean) => void;
   handleDeleteBook: () => void;
}

const DeleteModal = ({
   openDeleteModal,
   setOpenDeleteModal,
   handleDeleteBook,
}: DeleteModalProps) => {
   return (
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
   );
};

export default DeleteModal;
