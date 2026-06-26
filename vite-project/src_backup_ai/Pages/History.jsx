import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Search, Calendar, HeartPulse, Clock, Sparkles, 
  Pill, Stethoscope, ChevronRight, AlertTriangle, ArrowLeft 
} from "lucide-react";
import { parseAIResponse, getRecommendedDoctor } from "../utils/analysisLogic";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    // Ensure all items have a parsedResult for rendering
    const finalized = saved.map(item => {
      if (!item.parsedResult) {
        return {
          ...item,
          parsedResult: parseAIResponse(item.result)
        };
      }
      return item;
    });
    setHistory(finalized);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to permanently delete all medical diagnostic logs?")) {
      localStorage.removeItem("history");
      setHistory([]);
    }
  };

  // Filter history
  const filteredHistory = history.filter(item => {
    const textMatch = 
      item.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.parsedResult?.condition || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const severityMatch = 
      severityFilter === "All" || 
      (item.parsedResult?.severity || "").toLowerCase() === severityFilter.toLowerCase();

    return textMatch && severityMatch;
  });

  const handleConsultDoctor = (doctorType) => {
    const recommended = getRecommendedDoctor(doctorType);
    if (recommended) {
      localStorage.setItem("activeDoctorId", recommended.id);
    }
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/Symptoms")}
              className="p-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Medical Records
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Review your historical AI symptom screenings.
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 font-bold px-4 py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear Diagnostic Logs
            </button>
          )}
        </div>

        {/* History Empty State or Controls */}
        {history.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-xl shadow-slate-100/50 max-w-md mx-auto mt-12">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Screening History Yet</h3>
            <p className="text-slate-400 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
              You haven't run any symptom evaluations yet. Check in with the AI screening agent to see your dashboard logs.
            </p>
            <button
              onClick={() => navigate("/Symptoms")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition duration-200 cursor-pointer"
            >
              Analyze Symptoms Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Search & Filter bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search history by symptoms or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Severity filter chips */}
              <div className="flex gap-1.5 overflow-x-auto shrink-0 py-0.5">
                {["All", "High", "Moderate", "Low"].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`text-[10px] font-bold px-3 py-2 rounded-lg border transition duration-200 cursor-pointer ${
                      severityFilter === sev
                        ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* List Stream */}
            <div className="space-y-6">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, idx) => {
                  const parsed = item.parsedResult;
                  const severity = parsed?.severity || "Low";

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Timeline top bar indicator */}
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-100" />
                      
                      {/* Entry Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 mb-4 border-b border-slate-50 pb-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{item.date}</span>
                          {item.isOffline && (
                            <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase ml-1">
                              Offline Engine
                            </span>
                          )}
                        </div>

                        {/* Severity Indicator */}
                        <div>
                          {severity.toLowerCase() === "high" && (
                            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-100 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                              High Severity
                            </span>
                          )}
                          {severity.toLowerCase() === "moderate" && (
                            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              Moderate
                            </span>
                          )}
                          {severity.toLowerCase() === "low" && (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              Low Severity
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Symptoms Summary */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                          Reported Symptoms:
                        </span>
                        <p className="text-slate-700 text-sm font-semibold italic bg-slate-50/50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                          "{item.symptoms}"
                        </p>
                      </div>

                      {/* Parsed AI output layout */}
                      <div className="grid sm:grid-cols-12 gap-5 mt-4">
                        
                        {/* Condition and specialist columns */}
                        <div className="sm:col-span-8 space-y-4">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              AI Assessed Condition
                            </span>
                            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg tracking-tight mt-0.5">
                              {parsed?.condition || "General Symptoms Check"}
                            </h3>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 border border-slate-100/60 p-3 rounded-xl">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                                <Pill className="w-3 h-3 text-blue-500" />
                                Medication
                              </span>
                              <span className="text-xs font-bold text-slate-700 block truncate">
                                {parsed?.suggestedMedicine || "Rest / OTC"}
                              </span>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-100/60 p-3 rounded-xl">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                                <Stethoscope className="w-3 h-3 text-indigo-500" />
                                Recommended Specialist
                              </span>
                              <span className="text-xs font-bold text-slate-700 block truncate">
                                {parsed?.doctorType || "Physician"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Call to action panel */}
                        <div className="sm:col-span-4 flex flex-col justify-end">
                          <button
                            onClick={() => handleConsultDoctor(parsed?.doctorType)}
                            className="w-full flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 text-blue-700 font-bold text-xs py-3 rounded-xl transition duration-200 cursor-pointer mt-1"
                          >
                            Consult Specialist
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-sm mx-auto shadow-sm">
                  <span className="text-slate-400 text-sm font-semibold">No matches found.</span>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Try adjusting the search query or severity filter setting.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default History;