import React from "react";
import Doctorcard from "../components/doctorcard";
import { Stethoscope } from "lucide-react";

function Doctor() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
          <Stethoscope size={25} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">Doctors</h1>
        <p className="mt-3 text-slate-600">Connect with available specialists for follow-up guidance.</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <Doctorcard
          name="Dr. Amit Sharma"
          specialization="General Physician"
          experience="10 Years"
        />

        <Doctorcard
          name="Dr. Priya Verma"
          specialization="Cardiologist"
          experience="8 Years"
        />
        <Doctorcard
          name="Dr. Priya "
          specialization="Cardiologist"
          experience="8 Years"
        />


        <Doctorcard
          name="Dr. Rahul Mehta"
          specialization="Dermatologist"
          experience="6 Years"
        />
      </div>
    </div>
  );
}

export default Doctor;
