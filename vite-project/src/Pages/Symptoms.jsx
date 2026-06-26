import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const saveToHistory = (symptoms, result) => {
    const oldHistory = JSON.parse(localStorage.getItem("history")) || [];

    const newEntry = {
      id: Date.now(),
      symptoms,
      result,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("history", JSON.stringify([newEntry, ...oldHistory]));
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult("");

    try {
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

      const data = await response.json();
      setResult(data.response);

      //Save to history
      saveToHistory(symptoms, data.response);
    } catch (error) {
      console.error("Ollama Error:", error);
      setResult("Error connecting to AI");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-gray-800 font-bold text-center mb-10">
          Symptoms Checker
        </h1>

        <div className="bg-white p-10 rounded-2xl shadow-lg">
          <textarea
            className="w-full border border-gray-300 rounded-xl p-4 mb-6 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              onClick={analyzeSymptoms}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Analyze
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-gray-700 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              View History
            </button>
          </div>

          {loading && (
            <p className="mt-4 text-gray-600">Analyzing symptoms...</p>
          )}

          {result && (
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl whitespace-pre-wrap">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Symptoms;