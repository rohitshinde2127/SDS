import React from "react";
import { SignInButton } from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-teal-400 text-white">

    <div className="text-center">

    <h1 className="text-5xl font-bold mb-4">
          Welcome to SDS</h1>
     <p className="mb-10 text-lg opacity-90">
          Select your role to continue</p>

      <div className="flex gap-8 justify-center">

        <SignInButton forceRedirectUrl="/">
            <button
              onClick={() => localStorage.setItem("selectedRole", "patient")}
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
              Patient Login
            </button>
          </SignInButton>

          <SignInButton forceRedirectUrl="/">
            <button
              onClick={() => localStorage.setItem("selectedRole", "doctor")}
              className="bg-black text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300" >
              Doctor Login
            </button>
          </SignInButton>

        </div>

      </div>
    </div>
  );
};

export default Auth;