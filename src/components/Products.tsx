"use client";

import { motion } from "framer-motion";

const products = [
  {
    title: "AI Receptionist",
    subtitle: "VoiceFlow",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-10 h-10"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 5C11.716 5 5 11.716 5 20c0 2.846.79 5.504 2.164 7.77L5 35l7.23-2.164A14.93 14.93 0 0020 35c8.284 0 15-6.716 15-15S28.284 5 20 5z" />
        <path d="M14 18h12M14 22h8" strokeLinecap="round" />
      </svg>
    ),
    description:
      "Your AI answers every call, 24/7. Books appointments, answers questions, sends follow-up texts. Sounds like a real person, costs less than a part-time hire.",
    hooks: ["Never miss a call again", "Live in 48 hours", "From $297/mo"],
    accent: "cyan",
  },
  {
    title: "AI Sales Agent",
    subtitle: "NavFlow",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-10 h-10"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="20" cy="12" r="7" />
        <path d="M8 28c0-4 5.373-8 12-8s12 4 12 8" strokeLinecap="round" />
        <path d="M28 18l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "Your AI knows your entire product catalog, can answer technical questions on the fly, and finds new prospects while your reps focus on closing.",
    hooks: [
      "Built for manufacturers' reps",
      "RAG-powered knowledge base",
    ],
    accent: "magenta",
  },
  {
    title: "AI Repair & Diagnostics",
    subtitle: "PartsFlow",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-10 h-10"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" />
        <circle cx="20" cy="20" r="3" />
      </svg>
    ),
    description:
      "Your AI walks technicians through diagnostics, identifies parts, and recommends suppliers. Trained on your service manuals.",
    hooks: ["Reduce diagnosis time", "Trained on your docs"],
    accent: "green",
  },
  {
    title: "Custom Build",
    subtitle: "Your Vision",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-10 h-10"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="8" y="8" width="24" height="24" rx="4" />
        <path d="M16 20h8M20 16v8" strokeLinecap="round" />
      </svg>
    ),
    description:
      "Don't see what you need? We build custom AI solutions from scratch. Tell us your problem.",
    hooks: ["Fully custom", "Your workflow, your AI"],
    accent: "cyan",
  },
];

const accentColors: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan: {
    text: "text-cyan",
    border: "border-cyan/20",
    bg: "bg-cyan/5",
    glow: "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
  },
  magenta: {
    text: "text-magenta",
    border: "border-magenta/20",
    bg: "bg-magenta/5",
    glow: "hover:shadow-[0_0_30px_rgba(255,0,110,0.15)]",
  },
  green: {
    text: "text-green",
    border: "border-green/20",
    bg: "bg-green/5",
    glow: "hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]",
  },
};

export default function Products() {
  return (
    <section id="products" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan text-sm tracking-[0.2em] uppercase mb-3">
            What We Build
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-mono">
            AI That Works for You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => {
            const colors = accentColors[product.accent];
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card rounded-xl p-8 ${colors.glow} transition-all group`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`${colors.text} ${colors.bg} p-3 rounded-lg border ${colors.border}`}
                  >
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">
                      {product.title}
                    </h3>
                    <p className={`text-xs font-mono ${colors.text} opacity-70`}>
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-5 text-sm">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.hooks.map((hook) => (
                    <span
                      key={hook}
                      className={`text-xs font-mono ${colors.text} ${colors.bg} border ${colors.border} px-3 py-1 rounded-full`}
                    >
                      {hook}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-mono ${colors.text} opacity-70 group-hover:opacity-100 transition-opacity`}
                >
                  {product.title === "Custom Build" ? "Tell Us Your Problem" : "See Demo"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
