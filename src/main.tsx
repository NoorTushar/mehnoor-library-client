import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router";
import router from "./routes/index.ts";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./provider/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Provider store={store}>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer theme="colored" />
         </ThemeProvider>
      </Provider>
   </StrictMode>
);
