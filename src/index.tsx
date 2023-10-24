import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AppRouter from "./AppRouter";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.globals.css";
import { ClerkProvider } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (!process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key not found!");
}

const clerkPubKey = process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <NavigationProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </NavigationProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
