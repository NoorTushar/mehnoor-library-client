import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import AddBooKModal from "./modules/books/AddBookModal";

const Navbar = () => {
   // states for adding a book === start ===
   const [openAddBookModal, setOpenAddBookModal] = useState(false);
   // states for adding a book === end ===
   return (
      <div className="py-4 shadow-md shadow-primary px-6">
         <div className="flex items-center justify-between max-w-[1200px] mx-auto">
            <h2 className="text-2xl text-amber-600 dark:text-amber-400">
               <Link to={"/"}> MehNoor Library</Link>
            </h2>
            <div className="gap-3 flex items-center">
               <Link to={"/books"}>Books</Link>
               <p
                  className="cursor-pointer"
                  onClick={() => setOpenAddBookModal(true)}
               >
                  Add Book
               </p>
               <Link to={"/borrowSummary"}>Borrow Summary</Link>
               <ModeToggle />
            </div>
         </div>

         {/* Modal for adding a book == start*/}
         {openAddBookModal && (
            <AddBooKModal
               open={openAddBookModal}
               setOpen={setOpenAddBookModal}
            />
         )}
         {/* Modal for adding a book == end*/}
      </div>
   );
};

export default Navbar;
