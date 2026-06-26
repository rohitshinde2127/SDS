import React from "react";
import Doctorcard from "../components/doctorcard";

function Doctor() {
  return (
    <div className="p-15 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-gray-800 font-bold text-center mb-8">Doctors</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
         name="Dr. Rahul Mehta"
          specialization="Dermatologist"
          experience="6 Years"
        />
      </div>
    </div>
  );
}

export default Doctor;