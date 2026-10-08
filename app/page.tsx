"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Cpu,
  Activity,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Code2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ChevronDown,
  Layers,
  Clock,
  Send,
  Building2,
  User,
  Phone,
  Mail,
  Lock,
  MessageSquare,
  FileCheck2,
  Workflow,
  Check,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "w-4 h-4 fill-current"} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

import NeuralMapCanvas from "@/components/NeuralMapCanvas";
import SourcesModal from "@/components/SourcesModal";
import VideoModal from "@/components/VideoModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { DICTIONARY } from "@/lib/i18n";
import { EVIDENCE_STUDIES } from "@/lib/evidence";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [demoScene, setDemoScene] = useState<"fd" | "doc" | "admin">("fd");
  const [doctorSigned, setDoctorSigned] = useState(false);
  const [audienceTab, setAudienceTab] = useState<"doctors" | "hospitals">("doctors");
  const [selectedLanguageDemo, setSelectedLanguageDemo] = useState<string>("Hindi");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Modals
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Demo form state
  const [formState, setFormState] = useState({
    name: "",
    hospital: "",
    role: "Hospital Director / Owner",
    whatsapp: "",
    email: "",
    consent: true,
    hp_field: "", // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hospitalos_lang");
      if (saved === "hi" || saved === "en") {
        setLang(saved);
      }
    } catch {
      // ignore
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangToggle = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    setLang(nextLang);
    try {
      localStorage.setItem("hospitalos_lang", nextLang);
    } catch {
      // ignore
    }
  };

  const t = DICTIONARY[lang];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.hp_field) return; // bot detected
    if (!formState.name || !formState.whatsapp || !formState.consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-[#EAF0FF] selection:bg-[#00E5C3]/30 selection:text-[#00E5C3] relative">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#00E5C3] via-[#4F7CFF] to-[#FF9F43] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* =========================================================================
          1. STICKY NAVIGATION
         ========================================================================= */}
      <nav className="fixed top-0 w-full z-40 bg-[#070B14]/80 backdrop-blur-xl border-b border-[rgba(79,124,255,0.18)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-heading font-bold text-lg text-foreground group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5C3] to-[#4F7CFF] flex items-center justify-center text-[#070B14] font-black text-base shadow-[0_0_20px_rgba(0,229,195,0.4)] group-hover:scale-105 transition-transform">
              +
            </span>
            <span>HospitalOS</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary">
              Beta
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#A9B4D0]">
            <a href="#platform" className="hover:text-[#00E5C3] transition-colors">{t.nav.product}</a>
            <a href="#how" className="hover:text-[#00E5C3] transition-colors">{t.nav.howItWorks}</a>
            <a href="#audience" className="hover:text-[#00E5C3] transition-colors">{t.nav.forDoctors}</a>
            <a href="#india" className="hover:text-[#00E5C3] transition-colors">{t.nav.forIndia}</a>
            <a href="#evidence" className="hover:text-[#00E5C3] transition-colors">{t.nav.evidence}</a>
            <a href="#developers" className="hover:text-[#00E5C3] transition-colors">{t.nav.developers}</a>
            <a href="#founder" className="hover:text-[#00E5C3] transition-colors">{t.nav.founder}</a>
            <a href="#roadmap" className="hover:text-[#00E5C3] transition-colors">{t.nav.roadmap}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLangToggle}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-[rgba(79,124,255,0.25)] bg-[#0F1626]/80 text-[#EAF0FF] hover:border-[#00E5C3] hover:text-[#00E5C3] transition-all flex items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "हिन्दी" : "EN"}</span>
            </button>
            <a
              href="#demo-form"
              className="px-4 py-2 bg-gradient-to-r from-[#00E5C3] to-[#4F7CFF] text-[#070B14] font-bold text-xs rounded-lg shadow-[0_0_20px_rgba(0,229,195,0.25)] hover:scale-105 transition-all"
            >
              {t.nav.bookDemo}
            </a>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          2. HERO SECTION
         ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Glowing Neural Map Layer */}
        <NeuralMapCanvas />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#070B14_75%)] pointer-events-none z-10" />

        <div className="relative z-20 max-w-4xl mx-auto text-center mt-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3]/30 text-[#00E5C3] text-[11px] font-bold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(0,229,195,0.15)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] animate-pulse" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.12] mb-6 font-heading"
          >
            {t.hero.h1Line1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] via-[#4F7CFF] to-[#FF9F43]">
              {t.hero.h1Line2}
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#A9B4D0] max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t.hero.subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href="#demo-form"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00E5C3] via-[#00E5C3] to-[#4F7CFF] text-[#070B14] font-bold text-sm rounded-xl shadow-[0_0_30px_rgba(0,229,195,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0F1626]/80 border border-[rgba(79,124,255,0.25)] text-[#EAF0FF] font-semibold text-sm rounded-xl hover:bg-[#141E34] hover:border-[#00E5C3] transition-all flex items-center justify-center gap-2"
            >
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </motion.div>

          {/* Founder micro-line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-[#A9B4D0] font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5C3]" />
            <span>{t.hero.founderLine}</span>
          </motion.div>
        </div>

        {/* Live Ticker Strip */}
        <div className="relative z-20 mt-12 max-w-5xl mx-auto w-full">
          <div className="bg-[#0A101D]/90 border border-[rgba(79,124,255,0.2)] rounded-xl py-2.5 px-4 overflow-hidden backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 text-xs text-[#A9B4D0] overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className="px-2 py-0.5 rounded bg-[#FF9F43]/15 text-[#FF9F43] font-mono text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                Simulated Live Feed
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] animate-ping" />
                Patient #204 checked in via QR
              </span>
              <span>·</span>
              <span className="text-[#EAF0FF] flex-shrink-0">Lab result (CBC) attached to record</span>
              <span>·</span>
              <span className="text-[#FF9F43] font-medium flex-shrink-0">Abnormal value flagged for Dr. Verma</span>
              <span>·</span>
              <span className="text-[#00E5C3] flex-shrink-0">Bed 14 ready in Ward B</span>
              <span>·</span>
              <span className="text-[#A9B4D0] flex-shrink-0">Follow-up reminder sent in Hindi via WhatsApp</span>
            </div>
          </div>
          <p className="text-center text-[11px] text-[#A9B4D0]/70 mt-3 font-mono">
            {t.hero.trustLine}
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. THE PROBLEM IN 15 SECONDS (Chaos to Clarity)
         ========================================================================= */}
      <section id="problem" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF9F43] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43]" />
            {t.problem.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-6 leading-tight">
            {t.problem.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#A9B4D0] leading-relaxed">
            {t.problem.intro}
          </p>
        </div>

        {/* Chaos to Clarity Interactive Graphic */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#0A101D] border border-[rgba(79,124,255,0.18)] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Fragmented Column */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#FF9F43] uppercase tracking-wider font-bold mb-2">
                Today: Fragmented Chaos
              </div>
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200 flex items-center justify-between">
                <span>📄 Handwritten Paper Slips</span>
                <span className="text-[10px] font-mono text-red-400">Lost Data</span>
              </div>
              <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-200 flex items-center justify-between">
                <span>💬 WhatsApp Chats & Photos</span>
                <span className="text-[10px] font-mono text-yellow-400">Unstructured</span>
              </div>
              <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 flex items-center justify-between">
                <span>🔬 Disconnected Lab Analyzers</span>
                <span className="text-[10px] font-mono text-orange-400">Manual Re-typing</span>
              </div>
            </div>

            {/* Transform Beam */}
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5C3]/20 to-[#4F7CFF]/20 border border-[#00E5C3]/40 flex items-center justify-center text-[#00E5C3] shadow-[0_0_25px_rgba(0,229,195,0.3)] mb-2">
                <Workflow className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs font-mono text-[#00E5C3] font-bold">HospitalOS Neural Layer</span>
              <span className="text-[10px] text-[#A9B4D0] mt-1">Automatic Ingestion & Structuring</span>
            </div>

            {/* Unified Result */}
            <div className="p-5 rounded-2xl bg-[#0F1626] border border-[#00E5C3]/30 shadow-[0_0_30px_rgba(0,229,195,0.1)]">
              <div className="text-xs font-mono text-[#00E5C3] uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                HospitalOS: One Unified Timeline
              </div>
              <p className="text-xs text-[#A9B4D0] leading-relaxed mb-3">
                Patient identity, doctor audio consultation, analyzer values, and ward status unified into a single live patient state.
              </p>
              <div className="p-2 rounded bg-black/40 border border-[rgba(79,124,255,0.15)] text-[11px] font-mono text-[#EAF0FF]">
                ✓ Patient #204: 1 Timeline · 0 Manual Re-types
              </div>
            </div>
          </div>
        </div>

        {/* Four Evidence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#00E5C3]/50 transition-all group">
            <div className="text-3xl font-extrabold text-[#00E5C3] font-heading mb-2">~2 hrs</div>
            <p className="text-xs text-[#EAF0FF] mb-3 leading-relaxed">
              For every hour doctors spend face to face with patients, nearly two more hours go to EHR and desk work, plus 1-2 hours at night.
            </p>
            <div className="text-[11px] text-[#A9B4D0] font-mono border-t border-[rgba(79,124,255,0.15)] pt-2">
              Sinsky et al., Annals of Internal Medicine, 2016
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#4F7CFF]/50 transition-all group">
            <div className="text-3xl font-extrabold text-[#4F7CFF] font-heading mb-2">1 : 834</div>
            <p className="text-xs text-[#EAF0FF] mb-3 leading-relaxed">
              India’s official doctor-population ratio against WHO benchmark (1:1000), but only 2.06 nurses/1000. Every clinician-minute must count.
            </p>
            <div className="text-[11px] text-[#A9B4D0] font-mono border-t border-[rgba(79,124,255,0.15)] pt-2">
              Government of India, Parliamentary Data
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#FF9F43]/50 transition-all group">
            <div className="text-3xl font-extrabold text-[#FF9F43] font-heading mb-2">~4.6%</div>
            <p className="text-xs text-[#EAF0FF] mb-3 leading-relaxed">
              Manual data entry and transcription are reported to cause about 4.6% of hospital laboratory errors. Machines should hand results over directly.
            </p>
            <div className="text-[11px] text-[#A9B4D0] font-mono border-t border-[rgba(79,124,255,0.15)] pt-2">
              Lewin Group / Lab Services Data
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#A855F7]/50 transition-all group">
            <div className="text-3xl font-extrabold text-[#A855F7] font-heading mb-2">3 signals</div>
            <p className="text-xs text-[#EAF0FF] mb-3 leading-relaxed">
              Across a review of 24 studies, patient age, prior missed appointments, and booking lead time were the strongest predictors of no-shows.
            </p>
            <div className="text-[11px] text-[#A9B4D0] font-mono border-t border-[rgba(79,124,255,0.15)] pt-2">
              Salazar et al., Information, 2022
            </div>
          </div>
        </div>

        <p className="text-center text-sm font-semibold text-[#00E5C3] mt-10">
          {t.problem.bridge}
        </p>
      </section>

      {/* =========================================================================
          4. THE PLATFORM: FOUR SUPERPOWERS (Bento Grid)
         ========================================================================= */}
      <section id="platform" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5C3] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3]" />
            {t.platform.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            Four <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] to-[#4F7CFF]">superpowers</span> in one system
          </h2>
          <p className="text-[#A9B4D0] text-sm sm:text-base max-w-2xl mx-auto">
            {t.platform.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Patient Journey Manager */}
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#00E5C3]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#00E5C3]/10 border border-[#00E5C3]/30 flex items-center justify-center text-[#00E5C3] shadow-[0_0_20px_rgba(0,229,195,0.2)]">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/30">
                  Patient Experience
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">1. Patient Journey Manager</h3>
              <p className="text-sm text-[#A9B4D0] leading-relaxed mb-6">
                From first WhatsApp message to follow-up, one thread. Book on WhatsApp or web, check in with QR code, see live queues, and receive reminders in Hindi or English.
              </p>

              {/* Mini visual */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(79,124,255,0.15)] mb-6 space-y-2">
                <div className="flex justify-between text-xs text-[#A9B4D0]">
                  <span>Queue token #A-14</span>
                  <span className="text-[#00E5C3] font-bold">~12 min wait</span>
                </div>
                <div className="w-full bg-[#0F1626] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00E5C3] to-[#4F7CFF] h-full w-3/4 rounded-full" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/30">QR Check-in</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Smart Queue</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Multilingual Reminders</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Digital Records</span>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">ABHA Link · Roadmap</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[rgba(79,124,255,0.15)] text-xs text-[#A9B4D0]">
              <strong className="text-[#00E5C3]">Why it matters: </strong>
              India’s ABDM has 104 Cr+ health records across 93 Cr+ ABHA accounts. Paperless QR check-in removes the registration desk bottleneck entirely.
            </div>
          </div>

          {/* Card 2: Doctor AI Co-Pilot */}
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#4F7CFF]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#4F7CFF]/10 border border-[#4F7CFF]/30 flex items-center justify-center text-[#4F7CFF] shadow-[0_0_20px_rgba(79,124,255,0.2)]">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#4F7CFF]/10 text-[#4F7CFF] border border-[#4F7CFF]/30">
                  Doctor Co-Pilot
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">2. Doctor AI Co-Pilot</h3>
              <p className="text-sm text-[#A9B4D0] leading-relaxed mb-6">
                Less typing, more looking at the patient. Speak naturally in Hindi or English. The co-pilot drafts structured visit notes, summarizes history, and highlights investigations.
              </p>

              {/* Mini visual */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(79,124,255,0.15)] mb-6 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-[#4F7CFF]">
                  <span className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-pulse" />
                  <span>Ambient Audio [Hindi/EN]</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Doctor Signs
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#4F7CFF] border border-[#4F7CFF]/30">Voice-to-Notes</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Auto-Summary</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Prescription Drafts</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Suggested Investigations</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[rgba(79,124,255,0.15)] text-xs text-[#A9B4D0]">
              <strong className="text-[#4F7CFF]">Why it matters: </strong>
              In an RCT with 238 physicians (Lukac et al., NEJM AI 2025), scribes cut documentation time by 9.5%. Clinician review is mandatory for every note.
            </div>
          </div>

          {/* Card 3: Machine Integration Hub */}
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#FF9F43]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9F43]/10 border border-[#FF9F43]/30 flex items-center justify-center text-[#FF9F43] shadow-[0_0_20px_rgba(255,159,67,0.2)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FF9F43]/10 text-[#FF9F43] border border-[#FF9F43]/30">
                  Device Hub · Roadmap
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">3. Machine Integration Hub</h3>
              <p className="text-sm text-[#A9B4D0] leading-relaxed mb-6">
                Machines speak. Your hospital finally listens. Connect lab analyzers, patient monitors, and imaging devices. Results flow straight into the patient timeline; abnormal values are flagged.
              </p>

              {/* Mini visual */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(79,124,255,0.15)] mb-6 flex items-center justify-between text-xs font-mono">
                <span className="text-[#FF9F43]">HL7 / ASTM Direct Stream</span>
                <span className="text-emerald-400">0 Manual Re-types</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-[#FF9F43]/10 text-[#FF9F43] border border-[#FF9F43]/30">Lab Analyzers (HL7/ASTM)</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">ECG & Monitors</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Imaging (DICOM)</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Abnormal Flagging</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[rgba(79,124,255,0.15)] text-xs text-[#A9B4D0]">
              <strong className="text-[#FF9F43]">Why it matters: </strong>
              Clinical analyzers already support HL7 and ASTM. Direct machine connectors eliminate transcription errors reported in hospital lab diagnostics.
            </div>
          </div>

          {/* Card 4: AI Ops Command Center */}
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#A855F7]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
                  Operations Command
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">4. AI Ops Command Center</h3>
              <p className="text-sm text-[#A9B4D0] leading-relaxed mb-6">
                The whole hospital on one screen. A live view of beds, doctor load, wait times, inventory alerts, and no-show prediction, with a concise daily AI operational briefing.
              </p>

              {/* Mini visual */}
              <div className="p-4 rounded-xl bg-[#070B14] border border-[rgba(79,124,255,0.15)] mb-6 flex items-center justify-between text-xs font-mono">
                <span className="text-[#A855F7]">ICU Beds: 88% Capacity</span>
                <span className="text-yellow-400">Nurse Reallocation Alert</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">Live Bed Map</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Doctor Load</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">No-Show Predictor</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-border text-[#EAF0FF]">Early Warning · Roadmap</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[rgba(79,124,255,0.15)] text-xs text-[#A9B4D0]">
              <strong className="text-[#A855F7]">Why it matters: </strong>
              Machine-learning early warnings have shown significant in-hospital mortality reductions when acted upon quickly (Adams et al., Nature Medicine 2022).
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE PRODUCT DEMO (Three Real Workflows)
         ========================================================================= */}
      <section id="demo" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5C3] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3]" />
            Interactive Simulation
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            {t.demo.heading}
          </h2>
          <p className="text-[#A9B4D0] text-sm sm:text-base max-w-xl mx-auto">
            {t.demo.subhead}
          </p>
        </div>

        {/* Demo Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0A101D] border border-[rgba(79,124,255,0.25)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Tabs */}
          <div className="p-3 sm:p-4 bg-[#070B14] border-b border-[rgba(79,124,255,0.18)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-[#A9B4D0] ml-3 hidden sm:inline">
                hospitalos-cloud.app / live-simulator
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDemoScene("fd")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoScene === "fd"
                    ? "bg-[#00E5C3] text-[#070B14] shadow-[0_0_15px_rgba(0,229,195,0.3)]"
                    : "bg-white/5 text-[#A9B4D0] hover:text-[#EAF0FF]"
                }`}
              >
                1. {t.demo.frontDeskTab}
              </button>
              <button
                onClick={() => setDemoScene("doc")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoScene === "doc"
                    ? "bg-[#4F7CFF] text-[#EAF0FF] shadow-[0_0_15px_rgba(79,124,255,0.3)]"
                    : "bg-white/5 text-[#A9B4D0] hover:text-[#EAF0FF]"
                }`}
              >
                2. {t.demo.doctorTab}
              </button>
              <button
                onClick={() => setDemoScene("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  demoScene === "admin"
                    ? "bg-[#A855F7] text-[#EAF0FF] shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-white/5 text-[#A9B4D0] hover:text-[#EAF0FF]"
                }`}
              >
                3. {t.demo.adminTab}
              </button>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="p-6 sm:p-10 min-h-[380px] flex items-center justify-center">
            {/* SCENE 1: FRONT DESK */}
            {demoScene === "fd" && (
              <div className="w-full max-w-2xl space-y-6">
                <div className="p-5 rounded-2xl bg-[#0F1626] border border-[#00E5C3]/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00E5C3]/15 text-[#00E5C3] flex items-center justify-center font-bold">
                        QR
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">Rapid ABHA / QR Intake</div>
                        <div className="text-xs text-[#A9B4D0]">Paperless token generation in 18 seconds</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 font-mono text-xs">
                      Active Token: #A-42
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                    <div className="p-2.5 rounded bg-black/40 border border-border/40">
                      <span className="text-[#A9B4D0] block text-[10px]">Patient Name</span>
                      <strong className="text-foreground">Rajesh Sharma</strong>
                    </div>
                    <div className="p-2.5 rounded bg-black/40 border border-border/40">
                      <span className="text-[#A9B4D0] block text-[10px]">Age / Sex</span>
                      <strong className="text-foreground">48 / Male</strong>
                    </div>
                    <div className="p-2.5 rounded bg-black/40 border border-border/40">
                      <span className="text-[#A9B4D0] block text-[10px]">Assigned Doctor</span>
                      <strong className="text-foreground">Dr. Verma (OPD 3)</strong>
                    </div>
                    <div className="p-2.5 rounded bg-black/40 border border-border/40">
                      <span className="text-[#A9B4D0] block text-[10px]">Estimated Wait</span>
                      <strong className="text-[#00E5C3]">~12 mins</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#070B14] border border-[rgba(79,124,255,0.2)] text-xs text-[#A9B4D0] flex items-center justify-between">
                    <span>WhatsApp Token & Directions sent in Hindi: “आपका टोकन #A-42 तैयार है”</span>
                    <span className="text-[#00E5C3] font-bold text-[11px]">✓ Delivered</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2: DOCTOR CO-PILOT */}
            {demoScene === "doc" && (
              <div className="w-full max-w-2xl space-y-4">
                <div className="p-5 rounded-2xl bg-[#0F1626] border border-[#4F7CFF]/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#4F7CFF]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4F7CFF] animate-ping" />
                      <span>Doctor-Patient Ambient Listening: Hindi + English</span>
                    </div>
                    <span className="text-xs text-[#A9B4D0] font-mono">Encounter #9820</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-border/60 text-xs font-mono text-[#00E5C3] mb-4 space-y-1">
                    <div className="text-muted text-[10px]">LIVE GENERATED CLINICAL SOAP DRAFT:</div>
                    <p>• Subjective: 48M presents with 3 days of exertional chest heaviness, non-radiating.</p>
                    <p>• Objective: BP 138/88 mmHg. Pulse 78 bpm regular. S1/S2 normal.</p>
                    <p className="text-[#FF9F43]">
                      • Lab Anomaly Flag: Serum Troponin I = 0.14 ng/mL [HIGH - Direct from Beckman Analyzer]
                    </p>
                    <p>• Plan: Urgent 12-lead ECG, Aspirin 300mg stat, cardiology consult.</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#A9B4D0]">
                      AI drafts structured notes. Clinician verifies and signs.
                    </span>
                    <button
                      onClick={() => setDoctorSigned(!doctorSigned)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        doctorSigned
                          ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                          : "bg-gradient-to-r from-[#4F7CFF] to-[#00E5C3] text-[#070B14]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {doctorSigned ? "Signed & Committed" : "Approve & Sign Note"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 3: ADMIN COMMAND CENTER */}
            {demoScene === "admin" && (
              <div className="w-full max-w-2xl space-y-4">
                <div className="p-5 rounded-2xl bg-[#0F1626] border border-[#A855F7]/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                      <span className="text-sm font-bold text-foreground font-heading">
                        Facility Operations & Bed Grid
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#A9B4D0]">Total Beds: 48 | Occupancy: 83%</span>
                  </div>

                  {/* Bed Grid */}
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-center font-mono text-[11px] border ${
                          i === 2 || i === 7
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            : i === 5
                            ? "bg-[#FF9F43]/15 border-[#FF9F43]/40 text-[#FF9F43]"
                            : "bg-[#070B14] border-border text-[#A9B4D0]"
                        }`}
                      >
                        B-{i + 1}
                        <span className="block text-[9px] opacity-70">
                          {i === 2 || i === 7 ? "FREE" : i === 5 ? "ICU" : "OCC"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* AI Recommendation Chip */}
                  <div className="p-3.5 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#A855F7] flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-foreground block">AI Real-Time Recommendation:</strong>
                      <span className="text-[#A9B4D0]">
                        OPD surge detected (18 walk-ins in last 30 mins). Suggest shifting Nurse R. Sharma from Ward 2 to OPD Triage to maintain &lt;15 min wait benchmark.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Caption */}
          <div className="p-3 bg-[#070B14] border-t border-[rgba(79,124,255,0.18)] text-center text-xs text-[#A9B4D0] font-mono">
            {t.demo.caption}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HOW IT WORKS (3 Steps Timeline)
         ========================================================================= */}
      <section id="how" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4F7CFF] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
            {t.howItWorks.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            {t.howItWorks.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#00E5C3]/40 transition-all relative">
            <div className="text-5xl font-black font-heading text-[#00E5C3]/20 mb-4">01</div>
            <h3 className="text-xl font-bold font-heading mb-3 text-foreground">{t.howItWorks.step1Title}</h3>
            <p className="text-sm text-[#A9B4D0] leading-relaxed">
              {t.howItWorks.step1Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#4F7CFF]/40 transition-all relative">
            <div className="text-5xl font-black font-heading text-[#4F7CFF]/20 mb-4">02</div>
            <h3 className="text-xl font-bold font-heading mb-3 text-foreground">{t.howItWorks.step2Title}</h3>
            <p className="text-sm text-[#A9B4D0] leading-relaxed">
              {t.howItWorks.step2Desc}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#FF9F43]/40 transition-all relative">
            <div className="text-5xl font-black font-heading text-[#FF9F43]/20 mb-4">03</div>
            <h3 className="text-xl font-bold font-heading mb-3 text-foreground">{t.howItWorks.step3Title}</h3>
            <p className="text-sm text-[#A9B4D0] leading-relaxed">
              {t.howItWorks.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOR DOCTORS / FOR HOSPITALS (Interactive Split Toggle)
         ========================================================================= */}
      <section id="audience" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0A101D] border border-[rgba(79,124,255,0.25)]">
            <button
              onClick={() => setAudienceTab("doctors")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                audienceTab === "doctors"
                  ? "bg-[#00E5C3] text-[#070B14] shadow-[0_0_20px_rgba(0,229,195,0.3)]"
                  : "text-[#A9B4D0] hover:text-[#EAF0FF]"
              }`}
            >
              {t.splitAudience.doctorTab}
            </button>
            <button
              onClick={() => setAudienceTab("hospitals")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                audienceTab === "hospitals"
                  ? "bg-[#4F7CFF] text-[#EAF0FF] shadow-[0_0_20px_rgba(79,124,255,0.3)]"
                  : "text-[#A9B4D0] hover:text-[#EAF0FF]"
              }`}
            >
              {t.splitAudience.hospitalTab}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.25)] shadow-2xl">
          {audienceTab === "doctors" ? (
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#00E5C3] font-bold uppercase tracking-wider">
                Clinician Workflow First
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
                {t.splitAudience.doctorTitle}
              </h3>
              <p className="text-base sm:text-lg text-[#A9B4D0] leading-relaxed">
                {t.splitAudience.doctorDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(79,124,255,0.15)]">
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#00E5C3] mb-1">Zero Screen Typing</div>
                  <p className="text-xs text-[#A9B4D0]">Converse in Hindi/English; notes generate in real-time.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#00E5C3] mb-1">Pre-Visit Digest</div>
                  <p className="text-xs text-[#A9B4D0]">Past chronic history and allergies summarized in 3 bullets.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#00E5C3] mb-1">Human Signing Authority</div>
                  <p className="text-xs text-[#A9B4D0]">Doctor reviews, alters, and executes every prescription.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#4F7CFF] font-bold uppercase tracking-wider">
                Hospital Administration & ROI
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
                {t.splitAudience.hospitalTitle}
              </h3>
              <p className="text-base sm:text-lg text-[#A9B4D0] leading-relaxed">
                {t.splitAudience.hospitalDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(79,124,255,0.15)]">
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#4F7CFF] mb-1">Real-Time Bed View</div>
                  <p className="text-xs text-[#A9B4D0]">Live occupancy alerts across general wards and ICUs.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#4F7CFF] mb-1">Automated Follow-ups</div>
                  <p className="text-xs text-[#A9B4D0]">Cut clinic no-shows via automated WhatsApp nudges.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#070B14] border border-border">
                  <div className="text-sm font-bold text-[#4F7CFF] mb-1">Direct Lab Feeds</div>
                  <p className="text-xs text-[#A9B4D0]">Eliminate manual lab transcription errors and delays.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          8. BUILT FOR INDIA (ABDM, WhatsApp, UPI, Language Demo)
         ========================================================================= */}
      <section id="india" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF9F43] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43]" />
            {t.india.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-6">
            {t.india.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#A9B4D0] leading-relaxed">
            {t.india.body}
          </p>
        </div>

        {/* WhatsApp & Multilingual Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Simulated WhatsApp Chat */}
          <div className="p-6 rounded-3xl bg-[#0B141E] border border-[rgba(79,124,255,0.2)] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold">
                  H
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">HospitalOS WhatsApp Bot</div>
                  <div className="text-[10px] text-[#00E5C3]">Official Facility Channel</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-muted">2:14 PM</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#1F2C34] text-foreground max-w-[85%]">
                नमस्ते श्री शर्मा! डॉक्टर वर्मा के साथ आपका परामर्श कल सुबह 10:30 बजे निर्धारित है। कृपया अपने टोकन #A-42 के साथ समय पर पहुंचें।
              </div>
              <div className="p-3 rounded-2xl rounded-tr-sm bg-[#005C4B] text-white ml-auto max-w-[80%] text-right">
                धन्यवाद! क्या मुझे अपनी पुरानी खून की रिपोर्ट लानी होगी?
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#1F2C34] text-foreground max-w-[85%]">
                नहीं, आपकी पुरानी रिपोर्ट हमारे सिस्टम में सुरक्षित जुड़ी हुई हैं। कल मिलते हैं!
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-[#A9B4D0]">
              <span>WhatsApp-First Patient Communications</span>
              <span className="text-[#00E5C3] font-bold">UPI Integrated</span>
            </div>
          </div>

          {/* Language Switcher Demo */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#00E5C3] font-bold uppercase tracking-wider">
              Interactive Regional Language Demo
            </div>
            <h4 className="text-xl font-bold font-heading text-foreground">
              Healthcare in the patient&apos;s mother tongue.
            </h4>
            <p className="text-sm text-[#A9B4D0] leading-relaxed">
              India speaks hundreds of languages. HospitalOS makes instructions, follow-ups, and queue announcements clear in any language:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "English"].map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLanguageDemo(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLanguageDemo === l
                      ? "bg-[#00E5C3] text-[#070B14]"
                      : "bg-[#0F1626] border border-border text-[#A9B4D0] hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#0F1626] border border-[#00E5C3]/30 text-xs">
              <span className="text-[10px] text-[#00E5C3] block font-mono mb-1">
                Generated {selectedLanguageDemo} Instruction:
              </span>
              <p className="text-foreground italic">
                {selectedLanguageDemo === "Hindi" && "“दवाई दिन में दो बार खाने के बाद लें और 5 दिन बाद जांच करवाएं।”"}
                {selectedLanguageDemo === "Bengali" && "“খাওয়ার পরে দিনে দুবার ওষুধ নিন এবং ৫ দিন পর ফলো-আপ করুন।”"}
                {selectedLanguageDemo === "Tamil" && "“உணவுக்குப் பிறகு தினமும் இரண்டு முறை மருந்தை உட்கொள்ளவும்.”"}
                {selectedLanguageDemo === "Telugu" && "“భోజనం తర్వాత రోజుకు రెండుసార్లు మందులు తీసుకోండి.”"}
                {selectedLanguageDemo === "Marathi" && "“जेवणानंतर दिवसातून दोनदा औषध घ्या आणि ५ दिवसांनी तपासणी करा.”"}
                {selectedLanguageDemo === "English" && "“Take medication twice daily after meals and follow up in 5 days.”"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. SECURITY, PRIVACY & RESPONSIBLE AI
         ========================================================================= */}
      <section id="security" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5C3] tracking-widest uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-[#00E5C3]" />
            {t.security.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-6">
            {t.security.heading}
          </h2>
          <p className="text-base text-[#A9B4D0] leading-relaxed">
            {t.security.body}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
            <Lock className="w-6 h-6 text-[#00E5C3] mb-3" />
            <h4 className="text-sm font-bold font-heading mb-1 text-foreground">Consent-First Design</h4>
            <p className="text-xs text-[#A9B4D0]">Patient records are unlocked strictly with logged, verifiable consent.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
            <User className="w-6 h-6 text-[#4F7CFF] mb-3" />
            <h4 className="text-sm font-bold font-heading mb-1 text-foreground">Role-Based Access</h4>
            <p className="text-xs text-[#A9B4D0]">Granular boundaries between billing, nurses, lab techs, and clinicians.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
            <FileCheck2 className="w-6 h-6 text-[#FF9F43] mb-3" />
            <h4 className="text-sm font-bold font-heading mb-1 text-foreground">Immutable Audit Logs</h4>
            <p className="text-xs text-[#A9B4D0]">Every view, access, and prescription alteration is cryptographically logged.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)]">
            <ShieldCheck className="w-6 h-6 text-[#A855F7] mb-3" />
            <h4 className="text-sm font-bold font-heading mb-1 text-foreground">Human-in-the-Loop AI</h4>
            <p className="text-xs text-[#A9B4D0]">AI drafts and flags; licensed doctors hold final signing authority.</p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="max-w-4xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center text-xs text-amber-200">
          <strong>Mandatory Clinical Responsibility Notice: </strong>
          {t.security.disclaimer}
        </div>
      </section>

      {/* =========================================================================
          10. EVIDENCE SECTION: BUILT ON RESEARCH, NOT HYPE
         ========================================================================= */}
      <section id="evidence" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4F7CFF] tracking-widest uppercase mb-3">
            <BookOpen className="w-4 h-4 text-[#4F7CFF]" />
            Peer-Reviewed Literature
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            Built on research, not hype.
          </h2>
          <p className="text-sm sm:text-base text-[#A9B4D0]">
            The published clinical studies behind each module, and how they shape what we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {EVIDENCE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="p-6 rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] hover:border-[#00E5C3]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">
                    {study.category}
                  </span>
                  <span className="text-lg font-bold text-[#00E5C3] font-mono">{study.stat}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">{study.title}</h4>
                <p className="text-xs text-[#A9B4D0] mb-4 leading-relaxed">
                  “{study.finding}”
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(79,124,255,0.15)] text-xs">
                <span className="text-[10px] text-[#4F7CFF] block font-mono mb-1">
                  How it shapes HospitalOS:
                </span>
                <p className="text-[#A9B4D0] text-[11px] leading-relaxed">{study.howItShapes}</p>
                <div className="mt-2 text-[10px] text-[#A9B4D0]/60 font-mono">{study.source}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsSourcesOpen(true)}
            className="px-6 py-3 rounded-xl bg-white/5 border border-border text-foreground hover:bg-white/10 hover:border-[#00E5C3] text-xs font-semibold transition-all inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#00E5C3]" />
            <span>Open Complete Sources & Citations Index</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          11. DEVELOPERS & OPEN SOURCE (GitHub Card & SDK)
         ========================================================================= */}
      <section id="developers" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5C3] tracking-widest uppercase mb-3">
            <Code2 className="w-4 h-4 text-[#00E5C3]" />
            {t.developers.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            {t.developers.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#A9B4D0]">
            {t.developers.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* GitHub Card */}
          <div className="p-8 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.25)] shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GithubIcon className="w-8 h-8 text-foreground" />
                <div>
                  <h4 className="text-base font-bold text-foreground font-heading">DreamFaang78 / cautious-memory</h4>
                  <span className="text-xs text-[#A9B4D0]">Public Repository · MIT Licensed</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                Active Alpha
              </span>
            </div>

            <p className="text-xs text-[#A9B4D0] leading-relaxed">
              Open-source AI platform for hospital operations in India: unified patient and doctor workflows, medical device integration and AI-driven ops. Early-stage developer platform building hosted cloud services for healthcare.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#A9B4D0] pt-2 border-t border-[rgba(79,124,255,0.15)]">
              <div>Language: <strong className="text-foreground">TypeScript</strong></div>
              <div>Stack: <strong className="text-foreground">Next.js Turbopack</strong></div>
              <div>Deploys: <strong className="text-foreground">Vercel Edge</strong></div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/DreamFaang78/cautious-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#00E5C3] text-[#070B14] font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,229,195,0.25)] hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
              <Link
                href="/docs"
                className="px-5 py-2.5 bg-white/5 border border-border text-foreground hover:bg-white/10 text-xs font-semibold rounded-xl transition-all"
              >
                Read Developer Docs
              </Link>
            </div>
          </div>

          {/* Device Connector Code Snippet */}
          <div className="rounded-2xl bg-[#05080E] border border-[rgba(79,124,255,0.2)] p-5 font-mono text-xs overflow-x-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/40 text-[11px] text-[#A9B4D0]">
              <span>device-listener.ts</span>
              <span className="text-[#00E5C3]">@hospitalos/sdk</span>
            </div>
            <pre className="text-[#00E5C3] leading-relaxed">{`import { HospitalOSClient } from "@hospitalos/sdk";

const client = new HospitalOSClient({
  facilityId: "IN-UP-KNP-042",
  apiKey: process.env.HOSPITALOS_KEY
});

// Stream lab analyzer events directly
client.devices.onLabResult(async ({ barcode, observations }) => {
  const patient = await client.patients.findByBarcode(barcode);
  await client.records.attachLabObservation({
    patientId: patient.id,
    results: observations
  });
});`}</pre>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. ROADMAP (Now, Next, Later)
         ========================================================================= */}
      <section id="roadmap" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF9F43] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43]" />
            Transparent Milestone Execution
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            Product Roadmap
          </h2>
          <p className="text-sm sm:text-base text-[#A9B4D0]">
            Honest and ambitious. Exactly where the platform is today and where it is going next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* NOW */}
          <div className="p-6 rounded-3xl bg-[#0F1626] border border-[#00E5C3]/40 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#00E5C3]/15 text-[#00E5C3] font-mono text-xs font-bold">
              NOW (Active)
            </span>
            <h4 className="text-lg font-bold font-heading text-foreground">Foundation & Pilot Outreach</h4>
            <ul className="space-y-2 text-xs text-[#A9B4D0]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00E5C3] mt-0.5" />
                <span>Next-generation landing page & hosted platform</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00E5C3] mt-0.5" />
                <span>Three-workflow interactive simulation dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00E5C3] mt-0.5" />
                <span>Open-source architecture core on GitHub</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00E5C3] mt-0.5" />
                <span>Doctor & clinic director discovery interviews</span>
              </li>
            </ul>
          </div>

          {/* NEXT */}
          <div className="p-6 rounded-3xl bg-[#0F1626] border border-[#4F7CFF]/40 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#4F7CFF]/15 text-[#4F7CFF] font-mono text-xs font-bold">
              NEXT (Q1-Q2)
            </span>
            <h4 className="text-lg font-bold font-heading text-foreground">Clinical Validation Pilots</h4>
            <ul className="space-y-2 text-xs text-[#A9B4D0]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] mt-1.5" />
                <span>Patient Journey MVP with WhatsApp check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] mt-1.5" />
                <span>First lab analyzer connector (HL7 / ASTM)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] mt-1.5" />
                <span>Ambient voice notes pilot in Hindi and English</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] mt-1.5" />
                <span>ABDM / ABHA QR paperless token integration</span>
              </li>
            </ul>
          </div>

          {/* LATER */}
          <div className="p-6 rounded-3xl bg-[#0F1626] border border-[#FF9F43]/40 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#FF9F43]/15 text-[#FF9F43] font-mono text-xs font-bold">
              LATER (Scale)
            </span>
            <h4 className="text-lg font-bold font-heading text-foreground">Multi-Facility AI Network</h4>
            <ul className="space-y-2 text-xs text-[#A9B4D0]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] mt-1.5" />
                <span>AI Ops Command Center with predictive bed utilization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] mt-1.5" />
                <span>No-show machine learning and automatic queue backfilling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] mt-1.5" />
                <span>Early warning clinical alerts following formal validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] mt-1.5" />
                <span>Multi-hospital and clinic chain enterprise governance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. FOUNDER SECTION (Agam Singh - Solo Founder)
         ========================================================================= */}
      <section id="founder" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0F1626] border border-[rgba(79,124,255,0.25)] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#00E5C3] shadow-[0_0_30px_rgba(0,229,195,0.3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/120456245"
                  alt="Agam Singh"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#00E5C3] text-[#070B14] font-mono font-bold text-[10px]">
                Solo Builder
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="text-xs font-mono text-[#00E5C3] uppercase tracking-wider font-bold">
                  {t.founder.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mt-1">
                  Agam Singh
                </h3>
                <p className="text-xs text-[#A9B4D0] font-mono">
                  {t.founder.role} · Kanpur, India
                </p>
              </div>

              <p className="text-sm text-[#A9B4D0] leading-relaxed">
                {t.founder.bio}
              </p>

              <div className="p-3.5 rounded-xl bg-[#070B14] border border-[rgba(79,124,255,0.2)] text-xs text-[#00E5C3]">
                <strong className="text-foreground">Why solo is a strength: </strong>
                {t.founder.whySolo}
              </div>

              {/* Founder Note */}
              <blockquote className="p-4 rounded-xl bg-black/40 border-l-2 border-[#FF9F43] text-xs text-[#EAF0FF] italic leading-relaxed">
                “{t.founder.note}”
              </blockquote>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[#A9B4D0] block mb-2">BUILDER STACK:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "GraphQL",
                    "TensorFlow",
                    "Google Cloud",
                    "Appwrite",
                    "TypeScript",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded bg-white/5 border border-border text-[11px] text-[#A9B4D0] font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking for */}
              <div className="pt-2 text-xs text-[#A9B4D0]">
                <strong className="text-foreground">Currently looking for: </strong>
                Pilot hospitals and clinics · Clinical advisors · Engineering collaborators · Mentors & early investors
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="https://github.com/DreamFaang78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-border text-foreground hover:text-[#00E5C3] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/agam-singh-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-border text-foreground hover:text-[#4F7CFF] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0c0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/faangagam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-border text-foreground hover:text-sky-400 transition-colors"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://amsh.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/5 border border-border text-xs text-foreground hover:text-[#00E5C3] transition-colors font-mono"
                >
                  amsh.me
                </a>
                <a
                  href="https://leetcode.com/agamsingh78/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/5 border border-border text-xs text-foreground hover:text-[#FF9F43] transition-colors font-mono"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. FAQ ACCORDION
         ========================================================================= */}
      <section id="faq" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5C3] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3]" />
            Clarity & Transparency
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4">
            {t.faq.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#A9B4D0]">
            {t.faq.subhead}
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Does HospitalOS replace doctors?",
              a: "No. HospitalOS is strictly an assistive co-pilot. AI drafts, summarises, and flags anomalies. Licensed clinicians review, edit, decide, and sign every note and prescription.",
            },
            {
              q: "Is patient data safe and compliant?",
              a: "The platform is engineered around consent-first architecture, role-based boundaries, immutable audit logs, and strong encryption in transit and at rest, aligning with India's DPDP Rules 2025.",
            },
            {
              q: "Which machines can it connect to?",
              a: "We start with laboratory analyzers that communicate over HL7 and ASTM serial/TCP feeds, followed by bedside vitals monitors and DICOM imaging devices. We work directly with device drivers.",
            },
            {
              q: "Does it work with ABDM and ABHA?",
              a: "Yes. ABDM-ready architecture is on our active roadmap, designed to plug directly into ABHA QR paperless tokens and unified health records.",
            },
            {
              q: "Is HospitalOS open source?",
              a: "The core platform is open source on GitHub. Hosted, managed enterprise cloud instances are offered with complete SLA, compliance, and device setup.",
            },
            {
              q: "Which languages are supported?",
              a: "Hindi and English today, with support for Bengali, Tamil, Telugu, and Marathi on the immediate roadmap.",
            },
            {
              q: "What does pilot access cost?",
              a: "Early-access hospital and clinic pilots are currently being scoped with zero platform license fees for collaborative launch partners.",
            },
            {
              q: "Who is behind HospitalOS?",
              a: "Agam Singh, a solo founder and full-stack engineer from Kanpur, India, building in the open with deep focus on Indian health-tech realities.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0F1626] border border-[rgba(79,124,255,0.18)] overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-foreground hover:text-[#00E5C3] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted transition-transform duration-200 ${
                    activeFaq === idx ? "rotate-180 text-[#00E5C3]" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#A9B4D0] leading-relaxed border-t border-[rgba(79,124,255,0.1)] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          15. FINAL CTA & DEMO FORM
         ========================================================================= */}
      <section id="demo-form" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative z-20">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#0F1626] to-[#070B14] border border-[#00E5C3]/40 shadow-[0_0_60px_rgba(0,229,195,0.15)] relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-mono text-[#00E5C3] font-bold uppercase tracking-wider block mb-3">
              Pilot Onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading mb-4 text-foreground">
              {t.cta.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4D0]">
              {t.cta.subhead}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center max-w-md mx-auto space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-foreground">Demo Request Received</h4>
              <p className="text-xs text-[#A9B4D0] leading-relaxed">{t.cta.success}</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-4 text-xs">
              {/* Honeypot field */}
              <input
                type="text"
                name="hp_field"
                value={formState.hp_field}
                onChange={(e) => setFormState({ ...formState, hp_field: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#A9B4D0] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Rajesh Gupta"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-border text-foreground focus:outline-none focus:border-[#00E5C3]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#A9B4D0] mb-1">Hospital or Clinic Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="City Care Hospital"
                    value={formState.hospital}
                    onChange={(e) => setFormState({ ...formState, hospital: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-border text-foreground focus:outline-none focus:border-[#00E5C3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#A9B4D0] mb-1">Your Role *</label>
                  <select
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-border text-foreground focus:outline-none focus:border-[#00E5C3]"
                  >
                    <option>Hospital Director / Owner</option>
                    <option>Practicing Doctor / Clinician</option>
                    <option>Medical Superintendent</option>
                    <option>Operations / IT Lead</option>
                    <option>Investor / Evaluator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#A9B4D0] mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formState.whatsapp}
                    onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-border text-foreground focus:outline-none focus:border-[#00E5C3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A9B4D0] mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="doctor@hospital.org"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#070B14] border border-border text-foreground focus:outline-none focus:border-[#00E5C3]"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formState.consent}
                  onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                  className="mt-1 rounded bg-[#070B14] border-border text-[#00E5C3] focus:ring-0"
                />
                <label htmlFor="consent" className="text-[11px] text-[#A9B4D0] leading-relaxed">
                  I agree to be contacted regarding HospitalOS demo coordination and pilot discussions under DPDP principles.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5C3] to-[#4F7CFF] text-[#070B14] font-bold text-sm shadow-[0_0_25px_rgba(0,229,195,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 mt-4"
              >
                {isSubmitting ? "Submitting..." : t.cta.button}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          16. FOOTER
         ========================================================================= */}
      <footer className="py-12 px-4 sm:px-6 border-t border-[rgba(79,124,255,0.18)] bg-[#05080E] relative z-20 text-xs text-[#A9B4D0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00E5C3] to-[#4F7CFF] flex items-center justify-center text-[#070B14] font-bold text-xs">
              +
            </span>
            <span className="font-heading font-bold text-foreground">HospitalOS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-border">
              Made in India
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/docs" className="hover:text-[#00E5C3] transition-colors">Documentation</Link>
            <a href="https://github.com/DreamFaang78/cautious-memory" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5C3] transition-colors">GitHub Core</a>
            <button onClick={() => setIsSourcesOpen(true)} className="hover:text-[#00E5C3] transition-colors">Research Evidence</button>
            <a href="https://amsh.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5C3] transition-colors">Built by Agam Singh</a>
          </div>

          <div className="text-[11px] text-[#A9B4D0]/70 font-mono text-center md:text-right">
            © 2026 HospitalOS · Open Core · Assistive AI for Clinicians
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-border/30 text-center text-[10px] text-[#A9B4D0]/60">
          HospitalOS is designed as an assistive operational co-pilot for healthcare providers and does not diagnose, treat, or replace licensed clinicians.
        </div>
      </footer>

      {/* Floating Elements & Modals */}
      <WhatsAppButton />
      <SourcesModal isOpen={isSourcesOpen} onClose={() => setIsSourcesOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </main>
  );
}
