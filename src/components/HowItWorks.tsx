"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tell us the problem",
    description:
      "We meet (in person or video), you tell us what's eating your time or costing you money.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4C9.373 4 4 9.373 4 16c0 2.21.6 4.28 1.64 6.06L4 28l5.94-1.64A11.94 11.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 4 16 4z" />
        <path d="M11 14h10M11 18h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We build your AI",
    description:
      "Custom-built for your business. Not a template. Not a plugin. Real AI trained on your data.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="20" height="20" rx="3" />
        <path d="M12 16l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "It runs, you grow",
    description:
      "Your AI works 24/7. We monitor it, improve it, and you pay a flat monthly fee.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 22l6-6 4 4 10-12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-orange-500 text-sm tracking-[0.2em] uppercase mb-3">
            System Boot Sequence
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-mono">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-cyan/0 via-cyan/30 to-cyan/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/5 border border-orange-500/20 text-orange-500 mb-6 relative z-10">
                {step.icon}
              </div>
              <p className="font-mono text-orange-500/50 text-xs tracking-widest mb-2">
                {step.number}
              </p>
              <h3 className="text-xl font-bold font-mono mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
