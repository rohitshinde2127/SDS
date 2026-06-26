import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/signin.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInUrl="/signin">
      <BrowserRouter>
        <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/signin/*" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
