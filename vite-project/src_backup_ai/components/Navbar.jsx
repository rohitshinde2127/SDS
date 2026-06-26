import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Activity, Stethoscope, History as HistoryIcon, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const role = localStorage.getItem("selectedRole");
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
    ${isActive(path) 
      ? "bg-blue-50 text-blue-600 shadow-xs border border-blue-100/50" 
      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}
  `;

  const mobileNavLinkClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
    ${isActive(path) 
      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}
  `;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/75 backdrop-blur-lg border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link
            to={role === "doctor" ? "/DoctorDashboard" : "/home"}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent tracking-tight leading-none block">
                SDS
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Symptom Diagnosis
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn && role === "patient" && (
              <>
                <Link to="/home" className={navLinkClass("/home")}>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link to="/Symptoms" className={navLinkClass("/Symptoms")}>
                  <Activity className="w-4 h-4" />
                  Symptom Checker
                </Link>
                <Link to="/Doctor" className={navLinkClass("/Doctor")}>
                  <Stethoscope className="w-4 h-4" />
                  Consult Doctor
                </Link>
                <Link to="/history" className={navLinkClass("/history")}>
                  <HistoryIcon className="w-4 h-4" />
                  Medical History
                </Link>
              </>
            )}

            {isSignedIn && role === "doctor" && (
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold">
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Portal</span>
              </div>
            )}

            <div className="pl-4 border-l border-slate-200 ml-2">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-white shadow-sm ring-1 ring-slate-100 hover:ring-blue-500/50 transition-all duration-300",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border border-slate-100 shadow-xs",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {isSignedIn && role === "patient" && (
              <>
                <Link to="/home" className={mobileNavLinkClass("/home")} onClick={() => setIsOpen(false)}>
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link to="/Symptoms" className={mobileNavLinkClass("/Symptoms")} onClick={() => setIsOpen(false)}>
                  <Activity className="w-5 h-5" />
                  Symptom Checker
                </Link>
                <Link to="/Doctor" className={mobileNavLinkClass("/Doctor")} onClick={() => setIsOpen(false)}>
                  <Stethoscope className="w-5 h-5" />
                  Consult Doctor
                </Link>
                <Link to="/history" className={mobileNavLinkClass("/history")} onClick={() => setIsOpen(false)}>
                  <HistoryIcon className="w-5 h-5" />
                  Medical History
                </Link>
              </>
            )}

            {isSignedIn && role === "doctor" && (
              <div className="px-4 py-3 bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-semibold rounded-r-xl flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Doctor Portal Active
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;