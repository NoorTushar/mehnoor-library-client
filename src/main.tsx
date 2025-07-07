import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router";
import router from "./routes/index.ts";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router}></RouterProvider>
         <ToastContainer />
      </Provider>
   </StrictMode>
);
