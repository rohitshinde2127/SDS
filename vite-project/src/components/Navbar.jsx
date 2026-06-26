import React from "react";
import { Link } from "react-router-dom";
import {SignedIn,UserButton,useUser} from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const role = localStorage.getItem("selectedRole");

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-10 py-4 flex justify-between">

        <Link
          to={role === "doctor" ? "/DoctorDashboard" : "/home"}
          className="text-2xl font-bold text-blue-600 tracking-wide">
          SDS
        </Link>

        <div className="flex items-center gap-8 text-gray-700 font-medium">

        
          {isSignedIn && role === "patient" && (
            <>
            <Link to="/Symptoms">Symptoms</Link>
            <Link to="/Doctor">Doctor</Link>
            </>
          )}

          {isSignedIn && role === "doctor" && (
            <div className="text-gray-500 font-medium">
              Doctor Dashboard
            </div>
          )}


          <SignedIn>
            <UserButton appearance={{
            elements: {avatarBox: "w-10 h-10"
                }}}
            />
          </SignedIn>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;