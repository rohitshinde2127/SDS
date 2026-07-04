import React, { useState } from "react";
import { FileClock, Trash2 } from "lucide-react";

const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("history")) || [];
  } catch {
    return [];
  }
};

const History = () => {
  const [history, setHistory] = useState(loadHistory);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
              <FileClock size={23} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">History</h1>
            <p className="mt-2 text-slate-600">Previous symptom checks saved on this device.</p>
          </div>
          <button
            onClick={clearHistory}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:-translate-y-0.5 hover:bg-rose-700"
          >
            <Trash2 size={17} />
            Clear History
          </button>
        </div>

        {history.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No history yet.
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">{item.date}</p>
                <p className="mt-3 text-slate-800">
                  <span className="font-semibold text-slate-950">Symptoms:</span> {item.symptoms}
                </p>
                <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-700">
                  {item.result}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
