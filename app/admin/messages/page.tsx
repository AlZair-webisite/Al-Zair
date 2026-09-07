'use client';

import { CheckCheck, Mail, MessageSquare, Phone, Trash2, User } from 'lucide-react';
import { useState } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 'MSG-101',
      name: 'Dr. Sameer Ali',
      email: 'sameer.ali@hospital.org',
      phone: '+91 98450 11223',
      subject: 'Bulk Corporate Gifting Inquiry for Diwali',
      message:
        'Hello team Syab Dates, we are looking to place a bulk order of 250 Royal Gift Hampers for our corporate staff. Please share the discounted catalog and expected delivery timelines to New Delhi.',
      date: 'Today, 11:30 AM',
      status: 'unread',
    },
    {
      id: 'MSG-102',
      name: 'Kavita Deshmukh',
      email: 'kavita.d@gmail.com',
      phone: '+91 99123 44556',
      subject: 'Custom Sugar-Free Gift Pack combination',
      message:
        'Hi, is it possible to customize the dates laddu box without any added artificial sweeteners or flavors? We loved the classic dates laddu sample.',
      date: 'Yesterday, 4:15 PM',
      status: 'read',
    },
    {
      id: 'MSG-103',
      name: 'Mohd. Farhan',
      email: 'farhan.m@gmail.com',
      phone: '+91 97711 22334',
      subject: 'Wholesale Ajwa Dates requirement',
      message:
        'We run a gourmet dry fruit outlet in Hyderabad and would like to procure 50kg of premium grade Ajwa dates monthly. Please connect with wholesale rates.',
      date: '2 days ago',
      status: 'read',
    },
  ]);

  const toggleReadStatus = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'unread' ? 'read' : 'unread' } : m
      )
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Customer Inquiries & Messages
        </h1>
        <p className="text-xs text-white/60 mt-1">
          Inquiries submitted via the Contact Us page.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border p-5 sm:p-6 transition shadow-md ${
              msg.status === 'unread'
                ? 'border-[#c49a4a]/40 bg-[#171511]'
                : 'border-white/10 bg-[#12110e]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#c49a4a]/15 text-[#d6b15e] flex items-center justify-center font-bold text-xs">
                  {msg.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{msg.name}</span>
                    {msg.status === 'unread' && (
                      <span className="rounded-full bg-[#c49a4a] px-2 py-0.5 text-[9px] font-bold text-[#12100d] uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/50 mt-0.5">
                    <span>{msg.email}</span>
                    <span>•</span>
                    <span>{msg.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/40">{msg.date}</span>
                <button
                  onClick={() => toggleReadStatus(msg.id)}
                  className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
                  title="Toggle Read/Unread"
                >
                  <CheckCheck size={16} className={msg.status === 'read' ? 'text-[#c49a4a]' : ''} />
                </button>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="rounded-lg p-1.5 text-white/60 hover:bg-rose-500/10 hover:text-rose-400 transition"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-[#d6b15e] tracking-wide mb-1.5">
                {msg.subject}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
