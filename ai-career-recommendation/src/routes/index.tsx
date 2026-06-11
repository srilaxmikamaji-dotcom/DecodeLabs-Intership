import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Target,
  Bot,
  MessagesSquare,
  Bell,
  Radar,
  Mail,
  ArrowRight,
  Check,
  Star,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Sparkles, title: "AI Opportunity Matching", desc: "Personalized internships, hackathons & jobs ranked by fit." },
  { icon: FileText, title: "Resume Analysis", desc: "ATS scoring, keyword gaps, and role compatibility instantly." },
  { icon: Target, title: "Skill Gap Prediction", desc: "See exactly what to learn to unlock your dream role." },
  { icon: Bot, title: "Career Copilot Agent", desc: "An AI mentor that plans your week and answers anything." },
  { icon: MessagesSquare, title: "Mock Interview AI", desc: "Realistic interviews with weakness detection and scoring." },
  { icon: Bell, title: "Deadline Alerts", desc: "Never miss an application — smart prioritized reminders." },
  { icon: Radar, title: "Opportunity Hunter Bot", desc: "An autonomous agent scanning portals for you 24/7." },
  { icon: Mail, title: "Cover Letter Generator", desc: "Tailored cover letters, cold emails & SOPs in seconds." },
];

const stats = [
  { v: "50K+", l: "Opportunities tracked" },
  { v: "12K+", l: "Students onboarded" },
  { v: "92%", l: "Match accuracy" },
  { v: "24/7", l: "Auto-discovery" },
];

const faqs = [
  { q: "Is OpportunityRadar free for students?", a: "Yes — Starter is free forever. Pro unlocks unlimited AI generations, the Hunter Bot, and priority alerts." },
  { q: "How does the AI match opportunities?", a: "We profile your skills, GitHub, resume, and goals — then rank live postings from 8+ portals using a multi-signal model." },
  { q: "Where do you source opportunities from?", a: "LinkedIn, Internshala, Unstop, Naukri, Indeed, Wellfound, GitHub Internships, and 500+ direct company career pages." },
  { q: "Can I use this if I'm not from a top college?", a: "Absolutely. The AI surfaces high-probability matches based on your profile, not your pedigree." },
];

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl gradient-aurora glow-sm flex items-center justify-center">
            <Radar className="size-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-sm">OpportunityRadar</div>
            <div className="text-[10px] text-muted-foreground tracking-wider">AI · BETA</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth/login" className="hidden sm:inline-flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition">
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-sm font-medium text-white glow-sm hover:opacity-95"
          >
            Get Started <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-20 pb-28 px-4 lg:px-8">
      {/* glow blobs */}
      <div className="absolute top-20 left-1/4 size-96 rounded-full gradient-aurora opacity-30 blur-3xl animate-float" />
      <div className="absolute top-40 right-1/4 size-80 rounded-full bg-[var(--neon-blue)] opacity-20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Career Intelligence · Live now
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Never Miss the <br />
          <span className="gradient-text">Right Opportunity</span> Again
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          AI-powered personalized opportunity discovery and career readiness platform for students.
          Internships, hackathons, scholarships — all matched to you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl gradient-primary text-sm font-medium text-white glow hover:opacity-95"
          >
            Get Started Free <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl glass text-sm font-medium hover:bg-white/8"
          >
            Try Demo
          </Link>
        </motion.div>

        {/* Dashboard mock preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="glass-strong rounded-2xl p-3 shadow-elevated max-w-4xl mx-auto">
            <div className="rounded-xl bg-background/60 p-6 border border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { l: "Opportunities", v: "247", c: "var(--neon-purple)" },
                  { l: "High Match", v: "38", c: "var(--neon-blue)" },
                  { l: "Deadlines", v: "6", c: "var(--neon-pink)" },
                  { l: "Success Rate", v: "78%", c: "var(--neon-cyan)" },
                ].map((k) => (
                  <div key={k.l} className="glass rounded-xl p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
                    <div className="text-2xl font-bold mt-1" style={{ color: k.c }}>
                      {k.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-32 rounded-xl bg-gradient-to-r from-[var(--neon-blue)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </div>
          </div>
          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute -left-8 top-20 glass-strong rounded-2xl p-3 shadow-elevated w-48"
          >
            <div className="text-[10px] text-muted-foreground">MATCH SCORE</div>
            <div className="text-2xl font-bold gradient-text">92%</div>
            <div className="text-xs mt-1">Google STEP Internship</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute -right-6 top-40 glass-strong rounded-2xl p-3 shadow-elevated w-48"
          >
            <div className="text-[10px] text-muted-foreground">AI/ML DEMAND</div>
            <div className="text-2xl font-bold text-emerald-400">+31%</div>
            <div className="text-xs mt-1">Trending this week</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-4 lg:px-8 pb-16">
      <div className="max-w-5xl mx-auto glass-strong rounded-2xl p-6 lg:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl lg:text-4xl font-bold gradient-text">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-4 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-wider text-[var(--neon-purple)]">Features</div>
          <h2 className="mt-2 text-3xl lg:text-5xl font-bold tracking-tight">Your unfair advantage</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Everything you need from discovery to offer — powered by a single AI brain.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 shadow-card group"
            >
              <div className="size-10 rounded-xl gradient-primary glow-sm flex items-center justify-center group-hover:scale-110 transition">
                <f.icon className="size-5 text-white" />
              </div>
              <div className="mt-4 font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "Forever — for students just getting started",
      features: ["50 opportunities/mo", "Basic resume analysis", "Weekly digest", "Community Copilot"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$9",
      desc: "Per month — most popular",
      features: ["Unlimited opportunities", "Hunter Bot 24/7", "Mock interviews", "Priority alerts", "Application Pack AI"],
      cta: "Start Pro",
      highlight: true,
    },
    {
      name: "Campus",
      price: "Custom",
      desc: "For colleges & placement cells",
      features: ["Bulk seats", "Cohort analytics", "Brand customization", "Dedicated success", "SSO"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="px-4 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-wider text-[var(--neon-purple)]">Pricing</div>
          <h2 className="mt-2 text-3xl lg:text-5xl font-bold tracking-tight">Simple, student-first</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 ${t.highlight ? "border-glow shadow-elevated" : "glass shadow-card"}`}
            >
              {t.highlight && (
                <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full gradient-primary text-white mb-3">
                  <Star className="size-3" /> Popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                {t.price !== "Free" && t.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
              <ul className="mt-5 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-[var(--neon-cyan)]" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth/signup"
                className={`mt-6 w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-medium ${
                  t.highlight ? "gradient-primary text-white glow-sm" : "glass hover:bg-white/8"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-wider text-[var(--neon-purple)]">FAQ</div>
          <h2 className="mt-2 text-3xl lg:text-5xl font-bold tracking-tight">Questions, answered</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 lg:px-8 py-12 border-t border-white/5 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg gradient-aurora flex items-center justify-center">
            <Radar className="size-4 text-white" />
          </div>
          <div className="text-sm font-semibold">OpportunityRadar AI</div>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 OpportunityRadar AI · Built for students</div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
