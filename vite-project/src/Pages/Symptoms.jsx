import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, FileClock, Loader2, SendHorizontal } from "lucide-react";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getHistory = () => {
    try {
      return JSON.parse(localStorage.getItem("history")) || [];
    } catch {
      return [];
    }
  };

  const saveToHistory = (symptoms, result) => {
    const oldHistory = getHistory();

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
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-ultra-550b-a55b:free",

          messages: [
            {
              role: "system",
              content: `You are a medical assistant.

Reply strictly in this exact format.
Keep answers short and clear.
Do not add extra explanation.
Maximum 6-8 lines only.

Condition:
Severity: Low / Moderate /High
Suggested Medicine:
Doctor Type:
Advice: (2 short lines only)`
            },
            {
              role: "user",
              content: `Symptoms: ${symptoms}`
            }
          ],

          temperature: 0.4,
          max_tokens: 250
        }),
      }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();

      const aiResponse =
        data.choices?.[0]?.message?.content || "No response received.";

      setResult(aiResponse);

      saveToHistory(symptoms, aiResponse);
    } catch (error) {
      console.error("OpenRouter Error:", error);
      setResult("Unable to connect to OpenRouter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <BrainCircuit size={25} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Symptoms Checker
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Share what you are feeling and SDS will organize the response into condition, severity, doctor type, and advice.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-8">
          <textarea
            className="min-h-36 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100"
            rows="5"
            placeholder="Example: fever, sore throat, headache for two days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={analyzeSymptoms}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <SendHorizontal size={18} />}
              {loading ? "Analyzing" : "Analyze"}
            </button>

            <button
              onClick={() => navigate("/history")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-800"
            >
              <FileClock size={18} />
              View History
            </button>
          </div>

          {loading && (
            <p className="mt-4 text-sm font-medium text-slate-500">Analyzing symptoms...</p>
          )}

          {result && (
            <div className="mt-8 whitespace-pre-wrap rounded-lg border border-teal-100 bg-teal-50/60 p-5 text-slate-800">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
