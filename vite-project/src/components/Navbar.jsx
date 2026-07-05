import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Activity, LogOut, MessageSquareText, Stethoscope } from "lucide-react";

const NavbarLayout = ({ isSignedIn, role, children }) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-primary/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        <Link
          to={role === "doctor" ? "/DoctorDashboard" : "/home"}
          className="inline-flex items-center gap-2 text-xl font-bold tracking-wide text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Activity size={20} />
          </span>
          <span>SDS</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 sm:gap-3">

          {isSignedIn && role === "patient" && (
            <>
            <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-950" to="/Symptoms">
              <MessageSquareText size={17} />
              <span className="hidden sm:inline">Symptoms</span>
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-950" to="/Doctor">
              <Stethoscope size={17} />
              <span className="hidden sm:inline">Doctor</span>
            </Link>
            </>
          )}

          {isSignedIn && role === "doctor" && (
            <div className="rounded-full bg-cyan-50 px-3 py-2 text-cyan-800">
              Doctor Dashboard
            </div>
          )}

          {children}
        </div>
      </div>
    </nav>
  );
};

const ClerkNavbar = () => {
  const { isSignedIn, user } = useUser();
  const role = isSignedIn && user ? user.unsafeMetadata?.role || localStorage.getItem("selectedRole") : null;

  return (
    <NavbarLayout isSignedIn={isSignedIn} role={role}>
      <SignedIn>
        <UserButton appearance={{
        elements: {avatarBox: "w-10 h-10"
            }}}
        />
      </SignedIn>
    </NavbarLayout>
  );
};

const DemoNavbar = () => {
  const role = localStorage.getItem("selectedRole");
  const isSignedIn = Boolean(role);

  const logout = () => {
    localStorage.removeItem("selectedRole");
    window.location.href = "/";
  };

  return (
    <NavbarLayout isSignedIn={isSignedIn} role={role}>
      {isSignedIn && (
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      )}
    </NavbarLayout>
  );
};

const Navbar = ({ authEnabled = true }) => (
  authEnabled ? <ClerkNavbar /> : <DemoNavbar />
);

export default Navbar;
