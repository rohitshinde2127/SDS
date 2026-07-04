import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { ArrowRight, Bot, ClipboardCheck, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
            <ShieldCheck size={16} />
            Patient-first health guidance
          </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          AI powered symptom checks, made easier to understand
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Describe your symptoms and get instant AI-based
          health guidance with severity level and doctor recommendation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/Symptoms">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 hover:bg-slate-800">
            Start Symptom Check
            <ArrowRight size={18} />
          </button>
        </Link>
          <Link to="/Doctor">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-800">
              <Stethoscope size={18} />
              Find a Doctor
            </button>
          </Link>
        </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-950">24/7</p>
              <p className="mt-1 text-xs font-medium text-slate-500">AI support</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-950">3</p>
              <p className="mt-1 text-xs font-medium text-slate-500">severity levels</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-950">Fast</p>
              <p className="mt-1 text-xs font-medium text-slate-500">next steps</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
          <div className="rounded-lg bg-linear-to-br from-teal-50 via-white to-cyan-50 p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Current Check</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">Symptom snapshot</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600 text-white">
                <HeartPulse size={24} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-500">Input</p>
                <p className="mt-2 text-slate-800">Fever, sore throat, and fatigue for two days.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-700">Severity</p>
                  <p className="mt-2 text-xl font-bold text-amber-900">Moderate</p>
                </div>
                <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                  <p className="text-sm font-semibold text-cyan-700">Doctor Type</p>
                  <p className="mt-2 text-xl font-bold text-cyan-950">Physician</p>
                </div>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                Rest, hydrate, monitor temperature, and consult a doctor if symptoms worsen.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-20 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-950">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card icon={ClipboardCheck} title="1. Enter Symptoms"
            description="Describe your symptoms in simple language." />
          <Card icon={Bot} title="2. AI Analysis"
            description="Our AI model analyzes condition and severity."/>
          <Card icon={HeartPulse} title="3. Get Guidance"
            description="Receive medicine suggestion and doctor type." />
            
        </div>
      </section>

      <div className="px-4 py-20 text-center sm:px-6">
        <h2 className="mb-6 text-3xl font-bold text-slate-950">
          Take Control of Your Health Today
        </h2>

        <Link to="/Symptoms">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-800">
            Check Now
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>

    </div>
  );
}
