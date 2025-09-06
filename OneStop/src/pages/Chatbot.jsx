import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/generate-content",
        { message: input }
      );

      const botMessage = {
        role: "bot",
        text: response.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot request failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full shadow-lg bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="w-80 h-96 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-purple-500/40 bg-gradient-to-br from-gray-900 via-black to-purple-950"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-700 text-white p-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-200" />
              <span className="font-semibold">AI sathi</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5 text-white hover:text-gray-300" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-2 rounded-xl max-w-[75%] text-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white ml-auto shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white shadow"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {loading && (
              <div className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 w-fit shadow animate-pulse">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 p-2 border-t border-purple-500/30 bg-black/60"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-purple-500/50 bg-black/50 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:from-indigo-600 hover:to-fuchsia-500 text-white shadow-lg transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
