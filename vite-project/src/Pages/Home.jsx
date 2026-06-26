import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="bg-[#f5f6f7] text-[#2f2f33]">
   <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">
        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
          AI Powered <span className="text-blue-600">Symptoms Detection</span> System
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Describe your symptoms and get instant AI-based
          health guidance with severity level and doctor recommendation.
        </p>

        <Link to="/Symptoms">
          <button className="mt-8 bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition">
            Start Symptom Check
          </button>
        </Link>
      </section>

      <section className="py-20 bg-gray-200 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card title="1. Enter Symptoms"
            description="Describe your symptoms in simple language." />
          <Card title="2. AI Analysis"
            description="Our AI model analyzes condition and severity."/>
          <Card title="3. Get Guidance"
            description="Receive medicine suggestion and doctor type." />
            
        </div>
      </section>

      <div className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Take Control of Your Health Today
        </h2>

        <Link to="/Symptoms">
          <button className="border border-gray-400 px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Check Now
          </button>
        </Link>
      </div>

    </div>
  );
}