import React from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, MessageCircle, Stethoscope } from "lucide-react";

function Doctorcard({ name, specialization, experience }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
        <Stethoscope size={24} />
      </div>

      <h2 className="text-xl font-bold text-slate-950">{name}</h2>
      <p className="mt-1 text-slate-600">{specialization}</p>
      <p className="mt-1 text-sm text-slate-500">{experience} experience</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <BadgeCheck size={14} />
        Verified Doctor
      </div>

      <button
        onClick={() => navigate("/chat")}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-slate-800"
      >
        <MessageCircle size={18} />
        Chat Now
      </button>
    </div>
  );
}

export default Doctorcard;
