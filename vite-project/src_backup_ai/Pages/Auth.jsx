import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Activity, Stethoscope, User, ShieldCheck, Heart, Sparkles } from "lucide-react";

const Auth = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-slate-50 text-slate-900 font-sans">
      
      {/* Left Pane - Marketing & Info (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:col-span-7 bg-linear-to-br from-blue-600 to-indigo-800 text-white p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Background Decorative Rings */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-12 -translate-x-12 pointer-events-none" />

        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider uppercase">SDS Dashboard</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="max-w-xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-white/10 backdrop-blur-md text-white/90 text-xs px-3.5 py-1.5 rounded-full font-semibold border border-white/15 inline-flex items-center gap-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Advanced Health Assistant
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Empowering Smart Care <br />
              With AI-Driven Analysis.
            </h1>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed">
              Describe your symptoms in natural language, receive instant diagnostic insights, and chat securely with verified medical experts.
            </p>
          </motion.div>

          {/* Feature Bullets */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <Heart className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Symptom Checker</h3>
                <p className="text-xs text-blue-200 mt-0.5">Real-time condition mapping.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Verified Doctors</h3>
                <p className="text-xs text-blue-200 mt-0.5">Direct chat with specialists.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-blue-200/60">
          © {new Date().getFullYear()} SDS System. All rights reserved. Secure HIPAA-compliant data encryption.
        </div>
      </div>

      {/* Right Pane - Authentication Card */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8 lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome to SDS
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Please select your profile to sign in or create an account.
            </p>
          </div>

          {/* Cards for Role Selection */}
          <div className="space-y-4">
            
            {/* Patient Option */}
            <SignInButton forceRedirectUrl="/">
              <button
                onClick={() => localStorage.setItem("selectedRole", "patient")}
                className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 group transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                      Patient Portal
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                      Access Check
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1 leading-normal">
                    Check your symptoms, view diagnostic reports, and consult specialized medical experts.
                  </p>
                </div>
              </button>
            </SignInButton>

            {/* Doctor Option */}
            <SignInButton forceRedirectUrl="/">
              <button
                onClick={() => localStorage.setItem("selectedRole", "doctor")}
                className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 group transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                      Doctor Portal
                    </span>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      Clinician Only
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1 leading-normal">
                    Manage appointments, inspect symptom history, and chat securely with patients.
                  </p>
                </div>
              </button>
            </SignInButton>

          </div>

          {/* Visual Indicator of Clerk Integration */}
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Secured & Authenticated via Clerk
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Auth;