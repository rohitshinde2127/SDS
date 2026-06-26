import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Stethoscope, ArrowRight, ShieldCheck, HeartPulse, 
  Clock, Sparkles, Pill, AlertTriangle, ChevronRight, CheckCircle2, 
  WifiOff, ArrowLeft 
} from "lucide-react";
import { analyzeSymptomsLocal, parseAIResponse, getRecommendedDoctor } from "../utils/analysisLogic";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [parsedResult, setParsedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const navigate = useNavigate();

  const symptomPresets = [
    { label: "Chest pain & pressure", text: "Severe chest pain radiating to left arm and shoulder with shortness of breath." },
    { label: "Fever & body ache", text: "High fever of 102F since last night accompanied by severe dry cough, headache and throat pain." },
    { label: "Severe head throbbing", text: "Sudden severe head throbbing on one side with temporary vision blur and nausea." },
    { label: "Stomach burning & pain", text: "Stomach ache with extreme burning sensation after meals and acidic reflux." },
    { label: "Itchy red rash", text: "Itchy red rash on both forearms spreading slowly, very dry and irritated skin." }
  ];

  const saveToHistory = (symptomsText, rawText, parsedObj, offline) => {
    const oldHistory = JSON.parse(localStorage.getItem("history")) || [];

    const newEntry = {
      id: Date.now(),
      symptoms: symptomsText,
      result: rawText,
      parsedResult: parsedObj,
      isOffline: offline,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    localStorage.setItem("history", JSON.stringify([newEntry, ...oldHistory]));
  };

  const handlePresetClick = (presetText) => {
    setSymptoms(presetText);
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setParsedResult(null);
    setIsOfflineMode(false);

    try {
      // Attempting query to Ollama instance running locally
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "phi3",
          prompt: `
You are a medical assistant.

Reply strictly in this exact format.
Keep answers short and clear.
Do not add extra explanation.
Maximum 6-8 lines only.

Condition:
Severity: Low / Moderate / High
Suggested Medicine:
Doctor Type:
Advice: (2 short lines only)

Symptoms: ${symptoms}
`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Local Ollama endpoint responded with error status");
      }

      const data = await response.json();
      const parsed = parseAIResponse(data.response);
      setParsedResult(parsed);
      saveToHistory(symptoms, data.response, parsed, false);

    } catch (error) {
      console.warn("Ollama unavailable, invoking clinical local fallback engine:", error);
      
      // Offline fallback
      setIsOfflineMode(true);
      const parsed = analyzeSymptomsLocal(symptoms);
      
      // Simulate slight delay for rich clinical feel
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setParsedResult(parsed);
      
      // Convert parsed to raw string for history compatibility
      const rawFallback = `Condition: ${parsed.condition}\nSeverity: ${parsed.severity}\nSuggested Medicine: ${parsed.suggestedMedicine}\nDoctor Type: ${parsed.doctorType}\nAdvice: ${parsed.advice.join(". ")}`;
      saveToHistory(symptoms, rawFallback, parsed, true);
    }

    setLoading(false);
  };

  // Get matching doctor
  const recommendedDoctor = parsedResult ? getRecommendedDoctor(parsedResult.doctorType) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/home")}
              className="p-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Symptom Checker
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Initial diagnostic screening assistant.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer shadow-xs"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            Review Diagnostic History
          </button>
        </div>

        {/* Main Grid: Input Form & Results */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Presets */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Analyze Physical Discomfort
            </h2>

            <textarea
              className="w-full border border-slate-200 rounded-2xl p-4 mb-6 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm leading-relaxed"
              rows="6"
              placeholder="Describe your symptoms in detail (e.g. fever, headaches, sore throat, how long you've felt them...)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            {/* Presets */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Or select a common template to test:
              </span>
              <div className="flex flex-wrap gap-2">
                {symptomPresets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(p.text)}
                    className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 text-slate-600 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeSymptoms}
              disabled={loading || !symptoms.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-semibold py-3.5 rounded-2xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running Neural Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Execute AI Diagnosis
                </>
              )}
            </button>
          </div>

          {/* Right Column: Dynamic Diagnosis Output Dashboard */}
          <div className="lg:col-span-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-[420px] shadow-xl shadow-slate-100/50"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center relative mb-4">
                    <Activity className="w-8 h-8 text-blue-600 animate-pulse" />
                    <div className="absolute inset-0 rounded-2xl border border-blue-500 animate-ping opacity-25" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-800">Evaluating Patient Record</h3>
                  <p className="text-slate-400 text-sm max-w-xs mt-2">
                    Running NLP text analysis and extracting clinical guidance from knowledge engines.
                  </p>
                </motion.div>
              ) : parsedResult ? (
                <motion.div
                  key="result-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 space-y-6"
                >
                  {/* Result Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {isOfflineMode ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                          <WifiOff className="w-3 h-3" />
                          Offline Fallback Engine
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                          <ShieldCheck className="w-3 h-3" />
                          AI Evaluated
                        </span>
                      )}
                      
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Potential Condition</h3>
                      <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-0.5">
                        {parsedResult.condition}
                      </h2>
                    </div>

                    {/* Severity Badge */}
                    <div className="shrink-0">
                      {parsedResult.severity.toLowerCase() === "high" && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-100 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping shrink-0" />
                          High Severity
                        </span>
                      )}
                      {parsedResult.severity.toLowerCase() === "moderate" && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 font-extrabold text-xs px-3 py-1.5 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                          Moderate
                        </span>
                      )}
                      {parsedResult.severity.toLowerCase() === "low" && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-xs px-3 py-1.5 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          Low Severity
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100" />

                  {/* Suggested Medicine & Guidelines */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Pill className="w-3.5 h-3.5 text-blue-500" />
                        Suggested Relief
                      </span>
                      <p className="text-sm font-bold text-slate-700 leading-normal">
                        {parsedResult.suggestedMedicine}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Stethoscope className="w-3.5 h-3.5 text-indigo-500" />
                        Recommended Team
                      </span>
                      <p className="text-sm font-bold text-slate-700 leading-normal">
                        {parsedResult.doctorType} Specialist
                      </p>
                    </div>
                  </div>

                  {/* Advice List */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                      Actionable Medical Advice:
                    </span>
                    <ul className="space-y-2.5">
                      {parsedResult.advice.map((item, index) => (
                        <li key={index} className="flex gap-2.5 items-start text-sm text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specialist Match (Doctor Card Integration) */}
                  {recommendedDoctor && (
                    <div className="border border-blue-100 bg-blue-50/20 p-5 rounded-3xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
                            Available Specialist Match
                          </span>
                          <h4 className="font-extrabold text-slate-800 text-lg leading-snug">
                            {recommendedDoctor.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            {recommendedDoctor.specialization} • {recommendedDoctor.experience} Exp
                          </p>
                        </div>

                        {/* Custom Avatar Gradient Initials */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${recommendedDoctor.avatarColor} text-white font-extrabold flex items-center justify-center shadow-md shrink-0`}>
                          {recommendedDoctor.name.split(" ").map(n => n[0]).join("").replace("Dr", "")}
                        </div>
                      </div>

                      <div className="flex gap-3 items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-semibold">
                          Consultation Fee: <b className="text-slate-700">{recommendedDoctor.fee}</b>
                        </span>
                        <button
                          onClick={() => navigate("/chat")}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition duration-200 cursor-pointer"
                        >
                          Consult Now
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {parsedResult.severity.toLowerCase() === "high" && (
                    <div className="flex gap-3 bg-rose-50 border border-rose-100 p-4 rounded-2xl text-rose-700">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed font-semibold">
                        <b>Emergency Disclaimer:</b> High severity symptom detected. AI diagnosis is not a substitute for direct professional emergency services. If your condition worsens or you experience acute chest pressure, visit the nearest hospital emergency room immediately.
                      </p>
                    </div>
                  )}

                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[420px] shadow-xl shadow-slate-100/50"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                    <HeartPulse className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg">Diagnostics Panel</h3>
                  <p className="text-slate-400 text-sm max-w-xs mt-2 leading-relaxed">
                    Provide symptoms on the left workspace and run evaluation to see structured medical reporting.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Symptoms;