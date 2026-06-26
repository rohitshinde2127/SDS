import React, { useState } from "react";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const sendMessage = () => {
    
    if (!input.trim()) return;        // If input is empty or only spaces → stop execution.
    setMessages((prev) => [...prev, { sender: "user", text: input }]);      //spread operator
    setInput("");

    setTimeout(() => {+
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
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 text-black">
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Start conversation with the doctor </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`px-5 py-3 rounded-2xl max-w-xs ${msg.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-black"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/*for user Input*/}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none text-black" />
          <button onClick={sendMessage} className="bg-blue-600 text-white px-6 py-2 rounded-full">
            Send </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;