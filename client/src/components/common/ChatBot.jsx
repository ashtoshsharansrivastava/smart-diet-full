import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // 👈 Import Axios
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your SmartDiet AI. Ask me about nutrition or how to use this app!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message immediately
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 👇 REAL API CALL
      // Use "http://localhost:5000" for local testing, or your Render URL for production
      const BACKEND_URL = "https://smart-diet-full.onrender.com"; 
      
      const { data } = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: userMsg.text
      });

      // 2. Add Bot Response
      const botMsg = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to the server.", sender: 'bot' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-display">
      {/* ... (Keep the UI JSX exactly the same as before) ... */}
      
      {/* COPY THE RETURN JSX FROM THE PREVIOUS FILE HERE - IT IS UNCHANGED */}
      {/* If you need me to paste the full UI code again, let me know! */}
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up mb-2">
          
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                <Bot size={18} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Smart Assistant</h3>
                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-emerald-500/20'}`}>
                    {msg.sender === 'user' ? <User size={12} className="text-slate-300" /> : <Sparkles size={12} className="text-emerald-400" />}
                  </div>

                  {/* Bubble */}
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                   <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                     <Bot size={12} className="text-emerald-400" />
                   </div>
                   <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none flex gap-1">
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                     <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about diet, pricing, or experts..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 p-2.5 rounded-xl transition-all"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 ${
          isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} className="fill-current" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;