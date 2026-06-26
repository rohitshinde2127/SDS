import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doctorsDB } from "../utils/analysisLogic";
import { 
  Send, ShieldAlert, ArrowLeft, MoreVertical, Paperclip, 
  Smile, Heart, Calendar, FileText, CheckCheck, User 
} from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Retrieve active doctor from localStorage, default to doctor 1
  const doctorId = localStorage.getItem("activeDoctorId") || "doc-1";
  const doctor = doctorsDB.find(d => d.id === doctorId) || doctorsDB[0];

  const initials = doctor.name.split(" ").map(n => n[0]).join("").replace("Dr", "");

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initial welcome message from the doctor
    setMessages([
      {
        id: "msg-init",
        sender: "doctor",
        text: `Hello! I'm ${doctor.name}, a specialist in ${doctor.specialization}. I've received your diagnostic inquiry. How can I help you today?`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [doctor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickReplies = [
    "What are the side effects of the suggested medicine?",
    "Should I book an in-person appointment?",
    "When should I follow up if symptoms persist?"
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Send user message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate doctor typing
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = "Understood. Please keep monitoring your temperature and stay hydrated. Let me know if you experience worsening symptoms.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("side effect") || lowerText.includes("medicine")) {
        replyText = `Regarding the suggested medicine: make sure to take it after meals. Watch out for minor drowsiness. If you notice any allergic rash, stop immediately.`;
      } else if (lowerText.includes("in-person") || lowerText.includes("appointment") || lowerText.includes("book")) {
        replyText = `An in-person consult is always ideal for physical exams. My clinic is open from 9 AM to 5 PM. Feel free to click "Book Visit" to schedule a slot.`;
      } else if (lowerText.includes("follow up") || lowerText.includes("persist")) {
        replyText = `If there is no improvement within 48 to 72 hours, or if you develop new symptoms like dizziness or acute pain, seek a clinical follow-up immediately.`;
      }

      const doctorMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "doctor",
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, doctorMsg]);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pt-16 font-sans text-slate-900">
      
      {/* Chat Room Frame */}
      <div className="flex-1 max-w-4xl mx-auto w-full bg-white sm:my-4 sm:rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden flex flex-col">
        
        {/* Chat Room Header */}
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => navigate("/Doctor")}
              className="p-2 hover:bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Doctor Profile info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${doctor.avatarColor} text-white font-extrabold flex items-center justify-center shadow-sm`}>
                  {initials}
                </div>
                {/* Active pulse */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/20 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-none">
                  {doctor.name}
                </h3>
                <span className="text-xs text-slate-400 font-semibold mt-1 inline-block">
                  {doctor.specialization} • Active Now
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="hidden sm:flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 hover:bg-blue-100/40 text-blue-600 text-xs px-3.5 py-2 rounded-xl font-bold transition cursor-pointer">
              <Calendar className="w-3.5 h-3.5" />
              Book Clinic Visit
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HIPAA Disclaimer Header */}
        <div className="bg-amber-50/50 border-b border-amber-100/50 px-6 py-2.5 flex items-center gap-2 text-amber-700 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
          <span>HIPAA-Compliant Secure Consultation. All records and communications are encrypted.</span>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 px-6 py-6 overflow-y-auto bg-slate-50/40 space-y-4 min-h-[350px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-3xl p-4 shadow-sm border ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white rounded-tr-xs"
                    : "bg-white border-slate-100 text-slate-800 rounded-tl-xs"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                <div className={`flex items-center gap-1 justify-end mt-1.5 text-[10px] ${
                  msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                }`}>
                  <span>{msg.time}</span>
                  {msg.sender === "user" && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm rounded-tl-xs flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length === 1 && !isTyping && (
          <div className="px-6 py-3 border-t border-slate-100 bg-white">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
              Common Follow-Ups:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply)}
                  className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-blue-500 hover:bg-blue-50/20 text-slate-600 hover:text-blue-600 transition-all cursor-pointer text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Bar */}
        <div className="border-t border-slate-100 p-4 bg-white">
          <div className="flex gap-3 items-center">
            
            <button className="p-2.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition shrink-0 cursor-pointer">
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Type your medical query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
              className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 hover:bg-slate-50/50 focus:bg-white transition text-sm text-slate-800 placeholder-slate-400"
            />
            
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 text-white p-3 rounded-2xl transition duration-200 cursor-pointer shrink-0 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15"
            >
              <Send className="w-4.5 h-4.5" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;