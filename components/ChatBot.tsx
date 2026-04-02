'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Send, Trash2, ChevronUp, ChevronDown, MessageCircle, Bot } from 'lucide-react';

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
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="fixed bottom-6 right-6 z-[100]">
      
      {/* Nút mở chat */}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--navy-deep)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Cửa sổ chat */}
      {open && (
        <div className="flex flex-col w-[360px] sm:w-[400px] h-[560px] max-h-[80vh] bg-[var(--navy)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">Trợ lý SHTT</p>
                <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Đang hoạt động
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => {
                  if (confirm('Xóa lịch sử hội thoại?')) {
                    setMessages([{ id: 1, from: 'bot', text: 'Đã làm mới. Bạn cần hỗ trợ gì?' }]);
                  }
                }}
                className="w-8 h-8 text-[var(--text-muted)] hover:text-white hover:bg-white/5 rounded-lg flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="w-8 h-8 text-[var(--text-muted)] hover:text-white hover:bg-white/5 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' && (
                  <div className="w-7 h-7 rounded-md bg-[var(--accent)]/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-[var(--accent)] text-[var(--navy-deep)] font-medium rounded-br-md'
                    : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-bl-md'
                }`}>
                  {m.from === 'bot' ? (
                    <>
                      <div className={`${!expanded[m.id] && m.text.length > 600 ? 'max-h-48 overflow-hidden' : ''}`}>
                        <div className="prose prose-invert prose-sm max-w-none prose-p:mb-2 prose-p:leading-relaxed">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                        </div>
                      </div>
                      {m.text.length > 600 && (
                        <button
                          onClick={() => setExpanded(p => ({ ...p, [m.id]: !p[m.id] }))}
                          className="mt-2 text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1 font-medium"
                        >
                          {expanded[m.id] ? <><ChevronUp className="w-3 h-3" /> Thu gọn</> : <><ChevronDown className="w-3 h-3" /> Xem đầy đủ</>}
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.text}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Gợi ý câu hỏi */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-[var(--text-muted)] font-medium px-1">Câu hỏi gợi ý:</p>
                {SUGGESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q)}
                    className="block w-full text-left text-sm px-4 py-3 bg-white/5 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {sending && (
              <div className="flex gap-2 items-center text-[var(--text-muted)]">
                <div className="w-7 h-7 rounded-md bg-[var(--accent)]/10 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
                <div className="flex gap-1 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                  <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce [animation-delay:0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-2" />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="flex gap-2 items-center">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Nhập câu hỏi..."
                className="input text-sm py-2.5"
              />
              <button
                onClick={() => send()}
                disabled={sending || !input.trim()}
                className="btn-primary px-3 py-2.5 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
