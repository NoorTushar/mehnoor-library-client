import App from "@/App";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
   {
      path: "/",
      Component: App,
      children: [
         { path: "/", Component: Home },
         { path: "/books", Component: Books },
         { path: "/borrowSummary", Component: BorrowSummary },
         //  {
         //     path: "/tasks",
         //     Component: Tasks,
         //  },
      ],
   },
]);

export default router;
