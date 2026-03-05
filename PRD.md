# 216Labs Website — Product Requirements Document

## Overview

216Labs is a Cleveland-based AI agency that builds custom AI solutions for small and mid-size businesses. The website is the company's primary sales tool. It needs to immediately communicate technical credibility, showcase real products, and make it dead simple for a business owner to reach out.

**Target audience:** Local business owners (HVAC, dental, legal, contracting, restaurants, salons) who know they should be doing something with AI but don't know where to start. Secondary: larger companies looking for custom AI work.

**Competitive positioning:** Unlike template-based marketing agencies (e.g., AiBoyz) that resell white-label tools, 216Labs builds custom AI systems. The website should make this obvious through design quality, technical depth, and real product demos.

---

## Design Direction

**Aesthetic: Cyberpunk/Neo-Industrial Cleveland**

Dark theme foundation (near-black backgrounds, #0A0A0F range). Accent colors in electric cyan (#00F0FF), hot magenta (#FF006E), or neon green (#39FF14). Pick one primary accent, use a second sparingly.

Typography should feel technical but readable. Think monospace headers (JetBrains Mono, Space Mono, or Fira Code) mixed with clean sans-serif body text (Inter, Space Grotesk, or Satoshi). Headers can use a glitch effect, scanline overlay, or subtle text flicker on load.

UI elements should have subtle glow effects on interactive elements (buttons, cards), thin neon border lines on sections, a subtle grid or dot-matrix background pattern, and glassmorphism on cards (frosted glass with blur). Micro-interactions everywhere: hover states that feel alive, scroll-triggered animations, parallax depth layers.

The overall vibe should be "this was built by an engineer, not bought from a template." Every element should feel intentional and slightly dangerous, like you're interfacing with a system that's actually running.

---

## Site Structure

### 1. Hero Section

Full-viewport dark hero with animated background (particle network, circuit-board pattern, or subtle matrix rain). The 216Labs logo/wordmark should be prominent with a tagline underneath.

**Headline:** Something short and punchy. Not "AI Solutions for Local Businesses." More like "We build AI that runs your business." or "Custom AI. Built in Cleveland."

**Sub-headline:** One sentence explaining what you do in plain English. "AI phone agents, sales tools, and automation systems for businesses that don't want to miss another customer."

**CTA:** High-contrast glowing button. "See What We Build" (scrolls to products) and "Book a Call" (scrolls to contact).

**Background element:** A subtle, animated visualization. Could be a waveform, neural network graph, or abstracted Cleveland skyline rendered in wireframe/neon lines.

---

### 2. Products / Offerings Section

Three product cards laid out in a grid or staggered layout. Each card should feel like a distinct "module" in a system.

**Card 1: AI Receptionist (VoiceFlow)**
- Icon/visual: Animated waveform or phone icon with pulse effect
- Short description: "Your AI answers every call, 24/7. Books appointments, answers questions, sends follow-up texts. Sounds like a real person, costs less than a part-time hire."
- Key stats/hooks: "Never miss a call again" / "Live in 48 hours" / "From $297/mo"
- CTA: "See Demo" or "Watch It Work" (links to Loom video or live demo)

**Card 2: AI Sales Agent (NavFlow)**
- Icon/visual: Chat bubble with data nodes or search icon
- Short description: "Your AI knows your entire product catalog, can answer technical questions on the fly, and finds new prospects while your reps focus on closing."
- Key stats/hooks: "Built for manufacturers' reps and sales teams" / "RAG-powered knowledge base"
- CTA: "See Demo"

**Card 3: AI Repair & Diagnostics (PartsFlow)**
- Icon/visual: Wrench/gear icon with diagnostic readout aesthetic
- Short description: "Your AI walks technicians through diagnostics, identifies parts, and recommends suppliers. Trained on your service manuals."
- Key stats/hooks: "Reduce diagnosis time" / "Trained on your docs"
- CTA: "See Demo"

Each card should have an embedded Loom video or link to a live project URL. Consider a lightbox/modal that plays the video inline without navigating away. If no video is ready yet, use a placeholder state that says "Demo coming soon" with an email capture to get notified.

**Optional 4th card: "Custom Build"**
- For businesses with unique problems. "Don't see what you need? We build custom AI solutions from scratch. Tell us your problem."
- CTA: Links to contact form

---

### 3. How It Works Section

Simple 3-step horizontal flow with animated connectors between steps. Should feel like a system boot sequence.

**Step 1: "Tell us the problem"**
We meet (in person or video), you tell us what's eating your time or costing you money.

**Step 2: "We build your AI"**
Custom-built for your business. Not a template. Not a plugin. Real AI trained on your data.

**Step 3: "It runs, you grow"**
Your AI works 24/7. We monitor it, improve it, and you pay a flat monthly fee.

---

### 4. About / Credibility Section

Keep it short. No stock photos. No "meet the team" grid with headshots.

A brief block about Sam: "I'm Sam. I spent 7 years building enterprise software at Trimble, owning a platform that processed 5 million messages a day. Now I build AI agents for businesses in Cleveland. I'm not a marketing agency reselling someone else's tools. I write the code."

Include logos or mention of technologies used (Google Cloud, Firebase, Gemini, Twilio) as small trust badges. Not as a skills list, but as "built on" credibility markers.

Optional: A "built in Cleveland" badge or subtle 216 area code reference in the design.

---

### 5. Social Proof / Case Studies Section (build over time)

For launch, this can be a single testimonial or case study from the NAV Agent deployment. Something like:

> "We use 216Labs' AI agent every day before sales calls. It pulls up everything we need to know about the customer in seconds."
> — [Name], [Company]

As you get more clients, this becomes a scrolling carousel of short case studies. Each one should show: the business type, the problem, what you built, and the result.

If you don't have enough testimonials yet, skip this section at launch and add it later. Don't fake it.

---

### 6. Pricing Section (optional at launch)

If you include pricing, keep it simple. Three tiers displayed as cards:

| | Starter | Pro | Custom |
|---|---|---|---|
| **Price** | $297/mo | $597/mo | Let's talk |
| **Setup** | $500 | $1,500 | Scoped |
| **What's included** | AI receptionist, after-hours answering, text summaries | Full voice agent, FAQ handling, appointment booking, integrations | Custom AI build for your specific workflow |

If you're not ready to commit to pricing publicly, leave this section out and just have a "Book a call for pricing" CTA. You can always add it later.

---

### 7. Contact / CTA Section

Final section, high contrast. Big headline: "Ready to stop missing customers?" or "Let's build something."

**Two options:**
1. Embedded Calendly or Cal.com widget for booking a call directly
2. Simple contact form: Name, Business, Phone, "What's your biggest headache?" (open text field)

Phone number displayed prominently. Email too. Make it stupidly easy to reach you.

---

### 8. Footer

Minimal. 216Labs logo, Cleveland OH, email, phone, LinkedIn link, GitHub link. Copyright. That's it. No sitemap spam, no "Areas We Service" list of 50 states.

---

## Technical Requirements

**Framework:** Next.js (you already know React/TypeScript, and it gives you SSR for SEO which matters for local search)

**Hosting:** Vercel (free tier is fine to start, deploys from GitHub automatically)

**Styling:** Tailwind CSS with custom theme tokens for the cyberpunk palette. Framer Motion for animations and scroll-triggered effects.

**CMS for content:** Not needed at launch. Hardcode everything. When you have 5+ case studies, add a headless CMS (Sanity, Contentful, or just MDX files).

**Video embeds:** Loom embed iframes for product demos. Alternatively, self-hosted MP4s served from Vercel or Cloudflare R2 if you want more control over the player UI.

**Contact form:** Formspree, Resend, or just a Firebase Function that sends you an email. Keep it simple.

**Analytics:** Plausible or PostHog (privacy-friendly, no cookie banners needed). Track page views, CTA clicks, form submissions, and video plays.

**Domain:** 216labs.com or 216labs.ai (check availability). .ai domain would be on brand.

**SEO basics:** Meta titles/descriptions per page, Open Graph images for social sharing, schema markup for local business. Target keywords like "AI for businesses Cleveland," "AI receptionist Cleveland," "AI automation Ohio."

---

## Pages for V1

1. **Home** (single-page with all sections above, this is the priority)
2. **/contact** (standalone contact page, duplicate of the contact section for direct linking)

That's it for launch. Don't build a blog, don't build individual service pages, don't build a portfolio page. Get the homepage live, start selling, and add pages as you need them.

---

## What NOT to Do

- No stock photos of smiling business people or handshakes
- No "We serve all 50 states" section. You're a Cleveland shop, own it
- No chat widget on the site (ironic, but a chat widget on a half-built site with no one monitoring it is worse than no chat widget)
- No "Since 2010" or inflated credentials. Be honest about being new. Confidence comes from technical depth, not fake tenure
- No generic "AI Solutions" language. Be specific about what you build
- No GoHighLevel or white-label branding anywhere. Everything should feel custom-built because it is
- No bullet point lists of 20 services. You do three things. Say them clearly

---

## Launch Checklist

- [ ] Domain purchased and DNS configured
- [ ] Homepage built with all sections
- [ ] At least 1 product demo video recorded (start with AI Receptionist)
- [ ] Contact form working and tested
- [ ] Mobile responsive (test on actual phones)
- [ ] Open Graph / social sharing image designed
- [ ] Google Business Profile created for 216Labs
- [ ] Analytics installed
- [ ] Share URL with 5 people for feedback before going public