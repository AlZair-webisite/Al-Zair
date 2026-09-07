'use client';

import {
  AlertCircle,
  Check,
  Clock,
  Copy,
  Download,
  Loader2,
  Mail,
  MailCheck,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchSubscribers = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/newsletter', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribers(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch subscribers');
      }
    } catch (err: any) {
      setError(err?.message || 'Error connecting to subscribers service');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const deleteSubscriber = async (sub: Subscriber) => {
    setActionLoadingId(sub.id);

    try {
      const queryParam = sub.id
        ? `id=${encodeURIComponent(sub.id)}`
        : `email=${encodeURIComponent(sub.email)}`;

      const res = await fetch(`/api/admin/newsletter?${queryParam}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSubscribers((prev) =>
          prev.filter((s) => s.id !== sub.id && s.email !== sub.email)
        );
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Failed to delete subscriber:', e);
    } finally {
      setActionLoadingId(null);
    }
  };

  const exportCsv = () => {
    if (subscribers.length === 0) return;
    const csvContent = [
      'Email,Subscribed Date',
      ...subscribers.map(
        (s) => `"${s.email}","${formatDate(s.created_at)}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `alzair_newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return subscribers;
    return subscribers.filter((s) => s.email.toLowerCase().includes(q));
  }, [subscribers, searchQuery]);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Newsletter Subscribers
            </h1>
            <span className="rounded-full bg-[#c49a4a] px-2.5 py-0.5 text-xs font-bold text-[#12100d] shadow-sm">
              {subscribers.length} Emails
            </span>
          </div>
          <p className="text-xs text-white/60 mt-1">
            Audience subscribed for newsletters, product launches, and seasonal discounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchSubscribers(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/90 shadow-sm transition hover:bg-white/10 hover:border-[#c49a4a]/50 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin text-[#c49a4a]' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportCsv}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#c49a4a] px-4 py-2.5 text-xs font-bold text-[#12100d] shadow-md transition hover:bg-[#d6b15e] active:scale-95 disabled:opacity-50"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#14120e] p-3">
        <div className="flex items-center gap-2 text-xs text-white/70 px-2">
          <MailCheck size={16} className="text-[#c49a4a]" />
          <span>Total Registered Subscribers: <strong className="text-white">{subscribers.length}</strong></span>
        </div>

        {/* Search Box */}
        <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email address..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-[#c49a4a] focus:bg-white/10"
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchSubscribers()}
            className="rounded-lg bg-rose-500/20 px-3 py-1 font-semibold hover:bg-rose-500/30 text-rose-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Loader2 size={32} className="animate-spin text-[#c49a4a] mb-3" />
          <p className="text-xs text-white/60">Loading newsletter subscribers...</p>
        </div>
      ) : filteredSubscribers.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12110e] py-16 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/30 mb-4">
            <Users size={26} />
          </div>
          <h3 className="text-sm font-bold text-white">No subscribers found</h3>
          <p className="text-xs text-white/50 max-w-sm mt-1">
            {searchQuery
              ? `No subscribers matched "${searchQuery}".`
              : 'Emails submitted on the footer newsletter form will appear here.'}
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
        /* Subscribers Table */
        <div className="rounded-2xl border border-white/10 bg-[#12110e] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-white/60 font-bold">
                <tr>
                  <th className="px-6 py-4 w-16">#</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Date Subscribed</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/85">
                {filteredSubscribers.map((sub, index) => (
                  <tr
                    key={sub.id || sub.email}
                    className="hover:bg-white/[0.02] transition"
                  >
                    <td className="px-6 py-4 text-white/40 font-mono">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#c49a4a]/15 text-[#d6b15e] flex items-center justify-center font-bold text-xs uppercase">
                          {sub.email.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-white">
                            {sub.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-white/70">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock size={13} className="text-[#c49a4a]" />
                        <span>{formatDate(sub.created_at)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Copy email */}
                        <button
                          onClick={() => copyToClipboard(sub.email)}
                          className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white transition"
                          title="Copy Email"
                        >
                          {copiedEmail === sub.email ? (
                            <Check size={14} className="text-emerald-400" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>

                        {/* Send mail */}
                        <a
                          href={`mailto:${sub.email}`}
                          className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-[#c49a4a] transition"
                          title="Send Email"
                        >
                          <Mail size={14} />
                        </a>

                        {/* Delete subscriber */}
                        {deleteConfirmId === (sub.id || sub.email) ? (
                          <div className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 rounded-lg p-1">
                            <button
                              onClick={() => deleteSubscriber(sub)}
                              disabled={actionLoadingId === sub.id}
                              className="rounded px-2 py-0.5 text-[11px] font-bold text-rose-300 hover:bg-rose-500/30 transition"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded px-1.5 py-0.5 text-[11px] text-white/60 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(sub.id || sub.email)}
                            className="rounded-lg p-2 text-white/40 hover:bg-rose-500/10 hover:text-rose-400 transition"
                            title="Remove Subscriber"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
