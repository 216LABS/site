"use client";

import { motion } from "framer-motion";

const techBadges = [
  "Google Cloud",
  "Firebase",
  "Gemini",
  "Twilio",
  "TypeScript",
  "Next.js",
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-cyan text-sm tracking-[0.2em] uppercase mb-3">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-mono">
            Built in Cleveland
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-xl p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono text-cyan text-xs tracking-widest uppercase">
              About // Sam
            </span>
          </div>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            I&apos;m Sam. I spent 7 years building enterprise software at Trimble,
            owning a platform that processed{" "}
            <span className="text-cyan font-semibold">5 million messages a day</span>.
            Now I build AI agents for businesses in Cleveland.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            I&apos;m not a marketing agency reselling someone else&apos;s tools.{" "}
            <span className="text-foreground font-semibold">I write the code.</span>
          </p>

          <div className="flex flex-wrap gap-3">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
