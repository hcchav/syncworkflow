"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ChevronDown } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  firmName: string;
  city: string;
  practiceAreas: string[];
  phone: string;
  email: string;
}

const QUICK_QUESTIONS = [
  "What areas of law do you handle?",
  "How do I schedule a consultation?",
  "Do you offer free consultations?",
  "What are your fees?",
  "Where are you located?",
];

export function ChatWidget({ firmName, city, practiceAreas, phone, email }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const greeting = `Hi there! 👋 Welcome to ${firmName}. I'm the firm's virtual assistant.\n\nI can help with questions about our practice areas, scheduling a free consultation, fees, or office location.\n\nHow can I help you today?`;

  function handleOpen() {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: greeting }]);
    }
  }

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    setInput("");
    setShowQuickReplies(false);

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          firmName,
          city,
          practiceAreas,
          phone,
          email,
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `I'm sorry, I'm having trouble connecting right now. Please call us at ${phone} or email ${email} for immediate assistance.`,
        },
      ]);
    }

    setIsLoading(false);
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-[#0f1b2d] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6 text-[#c9a84c]" />
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[70] w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          style={{ animationName: "slideUp", animationDuration: "0.3s", animationFillMode: "both" }}
        >
          {/* Header */}
          <div className="bg-[#0f1b2d] px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-[#c9a84c] to-[#e2c97e] rounded-lg flex items-center justify-center text-[#0f1b2d] font-extrabold text-xs shrink-0">
              {firmName.split(" ").map((w) => w[0]).filter((_, i) => i < 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm truncate">{firmName}</div>
              <div className="text-[#94a3b8] text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
                Online now
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-[#94a3b8]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-md bg-[#0f1b2d] flex items-center justify-center text-[#c9a84c] text-[10px] font-bold shrink-0 mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#0f1b2d] text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-md bg-[#0f1b2d] flex items-center justify-center text-[#c9a84c] text-[10px] font-bold shrink-0 mt-0.5">
                  AI
                </div>
                <div className="bg-white border border-gray-200 rounded-xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && messages.length <= 1 && (
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full hover:border-[#c9a84c] hover:text-[#0f1b2d] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-200 shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/30 focus:border-[#c9a84c] disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-lg bg-[#0f1b2d] flex items-center justify-center hover:bg-[#1a2942] transition-colors disabled:opacity-30 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#c9a84c]" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">
                Powered by{" "}
                <a href="https://syncworkflow.com" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">
                  SyncWorkflow
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
