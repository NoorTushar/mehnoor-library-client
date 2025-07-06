import App from "@/App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
   {
      path: "/",
      Component: App,
      children: [
         //  {
         //     path: "/books",
         //     Component: User,
         //  },
         //  {
         //     path: "/tasks",
         //     Component: Tasks,
         //  },
      ],
   },
]);

export default router;
