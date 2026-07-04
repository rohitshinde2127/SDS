import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/signin.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const app = PUBLISHABLE_KEY ? (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInUrl="/signin">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App authEnabled />} />
        <Route path="/signin/*" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  </ClerkProvider>
) : (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App authEnabled={false} />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>{app}</StrictMode>
);
