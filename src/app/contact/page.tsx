"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tool Suggestion",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
          Contact & Tool Suggestions
        </h1>
        <p className="text-sm text-[#555555] mt-2 max-w-xl leading-relaxed">
          Have an idea for a new pocket utility? Found a bug? Or want to partner with us? Drop us a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 bg-[#ffffff] border-2 border-[#111111] rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#111111]">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-[#f3eee3] border-2 border-[#111111] text-[#d9541e] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Message Received!</h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto">
                Thank you for reaching out. We review all tool suggestions and inquiries carefully.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#555555] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivera"
                  className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#555555] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#555555] mb-1">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs font-medium"
                >
                  <option value="Tool Suggestion">Suggest a New Tool</option>
                  <option value="Bug Report">Report a Bug / Issue</option>
                  <option value="Partnership">Partnership or Sponsorship</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#555555] mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your suggestion or how we can assist..."
                  className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar details */}
        <div className="space-y-4">
          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
              <Mail className="w-4 h-4 text-[#d9541e]" />
              <span>Direct Support</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              Prefer writing an email directly? Reach our team at:
            </p>
            <a
              href="mailto:support@mytoolpocket.com"
              className="text-xs font-bold text-[#111111] hover:text-[#d9541e] underline block"
            >
              support@mytoolpocket.com
            </a>
          </div>

          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
              <Sparkles className="w-4 h-4 text-[#d9541e]" />
              <span>Suggest a Pocket Tool</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              We add new requested utilities every month. If you find yourself repeatedly executing a tedious calculation or conversion, let us know!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

