import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">History</h1>
          <button
            onClick={clearHistory}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Clear History
          </button>
        </div>

        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow">
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="mt-2">
                  <b>Symptoms:</b> {item.symptoms}
                </p>
                <pre className="mt-3 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border">
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