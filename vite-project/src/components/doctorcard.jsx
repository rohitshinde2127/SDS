import React from "react";
import { useNavigate } from "react-router-dom";

function Doctorcard({ name, specialization, experience }) {
  const navigate = useNavigate();

  return (

    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <h2 className="text-2xl text-gray-900 font-bold">{name}</h2>
      <p className="text-gray-600">{specialization}</p>
      <p className="text-gray-500 text-sm">{experience}</p>
      <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4"> ✔ Verified Doctor </div>

      <button
        onClick={() => navigate("/chat")}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        Chat Now
      </button>
    </div>
  );
}

export default Doctorcard;