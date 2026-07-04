import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Stethoscope, UserRound } from "lucide-react";

const Auth = ({ authEnabled = true }) => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("selectedRole", role);

    if (!authEnabled) {
      navigate(role === "doctor" ? "/DoctorDashboard" : "/home");
    }
  };

  const patientButton = (
    <button
      onClick={() => selectRole("patient")}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/15 hover:-translate-y-0.5 hover:bg-teal-700">
      <UserRound size={19} />
      Patient Login
    </button>
  );

  const doctorButton = (
    <button
      onClick={() => selectRole("doctor")}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-800" >
      <Stethoscope size={19} />
      Doctor Login
    </button>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-cyan-950 to-teal-700 px-4 py-24 text-white">

    <div className="w-full max-w-2xl text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 text-teal-100 ring-1 ring-white/20">
        <ShieldCheck size={28} />
      </div>

    <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to SDS</h1>
     <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-cyan-50/85 sm:text-lg">
          Choose the workspace that matches your visit today.</p>

      <div className="grid gap-4 rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur sm:grid-cols-2">

        {authEnabled ? (
          <SignInButton forceRedirectUrl="/">
            {patientButton}
          </SignInButton>
        ) : patientButton}

        {authEnabled ? (
          <SignInButton forceRedirectUrl="/">
            {doctorButton}
          </SignInButton>
        ) : doctorButton}

        </div>

      </div>
    </div>
  );
};

export default Auth;
