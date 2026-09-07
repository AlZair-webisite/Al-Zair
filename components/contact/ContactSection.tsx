'use client';

import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setErrorMessage(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f5f0e7] px-5 py-16 sm:py-24 text-[#171513]">
      <div className="mx-auto max-w-[1240px] grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start">
        {/* Left: Contact Information */}
        <div className="flex flex-col justify-center">
          <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[.25em] text-[#a9823b]">
            Contact Information
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#1a1714] font-sans">
            Reach Out To Us
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#5a544b] font-sans max-w-md">
            Have a question about our products or your order? We&apos;re here to help.
          </p>

          <div className="mt-10 space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/70 bg-white/60 text-[#a9823b]">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#a9823b]">
                  Phone
                </p>
                <a
                  href="tel:+917052375313"
                  className="mt-1 block text-[15px] font-semibold text-[#1a1714] hover:text-[#a9823b] transition-colors"
                >
                  +91 7052375313
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/70 bg-white/60 text-[#a9823b]">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#a9823b]">
                  Email
                </p>
                <a
                  href="mailto:alzairdates@gmail.com"
                  className="mt-1 block text-[15px] font-semibold text-[#1a1714] hover:text-[#a9823b] transition-colors"
                >
                  alzairdates@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/70 bg-white/60 text-[#a9823b]">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#a9823b]">
                  Address
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[#1a1714]">
                  Madanpur Khadar, New Delhi - 110076
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/70 bg-white/60 text-[#a9823b]">
                <Clock size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[#a9823b]">
                  Business Hours
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[#1a1714]">
                  Mon - Sat: 9:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Send Us a Message Form Card */}
        <div className="rounded-2xl border border-[#dccbb4] bg-[#ede5d8]/80 p-7 sm:p-10 shadow-[0_12px_36px_rgba(72,53,35,0.06)]">
          <h3 className="text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1a1714] font-sans">
            Send Us a Message
          </h3>

          {isSubmitted && (
            <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 animate-fadeIn">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              Thank you! Your message has been sent successfully. We will get back to you soon.
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-rose-600/30 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-800 animate-fadeIn">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="mt-1.5 w-full rounded-md border border-[#d5c7b3] bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition placeholder:text-[#9e9486] focus:border-[#a9823b] focus:ring-1 focus:ring-[#a9823b]"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-1.5 w-full rounded-md border border-[#d5c7b3] bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition placeholder:text-[#9e9486] focus:border-[#a9823b] focus:ring-1 focus:ring-[#a9823b]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="mt-1.5 w-full rounded-md border border-[#d5c7b3] bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition placeholder:text-[#9e9486] focus:border-[#a9823b] focus:ring-1 focus:ring-[#a9823b]"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject of your inquiry"
                className="mt-1.5 w-full rounded-md border border-[#d5c7b3] bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition placeholder:text-[#9e9486] focus:border-[#a9823b] focus:ring-1 focus:ring-[#a9823b]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                className="mt-1.5 w-full resize-none rounded-md border border-[#d5c7b3] bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition placeholder:text-[#9e9486] focus:border-[#a9823b] focus:ring-1 focus:ring-[#a9823b]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-[#b89047] px-8 py-3.5 text-xs font-bold tracking-widest text-[#171513] shadow-[0_4px_16px_rgba(184,144,71,0.25)] transition duration-300 hover:bg-[#a67e35] hover:shadow-[0_6px_22px_rgba(184,144,71,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>SENDING...</span>
                    <Loader2 size={13} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={13} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
