'use client';

import {
  AlertCircle,
  Check,
  CheckCheck,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Inquiry {
  id: string;
  full_name?: string;
  name?: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied' | string;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessages = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch messages');
      }
    } catch (err: any) {
      setError(err?.message || 'Error connecting to messages service');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleStatus = async (msg: Inquiry) => {
    const newStatus = msg.status === 'unread' ? 'read' : 'unread';
    setActionLoadingId(msg.id);

    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (e) {
      console.error('Failed to toggle status:', e);
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteMessage = async (id: string) => {
    setActionLoadingId(id);

    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Failed to delete message:', e);
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  const unreadCount = useMemo(
    () => messages.filter((m) => m.status === 'unread').length,
    [messages]
  );
  const readCount = useMemo(
    () => messages.filter((m) => m.status !== 'unread').length,
    [messages]
  );

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesFilter =
        filterStatus === 'all'
          ? true
          : filterStatus === 'unread'
          ? m.status === 'unread'
          : m.status !== 'unread';

      const name = (m.full_name || m.name || '').toLowerCase();
      const email = (m.email || '').toLowerCase();
      const phone = (m.phone || '').toLowerCase();
      const subject = (m.subject || '').toLowerCase();
      const body = (m.message || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        subject.includes(query) ||
        body.includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [messages, filterStatus, searchQuery]);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Customer Inquiries &amp; Messages
            </h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#c49a4a] px-2.5 py-0.5 text-xs font-bold text-[#12100d] shadow-sm">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-white/60 mt-1">
            Real-time messages submitted by visitors on the Contact Us page.
          </p>
        </div>

        <button
          onClick={() => fetchMessages(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/90 shadow-sm transition hover:bg-white/10 hover:border-[#c49a4a]/50 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin text-[#c49a4a]' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#14120e] p-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-[#c49a4a] text-[#12100d] font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              filterStatus === 'unread'
                ? 'bg-[#c49a4a] text-[#12100d] font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  filterStatus === 'unread' ? 'bg-[#12100d] text-[#c49a4a]' : 'bg-[#c49a4a] text-[#12100d]'
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilterStatus('read')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              filterStatus === 'read'
                ? 'bg-[#c49a4a] text-[#12100d] font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            Read ({readCount})
          </button>
        </div>

        {/* Search Box */}
        <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-[#c49a4a] focus:bg-white/10"
          />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchMessages()}
            className="rounded-lg bg-rose-500/20 px-3 py-1 font-semibold hover:bg-rose-500/30 text-rose-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Loader2 size={32} className="animate-spin text-[#c49a4a] mb-3" />
          <p className="text-xs text-white/60">Loading customer messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12110e] py-16 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/30 mb-4">
            <MessageSquare size={26} />
          </div>
          <h3 className="text-sm font-bold text-white">No inquiries found</h3>
          <p className="text-xs text-white/50 max-w-sm mt-1">
            {searchQuery
              ? `No messages matched "${searchQuery}". Try clearing your search.`
              : filterStatus === 'unread'
              ? 'Great news! All customer inquiries have been reviewed.'
              : 'Messages submitted on your contact form will appear here automatically.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        /* Message Cards */
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const customerName = msg.full_name || msg.name || 'Anonymous Customer';
            const isUnread = msg.status === 'unread';
            const cleanPhone = (msg.phone || '').replace(/[^0-9+]/g, '');
            const whatsappNumber = cleanPhone.replace('+', '');

            return (
              <div
                key={msg.id}
                className={`rounded-2xl border p-5 sm:p-6 transition duration-200 shadow-lg ${
                  isUnread
                    ? 'border-[#c49a4a]/50 bg-[#17140f] ring-1 ring-[#c49a4a]/30'
                    : 'border-white/10 bg-[#12110e] opacity-90 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${
                        isUnread
                          ? 'bg-[#c49a4a] text-[#12100d] shadow-md'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {customerName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">{customerName}</span>
                        {isUnread ? (
                          <span className="rounded-full bg-[#c49a4a] px-2 py-0.5 text-[9px] font-bold text-[#12100d] uppercase tracking-wider">
                            New Inquiry
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium text-white/60 uppercase tracking-wider">
                            Read
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60 mt-1">
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-1.5 text-white/70 hover:text-[#c49a4a] transition-colors"
                          title="Send Email"
                        >
                          <Mail size={12} className="text-[#c49a4a]" />
                          <span>{msg.email}</span>
                        </a>

                        {msg.phone && (
                          <>
                            <span>•</span>
                            <a
                              href={`tel:${cleanPhone}`}
                              className="flex items-center gap-1.5 text-white/70 hover:text-[#c49a4a] transition-colors"
                              title="Call Customer"
                            >
                              <Phone size={12} className="text-[#c49a4a]" />
                              <span>{msg.phone}</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Timestamp */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-white/40 mr-1">
                      <Clock size={11} />
                      <span>{formatDate(msg.created_at)}</span>
                    </div>

                    {/* Toggle Read/Unread */}
                    <button
                      onClick={() => toggleStatus(msg)}
                      disabled={actionLoadingId === msg.id}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                        isUnread
                          ? 'bg-[#c49a4a]/15 text-[#d6b15e] hover:bg-[#c49a4a]/25 border border-[#c49a4a]/30'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                      title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                    >
                      {actionLoadingId === msg.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : isUnread ? (
                        <>
                          <Check size={13} />
                          <span className="hidden sm:inline">Mark Read</span>
                        </>
                      ) : (
                        <>
                          <CheckCheck size={13} className="text-[#c49a4a]" />
                          <span className="hidden sm:inline">Mark Unread</span>
                        </>
                      )}
                    </button>

                    {/* Delete Button */}
                    {deleteConfirmId === msg.id ? (
                      <div className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 rounded-lg p-1">
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          disabled={actionLoadingId === msg.id}
                          className="rounded px-2 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-500/30 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded px-1.5 py-1 text-[11px] text-white/60 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(msg.id)}
                        className="rounded-lg p-1.5 text-white/40 hover:bg-rose-500/10 hover:text-rose-400 transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Subject & Body */}
                <div className="mt-3.5">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#d6b15e] tracking-wide mb-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c49a4a]" />
                    {msg.subject || 'General Inquiry'}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-white/85 leading-relaxed whitespace-pre-line bg-black/25 rounded-xl p-3.5 border border-white/5">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
