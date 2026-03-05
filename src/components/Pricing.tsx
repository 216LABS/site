"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$297",
    period: "/mo",
    setup: "$500 setup",
    features: [
      "AI receptionist",
      "After-hours answering",
      "Text summaries",
      "Basic call routing",
    ],
    accent: false,
  },
  {
    name: "Pro",
    price: "$597",
    period: "/mo",
    setup: "$1,500 setup",
    features: [
      "Full voice agent",
      "FAQ handling",
      "Appointment booking",
      "CRM integrations",
      "Custom training",
    ],
    accent: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    period: "",
    setup: "Scoped",
    features: [
      "Custom AI build",
      "Your specific workflow",
      "Dedicated support",
      "Full ownership",
    ],
    accent: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-orange-500 text-sm tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-mono">
            Simple, Flat Pricing
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            No hidden fees. No per-minute charges. You know exactly what you pay every month.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-xl p-8 relative ${
                tier.accent
                  ? "border-orange-500/30 shadow-[0_0_30px_rgba(255,111,0,0.1)]"
                  : ""
              }`}
            >
              {tier.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-background text-xs font-mono font-bold px-3 py-1 rounded">
                  Most Popular
                </div>
              )}

              <h3 className="font-mono text-lg font-bold mb-1">{tier.name}</h3>
              <p className="text-xs text-gray-500 font-mono mb-6">
                {tier.setup}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold font-mono text-foreground">
                  {tier.price}
                </span>
                <span className="text-gray-500 font-mono text-sm">
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-orange-500 shrink-0"
                    >
                      <path
                        d="M4 8l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center font-mono text-sm py-3 rounded transition-all ${
                  tier.accent
                    ? "bg-orange-500 text-background font-semibold hover:brightness-110"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:border-cyan/30 hover:text-orange-500"
                }`}
              >
                {tier.name === "Custom" ? "Book a Call" : "Get Started"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
