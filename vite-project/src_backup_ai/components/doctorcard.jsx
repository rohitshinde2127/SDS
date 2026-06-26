import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Clock, MessageSquare, Calendar, Sparkles } from "lucide-react";

function Doctorcard({ id, name, specialization, experience, rating, reviews, availability, avatarColor, fee }) {
  const navigate = useNavigate();

  // Create initials for Doctor avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .replace("Dr", "");

  const isToday = availability.toLowerCase().includes("today");

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Verified Ribbon */}
      <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-100 flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        Verified
      </div>

      <div>
        {/* Doctor Header */}
        <div className="flex gap-4 items-center mb-5">
          {/* Avatar Icon */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColor || "from-blue-400 to-indigo-600"} text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-slate-200 shrink-0`}>
            {initials}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1">
              {name}
            </h2>
            <p className="text-sm font-semibold text-blue-600">{specialization}</p>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">{experience} Experience</p>
          </div>
        </div>

        {/* Ratings and Info */}
        <div className="flex items-center gap-4 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="text-xs font-bold text-slate-700">{rating}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {reviews} Patients Checked
          </span>
        </div>

        {/* Consultation Fee & Availability */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">Consultation Fee</span>
            <span className="font-extrabold text-slate-800">{fee}</span>
          </div>
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">Next Availability</span>
            <span className={`font-bold flex items-center gap-1 ${isToday ? "text-emerald-600" : "text-amber-600"}`}>
              <Clock className="w-3 h-3" />
              {availability}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5">
        <button
          onClick={() => navigate("/chat")}
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl transition duration-200 cursor-pointer shadow-sm shadow-blue-500/10"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat Now
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs py-3 rounded-xl transition duration-200 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          Book Visit
        </button>
      </div>

    </div>
  );
}

export default Doctorcard;