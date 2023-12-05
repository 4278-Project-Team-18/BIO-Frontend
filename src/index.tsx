import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AppRouter from "./AppRouter";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.globals.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (!process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key not found!");
}

const clerkPubKey = process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

root.render(
  <React.StrictMode>
    <UserProvider>
      <ClerkProvider publishableKey={clerkPubKey}>
        <NavigationProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AppRouter />
        </NavigationProvider>
      </ClerkProvider>
    </UserProvider>
  </React.StrictMode>,
);
