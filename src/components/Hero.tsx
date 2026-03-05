"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-orange-500 text-sm tracking-[0.3em] uppercase mb-6">
            Cleveland, OH
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono leading-tight mb-6"
        >
          <span className="text-foreground">We build </span>
          <span className="text-orange-500 text-glow">AI</span>
          <br />
          <span className="text-foreground">that runs your</span>
          <br />
          <span className="text-foreground">business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI phone agents, sales tools, and automation systems for businesses
          that don&apos;t want to miss another customer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            className="glow-btn relative z-10 bg-orange-500 text-background font-mono font-semibold px-8 py-4 rounded text-sm tracking-wide hover:brightness-110 transition-all animate-pulse-glow"
          >
            See What We Build
          </a>
          <a
            href="#contact"
            className="glow-btn relative z-10 bg-transparent text-orange-500 border border-cyan/40 font-mono font-semibold px-8 py-4 rounded text-sm tracking-wide hover:bg-orange-500/10 transition-all"
          >
            Book a Call
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-orange-500/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-orange-500/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
