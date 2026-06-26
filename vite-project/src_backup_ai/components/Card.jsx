import React from "react";
import { ArrowUpRight } from "lucide-react";

const Card = ({ title, description }) => {
  // Extract number prefix if exists (e.g., "1. State Your Symptoms" -> number "01")
  const match = title.match(/^(\d+)\.\s*(.*)/);
  const number = match ? `0${match[1]}` : null;
  const cleanTitle = match ? match[2] : title;

  return (
    <div className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        <div className="flex justify-between items-start mb-6">
          {number ? (
            <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100/50">
              {number}
            </span>
          ) : (
            <span className="w-1.5 h-6 rounded-full bg-blue-600 block" />
          )}
          
          <div className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
          {cleanTitle}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

export default Card;