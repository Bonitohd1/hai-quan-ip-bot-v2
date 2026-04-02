'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Trash2, ChevronUp, ChevronDown, 
  ChevronRight, MessageCircle, Bot 
} from 'lucide-react';

type Message = { id: number; from: 'user' | 'bot'; text: string };

const SUGGESTIONS = [
  'Thủ tục đăng ký nhãn hiệu ra sao?',
  'Quy định xử phạt vi phạm SHTT?',
  'Cách tra cứu hồ sơ sở hữu trí tuệ',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'bot', text: 'Xin chào! Tôi là trợ lý AI về Sở hữu trí tuệ Hải quan. Bạn cần hỗ trợ gì?' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({} as Record<number, boolean>);
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, open]);

  async function send(text?: string) {
    const q = text || input.trim();
    if (!q) return;
    setMessages(p => [...p, { id: nextId.current++, from: 'user', text: q }]);
    setInput('');
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setMessages(p => [...p, {
        id: nextId.current++, from: 'bot',
        text: data.answer || 'Xin lỗi, tôi chưa thể trả lời lúc này.',
      }]);
    } catch {
      setMessages(p => [...p, {
        id: nextId.current++, from: 'bot',
        text: 'Lỗi kết nối. Vui lòng thử lại.',
      }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="flex flex-col w-[360px] sm:w-[420px] h-[600px] max-h-[85vh] bg-[var(--surface-glass)] backdrop-blur-2xl border border-white/40 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)] pointer-events-auto ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/50 bg-white/30">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 border border-white/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-slate-900 tracking-tight">AI Assistant v2.0</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Trực tuyến</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (confirm('Làm mới phiên hội thoại?')) {
                      setMessages([{ id: 1, from: 'bot', text: 'Hệ thống đã sẵn sàng. Tôi có thể giúp gì cho bạn?' }]);
                    }
                  }}
                  className="w-10 h-10 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl flex items-center justify-center transition-all bg-white/50"
                  title="Xóa lịch sử"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl flex items-center justify-center transition-all bg-white/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent via-transparent to-white/20">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.from === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0 border border-amber-200 shadow-sm">
                      <Bot className="w-4 h-4 text-amber-600" />
                    </div>
                  )}
                  <motion.div 
                    initial={{ opacity: 0, x: m.from === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[85%] px-5 py-4 rounded-2xl text-[14px] shadow-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-blue-900 text-white font-bold rounded-tr-none shadow-blue-900/10'
                      : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none shadow-slate-200/30'
                  }`}>
                    {m.from === 'bot' ? (
                      <>
                        <div className={`${!expanded[m.id] && m.text.length > 800 ? 'max-h-[300px] overflow-hidden relative' : ''}`}>
                          <div className="prose prose-slate prose-sm max-w-none prose-p:mb-2 prose-p:leading-relaxed prose-strong:text-blue-900 prose-ul:list-disc prose-ul:ml-4">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                          </div>
                          {!expanded[m.id] && m.text.length > 800 && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
                          )}
                        </div>
                        {m.text.length > 800 && (
                          <button
                            onClick={() => setExpanded(p => ({ ...p, [m.id]: !p[m.id] }))}
                            className="mt-4 text-[12px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1.5 uppercase transition-colors"
                          >
                            {expanded[m.id] ? <><ChevronUp className="w-3.5 h-3.5" /> Thu gọn</> : <><ChevronDown className="w-4 h-4" /> Xem toàn văn bản</>}
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.text}</span>
                    )}
                  </motion.div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-3 pt-4">
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest px-1">Gợi ý tác vụ:</p>
                  {SUGGESTIONS.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      onClick={() => send(q)}
                      className="block w-full text-left text-[13px] font-bold px-5 py-4 bg-white/80 border border-slate-200 rounded-2xl text-slate-700 hover:border-blue-500/50 hover:text-blue-800 hover:shadow-lg transition-all group"
                    >
                      <span className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                        {q}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {sending && (
                <div className="flex gap-3 items-center text-slate-400">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex gap-1.5 px-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-200/50 bg-white/80 backdrop-blur-md">
              <div className="flex gap-3 items-center relative">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Nhập yêu cầu chuyên nghiệp..."
                  className="flex-1 w-full pl-5 pr-14 py-4.5 bg-slate-100/50 border border-slate-200/80 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-inner"
                />
                <button
                  onClick={() => send()}
                  disabled={sending || !input.trim()}
                  className="absolute right-2 p-3 bg-blue-900 text-white rounded-xl hover:bg-black disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-4 font-black uppercase tracking-tighter opacity-60 italic">Bản quyền AI Hải Quan SHTT © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40 transition-all pointer-events-auto border-4 border-white relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
        
        <div className="relative z-10">
          {open ? (
            <ChevronDown className="w-8 h-8" />
          ) : (
            <div className="flex items-center justify-center relative">
              <MessageCircle className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-blue-900 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
}
