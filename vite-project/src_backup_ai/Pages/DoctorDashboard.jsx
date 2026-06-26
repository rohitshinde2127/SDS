import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Calendar, AlertTriangle, Activity, TrendingUp, 
  MessageSquare, ChevronRight, CheckCircle2, Clock, 
  User, ClipboardList, ShieldCheck, Heart 
} from "lucide-react";
import { parseAIResponse } from "../utils/analysisLogic";

const DoctorDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [patientReports, setPatientReports] = useState([]);

  useEffect(() => {
    // Load patient symptom history from local storage to act as inbound clinical screenings
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    const finalized = saved.map(item => {
      if (!item.parsedResult) {
        return {
          ...item,
          parsedResult: parseAIResponse(item.result)
        };
      }
      return item;
    });
    setPatientReports(finalized);
  }, []);

  const handleFollowUp = (report) => {
    // Store patient information to simulate chat engagement
    localStorage.setItem("activePatientName", "Patient Intake Report");
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Clinician Welcome Banner */}
        <div className="bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Practitioner Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Welcome, Dr. {user?.firstName || "Clinician"}
              </h1>
              <p className="text-slate-500 text-sm mt-1 leading-normal">
                Oversee intake diagnostics, review incoming clinical screenings, and chat securely with patients.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Today's Date</span>
            <span className="text-slate-700 font-extrabold text-sm sm:text-base mt-1 block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Clinical Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 relative overflow-hidden">
            <div className="absolute right-4 top-4 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Patients Managed</span>
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-3xl font-extrabold text-slate-800">28</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-2">Active practitioners growth index</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 relative overflow-hidden">
            <div className="absolute right-4 top-4 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Appointments Scheduled</span>
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-3xl font-extrabold text-slate-800">8</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                5 Complete
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-2">3 pending clinical slots remaining</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 relative overflow-hidden">
            <div className="absolute right-4 top-4 w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Inbound Diagnostics Feed</span>
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-3xl font-extrabold text-slate-800">
                {patientReports.filter(r => r.parsedResult?.severity.toLowerCase() === "high").length}
              </span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                Urgent High Alert
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-2">Flagged severe cases requiring triage</span>
          </div>

        </div>

        {/* Intake Reports & Scheduled Slots section */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Inbound Patient Screening (Dynamic connection!) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Inbound Diagnostic Screenings
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Real-time patient self-reports from AI screening logs.
              </p>
            </div>

            {patientReports.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100/80 p-8 rounded-2xl text-center">
                <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-semibold text-slate-500 block">No Patient Screenings Logged</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Patient intakes will display in real-time.</span>
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {patientReports.map((report) => {
                  const severity = report.parsedResult?.severity || "Low";
                  const isHigh = severity.toLowerCase() === "high";
                  const isModerate = severity.toLowerCase() === "moderate";

                  return (
                    <div 
                      key={report.id} 
                      className={`p-4 rounded-2xl border transition duration-200 hover:border-slate-300 ${
                        isHigh 
                          ? "bg-rose-50/20 border-rose-100" 
                          : isModerate 
                            ? "bg-amber-50/20 border-amber-100" 
                            : "bg-slate-50/50 border-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                          <User className="w-3.5 h-3.5" />
                          <span>Anonymous Patient</span>
                          <span className="text-slate-300">•</span>
                          <span>{report.date}</span>
                        </div>

                        {/* Severity Badge */}
                        {isHigh && (
                          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md">
                            High
                          </span>
                        )}
                        {isModerate && (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md">
                            Moderate
                          </span>
                        )}
                        {!isHigh && !isModerate && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md">
                            Low
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-700 font-semibold mb-3">
                        Symptoms: <span className="text-slate-500 font-normal italic">"{report.symptoms}"</span>
                      </div>

                      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100/50">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Assessed Condition</span>
                          <span className="text-xs font-bold text-slate-700">{report.parsedResult?.condition}</span>
                        </div>

                        <button 
                          onClick={() => handleFollowUp(report)}
                          className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] px-3 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Follow Up
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Grid: Scheduled Appointments */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Recent Appointments
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Overview of clinical consults scheduled for today.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              
              {/* Appointment 1 */}
              <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                    RS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-none">Rahul Sharma</h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 inline-block">28 Feb 2026 • General Checkup</span>
                  </div>
                </div>
                
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Completed
                </span>
              </div>

              {/* Appointment 2 */}
              <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                    AV
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-none">Amit Verma</h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 inline-block">28 Feb 2026 • Cardiac Followup</span>
                  </div>
                </div>
                
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                  Pending
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;