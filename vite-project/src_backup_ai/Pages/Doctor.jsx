import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctorcard from "../components/doctorcard";
import { doctorsDB } from "../utils/analysisLogic";
import { Search, Filter, Sparkles, ArrowLeft, HeartPulse } from "lucide-react";

function Doctor() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // Get unique specialties list for filter chips
  const specialties = ["All", ...new Set(doctorsDB.map(doc => doc.specialization))];

  // Filter logic
  const filteredDoctors = doctorsDB.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = 
      selectedSpecialty === "All" || 
      doc.specialization === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/home")}
              className="p-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Medical Specialists
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Consult with certified healthcare professionals.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            24/7 Virtual Consulting Active
          </span>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/50 mb-8 space-y-5">
          <div className="grid md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors by name or medical specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 hover:bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder-slate-400 text-slate-800"
              />
            </div>

            {/* Helper text info */}
            <div className="md:col-span-4 flex items-center justify-end text-xs text-slate-400 font-bold gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Filtering {filteredDoctors.length} of {doctorsDB.length} Doctors</span>
            </div>

          </div>

          {/* Specialty Filter Chips */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition duration-200 cursor-pointer ${
                    selectedSpecialty === spec
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                      : "bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-slate-600"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Directory Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <Doctorcard key={doc.id} {...doc} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-md mx-auto shadow-md">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HeartPulse className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Specialists Found</h3>
            <p className="text-slate-400 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
              We couldn't find any doctor matching your current filters. Try resetting the search or specialty filter chip.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All");
              }}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Doctor;