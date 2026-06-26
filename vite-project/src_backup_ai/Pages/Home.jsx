import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Stethoscope, ArrowRight, ShieldCheck, HeartPulse, Clock, Sparkles, Brain, Plus } from "lucide-react";
import Card from "../components/Card";

export default function Home() {
  const [latestCheck, setLatestCheck] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length > 0) {
      setLatestCheck(history[0]);
    }
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-16 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center text-center">
        
        {/* Soft Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tagline Badge */}
          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/60 text-blue-700 text-xs px-4 py-2 rounded-full font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
            AI-Powered Clinical Guidance System
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Intelligent Health Analysis <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Right at Your Fingertips
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Describe your physical discomfort in simple words. Get immediate, AI-driven guidance, severity metrics, and recommended medical specialists in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/Symptoms">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                <Activity className="w-5 h-5" />
                Start Symptom Check
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
            
            <Link to="/Doctor">
              <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Consult Doctors
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Quick Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full mx-auto mt-20 p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
          <div className="text-center p-2 border-r border-slate-100">
            <p className="text-3xl font-extrabold text-blue-600">24/7</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Instant Support</p>
          </div>
          <div className="text-center p-2 md:border-r border-slate-100">
            <p className="text-3xl font-extrabold text-slate-800">100%</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">HIPAA Secure</p>
          </div>
          <div className="text-center p-2 border-r border-slate-100">
            <p className="text-3xl font-extrabold text-slate-800">Phi-3 / AI</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Powered Engine</p>
          </div>
          <div className="text-center p-2">
            <p className="text-3xl font-extrabold text-blue-600">4 Verified</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Specialist Teams</p>
          </div>
        </div>
      </section>

      {/* Conditional Recent Assessment Widget (Human touch!) */}
      {latestCheck && (
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-200/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Latest Symptom Analysis ({latestCheck.date})
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">
                  Symptoms: <span className="font-semibold text-slate-600 italic">"{latestCheck.symptoms.length > 50 ? `${latestCheck.symptoms.slice(0, 50)}...` : latestCheck.symptoms}"</span>
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  View your diagnostic details or initiate a doctor chat directly.
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <Link to="/history" className="flex-1 md:flex-initial">
                <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 cursor-pointer">
                  View Report
                </button>
              </Link>
              <Link to="/Doctor" className="flex-1 md:flex-initial">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-xs transition duration-200 cursor-pointer">
                  Consult Doctor
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 bg-white border-y border-slate-100 px-6 sm:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Simplifying Clinical Diagnosis
            </h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto">
              Follow our simple three-step validation flow to analyze your discomfort.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              title="1. State Your Symptoms"
              description="Simply type your symptoms as you would describe them to a friend. No complex medical jargon is required."
            />
            <Card
              title="2. Neural Evaluation"
              description="Our specialized clinical intelligence engine evaluates the severity scale, potential condition types, and medications."
            />
            <Card
              title="3. Guided Action"
              description="Receive structured actionable advice, warnings, and directly request real-time consultation with a qualified doctor."
            />
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Take Control of Your Health Today
          </h2>
          <p className="text-blue-100/75 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Don't leave mild symptoms unchecked. Let our AI screening agent run an initial evaluation and route you to the correct specialists instantly.
          </p>

          <Link to="/Symptoms">
            <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition duration-200 cursor-pointer">
              Launch Diagnostic
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}