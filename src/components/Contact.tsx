"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Formspree, Resend, or Firebase Function
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-4">
            Let&apos;s build something.
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Tell us what&apos;s eating your time. We&apos;ll tell you if AI can fix it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="text-cyan text-4xl mb-4">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="w-12 h-12 mx-auto"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="24" cy="24" r="20" />
                    <path
                      d="M15 24l6 6 12-12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-mono mb-2">Got it.</h3>
                <p className="text-gray-400">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wide uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wide uppercase">
                    Business
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.business}
                    onChange={(e) =>
                      setFormData({ ...formData, business: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wide uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="(216) 555-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wide uppercase">
                    What&apos;s your biggest headache?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                    placeholder="Tell us what's costing you time or money..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full glow-btn relative z-10 bg-cyan text-background font-mono font-semibold px-8 py-4 rounded text-sm tracking-wide hover:brightness-110 transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="glass-card rounded-xl p-8 space-y-8">
              <div>
                <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
                  Or just call
                </p>
                <a
                  href="tel:+13306047380"
                  className="text-2xl font-mono font-bold text-cyan hover:text-glow transition-all"
                >
                  (330) 604-7380
                </a>
              </div>

              <div>
                <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:sam@216labs.dev"
                  className="text-lg font-mono text-cyan hover:text-glow transition-all"
                >
                  sam@216labs.dev
                </a>
              </div>

              <div>
                <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
                  Location
                </p>
                <p className="text-gray-300 font-mono">Cleveland, OH</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-sm text-gray-500">
                  Prefer to meet in person? We&apos;re based in Cleveland and happy to
                  grab coffee and talk about your business.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
