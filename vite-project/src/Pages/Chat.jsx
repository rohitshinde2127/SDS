import React, { useState } from "react";
import { MessageCircle, SendHorizontal } from "lucide-react";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const sendMessage = () => {
    
    if (!input.trim()) return;        // If input is empty or only spaces → stop execution.
    setMessages((prev) => [...prev, { sender: "user", text: input }]);      //spread operator
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "doctor",
          text: "Thanks for your message. Please monitor your symptoms and consult a doctor if it gets worse.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 pt-24 text-slate-900">
    <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4">
        {messages.length === 0 && (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            <MessageCircle className="mx-auto mb-3 text-cyan-700" size={28} />
            Start conversation with the doctor
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-xs rounded-lg px-5 py-3 shadow-sm ${msg.sender === "user"
                ? "bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-800"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <div className="mx-auto flex max-w-3xl gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-100" />
          <button onClick={sendMessage} className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700">
            <SendHorizontal size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
